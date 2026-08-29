import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Cinematic() {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { xPercent: -18 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "center center", scrub: true },
        }
      );
      gsap.to(titleRef.current, {
        scale: 0.82,
        letterSpacing: "-.09em",
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      // The source registers two competing tweens on .cinematic-card that
      // both write `rotation` over different scroll ranges (leftover from
      // an earlier draft pass — same duplication pattern found on
      // .archive-row). Consolidated here: the y/opacity entrance reveal
      // plays over a short range near the top of the section, then a
      // single rotation+drift runs continuously across the full section.
      gsap.from(cardRef.current, {
        y: 260,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "center center", scrub: true },
      });
      gsap.to(cardRef.current, {
        rotation: 18,
        xPercent: 120,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "center 55%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cinematic section" ref={sectionRef}>
      <div className="cinematic-bg">
        <img
          ref={bgImgRef}
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/variants/df48517c-b34b-4aa2-b653-96984538305d/3840w.jpg"
          alt="Architecture"
        />
      </div>
      <div className="cinematic-inner">
        <h2 className="display" ref={titleRef}>
          Imagine your<br />
          next floor<br />
          plan.
        </h2>
        <div className="cinematic-card" ref={cardRef}>
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d1d195f0-17d7-4654-a1fc-c9e3192705c4_800w.webp"
            alt="Editorial portrait"
          />
        </div>
        <Link to="/chat" className="cinematic-cta" ref={ctaRef}>
          Try Flanora Now ↗
        </Link>
      </div>
    </section>
  );
}

export default Cinematic;