import "./App.css";
import "./App.scss";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ModelsPage from "./pages/ModelsPage";
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
import ContactPage from "./pages/ContactPage";
import StatusPage from "./pages/StatusPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import SurveyPaper2025 from "./pages/SurveyPaper2025";
import MarketingLayout from "./components/MarketingLayout";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location}>
        <Route element={<MarketingLayout />}>
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/models/flanora-v1" element={<StableDiffusionPage />} />
          <Route path="/models/flanora-v2" element={<DallEPage />} />
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
          <Route path="/research/resources" element={<ResearchPage />} />
          <Route path="/research/resources/presentations" element={<ResearchPage />} />
          <Route path="/research/resources/datasets" element={<ResearchPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/policies/:policy" element={<PoliciesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/status" element={<StatusPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/research/publications/survey-paper-2025" element={<SurveyPaper2025 />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
}

import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  // Once the entrance transition has visibly finished, we drop the
  // scale/opacity utility classes entirely. Tailwind's scale-100 still
  // resolves to `transform: scale(1)`, and ANY non-"none" transform on an
  // ancestor changes how descendant `position: fixed` elements (and GSAP
  // ScrollTrigger pins, which rely on fixed positioning under the hood)
  // are positioned — they end up relative to this element instead of the
  // viewport. Leaving scale-100 applied forever was silently breaking the
  // fixed navbar and pinned scroll sections further down the app.
  const [transitionDone, setTransitionDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowContent(true);
        // Matches the 700ms transition duration below, plus a small buffer.
        setTimeout(() => setTransitionDone(true), 750);
      }, 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const transitionClasses = transitionDone
    ? ""
    : `transition-all duration-700 ease-out ${
        showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`;

  return (
    <div className={`app-container ${transitionClasses}`}>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;