import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    label: "01 / Built Along the Way",
    title: "Resources /",
    link: "/research/resources",
    year: "2026",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    alt: "Journal portrait",
  },
  {
    label: "02 / Research in the Open",
    title: "Publications /",
    link: "/research/publications",
    year: "2025",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/611c8074-3c56-4810-a604-812a2791a1f9_800w.webp",
    alt: "Journal fashion",
  },
  {
    label: "03 / Behind the Build",
    title: "Technical Reports /",
    link: "/research/technical-reports",
    year: "2025",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cd2c33e1-4bcd-452f-ad23-223a9029f74b_800w.webp",
    alt: "Journal studio",
  },
  {
    label: "04 / Ideas in Practice",
    title: "Articles /",
    link: "/research/articles",
    year: "2026",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    alt: "Journal campaign",
  },
];

function JournalItem({ item, index, itemRef }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: index % 2 ? -70 : 70,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      gsap.to(imgRef.current, {
        yPercent: index % 2 ? 7 : -7,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link to={item.link} className="journal-item block" ref={itemRef} data-title={item.title}>
      <div className="journal-img">
        <img ref={imgRef} src={item.img} alt={item.alt} />
      </div>
      <div className="journal-meta">
        <span>{item.label}</span>
        <span>{item.year}</span>
      </div>
    </Link>
  );
}

function Journal() {
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <section className="journal paper">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 60 }}>
          04 / Journal
        </div>
        <div className="journal-grid">
          {ITEMS.map((item, i) => (
            <JournalItem key={item.label} item={item} index={i} itemRef={refs[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Journal;