import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { extractErrorMessage } from "../services/authApiService";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage
} from "@/components/animate-ui/components/radix/preview-link-card";

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

function CameraIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9][0-9\s\-()]{5,19}$/;

function validateRegistration(form) {
  const password = String(form.get("password") || "");

  if (!EMAIL_PATTERN.test(String(form.get("email") || ""))) {
    return "Please enter a valid email address.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return "Password must contain both uppercase and lowercase letters.";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  if (password !== form.get("rePassword")) {
    return "Passwords do not match.";
  }
  const phone = String(form.get("phone") || "").trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    return "Please enter a valid phone number.";
  }
  const dob = form.get("dob");
  if (dob && new Date(dob) > new Date()) {
    return "Date of birth cannot be in the future.";
  }
  return "";
}

function SignUpPage() {
  const { signup, setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdEmail, setCreatedEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarInputRef = useRef(null);

  const handleGoogleSuccess = useCallback((user) => {
    setUser(user);
    navigate("/chat", { replace: true });
  }, [setUser, navigate]);

  const handleGoogleError = useCallback((msg) => setError(msg), []);

  const signInWithGoogle = useGoogleAuth(handleGoogleSuccess, handleGoogleError);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const validationError = validateRegistration(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await signup({
        first_name: String(form.get("firstName") || "").trim(),
        last_name: String(form.get("lastName") || "").trim(),
        email: String(form.get("email") || "").trim().toLowerCase(),
        phone_number: String(form.get("phone") || "").trim(),
        date_of_birth: String(form.get("dob") || ""),
        password: String(form.get("password") || ""),
        confirm_password: String(form.get("rePassword") || ""),
        accept_terms: form.get("tos") === "on",
        accept_privacy_policy: form.get("tos") === "on",
      });
      setCreatedEmail(String(form.get("email") || "").trim().toLowerCase());
    } catch (submitError) {
      setError(extractErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdEmail) {
    return (
      <main className="flanora-auth-page">
        <section className="flanora-auth-form-panel">
          <Link className="flanora-auth-wordmark" to="/">Flanora</Link>
          <div className="flanora-auth-form-wrap">
            <div className="flanora-auth-heading">
              <h1>Welcome to <em>Flanora.</em></h1>
              <p>Your account has been created.</p>
            </div>
            <p className="flanora-auth-message" role="status">
              We've sent a verification link to {createdEmail}. You can start
              exploring right away — just verify your email later to keep full
              access.
            </p>
            <button
              className="flanora-auth-submit"
              type="button"
              onClick={() => navigate("/chat", { replace: true })}
            >
              Continue to Flanora →
            </button>
            <p className="flanora-auth-legal">
              Didn't get the email?{" "}
              <Link to="/verify-email">Verify your email here</Link>
            </p>
          </div>
        </section>

        <aside className="flanora-auth-visual" aria-label="Flanora AI sign-up preview">
          <div className="flanora-auth-grid" aria-hidden="true" />
          <div className="flanora-auth-visual-content">
            <span>Flanora AI</span>
            <h2>Design the space you've always imagined.</h2>
            <p>Describe your vision and watch AI bring your floor plan to life in moments.</p>
          </div>
        </aside>
      </main>
    );
  }

  return (
    <main className="flanora-auth-page">
      <section className="flanora-auth-form-panel">
        <Link className="flanora-auth-wordmark" to="/">Flanora</Link>

        <div className="flanora-auth-form-wrap flanora-signup-wrap">
          <div className="flanora-auth-heading">
            <h1>Create your <em>Flanora</em> account.</h1>
            <p>Join thousands exploring AI-generated architectural concepts.</p>
          </div>

          <div className="flanora-avatar-upload">
            <button
              type="button"
              className="flanora-avatar-btn"
              aria-label="Upload profile picture"
              onClick={() => avatarInputRef.current?.click()}
            >
              {avatarPreview
                ? <img src={avatarPreview} alt="Profile preview" className="flanora-avatar-preview" />
                : <CameraIcon />
              }
            </button>
            <div className="flanora-avatar-label">
              <span>Profile picture</span>
              <button type="button" className="flanora-avatar-change" onClick={() => avatarInputRef.current?.click()}>
                {avatarPreview ? "Change photo" : "Upload photo"}
              </button>
              <span className="flanora-avatar-hint">Optional · JPG, PNG, WEBP up to 5 MB</span>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="flanora-avatar-input"
              aria-label="Profile picture file input"
            />
          </div>

          <button className="flanora-google-button" type="button" onClick={signInWithGoogle}>
            <GoogleIcon /> Continue with Google
          </button>
          {/* Fallback render target for Google's button if One Tap is suppressed */}
          <div id="google-signin-fallback" style={{ display: "none" }} />

          <div className="flanora-auth-divider"><span>or sign up with email</span></div>

          <form className="flanora-auth-form flanora-signup-form" onSubmit={handleSubmit}>
            <div className="flanora-signup-row">
              <label htmlFor="firstName">First name *
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Ada" required />
              </label>
              <label htmlFor="lastName">Last name *
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Lovelace" required />
              </label>
            </div>

            <div className="flanora-signup-row">
              <label htmlFor="dob">Date of birth *
                <input id="dob" name="dob" type="date" autoComplete="bday" required />
              </label>
              <label htmlFor="phone">Phone number
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
              </label>
            </div>

            <label htmlFor="signupEmail">Email address *
              <input id="signupEmail" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>

            <label htmlFor="password">Password *
              <input id="password" name="password" type="password" autoComplete="new-password" placeholder="8+ characters, upper &amp; lower case, a special character" minLength="8" required />
            </label>

            <label htmlFor="rePassword">Re-enter password *
              <input id="rePassword" name="rePassword" type="password" autoComplete="new-password" placeholder="Confirm your password" minLength="8" required />
            </label>

            <label className="flanora-tos-label" htmlFor="tos">
              <Checkbox id="tos" name="tos" required className="flanora-tos-checkbox" />
              <span>
                I agree to the{" "}
                <PreviewLinkCard>
                  <PreviewLinkCardTrigger asChild>
                    <a href="https://flanora-ai.becore.space/policies/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                  </PreviewLinkCardTrigger>
                  <PreviewLinkCardContent>
                    <PreviewLinkCardImage src="https://placehold.co/600x400/18181b/ffffff?text=Terms+of+Service" alt="Terms of Service Preview" />
                  </PreviewLinkCardContent>
                </PreviewLinkCard>
                {" "}and{" "}
                <PreviewLinkCard>
                  <PreviewLinkCardTrigger asChild>
                    <a href="https://flanora-ai.becore.space/policies/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  </PreviewLinkCardTrigger>
                  <PreviewLinkCardContent>
                    <PreviewLinkCardImage src="https://placehold.co/600x400/18181b/ffffff?text=Privacy+Policy" alt="Privacy Policy Preview" />
                  </PreviewLinkCardContent>
                </PreviewLinkCard>
              </span>
            </label>

            <label className="flanora-tos-label" htmlFor="newsletter">
              <Checkbox id="newsletter" name="newsletter" className="flanora-tos-checkbox" />
              <span>
                I’d like to receive occasional newsletters and updates from Flanora AI.
              </span>
            </label>

            {error && <p className="flanora-auth-message" role="alert">{error}</p>}

            <button className="flanora-auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="flanora-auth-legal">
            Already have an account?{" "}<Link to="/login">Log in</Link>
          </p>
        </div>
      </section>

      <aside className="flanora-auth-visual" aria-label="Flanora AI sign-up preview">
        <div className="flanora-auth-grid" aria-hidden="true" />
        <div className="flanora-auth-visual-content">
          <span>Flanora AI</span>
          <h2>Design the space you've always imagined.</h2>
          <p>Describe your vision and watch AI bring your floor plan to life in moments.</p>
        </div>
      </aside>
    </main>
  );
}

export default SignUpPage;
