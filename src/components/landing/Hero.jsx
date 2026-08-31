import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAuraVideo from "./useAuraVideo";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const wordRef = useRef(null);
  const topcopyRef = useRef(null);
  const linkRef = useRef(null);

  useAuraVideo(videoRef, "play-once");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance sequence — mirrors the original preloader-chained timeline,
      // just triggered on mount instead of on preloader-complete.
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(
        topcopyRef.current.querySelectorAll(".line-mask span"),
        { yPercent: 110, duration: 1, ease: "power4.out" }
      )
        .from(linkRef.current, { y: 15, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(
          wordRef.current.querySelectorAll(":scope > span"),
          { yPercent: 110, duration: 1.15, ease: "power4.out" },
          "-=0.9"
        );

      // Scroll-scrubbed parallax — media drifts + scales down, word drifts
      // as you scroll past the hero.
      gsap.to(mediaRef.current, {
        yPercent: 20,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: mediaRef.current.closest(".hero"),
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(wordRef.current, {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: mediaRef.current.closest(".hero"),
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero section">
      <div className="hero-media" ref={mediaRef}>
        <video
          ref={videoRef}
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/8bd0314a-9525-4a13-996e-2c37cbd9e514/1784436357607-9c22882e-f726-4971-b85d-f7b5276000ff.mp4"
          poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d1d195f0-17d7-4654-a1fc-c9e3192705c4_1600w.webp"
          muted
          playsInline
          preload="metadata"
          aria-label="Editorial portrait"
        />
      </div>

      <div className="hero-topcopy" ref={topcopyRef}>
        <div className="line-mask">
          <span>
            Generate residential floor-plan concepts from simple ideas and explore architectural possibilities with Flanora.
          </span>
        </div>
        <a className="hero-link" href="#work" ref={linkRef}>
          EXPLORE FLANORA
        </a>
      </div>

      <div className="hero-word display line-mask" ref={wordRef}>
        <span>Flanora AI</span>
      </div>

      <div className="hero-spacer" />
    </section>
  );
}

export default Hero;