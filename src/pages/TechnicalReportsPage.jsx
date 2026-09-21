import { useEffect } from "react";
import Lenis from "lenis";
import TechnicalReportCard from "../components/research/TechnicalReportCard";

import flanoraV1Img from "../assets/models/flanora_v1.png";
import flanoraV2Img from "../assets/models/flanora_v2.png";

import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

export default function TechnicalReportsPage() {
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
              <a href="#" className="hover:text-black transition-colors">Company</a>
              <a href="#" className="hover:text-black transition-colors text-black">Research</a>
              <a href="#" className="hover:text-black transition-colors">Product</a>
              <a href="#" className="hover:text-black transition-colors">Safety</a>
              <a href="#" className="hover:text-black transition-colors">Engineering</a>
              <a href="#" className="hover:text-black transition-colors">Security</a>
              <a href="#" className="hover:text-black transition-colors">Intelligence Age</a>
              <a href="#" className="hover:text-black transition-colors">Global Affairs</a>
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

        {/* Reports Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          
          {/* Report 1 - Flanora v2 */}
          <TechnicalReportCard
            title="Introducing Flanora-v2: Multi-room Spatial Reasoning"
            date="Sep 18, 2026"
            category="Research"
            href="/models/flanora-v2"
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
                    color1="#ff5005"
                    color2="#dbba95"
                    color3="#d0bce1"
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

          {/* Report 2 - Flanora v1 */}
          <TechnicalReportCard
            title="Flanora-v1: Foundational Floor-Plan Synthesis"
            date="Sep 17, 2026"
            category="Research"
            href="/models/flanora-v1"
            customGraphic={
              <div className="absolute inset-0">
                <ShaderGradientCanvas
                  importedFiber={{ ...fiber, ...drei, ...reactSpring }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                >
                  <ShaderGradient
                    animate="on"
                    axesHelper="off"
                    brightness={1.5}
                    cAzimuthAngle={250}
                    cDistance={1.51}
                    cPolarAngle={140}
                    cameraZoom={12.48}
                    color1="#809bd6"
                    color2="#ff57f7"
                    color3="#9cfdff"
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
                    positionX={0}
                    positionY={0}
                    positionZ={0}
                    range="enabled"
                    rangeEnd={40}
                    rangeStart={0}
                    reflection={0.5}
                    rotationX={0}
                    rotationY={0}
                    rotationZ={140}
                    shader="defaults"
                    toggleAxis={false}
                    type="sphere"
                    uAmplitude={7}
                    uDensity={0.8}
                    uFrequency={5.5}
                    uSpeed={0.4}
                    uStrength={0.4}
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
