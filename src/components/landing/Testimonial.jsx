import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "./Counter";

gsap.registerPlugin(ScrollTrigger);

function Testimonial() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const quoteRef = useRef(null);

  const [githubRepos, setGithubRepos] = useState(3); // default from current
  const [hfRepos, setHfRepos] = useState(2); // default from current

  useEffect(() => {
    // Fetch dynamic counts
    // /api/github-list is proxied by Vite dev server → github.com/stars/Jyotibrat/lists/flanora-ai
    fetch('/api/github-list')
      .then(res => res.text())
      .then(html => {
        const match = html.match(/(\d+)\s*repositor/i);
        if (match) setGithubRepos(parseInt(match[1], 10));
      })
      .catch(console.error);

    fetch('https://huggingface.co/api/collections/BJyotibrat/flanora-ai')
      .then(res => res.json())
      .then(data => {
        if (data && data.items) setHfRepos(data.items.length);
      })
      .catch(console.error);

    const ctx = gsap.context(() => {
      gsap.from(photoRef.current, {
        clipPath: "inset(50% 50% 50% 50%)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(quoteRef.current, {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 68%" },
      });
      gsap.to(photoRef.current, {
        xPercent: 35,
        rotation: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonial paper" ref={sectionRef}>
      <div className="container grid12 quote-grid">
        <div className="quote-photo" ref={photoRef}>
          <img
            src="/profilePhotos/bindupautra.jpg"
            alt="Client portrait"
          />
        </div>
        <blockquote className="quote display" ref={quoteRef}>
          "Flanora is an exploration of intelligence applied to architectural planning."
        </blockquote>
        <div className="quote-author">
          <strong>Bindupautra Jyotibrat</strong>
          <br />
          Creator, Flanora AI
        </div>
        <div className="quote-metrics">
          <div className="metric">
            <Counter value={githubRepos} />
            <span>GitHub Repositories</span>
          </div>
          <div className="metric">
            <Counter value={hfRepos} />
            <span>Hugging Face Repositories</span>
          </div>
          <div className="metric">
            <Counter value={14} />
            <span>International awards</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;