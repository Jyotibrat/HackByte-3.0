// ─────────────────────────────────────────────────────────────────────────────
// ChatEmptyState.jsx — Hero, feature highlights and example prompts
// Shown when no active conversation is selected.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { EXAMPLE_PROMPTS } from "../../hooks/useChatState";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Residential Floor Plans",
    description: "Generate detailed residential layouts from natural-language descriptions.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
    title: "Two AI Models",
    description: "Choose between Flanora v1 and v2 to match your design style.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Instant Ideation",
    description: "Turn a brief description into a visual concept in seconds.",
  },
];

export default function ChatEmptyState({ onPromptSelect }) {
  return (
    <div className="flanora-chat-empty">
      {/* Hero */}
      <div className="flanora-chat-hero">
        <h1 className="flanora-chat-hero-title">
          Design your space with <em>Flanora.</em>
        </h1>
        <p className="flanora-chat-hero-subtitle">
          Describe your dream home in plain language and let Flanora AI generate
          a residential floor plan concept instantly.
        </p>
      </div>

      {/* Feature highlights */}
      <div className="flanora-chat-features" aria-label="Key features">
        {FEATURES.map(({ icon, title, description }) => (
          <div className="flanora-chat-feature-card" key={title}>
            {icon}
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        ))}
      </div>

      {/* Example prompts */}
      <p className="flanora-chat-prompts-label">Try an example prompt</p>
      <div className="flanora-chat-prompts" role="list">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className="flanora-chat-prompt-chip"
            role="listitem"
            onClick={() => onPromptSelect(prompt)}
            title={`Use prompt: ${prompt}`}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
