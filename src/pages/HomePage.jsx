import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Intro from "../components/landing/Intro";
import Ticker from "../components/landing/Ticker";
import Projects from "../components/landing/Projects";
import Capabilities from "../components/landing/Capabilities";
import Engagement from "../components/landing/Engagement";
import Testimonial from "../components/landing/Testimonial";
import CustomCursor from "../components/landing/CustomCursor";
import Footer from "../components/Footer";
import useLenis from "../components/landing/useLenis";
import "../components/landing/landing.css";
import NavBar from "../components/NavBar";

function HomePage() {
  useLenis();

  return (
    <div className="nf-landing" id="top">
      <NavBar />
      <main>
        <Hero />
        <Intro />
        <Ticker />
        <Projects />
        <Capabilities />
        <Engagement />
        <Testimonial />
        {/* Next sections (Archive, Cinematic, Big Stats, Journal) get
            added here, one at a time. */}
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}

export default HomePage;