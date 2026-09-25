// ─────────────────────────────────────────────────────────────────────────────
// ChatComposer.jsx — Prompt input + model selector + generate button
// ─────────────────────────────────────────────────────────────────────────────
import React, { useRef, useEffect } from "react";
import ModelSelector from "./ModelSelector";

const MAX_CHARS = 1000;

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function ChatComposer({
  inputMessage,
  setInputMessage,
  selectedModel,
  setSelectedModel,
  isLoading,
  onSend,
}) {
  const textareaRef = useRef(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [inputMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleGenerate = () => {
    if (inputMessage.trim() && !isLoading) {
      onSend();
    }
  };

  const charCount = inputMessage.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canSend = inputMessage.trim().length > 0 && !isLoading && !isOverLimit;

  return (
    <div className="flanora-chat-composer-wrap">
      <div className="flanora-chat-composer">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className="flanora-chat-composer-textarea"
          placeholder="Describe your dream home…"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          maxLength={MAX_CHARS + 100}
          aria-label="Prompt input"
          aria-describedby="composer-hint"
        />

        {/* Bottom bar */}
        <div className="flanora-chat-composer-bottom">
          <div className="flanora-chat-composer-bottom-left">
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>

          <div className="flanora-chat-composer-bottom-right">
            {charCount > 0 && (
              <span
                className={`flanora-chat-char-count${isOverLimit ? " is-warning" : ""}`}
                aria-live="polite"
                aria-label={`${charCount} of ${MAX_CHARS} characters`}
              >
                {charCount}/{MAX_CHARS}
              </span>
            )}

            <button
              className="flanora-chat-generate-btn"
              onClick={handleGenerate}
              disabled={!canSend}
              aria-label="Generate floor plan"
            >
              {isLoading ? (
                <span className="flanora-chat-spinner" aria-label="Generating…" />
              ) : (
                <SendIcon />
              )}
              {isLoading ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </div>

      <p className="flanora-chat-composer-hint" id="composer-hint">
        Press <kbd>Enter</kbd> to generate · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
