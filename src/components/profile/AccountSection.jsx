import { ProfileAvatar } from "./ProfileAvatar";

/**
 * ProfileField — a read-only display row for a user data field.
 * Accepts: label, value, hint (optional), badge (optional node)
 */
export function ProfileField({ label, value, hint, badge }) {
  return (
    <div className="profile-field">
      <div className="profile-field__label">{label}</div>
      <div className="profile-field__row">
        <span className="profile-field__value">{value || <span className="profile-field__empty">Not set</span>}</span>
        {badge && <span className="profile-field__badge">{badge}</span>}
      </div>
      {hint && <p className="profile-field__hint">{hint}</p>}
    </div>
  );
}

/**
 * ProfileCard — a grouped block of fields with an optional title.
 * Accepts: title (optional), children
 */
export function ProfileCard({ title, children }) {
  return (
    <section className="profile-card">
      {title && <h2 className="profile-card__title">{title}</h2>}
      <div className="profile-card__body">{children}</div>
    </section>
  );
}

/**
 * AccountSection — full "Account" tab content.
 */
export function AccountSection({ user }) {
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ");
  const joinDate = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const authBadge =
    user?.auth_provider === "google" ? (
      <span className="profile-badge profile-badge--google">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
          <path d="M5.84 14.09A6.95 6.95 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.16A10.94 10.94 0 0 0 1 12c0 1.78.43 3.45 1.16 4.93l3.68-2.84Z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84C6.71 7.31 9.14 5.38 12 5.38Z" fill="#EA4335" />
        </svg>
        Google
      </span>
    ) : (
      <span className="profile-badge profile-badge--email">Email</span>
    );

  return (
    <div className="profile-section">
      {/* Hero card with avatar */}
      <div className="profile-hero">
        <ProfileAvatar user={user} size="xl" />
        <div className="profile-hero__info">
          <h1 className="profile-hero__name">{fullName || "Flanora User"}</h1>
          <p className="profile-hero__email">{user?.email}</p>
          {joinDate && <p className="profile-hero__joined">Member since {joinDate}</p>}
        </div>
      </div>

      <ProfileCard title="Personal Information">
        <ProfileField label="First name" value={user?.first_name} />
        <ProfileField label="Last name" value={user?.last_name} />
        <ProfileField label="Email address" value={user?.email} badge={user?.email_verified ? (
          <span className="profile-badge profile-badge--verified">✓ Verified</span>
        ) : (
          <span className="profile-badge profile-badge--unverified">Unverified</span>
        )} />
        <ProfileField label="Phone number" value={user?.phone_number} hint="Used for account recovery." />
      </ProfileCard>

      <ProfileCard title="Connected Account">
        <ProfileField label="Sign-in method" value={user?.auth_provider === "google" ? "Google" : "Email & Password"} badge={authBadge} />
      </ProfileCard>
    </div>
  );
}
