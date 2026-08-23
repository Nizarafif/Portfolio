export default function CaseStudyLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-teal-500/20 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[40%] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[30%] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />

      {/* Floating Center Loading Badge */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-2xl border border-teal-500/30 text-xs font-semibold animate-bounce">
        <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        <span className="tracking-wide">Memuat Case Study...</span>
      </div>

      {/* Header Sticky Navbar Skeleton */}
      <header className="sticky top-0 z-30 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-0">
          <div className="h-5 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-teal-100 rounded animate-pulse" />
          </div>
        </nav>
      </header>

      {/* Main Skeleton Container */}
      <main className="mx-auto max-w-5xl px-6 pt-12 lg:px-0 relative space-y-12">
        {/* Hero Section Skeleton */}
        <section className="space-y-6">
          <div className="h-6 w-32 bg-teal-100 rounded-full animate-pulse" />
          <div className="h-12 w-3/4 max-w-lg bg-slate-200 rounded-xl animate-pulse" />
          <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4 border-y border-slate-200/60 py-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-slate-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </section>

        {/* Hero Preview Image Skeleton */}
        <section className="relative h-[360px] md:h-[480px] w-full rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 animate-pulse flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Menyiapkan pratinjau studi kasus...</p>
        </section>

        {/* Problem & Solution Grid Skeleton */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4 shadow-sm">
            <div className="h-5 w-40 bg-rose-100 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4 shadow-sm">
            <div className="h-5 w-40 bg-teal-100 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        </section>

        {/* Key Features Skeleton */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
          <div className="h-6 w-44 bg-slate-200 rounded animate-pulse" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-teal-100 shrink-0" />
                <div className="h-4 w-4/5 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
