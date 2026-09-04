// src/components/research/sections/ResearchMethodology.jsx
// Section 4: Exploring Generative Architecture — 4 research theme pillars
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To ADD A THEME PILLAR: add a new entry to the THEMES array below
// To REMOVE A PILLAR: remove its entry from the THEMES array

const THEMES = [
  {
    id: "THEME_01",
    title: "Generative AI & Spatial Adjacency",
    description:
      "Formulating adjacency graph networks into differentiable loss functions that guarantee logical spatial proximities.",
    status: "IN PRODUCTION",
  },
  {
    id: "THEME_02",
    title: "Residential Floor-Plan Topologies",
    description:
      "Deconstructing multi-family and single-family domestic layouts into expressive topological vector languages.",
    status: "PUBLISHED 2024",
  },
  {
    id: "THEME_03",
    title: "Human-AI Co-Design & Intent",
    description:
      "Translating conceptual architect sketches and spatial prose into deterministic structural parameters.",
    status: "LAB TESTING",
  },
  {
    id: "THEME_04",
    title: "Parametric Volumetric Limits",
    description:
      "Adhering generative envelope geometry to real-world structural load ratings, building codes, and municipal zoning envelopes.",
    status: "IN REVIEW",
  },
];

function ResearchMethodology() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-hairline-border">
      <div className="max-w-3xl mb-16">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">METHODOLOGY / 03</span>
        <h2 className="font-headline-lg text-3xl md:text-headline-lg text-ink-text leading-tight mt-2 mb-4">
          Exploring Generative <br /><span className="italic font-light">Architecture</span>
        </h2>
        <p className="font-['Martel_Sans'] text-stone-600 text-body-md leading-relaxed">
          Our research addresses structural dilemmas where computational efficiency intersects with habitable human dignity.
          We investigate how spatial grammar models can understand daylight, structural sheer, and domestic circulation
          without manual drafting constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            className="p-6 border border-hairline-border bg-surface-container-lowest/50 flex flex-col justify-between h-full"
          >
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-4">[{theme.id}]</span>
              <h3 className="font-headline-md text-xl text-ink-text mb-3">{theme.title}</h3>
              <p className="font-['Martel_Sans'] text-xs text-stone-600 leading-relaxed">{theme.description}</p>
            </div>
            <div className="pt-6 mt-6 border-t border-hairline-border/60 text-[11px] font-mono text-neutral-400">
              STATUS: {theme.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResearchMethodology;
