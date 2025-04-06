import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import KnowMorePage from "./pages/KnowMorePage";
import ContributorsPage from "./pages/ContributorsPage";
import ResultsPage from "./pages/ResultsPage";
import StableDiffusionPage from "./pages/StableDiffusionPage";
import DallEPage from "./pages/DallEPage";
import MidjourneyPage from "./pages/MidjourneyPage";
import Navbar from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";

// Wrapper component that provides the page transition effect
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/models" element={<KnowMorePage />} />
        <Route path="/models/stable-diffusion" element={<StableDiffusionPage />}/>
        <Route path="/models/dall-e" element={<DallEPage />} />
        <Route path="/models/midjourney" element={<MidjourneyPage />} />
        <Route path="/contributors" element={<ContributorsPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time - replace with actual resource loading logic
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a slight delay before showing content with animation
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`app-container transition-all duration-700 ease-out ${
        showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
