import { useEffect } from "react";
import Lenis from "lenis";

function DonatePage() {
  useEffect(() => {
    document.title = "Flanora AI | Donate";
    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });

    let animationFrameId;
    const update = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>Donate</h1>
      <p style={{ maxWidth: '600px', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.8 }}>
        Support our mission to bridge artificial intelligence and architectural design.
        <br/><br/>
        (This is a placeholder page that will be redesigned later.)
      </p>
    </div>
  );
}

export default DonatePage;
