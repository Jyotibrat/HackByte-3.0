import React from "react";
import { Link } from "react-router-dom";

const ChatSidebar = ({
  sidebarExpanded,
  conversations,
  activeConversation,
  handleNewChat,
  setActiveConversation,
  setSidebarExpanded,
}) => {
  return (
    <div
      class={`${sidebarExpanded ? "translate-x-0" : "-translate-x-full"} 
              transition-transform duration-300 fixed left-0 top-0 w-72 
              flex-shrink-0 flex flex-col bg-gray-900/80 text-white backdrop-blur-md 
              h-full z-10 shadow-2xl border-r border-white/10`}
    >
      <div class="p-6 border-b border-white/20">
        <div class="flex items-center mb-6">
          <Link to="/" class="flex items-center">
            <h1 class="text-xl font-bold">FloorPlan AI</h1>
          </Link>
        </div>
        <button
          class="w-full py-2.5 px-4 rounded-lg border border-white/20 hover:bg-white/10 
                  hover:shadow-md transition-all flex items-center justify-center gap-2 
                  bg-black/20 backdrop-blur-sm"
          onClick={handleNewChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>New chat</span>
        </button>
        <div class="mt-3 text-xs text-white/60">
          Note: Chat history is only for current session
        </div>
      </div>

      <div class="flex-grow overflow-y-auto py-2">
        <h2 class="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
          Chat History
        </h2>
        {conversations.length === 0 ? (
          <div class="px-4 py-3 text-white/50 text-sm">
            No conversations yet. Start a new chat!
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              class={`mx-2 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all flex items-center gap-2
                        ${
                          activeConversation === conv.id
                            ? "bg-white/15 shadow-md"
                            : ""
                        }`}
              onClick={() => {
                setActiveConversation(conv.id);
                setSidebarExpanded(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-5 h-5 text-cyan-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <span>{conv.title}</span>
            </div>
          ))
        )}
      </div>

      <div class="p-4 border-t border-white/10">
        <button class="w-full py-2 px-3 rounded-lg text-sm text-white/70 hover:text-white/90 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          <span>Help</span>
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
