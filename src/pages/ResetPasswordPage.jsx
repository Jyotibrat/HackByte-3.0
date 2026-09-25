import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  confirmPasswordReset,
  extractErrorMessage,
  requestPasswordReset,
} from "../services/authApiService";

const NEW_PASSWORD_HINT =
  "At least 8 characters with an uppercase letter, a lowercase letter and a special character.";

/**
 * Password reset flow, both halves in one route:
 *  - /reset-password                    → request a reset link by email
 *  - /reset-password?uid=…&token=…      → choose a new password
 */
function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";
  const isConfirmMode = Boolean(uid && token);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const handleRequest = async (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    setError("");
    setIsSubmitting(true);
    try {
      const data = await requestPasswordReset(String(email).trim().toLowerCase());
      setMessage(data.detail);
    } catch (submitError) {
      setError(extractErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newPassword = String(form.get("newPassword") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (
      newPassword.length < 8 ||
      !/[a-z]/.test(newPassword) ||
      !/[A-Z]/.test(newPassword) ||
      !/[^A-Za-z0-9]/.test(newPassword)
    ) {
      setError(NEW_PASSWORD_HINT);
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset(uid, token, newPassword);
      setResetComplete(true);
    } catch (submitError) {
      setError(extractErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flanora-auth-page">
      <section className="flanora-auth-form-panel">
        <Link className="flanora-auth-wordmark" to="/">Flanora</Link>
        <div className="flanora-auth-form-wrap">
          <div className="flanora-auth-heading">
            <h1>Reset your <em>password.</em></h1>
            <p>
              {isConfirmMode
                ? "Choose a new password for your Flanora account."
                : "We'll email you a link to choose a new password."}
            </p>
          </div>

          {resetComplete ? (
            <>
              <p className="flanora-auth-message" role="status">
                Your password has been reset. All previous sessions were signed
                out — log in with your new password.
              </p>
              <Link className="flanora-auth-submit" to="/login" style={{ textAlign: "center" }}>
                Continue to log in →
              </Link>
            </>
          ) : isConfirmMode ? (
            <form className="flanora-auth-form" onSubmit={handleConfirm}>
              <label htmlFor="newPassword">New password
                <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" minLength="8" required />
              </label>
              <label htmlFor="confirmPassword">Confirm new password
                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required />
              </label>
              <p className="flanora-avatar-hint">{NEW_PASSWORD_HINT}</p>
              {error && <p className="flanora-auth-message" role="alert">{error}</p>}
              <button className="flanora-auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Resetting…" : "Reset password"}
              </button>
            </form>
          ) : (
            <form className="flanora-auth-form" onSubmit={handleRequest}>
              <label htmlFor="resetEmail">Email address
                <input id="resetEmail" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              {message && <p className="flanora-auth-message" role="status">{message}</p>}
              {error && <p className="flanora-auth-message" role="alert">{error}</p>}
              <button className="flanora-auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}

          <p className="flanora-auth-legal">
            <Link to="/login">← Back to log in</Link>
          </p>
        </div>
      </section>

      <aside className="flanora-auth-visual" aria-label="Flanora floor-plan concept preview">
        <div className="flanora-auth-grid" aria-hidden="true" />
        <div className="flanora-auth-visual-content">
          <span>Flanora AI</span>
          <h2>From an idea to a space worth exploring.</h2>
          <p>Describe your residential brief and compare AI-generated floor-plan concepts in moments.</p>
        </div>
      </aside>
    </main>
  );
}

export default ResetPasswordPage;
