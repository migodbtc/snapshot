"use client";

import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { V2Navbar } from "../_components/V2Navbar";
import { PROJECT_INDEX, type Project } from "@/lib/constants/projects";
import { ProjectCard } from "./_components/ProjectCard";
import { ProjectModal } from "./_components/ProjectModal";
import { ProjectFilterModal } from "./_components/ProjectFilterModal";

function getProjectPlatform(project: Project): "web" | "mobile" | "web&mobile" {
  const hasMobile = project.skills.some((s) =>
    /react native|mobile|expo/i.test(s),
  );
  const desc = project.description.toLowerCase();
  if (
    project.projectId === 11 ||
    (hasMobile &&
      (desc.includes("web") ||
        desc.includes("full-stack") ||
        desc.includes("rest api")))
  ) {
    return "web&mobile";
  }
  if (hasMobile || desc.includes("mobile application")) {
    return "mobile";
  }
  return "web";
}

const AVAILABLE_TECHS = [
  "Next.js",
  "TypeScript",
  "React.js",
  "Python",
  "Flask",
  "Laravel",
  "Tailwind CSS",
  "Docker",
  "MySQL",
  "PostgreSQL",
  "React Native",
];

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const targetIdParam = searchParams.get("id") || searchParams.get("project");

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<
    "all" | "web" | "mobile" | "web&mobile"
  >("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  // Projects sorted chronologically descending (newest first)
  const sortedProjects = useMemo(() => {
    return [...PROJECT_INDEX].sort((a, b) => {
      const dateDiff = b.startDate.localeCompare(a.startDate);
      if (dateDiff !== 0) return dateDiff;
      return b.projectId - a.projectId;
    });
  }, []);

  const [activeProject, setActiveProject] = useState<Project | null>(() => {
    if (!targetIdParam) return null;
    return (
      sortedProjects.find(
        (p) => String(p.projectId) === String(targetIdParam),
      ) || null
    );
  });
  const [prevTargetParam, setPrevTargetParam] = useState(targetIdParam);

  // Sync active project if search param updates without useEffect
  if (targetIdParam !== prevTargetParam) {
    setPrevTargetParam(targetIdParam);
    const found =
      sortedProjects.find(
        (p) => String(p.projectId) === String(targetIdParam),
      ) || null;
    setActiveProject(found);
  }

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

  // Combined Multi-Dimensional Filtering: Year, Platform, Tech
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((p) => {
      // 1. Year filter
      if (selectedYear !== "all" && !p.startDate?.startsWith(selectedYear)) {
        return false;
      }
      // 2. Platform filter
      if (selectedPlatform !== "all") {
        const plat = getProjectPlatform(p);
        if (
          selectedPlatform === "web" &&
          plat !== "web" &&
          plat !== "web&mobile"
        ) {
          return false;
        }
        if (
          selectedPlatform === "mobile" &&
          plat !== "mobile" &&
          plat !== "web&mobile"
        ) {
          return false;
        }
        if (selectedPlatform === "web&mobile" && plat !== "web&mobile") {
          return false;
        }
      }
      // 3. Tech filter
      if (selectedTech !== "all") {
        const hasSkill = p.skills.some(
          (s) =>
            s.toLowerCase().includes(selectedTech.toLowerCase()) ||
            selectedTech.toLowerCase().includes(s.toLowerCase()),
        );
        if (!hasSkill) return false;
      }
      return true;
    });
  }, [sortedProjects, selectedYear, selectedPlatform, selectedTech]);

  const activeFiltersCount =
    Number(selectedYear !== "all") +
    Number(selectedPlatform !== "all") +
    Number(selectedTech !== "all");

  const resetFilters = () => {
    setSelectedYear("all");
    setSelectedPlatform("all");
    setSelectedTech("all");
  };

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen bg-neutral-950">
      {/* Top Navbar Header */}
      <div className="relative z-20 w-full">
        <V2Navbar />
      </div>

      <div className="relative z-10 w-full px-8 md:px-12 py-10 sm:py-16 flex flex-col justify-start">
        {/* Split Layout: Left Column (Dedicated Page Header) & Right Column (Catalog) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* Left Column: Sticky Title + Description + Filters Trigger */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-start lg:sticky lg:top-20 xl:top-24 self-start pb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-5"
            >
              Project <span className="text-rose-600">Collection</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed text-justify mb-8"
            >
              A curated catalog of systems, platforms, and software architecture
              engineered over time.
            </motion.p>

            {/* Filter Modal Trigger */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-2.5"
            >
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(true)}
                className="w-fit inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-900 border border-white/10 hover:border-white/25 text-white transition-all duration-200 cursor-pointer group shadow-sm select-none"
              >
                <SlidersHorizontal className="w-4 h-4 text-neutral-400 group-hover:text-rose-500 transition-colors shrink-0" />
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">
                  Filters
                </span>

                {activeFiltersCount > 0 && (
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400">
                    {activeFiltersCount} active
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2.5 pt-0.5 text-xs font-mono">
                  <span className="text-neutral-500">
                    {filteredProjects.length}{" "}
                    {filteredProjects.length === 1 ? "project" : "projects"}
                  </span>
                  <span className="text-neutral-700">·</span>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer select-none"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Catalog Grid (2-col on lg, 3-col on xl) */}
          <div className="lg:col-span-9 xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-neutral-900/40 border border-white/5">
                <p className="text-base text-slate-300 font-semibold mb-2">
                  No projects found
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 font-mono mb-4">
                  No projects match your current filter criteria.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-rose-950/50 border border-rose-500 text-rose-300 hover:bg-rose-900/50 transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  index={idx}
                  onSelect={() => setActiveProject(project)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <ProjectFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        availableYears={availableYears}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
        selectedTech={selectedTech}
        onSelectTech={setSelectedTech}
        availableTechs={AVAILABLE_TECHS}
        activeFiltersCount={activeFiltersCount}
        onReset={resetFilters}
        totalMatches={filteredProjects.length}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        activeProject={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}

export default function V2ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-neutral-950 flex items-center justify-center text-slate-500 font-mono text-sm">
          Loading Project Collection...
        </div>
      }
    >
      <ProjectsPageContent />
    </Suspense>
  );
}
