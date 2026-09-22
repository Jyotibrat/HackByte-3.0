import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import TechnicalReportCard from "../components/research/TechnicalReportCard";
import TechnicalReportListItem from "../components/research/TechnicalReportListItem";

import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

function formatPathname(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return "Research";
  
  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ResearchCategoryPage() {
  const location = useLocation();
  const title = formatPathname(location.pathname);
  
  const [viewMode, setViewMode] = useState("grid");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    document.title = `Flanora AI | ${title}`;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let animationFrameId;
    const update = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [title]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPublications = location.pathname === "/research/publications";
  const isArticles = location.pathname === "/research/articles";

  // Build the items array based on the category
  let items = [];
  if (isPublications) {
    items.push({
      id: "survey",
      title: "A State-of-Art Survey on Generative AI Techniques for Floor Planning",
      date: "April 27, 2025",
      year: "2025",
      category: "Research",
      href: "/research/publications/survey-paper-2025",
      description: "A comprehensive overview of state-of-the-art generative AI techniques for automated floor planning and architectural design.",
      gradient: { color1: "#96ffd7", color2: "#dbd9c5", color3: "#dce1a2" }
    });
  } else if (isArticles) {
    items.push({
      id: "devto",
      title: "Building an AI Floor Planner with Google Gemini and Matplotlib",
      date: "Mar 4, 2026",
      year: "2026",
      category: "Research",
      href: "https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d",
      description: "Learn how to build a basic AI-powered floor planner using Google's Gemini models and Matplotlib in this step-by-step tutorial.",
      gradient: { color1: "#6bb0ff", color2: "#7adb53", color3: "#a2e1c2" }
    });
  } else {
    // Fallback item for unknown categories to demonstrate the UI
    items.push({
      id: "upcoming",
      title: `Upcoming ${title}`,
      date: "Coming Soon",
      year: "2026",
      category: "Research",
      href: "#",
      description: `Stay tuned for exciting updates in ${title}. We will publish our findings and updates here soon.`,
      gradient: { color1: "#ff5005", color2: "#dbba95", color3: "#d0bce1" }
    });
  }

  const filteredItems = items.filter(item => 
    selectedYear === "All" ? true : item.year === selectedYear
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    // Basic date parsing logic (if "Coming Soon", sort to bottom or top depending on logic, here we'll let it be parsed, likely NaN, so we handle it)
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    
    if (isNaN(dateA)) dateA = 0;
    if (isNaN(dateB)) dateB = 0;

    if (sortOrder === "desc") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
    <main className="blueprint-bg flanora-research-page min-h-screen pt-32 pb-24 text-black font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight mb-12">
            {title}
          </h1>
          
          {/* Sub Navigation Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-300 pb-4 gap-4">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600 font-medium">
              {["All", "2026", "2025", "2024"].map(year => (
                <button 
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`hover:text-black transition-colors ${selectedYear === year ? 'text-black' : ''}`}
                >
                  {year}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-6 text-sm text-black font-medium">
              <div className="relative" ref={sortRef}>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  Sort
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-neutral-800 rounded-xl shadow-xl py-2 z-50 text-white font-sans overflow-hidden">
                    <button 
                      onClick={() => { setSortOrder("desc"); setIsSortOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-800 transition-colors flex items-center gap-3"
                    >
                      <div className={`w-3 h-3 rounded-full border border-white flex items-center justify-center ${sortOrder === 'desc' ? 'bg-white' : 'bg-transparent'}`}>
                        {sortOrder === 'desc' && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                      </div>
                      Newest → Oldest
                    </button>
                    <button 
                      onClick={() => { setSortOrder("asc"); setIsSortOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-800 transition-colors flex items-center gap-3"
                    >
                      <div className={`w-3 h-3 rounded-full border border-white flex items-center justify-center ${sortOrder === 'asc' ? 'bg-white' : 'bg-transparent'}`}>
                        {sortOrder === 'asc' && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                      </div>
                      Oldest → Newest
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-neutral-500">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`hover:text-black transition-colors ${viewMode === "grid" ? "text-black" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`hover:text-black transition-colors ${viewMode === "list" ? "text-black" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Reports Layout */}
        {sortedItems.length === 0 ? (
          <div className="py-24 text-center text-neutral-500">
            No {title.toLowerCase()} found for {selectedYear}.
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {sortedItems.map((item) => (
              <TechnicalReportCard
                key={item.id}
                title={item.title}
                date={item.date}
                category={item.category}
                href={item.href}
                customGraphic={
                  <div className="absolute inset-0">
                    <ShaderGradientCanvas
                      importedFiber={{ ...fiber, ...drei, ...reactSpring }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                    >
                      <ShaderGradient
                        animate="on"
                        axesHelper="off"
                        brightness={1.2}
                        cAzimuthAngle={180}
                        cDistance={3.6}
                        cPolarAngle={90}
                        cameraZoom={1}
                        color1={item.gradient.color1}
                        color2={item.gradient.color2}
                        color3={item.gradient.color3}
                        destination="onCanvas"
                        embedMode="off"
                        envPreset="city"
                        format="gif"
                        fov={45}
                        frameRate={10}
                        gizmoHelper="hide"
                        grain="on"
                        lightType="3d"
                        loop="on"
                        loopDuration={10}
                        pixelDensity={1}
                        positionX={-1.4}
                        positionY={0}
                        positionZ={0}
                        range="enabled"
                        rangeEnd={10}
                        rangeStart={0}
                        reflection={0.1}
                        rotationX={0}
                        rotationY={10}
                        rotationZ={50}
                        shader="defaults"
                        toggleAxis={false}
                        type="plane"
                        uAmplitude={1}
                        uDensity={1.3}
                        uFrequency={5.5}
                        uSpeed={0.4}
                        uStrength={4}
                        uTime={0}
                        wireframe={false}
                        zoomOut={false}
                      />
                    </ShaderGradientCanvas>
                  </div>
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col border-b border-neutral-300">
            {sortedItems.map((item) => (
              <TechnicalReportListItem
                key={item.id}
                title={item.title}
                description={item.description}
                date={item.date}
                category={item.category}
                href={item.href}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
