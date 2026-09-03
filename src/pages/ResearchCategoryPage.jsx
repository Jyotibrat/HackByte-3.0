import { useLocation } from "react-router-dom";

function formatPathname(pathname) {
  // Extract the last segment of the path and format it
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return "Research";
  
  const lastPart = parts[parts.length - 1];
  return lastPart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ResearchCategoryPage() {
  const location = useLocation();
  const title = formatPathname(location.pathname);

  return (
    <section className="flanora-research-placeholder min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
          {location.pathname}
        </div>
        <h1 className="font-headline-lg text-4xl md:text-5xl text-ink-text dark:text-white">
          {title}
        </h1>
        <p className="font-martel text-stone-600 dark:text-neutral-400 text-lg">
          Detailed research content and documentation for this section is currently being synthesized. 
          Please check back later.
        </p>
      </div>
    </section>
  );
}
