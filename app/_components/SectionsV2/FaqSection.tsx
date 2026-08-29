"use client";
import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Briefcase,
  Code2,
  Target,
  Globe,
  Mail,
  ChevronRight,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type FaqItem = {
  icon: React.ElementType;
  question: string;
  answer: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SECTION_DESCRIPTION =
  "Got questions? Here are some of the most common things people ask about my work, background, and availability. Click any question to read the answer.";

const FAQ_ITEMS: FaqItem[] = [
  {
    icon: Briefcase,
    question: "Are you currently available for work?",
    answer:
      "Yes! I graduated in 2026 and am actively seeking my first software engineering role. I'm ready to contribute from day one — whether that means diving into a codebase, collaborating with a team, or picking up a new tool the job demands.",
  },
  {
    icon: Code2,
    question: "What technologies do you primarily work with?",
    answer:
      "My core stack spans the web — React and Next.js on the frontend, Python (Flask) and PHP (Laravel) on the backend, with PostgreSQL and MySQL for databases. I also have hands-on exposure to Microsoft Azure, Docker, CI/CD with GitHub Actions, and TypeScript across most of my recent projects.",
  },
  {
    icon: Target,
    question: "What kind of role are you looking for?",
    answer:
      "I'm looking for an entry-level software engineering role, ideally in full-stack or backend development. I'm open to both product companies and service-oriented environments — what matters most to me is a team I can learn from and real problems worth solving.",
  },
  {
    icon: Globe,
    question: "Are you open to remote or hybrid work?",
    answer:
      "Absolutely. I'm comfortable working remotely, in-person, or in a hybrid setup. I'm based in Mandaluyong, Philippines, and am open to both local and international opportunities depending on the role.",
  },
  {
    icon: Mail,
    question: "How can I get in touch with you?",
    answer:
      "The best way to reach me is through the Contact page on this site, or by connecting with me on LinkedIn. I try to respond within a few days — I genuinely appreciate every message.",
  },
];

// ── Shared row button ─────────────────────────────────────────────────────────

type RowProps = {
  item: FaqItem;
  isSelected: boolean;
  onClick: () => void;
};

const QuestionRow = ({ item, isSelected, onClick }: RowProps) => {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex items-center gap-3 py-4 px-3 w-full text-left",
        "border-t border-slate-200 dark:border-slate-800",
        "cursor-pointer transition-colors duration-200",
        isSelected
          ? "text-rose-800 dark:text-rose-500 bg-rose-50/60 dark:bg-rose-950/20"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100",
      ].join(" ")}
    >
      <Icon size={15} className="shrink-0" />
      <span className="flex-1 text-sm font-medium">{item.question}</span>
      <ChevronRight
        size={15}
        className={[
          "shrink-0 transition-transform duration-200",
          isSelected
            ? "rotate-90 text-rose-800 dark:text-rose-500"
            : "group-hover:translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
};

// ── FaqSection ────────────────────────────────────────────────────────────────

// FaqSection: Split layout on md+, single-column with modal on mobile.
// Left: FAQ badge + active answer (or default description).
// Right: clickable question rows with HelpCircle header icon.
export const FaqSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const selected = selectedIndex !== null ? FAQ_ITEMS[selectedIndex] : null;
  const modalItem = modalIndex !== null ? FAQ_ITEMS[modalIndex] : null;

  const toggle = (i: number) =>
    setSelectedIndex((prev) => (prev === i ? null : i));

  return (
    <section className="w-full h-auto px-6 pb-8 max-w-5xl mx-auto">
      {/* ── Desktop / Tablet: split layout ────────────────────────────────── */}
      <div className="hidden md:flex flex-row min-h-80">
        {/* Left column — badge + answer */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 pr-10 flex flex-col justify-center gap-4"
        >
          <span
            className="
              w-fit px-3 py-1 rounded-xl
              bg-rose-800 text-white
              text-xs font-bold tracking-widest uppercase select-none
            "
          >
            FAQ
          </span>

          <p
            className="
              text-lg text-gray-700 dark:text-gray-400
              leading-relaxed
              transition-all duration-300
            "
          >
            {selected ? selected.answer : SECTION_DESCRIPTION}
          </p>
        </motion.div>

        {/* Vertical divider */}
        <div className="w-px bg-slate-200 dark:bg-slate-800 self-stretch" />

        {/* Right column — question rows */}
        <div className="flex-1 pl-8 flex flex-col">
          {/* Icon header */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pb-4 flex items-center gap-2 text-slate-400 dark:text-slate-600"
          >
            <HelpCircle size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Questions
            </span>
          </motion.div>

          {/* Rows */}
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            >
              <QuestionRow
                item={item}
                isSelected={selectedIndex === i}
                onClick={() => toggle(i)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile: single column + modal ─────────────────────────────────── */}
      <div className="flex flex-col md:hidden gap-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <span
            className="
              w-fit px-3 py-1 rounded-xl
              bg-rose-800 text-white
              text-xs font-bold tracking-widest uppercase select-none
            "
          >
            FAQ
          </span>
          <p className="text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>
        </motion.div>

        {/* Question list */}
        <div className="flex flex-col">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            >
              <QuestionRow
                item={item}
                isSelected={false}
                onClick={() => setModalIndex(i)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile modal ──────────────────────────────────────────────────── */}
      {modalItem && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
            md:hidden
          "
          onClick={() => setModalIndex(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative overflow-hidden
              w-[90%] max-w-sm
              rounded-xl
              border border-slate-300 dark:border-slate-800
              backdrop-blur-md
              bg-slate-50 dark:bg-slate-950
              p-6
            "
          >
            {/* Glass glow */}
            <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

            {/* Modal header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <p className="text-sm font-bold  leading-snug">
                {modalItem.question}
              </p>
              <button
                type="button"
                onClick={() => setModalIndex(null)}
                className="shrink-0 p-1 text-slate-400 hover:text-rose-800 dark:hover:text-rose-500 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Answer */}
            <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
              {modalItem.answer}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
