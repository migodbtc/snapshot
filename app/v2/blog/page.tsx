"use client";

import { useState, useTransition, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SnapshotLoadingScreen } from "@/app/_components/SnapshotLoadingScreen";
import { V2Navbar } from "../_components/V2Navbar";
import {
  ALL_BLOG_ITEMS,
  INTRO_POST,
  SORTED_BLOG_POSTS,
  type BlogItem,
} from "./constants";
import { BlogSidebarCard } from "./_components/BlogSidebarCard";
import { BlogReaderContent } from "./_components/BlogReaderContent";
import { BlogInspectorCard } from "./_components/BlogInspectorCard";
import { BlogMobileAccordion } from "./_components/BlogMobileAccordion";

function BlogPageContent() {
  const searchParams = useSearchParams();
  const initialPostParam = searchParams.get("post");
  const [, startTransition] = useTransition();

  // Find initial item matching query parameter, fallback to intro
  const initialItem = initialPostParam
    ? ALL_BLOG_ITEMS.find((b) => String(b.id) === initialPostParam) ||
      ALL_BLOG_ITEMS[0]
    : ALL_BLOG_ITEMS[0];

  const [selectedId, setSelectedId] = useState<number | "intro">(
    initialItem.id,
  );
  const [hoveredId, setHoveredId] = useState<number | "intro" | null>(null);

  const currentIndex = ALL_BLOG_ITEMS.findIndex((b) => b.id === selectedId);
  const activePost: BlogItem =
    currentIndex !== -1 ? ALL_BLOG_ITEMS[currentIndex] : ALL_BLOG_ITEMS[0];

  const handleSelect = (id: number | "intro") => {
    startTransition(() => {
      setSelectedId(id);
    });
  };

  // Navigation strictly between published blog posts (excluding welcome/intro)
  const currentPostIndex = SORTED_BLOG_POSTS.findIndex(
    (b) => b.id === selectedId,
  );

  const handleNextPost = () => {
    if (
      currentPostIndex !== -1 &&
      currentPostIndex < SORTED_BLOG_POSTS.length - 1
    ) {
      handleSelect(SORTED_BLOG_POSTS[currentPostIndex + 1].id);
    }
  };

  const handlePrevPost = () => {
    if (currentPostIndex > 0) {
      handleSelect(SORTED_BLOG_POSTS[currentPostIndex - 1].id);
    }
  };

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen bg-neutral-950 overflow-x-hidden">
      {/* Top Navbar Header */}
      <div className="relative z-20 w-full">
        <V2Navbar />
      </div>

      <div className="relative z-10 w-full px-8 md:px-12 py-10 sm:py-16 flex flex-col justify-start">
        {/* ROW 1: Signature White-Red Header with Right-Aligned Description */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-4 sm:pb-12"
        >
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Snapshot <span className="text-rose-600">Blogs</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed md:text-right max-w-sm sm:max-w-md">
            An online public digital archive for me to write anything in
            relation to career, software engineer, or my general perspective
            regarding the software industry.
          </p>
        </motion.div>

        {/* ROW 2: 3 / 9 Grid Split (Sidebar + Reader/Inspector) */}
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Lesser Column (3 cols): Desktop Dashboard Sidebar Card (hidden on mobile/tablet) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col">
            <BlogSidebarCard
              introPost={INTRO_POST}
              posts={SORTED_BLOG_POSTS}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={handleSelect}
              onHover={(id) => setHoveredId(id)}
              onLeave={() => setHoveredId(null)}
            />
          </div>

          {/* Bigger Column (9 cols): Divided into Reader (Left) + Inspector (Right) */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Mobile / Tablet Accordion Dropdown (Non-sticky, in-flow) */}
            <div className="col-span-1 lg:hidden w-full">
              <BlogMobileAccordion
                activePost={activePost}
                introPost={INTRO_POST}
                posts={SORTED_BLOG_POSTS}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </div>

            {/* Left Inner Column: Full Blog Post Reader (Bounded width with ChatGPT-style reading margin) */}
            <div className="w-full min-h-[500px] transition-all duration-300 lg:col-span-8 max-w-3xl">
              <BlogReaderContent post={activePost} />
            </div>

            {/* Right Inner Column: Sticky Metadata Inspector Card (hidden on welcome post) */}
            {!activePost.isIntro && (
              <div className="lg:col-span-4 w-full">
                <BlogInspectorCard
                  post={activePost}
                  currentIndex={currentPostIndex}
                  totalCount={SORTED_BLOG_POSTS.length}
                  onNext={handleNextPost}
                  onPrev={handlePrevPost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function V2BlogPage() {
  return (
    <Suspense fallback={<SnapshotLoadingScreen message="Loading Snapshot Blogs..." />}>
      <BlogPageContent />
    </Suspense>
  );
}
