import { ProjectDocumentationGallery } from "@/app/_components/ProjectDocumentationGallery";
import { SkillsList } from "@/app/_components/SkillsList";
import { PROJECT_INDEX } from "@/lib/constants/projects";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Book,
  BookOpen,
  Brain,
  Calendar,
  Camera,
  Check,
  ChevronsDown,
  ChevronsUp,
  Clock,
  Eye,
  GraduationCapIcon,
  Hourglass,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  Medal,
  Pencil,
  School,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NoteCard } from "@/app/_components/NoteCard";

type SingleProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleProjectPage({
  params,
}: SingleProjectPageProps) {
  const { id } = await params;
  const idn = Number(id) - 1;
  const selectedProject = PROJECT_INDEX[idn];
  const thumbnailPicture = selectedProject.imageRefs.find((p) => p.thumbnail);

  return (
    <main className="w-full h-fit flex flex-col items-center pb-8 min-h-[90vh]">
      {/* Unified responsive layout */}
      <section
        className="
        flex-1 flex flex-col
        w-full md:w-2xl lg:w-4xl
        px-8 md:px-0
        pb-16 md:pb-8 lg:pb-16
        "
      >
        {/* Return to Projects Option */}
        <Link
          href="/projects"
          className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase"
        >
          <ArrowLeft size={16} />
          <span>Return to Projects</span>
        </Link>

        {/* Thumbnail */}
        <div className="relative flex flex-row w-full aspect-5/2 lg:aspect-4/1 rounded-xl overflow-hidden bg-slate-900 mb-6 mt-4">
          {thumbnailPicture && (
            <Image
              src={thumbnailPicture.imageRef}
              alt={`${selectedProject.projectName} thumbnail`}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          )}
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row w-full h-fit gap-3 pb-2 lg:items-center">
          {/* Project Name */}
          <h1 className="text-xl tracking-wider font-bold uppercase flex flex-row items-center gap-2 text-justify">
            {selectedProject.projectName}
          </h1>

          {/* Date Range */}
          <span className="select-none flex flex-row items-center gap-1 py-1 px-2 rounded-xl bg-rose-800 text-rose-50 text-xs font-semibold w-fit h-fit">
            {selectedProject.currentlyWorking ? (
              <Check size={16} />
            ) : (
              <Hourglass size={16} />
            )}
            {selectedProject.startDate} to{" "}
            {!selectedProject.currentlyWorking
              ? selectedProject.endDate
              : "Present"}
          </span>
        </div>

        {/* Description + Personal Note — two columns on lg only if a note exists */}
        <div
          className={`w-full grid grid-cols-1 gap-6 items-start ${
            selectedProject.note ? "lg:grid-cols-[2fr_1fr]" : ""
          }`}
        >
          {/* Description */}
          <p className="text-sm md:text-md lg:text-base text-justify w-full whitespace-pre-wrap text-slate-800 dark:text-slate-400">
            {selectedProject.description}
          </p>

          {/* Personal Note — only rendered if present */}
          {selectedProject.note && <NoteCard note={selectedProject.note} />}
        </div>

        {/* Skills Involved */}
        <div className="flex flex-row w-full h-fit gap-3 pb-2 items-center mt-4">
          {/* Project Name */}
          <h1 className="text-base tracking-wider font-bold uppercase flex flex-row items-center gap-2 text-justify">
            <Brain size={20} className="text-rose-800" />
            Skills ({selectedProject.skills.length})
          </h1>
        </div>

        {/* Skills List */}
        <SkillsList skills={selectedProject.skills} />

        {/* Documentation Header */}
        <div className="flex flex-row w-full h-fit gap-3 pb-2 items-center mt-6">
          {/* Project Name */}
          <h1 className="text-base tracking-wider font-bold uppercase flex flex-row items-center gap-2 text-justify">
            <ImageIcon size={20} className="text-rose-800" />
            Project Gallery
          </h1>
        </div>

        {/* Gallery */}
        <ProjectDocumentationGallery pictures={selectedProject.imageRefs} />

        <div className="w-full grid-cols-1 md:grid-cols-2 gap-2 mt-8">
          {idn - 1 >= 0 && (
            <Link
              href={`/projects/${idn - 1}`}
              className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase"
            >
              <ArrowLeft size={16} />
              <span>Read Previous Post</span>
            </Link>
          )}

          {idn + 1 < PROJECT_INDEX.length && (
            <Link
              href={`/projects/${idn + 1}`}
              className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase text-right justify-end"
            >
              <span>Read Next Post</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
