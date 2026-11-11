export default function CaseStudyLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-24">
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--nav-blur)] backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 lg:px-8">
          <div className="h-4 w-32 animate-pulse bg-[var(--bg-surface-hover)]" />
          <div className="flex gap-4">
            <div className="h-4 w-20 animate-pulse bg-[var(--bg-surface-hover)]" />
            <div className="h-4 w-20 animate-pulse bg-[var(--bg-surface-hover)]" />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl space-y-12 px-6 pt-14 lg:px-8">
        <section className="space-y-5">
          <div className="h-3 w-48 animate-pulse bg-[var(--bg-surface-hover)]" />
          <div className="h-12 w-2/3 animate-pulse bg-[var(--bg-surface-hover)]" />
          <div className="h-4 w-44 animate-pulse bg-[var(--bg-surface-hover)]" />
          <div className="h-[360px] w-full animate-pulse border border-[var(--border-subtle)] bg-[var(--bg-surface)]" />
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="h-44 animate-pulse border border-[var(--border-subtle)] bg-[var(--bg-surface)]" />
          <div className="h-44 animate-pulse border border-[var(--border-subtle)] bg-[var(--bg-surface)]" />
        </section>
      </main>
    </div>
  );
}
