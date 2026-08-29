import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "./Counter";

gsap.registerPlugin(ScrollTrigger);

function Testimonial() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(photoRef.current, {
        clipPath: "inset(50% 50% 50% 50%)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(quoteRef.current, {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      });
      gsap.to(photoRef.current, {
        xPercent: 35,
        rotation: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonial paper" ref={sectionRef}>
      <div className="container grid12 quote-grid">
        <div className="quote-photo" ref={photoRef}>
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/95a6559d-388d-45c7-9ed3-b3d3fe4efa9a_800w.webp"
            alt="Client portrait"
          />
        </div>
        <blockquote className="quote display" ref={quoteRef}>
          "Flanora is an exploration of intelligence applied to architectural planning."
        </blockquote>
        <div className="quote-author">
          <strong>Bindupautra Jyotibrat</strong>
          <br />
          Creator, Flanora AI
        </div>
        <div className="quote-metrics">
          <div className="metric">
            <Counter value={84} />
            <span>Launches</span>
          </div>
          <div className="metric">
            <Counter value={96} />
            <span>Client retention %</span>
          </div>
          <div className="metric">
            <Counter value={14} />
            <span>International awards</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;