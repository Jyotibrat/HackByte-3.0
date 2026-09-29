import { useCallback, useEffect, useRef, useState } from "react";
import { googleLogin, extractErrorMessage } from "../services/authApiService";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CONNECT_ERROR =
  "We’re having trouble connecting right now. Please try again in a moment.";

/**
 * Loads Google Identity Services script and renders the official Google Sign-In
 * button into the provided DOM ref as a hidden click relay. The visible UI is a
 * custom button that triggers it via `startGoogleSignIn()`, so the option stays
 * present even when GIS is unavailable or still loading.
 */
export function useGoogleAuth(onSuccess, onError, buttonRef) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const hasScriptFailedRef = useRef(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !buttonRef.current) return;

    let focusListener = null;
    let isHandlingCallback = false;

    const initializeGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          isHandlingCallback = true;
          if (!response.credential) {
            onError("Google sign-in was cancelled.");
            setIsGoogleLoading(false);
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
            setIsGoogleLoading(false);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 420,
        text: "continue_with",
        shape: "pill",
        click_listener: () => {
          setIsGoogleLoading(true);
          isHandlingCallback = false;

          // Google popup causes window to lose focus. When it regains focus,
          // the user either completed the flow or closed the popup.
          setTimeout(() => {
            focusListener = () => {
              // Add a small buffer in case the callback is about to fire
              setTimeout(() => {
                if (!isHandlingCallback) {
                  setIsGoogleLoading(false);
                }
              }, 1000);
              window.removeEventListener('focus', focusListener);
            };
            window.addEventListener('focus', focusListener);
          }, 500);
        }
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
      script.onerror = () => {
        hasScriptFailedRef.current = true;
      };
      document.body.appendChild(script);
    }

    return () => {
      if (focusListener) window.removeEventListener('focus', focusListener);
    };
  }, [onSuccess, onError, buttonRef]);

  const startGoogleSignIn = useCallback(() => {
    if (!GOOGLE_CLIENT_ID) {
      onError(GOOGLE_CONNECT_ERROR);
      return;
    }
    if (hasScriptFailedRef.current) {
      onError(GOOGLE_CONNECT_ERROR);
      return;
    }
    const relayButton = buttonRef.current?.querySelector('[role="button"], button');
    if (!relayButton) {
      onError(GOOGLE_CONNECT_ERROR);
      return;
    }
    relayButton.click();
  }, [onError, buttonRef]);

  return { isGoogleLoading, startGoogleSignIn };
}

