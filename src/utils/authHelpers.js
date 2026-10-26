/**
 * Pure helper functions for authentication gating, mode selection,
 * sessionStorage transport, and account error classification.
 */

export const PENDING_GOOGLE_AUTH_STORAGE_KEY = "flanora.pending_google_auth";

/**
 * Validates whether the Terms of Service & Privacy Policy checkbox was checked.
 * Pure helper for gating registration and Google OAuth signups.
 */
export function validateTermsRequired(termsAccepted) {
  if (termsAccepted) {
    return { isValid: true, error: null };
  }
  return { isValid: false, error: "Please tick this box to continue." };
}

/**
 * Determines scroll behavior based on user motion preference.
 */
export function getScrollBehavior(prefersReducedMotion) {
  return prefersReducedMotion ? "auto" : "smooth";
}

/**
 * Builds the payload for Google OAuth backend exchange according to mode.
 * - Login mode: { mode: "login" }
 * - Signup mode: { mode: "signup", accept_terms: boolean, newsletter_opt_in: boolean }
 */
export function buildGoogleAuthPayload({ mode = "login", acceptTerms = false, newsletterOptIn = false } = {}) {
  const normalizedMode = mode === "signup" ? "signup" : "login";
  if (normalizedMode === "signup") {
    return {
      mode: "signup",
      accept_terms: Boolean(acceptTerms),
      newsletter_opt_in: Boolean(newsletterOptIn),
    };
  }
  return {
    mode: "login",
  };
}

/**
 * Safely persists pending Google auth options in storage (e.g. sessionStorage).
 */
export function savePendingGoogleAuthOptions(storage, options) {
  if (!storage || typeof storage.setItem !== "function") return false;
  try {
    storage.setItem(PENDING_GOOGLE_AUTH_STORAGE_KEY, JSON.stringify(options));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely reads pending Google auth options from storage.
 */
export function readPendingGoogleAuthOptions(storage) {
  if (!storage || typeof storage.getItem !== "function") return null;
  try {
    const raw = storage.getItem(PENDING_GOOGLE_AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Safely clears pending Google auth options from storage.
 */
export function clearPendingGoogleAuthOptions(storage) {
  if (!storage || typeof storage.removeItem !== "function") return false;
  try {
    storage.removeItem(PENDING_GOOGLE_AUTH_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** Helper to get window.sessionStorage if available. */
export function getDefaultSessionStorage() {
  if (typeof window !== "undefined" && window.sessionStorage) {
    return window.sessionStorage;
  }
  return null;
}

export function saveGoogleAuthSession(options, storage = getDefaultSessionStorage()) {
  return savePendingGoogleAuthOptions(storage, options);
}

export function readGoogleAuthSession(storage = getDefaultSessionStorage()) {
  return readPendingGoogleAuthOptions(storage);
}

export function clearGoogleAuthSession(storage = getDefaultSessionStorage()) {
  return clearPendingGoogleAuthOptions(storage);
}

/**
 * Identifies whether an API error represents an "account not found" scenario
 * (HTTP 404 or error code "account_not_found").
 */
export function isAccountNotFoundError(error) {
  if (!error) return false;
  if (error.response?.status === 404) return true;
  const errors = error.response?.data?.errors;
  if (!errors) return false;
  if (typeof errors === "object") {
    const detail = errors.detail;
    if (detail && typeof detail === "object" && detail.code === "account_not_found") {
      return true;
    }
    if (errors.code === "account_not_found") {
      return true;
    }
  }
  return false;
}
