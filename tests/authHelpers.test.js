import test from "node:test";
import assert from "node:assert/strict";

import {
  validateTermsRequired,
  getScrollBehavior,
  buildGoogleAuthPayload,
  savePendingGoogleAuthOptions,
  readPendingGoogleAuthOptions,
  clearPendingGoogleAuthOptions,
  isAccountNotFoundError,
  PENDING_GOOGLE_AUTH_STORAGE_KEY,
} from "../src/utils/authHelpers.js";

test("validateTermsRequired - returns valid when terms accepted", () => {
  const result = validateTermsRequired(true);
  assert.equal(result.isValid, true);
  assert.equal(result.error, null);
});

test("validateTermsRequired - returns error message when terms not accepted", () => {
  const resultFalse = validateTermsRequired(false);
  assert.equal(resultFalse.isValid, false);
  assert.equal(resultFalse.error, "Please tick this box to continue.");

  const resultNull = validateTermsRequired(null);
  assert.equal(resultNull.isValid, false);
  assert.equal(resultNull.error, "Please tick this box to continue.");

  const resultUndefined = validateTermsRequired(undefined);
  assert.equal(resultUndefined.isValid, false);
  assert.equal(resultUndefined.error, "Please tick this box to continue.");
});

test("getScrollBehavior - respects prefersReducedMotion", () => {
  assert.equal(getScrollBehavior(true), "auto");
  assert.equal(getScrollBehavior(false), "smooth");
});

test("buildGoogleAuthPayload - login mode", () => {
  const payload = buildGoogleAuthPayload({ mode: "login" });
  assert.deepEqual(payload, { mode: "login" });

  const defaultPayload = buildGoogleAuthPayload();
  assert.deepEqual(defaultPayload, { mode: "login" });
});

test("buildGoogleAuthPayload - signup mode with terms and opt-in", () => {
  const payload = buildGoogleAuthPayload({
    mode: "signup",
    acceptTerms: true,
    newsletterOptIn: true,
  });
  assert.deepEqual(payload, {
    mode: "signup",
    accept_terms: true,
    newsletter_opt_in: true,
  });

  const payloadNoNewsletter = buildGoogleAuthPayload({
    mode: "signup",
    acceptTerms: true,
    newsletterOptIn: false,
  });
  assert.deepEqual(payloadNoNewsletter, {
    mode: "signup",
    accept_terms: true,
    newsletter_opt_in: false,
  });
});

test("sessionStorage transport helpers - save, read, clear", () => {
  const store = new Map();
  const mockStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
  };

  const payload = { mode: "signup", accept_terms: true, newsletter_opt_in: true };
  assert.equal(savePendingGoogleAuthOptions(mockStorage, payload), true);
  assert.equal(store.has(PENDING_GOOGLE_AUTH_STORAGE_KEY), true);

  const readBack = readPendingGoogleAuthOptions(mockStorage);
  assert.deepEqual(readBack, payload);

  assert.equal(clearPendingGoogleAuthOptions(mockStorage), true);
  assert.equal(readPendingGoogleAuthOptions(mockStorage), null);
});

test("sessionStorage transport helpers - graceful with null storage or corrupt JSON", () => {
  assert.equal(savePendingGoogleAuthOptions(null, {}), false);
  assert.equal(readPendingGoogleAuthOptions(null), null);
  assert.equal(clearPendingGoogleAuthOptions(null), false);

  const corruptStorage = {
    getItem: () => "invalid-json{",
  };
  assert.equal(readPendingGoogleAuthOptions(corruptStorage), null);
});

test("isAccountNotFoundError - identifies 404 and account_not_found code", () => {
  const err404 = { response: { status: 404, data: {} } };
  assert.equal(isAccountNotFoundError(err404), true);

  const errCode = {
    response: {
      status: 400,
      data: { errors: { detail: { code: "account_not_found" } } },
    },
  };
  assert.equal(isAccountNotFoundError(errCode), true);

  const errOther = {
    response: {
      status: 400,
      data: { errors: { detail: "Incorrect email or password." } },
    },
  };
  assert.equal(isAccountNotFoundError(errOther), false);

  assert.equal(isAccountNotFoundError(null), false);
  assert.equal(isAccountNotFoundError({}), false);
});
