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
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
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
