"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/lib/constants/projects";

interface ProjectModalProps {
  activeProject: Project | null;
  onClose: () => void;
}

export function ProjectModal({ activeProject, onClose }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState(activeProject?.projectId);

  // Reset selected image when active project changes without useEffect
  if (activeProject && activeProject.projectId !== prevProjectId) {
    setPrevProjectId(activeProject.projectId);
    setSelectedImageIndex(0);
  }

  // Handle ESC key press and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (activeProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject, onClose]);

  if (!activeProject) return null;

  const images = activeProject.imageRefs || [];
  const currentImage = images[selectedImageIndex] || images[0] || {
    imageRef: "/newheroimage.jpg",
  };

  const startYear = activeProject.startDate
    ? activeProject.startDate.slice(0, 4)
    : "";
  const endYear = activeProject.endDate ? activeProject.endDate.slice(0, 4) : "";
  const timelineLabel = activeProject.currentlyWorking
    ? `${startYear} — Present`
    : endYear && endYear !== startYear
      ? `${startYear} — ${endYear}`
      : startYear;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-900 border border-white/15 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black flex flex-col gap-6 z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header Row: Project Name & Close Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-mono text-xs text-rose-500 uppercase tracking-wider">
                <span>0{activeProject.projectId}</span>
                <span className="text-neutral-700">·</span>
                <span className="text-neutral-400">{timelineLabel}</span>
                {activeProject.currentlyWorking && (
                  <>
                    <span className="text-neutral-700">·</span>
                    <span className="text-emerald-400 font-semibold">Active</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {activeProject.projectName}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Screenshot Showcase */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject.projectId}-${selectedImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage.imageRef}
                    alt={activeProject.projectName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Gallery Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
                {images.map((img, idx) => {
                  const isSelected = idx === selectedImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative shrink-0 w-20 h-14 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        isSelected
                          ? "border-rose-500 ring-2 ring-rose-500/50 scale-[1.02]"
                          : "border-white/10 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.imageRef}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Project Description */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Overview
            </span>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed text-justify">
              {activeProject.description}
            </p>
          </div>

          {/* Engineering Note (Personal Reflection) */}
          {activeProject.note && (
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-500 font-semibold">
                Engineering Note & Story
              </span>
              <div className="space-y-3">
                {activeProject.note.split("\n\n").map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Affiliation / Context */}
          {activeProject.associatedWith &&
            activeProject.associatedWith.length > 0 && (
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono">
                <span className="text-neutral-500">Associated With:</span>
                <span className="text-slate-200 font-medium">
                  {activeProject.associatedWith.join(", ")}
                </span>
              </div>
            )}

          {/* Complete Technology Stack */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Technologies & Tools
            </span>
            <div className="flex flex-wrap gap-2">
              {activeProject.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 bg-neutral-800/80 border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
