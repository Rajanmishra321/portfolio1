import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeftIcon } from "@/components/Icons";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { profile } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${profile.name}`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4 transition group-hover:-translate-x-0.5" /> All posts
        </Link>

        {post.draft && (
          <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
            Draft — only visible in development. Review it, then set <code>draft: false</code> to publish.
          </p>
        )}

        <header data-reveal className="mt-8">
          <p className="font-mono text-sm text-muted">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t} className="rounded-md border border-border px-2 py-1 font-mono text-xs text-accent">
                {t}
              </li>
            ))}
          </ul>
        </header>

        <article data-reveal className="prose prose-lg mt-10 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        <div data-reveal className="mt-16 rounded-2xl border border-border bg-surface p-6">
          <p className="font-medium">Thanks for reading!</p>
          <p className="mt-1 text-muted">
            Want to work together or have a question?{" "}
            <Link href="/#contact" className="text-accent underline-offset-4 hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
