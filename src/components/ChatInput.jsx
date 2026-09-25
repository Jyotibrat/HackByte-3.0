import React from "react";
import { getModelDescription } from "../services/chatApiService";

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleKeyDown,
  isLoading,
  selectedModel,
  setSelectedModel,
  availableModels,
}) => {
  return (
    <div class="p-4 w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 mx-auto">
      <div class="relative flex shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow group">
        <select
          class="bg-gray-800/90 backdrop-blur-sm text-white rounded-l-lg border border-white/30 border-r-0 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          aria-label="Select AI model"
        >
          {availableModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <div class="relative flex-grow">
          <textarea
            class="w-full bg-white/20 backdrop-blur-sm text-white border border-white/20 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none px-3 py-2 resize-none min-h-[2.5rem] max-h-[10rem] overflow-auto transition-all text-sm"
            placeholder="Describe your floor plan requirements..."
            rows="1"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              fontFamily: "Martel Sans, sans-serif",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.3) transparent",
            }}
            disabled={isLoading}
          />

          <div class="absolute bottom-1 right-2 text-xs text-white/50 pointer-events-none">
            {inputMessage.length > 0 && `${inputMessage.length} chars`}
          </div>

          {inputMessage.length > 0 && (
            <button
              class="absolute top-1.5 right-2 p-1 rounded-full bg-gray-700/40 hover:bg-gray-700/60 text-white/70 hover:text-white/90 transition-colors"
              onClick={() => setInputMessage("")}
              aria-label="Clear message"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-3.5 h-3.5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>

        <button
          class="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-white rounded-r-lg min-w-14 px-3 flex items-center justify-center transition-colors transform hover:scale-105 active:scale-95"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === "" || isLoading}
          aria-label="Send message"
        >
          {isLoading ? (
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          )}
        </button>
      </div>

      <div class="flex justify-between items-center text-xs text-white/60 mt-2 px-1">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span class="italic">{getModelDescription(selectedModel)}</span>
      </div>
    </div>
  );
};

export default ChatInput;
