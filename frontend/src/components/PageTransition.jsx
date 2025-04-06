import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Possible directions for transitions
const DIRECTIONS = ["left", "right", "top", "bottom"];

function PageTransition({ children }) {
  const location = useLocation();
  const [prevChildren, setPrevChildren] = useState(null);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [transitionPhase, setTransitionPhase] = useState("idle"); // idle, exiting, background, entering
  const [exitDirection, setExitDirection] = useState(null);
  const [enterDirection, setEnterDirection] = useState(null);
  const prevPathRef = useRef(location.pathname);

  // Function to get a random direction
  const getRandomDirection = () => {
    return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  };

  useEffect(() => {
    // Only start transition if the location has changed
    if (location.pathname !== prevPathRef.current) {
      // Set random directions for both exit and enter
      const newExitDirection = getRandomDirection();

      // Make sure enter direction is different from exit direction
      let newEnterDirection;
      do {
        newEnterDirection = getRandomDirection();
      } while (newEnterDirection === newExitDirection);

      setExitDirection(newExitDirection);
      setEnterDirection(newEnterDirection);

      // Phase 1: Start exit animation
      setPrevChildren(currentChildren);
      setTransitionPhase("exiting");

      // Phase 2: After exit completes, show only background
      const exitTimer = setTimeout(() => {
        setTransitionPhase("background");

        // Phase 3: After a brief pause, start enter animation
        const backgroundTimer = setTimeout(() => {
          setCurrentChildren(children);
          setTransitionPhase("entering");

          // Return to idle state after enter animation completes
          const enterTimer = setTimeout(() => {
            prevPathRef.current = location.pathname;
            setTransitionPhase("idle");
          }, 500); // Match with CSS duration

          return () => clearTimeout(enterTimer);
        }, 200); // Brief pause showing just background

        return () => clearTimeout(backgroundTimer);
      }, 500); // Exit duration

      return () => clearTimeout(exitTimer);
    } else {
      // Initial render or not a location change
      setCurrentChildren(children);
    }
  }, [location, children]);

  return (
    <div class="transition-container bg-gradient-animated">
      {/* Fixed background that's always visible */}
      <div class="fixed-background bg-gradient-animated"></div>

      {/* Exiting page */}
      {transitionPhase === "exiting" && prevChildren && (
        <div class={`transition-page exit-${exitDirection}`}>
          {prevChildren}
        </div>
      )}

      {/* Entering page - only shown during entering phase */}
      {(transitionPhase === "entering" || transitionPhase === "idle") && (
        <div
          class={
            transitionPhase === "entering"
              ? `transition-page enter-${enterDirection}`
              : "transition-page"
          }
        >
          {currentChildren}
        </div>
      )}
    </div>
  );
}

export default PageTransition;
