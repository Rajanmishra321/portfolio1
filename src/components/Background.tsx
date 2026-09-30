"use client";

import dynamic from "next/dynamic";

const BackgroundScene = dynamic(() => import("./BackgroundScene"), { ssr: false });

// Fixed 3D particle space behind every page.
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30">
      <BackgroundScene />
    </div>
  );
}
