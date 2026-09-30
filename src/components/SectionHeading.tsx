export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p data-reveal className="font-mono text-sm tracking-widest text-accent uppercase">
        {eyebrow}
      </p>
      {/* Each word is its own 3D-flippable span (see ScrollReveal) */}
      <h2 data-words className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        {title.split(" ").map((word, i) => (
          <span key={i} data-word className="inline-block">
            {word}
            {" "}
          </span>
        ))}
      </h2>
    </div>
  );
}
