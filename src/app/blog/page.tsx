import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { formatDate, getAllPosts } from "@/lib/blog";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Blog | ${profile.name}`,
  description: "Notes on building web applications — architecture, tools, and lessons from real projects.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <p data-reveal className="font-mono text-sm tracking-widest text-accent uppercase">Blog</p>
        <h1 data-reveal className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Notes & lessons.</h1>
        <p data-reveal className="mt-4 text-lg text-muted">
          Writing about what I build — architecture decisions, tools, and lessons from real projects.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            First posts are coming soon.
          </p>
        ) : (
          <ul className="mt-12 space-y-4">
            {posts.map((p) => (
              <li key={p.slug} data-reveal>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
                >
                  <p className="font-mono text-xs text-muted">
                    {formatDate(p.date)} · {p.readingTime} min read
                    {p.draft && <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-500">Draft</span>}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold transition-colors group-hover:text-accent">{p.title}</h2>
                  <p className="mt-2 text-muted">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
