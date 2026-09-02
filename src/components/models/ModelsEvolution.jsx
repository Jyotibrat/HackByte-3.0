import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ModelsEvolution() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.evolution-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.evolution-container',
            start: 'top 85%',
          }
        }
      );
      
      gsap.fromTo(
        '.connecting-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.evolution-container',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-paper-bg border-y border-hairline">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="font-playfair text-3xl mb-12 text-center text-charcoal evolution-item">From One Model to a Family</h3>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative evolution-container">
          
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-charcoal/15 -z-10 connecting-line"></div>
          
          <div className="text-center bg-paper-bg px-4 evolution-item">
            <div className="w-4 h-4 bg-charcoal rounded-full mx-auto mb-4"></div>
            <h4 className="font-playfair text-xl mb-2 text-charcoal">V1</h4>
            <span className="font-martel text-xs tracking-wider text-outline uppercase">Available</span>
          </div>
          
          <div className="text-center bg-paper-bg px-4 evolution-item">
            <div className="w-4 h-4 bg-charcoal rounded-full mx-auto mb-4"></div>
            <h4 className="font-playfair text-xl mb-2 text-charcoal">V2</h4>
            <span className="font-martel text-xs tracking-wider text-outline uppercase">Available</span>
          </div>
          
          <div className="text-center bg-paper-bg px-4 evolution-item">
            <div className="w-4 h-4 border-2 border-charcoal/30 rounded-full mx-auto mb-4 bg-paper-bg"></div>
            <h4 className="font-playfair text-xl mb-2 text-outline">V3</h4>
            <span className="font-martel text-xs tracking-wider text-outline uppercase">Coming Soon</span>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default ModelsEvolution;
