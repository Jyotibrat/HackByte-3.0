import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  {
    year: "2026",
    name: "Axiom",
    role: "Campaign Direction",
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cdb06f1d-ba81-4122-995e-6f03d6cfbea8_320w.webp",
    preview: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  },
  {
    year: "2026",
    name: "Noma",
    role: "Digital Launch",
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/68393d27-4c21-415a-aafc-cf5a31b57682_320w.webp",
    preview: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=85",
  },
  {
    year: "2025",
    name: "Terrain",
    role: "Identity System",
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a41d3a65-8d6a-4d01-9658-ed45cbcdcce6_320w.webp",
    preview: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
  },
  {
    year: "2025",
    name: "Mono",
    role: "Brand Film",
    thumb: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/variants/0a4aa3d6-d721-49ae-8f1d-fae6a49994ee/320w.png",
    preview: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
  },
  {
    year: "2024",
    name: "Circa",
    role: "Editorial Platform",
    thumb: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=75",
    preview: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    year: "2024",
    name: "Vestra",
    role: "Art Direction",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=75",
    preview: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
  },
];

function Archive() {
  const listRef = useRef(null);
  const rowRefs = useRef([]);
  rowRefs.current = [];
  const [hovered, setHovered] = useState(null);

  const addRowRef = (el) => {
    if (el) rowRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 ? -70 : 70,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = (i, previewSrc) => {
    setHovered(i);
    window.dispatchEvent(new CustomEvent("archivePreview:show", { detail: { src: previewSrc } }));
  };
  const handleLeave = () => {
    setHovered(null);
    window.dispatchEvent(new Event("archivePreview:hide"));
  };

  return (
    <section className="archive paper">
      <div className="container">
        <h2 className="display">Archive / Selected Collaborations</h2>
        <div className="archive-list" ref={listRef}>
          {ROWS.map((row, i) => (
            <div
              className="archive-row"
              key={row.name}
              ref={addRowRef}
              style={{ opacity: hovered === null || hovered === i ? 1 : 0.35 }}
              onMouseEnter={() => handleEnter(i, row.preview)}
              onMouseLeave={handleLeave}
            >
              <span>{row.year}</span>
              <span>{row.name}</span>
              <span>{row.role}</span>
              <div className="archive-thumb">
                <img src={row.thumb} alt={row.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Archive;