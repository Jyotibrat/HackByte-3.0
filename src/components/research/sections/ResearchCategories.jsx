// src/components/research/sections/ResearchCategories.jsx
// Section 2: Research Disciplines & Tracks (Publications, Articles, Technical Reports, Resources)
// To REMOVE: delete this file and its import in ResearchPage.jsx
// To ADD A NEW ITEM: duplicate one <article> block below and update the fields
// To REORDER items: move the <article> blocks up or down in the JSX

import publicationsImg from '../../../assets/research/Publications_img.png';
import articlesImg from '../../../assets/research/Articles_img.png';
import technicalReportsImg from '../../../assets/research/Technical_Reports_img.png';

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
    imageSrc: publicationsImg,
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
    imageSrc: articlesImg,
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
    imageSrc: technicalReportsImg,
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
            <svg className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
      <div className={imageColClass}>
        <div className="bg-surface-container-lowest p-2.5 border border-hairline-border group-hover:border-neutral-400 transition-colors duration-300 shadow-sm">
          <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
            <img
              alt={item.imageAlt}
              className="w-full h-full object-cover grayscale contrast-105 transition-transform duration-500 ease-out"
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
