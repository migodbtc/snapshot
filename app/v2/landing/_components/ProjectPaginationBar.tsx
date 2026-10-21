"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPaginationBarProps {
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  selectedProjectNumber: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
  className?: string;
}

export function ProjectPaginationBar({
  currentPage,
  totalPages,
  totalProjects,
  selectedProjectNumber,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onPageSelect,
  className = "",
}: ProjectPaginationBarProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-neutral-900/80 border border-white/5 select-none ${className}`}
    >
      {/* Left: Active Project Indicator */}
      <div className="flex items-center gap-1.5 font-mono text-xs">
        <span className="text-rose-500 font-bold">
          {String(selectedProjectNumber).padStart(2, "0")}
        </span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400">
          {String(totalProjects).padStart(2, "0")}
        </span>
      </div>

      {/* Center: Page Jump Pills */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageSelect(page)}
              className={`w-5 h-5 rounded-md font-mono text-[11px] flex items-center justify-center transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-rose-600 text-white font-bold shadow-[0_0_8px_rgba(225,29,72,0.4)]"
                  : "text-slate-500 hover:text-slate-300 hover:bg-neutral-800"
              }`}
              title={`Go to page ${page}`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Right: Prev / Next Steppers */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Previous project"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Next project"
          aria-label="Next project"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
