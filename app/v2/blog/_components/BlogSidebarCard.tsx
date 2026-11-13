"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogItem } from "../constants";
import { BlogSidebarItem } from "./BlogSidebarItem";

interface BlogSidebarCardProps {
  introPost: BlogItem;
  posts: BlogItem[];
  selectedId: number | "intro";
  hoveredId: number | "intro" | null;
  onSelect: (id: number | "intro") => void;
  onHover: (id: number | "intro") => void;
  onLeave: () => void;
  className?: string;
}

export function BlogSidebarCard({
  introPost,
  posts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  onLeave,
  className = "",
}: BlogSidebarCardProps) {
  const ENTRIES_PER_PAGE = 5;
  const totalPages = Math.ceil(posts.length / ENTRIES_PER_PAGE);

  // Determine initial page based on active post if selected
  const activePostIndex = posts.findIndex((p) => p.id === selectedId);
  const initialPage =
    activePostIndex !== -1
      ? Math.floor(activePostIndex / ENTRIES_PER_PAGE) + 1
      : 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [prevSelectedId, setPrevSelectedId] = useState(selectedId);

  // Keep pagination aligned if selectedId changes from an external source (e.g. next/prev post button or URL)
  if (selectedId !== prevSelectedId) {
    setPrevSelectedId(selectedId);
    if (activePostIndex !== -1) {
      setCurrentPage(Math.floor(activePostIndex / ENTRIES_PER_PAGE) + 1);
    }
  }

  const pagedPosts = posts.slice(
    (currentPage - 1) * ENTRIES_PER_PAGE,
    currentPage * ENTRIES_PER_PAGE,
  );

  const isIntroSelected = selectedId === introPost.id;

  return (
    <div
      className={`w-full rounded-2xl sm:rounded-3xl bg-neutral-900/70 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col gap-4 select-none lg:sticky lg:top-28 ${className}`}
    >
      {/* 1. Welcome to Snapshot Blog — Clean Card Title Header (no active badge, no currently reading text) */}
      <button
        type="button"
        onClick={() => onSelect(introPost.id)}
        onMouseEnter={() => onHover(introPost.id)}
        onMouseLeave={onLeave}
        className="w-full text-left group transition-all duration-200 cursor-pointer select-none"
      >
        <h2
          className={`text-base sm:text-lg font-bold tracking-tight transition-colors line-clamp-2 ${
            isIntroSelected
              ? "text-white underline decoration-rose-500 decoration-2 underline-offset-4"
              : "text-neutral-200 group-hover:text-rose-400 group-hover:underline underline-offset-4 decoration-white/20"
          }`}
        >
          {introPost.title}
        </h2>
      </button>

      {/* 2. Sleek Divider matching Landing Skills section */}
      <div className="w-full border-b border-white/10" />

      {/* 3. Paginated Entries List (Strictly 5 per page, unnumbered in darker form of white) */}
      <div className="flex flex-col gap-3 py-1">
        {pagedPosts.map((item, idx) => {
          const overallIndex = (currentPage - 1) * ENTRIES_PER_PAGE + idx + 1;
          return (
            <BlogSidebarItem
              key={item.id}
              item={item}
              index={overallIndex}
              isSelected={item.id === selectedId}
              isHovered={hoveredId === item.id}
              hasAnyHover={hoveredId !== null}
              onSelect={() => onSelect(item.id)}
              onHover={() => onHover(item.id)}
              onLeave={onLeave}
            />
          );
        })}
      </div>

      {/* 4. Pagination Bar: Current page over all pages in muted gray */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10 font-mono text-xs select-none">
          {/* Left: Page Number over All Pages in uniform muted gray */}
          <span className="text-neutral-400">
            {currentPage} / {totalPages}
          </span>

          {/* Center: Page Jump Pills */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`w-5 h-5 rounded-md font-mono text-[11px] flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === pg
                    ? "bg-rose-600 text-white font-bold shadow-[0_0_8px_rgba(225,29,72,0.4)]"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
                title={`Go to page ${pg}`}
                aria-label={`Go to page ${pg}`}
              >
                {pg}
              </button>
            ))}
          </div>

          {/* Right: Prev / Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Previous page"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Next page"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
