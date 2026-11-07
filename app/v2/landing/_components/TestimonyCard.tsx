"use client";

import { motion } from "framer-motion";
import type { TestimonyItem } from "../constants";

interface TestimonyCardProps {
  item: TestimonyItem;
  index: number;
  onSelect: () => void;
}

export function TestimonyCard({ item, index, onSelect }: TestimonyCardProps) {
  const isClickable = !item.isPlaceholder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      onClick={() => {
        if (isClickable) onSelect();
      }}
      className={`group relative aspect-auto sm:aspect-4/3 w-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-2xl select-none transition-[border-color,background-color,box-shadow,transform] duration-300 ${
        isClickable
          ? "bg-neutral-900 border border-white/10 hover:border-white/25 hover:scale-[1.02] shadow-black/60 cursor-pointer"
          : "bg-neutral-900/40 border border-white/5 shadow-black/30 opacity-40 cursor-default"
      }`}
    >
      {/* Top: Card Title & Index Number */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.45,
          delay: index * 0.08 + 0.05,
          ease: "easeOut",
        }}
        className="w-full flex items-start justify-between gap-3 shrink-0"
      >
        <h3
          className={`text-base sm:text-xl font-bold tracking-tight transition-colors ${
            isClickable
              ? "text-white group-hover:text-rose-600"
              : "text-slate-500"
          }`}
        >
          {item.title}
        </h3>
        <span className="font-mono text-xs text-slate-600 shrink-0 pt-0.5">0{item.id}</span>
      </motion.div>

      {/* Middle: Quote Text (Centered vertically in higher widths) */}
      <div className="my-auto py-2 sm:py-3 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.45,
            delay: index * 0.08 + 0.1,
            ease: "easeOut",
          }}
          className={`text-sm sm:text-[15px] font-normal leading-relaxed line-clamp-4 ${
            isClickable ? "text-slate-300 text-justify" : "text-slate-600"
          }`}
        >
          {item.isPlaceholder ? "—" : `“${item.quote}”`}
        </motion.p>
      </div>

      {/* Bottom: Attribution */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.45,
          delay: index * 0.08 + 0.15,
          ease: "easeOut",
        }}
        className="pt-2 border-t border-white/5 flex items-center justify-between shrink-0"
      >
        <div className="flex flex-col">
          <span
            className={`text-xs font-semibold tracking-wide ${
              isClickable ? "text-white" : "text-slate-500"
            }`}
          >
            {item.author}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {item.organization}
          </span>
        </div>
        {isClickable && (
          <span className="text-[11px] font-mono text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Expand ↗
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
