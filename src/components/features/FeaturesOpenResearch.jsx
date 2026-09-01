import React from 'react';

function FeaturesOpenResearch() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page border-t border-hairline-border bg-surface-container-lowest relative">
      <div className="absolute inset-0 blueprint-bg opacity-30 pointer-events-none"></div>
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          <div className="lg:col-span-5 fade-in-up">
            <h2 className="font-headline-lg text-headline-lg text-ink-text mb-6">Open Research.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              We believe in the democratization of architectural intelligence. Access our open weights, specialized datasets, and foundational research papers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-ink-text border-b border-ink-text pb-1 hover:text-outline hover:border-outline transition-colors duration-300 group" href="#">
                EXPLORE MODELS
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" data-icon="arrow_outward">arrow_outward</span>
              </a>
              <a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-outline border-b border-transparent pb-1 hover:text-ink-text transition-colors duration-300 group" href="#">
                EXPLORE RESOURCES
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" data-icon="arrow_outward">arrow_outward</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg fade-in-up stagger-1">
              <span className="material-symbols-outlined text-ink-text mb-4 text-[24px]" data-icon="download">download</span>
              <h4 className="font-headline-md text-[20px] text-ink-text mb-2">Downloadable Weights</h4>
              <p className="font-caption text-caption text-on-surface-variant">Access foundational models for local deployment and specialized fine-tuning.</p>
            </div>
            
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg fade-in-up stagger-2">
              <span className="material-symbols-outlined text-ink-text mb-4 text-[24px]" data-icon="dataset">dataset</span>
              <h4 className="font-headline-md text-[20px] text-ink-text mb-2">Curated Datasets</h4>
              <p className="font-caption text-caption text-on-surface-variant">High-fidelity geometric data and semantic structural annotations.</p>
            </div>
            
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg fade-in-up stagger-3 sm:col-span-2">
              <span className="material-symbols-outlined text-ink-text mb-4 text-[24px]" data-icon="article">article</span>
              <h4 className="font-headline-md text-[20px] text-ink-text mb-2">Research Papers</h4>
              <p className="font-caption text-caption text-on-surface-variant">Deep dives into the mechanics of neural architectural synthesis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesOpenResearch;
