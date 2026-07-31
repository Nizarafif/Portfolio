'use client';

import { type FormEvent } from "react";

export default function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = `Portfolio Contact from ${name}`;
    const body = `Nama: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${message}`;
    
    window.location.href = `mailto:nizarnurafif644@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1.5">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="Masukkan nama Anda"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1.5">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
          placeholder="Tulis pesan Anda di sini..."
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="w-full bg-[#0F766E] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-teal-700/20 transition-all duration-200 hover:-translate-y-1 hover:bg-[#0c5c56] hover:shadow-teal-700/30"
      >
        Kirim Pesan via Email
      </button>
    </form>
  );
}
