import { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './MaskRevealSection.css';

gsap.registerPlugin(ScrollTrigger);

const svgNS = 'http://www.w3.org/2000/svg';

/* ================================================
   Horizontal Blinds  (ported from codrops script.js)
   ================================================ */
const horizontalBlinds = {
  getViewBox() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { vbWidth: 100, vbHeight: (height / width) * 100 };
  },
  buildCells(group, { vbHeight }) {
    const BLIND_COUNT = 30;
    const h = vbHeight / BLIND_COUNT;
    const blinds = [];
    let currentY = 0;

    for (let i = 0; i < BLIND_COUNT; i++) {
      const centerY = vbHeight - (currentY + h / 2);
      const rectTop = document.createElementNS(svgNS, 'rect');
      const rectBottom = document.createElementNS(svgNS, 'rect');

      [rectTop, rectBottom].forEach((r) => {
        r.setAttribute('x', 0);
        r.setAttribute('width', 100);
        r.setAttribute('height', 0);
        r.setAttribute('fill', 'white');
        r.setAttribute('shape-rendering', 'crispEdges');
      });

      rectTop.setAttribute('y', centerY);
      rectBottom.setAttribute('y', centerY);

      group.appendChild(rectTop);
      group.appendChild(rectBottom);

      blinds.push({ top: rectTop, bottom: rectBottom, y: centerY, h: h / 2 });
      currentY += h;
    }

    return blinds;
  },
  openTween(blinds) {
    return gsap.timeline().to(
      blinds.flatMap((b) => [b.top, b.bottom]),
      {
        attr: {
          y: (i) => {
            const b = blinds[Math.floor(i / 2)];
            return i % 2 === 0 ? b.y - b.h : b.y;
          },
          height: (i) => blinds[Math.floor(i / 2)].h + 0.01,
        },
        ease: 'power3.out',
        stagger: { each: 0.02, from: 'start' },
      }
    );
  },
  showFullyOpen(blinds) {
    gsap.set(blinds.flatMap((b) => [b.top, b.bottom]), {
      attr: {
        y: (i) => {
          const b = blinds[Math.floor(i / 2)];
          return i % 2 === 0 ? b.y - b.h : b.y;
        },
        height: (i) => blinds[Math.floor(i / 2)].h + 0.01,
      },
    });
  },
};

/* ================================================
   Random Grid  (ported from codrops script2.js)
   ================================================ */
const randomGrid = {
  getViewBox() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { vbWidth: 100, vbHeight: (height / width) * 100 };
  },
  buildCells(group, { vbWidth, vbHeight }) {
    const cols = window.innerWidth <= 599 ? 6 : window.innerWidth <= 1024 ? 10 : 14;
    const rows = Math.round(cols * (vbHeight / vbWidth));
    const cellW = vbWidth / cols;
    const cellH = vbHeight / rows;
    const cells = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', x * cellW);
        rect.setAttribute('y', y * cellH);
        rect.setAttribute('width', cellW);
        rect.setAttribute('height', cellH);
        rect.setAttribute('fill', 'white');
        rect.setAttribute('shape-rendering', 'crispEdges');
        rect.setAttribute('opacity', 0);
        group.appendChild(rect);
        cells.push(rect);
      }
    }

    return cells;
  },
  openTween(cells) {
    const shuffled = gsap.utils.shuffle([...cells]);
    return gsap.timeline().to(shuffled, {
      opacity: 1,
      duration: 1.0,
      ease: 'power3.out',
      stagger: { each: 0.02 },
    });
  },
  showFullyOpen(cells) {
    gsap.set(cells, { opacity: 1 });
  },
};

/* ================================================
   Vertical Blinds  (ported from codrops script3.js)
   ================================================ */
