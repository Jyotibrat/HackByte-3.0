import { Link } from "react-router-dom";

export default function TechnicalReportListItem({
  title,
  description,
  date,
  category,
  href,
}) {
  const isExternal = href.startsWith('http');
  
  const content = (
    <article className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 border-t border-neutral-300 group">
      {/* Category & Date */}
      <div className="flex flex-col gap-2 md:col-span-1">
        <span className="font-semibold text-black text-sm">{category}</span>
        <span className="text-neutral-500 text-sm">{date}</span>
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-3 md:col-span-3">
        <h3 className="font-sans font-medium text-lg md:text-xl text-black group-hover:underline underline-offset-4 decoration-1">
          {title}
        </h3>
        {description && (
          <p className="text-neutral-600 text-sm leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full outline-none">
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className="block w-full outline-none">
      {content}
    </Link>
  );
}
