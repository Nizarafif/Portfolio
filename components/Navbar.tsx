"use client";

import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

export interface NavItem {
  href: string;
  label: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const scrollPosition = window.scrollY + 140;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (nearBottom) {
        setActiveSection("contact");
        return;
      }

      const sectionIds = navItems.map((item) => item.href.replace("#", ""));
      let current = sectionIds[0] || "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--nav-blur)] backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8"
      >
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            Nizar Nur Afif
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3.5 py-2 text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] bg-[var(--accent)]"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 pr-1 font-mono text-[11px] text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Open to Work</span>
          </div>
          <ThemeToggle />
          <MobileMenu navItems={navItems} activeSection={activeSection} />
        </div>
      </nav>
    </header>
  );
}
