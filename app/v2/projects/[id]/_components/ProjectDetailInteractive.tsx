"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Activity } from "lucide-react";
import type { Project } from "@/lib/constants/projects";
import { ProjectDeviceShowcase } from "./ProjectDeviceShowcase";
import { ProjectSkillBadge } from "./ProjectSkillBadge";
import { ProjectGalleryViewer } from "./ProjectGalleryViewer";

interface ProjectDetailInteractiveProps {
  project: Project;
  formattedId: string;
  timelineLabel: string;
}

export function ProjectDetailInteractive({
  project,
  formattedId,
  timelineLabel,
}: ProjectDetailInteractiveProps) {
  // Sibling Focus States (mirrors landing page focus-dimming choreography)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredParaIdx, setHoveredParaIdx] = useState<number | null>(null);

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Editorial Scroll Progress Bar (Top Accent) */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 origin-left z-50 shadow-[0_0_12px_rgba(244,63,94,0.7)]"
      />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-16 py-8 sm:py-12 flex flex-col justify-start">
        {/* Breadcrumb Back Link (Enters with soft fade-in) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full mb-8 sm:mb-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-rose-500 group-hover:-translate-x-1.5 transition-transform" />
            <span>Back to Project Collection</span>
          </Link>
        </motion.div>

        {/* =====================================================================
            SECTION 1: 50/50 Division (Title & Description + Hardware Graphic)
           ===================================================================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Meta, Title, Mobile Device, and Overview */}
          <div className="w-full flex flex-col justify-start">
            {/* Project Meta Line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400 mb-4"
            >
              <span className="text-rose-500 font-bold tracking-wider">
                #{formattedId}
              </span>
              <span className="text-neutral-700">·</span>
              <span>{timelineLabel}</span>

              {project.currentlyWorking && (
                <>
                  <span className="text-neutral-700">·</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-white/10 text-white shadow-sm">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-mono font-medium text-white">
                      Active Project
                    </span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Project Headline Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 sm:mb-8"
            >
              {project.projectName}
            </motion.h1>

            {/* Hardware Devices (Single-column view: placed in between title and overview) */}
            <div className="w-full block lg:hidden mb-8 sm:mb-10">
              <ProjectDeviceShowcase
                images={project.imageRefs}
                projectName={project.projectName}
              />
            </div>

            {/* Description / Architecture & Scope (Scroll-entrance + Focus hover) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-3 group/overview"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500 select-none flex items-center gap-2">
                <span>Overview & Architecture</span>
              </span>
              <p className="text-base sm:text-lg lg:text-[19px] text-slate-300 font-normal leading-relaxed text-justify transition-colors duration-200 group-hover/overview:text-slate-100">
                {project.description}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Hardware Device Mockup Graphic (Desktop lg+ only) */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
            className="hidden lg:flex w-full items-center justify-center"
          >
            <ProjectDeviceShowcase
              images={project.imageRefs}
              projectName={project.projectName}
            />
          </motion.div>
        </div>

        {/* =====================================================================
            SECTION 2: 60/40 Merged Section (Story + Sticky Technologies Used)
           ===================================================================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-12 xl:gap-16 items-start mt-14 sm:mt-20">
          {/* Left 60%: Engineering Story & Reflections with Sibling Focus-Dimming */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-40px", once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col gap-3"
          >
            {project.note && (
              <>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500 select-none">
                  Engineering Story & Reflections
                </span>
                <div className="space-y-4 text-base sm:text-lg font-normal leading-relaxed text-justify">
                  {project.note.split("\n\n").map((para, idx) => {
                    const isHovered = hoveredParaIdx === idx;
                    const hasAnyHover = hoveredParaIdx !== null;
                    return (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-30px", once: true }}
                        transition={{
                          duration: 0.45,
                          delay: idx * 0.08,
                          ease: "easeOut",
                        }}
                        onMouseEnter={() => setHoveredParaIdx(idx)}
                        onMouseLeave={() => setHoveredParaIdx(null)}
                        className={`transition-all duration-200 cursor-default rounded-r-xl ${
                          isHovered
                            ? "text-slate-100 border-l-2 border-rose-500 pl-4 py-1.5 bg-white/[0.02] shadow-sm"
                            : hasAnyHover
                              ? "text-neutral-500/60 border-l-2 border-transparent pl-0 py-0"
                              : "text-neutral-400 border-l-2 border-transparent pl-0 py-0 hover:text-slate-200"
                        }`}
                      >
                        {para}
                      </motion.p>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>

          {/* Right 40%: Technologies Used & Affiliation (Sticky on scroll + Sibling Focus) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-40px", once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-4 lg:sticky lg:top-24 self-start flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 select-none">
                  Technologies Used
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  {project.skills.length} Tools
                </span>
              </div>

              {/* Technologies Badges with Sibling Focus Dimming */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {project.skills.map((skill) => {
                  const isFocused = hoveredSkill === skill;
                  const isDimmed = hoveredSkill !== null && !isFocused;
                  return (
                    <ProjectSkillBadge
                      key={skill}
                      skill={skill}
                      isFocused={isFocused}
                      isDimmed={isDimmed}
                      onHover={() => setHoveredSkill(skill)}
                      onLeave={() => setHoveredSkill(null)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Institutional Affiliation (if any) */}
            {project.associatedWith && project.associatedWith.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20px", once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400 p-3 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-colors"
              >
                <span className="text-neutral-500">Associated With:</span>
                <span className="text-slate-200 font-medium">
                  {project.associatedWith.join(", ")}
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* =====================================================================
            SECTION 3: Dedicated Gallery Section at the Bottom
           ===================================================================== */}
        <motion.section
          id="gallery"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px", once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full pt-16 sm:pt-24 flex flex-col gap-6 sm:gap-8 pb-16 sm:pb-24 mt-6 sm:mt-8"
        >
          {/* Gallery Section Header (Scroll entrance) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500 mb-2 block select-none">
                Visual Showcase
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Project <span className="text-rose-600">Gallery</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 select-none md:text-right">
              {project.imageRefs.length}{" "}
              {project.imageRefs.length === 1 ? "Screenshot" : "Screenshots"}{" "}
              Archived
            </p>
          </div>

          {/* Interactive Gallery Viewer */}
          <ProjectGalleryViewer
            images={project.imageRefs}
            projectName={project.projectName}
          />
        </motion.section>
      </div>
    </>
  );
}
