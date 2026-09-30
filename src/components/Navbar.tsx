"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const closeButton = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const isActive = (id: string) =>
    id === "blog"
      ? pathname.startsWith("/blog")
      : pathname === "/" && active === id;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the nav link for the section currently in view.
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
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
    lenis.start(); // paused while the drawer is open
    lenis.scrollTo(href.slice(1), { offset: -80, duration: 1.4 });
    history.replaceState(null, "", href);
  };

  // While the drawer is open: Escape closes it, the page behind can't scroll, focus moves inside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : ""
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
          aria-label="Main"
        >
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
                    isActive(id)
                      ? "bg-surface-hover text-foreground"
                      : "text-muted hover:text-foreground"
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
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer: slides in from the left over a dimmed backdrop. Rendered outside <header>
        because the header's backdrop blur would otherwise trap this fixed panel inside it. */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!open}
          className={`absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col border-r border-border bg-background shadow-[0_0_60px_-10px_var(--glow-rgba)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <span className="font-mono text-lg font-bold tracking-tight">
              {profile.firstName.toLowerCase()}
              <span className="text-accent">.</span>dev
            </span>
            <button
              ref={closeButton}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto px-6 py-2">
            {links.map(({ id, label, href }, i) => (
              <li
                key={id}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                className={`transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              >
                <Link
                  href={href}
                  onClick={(e) => onNavClick(e, href)}
                  aria-current={isActive(id) ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-border py-4 text-lg capitalize ${
                    isActive(id) ? "text-accent" : ""
                  }`}
                >
                  {label}
                  <span aria-hidden className="text-muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 border-t border-border p-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-sm"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-sm"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
