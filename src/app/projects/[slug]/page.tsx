import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/Icons";
import { caseStudies, profile } from "@/data/portfolio";

// Only the case studies defined in portfolio.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — Case Study | ${profile.name}`;
  return {
    title,
    description: project.caseStudy.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title, description: project.caseStudy.summary, url: `/projects/${slug}` },
  };
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="border-t border-border pt-10">
      <p className="font-mono text-sm text-accent">{n}</p>
      <h2 className="mt-2 mb-5 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = caseStudies.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = caseStudies[index];
  const cs = project.caseStudy;
  const next = caseStudies[(index + 1) % caseStudies.length];

  const facts = [
    { label: "Role", value: cs.role },
    ...(cs.period ? [{ label: "Year", value: cs.period }] : []),
    { label: "Client", value: project.tag?.replace(/^Client project · /, "") ?? "—" },
    { label: "Status", value: cs.status },
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4 transition group-hover:-translate-x-0.5" /> All projects
        </Link>

        <header data-reveal className="mt-8 max-w-3xl">
          <p className="font-mono text-sm tracking-widest text-accent uppercase">Case study</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">{project.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{cs.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg transition hover:brightness-110"
              >
                Visit live site <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            )}
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 font-medium transition hover:bg-surface-hover"
              >
                <GitHubIcon className="h-4 w-4" /> Source code
              </a>
            )}
            {!project.live && !project.code && (
              <span className="rounded-full border border-border px-4 py-2 font-mono text-xs text-muted">
                Private client project
              </span>
            )}
          </div>
        </header>

        <dl data-reveal className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-background p-5">
              <dt className="font-mono text-xs text-muted uppercase">{f.label}</dt>
              <dd className="mt-1 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>

        {project.image && (
          <div data-unfold className="glow-frame relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-accent/30">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-12">
            <Section n="01" title="The problem">
              <p className="text-lg leading-relaxed text-muted">{cs.problem}</p>
            </Section>

            <Section n="02" title="My role">
              <p className="text-lg leading-relaxed text-muted">{cs.roleDetail}</p>
              <ul className="mt-6 space-y-3">
                {cs.contributions.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-0.5 text-accent">▹</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section n="03" title="Challenges">
              <ul className="grid gap-3 sm:grid-cols-2">
                {cs.challenges.map((c, i) => (
                  <li key={c} className="rounded-xl border border-border bg-surface p-4">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-1">{c}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section n="04" title="Results">
              <p className="text-lg leading-relaxed text-muted">{cs.results}</p>
            </Section>

            {cs.modules && (
              <Section n="05" title="Modules">
                <ul className="flex flex-wrap gap-2">
                  {cs.modules.map((m) => (
                    <li key={m} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                      {m}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-mono text-xs text-muted uppercase">Tech stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cs.stack.map((t) => (
                  <li key={t} className="rounded-md border border-border px-2 py-1 font-mono text-xs">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {next.slug !== project.slug && (
          <Link
            href={`/projects/${next.slug}`}
            data-reveal
            className="group mt-20 flex items-center justify-between gap-6 rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent/40"
          >
            <div>
              <p className="font-mono text-xs tracking-widest text-muted uppercase">Next case study</p>
              <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl group-hover:text-accent">{next.title}</p>
            </div>
            <ArrowRightIcon className="h-8 w-8 shrink-0 text-accent transition group-hover:translate-x-1" />
          </Link>
        )}
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
