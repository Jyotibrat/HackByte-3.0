import { ProfileCard, ProfileField } from "./AccountSection";

/**
 * ActivitySection — "Activity" tab content.
 * Shows account metadata. Extend this to display generation history
 * once that data is available from the backend.
 */
export function ActivitySection({ user }) {
  const joinDate = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="profile-section">
      <h1 className="profile-section__heading">Activity</h1>

      <ProfileCard title="Account history">
        <ProfileField label="Member since" value={joinDate} />
        <ProfileField
          label="Sign-in method"
          value={user?.auth_provider === "google" ? "Google OAuth" : "Email & Password"}
        />
      </ProfileCard>

      <ProfileCard title="Usage">
        <div className="profile-empty-state">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <path d="M16 32V22M24 32V16M32 32V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p>Your generation history will appear here once you start creating floor plans.</p>
        </div>
      </ProfileCard>
    </div>
  );
}
