import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DonateHero from "../components/donate/DonateHero";
import DonateWhySupport from "../components/donate/DonateWhySupport";
import DonateAllocations from "../components/donate/DonateAllocations";
import DonateSupportOptions from "../components/donate/DonateSupportOptions";
import DonateClosing from "../components/donate/DonateClosing";
import "./DonatePage.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DonatePage() {
  const [toastMessage, setToastMessage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = "Support Flanora AI — /donate";

    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    let animationFrameId;
    const update = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    // Provide Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Initialise GSAP
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx;

    if (!prefersReduced) {
      ctx = gsap.context(() => {
        /* Hero entrance */
        gsap.set(".hero-field", { clipPath: "inset(0 0 0 0%)" });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".site-header", { y: -14, opacity: 0, duration: 0.8 }, 0.05)
          .from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.7 }, 0.15)
          .from(".hero-title .line-inner", { yPercent: 112, duration: 1.15, stagger: 0.1 }, 0.2)
          .from(".hero-lede", { y: 20, opacity: 0, duration: 0.9 }, 0.55)
          .from(".hero-field", { clipPath: "inset(0 0 0 100%)", duration: 1.25, ease: "power3.inOut" }, 0.4)
          .from(".hero-meta > *", { y: 16, opacity: 0, stagger: 0.08, duration: 0.7 }, 0.75)
          .from(".hero-foot", { opacity: 0, duration: 0.8 }, 1.0);

        /* Generic in-view reveals */
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 26,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        /* Staggered list reveals */
        gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            y: 26,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          });
        });

        /* Allocation rail draws with scroll */
        gsap.to(".rail-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".alloc-wrap",
            start: "top 72%",
            end: "bottom 48%",
            scrub: true,
          },
        });
      }, containerRef);
    }

    // Refresh ScrollTrigger to ensure calculations are correct after mounting
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      if (ctx) ctx.revert();
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <div className="donate-page-root" ref={containerRef}>
      <main id="main">
        <DonateHero />
        <DonateWhySupport />
        <DonateAllocations />
        <DonateSupportOptions setToastMessage={setToastMessage} />
        <DonateClosing />
      </main>

      {/* Toast Notification Container */}
      <div className="toast-stack" aria-live="polite">
        {toastMessage && (
          <div className="toast show">
            <span>{toastMessage}</span>
            <button className="toast-close" type="button" aria-label="Dismiss" onClick={closeToast}>
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
