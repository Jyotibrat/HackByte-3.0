import { useEffect, useRef } from "react";
import gsap from "gsap";

// const NAMES = ["Kanto", "Axiom", "Lumen", "Vestra", "Monocle", "Terrain", "Noma", "Circa"];
const NAMES = ["GENERATIVE DESIGN", "RESIDENTIAL PLANNING", "AI × ARCHITECTURE", "", "", "", "", "ARCHITECTURAL IDEATION"];



// FLANORA AI

function Ticker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 22,
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  // Rendered twice back-to-back so the -50% xPercent loop is seamless.
  const items = [...NAMES, ...NAMES];

  return (
    <div className="ticker paper">
      <div className="ticker-track" ref={trackRef}>
        {items.map((name, i) => (
          <span key={`${name}-${i}`}>{name}</span>
        ))}
      </div>
    </div>
  );
}

export default Ticker;