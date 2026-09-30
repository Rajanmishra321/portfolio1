import type Lenis from "lenis";

// The active smooth-scroll instance (set by SmoothScroll), so other components can scroll with it.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
