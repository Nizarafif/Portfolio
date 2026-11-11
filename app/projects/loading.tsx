export default function ProjectsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent)]" />
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
          Loading Case Study...
        </p>
      </div>
    </div>
  );
}
