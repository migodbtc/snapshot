"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/constants/blog";

// ── Config ────────────────────────────────────────────────────────────────────

// Latest posts first, cap at 4 on desktop and 3 on mobile (handled via CSS)
const LATEST_POSTS = [...BLOG_POSTS]
  .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
  .slice(0, 4);

const SECTION_DESCRIPTION =
  "An excerpt of my writing — thoughts on career, technology, and the craft of software engineering. Click a card above to preview its content.";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  });
}

// ── BlogMiniCard ──────────────────────────────────────────────────────────────

type MiniCardProps = {
  post: BlogPost;
  index: number;
  isSelected: boolean;
  onClick: () => void;
};

const BlogMiniCard = ({ post, index, isSelected, onClick }: MiniCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "group relative overflow-hidden rounded-xl cursor-pointer h-full",
      "border backdrop-blur-md flex flex-col p-4 gap-2 text-left",
      "transition-all duration-300 min-w-0 w-full",
      isSelected
        ? "border-rose-400 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20 shadow-sm shadow-rose-900/10"
        : "border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 hover:border-slate-400 dark:hover:border-slate-700",
    ].join(" ")}
  >
    {/* Glass radial glow */}
    <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

    {/* Index badge */}
    <span className="text-[10px] font-bold text-rose-800 dark:text-rose-500 uppercase tracking-wider select-none">
      {String(index + 1).padStart(2, "0")}
    </span>

    {/* Title — clamped to 2 lines */}
    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
      {post.title}
    </h4>

    {/* Date + tag row */}
    <div className="flex items-center gap-2 flex-wrap mt-auto">
      <span className="text-[10px] text-slate-500 dark:text-slate-500">
        {fmtDate(post.datetime)}
      </span>
      <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">
        {post.topic}
      </span>
    </div>
  </button>
);

// ── BlogPreviewSection ────────────────────────────────────────────────────────

export const BlogPreviewSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = LATEST_POSTS[selectedIndex];

  return (
    <section className="w-full h-auto px-6 py-16 max-w-5xl mx-auto">

      {/* ── Section header (Projects-style badge + description) ──────── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-row gap-2 items-center mb-6"
      >
        <span
          className="
            w-fit px-3 py-1 rounded-xl
            bg-rose-800 text-white
            text-xs font-bold tracking-widest uppercase select-none
          "
        >
          Blog
        </span>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Recent excerpts from my writing
        </p>
      </motion.div>

      {/* ── Blog card row ──────────────────────────────────────────────── */}
      {/* Desktop: show 4 cards. Mobile: show 3 cards (last hidden) */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-10">
        {LATEST_POSTS.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className={[i === 3 ? "hidden md:block" : "", "h-full"].join(" ")}
          >
            <BlogMiniCard
              post={post}
              index={i}
              isSelected={selectedIndex === i}
              onClick={() => setSelectedIndex(i)}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Split layout: info (left) + content preview (right) ─────── */}
      <div className="flex flex-col md:flex-row gap-0 md:min-h-64">

        {/* Left column — badge + contextual description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center gap-4 pr-0 md:pr-10 pb-6 md:pb-0"
        >
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
            <BookOpen size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Preview
            </span>
          </div>

          <p className="text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>

          <Link
            href="/blog"
            className="w-fit text-sm italic text-gray-600 dark:text-gray-500 font-semibold flex flex-row gap-2 items-center hover:underline cursor-pointer uppercase"
          >
            <span>Visit Blog</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden md:block w-px bg-slate-200 dark:bg-slate-800 self-stretch" />

        {/* Horizontal divider (mobile only) */}
        <div className="md:hidden w-full h-px bg-slate-200 dark:bg-slate-800 mb-6" />

        {/* Right column — blog content preview */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 pl-0 md:pl-10 flex flex-col gap-3"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
            {selected.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
            <span>{fmtDate(selected.datetime)}</span>
            <span>·</span>
            <span>{selected.read_time}</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">
              {selected.topic}
            </span>
          </div>

          {/* Content preview — clamped with fade-out mask */}
          <div className="relative max-h-40 overflow-hidden">
            <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {selected.excerpt}
            </p>
            {/* Gradient fade-out at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
          </div>

          <Link
            href={`/blog/${selected.id - 1}`}
            className="
              w-fit flex items-center gap-1.5
              text-sm font-semibold
              text-rose-800 dark:text-rose-500
              hover:text-rose-600 dark:hover:text-rose-400
              transition-colors
            "
          >
            Read full post
            <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
