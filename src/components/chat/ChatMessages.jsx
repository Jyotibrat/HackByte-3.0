// ─────────────────────────────────────────────────────────────────────────────
// ChatMessages.jsx — Scrollable message thread
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import ChatMessage from "./ChatMessage";

function TypingIndicator() {
  return (
    <div className="flanora-chat-loading" aria-label="Flanora AI is generating">
      <div className="flanora-chat-message-avatar" aria-hidden="true">FL</div>
      <div className="flanora-chat-loading-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function ChatMessages({ messages, isLoading, messagesEndRef }) {
  return (
    <div className="flanora-chat-messages" role="log" aria-live="polite" aria-label="Conversation">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && <TypingIndicator />}

      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  );
}
