// Static SVG stand-in for the 3D hero globe: shown on first paint, on devices without a GPU,
// and until the live scene is ready (then it fades out). Same size and position as the 3D globe.

const COUNT = 520;
const TILT = 0.35;

// Fibonacci-sphere points, tilted slightly and projected to 2D (x, y, depth 0..1).
const dots = Array.from({ length: COUNT }, (_, i) => {
  const y = 1 - (i / (COUNT - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const t = Math.PI * (3 - Math.sqrt(5)) * i;
  const x = Math.cos(t) * r;
  const z = Math.sin(t) * r;
  const y2 = y * Math.cos(TILT) - z * Math.sin(TILT);
  const z2 = y * Math.sin(TILT) + z * Math.cos(TILT);
  // Rounded so server and browser render identical markup (float math can differ in the last digits).
  const d = (z2 + 1) / 2;
  return {
    x: +(x * 1.9).toFixed(3),
    y: +(y2 * 1.9).toFixed(3),
    r: +(0.012 + d * 0.014).toFixed(4),
    o: +(0.25 + d * 0.75).toFixed(2),
  };
});

export default function GlobePlaceholder({ hidden }: { hidden: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="-3.2 -3.2 6.4 6.4"
      className={`pointer-events-none absolute top-1/2 left-1/2 h-[110%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 [@media(min-aspect-ratio:6/5)]:left-[73.8%] ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <circle r="1.2" fill="var(--accent)" opacity="0.08" />
      {dots.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="var(--accent)" opacity={p.o} />
      ))}
      <ellipse rx="2.6" ry="0.9" transform="rotate(-18)" fill="none" stroke="var(--accent)" strokeWidth="0.012" opacity="0.7" />
      <ellipse rx="3" ry="0.5" transform="rotate(28)" fill="none" stroke="var(--accent-2)" strokeWidth="0.01" opacity="0.5" />
      <circle cx="2.47" cy="-0.8" r="0.08" fill="var(--accent)" />
      <circle cx="-2.65" cy="-1.4" r="0.06" fill="var(--accent-2)" />
    </svg>
  );
}
