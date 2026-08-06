'use client';

import { useEffect, useState } from 'react';

export default function TimeStatus() {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update setiap 1 menit
    return () => clearInterval(interval);
  }, []);

  const formatUpdateMonth = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric"
    }).toUpperCase(); // Hasil format: "AUG 2026"
  };

  return (
    <div className="w-full border-b border-slate-100 bg-slate-50/50 py-2 px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase lg:px-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          <span>
            Kudus, Indonesia
            {mounted && time ? ` · ${time} WIB` : ''}
          </span>
        </div>
        <div>
          <span>Updated {formatUpdateMonth()}</span>
        </div>
      </div>
    </div>
  );
}
