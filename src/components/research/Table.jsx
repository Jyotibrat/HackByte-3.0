export default function Table({ children }) {
  return (
    <div className="rp-full-bleed overflow-auto px-6">
      <table className="mx-auto w-auto">{children}</table>
    </div>
  );
}
