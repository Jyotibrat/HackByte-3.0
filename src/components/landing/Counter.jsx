import { useEffect, useRef } from "react";
import gsap from "gsap";

// Counts up from 0 to `value` once it scrolls into view. Mirrors the
// original page's animateCounter(), just as a proper React component
// instead of a data-count attribute + querySelectorAll pass.
//
// Uses a plain IntersectionObserver rather than ScrollTrigger: this
// component gets used deep in the page (Big Stats, Testimonial), below
// several pinned/sticky sections whose height ScrollTrigger has to
// account for, and its pre-calculated pixel positions were going stale
// by the time we scrolled that far — leaving counters permanently
// stuck at "0". IntersectionObserver just directly watches actual
// on-screen visibility, so there's nothing to go stale.
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const isInteger = Number.isInteger(value);
    const obj = { v: 0 };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(obj, {
            v: value,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              const display = isInteger ? Math.round(obj.v) : obj.v.toFixed(1);
              el.textContent = display + suffix;
            },
          });
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [value, suffix]);

  return <strong ref={ref}>0</strong>;
}

export default Counter;