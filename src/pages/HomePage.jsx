import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Footer from "../components/Footer";
import useLenis from "../components/landing/useLenis";
import "../components/landing/landing.css";
import Navbar from "../components/NavBar"

function HomePage() {
  useLenis();

  return (
    <div className="nf-landing" id="top">
      <Navbar />
      <main>
        <Hero />
        {/* Next sections (Intro, Ticker, Projects, ...) get added here,
            one at a time. */}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;