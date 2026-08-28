export default function Figure({ figure, caption }) {
  return (
    <figure>
      <div className="flex w-full justify-center [&>*]:my-0">{figure}</div>
      <figcaption className="text-center">{caption}</figcaption>
    </figure>
  );
}
