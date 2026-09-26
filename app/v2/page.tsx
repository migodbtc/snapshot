"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Trophy,
  Award,
  Calendar,
  X,
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
    label: "Began Career",
    title: "2022",
    icon: Calendar,
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

// Blog items for the rotating carousel gallery (real posts + symbolic empty placeholders)
const blogCarouselItems = [
  {
    id: 5,
    tag: "REFLECTION",
    title: "The Skewed Linearity of My Software Engineering Progression",
    meta: "6 min read · 2026",
    image: "/images/about_stock_images/stock_1.jpg",
    href: "/blog/5",
    isPlaceholder: false,
  },
  {
    id: 4,
    tag: "CAREER",
    title: "Job Market in the Big 2026",
    meta: "5 min read · 2026",
    image: "/images/about_stock_images/stock_2.jpg",
    href: "/blog/4",
    isPlaceholder: false,
  },
  {
    id: 3,
    tag: "AI & CRAFT",
    title: "Learning to Slow Down in the Age of Artificial Intelligence",
    meta: "5 min read · 2026",
    image: "/images/about_stock_images/stock_3.jpg",
    href: "/blog/3",
    isPlaceholder: false,
  },
  {
    id: 2,
    tag: "INDUSTRY",
    title: "Looking at 'What Works' as Someone Who Looked at 'What's Hyped'",
    meta: "4 min read · 2026",
    image: "/images/about_stock_images/stock_4.jpg",
    href: "/blog/2",
    isPlaceholder: false,
  },
  {
    id: 1,
    tag: "ACADEMICS",
    title: "Dealing with Career Unknowns Post-Graduation",
    meta: "4 min read · 2026",
    image: "/images/about_stock_images/stock_5.jpg",
    href: "/blog/1",
    isPlaceholder: false,
  },
  {
    id: "empty-1",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/blog",
    isPlaceholder: true,
  },
  {
    id: "empty-2",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/blog",
    isPlaceholder: true,
  },
  {
    id: "empty-3",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/blog",
    isPlaceholder: true,
  },
];

