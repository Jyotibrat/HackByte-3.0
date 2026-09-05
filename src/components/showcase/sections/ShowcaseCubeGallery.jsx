import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ShowcasePage.css';

gsap.registerPlugin(ScrollTrigger);

// 6-sided prism (hexagon) -> 60deg per rotation step
const CUBE_FACES = 6;
const FACE_WIDTH = 160;
// Radius = (width / 2) / Math.tan(Math.PI / CUBE_FACES)
const TZ = Math.round((FACE_WIDTH / 2) / Math.tan(Math.PI / CUBE_FACES)); // ~139

const pathCoordinates = [
  { x: '15vw', y: '50vh' }, // 0: Middle Left
  { x: '35vw', y: '20vh' }, // 1: Top Center-Left
  { x: '75vw', y: '20vh' }, // 2: Top Right
  { x: '85vw', y: '50vh' }, // 3: Middle Right
  { x: '65vw', y: '80vh' }, // 4: Bottom Center-Right
  { x: '25vw', y: '80vh' }, // 5: Bottom Left
];

const ShowcaseCubeGallery = ({ results }) => {
  const sectionRef   = useRef(null); // the tall scrollable section
  const stickyRef    = useRef(null); // the sticky viewport-height child
  const cubeRef      = useRef(null); // the 3D cube element
  const bgRefs       = useRef([]);   // one per slide
  const numberTrackRef = useRef(null);

  bgRefs.current = [];
  const addBg = el => el && bgRefs.current.push(el);

  const slides = results;
  const count  = slides.length;

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !cubeRef.current || count === 0) return;

    ScrollTrigger.getAll().forEach(t => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${count * 100}vh`,
        scrub: 1.2,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // 1. Move cube along the specific 6-step path
    gsap.set(cubeRef.current, { 
      x: pathCoordinates[0].x, 
      y: pathCoordinates[0].y,
      xPercent: -50,
      yPercent: -50,
      rotateY: 0
    });

    for (let i = 1; i < count; i++) {
      const coord = pathCoordinates[i % pathCoordinates.length];
      tl.to(
        cubeRef.current,
        { x: coord.x, y: coord.y, ease: 'none', duration: 1 },
        i - 1
      );
    }

    // 2. Rotate cube continuously (6 faces -> 60deg per slide)
    const totalRotation = (count - 1) * 60;
    tl.fromTo(
      cubeRef.current,
      { rotateY: 0 },
      { rotateY: -totalRotation, ease: 'none', duration: count - 1 },
      0
    );

    // Initialize odometer track
    if (numberTrackRef.current) {
      gsap.set(numberTrackRef.current, { y: '0em' });
    }

    // 3. Per-slide fading and odometer animation
    slides.forEach((slide, i) => {
      const bg = bgRefs.current[i];
      if (!bg) return;

      // Fade-in bg
      if (i === 0) {
        gsap.set(bg, { opacity: 1, zIndex: 1 });
      } else {
        gsap.set(bg, { opacity: 0, zIndex: i + 1 });
        tl.to(bg, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, i - 0.45);
      }
      if (i < count - 1) {
        tl.to(bg, { opacity: 0, duration: 0.25, ease: 'power1.in' }, i + 0.55);
      }

      // Animate Odometer Number
      if (i > 0 && numberTrackRef.current) {
        // Transition exactly between slide times
        tl.to(numberTrackRef.current, {
          y: `-${i}em`,
          duration: 1,
          ease: 'power2.inOut'
        }, i - 1);
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
    <section ref={sectionRef} className="cube-scroll-section">
      <div ref={stickyRef} className="cube-sticky">

        <div className="cube-bg-stack">
          {slides.map((slide) => (
            <div
              key={`bg-${slide.id}`}
              ref={addBg}
              className="cube-bg-layer"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          ))}
          <div className="cube-bg-scrim" />
        </div>

        {/* Global Odometer Title */}
        <div className="cube-global-title">
          <span className="cube-title-static">FLANORA V</span>
          <div className="cube-title-odometer">
            <div className="cube-title-track" ref={numberTrackRef}>
              {slides.map((s, idx) => (
                <div key={`num-${idx}`}>{s.title.replace('Flanora v', '')}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="cube-scene">
          <div ref={cubeRef} className="cube-object">
            {slides.slice(0, CUBE_FACES).map((slide, i) => (
              <div
                key={`face-${slide.id}`}
                className="cube-face"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  transform: `rotateY(${i * 60}deg) translateZ(${TZ}px)`,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShowcaseCubeGallery;
