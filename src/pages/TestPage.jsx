import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Use import.meta.glob to dynamically get all frame URLs handled by Vite
const frameModules = import.meta.glob('../assets/test/bg_video_frames/*.jpg', { eager: true, query: '?url', import: 'default' });
const frameUrls = Object.keys(frameModules)
  .sort((a, b) => {
    // Extract the numbers from ezgif-frame-XXX.jpg to sort correctly
    const numA = parseInt(a.match(/(\d+)\.jpg$/)[1], 10);
    const numB = parseInt(b.match(/(\d+)\.jpg$/)[1], 10);
    return numA - numB;
  })
  .map((key) => frameModules[key]);

const TestPage = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Configuration
    const frameCount = frameUrls.length;
    const airpods = { frame: 0 };

    // Function to render the image properly scaled and centered (Cover style)
    const render = () => {
      if (!imagesRef.current[airpods.frame]) return;
      const img = imagesRef.current[airpods.frame];

      // Reset canvas size to match the window for full bleed
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;

      // Calculate scale to "cover" the canvas
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;

      // Center the image
      const x = cw / 2 - sw / 2;
      const y = ch / 2 - sh / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, sw, sh);
    };

    // Preload images sequentially to not choke the browser, 
    // but in batches or just normally. For simplicity, just standard Image objects.
    let loaded = 0;
    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsFullyLoaded(true);
          // Initial render once the first frame (or all) is loaded
          airpods.frame = 0;
          render();
        }
      };
      imagesRef.current[i] = img;
    });

    // Handle resize
    window.addEventListener('resize', render);

    // Setup GSAP ScrollTrigger
    const scrollAnimation = gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: `+=${frameCount * 20}`, // 20px of scroll per frame
        scrub: 0.5, // Smooth scrubbing
        onUpdate: () => render(), // Draw on canvas on every update
      }
    });

    return () => {
      window.removeEventListener('resize', render);
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Loading overlay gracefully hides once all frames are ready */}
      {!isFullyLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="text-2xl font-bold mb-4">Loading Experience...</div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${(loadedCount / frameUrls.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            {loadedCount} / {frameUrls.length} frames
          </div>
        </div>
      )}

      {/* The scroll-linked canvas container */}
      <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Optional overlay text that stays pinned over the canvas */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
            Flanora
          </h1>
          <p className="text-xl md:text-3xl font-light text-gray-300 drop-shadow-lg">
            Scroll to explore
          </p>
        </div>
      </div>

      {/* spacer to show we can continue scrolling after the pin */}
      <div className="h-screen bg-neutral-900 flex items-center justify-center">
        <h2 className="text-3xl font-light">The End of the Sequence</h2>
      </div>
    </div>
  );
};

export default TestPage;
