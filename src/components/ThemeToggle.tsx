"use client";

import { useTheme } from "./useTheme";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-foreground"
    >
      {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
