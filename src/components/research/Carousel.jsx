import { useState, useRef, useEffect, Children } from "react";

// Arrow icons (inline SVG to avoid icon-library dep here)
function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8 dark:text-zinc-200" fill="currentColor">
      <path d="M14 17l-5-5 5-5v10z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8 dark:text-zinc-200" fill="currentColor">
      <path d="M10 17l5-5-5-5v10z" />
    </svg>
  );
}

export default function Carousel({ children }) {
  const slides = Children.toArray(children);
  const numSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportRef = useRef(null);
  const slideViewportRefs = useRef([]);

  // Go to slide by index — scroll the slide-viewport element into view
  function goToSlide(index) {
    if (index < 0 || index >= numSlides) return;
    const el = slideViewportRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setCurrentIndex(index);
  }

  // IntersectionObserver — sync currentIndex with scroll position
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || slideViewportRefs.current.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const most = visible.reduce((prev, cur) =>
          cur.intersectionRatio > prev.intersectionRatio ? cur : prev
        );
        const idx = Number(most.target.dataset.index ?? "-1");
        if (!Number.isNaN(idx) && idx !== currentIndex) {
          setCurrentIndex(idx);
        }
      },
      { root: viewport, threshold: 0.5 }
    );

    slideViewportRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numSlides]);

  return (
    <div className="carousel-wrapper">
      {/* Navigation row */}
      <div className="not-prose my-4 flex items-center justify-center">
        <button
          className="rp-carousel-nav-btn h-12 w-12 cursor-pointer content-center disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => goToSlide(currentIndex - 1)}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          <ArrowLeft />
        </button>

        {/* Pagination dots */}
        <div className="flex">
          {Array.from({ length: numSlides }).map((_, i) => (
            <button
              key={i}
              className={`rp-carousel-dot-btn h-12 w-12 cursor-pointer content-center${
                i === currentIndex ? " active" : ""
              }`}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className="mx-auto h-2 w-2 rounded-full bg-black transition dark:bg-zinc-200" />
            </button>
          ))}
        </div>

        <button
          className="rp-carousel-nav-btn h-12 w-12 cursor-pointer content-center disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => goToSlide(currentIndex + 1)}
          disabled={currentIndex === numSlides - 1}
          aria-label="Next slide"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={viewportRef}
        className="carousel-viewport mx-[calc(var(--slide-gap)/-2)] w-[calc(var(--actual-text-width)+var(--slide-gap))]"
      >
        <div className="carousel mx-[calc(var(--actual-inline-margin)*-1+var(--slide-gap)/2)] flex snap-x snap-mandatory scroll-pl-[calc(var(--actual-inline-margin)-var(--slide-gap)/2)] overflow-x-scroll [scrollbar-width:none]">
          {slides.map((child, i) => (
            <div
              key={i}
              className="slide-viewport snap-start px-[calc(var(--slide-gap)/2)]"
              data-index={i}
              ref={(el) => { slideViewportRefs.current[i] = el; }}
            >
              <div className="slide w-[var(--actual-text-width)] [&>*]:my-0">
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
