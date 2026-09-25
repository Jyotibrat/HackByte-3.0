// ─────────────────────────────────────────────────────────────────────────────
// SidebarHeader.jsx — Flanora wordmark + New Chat button
// Text nodes wrapped in spans so CSS can hide them in mini mode.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Link } from "react-router-dom";

function FlanoraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="3 9 12 2 21 9 21 22 3 22" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function SidebarHeader({ onNewChat }) {
  return (
    <div className="flanora-sidebar-header">
      <Link to="/" className="flanora-sidebar-wordmark" aria-label="Flanora AI home">
        <FlanoraIcon />
        <span className="flanora-sidebar-text">Flanora AI</span>
      </Link>
      <button
        className="flanora-sidebar-new-chat"
        onClick={onNewChat}
        aria-label="Start a new chat"
        title="New Chat"
      >
        <PlusIcon />
        <span className="flanora-sidebar-text">New Chat</span>
      </button>
    </div>
  );
}
