import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { extractErrorMessage, resendVerification, verifyEmail } from "../services/authApiService";

/**
 * Standalone email-verification flow. The link in the verification email
 * points here as /verify-email?token=...; users can also request a new link
 * manually when the token expired.
 */
function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [state, setState] = useState(token ? "verifying" : "idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!token) return undefined;
    let cancelled = false;
    verifyEmail(token)
      .then(() => {
        if (!cancelled) {
          setState("verified");
          setMessage("Your email address has been verified. Welcome to Flanora!");
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState("failed");
          setMessage(extractErrorMessage(error));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleResend = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await resendVerification(email.trim().toLowerCase());
      setResent(true);
    } catch (error) {
      setMessage(extractErrorMessage(error));
    }
  };

  return (
    <main className="flanora-auth-page">
      <section className="flanora-auth-form-panel">
        <Link className="flanora-auth-wordmark" to="/">Flanora</Link>
        <div className="flanora-auth-form-wrap">
          <div className="flanora-auth-heading">
            <h1>Verify your <em>email.</em></h1>
            <p>Confirm your address to keep full access to your Flanora account.</p>
          </div>

          {state === "verifying" && (
            <p className="flanora-auth-message" role="status">Verifying your email…</p>
          )}

          {state === "verified" && (
            <>
              <p className="flanora-auth-message" role="status">{message}</p>
              <Link className="flanora-auth-submit" to="/chat" style={{ textAlign: "center" }}>
                Continue to Flanora →
              </Link>
            </>
          )}

          {(state === "failed" || state === "idle") && (
            <>
              {state === "failed" && (
                <p className="flanora-auth-message" role="alert">{message}</p>
              )}
              {resent ? (
                <p className="flanora-auth-message" role="status">
                  If this email belongs to an unverified Flanora account, a new
                  verification link is on its way.
                </p>
              ) : (
                <form className="flanora-auth-form" onSubmit={handleResend}>
                  <label htmlFor="resendEmail">Email address
                    <input
                      id="resendEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </label>
                  <button className="flanora-auth-submit" type="submit">Send a new verification link</button>
                </form>
              )}
            </>
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

export default VerifyEmailPage;
