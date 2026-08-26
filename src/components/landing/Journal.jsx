import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    label: "01 / Casting Notes",
    year: "2026",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    alt: "Journal portrait",
  },
  {
    label: "02 / Material Study",
    year: "2026",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/611c8074-3c56-4810-a604-812a2791a1f9_800w.webp",
    alt: "Journal fashion",
  },
  {
    label: "03 / Process",
    year: "2025",
    img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cd2c33e1-4bcd-452f-ad23-223a9029f74b_800w.webp",
    alt: "Journal studio",
  },
  {
    label: "04 / Campaign Still",
    year: "2025",
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
    <article className="journal-item" ref={itemRef}>
      <div className="journal-img">
        <img ref={imgRef} src={item.img} alt={item.alt} />
      </div>
      <div className="journal-meta">
        <span>{item.label}</span>
        <span>{item.year}</span>
      </div>
    </article>
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