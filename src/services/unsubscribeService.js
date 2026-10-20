/**
 * Unsubscribe Service
 * Handles email masking, parameter validation, URL resolution, and unsubscribe requests.
 */

const HEX_64_REGEX = /^[0-9a-fA-F]{64}$/;
// Standard RFC-compatible pragmatic email check
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const MESSAGES = {
  success: "You have been unsubscribed. You will not receive further newsletters.",
  invalid: "This unsubscribe link is not valid. Please use the link in your most recent email.",
  rateLimited: "Too many attempts. Please try again in a minute.",
  error: "Something went wrong. Please try again.",
};

/**
 * Masks an email address: first character, then ***, then the domain.
 * Example: pat@example.com -> p***@example.com
 */
export function maskEmail(email) {
  if (!email || typeof email !== "string") return "";
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 0) return "";
  const firstChar = trimmed[0];
  const domainPart = trimmed.slice(atIndex);
  return `${firstChar}***${domainPart}`;
}

/**
 * Validates unsubscribe parameters from query string.
 * Email must look like an email.
 * Token must be exactly 64 hex characters.
 */
export function validateUnsubscribeParams(rawEmail, rawToken) {
  if (typeof rawEmail !== "string" || typeof rawToken !== "string") {
    return { valid: false, email: "", token: "" };
  }
  const email = rawEmail.trim().toLowerCase();
  const token = rawToken.trim();

  if (!email || !EMAIL_REGEX.test(email)) {
    return { valid: false, email: "", token: "" };
  }

  if (!token || !HEX_64_REGEX.test(token)) {
    return { valid: false, email: "", token: "" };
  }

  return { valid: true, email, token };
}

/**
 * Resolves the Edge Function unsubscribe endpoint from the base/newsletter env variable.
 * Uses the same VITE_NEWSLETTER_URL as the footer form.
 */
export function getUnsubscribeUrl(envUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_NEWSLETTER_URL) || "") {
  if (!envUrl || typeof envUrl !== "string") return "";
  const trimmed = envUrl.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/subscribe")) {
    return trimmed.replace(/\/subscribe$/, "/unsubscribe");
  }
  if (trimmed.endsWith("/unsubscribe")) {
    return trimmed;
  }
  return `${trimmed}/unsubscribe`;
}

/**
 * Submits the unsubscribe request to the Edge Function.
 * Returns { success: boolean, message: string, retryable: boolean, status: number }
 */
export async function submitUnsubscribe({ email, token, url, fetchFn = fetch }) {
  const targetUrl = url || getUnsubscribeUrl();
  if (!targetUrl) {
    return {
      success: false,
      message: MESSAGES.error,
      retryable: true,
      status: 0,
    };
  }

  try {
    const res = await fetchFn(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), token: token.trim() }),
    });

    if (res.status === 200) {
      return {
        success: true,
        message: MESSAGES.success,
        retryable: false,
        status: 200,
      };
    }

    if (res.status === 400 || res.status === 403) {
      return {
        success: false,
        message: MESSAGES.invalid,
        retryable: false,
        status: res.status,
      };
    }

    if (res.status === 429) {
      return {
        success: false,
        message: MESSAGES.rateLimited,
        retryable: true,
        status: 429,
      };
    }

    return {
      success: false,
      message: MESSAGES.error,
      retryable: true,
      status: res.status,
    };
  } catch {
    return {
      success: false,
      message: MESSAGES.error,
      retryable: true,
      status: 0,
    };
  }
}
