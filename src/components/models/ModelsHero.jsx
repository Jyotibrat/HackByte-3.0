import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import modelsHeroImg from '../../assets/models/models_hero_img.png';

function ModelsHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text elements
      gsap.fromTo(
        '.hero-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
      
      // Subtle zoom on the background image
      gsap.fromTo(
        '.hero-img',
        { scale: 1.05 },
        { scale: 1, duration: 2, ease: 'power2.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden border-b border-hairline">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          alt="Premium minimalist architectural hero visual" 
          className="w-full h-full object-cover hero-img" 
          src={modelsHeroImg}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="font-martel text-sm tracking-[0.2em] text-outline mb-6 uppercase hero-text">Models / 01</p>
          <h1 className="font-playfair text-6xl md:text-8xl leading-tight mb-8 hero-text text-charcoal">
            The Flanora<br />Model Family
          </h1>
          <p className="font-martel text-lg text-charcoal-light leading-relaxed max-w-xl hero-text">
            A suite of purpose-built generative models designed specifically for architectural spatial synthesis. From rapid conceptual ideation to high-fidelity structural rendering.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ModelsHero;
