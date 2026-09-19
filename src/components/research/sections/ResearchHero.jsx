// src/components/research/sections/ResearchHero.jsx
// Section 1: Hero — "Where Flanora Thinks Further"
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To REPLACE: swap out this file's JSX with your new hero design

import heroVideo from "../../../assets/research/Research_Pg_Hero_Section_Video.mp4";

function ResearchHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 border-b border-hairline-border">
      {/* Editorial Plate Header Metadata */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-hairline-border/80 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">RESEARCH / 04</span>
        </div>
      </div>

      {/* Main Title & Subtext */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        <div className="md:col-span-8 hero-heading">
          <h1 className="font-headline-lg text-headline-lg md:text-display-xl text-ink-text leading-tight tracking-tight">
            Where Flanora <br /><span className="italic font-light">Thinks Further</span>
          </h1>
        </div>
        <div className="md:col-span-4 md:pt-4">
          <p className="font-['Martel_Sans'] text-base md:text-body-md text-stone-600 leading-relaxed">
            Explore the research, publications, experiments, and resources behind Flanora AI.
            An open inquiry into spatial intelligence, algorithmic synthesis, and generative architectural forms.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-lime"></span>
            <span className="font-label-caps text-label-caps text-neutral-500 uppercase tracking-widest text-[11px]">
              Lab Status: Active Synthesis
            </span>
          </div>
        </div>
      </div>

      {/* Architectural Hero Visual Container (Matted Frame) */}
      <div className="relative bg-surface-container-lowest p-3 sm:p-4 border border-hairline-border shadow-sm group">
        <div className="overflow-hidden relative aspect-[21/7] bg-neutral-100 flex items-center justify-center">
          <video
            src={heroVideo}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] brightness-95 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        </div>
        <div className="mt-3 px-2 flex justify-between items-center text-xs font-mono text-on-surface-variant">
          <span>TEXT-TO-PLAN / GENERATIVE ARCHITECTURE STUDY</span>
          <span className="hidden sm:inline">FLANORA RESEARCH #V1-01</span>
        </div>
      </div>
    </section>
  );
}

export default ResearchHero;
