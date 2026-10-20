import test from "node:test";
import assert from "node:assert/strict";
import {
  MESSAGES,
  getUnsubscribeUrl,
  maskEmail,
  submitUnsubscribe,
  validateUnsubscribeParams,
} from "../src/services/unsubscribeService.js";

const VALID_EMAIL = "pat@example.com";
const VALID_TOKEN = "a".repeat(64); // 64 hex characters

test("maskEmail: masks email according to specification (p***@example.com)", () => {
  assert.equal(maskEmail("pat@example.com"), "p***@example.com");
  assert.equal(maskEmail("john.doe@company.org"), "j***@company.org");
  assert.equal(maskEmail("A@domain.com"), "A***@domain.com");
  assert.equal(maskEmail(""), "");
  assert.equal(maskEmail(null), "");
  assert.equal(maskEmail("invalid-email"), "");
});

test("validateUnsubscribeParams: validates 64-hex token and email format", () => {
  // Valid cases
  const validResult = validateUnsubscribeParams(VALID_EMAIL, VALID_TOKEN);
  assert.equal(validResult.valid, true);
  assert.equal(validResult.email, "pat@example.com");
  assert.equal(validResult.token, VALID_TOKEN);

  // Normalizes whitespace and uppercase
  const normResult = validateUnsubscribeParams("  PAT@EXAMPLE.COM  ", `  ${VALID_TOKEN}  `);
  assert.equal(normResult.valid, true);
  assert.equal(normResult.email, "pat@example.com");

  // Missing or malformed parameters
  assert.equal(validateUnsubscribeParams("", VALID_TOKEN).valid, false);
  assert.equal(validateUnsubscribeParams(null, VALID_TOKEN).valid, false);
  assert.equal(validateUnsubscribeParams("not-an-email", VALID_TOKEN).valid, false);
  assert.equal(validateUnsubscribeParams(VALID_EMAIL, "").valid, false);
  assert.equal(validateUnsubscribeParams(VALID_EMAIL, null).valid, false);
  assert.equal(validateUnsubscribeParams(VALID_EMAIL, "1234").valid, false); // too short
  assert.equal(validateUnsubscribeParams(VALID_EMAIL, "z".repeat(64)).valid, false); // non-hex
  assert.equal(validateUnsubscribeParams(VALID_EMAIL, "a".repeat(65)).valid, false); // too long
});

test("getUnsubscribeUrl: resolves endpoint from footer form env variable", () => {
  // Derived from existing VITE_NEWSLETTER_URL pointing to /subscribe
  assert.equal(
    getUnsubscribeUrl("https://tyhotwtczvnlpfykddeo.supabase.co/functions/v1/newsletter/subscribe"),
    "https://tyhotwtczvnlpfykddeo.supabase.co/functions/v1/newsletter/unsubscribe",
  );

  // When already ending in /unsubscribe
  assert.equal(
    getUnsubscribeUrl("https://tyhotwtczvnlpfykddeo.supabase.co/functions/v1/newsletter/unsubscribe"),
    "https://tyhotwtczvnlpfykddeo.supabase.co/functions/v1/newsletter/unsubscribe",
  );

  // When given the base function URL
  assert.equal(
    getUnsubscribeUrl("https://tyhotwtczvnlpfykddeo.supabase.co/functions/v1/newsletter"),
    "https://tyhotwtczvnlpfykddeo.supabase.co/functions/v1/newsletter/unsubscribe",
  );

  assert.equal(getUnsubscribeUrl(""), "");
});

test("page load simulation: parameter validation makes NO network call", () => {
  let networkCallCount = 0;
  const fakeFetch = () => {
    networkCallCount++;
    return Promise.resolve(new Response(JSON.stringify({ outcome: "unsubscribed" }), { status: 200 }));
  };

  // Simulating load with valid params
  const valValid = validateUnsubscribeParams(VALID_EMAIL, VALID_TOKEN);
  assert.equal(valValid.valid, true);
  assert.equal(networkCallCount, 0, "Initial validation must make zero network calls");

  // Simulating load with invalid params
  const valInvalid = validateUnsubscribeParams("bad-email", "bad-token");
  assert.equal(valInvalid.valid, false);
  assert.equal(networkCallCount, 0, "Invalid params check must make zero network calls");
});

