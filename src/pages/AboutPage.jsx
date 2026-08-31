import AboutHero from "../components/about/AboutHero";
import AboutWhy from "../components/about/AboutWhy";
import AboutLanguageToLayout from "../components/about/AboutLanguageToLayout";
import AboutModelFamily from "../components/about/AboutModelFamily";
import AboutResearchPeople from "../components/about/AboutResearchPeople";
import AboutFAQ from "../components/about/AboutFAQ";
import AboutFooterCTA from "../components/about/AboutFooterCTA";
import "./AboutPage.css";

function AboutPage() {
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