const verticalBlinds = {
  getViewBox() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { vbWidth: (width / height) * 100, vbHeight: 100 };
  },
  buildCells(group, { vbWidth }) {
    const BLIND_COUNT = 12;
    const w = vbWidth / BLIND_COUNT;
    const blinds = [];
    let currentX = 0;

    for (let i = 0; i < BLIND_COUNT; i++) {
      const centerX = currentX + w / 2;
      const rectLeft = document.createElementNS(svgNS, 'rect');
      const rectRight = document.createElementNS(svgNS, 'rect');

      [rectLeft, rectRight].forEach((r) => {
        r.setAttribute('y', 0);
        r.setAttribute('height', 100);
        r.setAttribute('width', 0);
        r.setAttribute('fill', 'white');
        r.setAttribute('shape-rendering', 'crispEdges');
      });

      rectLeft.setAttribute('x', centerX);
      rectRight.setAttribute('x', centerX);

      group.appendChild(rectLeft);
      group.appendChild(rectRight);

      blinds.push({ left: rectLeft, right: rectRight, x: centerX, w: w / 2 });
      currentX += w;
    }

    return blinds;
  },
  openTween(blinds) {
    return gsap.timeline().to(
      blinds.flatMap((b) => [b.left, b.right]),
      {
        attr: {
          x: (i) => {
            const b = blinds[Math.floor(i / 2)];
            return i % 2 === 0 ? b.x - b.w : b.x;
          },
          width: (i) => blinds[Math.floor(i / 2)].w + 0.05,
        },
        ease: 'none',
        stagger: { each: 0.02, from: 'start' },
      }
    );
  },
  showFullyOpen(blinds) {
    gsap.set(blinds.flatMap((b) => [b.left, b.right]), {
      attr: {
        x: (i) => {
          const b = blinds[Math.floor(i / 2)];
          return i % 2 === 0 ? b.x - b.w : b.x;
        },
        width: (i) => blinds[Math.floor(i / 2)].w + 0.05,
      },
    });
  },
};

const VARIANTS = {
  'horizontal-blinds': horizontalBlinds,
  'random-grid': randomGrid,
  'vertical-blinds': verticalBlinds,
};

function MaskRevealSection({ bgSrc, bgAlt = '', variant, overlayDark = true, children }) {
  const rawId = useId().replace(/:/g, '');
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const groupRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const algo = VARIANTS[variant] || VARIANTS['horizontal-blinds'];
    let master;
    let resizeTimer;

    function build() {
      const svg = svgRef.current;
      const group = groupRef.current;
      if (!svg || !group) return;

      const box = algo.getViewBox();
      svg.setAttribute('viewBox', `0 0 ${box.vbWidth} ${box.vbHeight}`);

      const maskRect = svg.querySelector('mask rect');
      if (maskRect) {
        maskRect.setAttribute('width', box.vbWidth);
        maskRect.setAttribute('height', box.vbHeight);
      }
      const img = svg.querySelector('image');
      if (img) {
        img.setAttribute('width', box.vbWidth);
        img.setAttribute('height', box.vbHeight);
      }

      group.innerHTML = '';
      const cells = algo.buildCells(group, box);

      if (prefersReducedMotion) {
        // Skip the scroll-driven build-up: show the image and content immediately.
        algo.showFullyOpen(cells);
        gsap.set(contentRef.current, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 });
        return;
      }

      gsap.set(contentRef.current, { clipPath: 'inset(0% 0% 100% 0%)', y: 30, opacity: 0 });

      if (master) master.kill();
      master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // Fire as soon as the section enters the bottom of the viewport.
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      master.add(algo.openTween(cells));
      master.to(
        contentRef.current,
        { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
        '-=0.3'
      );
    }

    const ctx = gsap.context(() => {
      build();
    }, sectionRef);

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        build();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      if (master) master.kill();
      ctx.revert();
    };
  }, [variant]);

  const maskId = `${rawId}-mask`;

  return (
    <section ref={sectionRef} className="mask-reveal-section">
      <svg ref={svgRef} className="mask-reveal-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100" height="100" fill="#000000" />
            <g ref={groupRef}></g>
          </mask>
        </defs>
        <image
          href={bgSrc}
          aria-label={bgAlt}
          x="0"
          y="0"
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
        />
      </svg>
      {overlayDark && <div className="mask-reveal-scrim" />}
      <div ref={contentRef} className="mask-reveal-content">
        {children}
      </div>
    </section>
  );
}

export default MaskRevealSection;