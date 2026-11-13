"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Laptop,
  Braces,
  BookOpen,
  MessageSquareQuote,
  Mail,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { V2Navbar } from "../_components/V2Navbar";
import {
  skillSections,
  blogCarouselItems,
  testimoniesData,
  sortedProjects,
  latestProjectIdsByYear,
  sectionCards,
  type TestimonyItem,
} from "./constants";
import { HeroSectionCard } from "./_components/HeroSectionCard";
import { ProjectTimelineItem } from "./_components/ProjectTimelineItem";
import { ProjectThumbnailButton } from "./_components/ProjectThumbnailButton";
import { SkillRow } from "./_components/SkillRow";
import { BlogCarouselCard } from "./_components/BlogCarouselCard";
import { TestimonyCard } from "./_components/TestimonyCard";
import { TestimonyModal } from "./_components/TestimonyModal";
import { ContactEmailCard } from "./_components/ContactEmailCard";

export default function V2HomePage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    sortedProjects[0].projectId,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const [activeTestimony, setActiveTestimony] = useState<TestimonyItem | null>(
    null,
  );
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const currentProjectIndex = sortedProjects.findIndex(
    (p) => p.projectId === selectedProjectId,
  );

  const handleNextProject = () => {
    if (currentProjectIndex < sortedProjects.length - 1) {
      setSelectedProjectId(sortedProjects[currentProjectIndex + 1].projectId);
      setSelectedImageIndex(0);
    }
  };

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setSelectedProjectId(sortedProjects[currentProjectIndex - 1].projectId);
      setSelectedImageIndex(0);
    }
  };

  const activeProjectButtonRef = useRef<HTMLButtonElement | null>(null);
  const desktopTimelineRef = useRef<HTMLDivElement | null>(null);
  const activeDesktopItemRef = useRef<HTMLDivElement | null>(null);

  // Autofocus/center on the current project in the mobile/tablet row
  useEffect(() => {
    if (activeProjectButtonRef.current) {
      activeProjectButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedProjectId]);

  // Dynamic refocus: vertically center the active project in the columnar timeline
  useEffect(() => {
    const container = desktopTimelineRef.current;
    const item = activeDesktopItemRef.current;
    if (container && item) {
      const itemTop = item.offsetTop;
      const itemHeight = item.offsetHeight;
      const containerHeight = container.clientHeight;
      const targetScroll = itemTop - containerHeight / 2 + itemHeight / 2;
      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [selectedProjectId]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail("");
    }, 4500);
  };

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
    currentProject.imageRefs[0]?.imageRef ||
    "/newheroimage.jpg";

  // 4 other supporting pictures in a single column
  const supportingImages = currentProject.imageRefs.slice(1, 5);

  return (
    <main className="relative flex flex-col items-center w-full min-h-screen">
      {/* 1. Hero Section with Background Image & Overlay Content */}
      <section
        id="overview"
        className="relative w-full min-h-[90dvh] lg:min-h-screen overflow-hidden bg-neutral-950 flex flex-col justify-between"
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

            {/* Right Side: Exactly 3 uniform section cards in a fluid grid */}
            <div className="lg:col-span-5 flex flex-col justify-end w-full">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full items-end">
                {sectionCards.map((card, i) => (
                  <HeroSectionCard key={card.title} card={card} index={i} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. About Me Section: Split About Me Layout */}
      <section
        id="about"
        className="relative w-full min-h-screen py-24 sm:py-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-stretch">
          {/* Left Column: Title + Description */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px", once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full mb-6 sm:mb-8"
            >
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                About <span className="text-rose-600">Me</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30px", once: true }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className="text-base sm:text-lg lg:text-[17px] xl:text-lg text-slate-300 font-normal leading-relaxed text-justify"
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
              understanding others&apos; viewpoints and knowledge with their
              own professional experience - together we can lift each other up
              and continue to build human-focused digital solutions.
            </motion.p>
          </div>

          {/* Right Column: Profile Picture anchored to the right side */}
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Built Projects Section: 3/9 Split with Timeline Mini-Column & Gallery */}
      <section
        id="projects"
        className="relative w-full min-h-screen py-16 sm:py-24 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
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

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Mobile & Tablet Row-Based Project Navigator with Flanking Chevrons (lg:hidden) */}
          <div className="lg:hidden w-full flex items-center gap-1.5 sm:gap-2">
            {/* Left Chevron */}
            <button
              type="button"
              onClick={handlePrevProject}
              disabled={currentProjectIndex === 0}
              className="p-2 rounded-xl bg-neutral-900/80 border border-white/5 text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Horizontal Project Strip without Scrollbar */}
            <div className="flex items-center gap-2 overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 w-full scroll-smooth">
              {sortedProjects.map((proj, idx) => {
                const isSelected = proj.projectId === currentProject.projectId;
                const isLatest = latestProjectIdsByYear.has(proj.projectId);
                const yr = proj.startDate ? proj.startDate.slice(0, 4) : "";
                return (
                  <button
                    key={proj.projectId}
                    ref={isSelected ? activeProjectButtonRef : null}
                    type="button"
                    onClick={() => {
                      setSelectedProjectId(proj.projectId);
                      setSelectedImageIndex(0);
                    }}
                    className={`shrink-0 px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 border cursor-pointer select-none ${
                      isSelected
                        ? "bg-rose-950/40 border-rose-500 text-white font-semibold shadow-sm"
                        : "bg-neutral-900/80 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20"
                    }`}
                  >
                    {isLatest && (
                      <span
                        className={`font-mono text-[11px] ${
                          isSelected
                            ? "text-rose-400 font-bold"
                            : "text-slate-500"
                        }`}
                      >
                        {yr}
                      </span>
                    )}
                    <span className="truncate max-w-[150px] sm:max-w-[200px]">
                      {proj.projectName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Chevron */}
            <button
              type="button"
              onClick={handleNextProject}
              disabled={currentProjectIndex === sortedProjects.length - 1}
              className="p-2 rounded-xl bg-neutral-900/80 border border-white/5 text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Desktop Dynamic Columnar Timeline (hidden on mobile/tablet, shown on lg+) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col">
            <div
              ref={desktopTimelineRef}
              className="flex flex-col gap-3.5 max-h-[460px] lg:max-h-[500px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2 scroll-smooth"
            >
              {sortedProjects.map((proj, idx) => (
                <div
                  key={proj.projectId}
                  ref={
                    proj.projectId === selectedProjectId
                      ? activeDesktopItemRef
                      : null
                  }
                >
                  <ProjectTimelineItem
                    project={proj}
                    index={idx}
                    isSelected={proj.projectId === currentProject.projectId}
                    isHovered={hoveredProjectId === proj.projectId}
                    hasAnyHover={hoveredProjectId !== null}
                    isLatestOfYear={latestProjectIdsByYear.has(proj.projectId)}
                    year={proj.startDate ? proj.startDate.slice(0, 4) : ""}
                    onSelect={() => {
                      setSelectedProjectId(proj.projectId);
                      setSelectedImageIndex(0);
                    }}
                    onHover={() => setHoveredProjectId(proj.projectId)}
                    onLeave={() => setHoveredProjectId(null)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bigger Column (9 cols): Gallery style rendering with Main Image + 4 Supporting Thumbnails */}
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

              {/* Text on bottom left for header + description */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end text-left pointer-events-auto">
                <AnimatePresence mode="wait">
                  <div key={currentProject.projectId} className="flex flex-col">
                    {selectedImageIndex > 0 && (
                      <motion.span
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-xs uppercase tracking-wider text-rose-400 mb-1 inline-flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        Screenshot 0{selectedImageIndex + 1} of 0{currentProject.imageRefs.length}
                      </motion.span>
                    )}
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

            {/* 4 Supporting Pictures in a Column on the Right Side */}
            {supportingImages.length > 0 && (
              <div className="w-full md:w-36 lg:w-44 xl:w-48 flex flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0">
                {supportingImages.map((img, idx) => (
                  <ProjectThumbnailButton
                    key={`${currentProject.projectId}-${idx}`}
                    image={img}
                    projectName={currentProject.projectName}
                    index={idx}
                    isSelected={selectedImageIndex === idx + 1}
                    onSelect={() =>
                      setSelectedImageIndex(
                        selectedImageIndex === idx + 1 ? 0 : idx + 1,
                      )
                    }
                  />
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
            <SkillRow key={sec.index} section={sec} index={idx} />
          ))}
        </div>
      </section>

      {/* 5. Blog Section: Rotating Gallery Carousel */}
      <section
        id="blog"
        className="relative w-full py-24 sm:py-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start overflow-hidden"
      >
        <div className="w-full flex flex-col mb-12 sm:mb-16">
          <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-4 sm:gap-5 max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-30px", once: true }}
                transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
              >
                Personal reflections and thoughts from my experiences in{" "}
                <span className="text-rose-600">software engineering</span>.
              </motion.h2>

              {/* Tablet & Mobile button placed below the header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-30px", once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex lg:hidden"
              >
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>Read all posts</span>
                  <ArrowUpRight className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>

            {/* Desktop right-aligned button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30px", once: true }}
              transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
              className="hidden lg:flex"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 pb-1 whitespace-nowrap"
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent z-20" />

          <div className="blog-carousel-track flex items-center gap-5 sm:gap-6 w-max pl-8 md:pl-12">
            {[...blogCarouselItems, ...blogCarouselItems].map((post, idx) => (
              <BlogCarouselCard key={`${post.id}-${idx}`} post={post} />
            ))}
          </div>
        </motion.div>

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

      {/* 6. Testimonies Section: 2 Rows of Squares */}
      <section
        id="testimonies"
        className="relative w-full min-h-screen py-24 sm:py-32 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Title + Description */}
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
            {testimoniesData.map((item, idx) => (
              <TestimonyCard
                key={item.id}
                item={item}
                index={idx}
                onSelect={() => setActiveTestimony(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section
        id="contact"
        className="relative w-full min-h-[90dvh] lg:min-h-screen overflow-hidden bg-neutral-950 flex flex-col justify-between py-16 sm:py-24 px-8 md:px-12"
      >
        {/* Background Image Layer with grayscale and dark overlay matching Hero */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/apollo-demo.jpg"
            alt="Apollo background"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-75"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Content container layered above background */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between gap-16 sm:gap-20">
          <div className="w-full flex flex-col gap-8 sm:gap-10 pt-4 sm:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <span className="font-mono text-xs sm:text-sm text-slate-400 tracking-wider">
                Keep in touch.
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] max-w-2xl">
                Why don&apos;t we{" "}
                <span className="text-rose-600">work something out?</span>
              </h2>
            </motion.div>

            {/* Email Input Card */}
            <ContactEmailCard
              email={newsletterEmail}
              submitted={newsletterSubmitted}
              onChange={setNewsletterEmail}
              onSubmit={handleNewsletterSubmit}
            />
          </div>

          {/* Bottom Row: Location on Left, Site / Social / Contact on Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="w-full pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 sm:gap-10 text-xs sm:text-sm select-none"
          >
            <div className="text-slate-400 font-mono tracking-wide leading-relaxed">
              To God be the glory.
            </div>

            {/* Key-Value Meta Grid (Site, Social, Contact) */}
            <div className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm font-sans">
              {/* Site Links */}
              <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[75px_1fr] items-baseline gap-2">
                <span className="font-mono text-slate-500 text-xs uppercase tracking-wider">
                  Site:
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-300">
                  <a
                    href="#overview"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>Home</span>
                  </a>
                  <a
                    href="#about"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>About</span>
                  </a>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Laptop className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>Work</span>
                  </a>
                  <a
                    href="#stack"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Braces className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>Stack</span>
                  </a>
                  <a
                    href="#blog"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>Blog</span>
                  </a>
                  <a
                    href="#testimonies"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>Testimonies</span>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[75px_1fr] items-baseline gap-2">
                <span className="font-mono text-slate-500 text-xs uppercase tracking-wider">
                  Social:
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-300">
                  <a
                    href="https://www.github.com/migodbtc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <SiGithub className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/migueljustin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <FaLinkedin className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 transition-colors shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Contact Email */}
              <div className="grid grid-cols-[65px_1fr] sm:grid-cols-[75px_1fr] items-baseline gap-2">
                <span className="font-mono text-slate-500 text-xs uppercase tracking-wider">
                  Contact:
                </span>
                <div>
                  <a
                    href="mailto:migueljustin.bunda@gmail.com?subject=Inquiry%20via%20migueljustin.vercel.app"
                    className="group inline-flex items-center gap-1.5 text-slate-300 hover:text-rose-400 font-mono transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-colors shrink-0" />
                    <span>migueljustin.bunda@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimony Detail Modal */}
      <TestimonyModal
        activeTestimony={activeTestimony}
        onClose={() => setActiveTestimony(null)}
      />
    </main>
  );
}
