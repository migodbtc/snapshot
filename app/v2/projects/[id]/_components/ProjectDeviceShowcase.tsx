"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectPicture } from "@/lib/constants/projects";

interface ProjectDeviceShowcaseProps {
  images: ProjectPicture[];
  projectName?: string;
}

export function ProjectDeviceShowcase({
  images,
  projectName = "Project",
}: ProjectDeviceShowcaseProps) {
  const webImages = images.filter((img) => img.orientation === "landscape");
  const mobileImages = images.filter((img) => img.orientation === "portrait");

  const hasWeb = webImages.length > 0;
  const hasMobile = mobileImages.length > 0;

  // Pick primary thumbnail or fallback to first image of each orientation
  const primaryWebImage =
    webImages.find((img) => img.thumbnail) ||
    webImages[0] || {
      imageRef: "/newheroimage.jpg",
      orientation: "landscape" as const,
      thumbnail: true,
    };

  const primaryMobileImage =
    mobileImages.find((img) => img.thumbnail) || mobileImages[0];

  return (
    <div className="relative w-full flex items-center justify-center py-4 sm:py-6 lg:py-2 select-none">
      {/* =====================================================================
          CASE 1: BOTH WEB & MOBILE (Studio Monitor + Cellphone Ad Composition)
         ===================================================================== */}
      {hasWeb && hasMobile && primaryMobileImage && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[540px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-full flex items-end justify-center px-2 sm:px-4"
        >
          {/* 1A. Dominant Studio Monitor (Left / Center-Left) */}
          <div className="relative z-10 w-[80%] sm:w-[82%] flex flex-col items-center">
            {/* Monitor Outer Chassis */}
            <div className="w-full rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 md:p-3 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
              {/* Top Camera Sensor Dot */}
              <div className="w-full flex justify-center mb-1 sm:mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 ring-1 ring-white/10" />
              </div>

              {/* Monitor Screen Viewport */}
              <div className="relative w-full aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden bg-neutral-950 border border-white/10">
                <Image
                  src={primaryWebImage.imageRef}
                  alt={`${projectName} desktop display showcase`}
                  fill
                  priority
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 640px"
                  className="object-cover object-top"
                />
                {/* Subtle Editorial Screen Glare */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07]" />
              </div>

              {/* Monitor Bottom Chin */}
              <div className="w-full h-2.5 sm:h-3.5 md:h-4 pt-1 flex items-center justify-between px-2">
                <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase text-neutral-500">
                  SNAPSHOT // STUDIO
                </span>
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
              </div>
            </div>

            {/* Monitor Stand Neck */}
            <div className="w-12 sm:w-16 md:w-20 h-5 sm:h-7 md:h-9 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-x border-white/10 shadow-inner" />

            {/* Monitor Weighted Base */}
            <div className="w-28 sm:w-36 md:w-44 h-1.5 sm:h-2 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 rounded-t-md border-t border-x border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.95)]" />
          </div>

          {/* 1B. Companion Cellphone (Tucked Close & Slightly Overlapping Right Edge) */}
          <motion.div
            initial={{ opacity: 0, x: 18, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="relative z-20 w-[27%] sm:w-[25%] md:w-[24%] lg:w-[26%] xl:w-[24%] -ml-7 sm:-ml-10 md:-ml-12 lg:-ml-10 xl:-ml-12 mb-0.5 sm:mb-1 shrink-0"
          >
            {/* Phone Titanium-Obsidian Outer Frame */}
            <div className="relative w-full aspect-[9/19.2] rounded-[1.1rem] sm:rounded-[1.5rem] md:rounded-[1.75rem] p-1 sm:p-1.5 md:p-2 bg-gradient-to-b from-neutral-700 via-neutral-900 to-neutral-950 border border-white/20 shadow-[-16px_20px_45px_rgba(0,0,0,0.95)]">
              {/* Side Buttons */}
              <div className="hidden sm:block absolute -left-[2px] top-[22%] w-[2px] h-5 bg-neutral-600 rounded-l-sm" />
              <div className="hidden sm:block absolute -left-[2px] top-[33%] w-[2px] h-5 bg-neutral-600 rounded-l-sm" />
              <div className="hidden sm:block absolute -right-[2px] top-[26%] w-[2px] h-7 bg-rose-600/80 rounded-r-sm" />

              {/* Phone Screen Viewport */}
              <div className="relative w-full h-full rounded-[0.85rem] sm:rounded-[1.2rem] md:rounded-[1.4rem] overflow-hidden bg-neutral-950 border border-white/10">
                {/* Dynamic Island Cutout */}
                <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 z-20 w-7 sm:w-10 md:w-12 h-1.5 sm:h-2.5 bg-black rounded-full border border-white/10 flex items-center justify-end pr-1">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-rose-500/70" />
                </div>

                <Image
                  src={primaryMobileImage.imageRef}
                  alt={`${projectName} mobile display showcase`}
                  fill
                  priority
                  sizes="(max-width: 768px) 28vw, 220px"
                  className="object-cover object-top"
                />

                {/* Screen Reflection Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.09]" />

                {/* Home Bar Indicator */}
                <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 z-20 w-1/3 h-0.5 sm:h-1 rounded-full bg-white/50" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* =====================================================================
          CASE 2: WEB-ONLY (Sleek Obsidian Laptop Frame)
         ===================================================================== */}
      {hasWeb && !hasMobile && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[500px] sm:max-w-[580px] md:max-w-[640px] lg:max-w-full flex flex-col items-center px-2 sm:px-4"
        >
          {/* Laptop Lid / Upper Display Housing */}
          <div className="relative w-[90%] sm:w-[88%] rounded-t-xl sm:rounded-t-2xl md:rounded-t-[1.35rem] p-1.5 sm:p-2.5 md:p-3 pb-2 sm:pb-3 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border-t border-x border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            {/* Camera Notch Housing */}
            <div className="w-full flex justify-center mb-1 sm:mb-1.5">
              <div className="px-3 py-0.5 rounded-full bg-neutral-950/90 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                <span className="w-1 h-1 rounded-full bg-rose-500/80 shadow-[0_0_5px_rgba(244,63,94,0.8)]" />
              </div>
            </div>

            {/* Laptop Screen Viewport */}
            <div className="relative w-full aspect-[16/10] rounded-md sm:rounded-lg md:rounded-xl overflow-hidden bg-neutral-950 border border-white/10">
              <Image
                src={primaryWebImage.imageRef}
                alt={`${projectName} laptop showcase`}
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 48vw, 680px"
                className="object-cover object-top"
              />
              {/* Subtle Glass Reflection */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07]" />
            </div>

            {/* Bottom Bezel Logo Mark */}
            <div className="w-full pt-1.5 sm:pt-2 flex justify-center">
              <span className="text-[7px] sm:text-[8px] font-mono tracking-[0.25em] uppercase text-neutral-500">
                SNAPSHOT PRO
              </span>
            </div>
          </div>

          {/* Laptop Lower Deck / Base Chassis */}
          <div className="relative w-full h-3 sm:h-4 md:h-5 bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-950 rounded-b-xl sm:rounded-b-2xl border-t border-white/25 border-x border-b border-white/15 shadow-[0_25px_50px_rgba(0,0,0,0.95)] flex justify-center">
            {/* Central Thumb Notch Lip */}
            <div className="w-16 sm:w-24 md:w-28 h-1.5 sm:h-2 bg-neutral-950/90 rounded-b-md border-x border-b border-white/15" />
          </div>
        </motion.div>
      )}

      {/* =====================================================================
          CASE 3: MOBILE-ONLY (Flagship Cellphone Frame)
         ===================================================================== */}
      {!hasWeb && hasMobile && primaryMobileImage && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full flex justify-center py-2"
        >
          <div className="relative w-[220px] sm:w-[250px] md:w-[270px] lg:w-[260px] xl:w-[290px] aspect-[9/19.2] rounded-[2.2rem] sm:rounded-[2.6rem] p-2 sm:p-2.5 md:p-3 bg-gradient-to-b from-neutral-700 via-neutral-900 to-neutral-950 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
            {/* Hardware Buttons */}
            <div className="absolute -left-[3px] top-[20%] w-[3px] h-7 bg-neutral-600 rounded-l-sm" />
            <div className="absolute -left-[3px] top-[31%] w-[3px] h-7 bg-neutral-600 rounded-l-sm" />
            <div className="absolute -right-[3px] top-[25%] w-[3px] h-10 bg-rose-600/80 rounded-r-sm" />

            {/* Screen Viewport */}
            <div className="relative w-full h-full rounded-[1.75rem] sm:rounded-[2.1rem] overflow-hidden bg-neutral-950 border border-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 z-20 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-full border border-white/10 flex items-center justify-end pr-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80 shadow-[0_0_4px_rgba(244,63,94,0.8)]" />
              </div>

              <Image
                src={primaryMobileImage.imageRef}
                alt={`${projectName} mobile showcase`}
                fill
                priority
                sizes="(max-width: 768px) 260px, 300px"
                className="object-cover object-top"
              />

              {/* Glass Reflection */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-1/3 h-1 rounded-full bg-white/50" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
