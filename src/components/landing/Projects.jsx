import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAuraVideo from "./useAuraVideo";
import useHoverMedia from "./useHoverMedia";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Flanora-v1",
    meta: ["First generation", "2024"],
    index: "01 / 03",
    media: {
      type: "video",
      src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/8bd0314a-9525-4a13-996e-2c37cbd9e514/1784436916049-996a1369-4925-4293-9614-7cc8a1164acb.mp4",
      poster: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee8e4ce6-9691-46fc-9cbf-8f995d7e8488_1600w.webp",
    },
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/bf85803f-e1fc-418c-94f7-c4f99a4eddc4_800w.webp",
  },
  {
    title: "Flanora-v2",
    meta: ["Multi-model Generation", "2025"],
    index: "02 / 03",
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90",
      alt: "Outer State",
    },
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/48af377b-c03c-4ecb-939f-47dfa5a175a1_800w.webp",
  },
  {
    title: "Flanora-v3",
    meta: ["Next generation", "2026"],
    index: "03 / 03",
    media: {
      type: "image",
      src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e2449689-711a-4092-9414-985b099e2099_1600w.webp",
      alt: "Still Moving",
    },
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1cad46d6-7825-49c7-aa11-2764c150eb8c_800w.webp",
  },
];

function ProjectCard({ project }) {
  const articleRef = useRef(null);
  const mediaRef = useRef(null);
  const mediaInnerRef = useRef(null); // the img or video itself
  const titleRef = useRef(null);
  const copyPRef = useRef(null);
  const sideRef = useRef(null);

  useAuraVideo(mediaInnerRef, "loop-in-view");
  useHoverMedia(mediaRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        { scale: 0.84 },
        {
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: articleRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Only the original's img gets the extra yPercent/scale drift —
      // video media just relies on the wrapper scale above.
      if (project.media.type === "image") {
        gsap.fromTo(
          mediaInnerRef.current,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: articleRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      gsap.from(titleRef.current, {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: articleRef.current, start: "top 70%" },
      });
      gsap.from(copyPRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        scrollTrigger: { trigger: articleRef.current, start: "top 68%" },
      });
      gsap.from(sideRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: articleRef.current, start: "top 65%" },
      });
    }, articleRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="project" ref={articleRef}>
      <div className="project-copy">
        <h3 className="display line-mask">
          <span ref={titleRef}>{project.title}</span>
        </h3>
        <p ref={copyPRef}>
          {project.meta[0]}
          <br />
          {project.meta[1]}
        </p>
      </div>

      <div className="project-media hover-media" ref={mediaRef}>
        {project.media.type === "video" ? (
          <video
            ref={mediaInnerRef}
            src={project.media.src}
            poster={project.media.poster}
            muted
            playsInline
            preload="metadata"
            loop
            aria-label={project.title}
          />
        ) : (
          <img ref={mediaInnerRef} src={project.media.src} alt={project.media.alt} />
        )}
      </div>

      <div className="project-side" ref={sideRef}>
        {project.index}
        <div className="project-thumb">
          <img src={project.thumb} alt="Portrait thumbnail" />
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects paper" id="work">
      <div className="container">
        <div className="projects-head">
          <h2 className="display">The Flanora Models</h2>
          <div className="eyebrow">2024—2026</div>
        </div>

        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;