import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ResearchPage.css';

gsap.registerPlugin(ScrollTrigger);

function ResearchPage() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      const ctx = gsap.context(() => {
        // Reveal on Hero
        gsap.from(".hero-heading", {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out"
        });

        // Stagger reveal for the research category items
        gsap.utils.toArray(".research-article").forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            opacity: 0,
            y: 25,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1
          });
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flanora-research-page blueprint-bg min-h-screen">
      {/* SECTION 1: HERO */}
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
              Where Flanora <br/><span className="italic font-light">Thinks Further</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-4">
            <p className="font-martel text-base md:text-body-md text-stone-600 leading-relaxed">
              Explore the research, publications, experiments, and resources behind Flanora AI. An open inquiry into spatial intelligence, algorithmic synthesis, and generative architectural forms.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-lime"></span>
              <span className="font-label-caps text-label-caps text-neutral-500 uppercase tracking-widest text-[11px]">Lab Status: Active Synthesis</span>
            </div>
          </div>
        </div>

        {/* Architectural Hero Visual Container */}
        <div className="relative bg-surface-container-lowest p-3 sm:p-4 border border-hairline-border shadow-sm group">
          <div className="absolute top-2 left-2 font-mono text-[10px] text-neutral-400 select-none">T:01/H</div>
          <div className="absolute top-2 right-2 font-mono text-[10px] text-neutral-400 select-none">AXIS_PLN</div>
          <div className="absolute bottom-2 left-2 font-mono text-[10px] text-neutral-400 select-none">SCALE 1:50</div>
          <div className="absolute bottom-2 right-2 font-mono text-[10px] text-neutral-400 select-none">GEN.MOD-073</div>
          <div className="overflow-hidden relative aspect-[21/9] bg-neutral-100 flex items-center justify-center">
            <img 
              alt="Flanora Architectural hero blueprint" 
              className="w-full h-full object-cover object-center filter grayscale contrast-[1.05] brightness-95 group-hover:scale-[1.015] transition-transform duration-700 ease-out" 
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

      {/* SECTION 2: RESEARCH CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-hairline-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-2">INDEX DIRECTORY</div>
            <h2 className="font-headline-md text-headline-md text-ink-text">Research Disciplines &amp; Tracks</h2>
          </div>
          <p className="font-martel text-sm text-stone-500 max-w-sm">
            Curated nodes representing mathematical papers, conceptual dialogues, model metrics, and publicly released toolsets.
          </p>
        </div>

        <div className="space-y-16">
          {/* ITEM 01: PUBLICATIONS */}
          <article className="research-article grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-hairline-border pt-10 group">
            <div className="md:col-span-1">
              <span className="font-headline-lg text-headline-lg md:text-5xl text-neutral-300 font-light group-hover:text-primary transition-colors duration-300">
                01
              </span>
            </div>
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-lime"></span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">PEER-REVIEWED ARCHIVE</span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl text-ink-text group-hover:underline underline-offset-4 decoration-1">
                Publications
              </h3>
              <p className="font-martel text-stone-600 text-base leading-relaxed">
                Formal research outputs detailing generative spatial distribution, constraint satisfaction, and algorithmic floor-plan synthesis.
              </p>
              <div className="pt-2">
                <a className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest text-primary hover:text-secondary group/btn transition-colors" href="#publications">
                  <span className="border-b border-primary pb-0.5 group-hover/btn:border-secondary">EXPLORE PUBLICATIONS</span>
                  <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200">arrow_outward</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="bg-surface-container-lowest p-2.5 border border-hairline-border group-hover:border-neutral-400 transition-colors duration-300 shadow-sm">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img alt="Publications Architectural Diagram" className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQR4Bt7q2pV77k63rAELU73NnNXdjWmnA7OUOrv9ZSHY2BEHZzeEqYFbjnuiOAe_laj-q4fbRuuNC6DoicVaORMcokiQRvV-sHFF_3LcpCZXNKNDDMZAVLusvp_7gDEjHAy8sDdqvLddyUOWkCY6A0WC7yDRmet6f0IJwtyL-2DygraVJ6kOu6fBmJlZuKYCNBnJhZQnMXiMHYo61mfALmhZMKbNusm-XaF5uuSebhn4UOC32-ys1Q" />
                </div>
                <div className="flex justify-between items-center px-1 pt-2 font-mono text-[11px] text-neutral-400">
                  <span>PLATE 01.A — PLANAR TOPOLOGY MAPPING</span>
                  <span>SYNTHESIS #71</span>
                </div>
              </div>
            </div>
          </article>

          {/* ITEM 02: ARTICLES */}
          <article className="research-article grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-hairline-border pt-10 group">
            <div className="md:col-span-1">
              <span className="font-headline-lg text-headline-lg md:text-5xl text-neutral-300 font-light group-hover:text-primary transition-colors duration-300">
                02
              </span>
            </div>
            <div className="md:col-span-5 md:order-last space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-lime"></span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">DISCOURSE &amp; THEORY</span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl text-ink-text group-hover:underline underline-offset-4 decoration-1">
                Articles
              </h3>
              <p className="font-martel text-stone-600 text-base leading-relaxed">
                Accessible perspectives, spatial essays, and design thinking on the emerging dialogue between human architects and generative models.
              </p>
              <div className="pt-2">
                <a className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest text-primary hover:text-secondary group/btn transition-colors" href="#articles">
                  <span className="border-b border-primary pb-0.5 group-hover/btn:border-secondary">READ ARTICLES</span>
                  <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200">arrow_outward</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-6 md:order-first">
              <div className="bg-surface-container-lowest p-2.5 border border-hairline-border group-hover:border-neutral-400 transition-colors duration-300 shadow-sm">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img alt="Articles Spatial Essay Figure" className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC9BAzAQU83cYLC7DYpBxb8SIGCqjQi_C1Q0G1fyRbKMB3cApyEgkYdKF7rIztLKADlMlebeXOoXbl01gFIN6GCjXn8Tu_0x9Y49jhIVzPlfPVl8u8dL8h-c3aF5hsfuXAwBCnvYcd0b7_vG9lnDBfNpy0FcsPvseoOf-tLVYE1HRzmq-t46JAkNeMqXK1HlUNP4nnExD08I2YJcKDIkjqaUKzK9HY1h96jq56TQkpT-V_nnnJKuvo" />
                </div>
                <div className="flex justify-between items-center px-1 pt-2 font-mono text-[11px] text-neutral-400">
                  <span>PLATE 02.C — HUMAN-MODEL VOLUMETRIC COLLABORATION</span>
                  <span>ESSAY #74</span>
                </div>
              </div>
            </div>
          </article>

          {/* ITEM 03: TECHNICAL REPORTS */}
          <article className="research-article grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-hairline-border pt-10 group">
            <div className="md:col-span-1">
              <span className="font-headline-lg text-headline-lg md:text-5xl text-neutral-300 font-light group-hover:text-primary transition-colors duration-300">
                03
              </span>
            </div>
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-lime"></span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">INTERNAL BENCHMARKS</span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl text-ink-text group-hover:underline underline-offset-4 decoration-1">
                Technical Reports
              </h3>
              <p className="font-martel text-stone-600 text-base leading-relaxed">
                In-depth documentation of internal benchmarks, model iteration experiments, spatial parsing pipelines, and evaluation frameworks.
              </p>
              <div className="pt-2">
                <a className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest text-primary hover:text-secondary group/btn transition-colors" href="#reports">
                  <span className="border-b border-primary pb-0.5 group-hover/btn:border-secondary">VIEW REPORTS</span>
                  <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200">arrow_outward</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="bg-surface-container-lowest p-2.5 border border-hairline-border group-hover:border-neutral-400 transition-colors duration-300 shadow-sm">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img alt="Technical Report Geometry Model" className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAem8jPkCI99TospKS5FnmZwfEdlpDqGRgmmN3rQfmfrgyVeSavIut-wiJ4eSwiFgJvwuhLFMvR6RS6wlStNltOYlC63E74I1xC-UU5REhiRUET97ome2b_sjRtlJyYPGnpMdmsN9onR9TWU719lzXV0YXNaHyhaxCh0HZhByYtwtV_qRNgjqBflo5Uy-cy98WLBflxJ2TPJFTPkcG3hztSdP3UkBwMVA7ripey5zADUehYFC-44LVh" />
                </div>
                <div className="flex justify-between items-center px-1 pt-2 font-mono text-[11px] text-neutral-400">
                  <span>PLATE 03.B — VOLUMETRIC EVALUATION &amp; LATENT RECONSTRUCTION</span>
                  <span>EXP #72</span>
                </div>
              </div>
            </div>
          </article>

          {/* ITEM 04: RESOURCES */}
          <article className="research-article grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-hairline-border pt-10 group">
            <div className="md:col-span-1">
              <span className="font-headline-lg text-headline-lg md:text-5xl text-neutral-300 font-light group-hover:text-primary transition-colors duration-300">
                04
              </span>
            </div>
            <div className="md:col-span-5 md:order-last space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-lime"></span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">DATASETS &amp; SCHEMAS</span>
              </div>
              <h3 className="font-headline-md text-2xl md:text-3xl text-ink-text group-hover:underline underline-offset-4 decoration-1">
                Resources
              </h3>
              <p className="font-martel text-stone-600 text-base leading-relaxed">
                Public datasets, geometric token vocabularies, architectural presentation materials, and research tools for the generative community.
              </p>
              <div className="pt-2">
                <a className="inline-flex items-center gap-2 font-label-caps text-label-caps tracking-widest text-primary hover:text-secondary group/btn transition-colors" href="#resources">
                  <span className="border-b border-primary pb-0.5 group-hover/btn:border-secondary">EXPLORE RESOURCES</span>
                  <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200">arrow_outward</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-6 md:order-first">
              <div className="bg-surface-container-lowest p-2.5 border border-hairline-border group-hover:border-neutral-400 transition-colors duration-300 shadow-sm">
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img alt="Open Architectural Resources Visual" className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXbchDKk9T28mg1ARJMdtDcALO9BNT_ts7JS09LfuRgQD8ss-QspsHhpfp63fxHnYFEdsWRKwz49jj0uQdelPT8B-k9T-FK7MuvU3-810rtMbIcYG2GYaTaXLtixeEqm0AmHidKOBaEyltyRk3FKVPVMVy7Ri1tOh1owuBA5qGH6_zZNK6LbRHXY7Isr7o8ttItQDmcEcPvnWBrThlWUFJk861JaF5fcHl-fbr9nrjWGhTQICDuOYv" />
                </div>
                <div className="flex justify-between items-center px-1 pt-2 font-mono text-[11px] text-neutral-400">
                  <span>PLATE 04.D — COMPONENT VOCABULARY CORPUS</span>
                  <span>DATASET #76</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 3: RESEARCH ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-hairline-border">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          <div className="md:col-span-5 space-y-4">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">ECOSYSTEM / 02</span>
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-ink-text leading-tight">
              Research in <br/><span className="italic font-light">the Open</span>
            </h2>
            <p className="font-martel text-stone-600 text-body-md leading-relaxed pt-2">
              Flanora operates as an open inquiry into spatial intelligence. Each stream of research feeds directly into our generational model family and architectural toolsets.
            </p>
            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-neutral-500">
              <span>PIPELINE: CONTINUOUS LOOP</span>
              <span>•</span>
              <span>FEEDBACK: BIDIRECTIONAL</span>
            </div>
          </div>
          
          <div className="md:col-span-7 bg-surface-container-lowest border border-hairline-border p-6 md:p-8 relative">
            <div className="text-xs font-mono text-neutral-400 border-b border-hairline-border pb-3 mb-6 flex justify-between">
              <span>SCHEMA: GENERATIVE CIRCULATION</span>
              <span>VER 4.2</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="p-4 border border-hairline-border bg-paper-bg hover:border-ink-text transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-neutral-400">01 / INPUT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
                </div>
                <h4 className="font-headline-md text-lg text-ink-text mb-1">Publications</h4>
                <p className="font-martel text-xs text-stone-500">Ideas and formal theoretical research exploring spatial algorithms.</p>
              </div>
              <div className="p-4 border border-hairline-border bg-paper-bg hover:border-ink-text transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-neutral-400">02 / INTERPRET</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                </div>
                <h4 className="font-headline-md text-lg text-ink-text mb-1">Articles</h4>
                <p className="font-martel text-xs text-stone-500">Accessible thinking and spatial experimentation translated for practitioners.</p>
              </div>
              <div className="p-4 border border-hairline-border bg-paper-bg hover:border-ink-text transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-neutral-400">03 / EVALUATE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                </div>
                <h4 className="font-headline-md text-lg text-ink-text mb-1">Technical Reports</h4>
                <p className="font-martel text-xs text-stone-500">Development metrics, benchmarks, precision tests, and iteration cycles.</p>
              </div>
              <div className="p-4 border border-hairline-border bg-paper-bg hover:border-ink-text transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-neutral-400">04 / DISSEMINATE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
                </div>
                <h4 className="font-headline-md text-lg text-ink-text mb-1">Resources</h4>
                <p className="font-martel text-xs text-stone-500">Public knowledge, geometry representations, and open token schemas.</p>
              </div>
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

      {/* SECTION 4: RESEARCH FOCUS */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 border-b border-hairline-border">
        <div className="max-w-3xl mb-16">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">METHODOLOGY / 03</span>
          <h2 className="font-headline-lg text-3xl md:text-headline-lg text-ink-text leading-tight mt-2 mb-4">
            Exploring Generative <br/><span className="italic font-light">Architecture</span>
          </h2>
          <p className="font-martel text-stone-600 text-body-md leading-relaxed">
            Our research addresses structural dilemmas where computational efficiency intersects with habitable human dignity. We investigate how spatial grammar models can understand daylight, structural sheer, and domestic circulation without manual drafting constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 border border-hairline-border bg-surface-container-lowest/50 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-4">[THEME_01]</span>
              <h3 className="font-headline-md text-xl text-ink-text mb-3">Generative AI &amp; Spatial Adjacency</h3>
              <p className="font-martel text-xs text-stone-600 leading-relaxed">
                Formulating adjacency graph networks into differentiable loss functions that guarantee logical spatial proximities.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hairline-border/60 text-[11px] font-mono text-neutral-400">
              STATUS: IN PRODUCTION
            </div>
          </div>
          <div className="p-6 border border-hairline-border bg-surface-container-lowest/50 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-4">[THEME_02]</span>
              <h3 className="font-headline-md text-xl text-ink-text mb-3">Residential Floor-Plan Topologies</h3>
              <p className="font-martel text-xs text-stone-600 leading-relaxed">
                Deconstructing multi-family and single-family domestic layouts into expressive topological vector languages.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hairline-border/60 text-[11px] font-mono text-neutral-400">
              STATUS: PUBLISHED 2024
            </div>
          </div>
          <div className="p-6 border border-hairline-border bg-surface-container-lowest/50 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-4">[THEME_03]</span>
              <h3 className="font-headline-md text-xl text-ink-text mb-3">Human-AI Co-Design &amp; Intent</h3>
              <p className="font-martel text-xs text-stone-600 leading-relaxed">
                Translating conceptual architect sketches and spatial prose into deterministic structural parameters.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hairline-border/60 text-[11px] font-mono text-neutral-400">
              STATUS: LAB TESTING
            </div>
          </div>
          <div className="p-6 border border-hairline-border bg-surface-container-lowest/50 flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-neutral-400 block mb-4">[THEME_04]</span>
              <h3 className="font-headline-md text-xl text-ink-text mb-3">Parametric Volumetric Limits</h3>
              <p className="font-martel text-xs text-stone-600 leading-relaxed">
                Adhering generative envelope geometry to real-world structural load ratings, building codes, and municipal zoning envelopes.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-hairline-border/60 text-[11px] font-mono text-neutral-400">
              STATUS: IN REVIEW
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL HIGH-CONTRAST CTA */}
      <section className="bg-charcoal-plate text-white py-24 md:py-36 relative overflow-hidden dark-grid-bg">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400">[INVITATION]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime"></span>
                <span className="font-label-caps text-label-caps text-neutral-300 tracking-widest uppercase">LAB ACCESS</span>
              </div>
              <h2 className="font-headline-lg text-4xl md:text-6xl text-white font-light leading-tight">
                Explore the Work <br/><span className="italic font-normal">Behind Flanora.</span>
              </h2>
              <p className="font-martel text-neutral-300 text-lg md:text-xl max-w-xl leading-relaxed">
                Read the research, explore the experiments, and discover the resources shaping Flanora. Built for architects, researchers, and engineers.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a className="bg-accent-lime text-primary hover:bg-[#b0e600] px-6 py-3 font-label-caps text-label-caps tracking-widest font-semibold flex items-center gap-2 transition-transform duration-150 active:scale-95" href="#publications">
                  <span>EXPLORE PUBLICATIONS</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a className="border border-neutral-600 hover:border-white text-white px-6 py-3 font-label-caps text-label-caps tracking-widest flex items-center gap-2 transition-colors duration-150" href="#resources">
                  <span>EXPLORE RESOURCES</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </a>
                <a className="text-neutral-400 hover:text-white px-4 py-3 font-label-caps text-label-caps tracking-widest flex items-center gap-1.5 transition-colors duration-150 ml-2" href="#try">
                  <span>TRY FLANORA</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-4 border border-neutral-800 p-6 bg-neutral-900/50 backdrop-blur-sm">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                RESEARCH METRICS // 2025
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">PUBLISHED PAPERS</span>
                  <span className="text-white font-bold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">OPEN DATASETS</span>
                  <span className="text-white font-bold">4.2 TB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">INTERNAL REPS</span>
                  <span className="text-white font-bold">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">COMMUNITY CITATIONS</span>
                  <span className="text-accent-lime font-bold">1,820+</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 leading-tight">
                All algorithms, documentation, and mathematical models are subject to Flanora Open Laboratory Ethics.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResearchPage;
