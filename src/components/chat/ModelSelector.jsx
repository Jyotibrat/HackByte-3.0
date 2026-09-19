// ─────────────────────────────────────────────────────────────────────────────
// ModelSelector.jsx — Model picker dropdown in the composer
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import { CHAT_MODELS } from "../../hooks/useChatState";

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="flanora-model-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ModelSelector({ selectedModel, onModelChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const activeModel = CHAT_MODELS.find(m => m.id === selectedModel) ?? CHAT_MODELS[0];

  return (
    <div className="flanora-model-selector-wrap" ref={wrapRef}>
      <button
        type="button"
        className={`flanora-model-selector${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Selected model: ${activeModel.label}. Click to change.`}
      >
        {activeModel.label}
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div
          className="flanora-model-dropdown"
          role="listbox"
          aria-label="Select AI model"
        >
          {CHAT_MODELS.map((model) => (
            <button
              key={model.id}
              className={`flanora-model-option${model.id === selectedModel ? " is-selected" : ""}`}
              role="option"
              aria-selected={model.id === selectedModel}
              disabled={model.disabled}
              onClick={() => {
                if (!model.disabled) {
                  onModelChange(model.id);
                  setIsOpen(false);
                }
              }}
            >
              <div className="flanora-model-option-left">
                <span className="flanora-model-option-name">{model.label}</span>
                {model.badge && (
                  <span className="flanora-model-option-badge">{model.badge}</span>
                )}
              </div>
              {model.id === selectedModel && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
