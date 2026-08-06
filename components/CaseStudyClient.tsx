'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  X 
} from "lucide-react";
import { SiGithub as Github } from "react-icons/si";
import { type CaseStudyData } from "@/utils/case-studies";

interface CaseStudyClientProps {
  data: CaseStudyData;
}

export default function CaseStudyClient({ data }: CaseStudyClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

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
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
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
        </motion.div>
      </main>

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
