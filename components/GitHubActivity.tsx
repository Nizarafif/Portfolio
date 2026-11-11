"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  html_url?: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const DEFAULT_CELLS: ContributionDay[] = Array.from({ length: 364 }, (_, i) => ({
  date: `day-${i}`,
  count: 0,
  level: 0,
}));

export default function GitHubActivity() {
  const [profile, setProfile] = useState<GitHubProfile>({
    public_repos: 18,
    followers: 12,
    following: 15,
    login: "Nizarafif",
    html_url: "https://github.com/Nizarafif",
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([
    {
      name: "e-commerce",
      description:
        "E-Commerce application built with React, TypeScript, and Tailwind CSS.",
      stargazers_count: 2,
      forks_count: 1,
      language: "TypeScript",
      html_url: "https://github.com/Nizarafif/e-commerce",
    },
    {
      name: "FlowSync",
      description:
        "SaaS Workflow Tool integrating calendar scheduling and kanban drag-and-drop boards.",
      stargazers_count: 3,
      forks_count: 0,
      language: "React",
      html_url: "https://github.com/Nizarafif/FlowSync",
    },
    {
      name: "portfolio",
      description:
        "Personal portfolio website built using Next.js 15, React, and Supabase.",
      stargazers_count: 1,
      forks_count: 0,
      language: "TypeScript",
      html_url: "https://github.com/Nizarafif/portfolio",
    },
  ]);

  const [contributions, setContributions] =
    useState<ContributionDay[]>(DEFAULT_CELLS);
  const [totalContributions, setTotalContributions] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    interface GitHubRepoResponse {
      name: string;
      description: string | null;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      html_url: string;
    }

    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes, contribRes] = await Promise.allSettled([
          fetch("https://api.github.com/users/Nizarafif"),
          fetch(
            "https://api.github.com/users/Nizarafif/repos?sort=updated&per_page=6"
          ),
          fetch(
            "https://github-contributions-api.jogruber.de/v4/Nizarafif?y=last"
          ),
        ]);

        if (profileRes.status === "fulfilled" && profileRes.value.ok) {
          const profileData = await profileRes.value.json();
          setProfile({
            public_repos: profileData.public_repos,
            followers: profileData.followers,
            following: profileData.following,
            login: profileData.login,
            html_url: profileData.html_url,
          });
        }

        if (reposRes.status === "fulfilled" && reposRes.value.ok) {
          const reposData =
            (await reposRes.value.json()) as GitHubRepoResponse[];
          if (Array.isArray(reposData) && reposData.length > 0) {
            setRepos(
              reposData.map((r) => ({
                name: r.name,
                description: r.description || "No description provided.",
                stargazers_count: r.stargazers_count,
                forks_count: r.forks_count,
                language: r.language || "TypeScript",
                html_url: r.html_url,
              }))
            );
          }
        }

        if (contribRes.status === "fulfilled" && contribRes.value.ok) {
          const contribData = await contribRes.value.json();
          if (Array.isArray(contribData?.contributions)) {
            const days = contribData.contributions.slice(
              -364
            ) as ContributionDay[];
            setContributions(days);
            if (typeof contribData?.total?.lastYear === "number") {
              setTotalContributions(contribData.total.lastYear);
            } else {
              const sum = days.reduce((acc, d) => acc + (d.count || 0), 0);
              setTotalContributions(sum);
            }
          }
        }
      } catch (err) {
        console.warn("GitHub API fetch fallback active:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getCellStyle = (level: number): string => {
    if (level <= 0)
      return "bg-[var(--bg-surface-hover)] border border-[var(--border-subtle)]";
    if (level === 1) return "bg-blue-200 dark:bg-[#1E3A5F]";
    if (level === 2) return "bg-blue-400 dark:bg-[#1D4ED8]";
    if (level === 3) return "bg-blue-500 dark:bg-[#3B82F6]";
    return "bg-blue-700 dark:bg-[#60A5FA]";
  };

  return (
    <div className="space-y-8">
      {/* Top Stats Strip */}
      <div className="grid grid-cols-2 border border-[var(--border-subtle)] bg-[var(--bg-surface)] sm:grid-cols-4">
        <a
          href={profile.html_url || "https://github.com/Nizarafif"}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-b border-r border-[var(--border-subtle)] p-5 transition-colors hover:bg-[var(--bg-surface-hover)] sm:border-b-0"
        >
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            GitHub Handle
          </span>
          <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            @{profile.login}
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
          </span>
        </a>

        <div className="border-b border-[var(--border-subtle)] p-5 sm:border-b-0 sm:border-r">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            Public Repos
          </span>
          <span className="mt-2 block text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {profile.public_repos}
          </span>
        </div>

        <div className="border-r border-[var(--border-subtle)] p-5">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            Followers
          </span>
          <span className="mt-2 block text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {profile.followers}
          </span>
        </div>

        <div className="p-5">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            Following
          </span>
          <span className="mt-2 block text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            {profile.following}
          </span>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
            Contribution Graph
          </span>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {totalContributions !== null
              ? `${totalContributions} contributions in the last year`
              : isLoading
                ? "Loading contributions..."
                : "Past 365 days"}
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[680px] grid-flow-col grid-rows-7 gap-[3px]">
            {contributions.map((day, index) => (
              <div
                key={day.date || index}
                className={`h-[11px] w-[11px] rounded-[2px] ${getCellStyle(day.level)} transition-opacity hover:opacity-80`}
                title={
                  day.date.startsWith("day-")
                    ? "GitHub activity"
                    : `${day.count} contributions on ${day.date}`
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1.5 border-t border-[var(--border-subtle)] pt-3 font-mono text-[10px] text-[var(--text-muted)]">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-[2px] border border-[var(--border-subtle)] bg-[var(--bg-surface-hover)]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-200 dark:bg-[#1E3A5F]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-400 dark:bg-[#1D4ED8]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-500 dark:bg-[#3B82F6]" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-700 dark:bg-[#60A5FA]" />
          <span>More</span>
        </div>
      </div>

      {/* Featured Repositories */}
      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
          Recently Updated Repositories
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {repos.slice(0, 3).map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface-hover)]"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="truncate text-sm font-medium text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                    {repo.name}
                  </h4>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {repo.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 font-mono text-[11px] text-[var(--text-muted)]">
                <span>{repo.language}</span>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
