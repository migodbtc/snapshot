"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { V2Navbar } from "./_components/V2Navbar";
import { PROJECT_INDEX } from "@/lib/constants/projects";

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
      label: "Career History",
      title: "Work Experience",
      href: "#experience",
    },
    {
      label: "Capabilities",
      title: "Technical Stack",
      href: "#stack",
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
                BS Information Technology graduate from Don Bosco Technical
                College. I architect scalable full-stack web platforms,
                distributed APIs, and cloud infrastructure with Next.js,
                TypeScript, Python, Azure, and Supabase.
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
        className="relative w-full min-h-screen py-16 sm:py-24 px-8 md:px-12 bg-neutral-950 flex flex-col justify-start"
      >
        {/* Header: Large text that says Built Projects */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Built <span className="text-rose-600">Projects</span>
          </h2>
        </motion.div>

        {/* 3 / 9 Split Row */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Smaller Column (3 cols): Project Names with Timeline Mini-Column */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 max-h-[620px] overflow-y-auto pr-2">
            {sortedProjects.map((proj, idx) => {
              const isSelected = proj.projectId === currentProject.projectId;
              const isLatestOfYear = latestProjectIdsByYear.has(proj.projectId);
              const year = proj.startDate ? proj.startDate.slice(0, 4) : "";

              return (
                <motion.div
                  key={proj.projectId}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-20px", once: true }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(idx * 0.05, 0.35),
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-2.5 sm:gap-3 group"
                >
                  {/* Mini column on the left: Year on the latest project of that year, otherwise a single line */}
                  <div className="w-10 shrink-0 flex items-center justify-end font-mono text-xs sm:text-sm select-none">
                    {isLatestOfYear ? (
                      <span
                        className={`font-semibold tracking-wider transition-colors ${
                          isSelected
                            ? "text-rose-500 font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {year}
                      </span>
                    ) : (
                      <span
                        className={`tracking-widest transition-colors ${
                          isSelected
                            ? "text-rose-500 font-bold"
                            : "text-slate-600"
                        }`}
                      >
                        &mdash;
                      </span>
                    )}
                  </div>

                  {/* Project Name formatted with underline */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProjectId(proj.projectId);
                      setSelectedImageIndex(0);
                    }}
                    className={`text-left transition-all duration-200 cursor-pointer select-none underline underline-offset-4 text-base sm:text-lg ${
                      isSelected
                        ? "text-white font-bold decoration-rose-500 decoration-2"
                        : "text-slate-400 hover:text-slate-200 decoration-slate-600 hover:decoration-slate-300 decoration-1"
                    }`}
                  >
                    {proj.projectName}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Bigger Column (9 cols): Gallery style rendering with Main Image + Right Column of 4 Supporting Images */}
          <div className="lg:col-span-9 flex flex-col md:flex-row gap-3 sm:gap-4 w-full items-stretch">
            {/* Main Picture with gradient overlay and bottom-left text */}
            <div className="relative flex-1 aspect-[16/10] md:aspect-auto md:min-h-[480px] lg:min-h-[520px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl">
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

              {/* Text on bottom left for header + description (separate animations) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end text-left pointer-events-auto">
                <AnimatePresence mode="wait">
                  <div key={currentProject.projectId} className="flex flex-col">
                    <motion.a
                      href={`/projects/${currentProject.projectId}`}
                      initial={{ opacity: 0, y: 15 }}
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
                      initial={{ opacity: 0, y: 15 }}
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
            </div>

            {/* 4 Supporting Pictures in a Column on the Right Side (per-image animation) */}
            {supportingImages.length > 0 && (
              <div className="w-full md:w-36 lg:w-44 xl:w-48 flex flex-row md:flex-col gap-2.5 sm:gap-3 shrink-0">
                {supportingImages.map((img, idx) => (
                  <motion.button
                    key={`${currentProject.projectId}-${idx}`}
                    type="button"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ margin: "-30px", once: true }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.08,
                      ease: "easeOut",
                    }}
                    onClick={() => setSelectedImageIndex(idx + 1)}
                    className={`relative flex-1 aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden bg-neutral-900 border transition-all duration-200 cursor-pointer ${
                      selectedImageIndex === idx + 1
                        ? "border-rose-500 ring-1 ring-rose-500/40 opacity-100 scale-[1.02]"
                        : "border-white/5 opacity-70 hover:opacity-100 hover:scale-[1.02]"
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
    </main>
  );
}
