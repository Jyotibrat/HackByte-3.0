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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero heading reveal
      gsap.from('.hero-heading', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Stagger reveal for research category articles
      gsap.utils.toArray('.research-article').forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
        });
      });
    });

    return () => ctx.revert();
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
