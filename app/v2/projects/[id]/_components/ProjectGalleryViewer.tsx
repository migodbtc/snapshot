"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Smartphone, Eye } from "lucide-react";
import type { ProjectPicture } from "@/lib/constants/projects";

interface ProjectGalleryViewerProps {
  images: ProjectPicture[];
  projectName: string;
}

function formatImageCaption(path: string): string {
  const filename = path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "";
  const customMap: Record<string, string> = {
    projectIndex: "Study Cockpit & Telemetry",
    conversation: "Conversational Theory Tutoring",
    quizzes: "Synthesized Quizzes Catalog",
    mixedStart: "Spaced Retrieval Session Launch",
    mixedMultipleChoice: "Multiple Choice Active Recall",
    mixedMatching: "Polymorphic Matching Quiz",
    mixedFill: "Fill-in-the-Blank Challenge",
    mixedResults: "Real-time Telemetry & Grading",
    mixedHistory: "Attempt Persistence History",
    records: "Cognitive Mastery Records",
    auth: "Authentication Portal",
  };

  if (customMap[filename]) return customMap[filename];

  return filename
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ProjectGalleryViewer({
  images,
  projectName,
}: ProjectGalleryViewerProps) {
  const webImages = images.filter((img) => img.orientation === "landscape");
  const mobileImages = images.filter((img) => img.orientation === "portrait");

  const hasWeb = webImages.length > 0;
  const hasMobile = mobileImages.length > 0;

  // Default to web if available, otherwise mobile
  const [activeTab, setActiveTab] = useState<"web" | "mobile">(
    hasWeb ? "web" : "mobile",
  );

  const [webSelectedIndex, setWebSelectedIndex] = useState(0);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState(0);

  const isPortrait = activeTab === "mobile";
  const activeImages = isPortrait ? mobileImages : webImages;
  const selectedIndex = isPortrait ? mobileSelectedIndex : webSelectedIndex;
  const setSelectedIndex = isPortrait
    ? setMobileSelectedIndex
    : setWebSelectedIndex;

  const safeImages =
    activeImages.length > 0
      ? activeImages
      : images.length > 0
        ? images
        : [
            {
              imageRef: "/newheroimage.jpg",
              orientation: "landscape" as const,
              thumbnail: true,
            },
          ];

  const currentImage = safeImages[selectedIndex] || safeImages[0];

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 select-none">
      {/* 50/50 Editorial Gallery Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* =================================================================
            LEFT COLUMN: Hardware Device Showcase Frame (Monitor or Phone)
           ================================================================= */}
        <div className="w-full flex flex-col items-center justify-center p-1 sm:p-2">
          {/* CASE A: MONITOR / LAPTOP FRAME (Web / Landscape Gallery) */}
          {!isPortrait ? (
            <div className="w-full max-w-[620px] flex flex-col items-center">
              {/* Monitor Outer Chassis */}
              <div className="w-full rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                {/* Camera Sensor Notch */}
                <div className="w-full flex justify-center mb-1.5 sm:mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 ring-1 ring-white/10" />
                </div>

                {/* Screen Viewport with Ambient Blurred Canvas */}
                <div className="group relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-inner">
                  {/* Ambient Blurred Backdrop */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`bg-${currentImage.imageRef}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                    >
                      <Image
                        src={currentImage.imageRef}
                        alt=""
                        fill
                        className="object-cover scale-125 blur-3xl saturate-150 brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/60" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.85)_100%)]" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Foreground Screenshot: NEVER Cut Off (object-contain with clean framing) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`fg-${currentImage.imageRef}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="relative z-10 w-full h-full p-3 sm:p-4 md:p-5 flex items-center justify-center"
                    >
                      <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]">
                        <Image
                          src={currentImage.imageRef}
                          alt={`${projectName} web screenshot ${selectedIndex + 1}`}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 700px"
                          className="object-contain rounded-md"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating Caption Pill */}
                  <div className="pointer-events-none absolute bottom-2.5 left-3 z-30 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-slate-200 shadow-lg">
                      <span className="text-rose-400 font-bold mr-1.5">
                        #{String(selectedIndex + 1).padStart(2, "0")}
                      </span>
                      {formatImageCaption(currentImage.imageRef)}
                    </span>
                  </div>

                  {/* Glass Sheen Accent */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />
                </div>

                {/* Monitor Bottom Chin Bar */}
                <div className="w-full h-3.5 sm:h-4.5 pt-1.5 flex items-center justify-between px-2.5">
                  <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase text-neutral-500">
                    SNAPSHOT // STUDIO MONITOR
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                </div>
              </div>

              {/* Monitor Stand Neck */}
              <div className="w-16 sm:w-20 h-6 sm:h-8 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-x border-white/10 shadow-inner" />

              {/* Monitor Weighted Metallic Base */}
              <div className="w-32 sm:w-44 h-2 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 rounded-t-md border-t border-x border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.95)]" />
            </div>
          ) : (
            /* CASE B: ORIGINAL CELLPHONE FRAME (Restored as requested) */
            <div className="w-full flex justify-center py-1 sm:py-2">
              <div className="relative w-[280px] sm:w-[320px] md:w-[340px] aspect-[9/18.8] rounded-[2.2rem] sm:rounded-[2.6rem] p-2.5 sm:p-3 bg-gradient-to-b from-neutral-700 via-neutral-900 to-neutral-950 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
                {/* Physical Hardware Buttons */}
                <div className="hidden sm:block absolute -left-[2.5px] top-[20%] w-[2.5px] h-7 bg-neutral-600 rounded-l-sm" />
                <div className="hidden sm:block absolute -left-[2.5px] top-[30%] w-[2.5px] h-7 bg-neutral-600 rounded-l-sm" />
                <div className="hidden sm:block absolute -right-[2.5px] top-[25%] w-[2.5px] h-9 bg-rose-600/80 rounded-r-sm" />

                {/* Phone Screen Viewport */}
                <div className="group relative w-full h-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden bg-neutral-950 border border-white/10 shadow-inner">
                  {/* Dynamic Island Cutout */}
                  <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 z-30 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full border border-white/10 flex items-center justify-end pr-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80 shadow-[0_0_4px_rgba(244,63,94,0.8)]" />
                  </div>

                  {/* Ambient Blurred Backdrop (Takes colors from screenshot) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`bg-phone-${currentImage.imageRef}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.45 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                    >
                      <Image
                        src={currentImage.imageRef}
                        alt=""
                        fill
                        className="object-cover scale-150 blur-3xl saturate-150 brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/60" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Foreground Screenshot: NEVER Cut Off (object-contain) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`fg-phone-${currentImage.imageRef}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="relative z-10 w-full h-full p-3 pt-10 sm:pt-12 pb-7 sm:pb-8 flex items-center justify-center"
                    >
                      <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_10px_24px_rgba(0,0,0,0.9)]">
                        <Image
                          src={currentImage.imageRef}
                          alt={`${projectName} mobile screenshot ${selectedIndex + 1}`}
                          fill
                          priority
                          sizes="(max-width: 768px) 300px, 340px"
                          className="object-contain rounded-sm"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Glass Sheen */}
                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />

                  {/* Home Bar Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 w-1/3 h-1 rounded-full bg-white/50" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================================
            RIGHT COLUMN: Gallery Selection Area & Thumbnails (Clean 50/50)
           ================================================================= */}
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          {/* Header Row: Clean Orientation Selector & Action Prompt */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1 sm:pb-2">
            {/* Dynamic Web / Mobile View Toggle Tabs (Matches V2Navbar header design) */}
            {hasWeb && hasMobile ? (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("web")}
                  className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ease-out select-none cursor-pointer ${
                    activeTab === "web"
                      ? "text-white bg-white/10 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:scale-105"
                  }`}
                >
                  <Laptop
                    className={`w-3.5 h-3.5 transition-colors duration-200 shrink-0 ${
                      activeTab === "web"
                        ? "text-rose-500"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  <span>Web ({webImages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("mobile")}
                  className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ease-out select-none cursor-pointer ${
                    activeTab === "mobile"
                      ? "text-white bg-white/10 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:scale-105"
                  }`}
                >
                  <Smartphone
                    className={`w-3.5 h-3.5 transition-colors duration-200 shrink-0 ${
                      activeTab === "mobile"
                        ? "text-rose-500"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  <span>Mobile ({mobileImages.length})</span>
                </button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-white/5 select-none">
                {isPortrait ? (
                  <Smartphone className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Laptop className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span className="uppercase tracking-wider text-[11px] font-mono">
                  {isPortrait
                    ? "Mobile Application Views"
                    : "Web Application Views"}
                </span>
              </div>
            )}

            {/* Instruction Cue */}
            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              Click to inspect
            </span>
          </div>

          {/* Thumbnail Selection Grid — 3 columns for both, flicker-free scrollbar */}
          <div className="w-full flex flex-col gap-1.5">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider px-0.5">
              Select screenshot to view
            </div>

            {/* Scroll Container: Height locked to end cleanly at the bottom of the device (green line) */}
            <div
              className={`w-full p-1 overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable] pr-2 ${
                isPortrait
                  ? "max-h-[440px] sm:max-h-[500px] lg:max-h-[600px] xl:max-h-[650px]"
                  : "max-h-[340px] sm:max-h-[360px] lg:max-h-[350px] xl:max-h-[375px] 2xl:max-h-[400px]"
              } [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-neutral-900/40 [&::-webkit-scrollbar-thumb]:bg-neutral-700/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-rose-500/60`}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {safeImages.map((img, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={img.imageRef}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      title={formatImageCaption(img.imageRef)}
                      className={`group relative ${
                        isPortrait ? "aspect-[9/16]" : "aspect-[16/10]"
                      } w-full rounded-xl overflow-hidden border transition-all duration-150 cursor-pointer bg-neutral-900/80 ${
                        isSelected
                          ? "border-rose-500 ring-2 ring-rose-500/50 shadow-lg shadow-rose-950/40 opacity-100"
                          : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/25 hover:bg-neutral-850"
                      }`}
                      aria-label={`Select screenshot ${idx + 1}: ${formatImageCaption(img.imageRef)}`}
                    >
                      {/* Ambient Blurred Background for Thumbnail */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <Image
                          src={img.imageRef}
                          alt=""
                          fill
                          className="object-cover blur-md scale-110 opacity-35"
                        />
                      </div>

                      {/* Contained Foreground Thumbnail so borders never clip */}
                      <div className="relative z-10 w-full h-full p-1.5 flex items-center justify-center">
                        <Image
                          src={img.imageRef}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 33vw, 220px"
                          className="object-contain rounded-sm"
                        />
                      </div>

                      {/* Mini Index Label */}
                      <span className="absolute bottom-1.5 left-1.5 z-20 px-1.5 py-0.5 rounded font-mono text-[9px] text-white/80 bg-black/70 backdrop-blur-sm border border-white/10 select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Active Eye Indicator */}
                      {isSelected && (
                        <div className="absolute bottom-1.5 right-1.5 z-20 p-1 rounded-full bg-rose-600 text-white shadow-md">
                          <Eye className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
