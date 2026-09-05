"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users, Code2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ReferenceItem = {
  icon: React.ElementType;
  category: string;
  quote: string;
  author: string;
  role: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const REFERENCES: ReferenceItem[] = [
  {
    icon: Briefcase,
    category: "Professional Reference",
    quote: "TBA",
    author: "TBA",
    role: "TBA",
  },
  {
    icon: GraduationCap,
    category: "Academic Reference",
    quote: "TBA",
    author: "TBA",
    role: "TBA",
  },
  {
    icon: Users,
    category: "Peer Reference",
    quote: "TBA",
    author: "TBA",
    role: "TBA",
  },
  {
    icon: Code2,
    category: "Project Reference",
    quote: "TBA",
    author: "TBA",
    role: "TBA",
  },
];

// ── ReferencesSection ─────────────────────────────────────────────────────────

export const ReferencesSection = () => {
  return (
    <section className="w-full h-auto px-6 py-16 max-w-5xl mx-auto">
      {/* ── Section header ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8"
      >
        <span
          className="
            w-fit px-3 py-1 rounded-xl
            bg-rose-800 text-white
            text-xs font-bold tracking-widest uppercase select-none
          "
        >
          References
        </span>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Words from mentors, advisors, and collaborators
        </p>
      </motion.div>

      {/* ── 2x2 Grid with gap and no borders ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {REFERENCES.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              className="h-full flex flex-col justify-between gap-4"
            >
              {/* Header: Icon + Category tag */}
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
                <Icon size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Quote paragraph */}
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 leading-relaxed italic">
                {item.quote === "TBA" ? "TBA" : `"${item.quote}"`}
              </p>

              {/* Author name & role */}
              <div className="flex flex-col gap-0.5 pt-2">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {item.author}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  {item.role}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
