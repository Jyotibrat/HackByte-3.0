export default function Wide({ children }) {
  return (
    <div
      className="mx-[calc(max(var(--minimum-inline-margin),(100cqw-100rem)/2)-var(--actual-inline-margin))]"
    >
      {children}
    </div>
  );
}
