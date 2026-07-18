"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Laptop,
  Search,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Project, PROJECT_INDEX } from "@/lib/constants/projects"; // adjust import path as needed

// formatDateRange: Helper function to append the two dates per project in PROJECT_INDEX
// String concatenation since there aren't any actual other data types in the type lol
function formatDateRange(project: Project) {
  const format = (value: string) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const start = format(project.startDate);
  const end = project.currentlyWorking ? "Present" : format(project.endDate);

  return `${start} – ${end}`;
}

// FilterDropdown: Shared dropdown pattern, duplicated from the blog page for now.
// TODO: extract into a shared component (e.g. @/components/FilterDropdown.tsx)
// so both blog and projects pages import the same implementation.
type FilterDropdownProps = {
  icon: React.ElementType;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  align?: "left" | "right";
};

const FilterDropdown = ({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  allLabel = "All",
  align = "left",
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = value || allLabel;

  return (
    <div ref={containerRef} className="relative flex-1 md:flex-none">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          relative
          overflow-hidden
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50/50
          dark:bg-slate-950/30
          px-4 py-3
          flex items-center gap-2
          cursor-pointer
          hover:border-rose-300 dark:hover:border-rose-800
          transition-colors
        "
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <Icon
          size={16}
          className="text-slate-400 dark:text-slate-500 flex-none"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300 flex-1 truncate">
          {displayValue}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 dark:text-slate-500 flex-none transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Panel — clamped width + edge-aware alignment so it never overflows the viewport */}
      {isOpen && (
        <div
          className={`
            absolute z-30 mt-2
            w-max max-w-[calc(100vw-2rem)]
            min-w-[10rem]
            ${align === "right" ? "right-0" : "left-0"}
            overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            bg-slate-50/90
            dark:bg-slate-950/80
            shadow-lg
          `}
        >
          {/* Search within options */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
            <Search
              size={14}
              className="text-slate-400 dark:text-slate-500 flex-none"
            />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="
                flex-1
                bg-transparent
                outline-none
                text-sm
                text-slate-700 dark:text-slate-300
                placeholder:text-slate-400 dark:placeholder:text-slate-600
              "
            />
          </div>

          {/* Options */}
          <div className="max-h-56 overflow-y-auto py-1">
            <button
              onClick={() => {
                onChange("");
                setIsOpen(false);
                setQuery("");
              }}
              className="
                w-full text-left px-3 py-2
                text-sm
                flex items-center justify-between gap-4
                text-slate-700 dark:text-slate-300
                hover:bg-rose-50/50 dark:hover:bg-rose-950/30
                hover:text-rose-800 dark:hover:text-rose-500
                cursor-pointer
              "
            >
              {allLabel}
              {!value && <Check size={14} />}
            </button>

            {filteredOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                  setQuery("");
                }}
                className="
                  w-full text-left px-3 py-2
                  text-sm
                  flex items-center justify-between gap-4
                  text-slate-700 dark:text-slate-300
                  hover:bg-rose-50/50 dark:hover:bg-rose-950/30
                  hover:text-rose-800 dark:hover:text-rose-500
                  cursor-pointer
                "
              >
                {opt}
                {value === opt && <Check size={14} />}
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <p className="px-3 py-2 text-sm text-slate-400 dark:text-slate-600 italic">
                No matches found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ProjectSearchBar: Dedicated component for the searching and filtering of results.
// Searches by title, and filters by skill and year.
type ProjectSearchBarProps = {
  searchQuery: string;
  skillFilter: string;
  yearFilter: string;
  availableSkills: string[];
  availableYears: string[];
  onSearchChange: (value: string) => void;
  onSkillFilterChange: (value: string) => void;
  onYearFilterChange: (value: string) => void;
};

const ProjectSearchBar = ({
  searchQuery,
  skillFilter,
  yearFilter,
  availableSkills,
  availableYears,
  onSearchChange,
  onSkillFilterChange,
  onYearFilterChange,
}: ProjectSearchBarProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-3">
      {/* Search card */}
      <div
        className="
          relative
          flex-1
          overflow-hidden
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50/50
          dark:bg-slate-950/30
          px-4 py-3
          flex items-center gap-2
        "
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <Search
          size={18}
          className="text-slate-400 dark:text-slate-500 flex-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search project titles..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-slate-700 dark:text-slate-300
            placeholder:text-slate-400 dark:placeholder:text-slate-600
          "
        />
      </div>

      {/* Filter row — skill + year sit side by side even on sm */}
      <div className="flex flex-row gap-3">
        <FilterDropdown
          icon={Tag}
          label="Skills"
          allLabel="All Skills"
          options={availableSkills}
          value={skillFilter}
          onChange={onSkillFilterChange}
        />

        <FilterDropdown
          icon={Calendar}
          label="Years"
          allLabel="All Years"
          options={availableYears}
          value={yearFilter}
          onChange={onYearFilterChange}
          align="right"
        />
      </div>
    </div>
  );
};

// ProjectSnippetCard: Contains a snippet of the project itself, but full details are hidden behind
// the View more link within the card
const ProjectSnippetCard = ({ project }: { project: Project }) => {
  const visibleSkills = project.skills.slice(0, 3);
  const remainingCount = project.skills.length - visibleSkills.length;

  return (
    <div className="relative w-full overflow-hidden flex flex-col rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md text-slate-700 dark:text-slate-300 text-sm transition hover:scale-105 cursor-pointer">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      {/* Image header — placeholder solid block for now */}
      <div className="relative w-full h-32 flex-none bg-slate-200 dark:bg-slate-900" />

      {/* Content column */}
      <div className="flex flex-col flex-1 min-w-0 gap-2 justify-between p-4">
        <div className="flex flex-col gap-2">
          {/* Name + date */}
          <div className="flex flex-row items-start justify-between gap-2">
            <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">
              {project.projectName}
            </h3>
            <span className="flex-none text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap pt-0.5">
              {formatDateRange(project)}
            </span>
          </div>

          {/* Skill badges */}
          <div className="flex flex-row flex-wrap gap-2 uppercase">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="select-none flex items-center gap-1 py-0.5 px-2 rounded-xl bg-rose-800 text-rose-50 text-xs"
              >
                {skill}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="select-none flex items-center gap-1 py-1 px-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs">
                +{remainingCount}
              </span>
            )}
          </div>

          {/* Description, clamped */}
          <p className="text-justify w-full text-gray-700 dark:text-gray-400 text-md line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* View more link */}
        <Link
          href={`/projects/${encodeURIComponent(project.projectName)}`}
          className="select-none flex items-center gap-1 text-xs font-semibold uppercase text-gray-500 hover:underline w-fit"
        >
          View more about this project
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const availableSkills = useMemo(() => {
    const allSkills = PROJECT_INDEX.flatMap((project) => project.skills);
    return Array.from(new Set(allSkills)).sort();
  }, []);

  const availableYears = useMemo(() => {
    const allYears = PROJECT_INDEX.map(
      (project) => project.startDate.split("-")[0],
    );
    return Array.from(new Set(allYears)).sort((a, b) => Number(b) - Number(a));
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECT_INDEX.filter((project) => {
      const matchesSearch = project.projectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSkill = !skillFilter || project.skills.includes(skillFilter);
      const matchesYear =
        !yearFilter || project.startDate.startsWith(yearFilter);
      return matchesSearch && matchesSkill && matchesYear;
    }).sort((a, b) => b.startDate.localeCompare(a.startDate));
  }, [searchQuery, skillFilter, yearFilter]);

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
        {/* Return to Home Option */}
        <Link
          href="/"
          className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase"
        >
          <ArrowLeft size={16} />
          <span>Return to Home</span>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3">
          <h1 className="text-3xl tracking-wider font-bold uppercase mb-2 flex flex-row items-center gap-2">
            <Laptop className="text-3xl text-rose-800" size={32} />
            Projects
          </h1>
        </div>

        {/* Page Description */}
        <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
          The index for all the projects that I have designed, developed,
          maintained, and now documented within this website. I first started
          documenting my journey in LinkedIn, but I reckon I would like to also
          document my progress in this website, where I can be more free with
          the options I would like to display.
        </p>
        <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
          Each project here is a project that is associated with a version of my
          professional self, with some being great successes while others
          missing the mark by a lot or humbling my perspective. For more
          information, the `View More` link is seen with each card for context.
        </p>

        <div className="w-full space-y-4 mt-4 mb-4">
          <ProjectSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            skillFilter={skillFilter}
            onSkillFilterChange={setSkillFilter}
            yearFilter={yearFilter}
            onYearFilterChange={setYearFilter}
            availableSkills={availableSkills}
            availableYears={availableYears}
          />
        </div>

        {/* Page Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-min">
          {filteredProjects.map((project: Project) => (
            <ProjectSnippetCard key={project.projectName} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
