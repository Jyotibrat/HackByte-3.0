import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState("visible");
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setPhase("fading-out");

      const fadeOutTimer = setTimeout(() => {
        setDisplayChildren(children);
        prevPathRef.current = location.pathname;
        setPhase("fading-in");

        const fadeInTimer = setTimeout(() => {
          setPhase("visible");
        }, 300);

        return () => clearTimeout(fadeInTimer);
      }, 200);

      return () => clearTimeout(fadeOutTimer);
    } else {
      setDisplayChildren(children);
    }
  }, [location, children]);

  return (
    <div
      className={`transition-page-fade ${
        phase === "fading-out"
          ? "opacity-0"
          : phase === "fading-in"
            ? "opacity-100 animate-fade-in"
            : "opacity-100"
      }`}
    >
      {displayChildren}
    </div>
  );
}

export default PageTransition;
