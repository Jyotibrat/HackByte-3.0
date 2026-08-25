import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Intro from "../components/landing/Intro";
import Ticker from "../components/landing/Ticker";
import Projects from "../components/landing/Projects";
import Capabilities from "../components/landing/Capabilities";
import CustomCursor from "../components/landing/CustomCursor";
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
        {/* Next sections (Engagement, Testimonial, ...) get added here,
            one at a time. */}
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}

export default HomePage;