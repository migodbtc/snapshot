"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { V2Navbar } from "../_components/V2Navbar";
import { PROJECT_INDEX } from "@/lib/constants/projects";
import { ProjectCatalogCard } from "./_components/ProjectCatalogCard";

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const targetIdParam = searchParams.get("id") || searchParams.get("project");

  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Projects sorted chronologically descending (newest first)
  const sortedProjects = useMemo(() => {
    return [...PROJECT_INDEX].sort((a, b) => b.projectId - a.projectId);
  }, []);

  // Dynamically extract distinct years
  const availableYears = useMemo(() => {
    return Array.from(
      new Set(
        sortedProjects
          .map((p) => p.startDate?.slice(0, 4))
          .filter((y): y is string => Boolean(y)),
      ),
    ).sort((a, b) => Number(b) - Number(a));
  }, [sortedProjects]);

  // Filter projects by selected year
  const filteredProjects = useMemo(() => {
    if (selectedYear === "all") return sortedProjects;
    return sortedProjects.filter((p) => p.startDate?.startsWith(selectedYear));
  }, [sortedProjects, selectedYear]);

  // Auto-scroll to project if targeted via query param
  useEffect(() => {
    if (!targetIdParam) return;
    const element = document.getElementById(`project-${targetIdParam}`);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }, [targetIdParam]);

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
          className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8 sm:mb-12"
        >
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Snapshot <span className="text-rose-600">Projects</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed md:text-right max-w-sm sm:max-w-md">
            A curated catalog of systems, platforms, and software architecture
            engineered over time.
          </p>
        </motion.div>

        {/* ROW 2: Minimal Year Filter & Count Row */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-800/80">
          {/* Year Filter Tabs */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => setSelectedYear("all")}
              className={`text-xs sm:text-sm font-mono tracking-wider transition-colors cursor-pointer select-none pb-1.5 ${
                selectedYear === "all"
                  ? "text-white font-bold border-b-2 border-rose-600"
                  : "text-neutral-500 hover:text-neutral-300 font-medium"
              }`}
            >
              ALL ({sortedProjects.length})
            </button>
            {availableYears.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`text-xs sm:text-sm font-mono tracking-wider transition-colors cursor-pointer select-none pb-1.5 ${
                  selectedYear === yr
                    ? "text-white font-bold border-b-2 border-rose-600"
                    : "text-neutral-500 hover:text-neutral-300 font-medium"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Result Count Indicator */}
          <div className="text-xs font-mono text-neutral-500 select-none">
            Showing {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>

        {/* ROW 3: Projects Catalog Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project, idx) => (
            <ProjectCatalogCard
              key={project.projectId}
              project={project}
              index={idx}
              initiallyExpanded={
                Boolean(targetIdParam) &&
                String(project.projectId) === String(targetIdParam)
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function V2ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-neutral-950 flex items-center justify-center text-slate-500 font-mono text-sm">
          Loading Snapshot Projects...
        </div>
      }
    >
      <ProjectsPageContent />
    </Suspense>
  );
}
