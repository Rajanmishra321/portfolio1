import { certifications, journey } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function Journey() {
  return (
    <section id="journey" data-depth-section className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10 sm:py-12">
      <SectionHeading eyebrow="Journey" title="Experience, education & certifications." />

      {/* Zig-zag timeline: the glowing line draws itself as you scroll (data-line) */}
      <ol className="relative">
        <span aria-hidden className="absolute top-0 bottom-0 left-2 w-px bg-border md:left-1/2" />
        <span
          aria-hidden
          data-line
          className="absolute top-0 bottom-0 left-2 w-0.5 -translate-x-[0.5px] bg-gradient-to-b from-accent via-accent-2 to-accent shadow-[0_0_12px_var(--glow-rgba)] md:left-1/2"
        />
        {journey.map((j, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={j.title}
              data-reveal={right ? "right" : "left"}
              className={`relative mb-8 pl-10 md:w-1/2 md:pl-0 ${right ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
            >
              <span
                className={`absolute top-7 left-[3px] h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-background ${
                  right ? "md:-left-[7px]" : "md:right-[-7px] md:left-auto"
                }`}
              />
              <TiltCard max={8} className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/40">
                <div data-depth="2" className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">{j.kind}</span>
                  {j.period && <span className="font-mono text-xs text-muted">{j.period}</span>}
                </div>
                <h3 data-depth="2" className="mt-3 text-xl font-semibold">
                  {j.title} <span className="text-muted">· {j.place}</span>
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{j.detail}</p>
              </TiltCard>
            </li>
          );
        })}
      </ol>

      <h3 data-reveal className="mt-12 mb-6 text-2xl font-bold tracking-tight">Certifications</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <li key={c.title} data-reveal>
            <TiltCard max={12} className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 hover:border-accent/40">
              <span data-depth="2" className="font-mono text-xs text-accent">
                {c.issuer} · {c.year}
              </span>
              <span data-depth="3" className="mt-2 text-lg font-semibold">
                {c.title}
              </span>
            </TiltCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
