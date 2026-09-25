// ─────────────────────────────────────────────────────────────────────────────
// ChatPage.jsx — /chat route composition
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from "react";
import "./ChatPage.scss";

import { useChatState } from "../hooks/useChatState";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMain    from "../components/chat/ChatMain";

const MOBILE_BREAKPOINT = 768;

export default function ChatPage() {
  const {
    conversations,
    activeConversationId,
    activeConversation,
    messages,
    inputMessage,
    selectedModel,
    isLoading,
    messagesEndRef,
    setInputMessage,
    setSelectedModel,
    startNewChat,
    selectConversation,
    handleSend,
  } = useChatState();

  const [isMobile, setIsMobile]         = useState(false);
  // Desktop: "full" (260px) | "mini" (52px icon-only rail)
  const [desktopMode, setDesktopMode]   = useState("full");
  // Mobile: sidebar shown as overlay or hidden
  const [mobileOpen, setMobileOpen]     = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (e.matches) setMobileOpen(false);
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(o => !o);
    } else {
      setDesktopMode(m => m === "full" ? "mini" : "full");
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile) setMobileOpen(false);
  };

  const handleNewChat = () => {
    startNewChat();
    if (isMobile) setMobileOpen(false);
  };

  // Derive props for ChatSidebar
  const isMini   = !isMobile && desktopMode === "mini";
  const isOpen   = isMobile ? mobileOpen : true; // desktop sidebar always present (full or mini)

  return (
    <div className="flanora-chat-workspace">
      <ChatSidebar
        isOpen={isOpen}
        isMini={isMini}
        isMobile={isMobile}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={selectConversation}
        onClose={handleCloseSidebar}
      />

      <ChatMain
        onToggleSidebar={handleToggleSidebar}
        activeConversation={activeConversation}
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        onSend={handleSend}
      />
    </div>
  );
}
