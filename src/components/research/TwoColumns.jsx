export default function TwoColumns({ left, right }) {
  return (
    <div className="flex w-full flex-wrap items-stretch gap-4">
      <div className="min-w-[16rem] flex-1 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {left}
      </div>
      <div className="min-w-[16rem] flex-1 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {right}
      </div>
    </div>
  );
}
