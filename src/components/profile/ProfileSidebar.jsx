import { Link, useLocation } from "react-router-dom";

/**
 * ProfileSidebar — left navigation panel for profile settings.
 * Each nav item is defined as data, making it trivial to add/remove sections.
 */

const NAV_ITEMS = [
  {
    id: "account",
    label: "Account",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "activity",
    label: "Activity",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function ProfileSidebar({ activeSection, onNavigate }) {
  return (
    <aside className="profile-sidebar">
      <p className="profile-sidebar__heading">Settings</p>
      <nav className="profile-sidebar__nav" aria-label="Profile sections">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`profile-sidebar__item ${activeSection === item.id ? "is-active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            <span className="profile-sidebar__icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="profile-sidebar__footer">
        <Link to="/" className="profile-sidebar__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Flanora
        </Link>
      </div>
    </aside>
  );
}
