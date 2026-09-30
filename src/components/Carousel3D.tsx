"use client";

import { useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getLenis } from "@/lib/lenis";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP = 38; // degrees between cards on the ring
const RADIUS = 720; // ring radius in px
const STAGE_HEIGHT = 600; // natural stage height in px, before scaling to fit the screen
const MIN_SCALE = 0.55;
const NAV_HEIGHT = 72; // fixed navbar overlapping the top of the pinned section
const CONTROLS_HEIGHT = 68; // arrows + dots row under the ring

// Cover-flow style 3D ring. On desktop the section pins and scrolling rotates the ring,
// snapping to each card. On small screens / reduced motion it falls back to a plain grid.
export default function Carousel3D({
  items,
  labels,
  header,
  footer,
}: {
  items: ReactNode[];
  labels: string[];
  header: ReactNode;
  footer: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scaler = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [is3d, setIs3d] = useState(false);
  const n = items.length;

  useGSAP(
    () => {
      // Screens shorter than 600px get the plain grid; everything else gets the ring, scaled to fit.
      gsap
        .matchMedia()
        .add(
          "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
          () => {
            const cards = gsap.utils.toArray<HTMLElement>(
              "[data-card]",
              ring.current,
            );
            stage.current!.classList.add("is-3d");
            setIs3d(true);

            // Shrink the whole ring so heading + ring + controls fit in the pinned viewport.
            // Runs before every ScrollTrigger refresh (including window resizes).
            const fit = () => {
              const others =
                NAV_HEIGHT +
                CONTROLS_HEIGHT +
                (headerRef.current?.offsetHeight ?? 0) +
                (footerRef.current?.offsetHeight ?? 0) +
                48;
              const scale = gsap.utils.clamp(
                MIN_SCALE,
                1,
                (window.innerHeight - others) / STAGE_HEIGHT,
              );
              stage.current!.style.height = `${STAGE_HEIGHT * scale}px`;
              scaler.current!.style.transform = `scale(${scale})`;
            };
            fit();
            ScrollTrigger.addEventListener("refreshInit", fit);

            cards.forEach((card, i) => {
              card.style.transform = `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`;
            });

            // Fade / disable cards as they rotate away from the front.
            const shade = (rotation: number) => {
              cards.forEach((card, i) => {
                const angle = Math.abs(i * STEP + rotation);
                card.style.opacity = String(
                  gsap.utils.clamp(0.15, 1, 1 - angle / 110),
                );
                card.style.pointerEvents = angle < STEP / 2 ? "auto" : "none";
              });
              const index = Math.round(-rotation / STEP);
              if (index !== activeRef.current) {
                activeRef.current = index;
                setActive(index);
              }
            };

            gsap.set(ring.current, { z: -RADIUS, rotationY: 0 });
            shade(0);

            const tween = gsap.to(ring.current, {
              rotationY: -(n - 1) * STEP,
              ease: "none",
              onUpdate: () =>
                shade(gsap.getProperty(ring.current, "rotationY") as number),
              scrollTrigger: {
                trigger: section.current,
                pin: true,
                start: "top top",
                end: `+=${(n - 1) * 75}%`,
                scrub: 1,
                snap: {
                  snapTo: 1 / (n - 1),
                  duration: { min: 0.3, max: 0.8 },
                  ease: "power2.inOut",
                },
              },
            });
            trigger.current = tween.scrollTrigger ?? null;

            return () => {
              ScrollTrigger.removeEventListener("refreshInit", fit);
              stage.current?.classList.remove("is-3d");
              if (stage.current) stage.current.style.height = "";
              if (scaler.current) scaler.current.style.transform = "";
              cards.forEach((card) => {
                card.style.transform = "";
                card.style.opacity = "";
                card.style.pointerEvents = "";
              });
              trigger.current = null;
              setIs3d(false);
            };
          },
        );
    },
    { scope: section },
  );

  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const index = gsap.utils.clamp(0, n - 1, i);
    const y = st.start + ((st.end - st.start) * index) / (n - 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={section}
      id="projects"
      className="relative flex min-h-svh scroll-mt-20 flex-col justify-center overflow-hidden px-6 py-10 sm:py-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div ref={headerRef}>{header}</div>
        <div ref={stage} data-reveal className="carousel-stage">
          <div ref={scaler} className="carousel-scaler">
            <div ref={ring} className="carousel-ring">
              {items.map((item, i) => (
                // Keyboard users: focusing a card rotates it to the front.
                <div
                  key={labels[i]}
                  data-card
                  onFocusCapture={() => is3d && goTo(i)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {is3d && (
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous project"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface transition hover:border-accent/60 disabled:opacity-30"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {labels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${label}`}
                  aria-current={i === active ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === n - 1}
              aria-label="Next project"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface transition hover:border-accent/60 disabled:opacity-30"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        <div ref={footerRef}>{footer}</div>
      </div>
    </section>
  );
}
