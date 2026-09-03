// src/components/research/sections/ResearchCategories.jsx
// Section 2: Research Disciplines & Tracks (Publications, Articles, Technical Reports, Resources)
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To ADD A NEW ITEM: duplicate one <article> block below and update the fields
// To REORDER items: move the <article> blocks up or down in the JSX

const CATEGORIES = [
  {
    number: "01",
    tag: "PEER-REVIEWED ARCHIVE",
    title: "Publications",
    description:
      "Formal research outputs detailing generative spatial distribution, constraint satisfaction, and algorithmic floor-plan synthesis.",
    linkLabel: "EXPLORE PUBLICATIONS",
    href: "#publications",
    imageAlt: "Publications Architectural Diagram",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQR4Bt7q2pV77k63rAELU73NnNXdjWmnA7OUOrv9ZSHY2BEHZzeEqYFbjnuiOAe_laj-q4fbRuuNC6DoicVaORMcokiQRvV-sHFF_3LcpCZXNKNDDMZAVLusvp_7gDEjHAy8sDdqvLddyUOWkCY6A0WC7yDRmet6f0IJwtyL-2DygraVJ6kOu6fBmJlZuKYCNBnJhZQnMXiMHYo61mfALmhZMKbNusm-XaF5uuSebhn4UOC32-ys1Q",
    plateLabel: "PLATE 01.A — PLANAR TOPOLOGY MAPPING",
    plateRef: "SYNTHESIS #71",
    // imageRight: true means image is on the right, text on the left
    imageRight: true,
  },
  {
    number: "02",
    tag: "DISCOURSE & THEORY",
    title: "Articles",
    description:
      "Accessible perspectives, spatial essays, and design thinking on the emerging dialogue between human architects and generative models.",
    linkLabel: "READ ARTICLES",
    href: "#articles",
    imageAlt: "Articles Spatial Essay Figure",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9BAzAQU83cYLC7DYpBxb8SIGCqjQi_C1Q0G1fyRbKMB3cApyEgkYdKF7rIztLKADlMlebeXOoXbl01gFIN6GCjXn8Tu_0x9Y49jhIVzPlfPVl8u8dL8h-c3aF5hsfuXAwBCnvYcd0b7_vG9lnDBfNpy0FcsPvseoOf-tLVYE1HRzmq-t46JAkNeMqXK1HlUNP4nnExD08I2YJcKDIkjqaUKzK9HY1h96jq56TQkpT-V_nnnJKuvo",
    plateLabel: "PLATE 02.C — HUMAN-MODEL VOLUMETRIC COLLABORATION",
    plateRef: "ESSAY #74",
    imageRight: false,
  },
  {
    number: "03",
    tag: "INTERNAL BENCHMARKS",
    title: "Technical Reports",
    description:
      "In-depth documentation of internal benchmarks, model iteration experiments, spatial parsing pipelines, and evaluation frameworks.",
    linkLabel: "VIEW REPORTS",
    href: "#reports",
    imageAlt: "Technical Report Geometry Model",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAem8jPkCI99TospKS5FnmZwfEdlpDqGRgmmN3rQfmfrgyVeSavIut-wiJ4eSwiFgJvwuhLFMvR6RS6wlStNltOYlC63E74I1xC-UU5REhiRUET97ome2b_sjRtlJyYPGnpMdmsN9onR9TWU719lzXV0YXNaHyhaxCh0HZhByYtwtV_qRNgjqBflo5Uy-cy98WLBflxJ2TPJFTPkcG3hztSdP3UkBwMVA7ripey5zADUehYFC-44LVh",
    plateLabel: "PLATE 03.B — VOLUMETRIC EVALUATION & LATENT RECONSTRUCTION",
    plateRef: "EXP #72",
    imageRight: true,
  },
  {
    number: "04",
    tag: "DATASETS & SCHEMAS",
    title: "Resources",
    description:
      "Public datasets, geometric token vocabularies, architectural presentation materials, and research tools for the generative community.",
    linkLabel: "EXPLORE RESOURCES",
    href: "#resources",
    imageAlt: "Open Architectural Resources Visual",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXbchDKk9T28mg1ARJMdtDcALO9BNT_ts7JS09LfuRgQD8ss-QspsHhpfp63fxHnYFEdsWRKwz49jj0uQdelPT8B-k9T-FK7MuvU3-810rtMbIcYG2GYaTaXLtixeEqm0AmHidKOBaEyltyRk3FKVPVMVy7Ri1tOh1owuBA5qGH6_zZNK6LbRHXY7Isr7o8ttItQDmcEcPvnWBrThlWUFJk861JaF5fcHl-fbr9nrjWGhTQICDuOYv",
    plateLabel: "PLATE 04.D — COMPONENT VOCABULARY CORPUS",
    plateRef: "DATASET #76",
    imageRight: false,
  },
];

function CategoryArticle({ item }) {
  const textColClass = item.imageRight
    ? "md:col-span-5 space-y-4"
    : "md:col-span-5 md:order-last space-y-4";
  const imageColClass = item.imageRight
    ? "md:col-span-6"
    : "md:col-span-6 md:order-first";

  return (
    <article className="research-article grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-hairline-border pt-10 group">
      <div className="md:col-span-1">
        <span className="font-headline-lg text-headline-lg md:text-5xl text-neutral-300 font-light group-hover:text-primary transition-colors duration-300">
          {item.number}
        </span>
      </div>
      <div className={textColClass}>
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent-lime"></span>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{item.tag}</span>
        </div>
        <h3 className="font-headline-md text-2xl md:text-3xl text-ink-text group-hover:underline underline-offset-4 decoration-1">
          {item.title}
        </h3>
        <p className="font-martel text-stone-600 text-base leading-relaxed">{item.description}</p>
        <div className="pt-2">
          <a
            className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest text-primary hover:text-secondary group/btn transition-colors"
            href={item.href}
          >
            <span className="border-b border-primary pb-0.5 group-hover/btn:border-secondary">{item.linkLabel}</span>
            <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200">
              arrow_outward
            </span>
          </a>
        </div>
      </div>
      <div className={imageColClass}>
        <div className="bg-surface-container-lowest p-2.5 border border-hairline-border group-hover:border-neutral-400 transition-colors duration-300 shadow-sm">
          <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
            <img
              alt={item.imageAlt}
              className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out"
              src={item.imageSrc}
            />
          </div>
          <div className="flex justify-between items-center px-1 pt-2 font-mono text-[11px] text-neutral-400">
            <span>{item.plateLabel}</span>
            <span>{item.plateRef}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ResearchCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-hairline-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-2">
            INDEX DIRECTORY
          </div>
          <h2 className="font-headline-md text-headline-md text-ink-text">Research Disciplines &amp; Tracks</h2>
        </div>
        <p className="font-martel text-sm text-stone-500 max-w-sm">
          Curated nodes representing mathematical papers, conceptual dialogues, model metrics, and publicly released toolsets.
        </p>
      </div>

      <div className="space-y-16">
        {CATEGORIES.map((item) => (
          <CategoryArticle key={item.number} item={item} />
        ))}
      </div>
    </section>
  );
}

export default ResearchCategories;
