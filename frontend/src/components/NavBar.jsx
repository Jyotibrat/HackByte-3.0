import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav
      class={`fixed right-8 top-1/2 -translate-y-1/2 h-auto py-8 px-4 
                flex flex-col items-center justify-center gap-6
                backdrop-blur-md bg-black/20 z-50
                rounded-xl shadow-2xl border border-white/20
                transition-all duration-300 hover:shadow-cyan-500/20
                ${isExpanded ? "translate-x-0" : "translate-x-2"}`}
      style={{ fontFamily: "Titillium Web, sans-serif" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div class="flex flex-col gap-6">
        {/* Home icon - always visible */}
        {currentPath !== "/" && (
          <Link to="/" class="group">
            <div class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-x-1 active:scale-95 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <span class="absolute right-16 bg-gray-900/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm">
              Home
            </span>
          </Link>
        )}

        {/* Models Page Link - always visible */}
        {currentPath !== "/models" && (
          <Link to="/models" class="group">
            <div class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-x-1 active:scale-95 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                />
              </svg>
            </div>
            <span class="absolute right-16 bg-gray-900/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm">
              Know More
            </span>
          </Link>
        )}

        {/* Results Page Link - always visible except on Results page */}
        {currentPath !== "/results" && (
          <Link to="/results" class="group">
            <div class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-x-1 active:scale-95 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <span class="absolute right-16 bg-gray-900/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm">
              Results
            </span>
          </Link>
        )}

        {/* Chat Link - hide on HomePage and ChatPage */}
        {currentPath !== "/chat" && currentPath !== "/" && (
          <Link to="/chat" class="group">
            <div class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-x-1 active:scale-95 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </div>
            <span class="absolute right-16 bg-gray-900/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm">
              Chat
            </span>
          </Link>
        )}

        {/* Contributors Page Link - always visible */}
        {currentPath !== "/contributors" && (
          <Link to="/contributors" class="group">
            <div class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-x-1 active:scale-95 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5Zm0 3.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 4.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 1.5 0v-3.75a.75.75 0 0 0-.75-.75Z"
                />
              </svg>
            </div>
            <span class="absolute right-16 bg-gray-900/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm">
              Contributors
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
