"use client";

import { useEffect, useMemo, useRef } from "react";

type Skill = { item: string; group: string };

// Evenly spread unit vectors on a sphere.
function fibonacciPoints(count: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    return { x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
  });
}

// A rotating 3D sphere of skill tags. Spins toward the mouse, can be dragged (mouse or touch),
// and highlights the skills in the selected category.
export default function SkillSphere({ skills, highlight }: { skills: Skill[]; highlight: string | null }) {
  const container = useRef<HTMLUListElement>(null);
  const tags = useRef<(HTMLLIElement | null)[]>([]);
  const highlightRef = useRef(highlight);
  const points = useMemo(() => fibonacciPoints(skills.length), [skills.length]);

  useEffect(() => {
    highlightRef.current = highlight;
  }, [highlight]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const idle = reduced ? { x: 0, y: 0 } : { x: 0.0012, y: 0.0035 };
    const rot = { x: -0.3, y: 0 };
    const vel = { ...idle };
    let target: { x: number; y: number } | null = null;
    let drag: { x: number; y: number } | null = null;
    let visible = true;
    let frame = 0;
    let last = performance.now();
    // Cached so the animation loop never reads layout (avoids forced reflows).
    let radius = 0;
    const measure = () => (radius = Math.min(el.clientWidth * 0.4, 250));
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);

    const render = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const goal = drag ? vel : target ?? idle;
      vel.x += (goal.x - vel.x) * 0.06;
      vel.y += (goal.y - vel.y) * 0.06;
      rot.x += vel.x * dt;
      rot.y += vel.y * dt;

      const [sx, cx, sy, cy] = [Math.sin(rot.x), Math.cos(rot.x), Math.sin(rot.y), Math.cos(rot.y)];
      const hl = highlightRef.current;

      points.forEach((p, i) => {
        const tag = tags.current[i];
        if (!tag) return;
        // Rotate around Y, then X.
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx; // -1 (back) .. 1 (front)
        const depth = (z2 + 1) / 2;
        const scale = 0.55 + depth * 0.65;
        const dim = hl && skills[i].group !== hl ? 0.25 : 1;
        tag.style.transform = `translate3d(${x1 * radius}px, ${y2 * radius}px, 0) translate(-50%, -50%) scale(${scale})`;
        tag.style.opacity = String((0.2 + depth * 0.8) * dim);
        tag.style.zIndex = String(Math.round(depth * 100));
      });
      if (visible) frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
      }
    });
    observer.observe(el);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (drag) {
        vel.y = (e.clientX - drag.x) * 0.004;
        vel.x = -(e.clientY - drag.y) * 0.004;
        drag = { x: e.clientX, y: e.clientY };
      } else if (e.pointerType === "mouse" && !reduced) {
        target = { x: -py * 0.03, y: px * 0.03 };
      }
    };
    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => (drag = null);
    const onLeave = () => (target = null);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [points, skills]);

  return (
    <ul
      ref={container}
      aria-label="Skills"
      className="relative mx-auto h-[420px] w-full max-w-2xl cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[560px]"
    >
      {/* Glowing core behind the tags */}
      <li aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      {skills.map((s, i) => {
        const on = highlight !== null && s.group === highlight;
        return (
          <li
            key={s.item}
            ref={(node) => {
              tags.current[i] = node;
            }}
            className="absolute top-1/2 left-1/2 will-change-transform"
          >
            <span
              className={`block rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                on
                  ? "border-accent bg-accent text-accent-fg shadow-[0_0_24px_var(--glow-rgba)]"
                  : "border-border bg-surface text-foreground"
              }`}
            >
              {s.item}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
