export default function Picture({ src, alt, priority = false, invertInDarkMode = false }) {
  return (
    <img
      className={`rounded-lg max-h-[calc(100svh-3rem)] max-w-full w-min mx-auto${
        invertInDarkMode ? " dark:invert" : ""
      }`}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
