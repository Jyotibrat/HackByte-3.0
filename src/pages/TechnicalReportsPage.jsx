import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import TechnicalReportCard from "../components/research/TechnicalReportCard";
import TechnicalReportListItem from "../components/research/TechnicalReportListItem";

import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

const REPORTS_DATA = [
  {
    id: "flanora-v2",
    title: "Introducing Flanora-v2: Multi-room Spatial Reasoning",
    date: "Sep 18, 2026",
    year: "2026",
    category: "Research",
    href: "/models/flanora-v2",
    description: "A detailed technical report on the architecture and capabilities of Flanora-v2, demonstrating its breakthrough performance in handling complex multi-room structural dependencies and real-time generation.",
    gradient: { color1: "#ff5005", color2: "#dbba95", color3: "#d0bce1" }
  },
  {
    id: "flanora-v1",
    title: "Flanora-v1: Foundational Floor-Plan Synthesis",
    date: "Sep 17, 2026",
    year: "2026",
    category: "Research",
    href: "/models/flanora-v1",
    description: "Our foundational research paper outlining the core generative principles and model architecture that paved the way for automated, single-room structural synthesis.",
    gradient: { color1: "#52ffcb", color2: "#db7bdb", color3: "#e19bdb" }
  }
];

export default function TechnicalReportsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedYear, setSelectedYear] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    document.title = "Flanora AI | Technical Reports";
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
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredReports = REPORTS_DATA.filter(report => 
    selectedYear === "All" ? true : report.year === selectedYear
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
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
            Technical Reports
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
        {sortedReports.length === 0 ? (
          <div className="py-24 text-center text-neutral-500">
            No technical reports found for {selectedYear}.
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {sortedReports.map((report) => (
              <TechnicalReportCard
                key={report.id}
                title={report.title}
                date={report.date}
                category={report.category}
                href={report.href}
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
                        color1={report.gradient.color1}
                        color2={report.gradient.color2}
                        color3={report.gradient.color3}
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
            {sortedReports.map((report) => (
              <TechnicalReportListItem
                key={report.id}
                title={report.title}
                description={report.description}
                date={report.date}
                category={report.category}
                href={report.href}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
