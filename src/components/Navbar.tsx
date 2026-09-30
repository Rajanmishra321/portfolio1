"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { getLenis } from "@/lib/lenis";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "./Icons";

const sections = ["about", "skills", "projects", "journey", "contact"];
const links = [
  ...sections.map((id) => ({ id, label: id, href: `/#${id}` })),
  { id: "blog", label: "blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const isActive = (id: string) => (id === "blog" ? pathname.startsWith("/blog") : pathname === "/" && active === id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the nav link for the section currently in view.
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // On the home page, glide to the section instead of jumping.
  const onNavClick = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    const lenis = getLenis();
    if (pathname !== "/" || !href.startsWith("/#") || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(href.slice(1), { offset: -80, duration: 1.4 });
    history.replaceState(null, "", href);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-border bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Main">
        <Link href="/" className="font-mono text-lg font-bold tracking-tight">
          {profile.firstName.toLowerCase()}
          <span className="text-accent">.</span>dev
        </Link>

        <ul className="hidden items-center gap-1 text-sm md:flex">
          {links.map(({ id, label, href }) => (
            <li key={id}>
              <Link
                href={href}
                onClick={(e) => onNavClick(e, href)}
                aria-current={isActive(id) ? "true" : undefined}
                className={`rounded-full px-4 py-2 capitalize transition ${
                  isActive(id) ? "bg-surface-hover text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-foreground sm:grid"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-foreground sm:grid"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border px-6 pb-8 md:hidden">
          <ul className="flex flex-col pt-4">
            {links.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  onClick={(e) => onNavClick(e, href)}
                  className="block border-b border-border py-4 text-lg capitalize"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-sm">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-sm">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
