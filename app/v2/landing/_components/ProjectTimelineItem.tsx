"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/constants/projects";

interface ProjectTimelineItemProps {
  project: Project;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  hasAnyHover: boolean;
  isLatestOfYear: boolean;
  year: string;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}

export function ProjectTimelineItem({
  project,
  index,
  isSelected,
  isHovered,
  hasAnyHover,
  isLatestOfYear,
  year,
  onSelect,
  onHover,
  onLeave,
}: ProjectTimelineItemProps) {
  const isFocused = isHovered || (!hasAnyHover && isSelected);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20px", once: true }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.3),
        ease: "easeOut",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`flex items-center gap-2.5 sm:gap-3 group transition-opacity duration-300 ${
        hasAnyHover && !isHovered ? "opacity-40" : "opacity-100"
      }`}
    >
      {/* Mini column on the left: Year on the latest project of that year, otherwise a single line */}
      <div className="w-10 shrink-0 flex items-center justify-end font-mono text-xs sm:text-sm select-none">
        {isLatestOfYear ? (
          <span
            className={`font-semibold tracking-wider transition-colors ${
              isFocused ? "text-rose-500 font-bold" : "text-slate-400"
            }`}
          >
            {year}
          </span>
        ) : (
          <span
            className={`tracking-widest transition-colors ${
              isFocused ? "text-rose-500 font-bold" : "text-slate-600"
            }`}
          >
            &mdash;
          </span>
        )}
      </div>

      {/* Project Name formatted with underline and focus indicator */}
      <button
        type="button"
        onClick={onSelect}
        className={`text-left transition-all duration-200 cursor-pointer select-none underline underline-offset-4 text-base sm:text-lg flex items-center gap-2 ${
          isSelected
            ? "text-white font-bold decoration-rose-500 decoration-2"
            : isHovered
              ? "text-slate-100 decoration-slate-300 decoration-1"
              : "text-slate-400 hover:text-slate-200 decoration-slate-600 hover:decoration-slate-300 decoration-1"
        }`}
      >
        <span>{project.projectName}</span>
        {isSelected && (
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] shrink-0" />
        )}
      </button>
    </motion.div>
  );
}
