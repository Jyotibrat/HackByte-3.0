import { useEffect } from "react";
import { googleLogin, extractErrorMessage } from "../services/authApiService";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Loads Google Identity Services script and renders the official Google Sign-In
 * button directly into the provided DOM ref, bypassing any modal overlay.
 */
export function useGoogleAuth(onSuccess, onError, buttonRef) {
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !buttonRef.current) return;

    const initializeGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          if (!response.credential) {
            onError("Google sign-in was cancelled.");
            return;
          }
          try {
            // Extract picture from the JWT
            const base64Url = response.credential.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
            );
            const { picture } = JSON.parse(jsonPayload);

            const data = await googleLogin(response.credential);
            if (picture) {
              localStorage.setItem(`flanora_pic_${data.user.email}`, picture);
              data.user.picture = picture;
            }
            onSuccess(data.user);
          } catch (err) {
            onError(extractErrorMessage(err));
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 420,
        text: "continue_with",
        shape: "pill",
      });
    };

    if (window.google && window.google.accounts) {
      initializeGoogle();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    }
  }, [onSuccess, onError, buttonRef]);
}
