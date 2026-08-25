import { useEffect } from "react";
import gsap from "gsap";

// Wires up a project-media / hover-media element to the global cursor
// (via window events, see CustomCursor.jsx) and scales its inner
// img/video slightly on mousemove.
export default function useHoverMedia(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const media = el.querySelector("img, video");

    const enter = () => window.dispatchEvent(new Event("cursor:show"));
    const leave = () => {
      window.dispatchEvent(new Event("cursor:hide"));
      if (media) gsap.to(media, { scale: 1, duration: 0.4, overwrite: true });
    };
    const move = () => {
      if (media) gsap.to(media, { scale: 1.025, duration: 0.4, overwrite: true });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousemove", move);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mousemove", move);
    };
  }, [ref]);
}