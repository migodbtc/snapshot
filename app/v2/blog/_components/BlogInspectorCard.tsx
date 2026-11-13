"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatBlogDate, type BlogItem } from "../constants";

interface BlogInspectorCardProps {
  post: BlogItem;
  currentIndex: number;
  totalCount: number;
  onNext: () => void;
  onPrev: () => void;
}

export function BlogInspectorCard({
  post,
  currentIndex,
  totalCount,
  onNext,
  onPrev,
}: BlogInspectorCardProps) {
  const [copied, setCopied] = useState(false);
  const formatted = formatBlogDate(post.datetime);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/blog?post=${post.id}`;
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full lg:sticky lg:top-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex flex-col gap-6 select-none transition-all duration-300"
        >
          {/* Metadata Grid */}
          <div className="flex flex-col gap-3.5 text-xs sm:text-sm">
            {/* Topic / Genre */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Topic</span>
              </div>
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-400 border border-white/5">
                {post.topic}
              </span>
            </div>

            {/* Read Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Read Time</span>
              </div>
              <span className="font-mono text-xs text-slate-200">
                {post.read_time}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Date</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs text-slate-200">
                  {formatted.date}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {formatted.time} PHT
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions: Share / Copy Link & Stepper Navigation */}
          <div className="flex items-center justify-between gap-3 pt-1">
            {/* Prev / Next navigation buttons */}
            <button
              type="button"
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5"
              title="Previous post"
              aria-label="Previous post"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={currentIndex === totalCount - 1}
              className="p-2 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5"
              title="Next post"
              aria-label="Next post"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
