import { useEffect, useRef } from "react";
import gsap from "gsap";
import Counter from "./Counter";

const STATS = [
  { value: 2.4, suffix: "M", text: "Total audience reach across campaigns and digital launches" },
  { value: 118, suffix: "K", text: "Creative assets delivered across identity, motion and web" },
  { value: 93, suffix: "+", text: "Brand launches shaped from strategy to final experience" },
  { value: 21, suffix: "", text: "Countries reached through international collaborations" },
];

function BigStats() {
  const gridRef = useRef(null);
  const statRefs = useRef([]);
  statRefs.current = [];

  const addStatRef = (el) => {
    if (el) statRefs.current.push(el);
  };

  useEffect(() => {
    const stats = statRefs.current;
    gsap.set(stats, { y: 45, opacity: 0 });

    // Plain IntersectionObserver instead of ScrollTrigger here — this
    // section sits below a lot of pinned/sticky scroll machinery
    // (Capabilities' pin, Cinematic's sticky 145vh section), and
    // ScrollTrigger's pre-calculated pixel positions were ending up
    // stale by the time we reached this far down the page, leaving
    // these permanently stuck at opacity:0. IntersectionObserver has
    // no pre-calculated positions to go stale — it just directly
    // watches whether the element is actually on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = stats.indexOf(entry.target);
          gsap.to(entry.target, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.05,
            ease: "power2.out",
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    stats.forEach((stat) => observer.observe(stat));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="big-stats paper diagonal-top">
      <div className="container stats-grid" ref={gridRef}>
        {STATS.map((stat) => (
          <div className="stat" key={stat.text} ref={addStatRef}>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p>{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BigStats;