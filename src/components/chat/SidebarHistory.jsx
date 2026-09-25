// ─────────────────────────────────────────────────────────────────────────────
// SidebarHistory.jsx — Previous conversations list
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function SidebarHistory({ conversations, activeConversationId, onSelect }) {
  return (
    <div className="flanora-sidebar-history">
      <p className="flanora-sidebar-history-label">Previous Chats</p>

      {conversations.length === 0 ? (
        <p className="flanora-sidebar-history-empty">
          Your conversations will appear here.
        </p>
      ) : (
        <ul role="list" style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {conversations.map((conv) => (
            <li key={conv.id}>
              <button
                className={`flanora-sidebar-history-item${activeConversationId === conv.id ? " is-active" : ""}`}
                onClick={() => onSelect(conv.id)}
                aria-current={activeConversationId === conv.id ? "true" : undefined}
                title={conv.title}
              >
                <ChatBubbleIcon />
                <span>{conv.title || "Untitled conversation"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
