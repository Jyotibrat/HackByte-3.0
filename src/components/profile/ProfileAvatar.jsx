/**
 * ProfileAvatar — displays initials or avatar image.
 * Accepts: user object, size ('sm' | 'md' | 'lg' | 'xl')
 */
export function ProfileAvatar({ user, size = "md", className = "" }) {
  const initials = [user?.first_name?.[0], user?.last_name?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase() || "?";

  const sizeMap = {
    sm: "profile-avatar--sm",
    md: "profile-avatar--md",
    lg: "profile-avatar--lg",
    xl: "profile-avatar--xl",
  };

  return (
    <div className={`profile-avatar ${sizeMap[size]} ${className}`} aria-label={`Avatar for ${user?.first_name}`}>
      {user?.picture ? (
        <img src={user.picture} alt="" className="profile-avatar__img" referrerPolicy="no-referrer" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
