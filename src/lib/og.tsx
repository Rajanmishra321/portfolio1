import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Shared social-preview card used by every opengraph-image route.
export function ogImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 20%, #0e3a4f 0%, #05070d 60%)",
          color: "#e6edf7",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#22d3ee", letterSpacing: 4 }}>{eyebrow.toUpperCase()}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 40 ? 64 : 84, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#8b98ad", marginTop: 28, maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#e6edf7" }}>
          Rajan Mishra<span style={{ color: "#3b82f6", marginLeft: 12 }}>· Full-Stack Developer</span>
        </div>
      </div>
    ),
    ogSize
  );
}
