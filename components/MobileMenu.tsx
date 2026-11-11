"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, X, Menu } from "lucide-react";
import { SiGithub as Github, SiLinkedin as Linkedin } from "react-icons/si";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  activeSection?: string;
}

export default function MobileMenu({
  navItems,
  activeSection = "home",
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)]"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-0 z-40 flex h-dvh w-[280px] flex-col border-l border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 pt-28"
            >
              <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Open to Work · Kudus, ID</span>
              </div>

              <nav
                className="flex flex-col border-t border-[var(--border-subtle)]"
                aria-label="Mobile Navigation"
              >
                {navItems.map((item, idx) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between border-b border-[var(--border-subtle)] py-3.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`font-mono text-[11px] ${
                          isActive
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-4 border-t border-[var(--border-subtle)] pt-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Connect
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href="mailto:nizarnurafif644@gmail.com"
                    className="flex h-10 items-center justify-center rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/nizarnurafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center justify-center rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/Nizarafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center justify-center rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/6281806344925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center justify-center rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                    aria-label="WhatsApp"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
