"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { currentlyLearning, skillGroups } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import SkillSphere from "./SkillSphere";

const ALL = "All";
const allSkills = skillGroups.flatMap((g) => g.items.map((item) => ({ item, group: g.name })));

export default function Skills() {
  const [filter, setFilter] = useState(ALL);
  const list = useRef<HTMLUListElement>(null);
  const selected = skillGroups.find((g) => g.name === filter);

  // Selected category's skills flip in, one by one, below the sphere.
  useGSAP(
    () => {
      if (!list.current?.children.length) return; // nothing selected ("All")
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("li", {
          opacity: 0,
          y: 30,
          z: -120,
          rotationX: -80,
          transformPerspective: 700,
          transformOrigin: "50% 100%",
          duration: 0.8,
          stagger: 0.04,
          ease: "expo.out",
          clearProps: "all",
        });
      });
    },
    { scope: list, dependencies: [filter] }
  );

  return (
    <section id="skills" data-depth-section className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10 sm:py-12">
      <SectionHeading eyebrow="Skills" title="My toolkit." />

      <div data-reveal className="flex flex-wrap gap-2" role="group" aria-label="Highlight a skill category">
        {[ALL, ...skillGroups.map((g) => g.name)].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setFilter(name)}
            aria-pressed={filter === name}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === name
                ? "bg-accent text-accent-fg"
                : "border border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div data-reveal>
        <SkillSphere skills={allSkills} highlight={selected ? selected.name : null} />
        <p className="-mt-4 text-center font-mono text-xs text-muted">
          <span className="hidden sm:inline">Move your mouse over the sphere or drag it to spin</span>
          <span className="sm:hidden">Swipe the sphere sideways to spin it</span> · pick a category to highlight it
        </p>
      </div>

      <ul ref={list} className="mt-8 flex min-h-12 flex-wrap justify-center gap-3" aria-live="polite">
        {selected &&
          selected.items.map((item) => (
            <li key={item}>
              <div className="rounded-xl border border-accent/40 bg-surface px-4 py-2.5 font-medium transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_24px_-4px_var(--glow-rgba)]">
                {item}
              </div>
            </li>
          ))}
      </ul>

      <p data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
          Currently learning
        </span>
        {currentlyLearning.map((s) => (
          <span key={s} className="rounded-full border border-dashed border-accent/50 px-3 py-1 text-foreground">
            {s}
          </span>
        ))}
      </p>
    </section>
  );
}
