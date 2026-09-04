import React, { useEffect } from "react";
import "./FeaturesPage.css";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersectionObserver } from "../components/features/useIntersectionObserver";

gsap.registerPlugin(ScrollTrigger);
import FeaturesHero from "../components/features/FeaturesHero";
import FeaturesProcess from "../components/features/FeaturesProcess";
import FeaturesExploration from "../components/features/FeaturesExploration";
import FeaturesModels from "../components/features/FeaturesModels";
import FeaturesWorkspace from "../components/features/FeaturesWorkspace";
import FeaturesOpenResearch from "../components/features/FeaturesOpenResearch";
import FeaturesCTA from "../components/features/FeaturesCTA";

function FeaturesPage() {
  useIntersectionObserver();

  useEffect(() => {
    document.title = "Flanora AI | Features";
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
    }
    const settleTimer = setTimeout(refresh, 500);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener('load', refresh);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className="flanora-features-page font-body-md features-clip-x selection:bg-ink-text selection:text-paper-bg">
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
