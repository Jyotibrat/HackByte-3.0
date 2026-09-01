import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutHero from "../components/about/AboutHero";
import AboutWhy from "../components/about/AboutWhy";
import AboutLanguageToLayout from "../components/about/AboutLanguageToLayout";
import AboutModelFamily from "../components/about/AboutModelFamily";
import AboutResearchPeople from "../components/about/AboutResearchPeople";
import AboutFAQ from "../components/about/AboutFAQ";
import AboutFooterCTA from "../components/about/AboutFooterCTA";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  // AboutPage.jsx
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh once everything (including images) has painted
    const imgs = Array.from(document.images);
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === 'complete') {
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener('load', refresh);
    }

    const pending = imgs.filter(img => !img.complete);
    pending.forEach(img => img.addEventListener('load', refresh, { once: true }));

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      window.removeEventListener('load', refresh);
      pending.forEach(img => img.removeEventListener('load', refresh));
    };
  }, []);

  return (
    <div className="about-page-wrapper">
      <AboutHero />
      <AboutWhy />
      <AboutLanguageToLayout />
      <AboutModelFamily />
      <AboutResearchPeople />
      <AboutFAQ />
      <AboutFooterCTA />
    </div>
  );
}

export default AboutPage;
