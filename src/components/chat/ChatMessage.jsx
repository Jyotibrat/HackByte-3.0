// ─────────────────────────────────────────────────────────────────────────────
// ChatMessage.jsx — Single message bubble (user or AI)
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const messageClass =
    "flanora-chat-message" + (isUser ? " is-user" : "");

  const bubbleClass =
    "flanora-chat-message-bubble" + (message.isError ? " is-error" : "");

  const avatarLabel = isUser ? "You" : "AI";

  return (
    <div className={messageClass}>
      <div
        className="flanora-chat-message-avatar"
        aria-label={isUser ? "Your message" : "Flanora AI"}
      >
        {isUser ? "U" : "FL"}
      </div>

      <div className={bubbleClass}>
        <p className="flanora-chat-message-text">{message.text}</p>

        {/* Primary image */}
        {message.imageUrl && (
          <div className="flanora-chat-message-image">
            <img src={message.imageUrl} alt="Generated floor plan" />
          </div>
        )}

        {/* Additional images if present */}
        {message.allImages && message.allImages.length > 1 &&
          message.allImages.slice(1).map((img) => (
            <div className="flanora-chat-message-image" key={img.id}>
              <img
                src={img.imageUrl}
                alt={img.caption || `Floor plan design ${img.id + 1}`}
              />
            </div>
          ))
        }

        <div className="flanora-chat-message-time">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
