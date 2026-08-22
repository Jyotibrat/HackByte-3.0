import { Link } from "react-router-dom";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.09A6.95 6.95 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.16A10.94 10.94 0 0 0 1 12c0 1.78.43 3.45 1.16 4.93l3.68-2.84Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84C6.71 7.31 9.14 5.38 12 5.38Z" fill="#EA4335" />
    </svg>
  );
}

function LoginPage() {
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = form.get("password");

    if (password !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    setError("Login is not connected to the authentication service yet.");
  };

  return (
    <main className="flanora-auth-page">
      <section className="flanora-auth-form-panel">
        <Link className="flanora-auth-wordmark" to="/">Flanora</Link>
        <div className="flanora-auth-form-wrap">
          <div className="flanora-auth-heading">
            <h1>Continue exploring with <em>Flanora.</em></h1>
            <p>Sign in to continue creating residential floor-plan concepts.</p>
          </div>

          <button className="flanora-google-button" type="button">
            <GoogleIcon /> Continue with Google
          </button>

          <div className="flanora-auth-divider"><span>or continue with email</span></div>

          <form className="flanora-auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label htmlFor="password">Password
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" minLength="8" required />
            </label>
            <label htmlFor="confirmPassword">Confirm password
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" placeholder="Enter your password again" minLength="8" required />
            </label>
            {error && <p className="flanora-auth-message" role="alert">{error}</p>}
            <button className="flanora-auth-submit" type="submit">Log in</button>
          </form>

          <p className="flanora-auth-legal">By continuing, you agree to the <Link to="/policies/terms-of-use">Terms of Use</Link> and <Link to="/policies/privacy-policy">Privacy Policy</Link>.</p>
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

export default LoginPage;
