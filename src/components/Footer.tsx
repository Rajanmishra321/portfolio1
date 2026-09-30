import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer data-reveal className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs">Built with Next.js, Three.js &amp; GSAP</p>
      </div>
    </footer>
  );
}
