import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ShowcasePage.css';

gsap.registerPlugin(ScrollTrigger);

// Standard 6-face cube — 160px faces, TZ = half face size = 80px
const FACE_SIZE = 160;
const TZ = FACE_SIZE / 2; // 80px

// Cube rotation state at each of the 6 slides.
// Transitions:
//  0->1: rotateY -90  (left-to-right)  + diagonal move
//  1->2: rotateY -90  (left-to-right)  + sideways move
//  2->3: rotateX -90  (bottom-to-up)   + diagonal move
//  3->4: rotateY +90, rotateX back->0  (right-to-left) + diagonal move
//  4->5: rotateY +90  (right-to-left)  + sideways move
const ROTATION_STATES = [
  { rotateY: 0,    rotateX: 0   }, // slide 0 -> front face
  { rotateY: -90,  rotateX: 0   }, // slide 1 -> right face
  { rotateY: -180, rotateX: 0   }, // slide 2 -> back face
  { rotateY: -180, rotateX: -90 }, // slide 3 -> bottom face
  { rotateY: -90,  rotateX: 0   }, // slide 4 -> right face (image swapped)
  { rotateY: 0,    rotateX: 0   }, // slide 5 -> front face (image swapped)
];

// CSS transform for each of the 6 cube faces
// indices: 0=front, 1=right, 2=back, 3=left, 4=top, 5=bottom
const FACE_TRANSFORMS = [
  `rotateY(0deg)   translateZ(${TZ}px)`,
  `rotateY(90deg)  translateZ(${TZ}px)`,
  `rotateY(180deg) translateZ(${TZ}px)`,
  `rotateY(-90deg) translateZ(${TZ}px)`,
  `rotateX(-90deg) translateZ(${TZ}px)`,
  `rotateX(90deg)  translateZ(${TZ}px)`,
];

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
  const faceRefs       = useRef([]);

  bgRefs.current   = [];
  faceRefs.current = [];
  const addBg   = el => el && bgRefs.current.push(el);
  const addFace = el => el && faceRefs.current.push(el);

  const slides = results;
  const count  = slides.length;

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !cubeRef.current || count === 0) return;

    ScrollTrigger.getAll().forEach(t => t.kill());

    // Assign initial face images:
    //  front=slide0, right=slide1, back=slide2, bottom=slide3
    //  left/top unused; right & front will be swapped dynamically for slides 4 & 5
    const initImages = { 0: slides[0]?.imageUrl, 1: slides[1]?.imageUrl, 2: slides[2]?.imageUrl, 5: slides[3]?.imageUrl };
    faceRefs.current.forEach((face, i) => {
      if (initImages[i]) face.style.backgroundImage = `url(${initImages[i]})`;
    });

    let prevNearest = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${count * 100}vh`,
        scrub: 1.2,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Dynamically swap images on right & front faces for slides 4 & 5
          const pos = self.progress * (count - 1);
          const nearest = Math.min(Math.round(pos), count - 1);
          if (nearest === prevNearest) return;
          const dir = self.direction;
          const face = faceRefs.current;
          if (dir === 1) {
            if (nearest === 4 && face[1] && slides[4]) face[1].style.backgroundImage = `url(${slides[4].imageUrl})`;
            if (nearest === 5 && face[0] && slides[5]) face[0].style.backgroundImage = `url(${slides[5].imageUrl})`;
          } else {
            if (nearest === 3 && face[1] && slides[1]) face[1].style.backgroundImage = `url(${slides[1].imageUrl})`;
            if (nearest === 4 && face[0] && slides[0]) face[0].style.backgroundImage = `url(${slides[0].imageUrl})`;
          }
          prevNearest = nearest;
        },
      },
    });

    // Set initial cube position and rotation
    gsap.set(cubeRef.current, {
      x: pathCoordinates[0].x,
      y: pathCoordinates[0].y,
      xPercent: -50,
      yPercent: -50,
      rotateY: 0,
      rotateX: 0,
    });

    // Animate cube path + per-transition rotation
    for (let i = 1; i < count; i++) {
      const coord = pathCoordinates[i];
      const state = ROTATION_STATES[i];
      tl.to(cubeRef.current, {
        x: coord.x,
        y: coord.y,
        rotateY: state.rotateY,
        rotateX: state.rotateX,
        ease: 'none',
        duration: 1,
      }, i - 1);
    }

    // Initialize odometer track
    if (numberTrackRef.current) gsap.set(numberTrackRef.current, { y: '0em' });

    // Per-slide background fade + odometer tick
    slides.forEach((_, i) => {
      const bg = bgRefs.current[i];
      if (!bg) return;
      if (i === 0) {
        gsap.set(bg, { opacity: 1, zIndex: 1 });
      } else {
        gsap.set(bg, { opacity: 0, zIndex: i + 1 });
        tl.to(bg, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, i - 0.45);
      }
      if (i < count - 1) tl.to(bg, { opacity: 0, duration: 0.25, ease: 'power1.in' }, i + 0.55);
      if (i > 0 && numberTrackRef.current) {
        tl.to(numberTrackRef.current, { y: `-${i}em`, duration: 1, ease: 'power2.inOut' }, i - 1);
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
            {FACE_TRANSFORMS.map((transform, i) => (
              <div
                key={`face-${i}`}
                ref={addFace}
                className="cube-face"
                style={{ transform }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShowcaseCubeGallery;
