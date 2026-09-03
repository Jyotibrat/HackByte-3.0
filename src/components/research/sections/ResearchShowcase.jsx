import { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import trueImg from '../../../assets/research/dogs-true.png';
import diffcImg from '../../../assets/research/dogs-diffc.png';
import msillmImg from '../../../assets/research/dogs-msillm.jpg';

import './ResearchShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    img: trueImg,
    alt: 'Ground-truth reference image',
    title: ['GROUND', 'TRUTH'],
    subtitle: 'Reference data',
    body: 'The unmodified source image used as the baseline for every comparison in this study.',
  },
  {
    img: diffcImg,
    alt: 'Diffusion model output',
    title: ['DIFFUSION', 'MODEL'],
    subtitle: 'Generative comparison',
    body: 'Output from a diffusion-based generative model, evaluated against the ground truth.',
  },
  {
    img: msillmImg,
    alt: 'MS-ILLM model output',
    title: ['MS-ILLM', 'MODEL'],
    subtitle: 'Generative comparison',
    body: 'Output from the MS-ILLM model, evaluated under the same conditions.',
  },
];

function ResearchShowcase() {
  const rawId = useId().replace(/:/g, '');
  const stageRef = useRef(null);
  const layersRef = useRef([]);
  const groupRefs = useRef([]);
  const textRefs = useRef([]);
  const fillRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    let blindsSets = [];
    let master;
    let resizeTimer;

    function getGridCols() {
      if (window.innerWidth <= 599) return 6; // SP
      if (window.innerWidth <= 1024) return 10; // Tablet
      return 14; // PC
    }

    function createBlinds(group) {
      if (!group) return null;
      group.innerHTML = '';

      const width = window.innerWidth;
      const height = window.innerHeight;
      const vbWidth = 100;
      const vbHeight = (height / width) * 100;

      const cols = getGridCols();
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

      return { cells, rows, cols };
    }

    // Left → right column order, randomized within each column
    function openBlinds({ cells, rows, cols }) {
      const ordered = [];
      for (let x = 0; x < cols; x++) {
        const column = [];
        for (let y = 0; y < rows; y++) {
          column.push(cells[y * cols + x]);
        }
        ordered.push(...gsap.utils.shuffle(column));
      }

      return gsap.timeline().to(ordered, {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: { each: 0.02 },
      });
    }

    function textIn(el) {
      return gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        duration: 2.2,
        ease: 'expo.out',
      });
    }

    function textOut(el) {
      return gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        y: 0,
        duration: 1.6,
        ease: 'power2.inOut',
      });
    }

    function buildMasterTimeline() {
      if (master) master.kill();

      master = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      blindsSets.forEach((set, i) => {
        master.add(openBlinds(set));
        const txt = textRefs.current[i];
        if (txt) {
          master.add(textIn(txt), '-=0.3');
          master.add(textOut(txt), '+=0.8');
        }
      });
    }

    function updateLayout() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const vbWidth = 100;
      const vbHeight = (height / width) * 100;

      blindsSets = [];

      layersRef.current.forEach((svg, i) => {
        if (!svg) return;
        svg.setAttribute('viewBox', `0 0 ${vbWidth} ${vbHeight}`);

        const maskRect = svg.querySelector('mask rect');
        if (maskRect) {
          maskRect.setAttribute('width', vbWidth);
          maskRect.setAttribute('height', vbHeight);
        }

        const img = svg.querySelector('image');
        if (img) {
          img.setAttribute('width', vbWidth);
          img.setAttribute('height', vbHeight);
        }

        const result = createBlinds(groupRefs.current[i]);
        if (result) blindsSets.push(result);
      });

      buildMasterTimeline();
    }

    function initProgressBar() {
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalSteps = fillRefs.current.length;
          fillRefs.current.forEach((fill, i) => {
            if (!fill) return;
            let p = (progress - i / totalSteps) * totalSteps;
            p = Math.max(0, Math.min(1, p));
            fill.style.width = `${p * 100}%`;
          });
        },
      });
    }

    const ctx = gsap.context(() => {
      updateLayout();
      initProgressBar();
    }, stageRef);

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        updateLayout();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      if (master) master.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={stageRef} className="research-showcase-stage">
      <div className="research-showcase-layers">
        {SLIDES.map((slide, i) => {
          const maskId = `${rawId}-mask${i}`;
          return (
            <svg
              key={i}
              ref={(el) => (layersRef.current[i] = el)}
              className="research-showcase-layer"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="100" height="100" fill="#000000" />
                  <g ref={(el) => (groupRefs.current[i] = el)}></g>
                </mask>
              </defs>
              <image
                href={slide.img}
                x="0"
                y="0"
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                mask={`url(#${maskId})`}
              />
            </svg>
          );
        })}

        <div className="research-showcase-progress">
          {SLIDES.map((_, i) => (
            <div className="research-showcase-segment" key={i}>
              <div className="research-showcase-fill" ref={(el) => (fillRefs.current[i] = el)}></div>
            </div>
          ))}
        </div>

        <div className="research-showcase-texts">
          {SLIDES.map((slide, i) => (
            <div className="research-showcase-txt" ref={(el) => (textRefs.current[i] = el)} key={i}>
              <h2>
                {slide.title[0]}
                <br />
                {slide.title[1]}
              </h2>
              <h3>{slide.subtitle}</h3>
              <span>{slide.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResearchShowcase;