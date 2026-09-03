import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  {
    year: "2026",
    name: "Rana Talukdar",
    role: "Campaign Direction",
    thumb: "/profilePhotos/rana-talukdar.jpg",
    preview: "/profilePhotos/rana-talukdar.jpg",
  },
  {
    year: "2026",
    name: "Ansh",
    role: "Digital Launch",
    thumb: "/profilePhotos/ansh.jpeg",
    preview: "/profilePhotos/ansh.jpeg",
  },
  {
    year: "2025",
    name: "Arunim",
    role: "Identity System",
    thumb: "/profilePhotos/arunim.jpg",
    preview: "/profilePhotos/arunim.jpg",
  }
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