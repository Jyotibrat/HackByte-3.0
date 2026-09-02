import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import flanoraV2Img from '../../assets/models/flanora_v2.png';
import flanoraV3Img from '../../assets/models/flanora_v3.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ModelsFamily() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal images on scroll
      gsap.utils.toArray('.reveal-image-container').forEach(container => {
        const img = container.querySelector('img');
        
        gsap.set(container, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' });
        gsap.set(img, { scale: 1.1 });
        
        gsap.to(container, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        });
        
        gsap.to(img, {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        });
      });

      // Fade up text sections
      gsap.utils.toArray('.model-text-content').forEach(content => {
        gsap.fromTo(content, 
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 90%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Model 01 */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 border-b border-hairline pb-32">
          <div className="lg:col-span-5 order-2 lg:order-1 model-text-content">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-martel text-sm tracking-widest text-outline">01</span>
              <h2 className="font-playfair text-4xl md:text-5xl">Flanora-v1</h2>
            </div>
            <p className="font-martel text-sm tracking-widest uppercase mb-6 text-flanora-lime font-semibold bg-charcoal inline-block px-3 py-1">
              Controlled Generation
            </p>
            <p className="font-martel text-lg text-charcoal-light leading-relaxed mb-8">
              Our foundational model designed for precise structural adherence. V1 translates high-level prompts into highly constrained, logically sound floor plan layouts, focusing on core spatial relationships.
            </p>
            <Link className="link-arrow" to="/models/flanora-v1">
              Explore model 
              <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
                <path d="M7 17l9.2-9.2M17 17V7H7"></path>
              </svg>
            </Link>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 reveal-image-container rounded-sm">
            <img 
              alt="Flanora-v1 Floor Plan" 
              className="w-full h-auto object-cover border border-hairline shadow-sm" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU1BBrSM8aLSqPSZXcWgyxfAaZ8DwsVgaF_KxB8syOEuvRKtLMTgb2AQEESXq_wdAZT-O5Tt1-J4jwewUQ45EpxnsFKoPrh541OK8gcMHsvCWfSFxbfpbhJ-uKJ_SBGHwxUBoRsL5EiHlHK_vY57lGBQrRV0-kATYUssy4vVlMjtl8H-84Z54dE9msQKLEtQUXNoLZebR72YX0rCSIEnbZAmz3czIL21O6BVVR71n7jkcvlNBigtyi" 
            />
          </div>
        </article>

        {/* Model 02 */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 border-b border-hairline pb-32">
          <div className="lg:col-span-7 reveal-image-container rounded-sm">
            <img 
              alt="Flanora-v2 Multi-Model Concepts" 
              className="w-full h-auto object-cover border border-hairline shadow-sm" 
              src={flanoraV2Img} 
            />
          </div>
          <div className="lg:col-span-5 model-text-content">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-martel text-sm tracking-widest text-outline">02</span>
              <h2 className="font-playfair text-4xl md:text-5xl">Flanora-v2</h2>
            </div>
            <p className="font-martel text-sm tracking-widest uppercase mb-6 text-charcoal font-semibold border border-charcoal inline-block px-3 py-1">
              Multi-Model Generation
            </p>
            <p className="font-martel text-lg text-charcoal-light leading-relaxed mb-8">
              Introducing divergent exploration. V2 generates multiple conceptual variations from a single prompt, allowing architects to quickly explore different spatial typologies and structural organizations.
            </p>
            <Link className="link-arrow" to="/models/flanora-v2">
              Explore model 
              <svg fill="none" height="12" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="12">
                <path d="M7 17l9.2-9.2M17 17V7H7"></path>
              </svg>
            </Link>
          </div>
        </article>

        {/* Model 03 */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 model-text-content">
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
            <p className="font-martel text-lg text-outline leading-relaxed mb-8">
              The frontier of architectural intelligence. V3 integrates deeper contextual understanding and dynamic structural adaptation, moving beyond discrete plans into fluid spatial intelligence.
            </p>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 reveal-image-container opacity-70 rounded-sm">
            <img 
              alt="Flanora-v3 Abstract Concept" 
              className="w-full h-auto object-cover border border-hairline shadow-sm" 
              src={flanoraV3Img} 
            />
          </div>
        </article>

      </div>
    </section>
  );
}

export default ModelsFamily;
