"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Everything marked data-reveal flies in from depth with a 3D flip as it scrolls into view
// (batched, so elements entering together stagger one after another).
// Headings marked data-words flip in word by word.
export default function ScrollReveal() {
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      // data-reveal="left" / "right" swing in from the side; anything else flips up from depth.
      items.forEach((el) => {
        const side = el.dataset.reveal;
        gsap.set(el, {
          opacity: 0,
          x: side === "left" ? -140 : side === "right" ? 140 : 0,
          y: side === "left" || side === "right" ? 0 : 70,
          z: -160,
          rotationX: side === "left" || side === "right" ? 0 : -35,
          rotationY: side === "left" ? 55 : side === "right" ? -55 : 0,
          transformPerspective: 1200,
          transformOrigin: side === "left" ? "0% 50%" : side === "right" ? "100% 50%" : "50% 0%",
          force3D: true,
        });
      });
      const show = (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.1,
          overwrite: true,
          clearProps: "transform,transformPerspective",
        });
      ScrollTrigger.batch(items, { start: "top bottom-=40px", once: true, onEnter: show, onLeave: show });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((heading) => {
        gsap.from(heading.querySelectorAll("[data-word]"), {
          opacity: 0,
          y: 50,
          rotationX: -90,
          transformPerspective: 800,
          transformOrigin: "50% 100%",
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: heading, start: "top bottom-=40px", once: true },
        });
      });

      // Sections drift through 3D space: tilt in from depth on the way in, tilt back on the way out.
      gsap.utils.toArray<HTMLElement>("[data-depth-section]").forEach((section) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
          })
          .fromTo(
            section,
            { rotationX: 10, z: -220, opacity: 0.35, transformPerspective: 1600, transformOrigin: "50% 100%" },
            { rotationX: 0, z: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          )
          .to(section, { duration: 0.4 })
          .to(section, { rotationX: -8, z: -180, opacity: 0.35, transformOrigin: "50% 0%", duration: 0.3, ease: "power2.in" });
      });

      // Timeline lines draw themselves while scrolling.
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "50% 0%" },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 60%", scrub: 1 } }
        );
      });

      // Screenshots unfold from a tilted angle (Apple-style).
      gsap.utils.toArray<HTMLElement>("[data-unfold]").forEach((el) => {
        gsap.fromTo(
          el,
          { rotationX: 32, scale: 0.88, transformPerspective: 1400, transformOrigin: "50% 100%" },
          { rotationX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center 60%", scrub: 1 } }
        );
      });

      // Layout can shift once fonts/images load; recompute trigger positions.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    });
  });

  return null;
}
