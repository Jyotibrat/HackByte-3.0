import { useEffect } from "react";

// Ports the original page's data-aura-video-controller script to a hook.
// preset: "hover" | "loop-in-view" (default) | "play-once"
export default function useAuraVideo(ref, preset = "loop-in-view") {
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;

    video.muted = true;
    video.playsInline = true;

    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    if (preset === "hover") {
      const enter = () => play();
      const leave = () => {
        video.pause();
        video.currentTime = 0;
      };
      video.addEventListener("mouseenter", enter);
      video.addEventListener("mouseleave", leave);
      return () => {
        video.removeEventListener("mouseenter", enter);
        video.removeEventListener("mouseleave", leave);
      };
    }

    let played = false;
    const onEnded = () => {
      played = true;
    };
    if (preset === "play-once") {
      video.addEventListener("ended", onEnded, { once: true });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (preset === "play-once" && played) return;
            play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      if (preset === "play-once") video.removeEventListener("ended", onEnded);
    };
  }, [ref, preset]);
}