// src/components/research/sections/ResearchEcosystem.jsx
// Section 3: Research in the Open — shows the 4-node circulation schema
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To ADD A FLOW NODE: add a new entry to the FLOW_NODES array below

const FLOW_NODES = [
  {
    step: "01 / INPUT",
    title: "Publications",
    description: "Ideas and formal theoretical research exploring spatial algorithms.",
    accentColor: "bg-accent-lime",
  },
  {
    step: "02 / INTERPRET",
    title: "Articles",
    description: "Accessible thinking and spatial experimentation translated for practitioners.",
    accentColor: "bg-neutral-300",
  },
  {
    step: "03 / EVALUATE",
    title: "Technical Reports",
    description: "Development metrics, benchmarks, precision tests, and iteration cycles.",
    accentColor: "bg-neutral-300",
  },
  {
    step: "04 / DISSEMINATE",
    title: "Resources",
    description: "Public knowledge, geometry representations, and open token schemas.",
    accentColor: "bg-accent-lime",
  },
];

function ResearchEcosystem() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-hairline-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left: Title & Description */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">ECOSYSTEM / 02</span>
          <h2 className="font-headline-lg text-3xl md:text-headline-lg text-ink-text leading-tight">
            Research in <br /><span className="italic font-light">the Open</span>
          </h2>
          <p className="font-['Martel_Sans'] text-stone-600 text-body-md leading-relaxed pt-2">
            Flanora operates as an open inquiry into spatial intelligence. Each stream of research feeds directly
            into our generational model family and architectural toolsets.
          </p>
          <div className="pt-4 flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>PIPELINE: CONTINUOUS LOOP</span>
            <span>•</span>
            <span>FEEDBACK: BIDIRECTIONAL</span>
          </div>
        </div>

        {/* Right: Flow Diagram */}
        <div className="md:col-span-7 bg-surface-container-lowest border border-hairline-border p-6 md:p-8 relative">
          <div className="text-xs font-mono text-neutral-400 border-b border-hairline-border pb-3 mb-6 flex justify-between">
            <span>SCHEMA: GENERATIVE CIRCULATION</span>
            <span>VER 4.2</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {FLOW_NODES.map((node) => (
              <div
                key={node.step}
                className="p-4 border border-hairline-border bg-paper-bg hover:border-ink-text transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-neutral-400">{node.step}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${node.accentColor}`}></span>
                </div>
                <h4 className="font-headline-md text-lg text-ink-text mb-1">{node.title}</h4>
                <p className="font-['Martel_Sans'] text-xs text-stone-500">{node.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-hairline-border flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-neutral-500 gap-2">
            <span>INTEGRATION: FLANORA BASE MODEL 2.5</span>
            <span className="flex items-center gap-1 text-primary font-semibold">
              <span>FULL TOPOLOGY SYNCHRONIZED</span>
              <span className="material-symbols-outlined text-[14px]">check</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResearchEcosystem;
