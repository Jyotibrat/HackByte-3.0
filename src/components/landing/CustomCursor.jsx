import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    const handleMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    const tick = () => {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      gsap.set(cursor, { x: cx, y: cy });
    };
    gsap.ticker.add(tick);

    const show = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25 });
    const hide = () => gsap.to(cursor, { opacity: 0, scale: 0.7, duration: 0.25 });
    window.addEventListener("cursor:show", show);
    window.addEventListener("cursor:hide", hide);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("cursor:show", show);
      window.removeEventListener("cursor:hide", hide);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="cursor-label" ref={cursorRef}>
      View
      <br />
      Case ↗
    </div>
  );
}

export default CustomCursor;