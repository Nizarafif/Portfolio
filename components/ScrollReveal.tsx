'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealType = entry.target.getAttribute('data-reveal');
            entry.target.classList.remove('opacity-0');
            
            // Hapus kelas transform sesuai arah swipe untuk memicu transisi masuk
            if (revealType === 'slide-up') {
              entry.target.classList.remove('translate-y-12');
            } else if (revealType === 'slide-down') {
              entry.target.classList.remove('-translate-y-12');
            } else if (revealType === 'slide-left') {
              entry.target.classList.remove('translate-x-12');
            } else if (revealType === 'slide-right') {
              entry.target.classList.remove('-translate-x-12');
            }
            
            // Berhenti memantau setelah animasi berjalan sekali
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05, // Mulai terpicu saat 5% elemen masuk layar
        rootMargin: '0px 0px -40px 0px', // Offset sedikit di atas batas bawah
      }
    );
    
    reveals.forEach((element) => {
      // Setel durasi transisi bawaan jika belum diatur secara inline
      element.classList.add('opacity-0', 'transition-all', 'duration-1000', 'ease-out');
      
      const revealType = element.getAttribute('data-reveal');
      if (revealType === 'slide-up') {
        element.classList.add('translate-y-12');
      } else if (revealType === 'slide-down') {
        element.classList.add('-translate-y-12');
      } else if (revealType === 'slide-left') {
        element.classList.add('translate-x-12');
      } else if (revealType === 'slide-right') {
        element.classList.add('-translate-x-12');
      }
      
      observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);

  return null;
}
