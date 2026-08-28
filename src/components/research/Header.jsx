import { Icon } from "@iconify/react";

export default function Header({ title, authors = [], conference, notes, links, background }) {
  const hasBackground = Boolean(background);

  return (
    <header
      className={[
        "rp-full-bleed relative mb-12",
        hasBackground ? "-mt-16 pt-24 pb-28" : "",
      ].join(" ")}
    >
      {/* Background image/video */}
      {hasBackground && (
        <div className="cover absolute inset-0 z-0 overflow-hidden">
          {background}
          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-black/40" />
          <style>{`
            .cover :is(img, video) {
              position: absolute;
              inset: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              max-width: none;
              max-height: none;
              object-fit: cover;
              border-radius: 0;
            }
          `}</style>
        </div>
      )}

      {/* Content */}
      <div
        className={[
          "relative z-10 mx-auto flex max-w-[50rem] flex-col items-center px-6 text-center",
          hasBackground
            ? "gap-10 text-white [text-shadow:0_0_8px_rgba(0,0,0,0.6)]"
            : "gap-6",
        ].join(" ")}
      >
        {/* Title */}
        <h1 className="my-0 text-5xl font-medium">{title}</h1>

        {/* Authors */}
        <div className="flex flex-row flex-wrap justify-center gap-x-8 gap-y-4">
          {authors.map((author, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="flex flex-row text-xl">
                {author.url ? (
                  <a
                    href={author.url}
                    className={
                      hasBackground
                        ? "not-prose text-blue-200 hover:text-blue-100 underline decoration-dashed underline-offset-4 hover:decoration-solid"
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author.name}
                  </a>
                ) : (
                  author.name
                )}
                {author.notes && (
                  <sup className="text-xl">
                    {author.notes.map((n, ni, arr) => n + (ni < arr.length - 1 ? "," : ""))}
                  </sup>
                )}
              </div>
              {author.institution && <div>{author.institution}</div>}
            </div>
          ))}
        </div>

        {/* Conference */}
        {conference && <div>{conference}</div>}

        {/* Notes */}
        {notes && (
          <div className="text-center text-sm">
            {notes.map((note, i, arr) => (
              <span key={i}>
                <sup>{note.symbol}</sup>
                {note.text}
                {i < arr.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {links && (
          <div className="not-prose flex flex-row flex-wrap justify-center gap-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className={[
                  "flex flex-row items-center gap-2 rounded-full px-5 py-2 text-lg hover:no-underline",
                  hasBackground
                    ? "bg-white hover:bg-zinc-200 text-zinc-800 shadow-[0_0_8px_rgba(0,0,0,0.6)]"
                    : "bg-zinc-800 text-white hover:bg-black dark:text-zinc-900 dark:hover:bg-zinc-50 dark:bg-zinc-200",
                ].join(" ")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon && <Icon icon={link.icon} className="text-xl" />}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
