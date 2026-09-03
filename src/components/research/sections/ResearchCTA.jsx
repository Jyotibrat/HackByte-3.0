// src/components/research/sections/ResearchCTA.jsx
// Section 5: Final high-contrast CTA — "Explore the Work Behind Flanora"
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To UPDATE METRICS: edit the METRICS array below
// To ADD/REMOVE CTA BUTTONS: edit the BUTTONS array below

import { Link } from 'react-router-dom';

const METRICS = [
  { label: "PUBLISHED PAPERS", value: "18", highlight: false },
  { label: "OPEN DATASETS", value: "4.2 TB", highlight: false },
  { label: "INTERNAL REPS", value: "42", highlight: false },
  { label: "COMMUNITY CITATIONS", value: "1,820+", highlight: true },
];

const BUTTONS = [
  {
    label: "EXPLORE PUBLICATIONS",
    href: "/research/publications",
    style: "primary", // lime background
  },
  {
    label: "EXPLORE RESOURCES",
    href: "/research/resources",
    style: "outline", // white outline
  },
  {
    label: "TRY FLANORA",
    href: "/chat",
    style: "ghost", // muted text
  },
];

function ResearchCTA() {
  return (
    <section className="bg-charcoal-plate text-white py-24 md:py-36 relative overflow-hidden dark-grid-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left: Headline & Actions */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-400">[INVITATION]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
              <span className="font-label-caps text-label-caps text-neutral-300 tracking-widest uppercase">LAB ACCESS</span>
            </div>
            <h2 className="font-headline-lg text-4xl md:text-6xl text-white font-light leading-tight">
              Explore the Work <br /><span className="italic font-normal">Behind Flanora.</span>
            </h2>
            <p className="font-martel text-neutral-300 text-lg md:text-xl max-w-xl leading-relaxed">
              Read the research, explore the experiments, and discover the resources shaping Flanora.
              Built for architects, researchers, and engineers.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {BUTTONS.map((btn) => {
                if (btn.style === "primary") {
                  return (
                    <Link
                      key={btn.href}
                      to={btn.href}
                      className="bg-accent-lime text-primary hover:bg-[#b0e600] px-6 py-3 font-label-caps text-label-caps tracking-widest font-semibold flex items-center gap-2 transition-transform duration-150 active:scale-95"
                    >
                      <span>{btn.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </Link>
                  );
                }
                if (btn.style === "outline") {
                  return (
                    <Link
                      key={btn.href}
                      to={btn.href}
                      className="border border-neutral-600 hover:border-white text-white px-6 py-3 font-label-caps text-label-caps tracking-widest flex items-center gap-2 transition-colors duration-150"
                    >
                      <span>{btn.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={btn.href}
                    to={btn.href}
                    className="text-neutral-400 hover:text-white px-4 py-3 font-label-caps text-label-caps tracking-widest flex items-center gap-1.5 transition-colors duration-150 ml-2"
                  >
                    <span>{btn.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Metrics Panel */}
          <div className="md:col-span-4 border border-neutral-800 p-6 bg-neutral-900/50 backdrop-blur-sm">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              RESEARCH METRICS // 2025
            </div>
            <div className="space-y-4 font-mono text-sm">
              {METRICS.map((m) => (
                <div key={m.label} className="flex justify-between">
                  <span className="text-neutral-400">{m.label}</span>
                  <span className={m.highlight ? "text-accent-lime font-bold" : "text-white font-bold"}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 leading-tight">
              All algorithms, documentation, and mathematical models are subject to Flanora Open Laboratory Ethics.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResearchCTA;
