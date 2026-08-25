import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "./Counter";

gsap.registerPlugin(ScrollTrigger);

function Intro() {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);
  const imgRef = useRef(null);
  const lowerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = rootRef.current.querySelectorAll(".intro-title .line-mask span");
      lines.forEach((line, i) => {
        gsap.from(line, {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        });
      });

      gsap.from(portraitRef.current, {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: { trigger: portraitRef.current, start: "top 82%" },
      });

      gsap.to(imgRef.current, {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: portraitRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(lowerRef.current.querySelectorAll(".keywords, .intro-copy, .stats-mini"), {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: lowerRef.current, start: "top 78%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intro paper diagonal-top" id="studio" ref={rootRef}>
      <div className="container grid12">
        <div className="intro-meta eyebrow">
          <span>01 / Studio</span>
          <span>© 2026</span>
        </div>
        <h1 className="intro-title display">
          <div className="line-mask"><span>Where artificial intelligence</span></div>
          <div className="line-mask"><span>meets</span></div>
          <div className="line-mask"><span>the art of </span></div>
          <div className="line-mask"><span>architectural thinking.</span></div>
        </h1>
      </div>

      <div className="container grid12 intro-lower" ref={lowerRef}>
        <div className="intro-portrait" ref={portraitRef}>
          <img
            ref={imgRef}
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1cad46d6-7825-49c7-aa11-2764c150eb8c_800w.webp"
            alt="Creative portrait"
          />
        </div>
        <div className="keywords">
          Direction
          <br />
          Identity
          <br />
          Motion
          <br />
          Digital
        </div>
        <div className="intro-copy">
          <p>
            We partner with ambitious teams to turn strategic thinking into
            memorable visual systems.
          </p>
          <p>
            From the first idea to the final interaction, every detail is
            built to communicate with precision.
          </p>
        </div>
        <div className="stats-mini">
          <div>
            <Counter value={84} />
            <span>Projects delivered</span>
          </div>
          <div>
            <Counter value={11} />
            <span>Countries reached</span>
          </div>
          <div>
            <Counter value={72} />
            <span>Returning clients %</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;