import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeftIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-6 pt-24">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <div data-reveal className="text-center">
          <p className="text-gradient text-8xl font-bold tracking-tighter sm:text-9xl">404</p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This page doesn&apos;t exist.</h1>
          <p className="mt-3 text-muted">It may have been moved, or the link might be wrong.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition hover:brightness-110"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back home
            </Link>
            <Link
              href="/#projects"
              className="rounded-full border border-border bg-surface px-6 py-3 font-medium transition hover:bg-surface-hover"
            >
              See projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
