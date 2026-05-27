"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

// =============================================================================
// THEME TOGGLE
// Flips the `dark` class on <html>, persists to localStorage("base-theme").
// On first paint the inline script in app/layout.tsx already set the right
// class; this button only reflects + mutates the user's choice.
// =============================================================================

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("base-theme", next);
    } catch {
      /* localStorage blocked — silent */
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base-paper transition-colors hover:border-white/30 hover:bg-white/10",
        !mounted && "opacity-0",
        className,
      )}
    >
      <Sun
        size={15}
        className={clsx(
          "absolute transition-all duration-300",
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        size={15}
        className={clsx(
          "absolute transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
