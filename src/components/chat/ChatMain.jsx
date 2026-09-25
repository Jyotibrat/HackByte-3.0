// ─────────────────────────────────────────────────────────────────────────────
// ChatMain.jsx — Main content area (toggle button + body + composer)
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import ChatEmptyState from "./ChatEmptyState";
import ChatMessages from "./ChatMessages";
import ChatComposer from "./ChatComposer";

// Sidebar panel toggle icon — rectangle with vertical left-divider
function SidebarPanelIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1.5" y="1.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="1.5" x2="7" y2="18.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ChatMain({
  onToggleSidebar,
  activeConversation,
  messages,
  isLoading,
  messagesEndRef,
  inputMessage,
  setInputMessage,
  selectedModel,
  setSelectedModel,
  onSend,
}) {
  const hasMessages = messages.length > 0 || isLoading;

  const handlePromptSelect = (prompt) => {
    setInputMessage(prompt);
  };

  return (
    <main className="flanora-chat-main" aria-label="Chat workspace">
      {/* Sidebar toggle — panel icon */}
      <button
        className="flanora-chat-sidebar-toggle"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
      >
        <SidebarPanelIcon />
      </button>

      {/* Scrollable body — empty state or message thread */}
      <div className="flanora-chat-body">
        {hasMessages ? (
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        ) : (
          <ChatEmptyState onPromptSelect={handlePromptSelect} />
        )}
      </div>

      {/* Composer — always at bottom */}
      <ChatComposer
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        isLoading={isLoading}
        onSend={onSend}
      />
    </main>
  );
}
