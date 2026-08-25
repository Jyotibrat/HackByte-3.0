import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sets up Lenis smooth scrolling and keeps GSAP's ScrollTrigger in sync
// with it. Call this once, from the top-level landing page component.
// Respects prefers-reduced-motion by skipping smoothing entirely.
export default function useLenis() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: false, // we drive it manually via gsap.ticker below —
      // leaving Lenis's own internal rAF loop on as well double-steps
      // the scroll physics every frame and is what was causing the jank.
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Every ScrollTrigger animation's start/end points are calculated in
    // pixels at the moment it's created. This page has a lot of images and
    // a video loading asynchronously further up the DOM — as those finish
    // loading, the page's real height keeps shifting, which silently
    // invalidates trigger positions calculated earlier. Sections further
    // down (Engagement, Testimonial, and anything after) can end up with
    // their entrance animations firing at the wrong scroll position,
    // leaving content stuck at its "from" (invisible) state.
    // Refreshing once everything has actually finished loading fixes it.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    // Re-check a beat after mount too, in case images/fonts settle
    // slightly after the window "load" event fires.
    const settleTimer = setTimeout(refresh, 500);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      clearTimeout(settleTimer);
    };
  }, []);
}