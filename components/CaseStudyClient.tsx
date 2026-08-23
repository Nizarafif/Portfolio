'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle, 
  Play, 
  Maximize2,
  X,
  Loader2
} from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { type CaseStudyData } from "@/utils/case-studies";

interface CaseStudyClientProps {
  data: CaseStudyData;
}

export default function CaseStudyClient({ data }: CaseStudyClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isReturningHome) return;
    setIsReturningHome(true);
    router.push('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-teal-500/20">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[40%] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[30%] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header Sticky Navbar for Case Study */}
      <header className="sticky top-0 z-30 border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-0">
          <button 
            onClick={handleBackHome}
            disabled={isReturningHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-600 transition-colors cursor-pointer disabled:opacity-75"
          >
            {isReturningHome ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                <span className="text-teal-600 font-bold">Kembali ke Beranda...</span>
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </>
            )}
          </button>
          <div className="flex gap-4">
            <a 
              href={data.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            {data.demo && (
              <a 
                href={data.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-500 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-6 pt-12 lg:px-0 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-50/50 px-3 py-1 text-xs font-medium text-teal-600">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span>{data.category}</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl md:leading-tight">
              {data.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Role: <span className="text-slate-900">{data.role}</span>
            </p>

            {/* Banner Image */}
            {data.image_url && (
              <div className="relative w-full h-[300px] sm:h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <Image 
                  src={data.image_url} 
                  alt={`${data.title} Banner`}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                />
              </div>
            )}

            {/* Meta Data Box */}
            <div className="grid gap-6 sm:grid-cols-4 rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Timeline</span>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  <span>{data.timeline}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{data.status}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Role</span>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <User className="h-4 w-4 text-teal-600" />
                  <span>{data.role}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tech Stack</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {data.tech.map(t => (
                    <span key={t} className="rounded bg-slate-100 px-2 py-0.5 text-[9px] text-slate-650 font-semibold border border-transparent">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Problem & Solution */}
          <motion.section variants={itemVariants} className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">The Problem</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{data.problem}</p>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">The Solution</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{data.solution}</p>
            </div>
          </motion.section>

          {/* Key Features & Architecture */}
          <motion.section variants={itemVariants} className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">Key Features</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.keyFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-1 rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">System Architecture</h2>
              <pre className="text-[10px] font-mono bg-slate-50 border border-slate-200/50 p-4 rounded-lg text-slate-700 leading-relaxed overflow-x-auto">
                {data.systemArchitecture}
              </pre>
            </div>
          </motion.section>

          {/* Challenges & Results */}
          <motion.section variants={itemVariants} className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">Technical Challenges</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">{data.challenges}</p>
            </div>
            <div className="md:col-span-2 rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">Measurable Results</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {data.resultsMetrics.map((res, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-semibold bg-slate-50 border border-slate-200/40 p-3 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Gallery Carousel */}
          {data.gallery && data.gallery.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-l-3 border-teal-500 pl-3">Project Gallery</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {data.gallery.map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(imgUrl)}
                    className="group relative h-48 rounded-xl overflow-hidden border border-slate-200/60 shadow-sm cursor-zoom-in bg-slate-100"
                  >
                    <Image 
                      src={imgUrl} 
                      alt={`Gallery view ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-350 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-955/20 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
          {/* Bottom Back to Home CTA */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={handleBackHome}
              disabled={isReturningHome}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold text-xs shadow-lg shadow-slate-900/10 cursor-pointer disabled:opacity-75 group"
            >
              {isReturningHome ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-teal-400" />
                  <span>Membuka Beranda...</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Kembali ke Beranda</span>
                </>
              )}
            </button>

            {data.demo && (
              <a
                href={data.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white hover:bg-teal-500 transition-all font-bold text-xs shadow-lg shadow-teal-500/20"
              >
                <span>Kunjungi Live Demo</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Global 1.5s Returning Home Modal */}
      {isReturningHome && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all duration-300">
          <div className="absolute w-80 h-80 bg-teal-500/25 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-[110px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-5 bg-slate-900/95 border border-teal-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-400 rounded-full animate-spin" />
              <div className="absolute w-10 h-10 border-4 border-teal-400/30 border-b-teal-300 rounded-full animate-spin [animation-direction:reverse]" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] font-semibold text-teal-300 uppercase tracking-widest">
                Navigasi
              </span>
              <h3 className="text-lg font-extrabold text-white tracking-wide">
                Kembali ke Beranda
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Sedang mengarahkan ke halaman utama...
              </p>
            </div>

            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div 
                className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 h-full rounded-full"
                style={{
                  animation: 'fillProgress 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards'
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

      {/* Fullscreen Image Preview Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/60 border border-slate-800 text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl w-full h-[70vh] sm:h-[80vh]"
            >
              <Image 
                src={activeImage} 
                alt="Case Study Detail view"
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
