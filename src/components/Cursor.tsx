"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// A soft ring that trails the pointer and grows over interactive elements.
// Only on mouse/trackpad devices and when reduced motion is off.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    if (!matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      el.style.opacity = "1";
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as Element).closest("a, button, input, textarea, [data-cursor]");
      gsap.to(el, { scale: interactive ? 1.8 : 1, duration: 0.3 });
    };
    const onLeave = () => (el.style.opacity = "0");

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] -mt-4 -ml-4 h-8 w-8 rounded-full border border-accent/70 bg-accent/10 opacity-0 shadow-[0_0_18px_var(--glow-rgba)] transition-opacity duration-300"
    />
  );
}
