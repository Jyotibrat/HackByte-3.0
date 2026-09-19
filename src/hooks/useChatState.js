// ─────────────────────────────────────────────────────────────────────────────
// useChatState.js — All state and business logic for the /chat workspace
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from "react";
import { generateFloorPlan, getModelApiKey } from "../services/chatApiService";

export const CHAT_MODELS = [
  { id: "Flanora-v1", label: "Flanora v1", disabled: false },
  { id: "Flanora-v2", label: "Flanora v2", disabled: false },
];

export const EXAMPLE_PROMPTS = [
  "A 3-bedroom family home with open-plan kitchen and garden access",
  "A 2-bedroom home with a dedicated work-from-home studio",
];

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function trimTitle(text, max = 40) {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

export function useChatState() {
  const [conversations, setConversations]           = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [inputMessage, setInputMessage]             = useState("");
  const [selectedModel, setSelectedModel]           = useState("Flanora-v1");
  const [isLoading, setIsLoading]                   = useState(false);

  const messagesEndRef = useRef(null);

  // Derive active conversation + its messages
  const activeConversation = conversations.find(c => c.id === activeConversationId) ?? null;
  const messages = activeConversation?.messages ?? [];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const startNewChat = useCallback(() => {
    setActiveConversationId(null);
    setInputMessage("");
  }, []);

  const selectConversation = useCallback((id) => {
    setActiveConversationId(id);
  }, []);

  const handleSend = useCallback(async (overrideText) => {
    const prompt = (overrideText ?? inputMessage).trim();
    if (!prompt || isLoading) return;

    // Create or resolve conversation
    let convId = activeConversationId;
    if (!convId) {
      convId = `conv-${generateId()}`;
      const newConv = {
        id: convId,
        title: trimTitle(prompt),
        messages: [],
        model: selectedModel,
        createdAt: new Date().toISOString(),
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(convId);
    }

    const userMessage = {
      id: `msg-${generateId()}`,
      sender: "user",
      text: prompt,
      timestamp: new Date().toISOString(),
    };

    setConversations(prev =>
      prev.map(c => c.id === convId
        ? { ...c, messages: [...c.messages, userMessage] }
        : c
      )
    );
    setInputMessage("");

    try {
      setIsLoading(true);
      const modelKey = getModelApiKey(selectedModel);
      const data = await generateFloorPlan(prompt, modelKey);

      const aiResponse = {
        id: `msg-${generateId()}`,
        sender: "ai",
        text: data.message || "Here's your generated floor plan.",
        timestamp: new Date().toISOString(),
        imageUrl: data.imageUrl ?? null,
        allImages: data.allImages ?? null,
      };

      setConversations(prev =>
        prev.map(c => c.id === convId
          ? { ...c, messages: [...c.messages, aiResponse] }
          : c
        )
      );
    } catch (error) {
      const errorText = error?.message
        ?? "Sorry, there was an error generating your floor plan. Please try again.";

      const errorResponse = {
        id: `msg-${generateId()}`,
        sender: "ai",
        text: errorText,
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setConversations(prev =>
        prev.map(c => c.id === convId
          ? { ...c, messages: [...c.messages, errorResponse] }
          : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, activeConversationId, selectedModel]);

  return {
    // State
    conversations,
    activeConversationId,
    activeConversation,
    messages,
    inputMessage,
    selectedModel,
    isLoading,
    messagesEndRef,
    // Actions
    setInputMessage,
    setSelectedModel,
    startNewChat,
    selectConversation,
    handleSend,
  };
}
