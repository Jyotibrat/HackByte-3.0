import { Link } from "react-router-dom";

export default function TechnicalReportCard({
  title,
  date,
  category,
  href,
  imageSrc,
  customGraphic,
  aspect = "aspect-square",
}) {
  return (
    <Link to={href} className="group block w-full outline-none">
      <article className="flex flex-col gap-4">
        {/* Image Container */}
        <div
          className={`w-full overflow-hidden rounded-md bg-stone-900 ${aspect} relative isolate [transform:translateZ(0)]`}
        >
          {customGraphic ? (
            customGraphic
          ) : (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Metadata & Text Content */}
        <div className="flex flex-col gap-1">
          <h3 className="font-sans font-medium text-lg md:text-xl text-black group-hover:underline underline-offset-4 decoration-1">
            {title}
          </h3>
          <div className="flex items-center gap-3 mt-1 font-sans text-xs md:text-sm">
            <span className="font-semibold text-black">{category}</span>
            <span className="text-neutral-500">{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
