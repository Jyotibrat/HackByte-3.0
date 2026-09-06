import React, { Suspense, lazy } from "react";

const LazyInfiniteCanvasScene = lazy(() =>
  import("./CanvasScene.jsx").then((mod) => ({ default: mod.InfiniteCanvasScene }))
);

export function InfiniteCanvas(props) {
  return (
    <Suspense fallback={null}>
      <LazyInfiniteCanvasScene {...props} />
    </Suspense>
  );
}
