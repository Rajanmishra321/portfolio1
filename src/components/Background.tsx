"use client";

import dynamic from "next/dynamic";
import { useThreeReady } from "@/lib/three-gate";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), { ssr: false });

// Fixed 3D particle space behind every page. A CSS star field shows until the 3D scene
// starts (first interaction) and stays on devices without a real GPU.
export default function Background() {
  const threeReady = useThreeReady();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30">
      <div data-hidden={threeReady || undefined} className="stars-fallback absolute inset-0 transition-opacity duration-1000" />
      {threeReady && <BackgroundScene />}
    </div>
  );
}
