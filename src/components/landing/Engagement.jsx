import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    small: "01 / GENERATE",
    title: "Create With Flanora",
    price: "Free To Explore",
    items: [
      "Natural language prompts",
      "Residential floor plans",
      "Multiple model options",
      "Four concepts per prompt"
    ],
    dark: false,
  },
  {
    small: "02 / BUILD",
    title: "Build With Flanora",
    price: "Free To Explore",
    items: [
      "Open model weights",
      "Curated datasets",
      "Google Colab support",
      "Local experimentation"
    ],
    dark: false,
  },
  {
    small: "03 / EXPLORE",
    title: "Explore Intelligence",
    price: "Free To Explore",
    items: [
      "Research publications",
      "Technical reports",
      "Articles & insights",
      "Flanora model ecosystem"
    ],
    dark: true,
  },
];

function Engagement() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const plansRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el) cardRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(cardRefs.current, {
        y: 90,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: plansRef.current,
          start: "top 78%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotate: i === 0 ? -3 : i === 2 ? 3 : 0 },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    // Re-refresh after a beat to handle any remaining layout shift
    // from media loading above this section (see useLenis.js comment).
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, []);

  return (
    <section className="engagement paper diagonal-top" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow">03 / Engagement</div>
        <h2 className="section-title display" ref={titleRef}>
          Work With Flanora
        </h2>
        <div className="plans" ref={plansRef}>
          {PLANS.map((plan) => (
            <div
              className={`plan${plan.dark ? " dark-card" : ""}`}
              key={plan.title}
              ref={addCardRef}
            >
              <small>{plan.small}</small>
              <h3>{plan.title}</h3>
              <div className="price">{plan.price}</div>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#contact">
                <span>Begin project</span>
                <span>↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Engagement;