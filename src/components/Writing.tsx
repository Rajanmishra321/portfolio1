import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/blog";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { ArrowRightIcon } from "./Icons";

// Latest blog posts on the home page. Hidden until at least one post is published.
export default function Writing() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" data-depth-section className="mx-auto max-w-6xl scroll-mt-20 px-6 py-10 sm:py-12">
      <SectionHeading eyebrow="Writing" title="Notes from the build." />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <div key={p.slug} data-reveal>
            <TiltCard className="h-full rounded-2xl">
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <p className="font-mono text-xs text-muted">
                {formatDate(p.date)} · {p.readingTime} min read
              </p>
              <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-accent">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent">
                Read post <ArrowRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
            </TiltCard>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-8 text-center">
        <Link href="/blog" className="text-muted transition-colors hover:text-accent">
          View all posts →
        </Link>
      </div>
    </section>
  );
}
