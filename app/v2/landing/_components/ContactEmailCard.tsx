"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

interface ContactEmailCardProps {
  email: string;
  submitted: boolean;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactEmailCard({
  email,
  submitted,
  onChange,
  onSubmit,
}: ContactEmailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-lg rounded-2xl bg-neutral-900/90 border border-white/10 hover:border-white/20 p-6 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300"
    >
      <label
        htmlFor="contact-email"
        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3"
      >
        Email
      </label>

      {submitted ? (
        <div className="flex items-center gap-2 py-2 text-sm text-emerald-400 font-medium">
          <Check className="w-4 h-4 shrink-0" />
          <span>Thank you! I will keep you updated.</span>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-between gap-3 border-b border-white/15 pb-2 focus-within:border-rose-500 transition-colors"
        >
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => onChange(e.target.value)}
            placeholder="jane@framer.com"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 outline-none font-sans"
          />
          <button
            type="submit"
            className="p-1.5 text-slate-400 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer shrink-0"
            aria-label="Submit email"
          >
            <ArrowRight className="w-4 h-4 text-rose-500" />
          </button>
        </form>
      )}
    </motion.div>
  );
}
