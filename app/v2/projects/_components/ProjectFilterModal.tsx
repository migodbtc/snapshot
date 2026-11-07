"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";

interface ProjectFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: string;
  onSelectYear: (year: string) => void;
  availableYears: string[];
  selectedPlatform: "all" | "web" | "mobile" | "web&mobile";
  onSelectPlatform: (platform: "all" | "web" | "mobile" | "web&mobile") => void;
  selectedTech: string;
  onSelectTech: (tech: string) => void;
  availableTechs: string[];
  activeFiltersCount: number;
  onReset: () => void;
  totalMatches: number;
}

export function ProjectFilterModal({
  isOpen,
  onClose,
  selectedYear,
  onSelectYear,
  availableYears,
  selectedPlatform,
  onSelectPlatform,
  selectedTech,
  onSelectTech,
  availableTechs,
  activeFiltersCount,
  onReset,
  totalMatches,
}: ProjectFilterModalProps) {
  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-neutral-900 border border-white/15 p-6 sm:p-8 shadow-2xl shadow-black flex flex-col gap-6 z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="w-5 h-5 text-rose-500 shrink-0" />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close filter modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="flex flex-col gap-6">
              {/* 1. Year Filter */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold select-none">
                  Year
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectYear("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer select-none border ${
                      selectedYear === "all"
                        ? "bg-rose-950/40 border-rose-500 text-white font-semibold shadow-sm"
                        : "bg-neutral-800/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    ALL
                  </button>
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => onSelectYear(yr)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer select-none border ${
                        selectedYear === yr
                          ? "bg-rose-950/40 border-rose-500 text-white font-semibold shadow-sm"
                          : "bg-neutral-800/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Platform Filter */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold select-none">
                  Platform
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "ALL", value: "all" },
                    { label: "Web", value: "web" },
                    { label: "Mobile", value: "mobile" },
                    { label: "Web & Mobile", value: "web&mobile" },
                  ].map((plat) => (
                    <button
                      key={plat.value}
                      type="button"
                      onClick={() =>
                        onSelectPlatform(
                          plat.value as
                            | "all"
                            | "web"
                            | "mobile"
                            | "web&mobile",
                        )
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer select-none border ${
                        selectedPlatform === plat.value
                          ? "bg-rose-950/40 border-rose-500 text-white font-semibold shadow-sm"
                          : "bg-neutral-800/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {plat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Technology Filter */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold select-none">
                  Technology
                </span>
                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1">
                  <button
                    type="button"
                    onClick={() => onSelectTech("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer select-none border ${
                      selectedTech === "all"
                        ? "bg-rose-950/40 border-rose-500 text-white font-semibold shadow-sm"
                        : "bg-neutral-800/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    ALL
                  </button>
                  {availableTechs.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => onSelectTech(tech)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer select-none border ${
                        selectedTech === tech
                          ? "bg-rose-950/40 border-rose-500 text-white font-semibold shadow-sm"
                          : "bg-neutral-800/60 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400">
                  {totalMatches} {totalMatches === 1 ? "project" : "projects"} found
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
