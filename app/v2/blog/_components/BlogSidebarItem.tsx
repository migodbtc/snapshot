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
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.2),
        ease: "easeOut",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`w-full group transition-opacity duration-200 ${
        hasAnyHover && !isHovered ? "opacity-40" : "opacity-100"
      }`}
    >
      {/* Blog Title button with underline indicator, without numbering */}
      <button
        type="button"
        onClick={onSelect}
        className={`w-full text-left transition-all duration-200 cursor-pointer select-none underline underline-offset-4 text-xs sm:text-[13px] ${
          isSelected
            ? "text-white font-semibold decoration-rose-500 decoration-2"
            : isHovered
              ? "text-white decoration-slate-300 decoration-1"
              : "text-neutral-300 hover:text-white decoration-transparent hover:decoration-slate-400"
        }`}
      >
        <span className="line-clamp-2 leading-relaxed">{item.title}</span>
      </button>
    </motion.div>
  );
}
