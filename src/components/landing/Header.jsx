import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 28);

      const progress = progressRef.current;
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        progress.style.transform = `scaleX(${ratio})`;
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  // Entrance animation: header slides down and fades in on mount.
  // In the original file this was chained after the preloader finished;
  // your app already has its own LoadingScreen gating when HomePage mounts,
  // so this just plays once HomePage is on screen.
  useEffect(() => {
    let ctx;
    import("gsap").then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        gsap.from(headerRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
        });
      });
    });
    return () => ctx && ctx.revert();
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <header
        ref={headerRef}
        className={`site-header ${isScrolled ? "is-scrolled" : ""}`}
      >
        <a href="/" className="logo">
          <b>Flanora</b>
          <b>AI</b>
        </a>
        <nav className="nav">
          <Link to="/about">About</Link>
          <a href="/features">Features</a>
          <a href="/models">Models</a>
          <a href="/research">Research</a>
          <a href="/showcase">Showcase</a>
        </nav>
        <a href="#contact" className="header-cta">
          Start a project ↗
        </a>
      </header>
    </>
  );
}

export default Header;