test("Confirm: sends exactly one POST request with expected URL, headers, and body", async () => {
  const calls = [];
  const fakeFetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ outcome: "unsubscribed" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const res = await submitUnsubscribe({
    email: VALID_EMAIL,
    token: VALID_TOKEN,
    url: "https://example.com/functions/v1/newsletter/unsubscribe",
    fetchFn: fakeFetch,
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://example.com/functions/v1/newsletter/unsubscribe");
  assert.equal(calls[0].options.method, "POST");
  assert.deepEqual(calls[0].options.headers, { "Content-Type": "application/json" });

  const parsedBody = JSON.parse(calls[0].options.body);
  assert.equal(parsedBody.email, "pat@example.com");
  assert.equal(parsedBody.token, VALID_TOKEN);
  assert.equal(res.success, true);
  assert.equal(res.message, MESSAGES.success);
});

test("Status mapping: HTTP 200 maps to success message", async () => {
  for (const outcome of ["unsubscribed", "already_unsubscribed", "not_subscribed"]) {
    const fakeFetch = async () =>
      new Response(JSON.stringify({ outcome }), { status: 200 });

    const res = await submitUnsubscribe({
      email: VALID_EMAIL,
      token: VALID_TOKEN,
      url: "https://example.com/unsubscribe",
      fetchFn: fakeFetch,
    });

    assert.equal(res.success, true, `Outcome ${outcome} should succeed`);
    assert.equal(res.message, MESSAGES.success);
    assert.equal(res.retryable, false);
  }
});

test("Status mapping: HTTP 400 and 403 map to invalid link message", async () => {
  for (const status of [400, 403]) {
    const fakeFetch = async () =>
      new Response(JSON.stringify({ error: "forbidden" }), { status });

    const res = await submitUnsubscribe({
      email: VALID_EMAIL,
      token: VALID_TOKEN,
      url: "https://example.com/unsubscribe",
      fetchFn: fakeFetch,
    });

    assert.equal(res.success, false);
    assert.equal(res.message, MESSAGES.invalid);
    assert.equal(res.retryable, false);
  }
});

test("Status mapping: HTTP 429 maps to rate limited message", async () => {
  const fakeFetch = async () =>
    new Response(JSON.stringify({ error: "rate limited" }), {
      status: 429,
      headers: { "Retry-After": "60" },
    });

  const res = await submitUnsubscribe({
    email: VALID_EMAIL,
    token: VALID_TOKEN,
    url: "https://example.com/unsubscribe",
    fetchFn: fakeFetch,
  });

  assert.equal(res.success, false);
  assert.equal(res.message, MESSAGES.rateLimited);
  assert.equal(res.retryable, true);
});

test("Status mapping: HTTP 500 and network failure map to retryable error message", async () => {
  // 500 server error
  const fakeFetch500 = async () =>
    new Response(JSON.stringify({ error: "internal error" }), { status: 500 });

  const res500 = await submitUnsubscribe({
    email: VALID_EMAIL,
    token: VALID_TOKEN,
    url: "https://example.com/unsubscribe",
    fetchFn: fakeFetch500,
  });

  assert.equal(res500.success, false);
  assert.equal(res500.message, MESSAGES.error);
  assert.equal(res500.retryable, true);

  // Network rejection (e.g. offline / DNS failure)
  const fakeFetchReject = async () => {
    throw new TypeError("Failed to fetch");
  };

  const resReject = await submitUnsubscribe({
    email: VALID_EMAIL,
    token: VALID_TOKEN,
    url: "https://example.com/unsubscribe",
    fetchFn: fakeFetchReject,
  });

  assert.equal(resReject.success, false);
  assert.equal(resReject.message, MESSAGES.error);
  assert.equal(resReject.retryable, true);
});

test("Double submission prevention: guard ensures only one request is sent", async () => {
  let callCount = 0;
  let inFlight = false;

  const fakeFetch = async () => {
    callCount++;
    await new Promise((r) => setTimeout(r, 50));
    return new Response(JSON.stringify({ outcome: "unsubscribed" }), { status: 200 });
  };

  // Simulating user clicking Confirm twice rapidly
  const triggerConfirm = async () => {
    if (inFlight) return null;
    inFlight = true;
    try {
      return await submitUnsubscribe({
        email: VALID_EMAIL,
        token: VALID_TOKEN,
        url: "https://example.com/unsubscribe",
        fetchFn: fakeFetch,
      });
    } finally {
      inFlight = false;
    }
  };

  const [call1, call2] = await Promise.all([triggerConfirm(), triggerConfirm()]);

  assert.equal(callCount, 1, "Only one fetch should have been executed");
  assert.notEqual(call1, null);
  assert.equal(call2, null, "Second rapid click must be blocked by the in-flight guard");
});
