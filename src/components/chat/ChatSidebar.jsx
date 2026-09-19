// ─────────────────────────────────────────────────────────────────────────────
// ChatSidebar.jsx — Full sidebar composition
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarHistory from "./SidebarHistory";
import SidebarUser from "./SidebarUser";

export default function ChatSidebar({
  isOpen,
  isMini,
  isMobile,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onClose,
}) {
  let sidebarClass = "flanora-chat-sidebar";

  if (isMobile) {
    // On mobile: sidebar is a fixed overlay; show/hide via translate
    if (isOpen) sidebarClass += " is-mobile-open";
  } else {
    // On desktop: always in layout, but shrinks to icon-only rail when mini
    if (isMini) sidebarClass += " is-mini";
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="flanora-chat-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={sidebarClass} aria-label="Chat sidebar">
        <SidebarHeader onNewChat={onNewChat} isMini={isMini} />
        <SidebarNav isMini={isMini} />
        {/* History is hidden in mini mode via CSS */}
        <SidebarHistory
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelect={(id) => {
            onSelectConversation(id);
            if (isMobile) onClose();
          }}
        />
        <SidebarUser />
      </aside>
    </>
  );
}
