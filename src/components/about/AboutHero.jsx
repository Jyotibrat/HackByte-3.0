import { useRef, useEffect } from "react";
import gsap from "gsap";
import heroImg from "../../assets/about/about_hero_img.png";

const HERO_TEXT = "Architecture Begins With an Idea";
const WORDS = HERO_TEXT.split(" ");

function AboutHero() {
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const chars = textRef.current.querySelectorAll('.hero-char');

      gsap.set(chars, {
        x: () => gsap.utils.random(-120, 120),
        y: () => gsap.utils.random(-120, 120),
        rotation: () => gsap.utils.random(-180, 180),
        scale: 0,
        opacity: 0,
      });

      gsap.to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.02,
        delay: 0.2,
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-hero">
      <div className="about-hero-graphic">
        <img
          src={heroImg}
          alt="Abstract architectural lines with glowing AI core"
          style={{ borderRadius: '12px' }}
        />
        <h1 className="hero-overlay-text" ref={textRef}>
          {WORDS.map((word, wi) => (
            <span className="hero-word" key={wi}>
              {word.split("").map((char, ci) => (
                <span className="hero-char" key={ci}>{char}</span>
              ))}
              {wi < WORDS.length - 1 && "\u00A0"}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

export default AboutHero;