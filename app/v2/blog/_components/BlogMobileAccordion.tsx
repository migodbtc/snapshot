"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import type { BlogItem } from "../constants";

interface BlogMobileAccordionProps {
  activePost?: BlogItem;
  introPost: BlogItem;
  posts: BlogItem[];
  selectedId: number | "intro";
  onSelect: (id: number | "intro") => void;
  className?: string;
}

export function BlogMobileAccordion({
  activePost: _activePost,
  introPost,
  posts,
  selectedId,
  onSelect,
  className = "",
}: BlogMobileAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Group entries in pages of 5
  const ENTRIES_PER_PAGE = 5;
  const totalPages = Math.ceil(posts.length / ENTRIES_PER_PAGE);

  // Determine which page contains the active post
  const activePostIndex = posts.findIndex((p) => p.id === selectedId);
  const initialPage =
    activePostIndex !== -1
      ? Math.floor(activePostIndex / ENTRIES_PER_PAGE) + 1
      : 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [prevActivePostIndex, setPrevActivePostIndex] =
    useState(activePostIndex);

  // Keep page aligned when selectedId changes externally without effect
  if (activePostIndex !== prevActivePostIndex) {
    setPrevActivePostIndex(activePostIndex);
    if (activePostIndex !== -1) {
      setCurrentPage(Math.floor(activePostIndex / ENTRIES_PER_PAGE) + 1);
    }
  }

  const pagedPosts = posts.slice(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    currentPage * ENTRIES_PER_PAGE,
  );

  const handleSelectPost = (id: number | "intro") => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className={`w-full bg-transparent border-0 select-none ${className}`}>
      {/* 1. Navigation Header + Chevron Toggle with neutral border */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full pb-3 sm:pb-3.5 pt-1 flex items-center justify-between cursor-pointer text-left border-b border-neutral-800 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col min-w-0 pr-4">
          <h2 className="text-base sm:text-lg font-bold text-neutral-400 tracking-wider">
            NAVIGATION
          </h2>
        </div>

        {/* Bare Chevron Toggle without background box */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-neutral-500 hover:text-neutral-300 transition-colors shrink-0"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
      </button>

      {/* 2. Extended Content without modal/padding, transparent background */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col pt-3"
          >
            {/* Top Welcome Title (Clean title button, no badge/pulsing dot) */}
            <div className="py-2 flex flex-col">
              <button
                type="button"
                onClick={() => handleSelectPost(introPost.id)}
                className={`w-full p-2.5 sm:p-3 rounded-xl transition-all flex items-center justify-between text-left cursor-pointer ${
                  selectedId === introPost.id
                    ? "bg-rose-950/40 border border-rose-500/50 text-white font-semibold"
                    : "hover:bg-neutral-900/80 text-neutral-300 hover:text-white"
                }`}
              >
                <span className="text-sm sm:text-base font-bold truncate">
                  {introPost.title}
                </span>
              </button>
            </div>

            {/* Divider matching Skills in landing */}
            <div className="w-full border-b border-white/10 my-2" />

            {/* Entries Section (Entries header removed) */}
            <div className="py-1 flex flex-col gap-2">
              {/* Paginated list of latest 5 entries */}
              <div className="flex flex-col gap-1.5">
                {pagedPosts.map((post) => {
                  const isCurrent = selectedId === post.id;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => handleSelectPost(post.id)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl transition-all flex items-center justify-between gap-3 text-left cursor-pointer ${
                        isCurrent
                          ? "bg-rose-950/30 border border-rose-500/40 text-white font-medium"
                          : "hover:bg-neutral-900/80 text-neutral-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm truncate font-medium">
                            {post.title}
                          </span>
                          <div className="flex items-center gap-2 pt-0.5 text-[11px] font-mono text-neutral-500">
                            <span className="text-neutral-400">{post.topic}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.read_time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Small Pagination Nav at bottom of accordion */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2 border-t border-white/10 px-1 font-mono text-xs text-neutral-400">
                  <span className="text-neutral-400 text-xs">
                    {currentPage} / {totalPages}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="p-1 px-1.5 rounded-lg hover:text-white hover:bg-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label="Previous entries"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pg) => (
                          <button
                            key={pg}
                            type="button"
                            onClick={() => setCurrentPage(pg)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors cursor-pointer ${
                              currentPage === pg
                                ? "bg-rose-600 text-white font-bold"
                                : "hover:bg-neutral-900 text-neutral-400 hover:text-white"
                            }`}
                          >
                            {pg}
                          </button>
                        ),
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="p-1 px-1.5 rounded-lg hover:text-white hover:bg-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label="Next entries"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
