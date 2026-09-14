import axios from "axios";

/**
 * Client for the Flanora Authentication Service (Django + Simple JWT).
 *
 * Base URL comes from VITE_AUTH_SERVICE_URL (defaults to the local Django
 * dev server). Error responses use the service's stable envelope:
 * {"errors": {"field": ["message"]}} or {"errors": {"detail": "message"}}.
 */

const AUTH_API_URL = import.meta.env.VITE_AUTH_SERVICE_URL || "http://127.0.0.1:8000";
const BASE_URL = `${AUTH_API_URL.replace(/\/$/, "")}/api/auth`;

const ACCESS_KEY = "flanora.accessToken";
const REFRESH_KEY = "flanora.refreshToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function storeTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

/** Flattens the service's error envelope into a single user-facing message. */
function extractErrorMessage(error) {
  if (error.response) {
    const { status, data } = error.response;
    const errors = data && data.errors ? data.errors : data;

    if (typeof errors === "string") return errors;
    if (errors) {
      const firstField = Object.keys(errors)[0];
      if (firstField) {
        const value = errors[firstField];
        const message = Array.isArray(value) ? value[0] : value;
        if (firstField !== "detail") {
          return `${humanizeField(firstField)}: ${message}`;
        }
        return message;
      }
    }
    if (status === 401) return "Invalid email or password.";
    if (status === 429) return "Too many attempts. Please wait a moment and try again.";
    if (status >= 500) return "The service is temporarily unavailable. Try again shortly.";
  } else if (error.request) {
    return "Cannot reach the Flanora authentication service. Is the backend running?";
  }
  return "Something went wrong. Please try again.";
}

function humanizeField(field) {
  return field
    .replace(/_/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

const client = axios.create({ baseURL: BASE_URL, timeout: 30000 });

client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On an expired access token, try one silent refresh and replay the request.
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      getRefreshToken() &&
      original &&
      !original._retried
    ) {
      original._retried = true;
      try {
        const refreshResponse = await axios.post(`${BASE_URL}/token/refresh/`, {
          refresh: getRefreshToken(),
        });
        storeTokens(refreshResponse.data);
        return client(original);
      } catch {
        clearTokens();
        window.dispatchEvent(new Event("flanora:session-expired"));
      }
    }
    return Promise.reject(error);
  }
);

// --------------------------------------------------------------- endpoints

export async function registerUser(payload) {
  const response = await client.post("/register/", payload);
  storeTokens(response.data);
  return response.data;
}

export async function loginUser(email, password) {
  const response = await client.post("/login/", { email, password });
  storeTokens(response.data);
  return response.data;
}

export async function logoutUser() {
  const refresh = getRefreshToken();
  clearTokens();
  if (refresh) {
    try {
      await client.post("/logout/", { refresh });
    } catch {
      // Token was already invalid — the local session is cleared either way.
    }
  }
}

export async function fetchCurrentUser() {
  const response = await client.get("/me/");
  return response.data;
}

export async function verifyEmail(token) {
  const response = await client.post("/verify-email/", { token });
  return response.data;
}

export async function resendVerification(email) {
  const response = await client.post("/resend-verification/", { email });
  return response.data;
}

export async function requestPasswordReset(email) {
  const response = await client.post("/password/reset/", { email });
  return response.data;
}

export async function confirmPasswordReset(uid, token, newPassword) {
  const response = await client.post("/password/reset/confirm/", {
    uid,
    token,
    new_password: newPassword,
  });
  return response.data;
}

export async function changePassword(currentPassword, newPassword) {
  const response = await client.post("/password/change/", {
    current_password: currentPassword,
    new_password: newPassword,
  });
  storeTokens(response.data);
  return response.data;
}

/** Google Identity Services returns an ID token; exchange it for a JWT pair. */
export async function googleLogin(idToken) {
  const response = await client.post("/google/", { id_token: idToken });
  storeTokens(response.data);
  return response.data;
}

export { extractErrorMessage };
