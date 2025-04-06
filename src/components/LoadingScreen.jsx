import React from "react";

const catchyPhrases = [
  "Crafting your dream spaces...",
  "Loading a great experience for you...",
  "Building something amazing...",
  "Turning your ideas into floor plans...",
  "Preparing architectural wonders...",
];

function LoadingScreen() {
  // Choose a random phrase
  const phrase =
    catchyPhrases[Math.floor(Math.random() * catchyPhrases.length)];

  return (
    <div class="fixed inset-0 bg-gradient-animated flex flex-col items-center justify-center z-[9999]">
      <div class="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-white/20 flex flex-col items-center max-w-md">
        {/* Loading spinner */}
        <div class="relative w-24 h-24 mb-6">
          <div class="absolute top-0 left-0 w-full h-full border-4 border-white/30 rounded-full"></div>
          <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              class="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>
        </div>

        {/* Catchy heading */}
        <h2
          class="text-2xl font-bold text-white mb-2 text-center"
          style={{ fontFamily: "Josefin Sans, sans-serif" }}
        >
          FloorPlan AI
        </h2>

        {/* Loading text */}
        <p
          class="text-white/90 text-center animate-pulse"
          style={{ fontFamily: "Martel Sans, sans-serif" }}
        >
          {phrase}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
