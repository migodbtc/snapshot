"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Trophy,
  Award,
} from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiYaml,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiVite,
  SiFlask,
  SiFastapi,
  SiLaravel,
  SiInertia,
  SiTailwindcss,
  SiBootstrap,
  SiDocker,
  SiLinux,
  SiNginx,
  SiRedis,
  SiGithubactions,
  SiVercel,
  SiGit,
  SiSupabase,
  SiPytest,
  SiVitest,
  SiLangchain,
  SiTensorflow,
  SiGooglegemini,
  SiOllama,
} from "react-icons/si";
import { TbBrandAzure, TbBrandAws } from "react-icons/tb";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { V2Navbar } from "./_components/V2Navbar";
import { PROJECT_INDEX } from "@/lib/constants/projects";

// Divider phrases for the About section
const aboutDividerPhrases = [
  "Software Engineering",
  "AWS Certified AI Practitioner",
  "Valedictorian '26",
  "Don Bosco Technical College",
  "Full-Stack Developer",
];

// 3 FYI cards for About Me (styled like hero cards)
const aboutFyiCards = [
  {
    label: "Education",
    title: "BS Information Technology",
    icon: GraduationCap,
  },
  {
    label: "Academic Honors",
    title: "Valedictorian, Magna Cum Laude",
    icon: Trophy,
  },
  {
    label: "Certification",
    title: "AWS Certified AI Practitioner",
    icon: Award,
  },
];

