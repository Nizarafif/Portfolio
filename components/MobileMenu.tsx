'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { SiGithub as Github, SiLinkedin as Linkedin } from 'react-icons/si';




interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <div className="sm:hidden">
      {/* Hamburger Trigger */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-teal-500/50"
        aria-label="Toggle menu"
      >
        <div className="relative h-6 w-6 flex flex-col justify-center items-center">
          {/* Top Line */}
          <motion.span
            animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute h-0.5 w-5 rounded-full bg-slate-700"
          />
          {/* Middle Line */}
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute h-0.5 w-5 rounded-full bg-slate-700"
          />
          {/* Bottom Line */}
          <motion.span
            animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute h-0.5 w-5 rounded-full bg-slate-700"
          />
        </div>
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            />

            {/* Side Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed bottom-0 right-0 top-0 z-40 flex h-screen w-[280px] flex-col bg-white/95 p-6 shadow-2xl backdrop-blur-md border-l border-slate-100"
            >
              {/* Top offset to clear the fixed layout top bar */}
              <div className="h-24" />

              {/* Navigation Links */}
              <div className="flex flex-col gap-1.5 py-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4">Menu</span>
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-650 transition-all hover:bg-teal-50 hover:text-teal-600 active:bg-teal-100"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Contact / Social Links */}
              <motion.div variants={itemVariants} className="border-t border-slate-100 pt-6 pb-8 space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Connect</span>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href="mailto:nizarnurafif644@gmail.com"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-teal-500/20 hover:text-teal-600"
                    title="Email"
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/nizarnurafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-teal-500/20 hover:text-teal-600"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://github.com/Nizarafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-teal-500/20 hover:text-teal-600"
                    title="GitHub"
                  >
                    <Github className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://wa.me/6282242131665"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-teal-500/20 hover:text-teal-600"
                    title="WhatsApp"
                  >
                    <Phone className="h-4.5 w-4.5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
