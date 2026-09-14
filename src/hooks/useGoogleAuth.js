import { useCallback, useEffect, useRef } from "react";
import { googleLogin, extractErrorMessage } from "../services/authApiService";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Loads Google Identity Services script and returns a function that
 * opens a small overlay with the official Google Sign-In button.
 * This approach bypasses FedCM/One Tap issues on localhost.
 */
export function useGoogleAuth(onSuccess, onError) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    // Load the Google GSI script once
    if (!document.getElementById("google-gsi-script")) {
      const script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Create a persistent overlay container if not already present
    if (!document.getElementById("google-auth-overlay")) {
      const overlay = document.createElement("div");
      overlay.id = "google-auth-overlay";
      Object.assign(overlay.style, {
        display: "none",
        position: "fixed",
        inset: "0",
        zIndex: "9999",
        background: "rgba(0,0,0,0.6)",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      });

      const card = document.createElement("div");
      Object.assign(card.style, {
        background: "#fff",
        borderRadius: "12px",
        padding: "32px 28px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        minWidth: "320px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      });

      const title = document.createElement("p");
      title.textContent = "Sign in with Google";
      Object.assign(title.style, {
        margin: "0",
        fontFamily: "sans-serif",
        fontWeight: "600",
        fontSize: "16px",
        color: "#1a1a1a",
      });

      const buttonContainer = document.createElement("div");
      buttonContainer.id = "google-btn-container";

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Cancel";
      Object.assign(closeBtn.style, {
        border: "none",
        background: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: "13px",
        fontFamily: "sans-serif",
        padding: "4px 8px",
      });
      closeBtn.onclick = () => { overlay.style.display = "none"; };

      card.appendChild(title);
      card.appendChild(buttonContainer);
      card.appendChild(closeBtn);
      overlay.appendChild(card);
      document.body.appendChild(overlay);

      // Close on backdrop click
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.style.display = "none";
      });

      overlayRef.current = overlay;
    } else {
      overlayRef.current = document.getElementById("google-auth-overlay");
    }
  }, []);

  const signInWithGoogle = useCallback(() => {
    if (!GOOGLE_CLIENT_ID) {
      onError("Google sign-in is not configured. VITE_GOOGLE_CLIENT_ID is missing.");
      return;
    }

    if (!window.google) {
      onError("Google Identity Services is still loading. Please wait a moment and try again.");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        // Hide overlay
        const overlay = document.getElementById("google-auth-overlay");
        if (overlay) overlay.style.display = "none";

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

    // Show overlay and render the official Google button inside it
    const overlay = document.getElementById("google-auth-overlay");
    const container = document.getElementById("google-btn-container");
    if (overlay && container) {
      container.innerHTML = ""; // clear previous render
      window.google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: 260,
        text: "signin_with",
        shape: "rectangular",
      });
      overlay.style.display = "flex";
    }
  }, [onSuccess, onError]);

  return signInWithGoogle;
}
