import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "./Counter";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

function Intro() {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);
  const imgRef = useRef(null);
  const lowerRef = useRef(null);

  const [hfDownloads, setHfDownloads] = useState(72);
  const [githubStars, setGithubStars] = useState(11);

  useEffect(() => {
    async function fetchStats() {
      // Hugging Face
      try {
        const [modelRes, datasetRes] = await Promise.all([
          fetch("https://huggingface.co/api/models/BJyotibrat/Flanora-AI-v1?expand[]=downloadsAllTime"),
          fetch("https://huggingface.co/api/datasets/BJyotibrat/ROBIN-ImagesGT-Merged-Flanora-AI-v1?expand[]=downloadsAllTime")
        ]);
        const modelData = await modelRes.json();
        const datasetData = await datasetRes.json();
        
        const modelDls = modelData.downloadsAllTime || modelData.downloads || 0;
        const datasetDls = datasetData.downloadsAllTime || datasetData.downloads || 0;
        
        setHfDownloads(modelDls + datasetDls);
      } catch (e) {
        console.error("Failed to fetch Hugging Face downloads:", e);
      }

      // GitHub
      try {
        const [repo1Res, repo2Res, repo3Res] = await Promise.all([
          fetch("https://api.github.com/repos/Jyotibrat/Flanora-AI"),
          fetch("https://api.github.com/repos/Jyotibrat/HackByte-3.0"),
          fetch("https://api.github.com/repos/Auth0r-C0dez/Neurathon-25")
        ]);
        const repo1Data = await repo1Res.json();
        const repo2Data = await repo2Res.json();
        const repo3Data = await repo3Res.json();
        
        const stars1 = repo1Data.stargazers_count || 0;
        const stars2 = repo2Data.stargazers_count || 0;
        const stars3 = repo3Data.stargazers_count || 0;
        
        setGithubStars(stars1 + stars2 + stars3);
      } catch (e) {
        console.error("Failed to fetch GitHub stars:", e);
      }
    }
    fetchStats();
  }, []);

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
          INTELLIGENCE
          <br />
          INNOVATION
          <br />
          RESEARCH
          <br />
          DESIGN
          <br />
          VISION
        </div>
        <div className="intro-copy">
          <p>
            Flanora explores how generative AI can reshape the way residential spaces are imagined and planned.
          </p>
          <p>
            We turn natural-language ideas into visual floor-plan concepts, giving architects and creators a new way to explore possibilities.
          </p>
        </div>
        <div className="stats-mini">
          <div>
            <Counter value={100} suffix=" +" />
            <span>Generations</span>
          </div>
          <div>
            <Counter value={githubStars} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Stars on <Icon icon="mdi:github" style={{ fontSize: '1.2em' }} />
            </span>
          </div>
          <div>
            <Counter value={hfDownloads} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Downloads @ <Icon icon="devicon:huggingface" style={{ fontSize: '1.2em' }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;