import React from 'react';
import heroImg from '../../assets/features/features_hero_img.png';

function FeaturesHero() {
  return (
    <section className="relative pt-section-gap-mobile md:pt-section-gap-desktop pb-section-gap-mobile md:pt-section-gap-desktop px-margin-page overflow-hidden">
      <div className="absolute inset-0 blueprint-bg -z-10 opacity-50 pointer-events-none"></div>
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-inner-gap items-center">
        <div className="lg:col-span-5 space-y-8 fade-in-up">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-ink-text leading-tight">
            Language <br/>to Layout.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Transform natural-language requirements directly into functional, sophisticated architectural floor plans. The intelligence of structural synthesis, powered by Flanora.
          </p>
          <a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-ink-text border-b border-ink-text pb-1 hover:text-outline hover:border-outline transition-colors duration-300 group" href="#">
            TRY FLANORA
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            >
              <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>
          </a>
        </div>
        <div className="lg:col-span-7 fade-in-up stagger-1 relative">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline-border shadow-sm mix-blend-multiply relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-ai-glow blur-2xl rounded-full opacity-50 z-0 pointer-events-none"></div>
            <img alt="Architectural sketch" className="w-full h-auto rounded-lg relative z-10 object-cover" data-alt="A high-resolution isometric architectural sketch of a modern three-bedroom villa with an open central courtyard." src={heroImg}/>
          </div>
          <p className="typing-caption font-body-md text-on-surface-variant mt-4">
            <span className="typing-effect">A three bedroom villa with an open courtyard</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesHero;