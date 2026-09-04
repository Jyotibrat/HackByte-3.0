// src/pages/ResearchPage.jsx
//
// ─── SECTION COMPOSITION ────────────────────────────────────────────────────
// This file is the orchestrator for the Research page.
// Each section lives in its own file under:
//   src/components/research/sections/
//
// To ADD a new section:
//   1. Create a new component in the sections/ folder.
//   2. Import it here.
//   3. Place <NewSection /> inside the wrapper div below.
//
// To REMOVE a section:
//   1. Delete the import line.
//   2. Remove the component tag from the wrapper div.
//
// To REORDER sections:
//   Just move the component tags up or down inside the wrapper div.
// ────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ResearchHero        from '../components/research/sections/ResearchHero';
import ResearchCategories  from '../components/research/sections/ResearchCategories';
import ResearchEcosystem   from '../components/research/sections/ResearchEcosystem';
import ResearchMethodology from '../components/research/sections/ResearchMethodology';
import ResearchCTA         from '../components/research/sections/ResearchCTA';

import './ResearchPage.css';

gsap.registerPlugin(ScrollTrigger);

function ResearchPage() {
  useEffect(() => {
    document.title = "Flanora AI | Research";
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ── Lenis smooth scroll ──────────────────────────────────────────────────
    // Lenis smooths wheel/touch input but still drives the native window scroll,
    // so NO scrollerProxy is needed — ScrollTrigger reads window.scrollY normally.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Feed Lenis ticks into GSAP's RAF loop so both run in sync.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // After each Lenis frame, tell ScrollTrigger to re-check positions.
    lenis.on('scroll', ScrollTrigger.update);

    // ── ScrollTrigger position refresh ──────────────────────────────────────
    // In an SPA the window 'load' event has already fired before this route
    // mounts. We need to refresh AFTER React has painted the full page so
    // ScrollTrigger caches correct trigger positions (especially important
    // when background images expand section heights after first paint).
    // Double-rAF guarantees we run after the browser's layout/paint pass.
    let raf1, raf2;
    const scheduleRefresh = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => ScrollTrigger.refresh(true));
      });
    };
    scheduleRefresh();

    // Also refresh whenever a still-loading image finishes (bg images may
    // increase page height and shift trigger points downward).
    const pendingImgs = Array.from(document.images).filter((img) => !img.complete);
    const onImgLoad = () => ScrollTrigger.refresh(true);
    pendingImgs.forEach((img) => img.addEventListener('load', onImgLoad, { once: true }));

    // ── GSAP animations ─────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      gsap.from('.hero-heading', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      pendingImgs.forEach((img) => img.removeEventListener('load', onImgLoad));
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flanora-research-page blueprint-bg min-h-screen">
      <ResearchHero />
      <ResearchCategories />
      <ResearchEcosystem />
      <ResearchMethodology />
      <ResearchCTA />
    </div>
  );
}

export default ResearchPage;