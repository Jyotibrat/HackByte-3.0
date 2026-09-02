import React from 'react';
import { Link } from 'react-router-dom';

function FeaturesOpenResearch() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page border-t border-hairline-border bg-surface-container-lowest relative">
      <div className="absolute inset-0 blueprint-bg opacity-30 pointer-events-none"></div>
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          <div className="lg:col-span-5 fade-in-up">
            <h2 className="font-headline-lg text-headline-lg text-ink-text mb-6">Open Research.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8" style={{ fontFamily: "'Martel Sans', sans-serif" }}>
              We believe in the democratization of architectural intelligence. Access our open weights, specialized datasets, and foundational research papers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-ink-text border-b border-ink-text pb-1 hover:text-outline hover:border-outline transition-colors duration-300 group" to="/models">
                EXPLORE MODELS
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </Link>
              <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-outline border-b border-transparent pb-1 hover:text-ink-text hover:border-ink-text transition-colors duration-300 group" to="/research">
                EXPLORE RESOURCES
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg fade-in-up stagger-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-text mb-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <h4 className="font-headline-md text-[20px] text-ink-text mb-2">Downloadable Weights</h4>
              <p className="font-caption text-caption text-on-surface-variant">Access foundational models for local deployment and specialized fine-tuning.</p>
            </div>
            
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg fade-in-up stagger-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-text mb-4"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
              <h4 className="font-headline-md text-[20px] text-ink-text mb-2">Curated Datasets</h4>
              <p className="font-caption text-caption text-on-surface-variant">High-fidelity geometric data and semantic structural annotations.</p>
            </div>
            
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg fade-in-up stagger-3 sm:col-span-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-text mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
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
