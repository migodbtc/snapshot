"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Activity } from "lucide-react";
import type { Project } from "@/lib/constants/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const images = project.imageRefs || [];
  const thumbnailImage =
    images.find((img) => img.thumbnail)?.imageRef ||
    images[0]?.imageRef ||
    "/newheroimage.jpg";

  const startYear = project.startDate ? project.startDate.slice(0, 4) : "";
  const endYear = project.endDate ? project.endDate.slice(0, 4) : "";
  const timelineLabel = project.currentlyWorking
    ? `${startYear} — Present`
    : endYear && endYear !== startYear
      ? `${startYear} — ${endYear}`
      : startYear;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.08,
        ease: "easeOut",
      }}
      className="w-full"
    >
      <Link
        href={`/projects/${project.projectId}`}
        className="group relative w-full flex flex-col justify-between rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 shadow-2xl shadow-black/60 hover:shadow-black/90 transition-all duration-300 hover:scale-[1.02] bg-neutral-900 cursor-pointer select-none block"
      >
        {/* Top Section: Dedicated Image Showcase with subtle divider */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950 border-b border-white/10 shrink-0">
          <Image
            src={thumbnailImage}
            alt={project.projectName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top grayscale contrast-100 brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
          />

          {/* Subtle Bottom Vignette on Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Active Project badge overlayed at top right of image */}
          {project.currentlyWorking && (
            <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-900/90 border border-white/15 text-white select-none shadow-md backdrop-blur-md">
                <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-mono font-medium tracking-wide text-white">
                  Active
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section: Dedicated Content Area */}
        <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
          <div>
            {/* Project Title with Arrow right beside it */}
            <div className="inline-flex items-center gap-2 w-fit">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight group-hover:text-rose-600 transition-colors duration-200 line-clamp-1">
                {project.projectName}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-rose-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
            </div>

            {/* Project Description */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mt-2.5 line-clamp-3 group-hover:text-slate-200 transition-colors">
              {project.description}
            </p>
          </div>

          {/* Bottom Meta Bar */}
          <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-white/10 font-mono text-xs text-slate-400">
            <span>{timelineLabel}</span>
            <span className="truncate max-w-[160px] text-neutral-500 text-[11px]">
              {project.skills.slice(0, 3).join(" · ")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
