import React, { useEffect, useRef } from "react";

export default function DonateHero() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const INK = "rgba(23,19,12,";
    const ACCENT = "rgba(163,72,26,";
    const SPACING = 13, STEP = 9, SIGMA = 95, PUSH = 30;

    let W = 0, H = 0, T = 0, cols = [], ripples = [];
    let raf = null, running = true;
    const mouse = { x: -9999, y: -9999, in: false };
    
    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    running = !prefersReduced;

    function resize() {
      if (!wrap || !canvas) return;
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = [];
      for (let x = SPACING; x < W - SPACING * 0.5; x += SPACING) {
        cols.push(x);
      }
      if (prefersReduced) draw();
    }

    function disp(x, y) {
      let dx =
        Math.sin(y * 0.012 + T * 0.9 + x * 0.013) * 2.4 +
        Math.sin(T * 0.35 + x * 0.03) * 1.6;
      if (mouse.in) {
        const mx = x - mouse.x,
          my = y - mouse.y;
        const d2 = mx * mx + my * my;
        const d = Math.sqrt(d2) || 1;
        dx += (mx / d) * Math.exp(-d2 / (2 * SIGMA * SIGMA)) * PUSH;
      }
      for (const rp of ripples) {
        const rx = x - rp.x,
          ry = y - rp.y;
        const d = Math.sqrt(rx * rx + ry * ry) || 1;
        const R = rp.age * 340;
        const band = Math.exp(-((d - R) * (d - R)) / (2 * 20 * 20));
        dx += (rx / d) * band * 22 * Math.exp(-rp.age * 1.6);
      }
      return dx;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      let near = -1;
      if (mouse.in) {
        let best = SPACING * 0.75;
        for (let i = 0; i < cols.length; i++) {
          const dd = Math.abs(cols[i] - mouse.x);
          if (dd < best) {
            best = dd;
            near = i;
          }
        }
      }
      for (let i = 0; i < cols.length; i++) {
        const x0 = cols[i];
        ctx.beginPath();
        for (let y = 0; y <= H; y += STEP) {
          const x = x0 + disp(x0, y);
          y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        if (i === near) {
          ctx.strokeStyle = ACCENT + "0.9)";
          ctx.lineWidth = 1.4;
        } else {
          ctx.strokeStyle = INK + (0.13 + 0.05 * Math.sin(T + i * 0.6)).toFixed(3) + ")";
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }
    }

    function loop() {
      if (!running) return;
      T += 0.016;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += 0.016;
        if (ripples[i].age > 2.4) ripples.splice(i, 1);
      }
      draw();
      raf = requestAnimationFrame(loop);
    }

    let resizeObserver = null;
    let intersectionObserver = null;

    resize();
    if (prefersReduced) {
      T = 4;
      draw();
    } else {
      loop();
      
      const handlePointerMove = (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.in = true;
      };
      
      const handlePointerLeave = () => {
        mouse.in = false;
        mouse.x = -9999;
      };
      
      const handlePointerDown = (e) => {
        const r = canvas.getBoundingClientRect();
        ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, age: 0 });
        if (ripples.length > 6) ripples.shift();
      };
      
      wrap.addEventListener("pointermove", handlePointerMove);
      wrap.addEventListener("pointerleave", handlePointerLeave);
      wrap.addEventListener("pointerdown", handlePointerDown);

      intersectionObserver = new IntersectionObserver(([en]) => {
        const was = running;
        running = en.isIntersecting && !document.hidden;
        if (running && !was) loop();
        if (!running && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
      intersectionObserver.observe(wrap);
      
      const handleVisChange = () => {
        if (document.hidden && raf) {
          cancelAnimationFrame(raf);
          raf = null;
          running = false;
        } else if (!document.hidden && !raf) {
          running = true;
          loop();
        }
      };
      document.addEventListener("visibilitychange", handleVisChange);
      
      // Cleanup events
      wrap._cleanupEvents = () => {
        wrap.removeEventListener("pointermove", handlePointerMove);
        wrap.removeEventListener("pointerleave", handlePointerLeave);
        wrap.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("visibilitychange", handleVisChange);
      };
    }
    
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      if (wrap._cleanupEvents) wrap._cleanupEvents();
    };
  }, []);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow mono">Support Flanora AI — /donate</p>

            <h1 className="hero-title" id="hero-title">
              <span className="line">
                <span className="line-inner">Keep Flanora</span>
              </span>
              <span className="line">
                <span className="line-inner">
                  <em>independent</em>
                  <span className="dot">.</span>
                </span>
              </span>
            </h1>

            <p className="hero-lede">
              Flanora AI is built and operated by a small independent team. A
              contribution goes <strong>directly into the work</strong> — the
              models, the research, and the infrastructure behind every request.
            </p>

            <div className="hero-meta">
              <div>
                <span className="hm-label">Flow</span>
                <span className="hm-value">Direct to product</span>
              </div>
              <div>
                <span className="hm-label">Model</span>
                <span className="hm-value">User-sustained</span>
              </div>
              <div>
                <span className="hm-label">Roadmap</span>
                <span className="hm-value">Independent</span>
              </div>
            </div>
          </div>

          <div className="hero-field" aria-hidden="true" ref={wrapRef}>
            <canvas id="field" ref={canvasRef}></canvas>
            <span className="field-fig">Fig. 01 — Response field</span>
            <span className="field-hint">Move · Click — the field responds</span>
          </div>
        </div>

        <div className="hero-foot">
          <div className="hero-foot-inner">
            <span className="scroll-cue">
              <span className="cue" aria-hidden="true"></span>Scroll
            </span>
            <span>Flanora AI — Sustain the build</span>
          </div>
        </div>
      </section>

      {/* Rhythm band / Ticker */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <div className="tk-group">
            <span className="tk-item">Inference &amp; Infrastructure</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Model Development</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Datasets &amp; Research</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Hosting &amp; Product</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Future Releases</span>
            <span className="tk-sep"></span>
          </div>
          {/* Duplicated for seamless marquee */}
          <div className="tk-group" aria-hidden="true">
            <span className="tk-item">Inference &amp; Infrastructure</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Model Development</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Datasets &amp; Research</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Hosting &amp; Product</span>
            <span className="tk-sep"></span>
            <span className="tk-item">Future Releases</span>
            <span className="tk-sep"></span>
          </div>
        </div>
      </div>
    </>
  );
}
