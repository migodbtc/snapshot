"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/constants/projects";

interface ProjectCatalogCardProps {
  project: Project;
  index: number;
  initiallyExpanded?: boolean;
}

export function ProjectCatalogCard({
  project,
  index,
  initiallyExpanded = false,
}: ProjectCatalogCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const images = project.imageRefs || [];
  const currentImage = images[selectedImageIndex] || images[0] || {
    imageRef: "/newheroimage.jpg",
  };

  const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
  const startYear = project.startDate ? project.startDate.slice(0, 4) : "";
  const endYear = project.endDate ? project.endDate.slice(0, 4) : "";
  const timelineLabel = project.currentlyWorking
    ? `${startYear} — Present`
    : endYear && endYear !== startYear
      ? `${startYear} — ${endYear}`
      : startYear;

  return (
    <article
      id={`project-${project.projectId}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 p-5 sm:p-7 overflow-hidden"
    >
      <div>
        {/* Main Image Showcase */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.projectId}-${selectedImageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage.imageRef}
                alt={project.projectName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Photo Count Pill */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 font-mono text-[11px] text-neutral-400 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/5 select-none">
              {images.length} photos
            </div>
          )}
        </div>

        {/* Project Meta Line */}
        <div className="flex items-center gap-2 mt-4 text-xs font-mono">
          <span className="text-neutral-500 font-semibold">{formattedIndex}</span>
          <span className="text-neutral-700">/</span>
          <span className="text-rose-500/90 font-medium">{timelineLabel}</span>
          {project.currentlyWorking && (
            <>
              <span className="text-neutral-700">·</span>
              <span className="text-emerald-400 font-medium">Active</span>
            </>
          )}
        </div>

        {/* Project Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-rose-400 transition-colors mt-2">
          {project.projectName}
        </h2>

        {/* Short Description */}
        <p className="text-sm sm:text-[14.5px] text-neutral-400 leading-relaxed font-normal mt-2.5 line-clamp-3">
          {project.description}
        </p>

        {/* Technology Highlights */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          {project.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-white/5"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 5 && (
            <span className="text-[11px] font-mono text-neutral-600 pl-1 select-none">
              +{project.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* In-Place Detail Extension Toggle */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="pt-3 border-t border-neutral-800/80 flex items-center justify-between w-full text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer select-none"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Collapse Details" : "Engineering Story & Gallery"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180 text-rose-500" : "text-neutral-500"
            }`}
          />
        </button>

        {/* In-Place Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 flex flex-col gap-4">
                {/* Gallery Switcher */}
                {images.length > 1 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 select-none">
                      Screenshot Gallery ({images.length})
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
                      {images.map((img, idx) => {
                        const isSelected = idx === selectedImageIndex;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                              isSelected
                                ? "border-rose-500 ring-1 ring-rose-500"
                                : "border-white/10 opacity-60 hover:opacity-100"
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
                  </div>
                )}

                {/* Engineering Note */}
                {project.note && (
                  <div className="pt-3 border-t border-neutral-800/60 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500/90 font-semibold select-none">
                        Engineering Note
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {project.note.split("\n\n").map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Affiliations if present */}
                {project.associatedWith && project.associatedWith.length > 0 && (
                  <div className="pt-3 border-t border-neutral-800/60 flex items-center gap-2 text-xs font-mono">
                    <span className="text-neutral-500">Associated With:</span>
                    <span className="text-neutral-300 font-medium">
                      {project.associatedWith.join(", ")}
                    </span>
                  </div>
                )}

                {/* Complete Tech Stack */}
                <div className="pt-3 border-t border-neutral-800/60 flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 select-none">
                    Complete Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300 bg-neutral-900 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
