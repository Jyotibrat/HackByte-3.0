export default function HighlightedSection({ children }) {
  return (
    <div className="rp-full-bleed py-8">
      <div className="mx-[var(--actual-inline-margin)] [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
