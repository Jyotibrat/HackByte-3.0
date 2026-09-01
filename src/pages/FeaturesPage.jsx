import React from "react";
import "./FeaturesPage.css";
import { useIntersectionObserver } from "../components/features/useIntersectionObserver";
import FeaturesHero from "../components/features/FeaturesHero";
import FeaturesProcess from "../components/features/FeaturesProcess";
import FeaturesExploration from "../components/features/FeaturesExploration";
import FeaturesModels from "../components/features/FeaturesModels";
import FeaturesWorkspace from "../components/features/FeaturesWorkspace";
import FeaturesOpenResearch from "../components/features/FeaturesOpenResearch";
import FeaturesCTA from "../components/features/FeaturesCTA";

function FeaturesPage() {
  useIntersectionObserver();

  return (
    <div className="flanora-features-page font-body-md overflow-x-hidden selection:bg-ink-text selection:text-paper-bg">
      <main>
        <FeaturesHero />
        <FeaturesProcess />
        <FeaturesExploration />
        <FeaturesModels />
        <FeaturesWorkspace />
        <FeaturesOpenResearch />
        <FeaturesCTA />
      </main>
    </div>
  );
}

export default FeaturesPage;
