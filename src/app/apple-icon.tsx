import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon (Safari ignores SVG favicons).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070d",
          color: "#22d3ee",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        R<span style={{ color: "#3b82f6" }}>.</span>
      </div>
    ),
    size
  );
}
