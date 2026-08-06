'use client';

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  className?: string;
}

export default function LottiePlayer({ src, loop = true, className = "w-full h-full" }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let anim: AnimationItem | null = null;

    // Load Lottie animation once on mount
    import("lottie-web").then((lottie) => {
      if (!containerRef.current) return;
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      anim = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: loop,
        autoplay: !prefersReducedMotion,
        path: src,
      });

      animRef.current = anim;
    });

    // Intersection Observer to only play when visible, pause when hidden
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (animRef.current) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (entry.isIntersecting && !prefersReducedMotion) {
              animRef.current.play();
            } else {
              animRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (anim) {
        anim.destroy();
      }
      animRef.current = null;
    };
  }, [src, loop]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ minHeight: '40px' }}
    />
  );
}
