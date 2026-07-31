'use client';

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { 
  LogOut, 
  Globe, 
  User as UserIcon,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setAdminEmail(user.email || "Admin");
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-950 p-6 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 pb-8 border-b border-slate-800 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-md shadow-teal-500/10">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-950">
              <span className="text-sm font-bold text-white tracking-wider">N</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Nizar Nur Afif</span>
            <span className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase">Administrator</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg border border-slate-800/40 mb-6">
          <UserIcon className="h-4 w-4 text-slate-400" />
          <span className="text-xs text-slate-300 truncate max-w-[170px]" title={adminEmail}>
            {adminEmail}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">Menu Utama</p>
          
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>Lihat Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar Sesi</span>
          </button>
        </nav>
      </aside>

      {/* Header - Mobile */}
      <header className="md:hidden flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4 relative z-20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-950">
              <span className="text-xs font-bold text-white">N</span>
            </div>
          </div>
          <span className="text-sm font-bold text-white">Admin Dashboard</span>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-slate-950 pt-20 px-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-lg border border-slate-800">
            <UserIcon className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-300 truncate">{adminEmail}</span>
          </div>

          <nav className="flex flex-col gap-2">
            <a
              href="/"
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <Globe className="h-4 w-4" />
              <span>Lihat Website</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar Sesi</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {children}
      </main>
    </div>
  );
}