// Testimonies data for the 2-row squares layout
const testimoniesData = [
  {
    id: 1,
    title: "Technical Leadership & Client Communication",
    quote:
      "I worked alongside Miguel on a cybersecurity audit project at Don Bosco Technical College, where he stepped up as team lead to direct an interview with the department head. He created a transcript, documented findings, that we used to evaluate security vulnerabilities. His client-facing communication and initiative during discovery assessments kept our audit thorough and grounded in real operational needs. Miguel is a dependable leader who maintains high standards across both technical deliverables and team coordination.",
    author: "Lance Kennedy Nafarrete",
    organization: "Fresh Graduate Data Analyst",
    isPlaceholder: false,
  },
  {
    id: 2,
    title: "—",
    quote: "—",
    author: "—",
    organization: "Pending Endorsement",
    isPlaceholder: true,
  },
  {
    id: 3,
    title: "—",
    quote: "—",
    author: "—",
    organization: "Pending Endorsement",
    isPlaceholder: true,
  },
  {
    id: 4,
    title: "—",
    quote: "—",
    author: "—",
    organization: "Pending Endorsement",
    isPlaceholder: true,
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
  const [activeTestimony, setActiveTestimony] = useState<
    (typeof testimoniesData)[0] | null
  >(null);

  // Lock body scroll and close on Escape when testimony modal is open
  useEffect(() => {
    if (!activeTestimony) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTestimony(null);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTestimony]);

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

          <div className="lg:col-span-5 flex flex-col justify-between min-h-[460px] sm:min-h-[480px]">
            {/* Top: Reduced Title + Reduced Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px", once: true }}
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
                viewport={{ margin: "-30px", once: true }}
                transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                className="text-sm sm:text-md text-slate-300 font-normal leading-relaxed text-justify mb-8 sm:mb-10"
              >
                Hello all! Welcome to my personal website. As you can tell, I am
                a software engineer who has graduated BS Information Technology
                from Don Bosco Technical College. I have passion for not only
                building and understanding systems and applications, but also
                understanding the different parts of the software development
                lifecycle especially at an age where AI can augment different
                parts of it. I focus on shipping effective, reliable code while
                maintaining readability and reducing technical debt as much as
                possible. Furthermore, I try to keep an open mind on
                understanding others' viewpoints and knowledge with their own
                professional experience - together we can lift each other up and
                continue to build human-focused digital solutions.
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
                    viewport={{ margin: "-30px", once: true }}
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
            viewport={{ margin: "-40px", once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 lg:col-start-7 w-full flex items-center justify-center"
          >
            <div className="relative w-full aspect-[16/10] md:aspect-auto lg:h-full lg:min-h-[500px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl group">
              <Image
                src="/images/hero_picture.jpg"
                alt="About Miguel Justin"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top grayscale contrast-105 group-hover:scale-[1.02] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10 flex flex-col text-left pointer-events-auto"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Built Projects Section: 3/9 Split with Timeline Mini-Column & Gallery */}
      <section
        id="projects"
        className="relative w-full min-h-screen py-16 sm:py-24 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        {/* Header: Large text that says Built Projects with scroll-up and fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px", once: true }}
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
                  viewport={{ margin: "-20px", once: true }}
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
              viewport={{ margin: "-40px", once: true }}
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
                    viewport={{ margin: "-30px", once: true }}
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

      {/* 4. Skills Section: Minimal Architectural Layout */}
      <section
        id="skills"
        className="relative w-full min-h-screen py-16 sm:py-24 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        <div id="stack" className="absolute -top-24" />

        {/* Header Row: Title on Left + Right Description matching reference image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px", once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16 sm:mb-20 pt-12 sm:pt-16"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Relevant <span className="text-rose-600">Skills</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed md:text-right max-w-sm sm:max-w-md">
            Skills & capabilities earned and honed through conceptual
            understanding and practical building - whether attained through
            academic studies or tech-driven curiosity.
          </p>
        </motion.div>

        {/* Architectural Skills Rows */}
        <div className="w-full flex flex-col">
          {skillSections.map((sec, idx) => (
            <motion.div
              key={sec.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-40px", once: true }}
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
                viewport={{ margin: "-40px", once: true }}
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
                  viewport={{ margin: "-40px", once: true }}
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
                  viewport={{ margin: "-40px", once: true }}
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
                      viewport={{ margin: "-40px", once: true }}
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

      {/* 5. Blog Section: Rotating Gallery Carousel */}
      <section
        id="blog"
        className="relative w-full py-24 sm:py-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="w-full flex flex-col mb-12 sm:mb-16">
          {/* Headline + Read All Link */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30px", once: true }}
              transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] max-w-3xl"
            >
              Personal reflections and thoughts from my experiences in{" "}
              <span className="text-rose-600">software engineering</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30px", once: true }}
              transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 pb-1"
              >
                <span>Read all posts</span>
                <ArrowUpRight className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Rotating Carousel Track with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-30px", once: true }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          className="-mx-8 md:-mx-12 relative overflow-hidden blog-carousel-container py-4"
        >
          {/* Subtle gradient vignette on left and right edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-20" />

          {/* Marquee Track: Duplicated list for seamless infinite loop */}
          <div className="blog-carousel-track flex items-center gap-5 sm:gap-6 w-max pl-8 md:pl-12">
            {[...blogCarouselItems, ...blogCarouselItems].map((post, idx) => (
              <Link
                key={`${post.id}-${idx}`}
                href={post.href}
                className="group relative w-[280px] sm:w-[320px] md:w-[350px] h-[400px] sm:h-[440px] rounded-3xl overflow-hidden shrink-0 border border-white/10 hover:border-white/25 shadow-2xl shadow-black/60 hover:shadow-black/90 transition-all duration-300 hover:scale-[1.02] bg-neutral-900 cursor-pointer block"
              >
                {/* Visual Background: Image or Dark Placeholder */}
                {post.image ? (
                  <div className="absolute inset-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 280px, 350px"
                      className="object-cover object-center grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 brightness-90"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-neutral-900 flex flex-col justify-between p-6">
                    {/* Minimal geometric background pattern for placeholder drafts */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.06),transparent_70%)]" />
                    <div className="absolute top-6 right-6 font-mono text-[10px] text-slate-600 uppercase tracking-widest select-none">
                      [ — ]
                    </div>
                  </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

                {/* Bottom Content: Category Tag, Title, and Meta */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 flex flex-col justify-end text-left z-10 pointer-events-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
                      {post.tag}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-200 leading-snug mt-2 line-clamp-2 group-hover:text-white transition-colors duration-200">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2.5 font-mono text-xs text-slate-400">
                    <span>{post.meta}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Carousel Animation Styles with Smooth Pause on Hover */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes blogMarquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .blog-carousel-track {
              display: flex;
              width: max-content;
              animation: blogMarquee 50s linear infinite;
              will-change: transform;
            }
            .blog-carousel-container:hover .blog-carousel-track {
              animation-play-state: paused;
            }
          `,
          }}
        />
      </section>

      {/* 6. Testimonies Section: 2 Rows of Squares inspired by reference layout */}
      <section
        id="testimonies"
        className="relative w-full min-h-screen py-24 sm:py-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Title + Description anchored cleanly (sticky on desktop) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-start lg:sticky lg:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
            >
              Peer <span className="text-rose-600">Testimonies</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed text-justify"
            >
              Perspectives from engineering leads, academic mentors, and
              collaborators on technical craftsmanship, reliability, and work
              ethic throughout my academic and professional journey.
            </motion.p>
          </div>

          {/* Right Column: 2 Rows of Squares (2x2 Grid) */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {testimoniesData.map((item, idx) => {
              const isClickable = !item.isPlaceholder;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  onClick={() => {
                    if (isClickable) setActiveTestimony(item);
                  }}
                  className={`group relative aspect-4/3 w-full rounded-3xl p-7 sm:p-8 flex flex-col justify-center shadow-2xl select-none transition-[border-color,background-color,box-shadow,transform] duration-300 ${
                    isClickable
                      ? "bg-neutral-900 border border-white/10 hover:border-white/25 hover:scale-[1.02] shadow-black/60 cursor-pointer"
                      : "bg-neutral-900/40 border border-white/5 shadow-black/30 opacity-40 cursor-default"
                  }`}
                >
                  {/* Top: Card Title & Index Number */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08 + 0.05,
                      ease: "easeOut",
                    }}
                    className="w-full flex items-center justify-between"
                  >
                    <h3
                      className={`pb-4 text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        isClickable
                          ? "text-white group-hover:text-rose-600"
                          : "text-slate-500"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-slate-600">
                      0{item.id}
                    </span>
                  </motion.div>

                  {/* Bottom: Quote Text & Attribution */}
                  <div className="flex flex-col gap-3">
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.08 + 0.1,
                        ease: "easeOut",
                      }}
                      className={`text-xs sm:text-sm font-normal leading-relaxed line-clamp-4 ${
                        isClickable
                          ? "text-slate-300 text-justify"
                          : "text-slate-600"
                      }`}
                    >
                      {item.isPlaceholder ? "—" : `“${item.quote}”`}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.08 + 0.15,
                        ease: "easeOut",
                      }}
                      className="pt-2 border-t border-white/5 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-semibold tracking-wide ${
                            isClickable ? "text-white" : "text-slate-500"
                          }`}
                        >
                          {item.author}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.organization}
                        </span>
                      </div>
                      {isClickable && (
                        <span className="text-[11px] font-mono text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Expand ↗
                        </span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimony Detail Modal */}
      <AnimatePresence>
        {activeTestimony && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveTestimony(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-neutral-900 border border-white/15 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black flex flex-col gap-6 z-10"
            >
              {/* Top Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-rose-500 uppercase tracking-wider">
                    0{activeTestimony.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeTestimony.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTestimony(null)}
                  className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Quote */}
              <div className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed text-justify py-5">
                &ldquo;{activeTestimony.quote}&rdquo;
              </div>

              {/* Attribution */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-wide">
                  {activeTestimony.author}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeTestimony.organization}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
