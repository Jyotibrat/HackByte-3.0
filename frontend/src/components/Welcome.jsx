import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showElements, setShowElements] = useState(false);

  const fullText = "Welcome to FloorPlan AI";

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      // Set delay between each character (adjust for speed)
      const typingTimeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, 45); // 45ms between characters

      return () => clearTimeout(typingTimeout);
    } else {
      setIsTypingComplete(true);
      // Add slight delay before showing the rising elements
      setTimeout(() => {
        setShowElements(true);
      }, 300);
    }
  }, [displayedText, fullText]);

  const handleGetStartedClick = () => {
    // Start the animation
    setIsNavigating(true);

    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate("/chat");
    }, 500); // Match this with CSS transition duration
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-screen transition-opacity duration-700 ${
        isNavigating ? "opacity-0" : "opacity-100"
      }`}
      style={{ fontFamily: "Josefin Sans, sans-serif" }}
    >
      <div className="text-center p-8 rounded-2xl mb-8 transition-transform duration-500">
        <h1
          className={`text-6xl font-bold mb-2 transition-transform duration-500 ${
            isNavigating ? "translate-y-10 opacity-0" : ""
          }`}
        >
          {displayedText}
          <span
            className={`${isTypingComplete ? "opacity-0" : "animate-blink"}`}
          >
            |
          </span>
        </h1>
        <p
          className={`text-2xl text-gray-900 transition-all duration-700 ease-out delay-100 
          ${isNavigating ? "translate-y-10 opacity-0" : ""} 
          ${isTypingComplete ? "opacity-100" : "opacity-0"}
          ${showElements ? "transform-none" : "translate-y-8"}`}
          style={{ fontFamily: "Martel Sans, sans-serif" }}
        >
          Transform your ideas into stunning floor plans instantly. <br />
          Describe your dream space, and watch as AI brings it to life.
        </p>
      </div>
      <button
        className={`bg-white text-gray-800 font-bold py-3 px-8 rounded-full 
                  focus:outline-none focus:ring-4 focus:ring-white/50 
                  hover:bg-gray-100 hover:shadow-lg 
                  transition-all duration-700 ease-out group
                  ${isNavigating ? "scale-105 opacity-0" : ""}
                  ${isTypingComplete ? "opacity-100" : "opacity-0"}
                  ${showElements ? "transform-none" : "translate-y-12"}`}
        style={{ fontFamily: "Martel Sans, sans-serif" }}
        onClick={handleGetStartedClick}
        disabled={isNavigating || !isTypingComplete}
      >
        <div className="flex items-center">
          <span className="group-hover:translate-x-[-4px] transition-transform duration-300">
            Get Started
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-0 h-5 overflow-hidden group-hover:w-5 transition-all duration-300 ml-0 group-hover:ml-2"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}

export default Welcome;
