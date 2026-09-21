import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Lenis from "lenis";
import TechnicalReportCard from "../components/research/TechnicalReportCard";

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

  const isPublications = location.pathname === "/research/publications";
  const isArticles = location.pathname === "/research/articles";

  let cardTitle = `Upcoming ${title}`;
  let cardDate = "Coming Soon";
  let cardHref = "#";
  let gradientColor1 = "#ff5005";
  let gradientColor2 = "#dbba95";
  let gradientColor3 = "#d0bce1";

  if (isPublications) {
    cardTitle = "A State-of-Art Survey on Generative AI Techniques for Floor Planning";
    cardDate = "April 27, 2025";
    cardHref = "/research/publications/survey-paper-2025";
    gradientColor1 = "#96ffd7";
    gradientColor2 = "#dbd9c5";
    gradientColor3 = "#dce1a2";
  } else if (isArticles) {
    cardTitle = "Building an AI Floor Planner with Google Gemini and Matplotlib";
    cardDate = "Mar 4, 2026";
    cardHref = "https://dev.to/bindupautra_jyotibrat/building-an-ai-floor-planner-with-google-gemini-and-matplotlib-5c5d";
    gradientColor1 = "#6bb0ff";
    gradientColor2 = "#7adb53";
    gradientColor3 = "#a2e1c2";
  }

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
              <Link to="#" className="hover:text-black transition-colors">Company</Link>
              <Link to="/research/technical-reports" className="hover:text-black transition-colors text-black">Research</Link>
              <Link to="#" className="hover:text-black transition-colors">Product</Link>
              <Link to="#" className="hover:text-black transition-colors">Safety</Link>
              <Link to="#" className="hover:text-black transition-colors">Engineering</Link>
              <Link to="#" className="hover:text-black transition-colors">Security</Link>
              <Link to="#" className="hover:text-black transition-colors">Intelligence Age</Link>
              <Link to="#" className="hover:text-black transition-colors">Global Affairs</Link>
            </nav>

            <div className="flex items-center gap-6 text-sm text-black font-medium">
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                Filter
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>
                </svg>
              </button>
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                Sort
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div className="flex items-center gap-3 text-neutral-500">
                <button className="hover:text-black transition-colors text-black">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
                  </svg>
                </button>
                <button className="hover:text-black transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Reports Layout Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          
          {/* Placeholder Report 1 */}
          <TechnicalReportCard
            title={cardTitle}
            date={cardDate}
            category="Research"
            href={cardHref}
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
                    color1={gradientColor1}
                    color2={gradientColor2}
                    color3={gradientColor3}
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

        </div>
      </div>
    </main>
  );
}
