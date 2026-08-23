export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-teal-500/20 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5 p-8 rounded-2xl bg-white/80 border border-slate-200 shadow-xl backdrop-blur-md max-w-sm text-center">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
          <div className="absolute w-8 h-8 border-4 border-teal-400/30 border-b-teal-600 rounded-full animate-spin [animation-direction:reverse]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900 tracking-wide">
            Memuat Case Study
          </h2>
          <p className="text-xs text-slate-500">
            Sedang menyiapkan konten studi kasus proyek...
          </p>
        </div>

        <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full w-full rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
