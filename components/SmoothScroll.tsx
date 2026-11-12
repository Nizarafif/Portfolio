"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const scrollToTarget = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (!element) return false;

      const headerOffset = 96;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      return true;
    };

    const stripHashFromUrl = () => {
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    };

    // Jika halaman dibuka dengan hash di URL (mis. /#home), scroll ke target lalu bersihkan URL
    if (window.location.hash.length > 1) {
      const initialId = window.location.hash.slice(1);
      if (scrollToTarget(initialId)) {
        stripHashFromUrl();
      }
    }

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetId = href.slice(1);
        if (scrollToTarget(targetId)) {
          e.preventDefault();
          stripHashFromUrl();
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
