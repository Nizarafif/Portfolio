'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  GitBranch, 
  Star, 
  GitCommit, 
  Folder, 
  Activity, 
  Users,
  Code
} from "lucide-react";

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface CommitActivity {
  message: string;
  repo: string;
  date: string;
  sha: string;
}

export default function GitHubActivity() {
  const [profile, setProfile] = useState<GitHubProfile>({
    public_repos: 18,
    followers: 12,
    following: 15,
    login: "Nizarafif"
  });
  const [repos, setRepos] = useState<GitHubRepo[]>([
    {
      name: "e-commerce",
      description: "E-Commerce application built with React, TypeScript, and Tailwind CSS.",
      stargazers_count: 2,
      forks_count: 1,
      language: "TypeScript",
      html_url: "https://github.com/Nizarafif/e-commerce"
    },
    {
      name: "FlowSync",
      description: "SaaS Workflow Tool integrating calendar scheduling and kanban drag-and-drop boards.",
      stargazers_count: 3,
      forks_count: 0,
      language: "React",
      html_url: "https://github.com/Nizarafif/FlowSync"
    },
    {
      name: "portfolio",
      description: "Personal portfolio website built using Next.js 15, React, and Supabase.",
      stargazers_count: 1,
      forks_count: 0,
      language: "TypeScript",
      html_url: "https://github.com/Nizarafif/portfolio"
    }
  ]);
  const [commits, setCommits] = useState<CommitActivity[]>([
    {
      message: "feat: redesign portfolio UI to light theme premium",
      repo: "Nizarafif/portfolio",
      date: "2 hours ago",
      sha: "f8d3c1a"
    },
    {
      message: "refactor: optimize database client middleware routes",
      repo: "Nizarafif/portfolio",
      date: "1 day ago",
      sha: "4e9b72d"
    },
    {
      message: "docs: update detailed installation guides",
      repo: "Nizarafif/FlowSync",
      date: "3 days ago",
      sha: "a1c5b8f"
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate dynamic mockup contribution calendar matrix (53 columns x 7 rows)
  const [calendarGrid, setCalendarGrid] = useState<number[]>([]);

  useEffect(() => {
    // Generate mock matrix
    const grid: number[] = [];
    // Seed random contribution levels (0 = none, 1-2 = low, 3-4 = med, 5+ = high)
    for (let i = 0; i < 371; i++) {
      // Create a nice distribution: mostly low-med, some none, some high
      const rand = Math.random();
      if (rand < 0.2) grid.push(0);
      else if (rand < 0.6) grid.push(Math.floor(Math.random() * 2) + 1);
      else if (rand < 0.9) grid.push(Math.floor(Math.random() * 2) + 3);
      else grid.push(Math.floor(Math.random() * 4) + 5);
    }
    setCalendarGrid(grid);

    interface GitHubRepoResponse {
      name: string;
      description: string | null;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      html_url: string;
    }

    interface GitHubEventResponse {
      type: string;
      repo: { name: string };
      created_at: string;
      payload: {
        commits?: Array<{
          message: string;
          sha: string;
        }>;
      };
    }

    // Fetch live data from GitHub API
    const fetchGitHubData = async () => {
      try {
        const profileRes = await fetch("https://api.github.com/users/Nizarafif");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile({
            public_repos: profileData.public_repos,
            followers: profileData.followers,
            following: profileData.following,
            login: profileData.login
          });
        }

        const reposRes = await fetch("https://api.github.com/users/Nizarafif/repos?sort=updated&per_page=6");
        if (reposRes.ok) {
          const reposData = (await reposRes.json()) as GitHubRepoResponse[];
          const mappedRepos = reposData.map((r) => ({
            name: r.name,
            description: r.description || "No description provided.",
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            language: r.language || "TypeScript",
            html_url: r.html_url
          }));
          setRepos(mappedRepos);
        }

        const eventsRes = await fetch("https://api.github.com/users/Nizarafif/events?per_page=15");
        if (eventsRes.ok) {
          const eventsData = (await eventsRes.json()) as GitHubEventResponse[];
          const pushEvents = eventsData.filter((e) => e.type === "PushEvent");
          
          if (pushEvents.length > 0) {
            const parsedCommits: CommitActivity[] = [];
            pushEvents.forEach((event) => {
              const repoName = event.repo.name;
              const commitsList = event.payload.commits || [];
              const eventDate = new Date(event.created_at);
              const relativeDate = formatRelativeTime(eventDate);
              
              commitsList.forEach((c) => {
                parsedCommits.push({
                  message: c.message,
                  repo: repoName,
                  date: relativeDate,
                  sha: c.sha.substring(0, 7)
                });
              });
            });
            if (parsedCommits.length > 0) {
              setCommits(parsedCommits.slice(0, 5));
            }
          }
        }
      } catch (err) {
        console.warn("GitHub API rate limit exceeded or connection issue. Using mock data.", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getCalendarColor = (count: number): string => {
    if (count === 0) return "bg-slate-100";
    if (count <= 2) return "bg-teal-100";
    if (count <= 4) return "bg-teal-300";
    if (count <= 6) return "bg-teal-500";
    return "bg-teal-700";
  };

  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="grid gap-6 sm:grid-cols-4">
        {/* Stat Cards */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">GitHub User</span>
            <Users className="h-5 w-5 text-teal-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">@{profile.login}</p>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public Repos</span>
            <Folder className="h-5 w-5 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{profile.public_repos}</p>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Followers</span>
            <Users className="h-5 w-5 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{profile.followers}</p>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Following</span>
            <Users className="h-5 w-5 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{profile.following}</p>
        </div>
      </div>

      {/* Contribution Calendar Graph */}
      <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Activity className="h-4 w-4 text-teal-600" />
            <span>Contribution Calendar</span>
          </h3>
          <span className="text-[10px] font-semibold text-slate-400">Past 365 Days</span>
        </div>
        
        {/* Calendar Grid wrapper for scrollability on mobile */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[700px] h-[95px] pr-2">
            {calendarGrid.map((count, index) => (
              <div
                key={index}
                className={`w-[11px] h-[11px] rounded-sm ${getCalendarColor(count)} transition-all duration-200 hover:scale-125`}
                title={`${count} contributions`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-[10px] font-semibold text-slate-450 pt-2 border-t border-slate-100">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100" />
          <div className="w-3 h-3 rounded-sm bg-teal-100" />
          <div className="w-3 h-3 rounded-sm bg-teal-300" />
          <div className="w-3 h-3 rounded-sm bg-teal-500" />
          <div className="w-3 h-3 rounded-sm bg-teal-700" />
          <span>More</span>
        </div>
      </div>

      {/* Bottom Grid: Repos & Commits */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Repositories */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-l-2 border-teal-500 pl-3 uppercase tracking-wider">
            Featured Repositories
          </h3>
          <div className="grid gap-4">
            {repos.slice(0, 3).map((repo) => (
              <a 
                key={repo.name} 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-500/25 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-650 transition-colors">
                    {repo.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-450">
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3.5 w-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <GitBranch className="h-3.5 w-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-550 leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                  <Code className="h-3 w-3 text-teal-650" />
                  <span>{repo.language}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Commits */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-l-2 border-teal-500 pl-3 uppercase tracking-wider">
            Recent Commits
          </h3>
          <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm divide-y divide-slate-100">
            {commits.map((commit, idx) => (
              <div key={idx} className={`py-3.5 flex items-start justify-between gap-4 ${idx === 0 ? 'pt-0' : ''} ${idx === commits.length - 1 ? 'pb-0' : ''}`}>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                    {commit.message}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-450">
                    {commit.repo}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 text-right">
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-teal-600 bg-teal-50 border border-teal-500/10 px-1.5 py-0.5 rounded">
                    <GitCommit className="h-3 w-3" />
                    {commit.sha}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-450">{commit.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
