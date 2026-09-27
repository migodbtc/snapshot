"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { TestimonyItem } from "../constants";

interface TestimonyModalProps {
  activeTestimony: TestimonyItem | null;
  onClose: () => void;
}

export function TestimonyModal({
  activeTestimony,
  onClose,
}: TestimonyModalProps) {
  return (
    <AnimatePresence>
      {activeTestimony && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-neutral-900 border border-white/15 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black flex flex-col gap-6 z-10"
          >
            {/* Top Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-rose-500 uppercase tracking-wider">
                  0{activeTestimony.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeTestimony.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Quote */}
            <div className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed text-justify py-5">
              &ldquo;{activeTestimony.quote}&rdquo;
            </div>

            {/* Attribution */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white tracking-wide">
                {activeTestimony.author}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {activeTestimony.organization}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
