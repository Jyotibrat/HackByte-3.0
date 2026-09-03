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
        const items = section.querySelectorAll('.media-item');

        const prevColor = index > 0 ? yearSections[index - 1].dataset.color : bgColor;
        if (bgLayer) {
          gsap.set(bgLayer, { backgroundColor: prevColor });
        }

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
            },
            onLeaveBack: () => {
              const prev = yearSections[index - 1];
              const prevYear = prev?.dataset.year || START_YEAR;
              animateYearRoll(currentYearRef.current, prevYear);
              currentYearRef.current = prevYear;
            },
          },
        });

        if (bgLayer) {
          tl.to(bgLayer, { backgroundColor: bgColor, duration: 0.8, ease: 'power1.inOut' }, 0);
        }

        if (newYear === '2025') {
          // Animate text color from dark → light in sync with the dark bg
          const textContainer = section.querySelector('.v2-text-container');
          if (textContainer) {
            gsap.set(textContainer, { color: '#1a1a1a' });
            tl.to(textContainer, { color: '#F8F7F5', duration: 0.8, ease: 'power1.inOut' }, 0);
          }
          // Animate year display dark → light
          tl.to('#year-display', { color: '#F8F7F5', duration: 0.8, ease: 'power1.inOut' }, 0);
          // Animate the badge border+text from charcoal → flanora-lime
          const badge = section.querySelector('.v2-badge');
          if (badge) {
            gsap.set(badge, { color: '#1a1a1a', borderColor: '#1a1a1a' });
            tl.to(badge, { color: '#D7FF5E', borderColor: '#D7FF5E', duration: 0.8, ease: 'power1.inOut' }, 0);
          }
          // Ghost/mask text reveal for Flanora-v2
          const masked = section.querySelector('.intro-masked');
          if (masked) {
            tl.to(
              masked,
              { maskSize: '100% 100%', ease: 'sine.inOut', duration: 1 },
              0
            );
          }
        } else if (newYear === '2026') {
          // Animate text color from light → dark in sync with the light bg (reverse of v2)
          const textContainer = section.querySelector('.v3-text-container');
          if (textContainer) {
            gsap.set(textContainer, { color: '#F8F7F5' });
            tl.to(textContainer, { color: '#1a1a1a', duration: 0.8, ease: 'power1.inOut' }, 0);
          }
          // Animate year display light → dark
          tl.to('#year-display', { color: '#1a1a1a', duration: 0.8, ease: 'power1.inOut' }, 0);
          // Animate badge from flanora-lime → charcoal
          const badge = section.querySelector('.v3-badge');
          if (badge) {
            gsap.set(badge, { color: '#D7FF5E', borderColor: '#D7FF5E' });
            tl.to(badge, { color: '#1a1a1a', borderColor: '#1a1a1a', duration: 0.8, ease: 'power1.inOut' }, 0);
          }
          const intro = section.querySelector('.intro');
          const split = new SplitText(intro, { type: 'words' });
          splits.push(split);
          gsap.set(split.words, { opacity: 0.15 });
          tl.to(split.words, {
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out',
          });
        }

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
      <div id="year-display" className="year-number sticky top-[calc(72px+1.5vh)] z-10 flex justify-center items-center">
        {START_YEAR.split('').map((digit, i) => (
          <span key={i} className="digit" ref={(el) => (digitsRef.current[i] = el)}>
            {digit}
          </span>
        ))}
      </div>

      {/* 2024 — Flanora-v1 */}
      <section className="year-section" data-year="2024" data-color="#F8F7F5">
        <div className="year-bg-layer"></div>
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
      <section className="year-section" data-year="2025" data-color="#1a1a1a">
        <div className="year-bg-layer"></div>
        <div className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 gap-8 w-full h-full relative z-10 px-8 py-12 md:py-4 max-w-7xl mx-auto">
          <div className="media-stack relative w-full h-full flex items-center justify-center p-4 md:p-12 order-1 md:order-2">
            <img
              className="media-item max-h-[80%] max-w-[80%] object-contain border border-hairline shadow-sm"
              alt="Flanora-v2 Multi-Model Concepts"
              src={flanoraV2Img}
            />
          </div>
          <div className="order-2 md:order-1 flex flex-col justify-end md:justify-center">
            <div className="v2-text-container text-left">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-martel text-sm tracking-widest opacity-60">02</span>
                <h2 className="font-playfair text-4xl md:text-5xl">Flanora-v2</h2>
              </div>
              <p className="v2-badge font-martel text-sm tracking-widest uppercase mb-6 font-semibold border inline-block px-3 py-1">
                Multi-Model Generation
              </p>
              <div className="text-mask-wrapper mb-8">
                <p className="intro-ghost font-martel text-lg opacity-20 leading-relaxed max-w-[40ch]" aria-hidden="true">
                  Introducing divergent exploration. V2 generates multiple conceptual variations from a single prompt, allowing architects to quickly explore different spatial typologies and structural organizations.
                </p>
                <p className="intro-masked font-martel text-lg leading-relaxed max-w-[40ch]">
                  Introducing divergent exploration. V2 generates multiple conceptual variations from a single prompt, allowing architects to quickly explore different spatial typologies and structural organizations.
                </p>
              </div>
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
      <section className="year-section" data-year="2026" data-color="#F8F7F5">
        <div className="year-bg-layer"></div>
        <div className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 gap-8 w-full h-full relative z-10 px-8 py-12 md:py-4 max-w-7xl mx-auto">
          <div className="media-stack relative w-full h-full flex items-center justify-center p-4 md:p-12 order-1 md:order-2 opacity-70">
            <img
              className="media-item max-h-[80%] max-w-[80%] object-contain border border-hairline shadow-sm"
              alt="Flanora-v3 Abstract Concept"
              src={flanoraV3Img}
            />
          </div>
          <div className="order-2 md:order-1 flex flex-col justify-end md:justify-center">
            <div className="v3-text-container text-left">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-martel text-sm tracking-widest opacity-60">03</span>
                <h2 className="font-playfair text-4xl md:text-5xl">Flanora-v3</h2>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <p className="v3-badge font-martel text-sm tracking-widest uppercase font-semibold border inline-block px-3 py-1 m-0">
                  Next Generation
                </p>
                <span className="inline-block text-xs px-2 py-1 uppercase tracking-wider opacity-60">
                  Coming Soon
                </span>
              </div>
              <p className="intro font-martel text-lg leading-relaxed mb-8 max-w-[40ch]">
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