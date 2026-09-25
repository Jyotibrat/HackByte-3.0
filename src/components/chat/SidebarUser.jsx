// ─────────────────────────────────────────────────────────────────────────────
// SidebarUser.jsx — User profile area at the bottom of the sidebar
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ChevronRightIcon() {
  return (
    <svg className="flanora-sidebar-user-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function getInitials(user) {
  if (!user) return "F";
  if (user.name) {
    return user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  }
  if (user.email) return user.email[0].toUpperCase();
  return "F";
}

function getDisplayName(user) {
  if (!user) return "Guest";
  return user.name || user.email || "Flanora User";
}

export default function SidebarUser() {
  const { user } = useAuth();

  return (
    <div className="flanora-sidebar-user">
      <Link to="/profile" className="flanora-sidebar-user-card" aria-label="Account settings">
        <div className="flanora-sidebar-user-avatar">
          {user?.picture ? (
            <img src={user.picture} alt={getDisplayName(user)} />
          ) : (
            getInitials(user)
          )}
        </div>
        <div className="flanora-sidebar-user-info">
          <div className="flanora-sidebar-user-name">{getDisplayName(user)}</div>
          <div className="flanora-sidebar-user-plan">Free Plan</div>
        </div>
        <ChevronRightIcon />
      </Link>
    </div>
  );
}
