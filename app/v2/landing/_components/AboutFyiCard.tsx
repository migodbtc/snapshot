"use client";

import { motion } from "framer-motion";
import type { AboutFyiCardData } from "../constants";

interface AboutFyiCardProps {
  card: AboutFyiCardData;
  index: number;
  isHovered: boolean;
  hasAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export function AboutFyiCard({
  card,
  index,
  isHovered,
  hasAnyHovered,
  onHover,
  onLeave,
}: AboutFyiCardProps) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-30px", once: true }}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.1,
        ease: "easeOut",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`w-full sm:w-[185px] xl:w-[195px] h-[105px] p-4 rounded-2xl backdrop-blur-xl transition-all duration-300 cursor-default select-none flex flex-col justify-between ${
        isHovered
          ? "bg-slate-900/40 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.18)] scale-[1.03] opacity-100"
          : hasAnyHovered
            ? "bg-slate-900/10 border border-transparent opacity-50"
            : "bg-slate-900/15 border border-white/5 opacity-100 hover:scale-[1.02]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {card.label}
        </span>
        <Icon
          className={`w-4 h-4 shrink-0 transition-colors ${
            isHovered ? "text-rose-400" : "text-rose-500/80"
          }`}
        />
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
}
