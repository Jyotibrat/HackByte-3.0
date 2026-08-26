import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Intro from "../components/landing/Intro";
import Ticker from "../components/landing/Ticker";
import Projects from "../components/landing/Projects";
import Capabilities from "../components/landing/Capabilities";
import Engagement from "../components/landing/Engagement";
import Testimonial from "../components/landing/Testimonial";
import Archive from "../components/landing/Archive";
import Cinematic from "../components/landing/Cinematic";
import CustomCursor from "../components/landing/CustomCursor";
import ArchivePreview from "../components/landing/ArchivePreview";
import Footer from "../components/Footer";
import useLenis from "../components/landing/useLenis";
import "../components/landing/landing.css";

function HomePage() {
  useLenis();

  return (
    <div className="nf-landing" id="top">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Ticker />
        <Projects />
        <Capabilities />
        <Engagement />
        <Testimonial />
        <Archive />
        <Cinematic />
        {/* Next sections (Big Stats, Journal) get added here, one at a
            time. */}
      </main>
      <Footer />
      <CustomCursor />
      <ArchivePreview />
    </div>
  );
}

export default HomePage;