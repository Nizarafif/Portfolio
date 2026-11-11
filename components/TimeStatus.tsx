"use client";

import { useEffect, useState } from "react";

export default function TimeStatus() {
  const [time, setTime] = useState<string>("");
  const [updateMonth, setUpdateMonth] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const monthString = now
        .toLocaleDateString("en-US", {
          timeZone: "Asia/Jakarta",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();

      setTime(timeString);
      setUpdateMonth(monthString);
    };

    updateClock();
    const interval = setInterval(updateClock, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-b border-[var(--border-subtle)] bg-[var(--nav-blur)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)] lg:px-8">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>
            Kudus, Indonesia
            {time ? (
              <span className="text-[var(--text-primary)]"> · {time} WIB</span>
            ) : null}
          </span>
        </div>
        <div>
          <span>Updated {updateMonth || "NOV 2026"}</span>
        </div>
      </div>
    </div>
  );
}
