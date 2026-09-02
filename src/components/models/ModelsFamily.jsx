import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import flanoraV2Img from '../../assets/models/flanora_v2.png';
import flanoraV3Img from '../../assets/models/flanora_v3.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const START_YEAR = '2024';

function ModelsFamily() {
  const sectionRef = useRef(null);
  const digitsRef = useRef([]);
  const currentYearRef = useRef(START_YEAR);

  useEffect(() => {
    const splits = [];

    const ctx = gsap.context(() => {
      const yearSections = gsap.utils.toArray('.year-section');
      const digits = digitsRef.current;

      function animateYearRoll(from, to) {
        const fromStr = from.toString();
        const toStr = to.toString();

        digits.forEach((el, i) => {
          if (!el || fromStr[i] === toStr[i]) return;
          const delay = (digits.length - 1 - i) * 0.1;

          gsap.to(el, {
            yPercent: -100,
            opacity: 0,
            duration: 0.2,
            delay,
            ease: 'power2.in',
            onComplete: () => {
              el.textContent = toStr[i];
              gsap.set(el, { yPercent: 100, opacity: 0 });
              gsap.to(el, {
                yPercent: 0,
                opacity: 1,
                duration: 0.3,
                delay: 0.05,
                ease: 'power2.out',
              });
            },
          });
        });
      }

      yearSections.forEach((section, index) => {
        const newYear = section.dataset.year;
        const bgColor = section.dataset.color || '#F8F7F5';
        const bgLayer = section.querySelector('.year-bg-layer');
        const intro = section.querySelector('.intro');
        const items = section.querySelectorAll('.media-item');

        const split = new SplitText(intro, { type: 'words' });
        splits.push(split);
        gsap.set(split.words, { opacity: 0.15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: true,
            onEnter: () => {
              animateYearRoll(currentYearRef.current, newYear);
              currentYearRef.current = newYear;
              gsap.to(bgLayer, { backgroundColor: bgColor, duration: 0.6, ease: 'power2.out' });
            },
            onLeaveBack: () => {
              const prev = yearSections[index - 1];
              const prevYear = prev?.dataset.year || START_YEAR;
              const prevColor = prev?.dataset.color || '#F8F7F5';
              const prevBgLayer = prev?.querySelector('.year-bg-layer');

              animateYearRoll(currentYearRef.current, prevYear);
              currentYearRef.current = prevYear;
              if (prevBgLayer) {
                gsap.to(prevBgLayer, { backgroundColor: prevColor, duration: 0.6, ease: 'power2.out' });
              }
            },
          },
        });

        tl.to(split.words, {
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
        });

        items.forEach((item, i) => {
          gsap.set(item, {
            opacity: 0,
            scale: 0.95,
            rotate: gsap.utils.random(-3, 3),
          });
          tl.to(
            item,
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
            i * 0.2
          );
        });
      });
    }, sectionRef);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="timeline relative">
      <div id="year-display" className="year-number sticky top-[2vh] z-20 flex justify-center items-center">
        {START_YEAR.split('').map((digit, i) => (
          <span key={i} className="digit" ref={(el) => (digitsRef.current[i] = el)}>
            {digit}
          </span>
        ))}
      </div>

      {/* 2024 — Flanora-v1 */}
      <section className="year-section" data-year="2024" data-color="#F8F7F5">
        <div className="year-bg-layer" style={{ backgroundColor: '#F8F7F5' }}></div>
        <div className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 gap-8 w-full h-full relative z-10 px-8 py-12 md:py-4 max-w-7xl mx-auto">
          <div className="media-stack relative w-full h-full flex items-center justify-center p-4 md:p-12 order-1 md:order-2">
            <img
              className="media-item max-h-[80%] max-w-[80%] object-contain border border-hairline shadow-sm"
              alt="Flanora-v1 Floor Plan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU1BBrSM8aLSqPSZXcWgyxfAaZ8DwsVgaF_KxB8syOEuvRKtLMTgb2AQEESXq_wdAZT-O5Tt1-J4jwewUQ45EpxnsFKoPrh541OK8gcMHsvCWfSFxbfpbhJ-uKJ_SBGHwxUBoRsL5EiHlHK_vY57lGBQrRV0-kATYUssy4vVlMjtl8H-84Z54dE9msQKLEtQUXNoLZebR72YX0rCSIEnbZAmz3czIL21O6BVVR71n7jkcvlNBigtyi"
            />
          </div>
          <div className="order-2 md:order-1 flex flex-col justify-end md:justify-center">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-martel text-sm tracking-widest text-outline">01</span>
                <h2 className="font-playfair text-4xl md:text-5xl">Flanora-v1</h2>
              </div>
              <p className="font-martel text-sm tracking-widest uppercase mb-6 text-flanora-lime font-semibold bg-charcoal inline-block px-3 py-1">
                Controlled Generation
              </p>
              <p className="intro font-martel text-lg text-charcoal-light leading-relaxed mb-8 max-w-[40ch]">
                Our foundational model designed for precise structural adherence. V1 translates high-level prompts into highly constrained, logically sound floor plan layouts, focusing on core spatial relationships.
              </p>
              <Link className="link-arrow" to="/models/flanora-v1">
                Explore model
                <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
                  <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 — Flanora-v2 */}
      <section className="year-section" data-year="2025" data-color="#EAF7D9">
        <div className="year-bg-layer" style={{ backgroundColor: '#EAF7D9' }}></div>
        <div className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 gap-8 w-full h-full relative z-10 px-8 py-12 md:py-4 max-w-7xl mx-auto">
          <div className="media-stack relative w-full h-full flex items-center justify-center p-4 md:p-12 order-1 md:order-2">
            <img
              className="media-item max-h-[80%] max-w-[80%] object-contain border border-hairline shadow-sm"
              alt="Flanora-v2 Multi-Model Concepts"
              src={flanoraV2Img}
            />
          </div>
          <div className="order-2 md:order-1 flex flex-col justify-end md:justify-center">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-martel text-sm tracking-widest text-outline">02</span>
                <h2 className="font-playfair text-4xl md:text-5xl">Flanora-v2</h2>
              </div>
              <p className="font-martel text-sm tracking-widest uppercase mb-6 text-charcoal font-semibold border border-charcoal inline-block px-3 py-1">
                Multi-Model Generation
              </p>
              <p className="intro font-martel text-lg text-charcoal-light leading-relaxed mb-8 max-w-[40ch]">
                Introducing divergent exploration. V2 generates multiple conceptual variations from a single prompt, allowing architects to quickly explore different spatial typologies and structural organizations.
              </p>
              <Link className="link-arrow" to="/models/flanora-v2">
                Explore model
                <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
                  <path d="M7 17l9.2-9.2M17 17V7H7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 — Flanora-v3 */}
      <section className="year-section" data-year="2026" data-color="#F0F0EF">
        <div className="year-bg-layer" style={{ backgroundColor: '#F0F0EF' }}></div>
        <div className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 gap-8 w-full h-full relative z-10 px-8 py-12 md:py-4 max-w-7xl mx-auto">
          <div className="media-stack relative w-full h-full flex items-center justify-center p-4 md:p-12 order-1 md:order-2 opacity-70">
            <img
              className="media-item max-h-[80%] max-w-[80%] object-contain border border-hairline shadow-sm"
              alt="Flanora-v3 Abstract Concept"
              src={flanoraV3Img}
            />
          </div>
          <div className="order-2 md:order-1 flex flex-col justify-end md:justify-center">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-martel text-sm tracking-widest text-outline">03</span>
                <h2 className="font-playfair text-4xl md:text-5xl text-outline">Flanora-v3</h2>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <p className="font-martel text-sm tracking-widest uppercase text-outline font-semibold border border-outline inline-block px-3 py-1 m-0">
                  Next Generation
                </p>
                <span className="inline-block bg-charcoal/5 text-outline text-xs px-2 py-1 uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
              <p className="intro font-martel text-lg text-outline leading-relaxed mb-8 max-w-[40ch]">
                The frontier of architectural intelligence. V3 integrates deeper contextual understanding and dynamic structural adaptation, moving beyond discrete plans into fluid spatial intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModelsFamily;