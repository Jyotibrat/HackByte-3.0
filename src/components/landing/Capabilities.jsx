import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CAP_ROWS = [
  {
    num: "01",
    title: "Generative Intelligence",
    copy: "Transforming natural-language ideas into visual spatial concepts through custom generative AI models and workflows.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85",
    alt: "Art direction",
  },
  {
    num: "02",
    title: "Architectural Thinking",
    copy: "Exploring residential layouts and spatial possibilities through AI-assisted architectural ideation and design.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/520a171e-7d8c-49b9-af99-096a7a699892/320w.png",
    alt: "Identity systems",
  },
  {
    num: "03",
    title: "Research\u00A0& Exploration",
    copy: "Investigating how generative AI can influence, accelerate, and reshape the future of residential floor-plan planning.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
    alt: "Digital experiences",
  },
];

function CapRow({ row }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = rowRef.current;
      if (!el) return;
      
      gsap.from(el.children, {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
      
      const img = el.querySelector(".image");
      if (img) {
        gsap.from(img, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="cap-row" ref={rowRef}>
      <div className="num">{row.num}</div>
      <div className="image">
        <img src={row.image} alt={row.alt} />
      </div>
      <h3 className="display">{row.title}</h3>
      <p>{row.copy}</p>
    </div>
  );
}

function Capabilities() {
  const introRef = useRef(null);
  const statementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = statementRef.current.querySelectorAll("span");

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        },
      });
      words.forEach((word, i) => {
        introTl.to(word, { color: "#fff", duration: 1 }, i);
      });
      introTl.to(statementRef.current, { y: -40, duration: 1 }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="capabilities dark diagonal-top" id="capabilities">
      <div className="container">
        <div className="eyebrow">02 / Capabilities</div>

        <div className="cap-intro" ref={introRef}>
          <div className="cap-statement display" ref={statementRef}>
            <span>Language becomes structure.</span>
            <span>Structure becomes image.</span>
            <span>Image becomes possibility.</span>
          </div>
        </div>

        {CAP_ROWS.map((row) => (
          <CapRow key={row.num} row={row} />
        ))}
      </div>
    </section>
  );
}

export default Capabilities;