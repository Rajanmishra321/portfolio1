import Image from "next/image";
import Link from "next/link";
import { featuredProject, projects, type Project } from "@/data/portfolio";
import Carousel3D from "./Carousel3D";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "./Icons";

const btn = "inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-medium transition";
const primaryBtn = `${btn} bg-accent text-accent-fg hover:brightness-110`;
const outlineBtn = `${btn} border border-border hover:bg-surface-hover`;

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {p.caseStudy && p.slug && (
        <Link href={`/projects/${p.slug}`} className={`group ${primaryBtn}`}>
          Case study <ArrowRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </Link>
      )}
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${p.title} live site`}
          className={p.caseStudy ? outlineBtn : primaryBtn}
        >
          Live site <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
      )}
      {p.code && (
        <a href={p.code} target="_blank" rel="noreferrer" aria-label={`${p.title} source code`} className={outlineBtn}>
          <GitHubIcon className="h-3.5 w-3.5" /> Code
        </a>
      )}
      {!p.live && !p.code && <span className="font-mono text-xs text-muted">Private client project</span>}
    </div>
  );
}

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Preview({ p }: { p: Project }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent/25 via-accent-2/10 to-transparent">
      {p.image ? (
        <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover object-top" />
      ) : (
        <div className="grid h-full place-items-center">
          <span className="text-gradient text-3xl font-bold tracking-tight">{p.title}</span>
        </div>
      )}
    </div>
  );
}

// Each layer sits at a different depth (data-depth) so the card has real parallax as it turns.
function ProjectCard({ p, featured }: { p: Project; featured?: boolean }) {
  return (
    <TiltCard max={6} className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-accent/40">
      <div data-depth="3">
        <Preview p={p} />
      </div>
      <div data-depth="2">
        <p className="font-mono text-xs text-accent">
          {featured && "★ Featured · "}
          {p.tag}
        </p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight">{p.title}</h3>
      </div>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted">{p.description}</p>
      <Tech items={p.tech} />
      <div data-depth="2" className="mt-auto">
        <Links p={p} />
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const all = [featuredProject, ...projects];
  return (
    <Carousel3D
      labels={all.map((p) => p.title)}
      items={all.map((p, i) => <ProjectCard key={p.title} p={p} featured={i === 0} />)}
      header={<SectionHeading eyebrow="Projects" title="Things I've built." />}
      footer={
        <div className="mt-6 text-center">
          <a
            href="https://github.com/Rajanmishra321?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" /> See more on GitHub <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>
      }
    />
  );
}