// Detailed Skills structured into 4 architectural rows
const skillSections = [
  {
    index: "01",
    title: "Programming & Query Languages",
    subtitle:
      "Core languages for type-safe applications, script automation, and database querying.",
    description:
      "Proficient in type-safe full-stack engineering, asynchronous backend services, and structured query optimization across production and prototype environments.",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
      { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
      { name: "Bash", icon: SiGnubash, color: "text-[#4EAA25]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS", icon: SiCss, color: "text-[#1572B6]" },
      { name: "YAML", icon: SiYaml, color: "text-[#CB171E]" },
    ],
  },
  {
    index: "02",
    title: "Frameworks & UI Systems",
    subtitle:
      "Modern client-side and server-side frameworks for reactive, accessible web platforms.",
    description:
      "Building high-performance SSR/SSG applications, modular REST APIs, and responsive design systems with deep emphasis on accessibility and developer velocity.",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "React Native", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Expo", icon: SiExpo, color: "text-white" },
      { name: "Inertia.js", icon: SiInertia, color: "text-[#9553E9]" },
      { name: "Vite", icon: SiVite, color: "text-[#646CFF]" },
      { name: "FastAPI", icon: SiFastapi, color: "text-[#009688]" },
      { name: "Flask", icon: SiFlask, color: "text-white" },
      { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-[#7952B3]" },
    ],
  },
  {
    index: "03",
    title: "Cloud, DevOps & Data Platforms",
    subtitle:
      "Infrastructure-as-Code, containerization, automated CI/CD, and scalable database layers.",
    description:
      "Hands-on experience provisioning Azure App Services and container registries via Bicep, deploying AWS compute instances, and configuring least-privilege PostgreSQL RLS.",
    skills: [
      { name: "Microsoft Azure", icon: TbBrandAzure, color: "text-[#0078D4]" },
      { name: "AWS (EC2)", icon: TbBrandAws, color: "text-[#FF9900]" },
      { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Linux", icon: SiLinux, color: "text-[#FCC624]" },
      { name: "Nginx", icon: SiNginx, color: "text-[#009639]" },
      { name: "Redis", icon: SiRedis, color: "text-[#FF4438]" },
      { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        color: "text-[#2088FF]",
      },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
    ],
  },
  {
    index: "04",
    title: "AI Engineering, Testing & Tools",
    subtitle:
      "Context-aware RAG pipelines, automated test suites, and enterprise auth patterns.",
    description:
      "Certified in foundational and agentic AI concepts on AWS. Experienced architecting vector RAG ingestion pipelines, automated Pytest/Vitest suites, and role-based security.",
    skills: [
      { name: "Google Gemini", icon: SiGooglegemini, color: "text-[#8E75B2]" },
      { name: "LangChain", icon: SiLangchain, color: "text-[#1C3C3C]" },
      { name: "Ollama", icon: SiOllama, color: "text-white" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-[#FF6F00]" },
      { name: "Pytest", icon: SiPytest, color: "text-[#0A9EDC]" },
      { name: "Vitest", icon: SiVitest, color: "text-[#FCC72B]" },
    ],
  },
];

// Sort projects from latest to oldest
const sortedProjects = [...PROJECT_INDEX].sort((a, b) => {
  const dateDiff = b.startDate.localeCompare(a.startDate);
  if (dateDiff !== 0) return dateDiff;
  return b.projectId - a.projectId;
});

// Identify the latest project ID for each year to hold the year number
const latestProjectIdsByYear = new Set<number>();
const seenYears = new Set<string>();
for (const proj of sortedProjects) {
  const year = proj.startDate ? proj.startDate.slice(0, 4) : "";
  if (year && !seenYears.has(year)) {
    seenYears.add(year);
    latestProjectIdsByYear.add(proj.projectId);
  }
}

export default function V2HomePage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    sortedProjects[0].projectId,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const [hoveredFyiIndex, setHoveredFyiIndex] = useState<number | null>(null);

  // Scroll animations matching main page hero
  const { scrollY } = useScroll();
  const fadeOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const fadeY = useTransform(scrollY, [0, 400], [0, 80]);

  const currentProject =
    sortedProjects.find((p) => p.projectId === selectedProjectId) ||
    sortedProjects[0];

  const mainImage =
    currentProject.imageRefs[selectedImageIndex]?.imageRef ||
    currentProject.imageRefs[0]?.imageRef;

  // 4 other supporting pictures in a single column
  const supportingImages = currentProject.imageRefs.slice(1, 5);

  const sectionCards = [
    {
      label: "Selected Works",
      title: "Featured Projects",
      href: "#projects",
    },
    {
      label: "Background",
      title: "About Me",
      href: "#about",
    },
    {
      label: "Capabilities",
      title: "Technical Skills",
      href: "#skills",
    },
  ];

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen pb-16">
      {/* 1. Hero Section with Background Image & Overlay Content */}
      <section
        id="overview"
        className="relative w-full h-[90dvh] lg:h-screen overflow-hidden bg-neutral-950 flex flex-col justify-between"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/newheroimage.jpg"
            alt="Miguel Justin Bunda"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top grayscale contrast-100"
          />
          {/* Dark vignette overlay for contrast and depth */}
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Header layered above the hero image */}
        <div className="relative z-20 w-full">
          <V2Navbar />
        </div>

        {/* Hero Content: Left Header & Bio + Right Minimal Section Cards */}
        <motion.div
          style={{ opacity: fadeOpacity, y: fadeY }}
          className="relative z-10 w-full flex-1 flex items-end px-8 md:px-12 pb-10 sm:pb-14 pt-8"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Side: Header text & description about myself */}
            <div className="lg:col-span-7 flex flex-col justify-end">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-4"
              >
                Miguel Justin Bunda
                <br />
                <span className="text-transparent bg-clip-text bg-rose-600">
                  Software Engineer
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl mb-6"
              >
                AWS Certified AI Practitioner and BS Information Technology
                graduate (Magna Cum Laude, Batch Valedictorian) from Don Bosco
                Technical College. I architect scalable full-stack web
                platforms, distributed APIs, and cloud infrastructure with
                Next.js, TypeScript, Python, Azure, and PostgreSQL/MySQL.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-3"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-rose-800 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(159,18,57,0.35)] transition-all hover:scale-[1.02]"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-medium text-xs sm:text-sm transition-all hover:scale-[1.02]"
                >
                  <span>Contact Me</span>
                </a>
              </motion.div>
            </div>

            {/* Right Side: Exactly 3 uniform borderless section cards (animated per row/card) */}
            <div className="lg:col-span-5 flex flex-col justify-end w-full">
              <div className="flex flex-wrap-reverse gap-3 items-end justify-start lg:justify-end">
                {sectionCards.map(({ label, title, href }, i) => (
                  <motion.a
                    key={title}
                    href={href}
                    initial={{ opacity: 0, y: 25, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + i * 0.12,
                      ease: "easeOut",
                    }}
                    className="w-full sm:w-[210px] h-[105px] p-4 rounded-2xl bg-slate-900/15 backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-rose-400 shrink-0" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white truncate">
                        {title}
                      </h3>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Built Projects Section: 3/9 Split with Timeline Mini-Column & Gallery */}
      <section
        id="projects"
        className="relative w-full min-h-screen pt-16 py-8 sm:pt-24 sm:pb-16 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        {/* Header: Large text that says Built Projects with scroll-up and fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px", once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Built <span className="text-rose-600">Projects</span>
          </h2>
        </motion.div>

        {/* 3 / 9 Split Row */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Smaller Column (3 cols): Project Names with Timeline Mini-Column & Focus Interaction */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 max-h-[620px] overflow-y-auto pr-2">
            {sortedProjects.map((proj, idx) => {
              const isSelected = proj.projectId === currentProject.projectId;
              const isHovered = hoveredProjectId === proj.projectId;
              const isFocused =
                isHovered || (hoveredProjectId === null && isSelected);
              const hasAnyHover = hoveredProjectId !== null;
              const isLatestOfYear = latestProjectIdsByYear.has(proj.projectId);
              const year = proj.startDate ? proj.startDate.slice(0, 4) : "";

              return (
                <motion.div
                  key={proj.projectId}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-20px", once: false }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(idx * 0.04, 0.3),
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setHoveredProjectId(proj.projectId)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className={`flex items-center gap-2.5 sm:gap-3 group transition-opacity duration-300 ${
                    hasAnyHover && !isHovered ? "opacity-40" : "opacity-100"
                  }`}
                >
                  {/* Mini column on the left: Year on the latest project of that year, otherwise a single line */}
                  <div className="w-10 shrink-0 flex items-center justify-end font-mono text-xs sm:text-sm select-none">
                    {isLatestOfYear ? (
                      <span
                        className={`font-semibold tracking-wider transition-colors ${
                          isFocused
                            ? "text-rose-500 font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {year}
                      </span>
                    ) : (
                      <span
                        className={`tracking-widest transition-colors ${
                          isFocused
                            ? "text-rose-500 font-bold"
                            : "text-slate-600"
                        }`}
                      >
                        &mdash;
                      </span>
                    )}
                  </div>

                  {/* Project Name formatted with underline and focus indicator */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProjectId(proj.projectId);
                      setSelectedImageIndex(0);
                    }}
                    className={`text-left transition-all duration-200 cursor-pointer select-none underline underline-offset-4 text-base sm:text-lg flex items-center gap-2 ${
                      isSelected
                        ? "text-white font-bold decoration-rose-500 decoration-2"
                        : isHovered
                          ? "text-slate-100 decoration-slate-300 decoration-1"
                          : "text-slate-400 hover:text-slate-200 decoration-slate-600 hover:decoration-slate-300 decoration-1"
                    }`}
                  >
                    <span>{proj.projectName}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] shrink-0" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Bigger Column (9 cols): Gallery style rendering with Main Image + Right Column of 4 Supporting Images */}
          <div className="lg:col-span-9 flex flex-col md:flex-row gap-3 sm:gap-4 w-full items-stretch">
            {/* Main Picture with scroll-up entrance, fade-in, and gradient overlay */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: "-40px", once: false }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="relative flex-1 aspect-[16/10] md:aspect-auto md:min-h-[480px] lg:min-h-[520px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentProject.projectId}-${selectedImageIndex}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={mainImage}
                    alt={currentProject.projectName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top transition-all duration-500"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient: transparent at the top to black at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none" />

              {/* Text on bottom left for header + description (separate scroll-up and fade-in animations) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end text-left pointer-events-auto">
                <AnimatePresence mode="wait">
                  <div key={currentProject.projectId} className="flex flex-col">
                    <motion.a
                      href={`/projects/${currentProject.projectId}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="group inline-flex items-center gap-2 sm:gap-3 mb-2 cursor-pointer w-fit"
                    >
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl tracking-wide font-extrabold text-white leading-tight underline underline-offset-8 decoration-slate-300 hover:decoration-rose-600 transition-colors">
                        {currentProject.projectName}
                      </h3>
                      <ArrowUpRight className="w-8 h-8 sm:w-12 sm:h-12 text-rose-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 shrink-0" />
                    </motion.a>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.08,
                        ease: "easeOut",
                      }}
                      className="text-sm sm:text-md text-slate-300 line-clamp-3 w-full text-justify leading-relaxed"
                    >
                      {currentProject.description}
                    </motion.p>
                  </div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 4 Supporting Pictures in a Column on the Right Side (per-image scroll-up and fade-in animation) */}
            {supportingImages.length > 0 && (
              <div className="w-full md:w-36 lg:w-44 xl:w-48 flex flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0">
                {supportingImages.map((img, idx) => (
                  <motion.button
                    key={`${currentProject.projectId}-${idx}`}
                    type="button"
                    initial={{
                      opacity: 0,
                      y: 30,
                      scale: 0.95,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{ margin: "-30px", once: false }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: "easeOut",
                    }}
                    onClick={() => setSelectedImageIndex(idx + 1)}
                    className={`relative flex-1 aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden bg-neutral-900 border transition-all duration-300 cursor-pointer ${
                      selectedImageIndex === idx + 1
                        ? "border-rose-500 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.25)] opacity-100 scale-[1.02]"
                        : "border-white/5 opacity-60 hover:opacity-100 hover:scale-[1.02]"
                    }`}
                    title={`View preview ${idx + 2}`}
                  >
                    <Image
                      src={img.imageRef}
                      alt={`${currentProject.projectName} supporting ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 25vw, 15vw"
                      className="object-cover object-top grayscale "
                    />
                    <div
                      className={`absolute inset-0 ${
                        selectedImageIndex == idx + 1
                          ? "bg-rose-600/30"
                          : "bg-neutral-900/80"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. About Me Section: Gallery Row + Split About Me Layout */}
      <section
        id="about"
        className="relative w-full min-h-screen py-24 sm:py-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start "
      >
        {/* Minimal Text-based Divider with scroll-up and fade-in */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-20px", once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex items-center justify-between gap-3 sm:gap-6 font-mono text-xs sm:text-sm tracking-wider uppercase select-none py-12 mb-10 sm:mb-14 overflow-x-auto no-scrollbar"
        >
          {aboutDividerPhrases.map((phrase, idx) => (
            <Fragment key={phrase}>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20px", once: false }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.07,
                  ease: "easeOut",
                }}
                className={`shrink-0 hover:text-slate-200 transition-colors ${
                  phrase.includes("Valedictorian")
                    ? "font-bold text-slate-300"
                    : "font-semibold text-slate-400"
                }`}
              >
                {phrase}
              </motion.span>
              {idx < aboutDividerPhrases.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-20px", once: false }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.07 + 0.04,
                    ease: "easeOut",
                  }}
                  className="text-slate-600 shrink-0 select-none"
                >
                  |
                </motion.span>
              )}
            </Fragment>
          ))}
        </motion.div> */}

        {/* Row 2: Split Layout (Title + Description + 3 FYI cards on Left, Placeholder Picture occupying most of the right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-stretch">
          {/* Left Column: Title + Short Description + 3 FYI Cards at the very bottom */}

          <div className="lg:col-span-4 flex flex-col justify-between min-h-[460px] sm:min-h-[480px]">
            {/* Top: Reduced Title + Reduced Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px", once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                About <span className="text-rose-600">Me</span>
              </h2>
            </motion.div>
            <div className="flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-30px", once: false }}
                transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed text-justify mb-8 sm:mb-10"
              >
                I am a software engineer, AWS Certified AI Practitioner, and BS
                Information Technology graduate from Don Bosco Technical
                College, graduating as Batch Valedictorian and Magna Cum Laude
                with a GWA of 1.26/1.00. I focus on architecting resilient
                full-stack applications, modular cloud infrastructure, and
                human-centered web systems. From delivering core CRM backend
                pipelines during my internship at Rakso Creative Technologies to
                engineering cloud-native IaC architectures and AI/RAG
                integrations, I turn complex problems into elegant,
                production-ready solutions.
              </motion.p>
            </div>

            {/* Bottom: 3 FYI Cards with focus interaction and scroll-up entrance */}
            <div className="flex flex-wrap-reverse gap-3 items-start justify-start pt-4">
              {aboutFyiCards.map(({ label, title, icon: Icon }, i) => {
                const isCardHovered = hoveredFyiIndex === i;
                const hasAnyCardHovered = hoveredFyiIndex !== null;

                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-30px", once: false }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.1,
                      ease: "easeOut",
                    }}
                    onMouseEnter={() => setHoveredFyiIndex(i)}
                    onMouseLeave={() => setHoveredFyiIndex(null)}
                    className={`w-full sm:w-[185px] xl:w-[195px] h-[105px] p-4 rounded-2xl backdrop-blur-xl transition-all duration-300 cursor-default select-none flex flex-col justify-between ${
                      isCardHovered
                        ? "bg-slate-900/40 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.18)] scale-[1.03] opacity-100"
                        : hasAnyCardHovered
                          ? "bg-slate-900/10 border border-transparent opacity-50"
                          : "bg-slate-900/15 border border-white/5 opacity-100 hover:scale-[1.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {label}
                      </span>
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isCardHovered ? "text-rose-400" : "text-rose-500/80"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                        {title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Placeholder Picture anchored to the right side with scroll-up and fade-in */}
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-40px", once: false }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 lg:col-start-7 w-full flex items-center justify-center"
          >
            <div className="relative w-full aspect-[16/10] md:aspect-auto lg:h-full lg:min-h-[500px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl group">
              {/* <Image
                src="/images/about_stock_images/stock_6.jpg"
                alt="About Miguel Justin"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-105 group-hover:scale-[1.02] transition-all duration-700"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10 flex flex-col text-left pointer-events-auto"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Skills Section: Minimal Architectural Layout */}
      <section
        id="skills"
        className="relative w-full min-h-screen pb-24 sm:pb-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        <div id="stack" className="absolute -top-24" />

        {/* Header Row: Title on Left + Right Description matching reference image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px", once: false }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 sm:mb-20 pt-12 sm:pt-16"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Relevant <span className="text-rose-600">Skills</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed md:text-right max-w-sm sm:max-w-md">
            Every architecture is engineered with clarity, system integrity, and
            deliberate performance.
          </p>
        </motion.div>

        {/* Architectural Skills Rows */}
        <div className="w-full flex flex-col">
          {skillSections.map((sec, idx) => (
            <motion.div
              key={sec.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-40px", once: false }}
              transition={{
                duration: 0.4,
                delay: idx * 0.06,
                ease: "easeOut",
              }}
              className="w-full border-b border-white/10 pb-10 sm:pb-14 pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start group"
            >
              {/* Left: Bracketed Index */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-40px", once: false }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06 + 0.04,
                  ease: "easeOut",
                }}
                className="md:col-span-1 lg:col-span-2"
              >
                <span className="font-mono text-xs sm:text-sm text-slate-500 group-hover:text-rose-600 transition-colors tracking-wider select-none">
                  [ {sec.index} ]
                </span>
              </motion.div>

              {/* Middle: Title & Tagline */}
              <div className="md:col-span-6 lg:col-span-5 flex flex-col">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-40px", once: false }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.06 + 0.08,
                    ease: "easeOut",
                  }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight"
                >
                  {sec.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-40px", once: false }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.06 + 0.12,
                    ease: "easeOut",
                  }}
                  className="text-md sm:text-lg text-slate-400 my-1.5 sm:my-2"
                >
                  {sec.subtitle}
                </motion.p>
              </div>

              {/* Right: Detailed Description & Badges */}
              <div className="md:col-span-5 lg:col-span-5 flex flex-col">
                {/* Skill Badges with official icons */}
                <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                  {sec.skills.map(({ name, icon: Icon, color }, bIdx) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ margin: "-40px", once: false }}
                      transition={{
                        duration: 0.35,
                        delay: idx * 0.06 + 0.16 + bIdx * 0.025,
                        ease: "easeOut",
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 text-slate-300 hover:text-white transition-all duration-200 select-none group/badge shadow-sm cursor-default"
                    >
                      <Icon
                        className={`w-5 h-5 ${color} group-hover/badge:scale-110 transition-transform duration-200 shrink-0`}
                      />
                      <span className="text-sm font-mono tracking-wide">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
