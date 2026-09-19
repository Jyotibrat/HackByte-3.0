// ─────────────────────────────────────────────────────────────────────────────
// SidebarNav.jsx — Primary navigation links in the sidebar
// Labels wrapped in .flanora-sidebar-text spans for mini-mode hiding.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Chat",
    to: "/chat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Models",
    to: "/models",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    to: "/showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    label: "Research",
    to: "/research",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: "Help & Support",
    to: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

export default function SidebarNav() {
  const { pathname } = useLocation();

  return (
    <nav className="flanora-sidebar-nav" aria-label="Chat workspace navigation">
      {NAV_ITEMS.map(({ label, to, icon }) => (
        <Link
          key={to}
          to={to}
          className={`flanora-sidebar-nav-item${pathname === to ? " is-active" : ""}`}
          aria-current={pathname === to ? "page" : undefined}
          title={label}
        >
          {icon}
          <span className="flanora-sidebar-text">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
