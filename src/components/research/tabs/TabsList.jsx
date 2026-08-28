export default function TabsList({ children, className = "" }) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={`mx-auto flex flex-wrap w-fit items-center justify-center gap-2 ${className}`}
    >
      {children}
    </div>
  );
}
