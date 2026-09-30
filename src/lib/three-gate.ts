"use client";

import { useEffect, useState } from "react";

// 3D is decorative, so it never competes with the first load:
// it starts on the visitor's first interaction, and only on devices with a real GPU.

let hardware: boolean | null = null;

// Software WebGL (SwiftShader, llvmpipe — used by headless browsers, some VMs and old devices)
// renders on the CPU and freezes the page, so treat it as "no 3D".
export function hasHardwareWebGL() {
  if (hardware !== null) return hardware;
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return (hardware = false);
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    hardware = !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    hardware = false;
  }
  return hardware;
}

const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
let interaction: Promise<void> | null = null;

function firstInteraction() {
  interaction ??= new Promise<void>((resolve) => {
    const done = () => {
      events.forEach((e) => window.removeEventListener(e, done));
      resolve();
    };
    events.forEach((e) => window.addEventListener(e, done, { passive: true }));
  });
  return interaction;
}

// True once the visitor has interacted and the device can render 3D smoothly.
export function useThreeReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    firstInteraction().then(() => {
      if (alive && hasHardwareWebGL()) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
