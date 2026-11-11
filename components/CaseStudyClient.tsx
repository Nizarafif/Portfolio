"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Maximize2,
  X,
  Loader2,
} from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { type CaseStudyData } from "@/utils/case-studies";
import ThemeToggle from "./ThemeToggle";

interface CaseStudyClientProps {
  data: CaseStudyData;
}

export default function CaseStudyClient({ data }: CaseStudyClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isReturningHome) return;
    setIsReturningHome(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--nav-blur)] backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBackHome}
            disabled={isReturningHome}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-60"
          >
            {isReturningHome ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--accent)]" />
                <span>Returning...</span>
              </>
            ) : (
              <>
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Portfolio</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 sm:gap-5">
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Source Code</span>
              </a>
            )}
            {data.demo && (
              <a
                href={data.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-14 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-14"
        >
          {/* Hero */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
              <span>{data.category}</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span>{data.timeline}</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {data.status}
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
              {data.title}
            </h1>

            <p className="text-sm text-[var(--text-secondary)] sm:text-base">
              Role:{" "}
              <span className="text-[var(--text-primary)]">{data.role}</span>
            </p>

            {data.image_url && (
              <div className="relative h-[260px] w-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] sm:h-[440px]">
                <Image
                  src={data.image_url}
                  alt={`${data.title} preview`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            )}

            {/* Metadata Strip */}
            <div className="grid border border-[var(--border-subtle)] bg-[var(--bg-surface)] sm:grid-cols-4">
              <div className="border-b border-[var(--border-subtle)] p-5 sm:border-b-0 sm:border-r">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Timeline
                </span>
                <span className="mt-1.5 block text-xs font-medium text-[var(--text-primary)]">
                  {data.timeline}
                </span>
              </div>
              <div className="border-b border-[var(--border-subtle)] p-5 sm:border-b-0 sm:border-r">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Status
                </span>
                <span className="mt-1.5 block text-xs font-medium text-[var(--text-primary)]">
                  {data.status}
                </span>
              </div>
              <div className="border-b border-[var(--border-subtle)] p-5 sm:border-b-0 sm:border-r">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Role
                </span>
                <span className="mt-1.5 block text-xs font-medium text-[var(--text-primary)]">
                  {data.role}
                </span>
              </div>
              <div className="p-5">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Stack
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {data.tech.map((t) => (
                    <span
                      key={t}
                      className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Problem & Solution */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                01 / The Problem
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {data.problem}
              </p>
            </div>
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                02 / The Solution
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {data.solution}
              </p>
            </div>
          </section>

          {/* Key Features & Architecture */}
          <section className="grid gap-6 md:grid-cols-3">
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5 md:col-span-2">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                03 / Key Features
              </h2>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {data.keyFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5 md:col-span-1">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                04 / Architecture
              </h2>
              <pre className="overflow-x-auto border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 font-mono text-[11px] leading-relaxed text-[var(--text-secondary)]">
                {data.systemArchitecture}
              </pre>
            </div>
          </section>

          {/* Challenges & Measurable Results */}
          <section className="grid gap-6 md:grid-cols-3">
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-4 md:col-span-1">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                05 / Challenges
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {data.challenges}
              </p>
            </div>

            <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-4 md:col-span-2">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                06 / Outcomes &amp; Impact
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {data.resultsMetrics.map((res, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3.5 text-xs leading-relaxed text-[var(--text-primary)]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Gallery */}
          {data.gallery && data.gallery.length > 0 && (
            <section className="space-y-5">
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                Project Preview
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {data.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className="group relative h-48 w-full cursor-zoom-in overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-left"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${data.title} gallery ${idx + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                      <Maximize2 className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8">
            <button
              type="button"
              onClick={handleBackHome}
              disabled={isReturningHome}
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)]"
            >
              {isReturningHome ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--accent)]" />
                  <span>Returning...</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Home</span>
                </>
              )}
            </button>

            {data.demo && (
              <a
                href={data.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[var(--btn-primary-bg)] px-5 py-2.5 text-xs font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--accent)] hover:text-white"
              >
                <span>Visit Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close image preview"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-[#111111] text-[#F5F5F5] hover:border-white/40"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="relative h-[75vh] w-full max-w-5xl"
            >
              <Image
                src={activeImage}
                alt="Project preview detail"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
