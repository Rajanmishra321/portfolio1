import Image from "next/image";
import { profile } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function About() {
  return (
    <section id="about" data-depth-section className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10 sm:py-12">
      <SectionHeading eyebrow="About" title="Code that solves real problems." />
      <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div data-reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div data-reveal>
          {profile.photo && (
            <TiltCard max={14} className="mx-auto w-full max-w-xs rounded-3xl">
              {/* 3D orbit rings circling the photo */}
              <div aria-hidden className="pointer-events-none absolute -inset-8">
                <span className="orbit" />
                <span className="orbit orbit-2" />
              </div>
              <div
                data-depth="3"
                className="glow-frame relative aspect-square w-full overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/25 to-accent-2/10"
              >
                <Image
                  src={profile.photo}
                  alt={`Photo of ${profile.name}`}
                  fill
                  sizes="320px"
                  className="object-cover object-[center_25%]"
                />
              </div>
            </TiltCard>
          )}
        </div>
      </div>
    </section>
  );
}
