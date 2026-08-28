export default function CarouselSlide({ children, dataIndex }) {
  return (
    <div
      className="slide-viewport snap-start px-[calc(var(--slide-gap)/2)]"
      data-index={dataIndex}
    >
      <div className="slide w-[var(--actual-text-width)] [&>*]:my-0">
        {children}
      </div>
    </div>
  );
}
