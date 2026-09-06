import * as React from "react";

const getIsTouchDevice = () => {
  const hasTouchEvent = "ontouchstart" in window;
  const hasTouchPoints = navigator.maxTouchPoints > 0;
  const hasCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

  return hasTouchEvent || hasTouchPoints || hasCoarsePointer;
};

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = React.useState(() => getIsTouchDevice());

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleChange = () => {
      setIsTouchDevice(getIsTouchDevice());
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isTouchDevice;
}
