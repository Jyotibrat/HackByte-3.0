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
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import ResearchPage from "./pages/ResearchPage";
import PoliciesPage from "./pages/PoliciesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import MarketingLayout from "./components/MarketingLayout";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location}>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/models" element={<KnowMorePage />} />
          <Route path="/models/stable-diffusion" element={<StableDiffusionPage />} />
          <Route path="/models/dall-e" element={<DallEPage />} />
          <Route path="/models/midjourney" element={<MidjourneyPage />} />
          <Route path="/team" element={<ContributorsPage />} />
          <Route path="/showcase" element={<ResultsPage />} />
          <Route path="/showcase/flanora-v1" element={<ResultsPage />} />
          <Route path="/showcase/flanora-v2" element={<ResultsPage />} />
          <Route path="/showcase/flanora-v3" element={<ResultsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/publications" element={<ResearchPage />} />
          <Route path="/research/articles" element={<ResearchPage />} />
          <Route path="/research/technical-reports" element={<ResearchPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/policies/terms-of-use" element={<PoliciesPage />} />
          <Route path="/policies/privacy-policy" element={<PoliciesPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 2000);

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
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
