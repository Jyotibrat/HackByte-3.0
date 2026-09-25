import React from "react";

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
  if (messages.length === 0) {
    return (
      <div class="flex flex-col items-center justify-center h-full text-white/80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-12 h-12 mb-4 opacity-60"
        >
          <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 7.5 7.125v-3.75ZM12.75 6a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM7.5 14.625c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM12.75 18a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5Z" />
        </svg>
        <p class="text-lg font-medium">
          Start a conversation to generate floor plans
        </p>
        <p class="text-sm opacity-70 mt-2">
          Type your requirements and our AI will help you create it
        </p>
      </div>
    );
  }

  return (
    <div class="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          class={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            class={`max-w-[75%] rounded-lg px-4 py-3 shadow-lg transition-all hover:shadow-xl ${
              msg.sender === "user"
                ? "bg-cyan-600 text-white"
                : msg.isError
                ? "bg-red-700/80 text-white backdrop-blur-sm"
                : "bg-gray-700/80 text-white backdrop-blur-sm"
            }`}
          >
            <p>{msg.text}</p>

            {/* Simple image display */}
            {msg.imageUrl && (
              <div class="mt-3 rounded-md overflow-hidden border border-white/20">
                <img
                  src={msg.imageUrl}
                  alt="Generated Floor Plan"
                  class="w-full max-h-[300px] object-contain"
                />
              </div>
            )}

            <div class="text-xs opacity-70 text-right mt-2">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div class="flex justify-start">
          <div class="max-w-[75%] rounded-lg px-4 py-3 bg-gray-700/60 text-white backdrop-blur-sm shadow-lg">
            <div class="flex items-center gap-2">
              <div class="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
              <p>Generating floor plan...</p>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
