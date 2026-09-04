import React, { useEffect } from "react";
import "./ModelsPage.css";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelsHero from "../components/models/ModelsHero";
import ModelsFamily from "../components/models/ModelsFamily";
import ModelsChoose from "../components/models/ModelsChoose";
import ModelsCTA from "../components/models/ModelsCTA";

gsap.registerPlugin(ScrollTrigger);

function ModelsPage() {
  useEffect(() => {
    document.title = "Flanora AI | Models";
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
    <div className="flanora-models-page">
      <main>
        <ModelsHero />
        <ModelsFamily />
        <ModelsChoose />
        <ModelsCTA />
      </main>
    </div>
  );
}

export default ModelsPage;
