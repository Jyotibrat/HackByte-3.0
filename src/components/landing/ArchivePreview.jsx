import { useEffect, useRef } from "react";
import gsap from "gsap";

function ArchivePreview() {
  const previewRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const preview = previewRef.current;

    const handleMove = (e) => {
      gsap.to(preview, {
        x: e.clientX + 180,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", handleMove);

    const show = (e) => {
      if (imgRef.current && e.detail?.src) imgRef.current.src = e.detail.src;
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.3 });
    };
    const hide = () => gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.25 });

    window.addEventListener("archivePreview:show", show);
    window.addEventListener("archivePreview:hide", hide);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("archivePreview:show", show);
      window.removeEventListener("archivePreview:hide", hide);
    };
  }, []);

  return (
    <div className="archive-preview" ref={previewRef}>
      <img ref={imgRef} src="" alt="" />
    </div>
  );
}

export default ArchivePreview;