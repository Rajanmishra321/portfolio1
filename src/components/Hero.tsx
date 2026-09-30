"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { highlights, profile } from "@/data/portfolio";
import { useThreeReady } from "@/lib/three-gate";
import GlobePlaceholder from "./GlobePlaceholder";
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const threeReady = useThreeReady();
  const [sceneLive, setSceneLive] = useState(false);

  useEffect(() => {
    // Stop rendering the 3D scene when the hero is scrolled out of view.
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // The headline is the page's largest element (LCP), so it is painted in place and never
        // animated on load — resizing it would push LCP back. Everything else flips in around it.
        gsap.from("[data-hero]:not(h1)", {
          y: 40,
          rotationX: -50,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        });
        gsap.from("[data-hero-scene]", { opacity: 0, scale: 0.92, duration: 1.6, ease: "power2.out" });
        // Text layer leans toward the mouse, opposite the globe, for depth.
        const rx = gsap.quickTo(content.current, "rotationX", { duration: 1, ease: "power3.out" });
        const ry = gsap.quickTo(content.current, "rotationY", { duration: 1, ease: "power3.out" });
        gsap.set(content.current, { transformPerspective: 1200 });
        const onMove = (e: PointerEvent) => {
          ry((e.clientX / innerWidth - 0.5) * 10);
          rx(-(e.clientY / innerHeight - 0.5) * 8);
        };
        window.addEventListener("pointermove", onMove);

        gsap.from("[data-count]", {
          textContent: 0,
          snap: { textContent: 1 },
          duration: 1.8,
          ease: "power2.out",
          delay: 0.7,
          stagger: 0.15,
        });

        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="home" className="relative flex min-h-[85svh] items-center overflow-hidden pt-24 pb-12">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-20" />
      <div data-hero-scene className="absolute inset-0 -z-10 opacity-45 md:opacity-100">
        <GlobePlaceholder hidden={sceneLive} />
        {threeReady && <Scene active={inView} onReady={() => setSceneLive(true)} />}
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div ref={content} className="max-w-2xl [transform-style:preserve-3d]">
          <p
            data-hero
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
          </p>
          <h1 data-hero className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            <span className="text-extrude">{profile.name}</span>
            <span className="mt-2 block text-gradient">{profile.role}</span>
          </h1>
          <p data-hero className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.tagline}
          </p>

          <div data-hero className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition hover:brightness-110"
            >
              View my work
              <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-medium backdrop-blur transition hover:bg-surface-hover"
            >
              <DownloadIcon className="h-4 w-4" />
              Resume
            </a>
          </div>

          <div data-hero className="mt-8 flex items-center gap-5 text-sm text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-foreground">
              <GitHubIcon className="h-5 w-5" /> GitHub
            </a>
            <span className="h-4 w-px bg-border" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-foreground">
              <LinkedInIcon className="h-5 w-5" /> LinkedIn
            </a>
          </div>

          <dl data-hero className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-muted">{h.label}</dt>
                <dd data-count className="text-gradient text-4xl font-bold tabular-nums sm:text-5xl">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs text-muted sm:flex"
      >
        scroll
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </a>
    </section>
  );
}
