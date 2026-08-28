import { useEffect } from "react";

export default function ModelViewer({ src, alt }) {
  useEffect(() => {
    // Dynamically import the @google/model-viewer web component
    import("@google/model-viewer").catch(() => {
      // package may not be installed; silently fail
    });
  }, []);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <model-viewer
      class="my-6 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800 w-full aspect-square"
      alt={alt}
      src={src}
      camera-controls
    />
  );
}
