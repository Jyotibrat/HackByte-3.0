import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    small: "01 / Sprint",
    title: "Direction Sprint",
    price: "$2,400",
    items: ["Visual direction", "Moodboard system", "Two core concepts", "Final presentation"],
    dark: false,
  },
  {
    small: "02 / Identity",
    title: "Identity System",
    price: "$7,800",
    items: [
      "Brand strategy",
      "Identity design",
      "Typography and color",
      "Brand guidelines",
      "Launch assets",
    ],
    dark: false,
  },
  {
    small: "03 / Full",
    title: "Full Experience",
    price: "From $14,500",
    items: [
      "Creative direction",
      "Brand system",
      "Campaign assets",
      "Motion language",
      "Website design",
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
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(cardRefs.current, {
        y: 90,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: plansRef.current, start: "top 78%" },
      });

      // Each card starts slightly rotated (outer two tilted, middle
      // straight) and straightens out as the section scrolls through.
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
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="engagement paper diagonal-top" ref={sectionRef}>
      <div className="container">
        <div className="eyebrow">03 / Engagement</div>
        <h2 className="section-title display" ref={titleRef}>
          Ways to Work Together
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