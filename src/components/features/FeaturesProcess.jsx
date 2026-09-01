import React from 'react';

function FeaturesProcess() {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-page border-t border-hairline-border bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16 md:mb-24 fade-in-up">
          <h2 className="font-headline-lg text-headline-lg text-ink-text mb-6">Structural Synthesis</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A continuous flow from concept to concrete geometry. Watch Flanora interpret spatial relationships and constraints in real-time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center border-t border-b border-hairline-border py-12 md:py-0 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-hairline-border -z-10"></div>
          
          <div className="bg-surface-container-lowest md:border-r border-hairline-border p-8 md:p-12 fade-in-up">
            <span className="font-label-caps text-label-caps text-outline mb-4 block">01. Input</span>
            <div className="p-6 border border-hairline-border rounded-lg bg-paper-bg shadow-sm">
              <p className="font-body-md text-body-md text-ink-text font-medium">"Design a sustainable, open-concept research pavilion with integrated garden courtyards."</p>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest md:border-r border-hairline-border p-8 md:p-12 fade-in-up stagger-1 relative flex flex-col items-center">
            <span className="font-label-caps text-label-caps text-outline mb-4 block self-start">02. Interpretation</span>
            <div className="w-16 h-16 rounded-full border border-hairline-border flex items-center justify-center bg-paper-bg relative my-4">
              <div className="absolute inset-0 bg-ai-glow blur-md rounded-full opacity-30 animate-pulse"></div>
              <span className="material-symbols-outlined text-ink-text relative z-10" data-icon="memory">memory</span>
            </div>
            <p className="font-caption text-caption text-on-surface-variant text-center mt-4">Processing spatial constraints & light flow...</p>
          </div>
          
          <div className="bg-surface-container-lowest p-8 md:p-12 fade-in-up stagger-2">
            <span className="font-label-caps text-label-caps text-outline mb-4 block">03. Output</span>
            <div className="aspect-square border border-hairline-border rounded-lg bg-paper-bg p-2 shadow-sm flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 blueprint-bg opacity-20"></div>
              <span className="material-symbols-outlined text-outline text-[48px]" data-icon="floor">floor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesProcess;
