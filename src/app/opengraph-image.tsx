import { profile } from "@/data/portfolio";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Portfolio", title: profile.name, subtitle: profile.tagline });
}
