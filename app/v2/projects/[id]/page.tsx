import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { V2Navbar } from "@/app/v2/_components/V2Navbar";
import { V2Footer } from "@/app/v2/_components/V2Footer";
import { PROJECT_INDEX, type Project } from "@/lib/constants/projects";
import { ProjectDetailInteractive } from "./_components/ProjectDetailInteractive";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PROJECT_INDEX.flatMap((p) => [
    { id: String(p.projectId) },
    { id: p.slug },
  ]);
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECT_INDEX.find(
    (p) => String(p.projectId) === id || p.slug === id,
  );

  if (!project) {
    return {
      title: "Project Not Found — Snapshot",
    };
  }

  return {
    title: `${project.projectName} — Projects · Snapshot`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  // Chronologically sorted list (newest first)
  const sortedProjects = [...PROJECT_INDEX].sort((a, b) => {
    const dateDiff = b.startDate.localeCompare(a.startDate);
    if (dateDiff !== 0) return dateDiff;
    return b.projectId - a.projectId;
  });

  const currentIndex = sortedProjects.findIndex(
    (p) => String(p.projectId) === id || p.slug === id,
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project: Project = sortedProjects[currentIndex];

  const startYear = project.startDate ? project.startDate.slice(0, 4) : "";
  const endYear = project.endDate ? project.endDate.slice(0, 4) : "";
  const timelineLabel = project.currentlyWorking
    ? `${startYear} — Present`
    : endYear && endYear !== startYear
      ? `${startYear} — ${endYear}`
      : startYear;

  const formattedId = String(project.projectId).padStart(2, "0");

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen bg-neutral-950 text-slate-100 selection:bg-rose-500/30 selection:text-white">
      {/* Top Navbar Header */}
      <div className="relative z-20 w-full">
        <V2Navbar />
      </div>

      {/* Main Interactive Client Presentation with Scroll & Focus Animations */}
      <ProjectDetailInteractive
        project={project}
        formattedId={formattedId}
        timelineLabel={timelineLabel}
      />

      {/* Global Footer */}
      <V2Footer />
    </main>
  );
}
