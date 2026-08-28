export default function Video({
  src,
  controls = true,
  loop = true,
  playsInline = true,
  muted = true,
  autoPlay = true,
  ...rest
}) {
  return (
    <video
      className="aspect-video h-auto w-full rounded-lg"
      src={src}
      controls={controls}
      loop={loop}
      playsInline={playsInline}
      muted={muted}
      autoPlay={autoPlay}
      {...rest}
    />
  );
}
