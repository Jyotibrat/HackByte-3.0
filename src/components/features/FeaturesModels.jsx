import React from 'react';
import { Link } from 'react-router-dom';

function FeaturesModels() {
  return (
    <section className="px-margin-page border-t border-hairline-border bg-surface-container-lowest models-section">
      <div className="models-inner max-w-container-max mx-auto">

        {/* Left col — sticky bottom via CSS */}
        <div className="model-col-left fade-in-up">
          <h2 className="font-headline-md text-headline-md text-ink-text">Model Architecture</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            The engines powering structural synthesis.
          </p>
          <Link
            className="inline-flex items-center gap-2 font-label-caps text-label-caps text-outline border-b border-transparent pb-1 hover:text-ink-text hover:border-ink-text transition-colors duration-300 mt-6 group"
            to="/chat"
          >
            EXPLORE MODELS
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </Link>
        </div>

        {/* Right col — scrolls naturally, cards pass the pinned left text */}
        <div className="model-col-right">

          <div className="border border-hairline-border rounded-xl p-8 bg-paper-bg hover:shadow-sm transition-shadow duration-300 flex flex-col model-card fade-in-up">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-headline-md text-headline-md text-ink-text">v1</h3>
              <span className="font-label-caps text-label-caps px-2 py-1 bg-surface-variant text-on-surface-variant rounded">Available</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Our foundational model, optimized for speed and conceptual massing studies. Best for early-stage exploration.
            </p>
            <div className="pt-4 border-t border-hairline-border font-caption text-caption text-outline">
              Parameters: 12B
            </div>
          </div>

          <div className="border border-hairline-border rounded-xl p-8 bg-surface-container-lowest shadow-sm relative overflow-hidden flex flex-col model-card fade-in-up stagger-1">
            <div className="absolute inset-0 blueprint-bg opacity-10 pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="font-headline-md text-headline-md text-ink-text">v2</h3>
              <span className="font-label-caps text-label-caps px-2 py-1 bg-ink-text text-paper-bg rounded">Available</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 relative z-10">
              Precision rendering and advanced spatial logic. Handles complex multi-story structures and intricate lighting requirements.
            </p>
            <div className="pt-4 border-t border-hairline-border font-caption text-caption text-outline relative z-10">
              Parameters: 45B
            </div>
          </div>

          <div className="border border-hairline-border rounded-xl p-8 bg-paper-bg opacity-70 flex flex-col model-card fade-in-up stagger-2">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-headline-md text-outline">v3</h3>
              <span className="font-label-caps text-label-caps px-2 py-1 border border-hairline-border text-outline rounded">In Training</span>
            </div>
            <p className="font-body-md text-body-md text-outline mb-8">
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