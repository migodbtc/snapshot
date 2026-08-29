import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECT_INDEX } from "@/lib/constants/projects";

// ── Config ────────────────────────────────────────────────────────────────────

// Featured project IDs in display order
const FEATURED_IDS = [5, 8, 4]; // Apollo, Deter, Bosledger
const MAX_SKILLS = 4;

// ── Helpers ───────────────────────────────────────────────────────────────────

// "2025-01" → "Jan 2025"
function fmtDate(s: string): string {
  const [y, m] = s.split("-");
  return new Date(+y, +m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const FEATURED = FEATURED_IDS.map(
  (id) => PROJECT_INDEX.find((p) => p.projectId === id)!,
);

// ── ProjectCard ───────────────────────────────────────────────────────────────

type CardProps = { project: (typeof PROJECT_INDEX)[0]; index: number };

const ProjectCard = ({ project, index }: CardProps) => {
  const thumb = project.imageRefs.find((img) => img.thumbnail);
  const dateRange = `${fmtDate(project.startDate)} – ${
    project.currentlyWorking ? "Present" : fmtDate(project.endDate)
  }`;
  const skills = project.skills.slice(0, MAX_SKILLS);
  const extra = project.skills.length - MAX_SKILLS;

  return (
    <Link
      href={`/projects/${project.projectId}`}
      className="
        group
        relative overflow-hidden
        rounded-xl
        border border-slate-300 dark:border-slate-800
        backdrop-blur-md
        bg-slate-50/50 dark:bg-slate-950/30
        flex flex-col
        cursor-pointer
        transition-all duration-300
        hover:border-rose-300 dark:hover:border-rose-800
        hover:shadow-lg hover:shadow-rose-900/10
      "
    >
      {/* Glass radial glow */}
      <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      {/* ── Thumbnail ────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video overflow-hidden">
        {thumb && (
          <Image
            src={thumb.imageRef}
            alt={`${project.projectName} preview`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Gradient bleed from image into card body */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-50/90 dark:from-slate-950/90 via-transparent to-transparent" />

        {/* Index badge — top-left */}
        <span className="absolute top-3 left-3 text-xs font-bold text-slate-50 bg-rose-800/80 backdrop-blur-sm px-2 py-0.5 rounded-md select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Name + date */}
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
            {project.projectName}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wide">
            {dateRange}
          </span>
        </div>

        {/* Description — clamped to 3 lines */}
        <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-xs rounded-md bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {extra > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-500">
              +{extra} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ── ProjectsSection ───────────────────────────────────────────────────────────

// ProjectsSection: Highlights the top 3 featured projects with glass cards.
// sm: 1-col stacked → md: 2-col → lg: 3-col
export const ProjectsSection = () => {
  return (
    <section className="w-full h-auto px-6 py-16 max-w-5xl mx-auto">
      {/* ── Section header ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-row gap-2 items-center mb-8"
      >
        <span
          className="
            w-fit px-3 py-1 rounded-xl
            bg-rose-800 text-white
            text-xs font-bold tracking-widest uppercase select-none
          "
        >
          Projects
        </span>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A selection of my most significant work
        </p>
      </motion.div>

      {/* ── Card grid ────────────────────────────────────────────────────── */}
      {/* 1-col on mobile, 2-col on sm, 3-col on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED.map((project, i) => (
          <motion.div
            key={project.projectId}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>

      {/* ── See all link ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex justify-end mt-8"
      >
        <Link
          href="/projects"
          className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold flex flex-row gap-2 items-center hover:underline cursor-pointer uppercase"
        >
          <span>See All Projects</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
};
