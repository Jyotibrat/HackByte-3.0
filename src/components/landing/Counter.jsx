import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Counts up from 0 to `value` once it scrolls into view. Mirrors the
// original page's animateCounter(), just as a proper React component
// instead of a data-count attribute + querySelectorAll pass.
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const isInteger = Number.isInteger(value);
    const obj = { v: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: value,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            const display = isInteger ? Math.round(obj.v) : obj.v.toFixed(1);
            el.textContent = display + suffix;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix]);

  return <strong ref={ref}>0</strong>;
}

export default Counter;