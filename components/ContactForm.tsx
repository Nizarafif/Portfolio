"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { ArrowUpRight, Loader2 } from "lucide-react";

export default function ContactForm() {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const triggerEmailFallback = () => {
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      window.location.href = `mailto:nizarnurafif644@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setStatus({
        type: "success",
        message: "Opening your default email application...",
      });
    };

    try {
      const { error } = await supabase
        .from("contacts")
        .insert([{ name, email, message }]);

      if (error) {
        console.warn("Database insert failed, falling back to mailto:", error.message);
        triggerEmailFallback();
        return;
      }

      setStatus({
        type: "success",
        message: "Thank you. Your message has been sent successfully.",
      });
      form.reset();
    } catch (err) {
      console.warn("Database connection issue, falling back to mailto:", err);
      triggerEmailFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`border px-4 py-3 text-xs ${
            status.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, role, or inquiry..."
          className="w-full resize-none rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--btn-primary-bg)] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--accent)] hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
