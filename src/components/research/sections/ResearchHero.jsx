// src/components/research/sections/ResearchHero.jsx
// Section 1: Hero — "Where Flanora Thinks Further"
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To REPLACE: swap out this file's JSX with your new hero design

function ResearchHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 border-b border-hairline-border">
      {/* Editorial Plate Header Metadata */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-hairline-border/80 gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-on-surface-variant tracking-wider">[REF-ARCH-2025.04]</span>
          <span className="h-3 w-[1px] bg-hairline-border border-hairline-border border-r block"></span>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">RESEARCH / 01</span>
        </div>
        <div className="font-mono text-xs text-on-surface-variant flex items-center gap-4">
          <span>LOC: 40.7128° N, 74.0060° W</span>
          <span className="hidden sm:inline">COORD_TOLERANCE: 0.002mm</span>
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
          <p className="font-martel text-base md:text-body-md text-stone-600 leading-relaxed">
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
        <div className="absolute top-2 left-2 font-mono text-[10px] text-neutral-400 select-none">T:01/H</div>
        <div className="absolute top-2 right-2 font-mono text-[10px] text-neutral-400 select-none">AXIS_PLN</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-neutral-400 select-none">SCALE 1:50</div>
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-neutral-400 select-none">GEN.MOD-073</div>
        <div className="overflow-hidden relative aspect-[21/9] bg-neutral-100 flex items-center justify-center">
          <img
            alt="Flanora Architectural hero blueprint"
            className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] brightness-95 transition-transform duration-700 ease-out"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCluYKBJ-zU7TTwFpWjeBGvZ_MyvFGJp95oa34-WGnS205LAqT1Q944lBKrd_bH7JvKckSCnikmDB2Ay0zoyJqvE_xz2917VsebH1Gvrh_r7sE1aSTQs_r4kZsrJqs0Lau9CAhyk802MeNcmsnZNLnnDwV6xCnI5jt36StzWtrJqOJ8JtBFGGhzlzM4-0DCcXaNYIMrSEkgl14SHPubvcqM-T1wU2t4Pa-ESPkSH2COpX_IorRbpo3D"
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        </div>
        <div className="mt-3 px-2 flex justify-between items-center text-xs font-mono text-on-surface-variant">
          <span>FIG 01.1 — SYSTEM ISOMETRIC MATRIX &amp; DRAFTING COORDINATES</span>
          <span className="hidden sm:inline">ARCHIVE INDEX #7390</span>
        </div>
      </div>
    </section>
  );
}

export default ResearchHero;
