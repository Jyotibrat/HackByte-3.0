import React from 'react';

function FeaturesModels() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page border-t border-hairline-border bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 fade-in-up">
          <div>
            <h2 className="font-headline-md text-headline-md text-ink-text">Model Architecture</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">The engines powering structural synthesis.</p>
          </div>
          <a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-ink-text mt-6 md:mt-0 group" href="#">
            EXPLORE MODELS
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" data-icon="arrow_outward">arrow_outward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-hairline-border rounded-xl p-8 bg-paper-bg hover:shadow-sm transition-shadow duration-300 fade-in-up flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-headline-md text-headline-md text-ink-text">v1</h3>
              <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-variant text-on-surface-variant rounded">Available</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
              Our foundational model, optimized for speed and conceptual massing studies. Best for early-stage exploration.
            </p>
            <div className="pt-4 border-t border-hairline-border font-caption text-caption text-outline">
              Parameters: 12B
            </div>
          </div>
          
          <div className="border border-hairline-border rounded-xl p-8 bg-surface-container-lowest shadow-sm relative overflow-hidden fade-in-up stagger-1 flex flex-col h-full">
            <div className="absolute inset-0 blueprint-bg opacity-10 pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="font-headline-md text-headline-md text-ink-text">v2</h3>
              <span className="font-label-caps text-label-caps px-2 py-1 bg-ink-text text-paper-bg rounded">Available</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow relative z-10">
              Precision rendering and advanced spatial logic. Handles complex multi-story structures and intricate lighting requirements.
            </p>
            <div className="pt-4 border-t border-hairline-border font-caption text-caption text-outline relative z-10">
              Parameters: 45B
            </div>
          </div>
          
          <div className="border border-hairline-border rounded-xl p-8 bg-paper-bg opacity-70 fade-in-up stagger-2 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-headline-md text-headline-md text-outline">v3</h3>
              <span className="font-label-caps text-label-caps px-2 py-1 border border-hairline-border text-outline rounded">In Training</span>
            </div>
            <p className="font-body-md text-body-md text-outline mb-8 flex-grow">
              Next-generation synthesis incorporating structural engineering constraints and localized building codes.
            </p>
            <div className="pt-4 border-t border-hairline-border font-caption text-caption text-outline">
              ETA: Q4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesModels;
