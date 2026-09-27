"use client";

import { motion } from "framer-motion";
import type { BlogItem } from "../constants";

interface BlogSidebarItemProps {
  item: BlogItem;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  hasAnyHover: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}

export function BlogSidebarItem({
  item,
  index,
  isSelected,
  isHovered,
  hasAnyHover,
  onSelect,
  onHover,
  onLeave,
}: BlogSidebarItemProps) {
  const isFocused = isHovered || (!hasAnyHover && isSelected);
  const indexLabel = item.id === "intro" ? "00" : `0${item.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.25),
        ease: "easeOut",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`flex items-start gap-2.5 sm:gap-3 group transition-opacity duration-300 ${
        hasAnyHover && !isHovered ? "opacity-40" : "opacity-100"
      }`}
    >
      {/* Index Column on the left */}
      <div className="w-7 shrink-0 flex items-center justify-end font-mono text-xs select-none pt-0.5">
        <span
          className={`tracking-wider transition-colors ${
            isFocused ? "text-rose-500 font-bold" : "text-slate-500"
          }`}
        >
          {indexLabel}
        </span>
      </div>

      {/* Blog Title button with underline focus indicator */}
      <button
        type="button"
        onClick={onSelect}
        className={`text-left transition-all duration-200 cursor-pointer select-none underline underline-offset-4 text-xs sm:text-[13px] flex items-baseline gap-2 ${
          isSelected
            ? "text-white font-semibold decoration-rose-500 decoration-2"
            : isHovered
              ? "text-slate-100 decoration-slate-300 decoration-1"
              : "text-slate-400 hover:text-slate-200 decoration-slate-600 hover:decoration-slate-300 decoration-1"
        }`}
      >
        <span className="line-clamp-2 leading-relaxed">{item.title}</span>
      </button>
    </motion.div>
  );
}
