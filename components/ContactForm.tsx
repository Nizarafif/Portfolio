'use client';

import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ContactForm() {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      // Simpan langsung pesan ke tabel 'contacts' di Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

      if (error) {
        throw error;
      }

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });
      e.currentTarget.reset();
    } catch (err: any) {
      console.error("Gagal mengirim pesan:", err);
      
      // Fallback ke mailto jika tabel 'contacts' belum dibuat di Supabase
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      window.location.href = `mailto:nizarnurafif644@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      setStatus({
        type: 'success',
        message: 'Opening your default email app...'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div className={`p-3 rounded-lg text-xs border ${
          status.type === 'success' 
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-950/40 border-red-500/30 text-red-400'
        }`}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/40 transition-all"
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/40 transition-all"
          placeholder="email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/40 transition-all resize-none"
          placeholder="Write your message here..."
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 shadow-lg shadow-teal-500/10 hover:from-teal-500 hover:to-emerald-500 hover:shadow-teal-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-teal-500 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isSubmitting ? 'Sending Message...' : 'Send Message'}
      </button>
    </form>
  );
}
