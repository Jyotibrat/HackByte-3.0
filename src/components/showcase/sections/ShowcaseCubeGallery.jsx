import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ShowcasePage.css';

gsap.registerPlugin(ScrollTrigger);

// Number of faces on the 3D cube (we show one per slide)
const CUBE_FACES = 4; // 4-sided cube → 90deg per rotation step

const ShowcaseCubeGallery = ({ results }) => {
  const sectionRef   = useRef(null); // the tall scrollable section
  const stickyRef    = useRef(null); // the sticky viewport-height child
  const cubeRef      = useRef(null); // the 3D cube element
  const bgRefs       = useRef([]);   // one per slide
  const titleRefs    = useRef([]);   // one per slide
  const subtitleRefs = useRef([]);   // one per slide

  bgRefs.current       = [];
  titleRefs.current    = [];
  subtitleRefs.current = [];

  const addBg       = el => el && bgRefs.current.push(el);
  const addTitle    = el => el && titleRefs.current.push(el);
  const addSubtitle = el => el && subtitleRefs.current.push(el);

  const slides = results;
  const count  = slides.length;

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !cubeRef.current || count === 0) return;

    // Kill previous triggers on re-mount / filter change
    ScrollTrigger.getAll().forEach(t => t.kill());

    const totalRotation = (count - 1) * 90; // 90deg step per face

    // Main timeline pinned to the sticky section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${count * 100}vh`, // each slide = 100vh of scroll
        scrub: 1.2,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // 1. Move cube from left edge to right edge across the full section
    tl.fromTo(
      cubeRef.current,
      { x: '-8vw' },
      { x: '65vw', ease: 'none', duration: count - 1 },
      0
    );

    // 2. Rotate cube continuously
    tl.fromTo(
      cubeRef.current,
      { rotateY: 0 },
      { rotateY: -totalRotation, ease: 'none', duration: count - 1 },
      0
    );

    // 3. Per-slide: fade backgrounds and animate titles
    slides.forEach((_, i) => {
      const bg       = bgRefs.current[i];
      const title    = titleRefs.current[i];
      const subtitle = subtitleRefs.current[i];
      const progress = i / (count - 1 || 1); // 0 → 1

      if (!bg || !title) return;

      // Fade-in this bg at its scroll position, fade-out after
      if (i === 0) {
        // First slide starts fully visible
        gsap.set(bg, { opacity: 1, zIndex: 1 });
      } else {
        gsap.set(bg, { opacity: 0, zIndex: i + 1 });
        tl.to(bg, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, i - 0.45);
      }
      if (i < count - 1) {
        // Fade out before next slide appears
        tl.to(bg, { opacity: 0, duration: 0.25, ease: 'power1.in' }, i + 0.55);
      }

      // Title: slide up & fade in
      gsap.set(title, { opacity: 0, y: 60 });
      if (subtitle) gsap.set(subtitle, { opacity: 0, y: 40 });

      const titleIn = i === 0 ? 0 : i - 0.35;
      tl.to(title, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, titleIn);
      if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, titleIn + 0.08);

      if (i < count - 1) {
        const titleOut = i + 0.4;
        tl.to(title, { opacity: 0, y: -40, duration: 0.25, ease: 'power2.in' }, titleOut);
        if (subtitle) tl.to(subtitle, { opacity: 0, y: -25, duration: 0.2, ease: 'power2.in' }, titleOut + 0.05);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
    };
  }, [slides, count]);

  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-white/40 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
        </svg>
        <p className="text-xl text-white/70">No results found for this model</p>
      </div>
    );
  }

  return (
    // ─── Tall section that drives the pin ───────────────────────────────────────
    <section ref={sectionRef} className="cube-scroll-section">

      {/* ─── Sticky viewport-height panel ─────────────────────────────────────── */}
      <div ref={stickyRef} className="cube-sticky">

        {/* Background layers – one per slide, stacked via z-index */}
        <div className="cube-bg-stack">
          {slides.map((slide, i) => (
            <div
              key={`bg-${slide.id}`}
              ref={addBg}
              className="cube-bg-layer"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          ))}
          {/* Dark scrim so text is always legible */}
          <div className="cube-bg-scrim" />
        </div>

        {/* ─── Text content – one per slide, all absolutely positioned ─── */}
        <div className="cube-text-stack">
          {slides.map((slide, i) => (
            <div key={`text-${slide.id}`} className="cube-text-item">
              <span className="cube-model-badge">{slide.model}</span>
              <h2 ref={addTitle} className="cube-title">{slide.title}</h2>
              <p ref={addSubtitle} className="cube-subtitle">{slide.description}</p>
            </div>
          ))}
        </div>

        {/* ─── Scroll progress indicator ──────────────────────────────────── */}
        <div className="cube-slide-count">
          {slides.map((_, i) => (
            <span key={i} className="cube-dot" />
          ))}
        </div>

        {/* ─── 3D Cube ────────────────────────────────────────────────────── */}
        <div className="cube-scene">
          <div ref={cubeRef} className="cube-object">
            {slides.slice(0, CUBE_FACES).map((slide, i) => (
              <div
                key={`face-${slide.id}`}
                className="cube-face"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  transform: `rotateY(${i * 90}deg) translateZ(130px)`,
                }}
              />
            ))}
            {/* Top & Bottom caps */}
            <div className="cube-face cube-face--top" />
            <div className="cube-face cube-face--bottom" />
          </div>
        </div>

        {/* ─── Scroll hint on first load ───────────────────────────────────── */}
        <div className="cube-scroll-hint">
          <span>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/>
            <rect x="6.5" y="4" width="3" height="6" rx="1.5" fill="white" fillOpacity="0.7"/>
          </svg>
        </div>

      </div>
    </section>
  );
};

export default ShowcaseCubeGallery;
