'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";

interface CaseStudyLinkProps {
  href: string;
  projectTitle: string;
}

export default function CaseStudyLink({ href, projectTitle }: CaseStudyLinkProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Prefetch the target route for instantaneous rendering after loading duration
  useEffect(() => {
    if (href && href.startsWith('/')) {
      router.prefetch(href);
    }
  }, [href, router]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="text-teal-600 hover:text-teal-500 transition-all inline-flex items-center gap-1 font-bold cursor-pointer disabled:opacity-80 group text-xs"
      >
        {loading ? (
          <>
            <span className="text-teal-700">Memuat...</span>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-600" />
          </>
        ) : (
          <>
            <span>View Case Study</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      {/* Global 1.5s Transition Modal */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all duration-300">
          {/* Ambient Glows */}
          <div className="absolute w-80 h-80 bg-teal-500/25 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-[110px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-5 bg-slate-900/95 border border-teal-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center">
            {/* Spinning Indicator */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-400 rounded-full animate-spin" />
              <div className="absolute w-10 h-10 border-4 border-teal-400/30 border-b-teal-300 rounded-full animate-spin [animation-direction:reverse]" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] font-semibold text-teal-300 uppercase tracking-widest">
                Studi Kasus Proyek
              </span>
              <h3 className="text-lg font-extrabold text-white tracking-wide">
                {projectTitle}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Sedang memuat dokumen & arsitektur...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div 
                className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 h-full rounded-full transition-all ease-out"
                style={{
                  animation: 'fillProgress 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
              />
            </div>
          </div>

          <style jsx>{`
            @keyframes fillProgress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
