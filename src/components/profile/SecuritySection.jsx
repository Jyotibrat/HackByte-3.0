import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { changePassword, extractErrorMessage } from "../../services/authApiService";
import { ProfileCard, ProfileField } from "./AccountSection";

/**
 * ChangePasswordForm — inline form to change email/password account password.
 * Hidden by default; toggled by a button.
 */
function ChangePasswordForm({ onSuccess, onError }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState({ current: "", next: "", confirm: "" });

  const handleChange = (e) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fields.next !== fields.confirm) {
      onError("New passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    try {
      await changePassword(fields.current, fields.next);
      setIsOpen(false);
      setFields({ current: "", next: "", confirm: "" });
      onSuccess("Password changed successfully.");
    } catch (err) {
      onError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button type="button" className="profile-action-btn" onClick={() => setIsOpen(true)}>
        Change password
      </button>
    );
  }

  return (
    <form className="profile-inline-form" onSubmit={handleSubmit}>
      <label className="profile-inline-form__label">
        Current password
        <input name="current" type="password" value={fields.current} onChange={handleChange} required autoComplete="current-password" />
      </label>
      <label className="profile-inline-form__label">
        New password
        <input name="next" type="password" value={fields.next} onChange={handleChange} required autoComplete="new-password" minLength={8} />
      </label>
      <label className="profile-inline-form__label">
        Confirm new password
        <input name="confirm" type="password" value={fields.confirm} onChange={handleChange} required autoComplete="new-password" minLength={8} />
      </label>
      <div className="profile-inline-form__actions">
        <button type="submit" className="profile-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save password"}
        </button>
        <button type="button" className="profile-cancel-btn" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

/**
 * SecuritySection — "Security" tab content.
 */
export function SecuritySection({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="profile-section">
      <h1 className="profile-section__heading">Security</h1>

      {message && <p className="profile-status profile-status--ok" role="status">{message}</p>}
      {error && <p className="profile-status profile-status--error" role="alert">{error}</p>}

      <ProfileCard title="Password">
        {user?.auth_provider === "google" ? (
          <p className="profile-field__hint" style={{ padding: "8px 0" }}>
            You signed in with Google — no password is set on this account.
          </p>
        ) : (
          <>
            <ProfileField label="Password" value="••••••••••••" hint="Use a strong, unique password you don't use elsewhere." />
            <ChangePasswordForm onSuccess={setMessage} onError={setError} />
          </>
        )}
      </ProfileCard>

      <ProfileCard title="Email verification">
        <ProfileField
          label="Status"
          value={user?.email_verified ? "Verified" : "Not verified"}
          badge={
            user?.email_verified ? (
              <span className="profile-badge profile-badge--verified">✓ Active</span>
            ) : (
              <span className="profile-badge profile-badge--unverified">Action required</span>
            )
          }
        />
      </ProfileCard>

      <ProfileCard title="Sessions">
        <p className="profile-field__hint">Signing out will end all active sessions on this device.</p>
        <button type="button" className="profile-danger-btn" onClick={handleLogout}>
          Sign out
        </button>
      </ProfileCard>
    </div>
  );
}
