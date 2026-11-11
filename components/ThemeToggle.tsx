"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      try {
        localStorage.setItem("portfolio-theme", "light");
      } catch {}
    } else {
      root.classList.add("dark");
      try {
        localStorage.setItem("portfolio-theme", "dark");
      } catch {}
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark and light mode"
      title="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}

