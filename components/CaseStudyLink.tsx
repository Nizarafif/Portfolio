"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";

interface CaseStudyLinkProps {
  href: string;
  projectTitle: string;
}

export default function CaseStudyLink({
  href,
  projectTitle,
}: CaseStudyLinkProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (href && href.startsWith("/")) {
      router.prefetch(href);
    }
  }, [href, router]);

  const handleClick = (e: React.MouseEvent) => {
    if (!href || href === "#") return;
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    router.push(href);
  };

  if (!href || href === "#") {
    return null;
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={`View case study for ${projectTitle}`}
      className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--accent)]" />
          <span className="text-[var(--text-secondary)]">Loading...</span>
        </>
      ) : (
        <>
          <span>Case Study</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-secondary)] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-[var(--accent)]" />
        </>
      )}
    </a>
  );
}
