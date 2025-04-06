// ChatPage.jsx (updated to potentially handle Axios errors slightly differently)
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/NavBar";
import ChatSidebar from "../components/ChatSidebar";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { generateFloorPlan, getModelApiKey } from "../services/chatApiService";

function ChatPage() {
  
  // State management (remains the same)
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState(
    "Multi Modal Text to Image Generator"
  );
  const [availableModels] = useState([
    "Multi Modal Text to Image Generator",
    "Fused Stable Diffusion and ControlNet",
    "Gemini with Matplotlib Floor Planner",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of messages (remains the same)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleNewChat = () => {
    const newId =
      conversations.length > 0
        ? Math.max(...conversations.map((c) => c.id)) + 1
        : 1;

    const newConversation = {
      id: newId,
      title: `New Conversation ${newId}`,
      messages: [],
    };

    setConversations([...conversations, newConversation]);
    setActiveConversation(newId);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Create and add user message (remains the same)
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    try {
      // Show loading state (remains the same)
      setIsLoading(true);

      // Get the correct API key for the selected model (remains the same)
      const modelApiKey = getModelApiKey(selectedModel);

      // Call the API service (using axios now)
      const data = await generateFloorPlan(userMessage.text, modelApiKey);

      // Create AI response with the returned data
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.message || "Here's your floor plan",
        timestamp: new Date().toISOString(),
        imageUrl: data.imageUrl,
        // Add the allImages array if it exists
        ...(data.allImages && { allImages: data.allImages }),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      // Update conversation title if this is a new conversation (remains the same)
      if (conversations.length > 0 && activeConversation) {
        const updatedConversations = conversations.map((conv) => {
          if (
            conv.id === activeConversation &&
            conv.title.startsWith("New Conversation")
          ) {
            return {
              ...conv,
              title:
                userMessage.text.substring(0, 20) +
                (userMessage.text.length > 20 ? "..." : ""),
            };
          }
          return conv;
        });
        setConversations(updatedConversations);
      }
    } catch (error) {
      console.error("Error generating floor plan:", error);

      // Show error message to user (can access more error details with Axios)
      let errorMessage =
        "Sorry, there was an error generating your floor plan. Please try again.";
      if (error.message) {
        errorMessage = error.message; // Use the specific error message
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: errorMessage,
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  

  return (
    <div class="flex h-screen bg-gradient-animated text-white">
      <Navbar />

      {/* Sidebar Toggle Button (remains the same) */}
      <button
        onClick={toggleSidebar}
        class={`fixed top-4 ${
          sidebarExpanded ? "left-[292px]" : "left-4"
        } z-20 p-2 rounded-full bg-gray-800/90 hover:bg-gray-700/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:scale-110`}
        aria-label={sidebarExpanded ? "Hide sidebar" : "Show sidebar"}
      >
        {sidebarExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Sidebar Component (remains the same) */}
      <ChatSidebar
        sidebarExpanded={sidebarExpanded}
        conversations={conversations}
        activeConversation={activeConversation}
        handleNewChat={handleNewChat}
        setActiveConversation={setActiveConversation}
        setSidebarExpanded={setSidebarExpanded}
      />

      {/* Main Chat Area (remains the same) */}
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-hidden flex flex-col">
          <div class="text-center pt-8 pb-4">
            <h2
              class="text-2xl font-bold mb-2 text-white"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              FloorPlan AI Assistant
            </h2>
            <p
              class="text-white"
              style={{ fontFamily: "Martel Sans, sans-serif" }}
            >
              Describe your floor plan needs and our AI will help you create it
            </p>
            <p class="text-s text-white mt-1">
              Using <span class="font-bold">{selectedModel}</span> to generate
              floor plans
            </p>
          </div>

          {/* Messages Container (remains the same) */}
          <div class="flex-1 mx-4 lg:mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 overflow-y-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-sm mb-4 p-4">
            <MessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          </div>

          {/* Chat Input Component (remains the same) */}
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            isLoading={isLoading}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            availableModels={availableModels}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
