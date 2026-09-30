"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

// Card that tilts toward the cursor in 3D (GPU-accelerated via GSAP) with a spotlight under the pointer.
export default function TiltCard({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    gsap.set(el, { transformPerspective: 900, force3D: true });
    tilt.current = {
      x: gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" }),
    };
    return () => {
      gsap.killTweensOf(el);
      tilt.current = null;
    };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !tilt.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    tilt.current.x((0.5 - py) * max);
    tilt.current.y((px - 0.5) * max);
  };

  const onLeave = () => {
    tilt.current?.x(0);
    tilt.current?.y(0);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-card holo relative ${className}`}>
      {children}
    </div>
  );
}
