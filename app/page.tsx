"use client"

import { BLOG_POSTS, EXPERIENCE_CONSTS } from "@/lib/constants";
import { ArrowUpRight, Briefcase, BriefcaseBusinessIcon, Circle, Code, Code2, Eye, FileText, Mail, User, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Header from "./_components/header";
import { AboutSection, AboutSectionSmall } from "./_components/AboutSection";
import { EducationSection, EducationSectionSmall } from "./_components/EducationSection";
import { HeroSection, HeroSectionSmall } from "./_components/HeroSection";
import { SkillsSection, SkillSectionSmall } from "./_components/SkillsSection";


// ExperienceSection: The section containing all the experience I have professionally.
// Not much to put considering I just graduated and finished a 3-month internship so, unfortunate.

// TimelinePoint: Dedicated subcomponent to show different points in time for my journey
type TimelinePointProps = {
  role: string;
  date: string;
  position?: "top" | "bottom";
  onClick?: () => void;
};

const TimelinePoint = ({
  role,
  date,
  position = "bottom",
  onClick
}: TimelinePointProps) => {
  const isTop = position === "top";

  return (
    <div className="relative">
      {isTop && (
        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            text-center
          "
        >
          <p className="text-sm lg:text-base font-semibold">
            {role}
          </p>

          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 italic">
            ({date})
          </p>
        </div>
      )}

      <div
        className="
          h-6 w-6 rounded-full
          bg-rose-800 dark:bg-rose-500
          border-4
          border-slate-50 dark:border-slate-950
          z-10
          transition-all duration-300
          hover:scale-125
          hover:shadow-[0_0_16px_rgba(190,24,93,0.6)]
          dark:hover:shadow-[0_0_20px_rgba(244,63,94,0.75)]
          cursor-pointer
        "
        onClick={onClick}
      />

      {!isTop && (
        <div
          className="
            absolute
            top-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            text-center
          "
        >
          <p className="text-sm lg:text-base font-semibold">
            {role}
          </p>

          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 italic">
            ({date})
          </p>
        </div>
      )}
    </div>
  );
};

const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] =
    useState(EXPERIENCE_CONSTS[0]);

  const [isTechModalOpen, setIsTechModalOpen] =
    useState(false);

  const visibleTechnologies =
    selectedExperience.technologies.slice(0, 5);

  const hiddenTechnologies =
    selectedExperience.technologies.slice(5);
  
  return (
    <section className="flex flex-col h-fit overflow-hidden mx-8 lg:mx-auto">

      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3 mt-12">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Experience
        </h1>
      </div>

      {/* Selected Experience - Large */}
      <div className="hidden lg:block flex-1">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            py-4
          "
        >
          {/* Experience Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="mb-2">
              <div className="flex items-center gap-3 flex-wrap justify-between">
                <h2 className="text-base font-bold">
                  {selectedExperience.role}
                </h2>

                <p className="text-sm italic text-slate-500 text-right">
                  {selectedExperience.start_date} - {selectedExperience.finish_date}
                </p>
              </div>

              <p className="text-base text-gray-500 dark:text-gray-400">
                {selectedExperience.company_name}
              </p>
            </div>

            <div className="my-3">
              <div className="flex flex-wrap gap-2">
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl
                      bg-rose-800
                      px-3 py-1
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    {tech}
                  </span>
                ))}

                {hiddenTechnologies.length > 0 && (
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="
                      rounded-xl
                      bg-slate-200
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-300
                      px-3 py-1
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-slate-200
                      dark:hover:bg-slate-600
                    "
                  >
                    +{hiddenTechnologies.length}
                  </button>
                )}
              </div>
            </div>

            <div>
              <ul
                className="
                  h-52
                  overflow-y-auto
                  space-y-3

                  bg-transparent

                  text-sm
                  text-slate-600
                  dark:text-slate-300

                  pr-2

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-slate-300
                  dark:scrollbar-thumb-slate-700
                "
              >
                {selectedExperience.achievements.map((item) => (
                  <li
                    key={item}
                    className="
                      text-sm
                      text-gray-600
                      dark:text-gray-300
                      leading-relaxed
                      flex flex-row gap-2 items-start
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4 mt-2" /> <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="
              w-1/2
              px-8
              flex
              items-center
              justify-center
              bg-radial from-slate-400/50  to-transparent 
              dark:from-slate-300/20 dark:to-transparent
              to-75%
            "
          >
            <div
              className="
                w-full
                aspect-video
                rounded-xl
                relative
                overflow-hidden
                
              "
            >
              <Image
                src="/images/rakso_migo.jpg"
                alt="Miguel Justin at the Rakso CT Office Logo"
                fill
                className="object-cover object-top"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Experience - Medium */}
      <div className="block lg:hidden flex-1">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            py-4
          "
        >
          <div className="w-full p-6 overflow-y-auto">
            <div className="mb-2">
              <div className="flex items-center gap-3 flex-wrap justify-between">
                <h2 className="text-lg lg:text-xl font-bold">
                  {selectedExperience.role}
                </h2>

                <p className="text-sm italic text-slate-500 text-right">
                  {selectedExperience.start_date} - {selectedExperience.finish_date}
                </p>
              </div>

              <p className="text-base text-gray-500 dark:text-gray-400">
                {selectedExperience.company_name}
              </p>
            </div>

            <div className="my-3">
              <div className="flex flex-wrap gap-2">
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl
                      bg-rose-800
                      px-3 py-1
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    {tech}
                  </span>
                ))}

                {hiddenTechnologies.length > 0 && (
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="
                      rounded-xl
                      bg-slate-200
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-300
                      px-3 py-1
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-slate-200
                      dark:hover:bg-slate-600
                    "
                  >
                    +{hiddenTechnologies.length}
                  </button>
                )}
              </div>
            </div>
            <div
            className="
              w-full
              pb-4 pt-2
              flex
              items-center
              justify-center
              bg-radial from-slate-400/50  to-transparent 
              dark:from-slate-300/20 dark:to-transparent
              to-75%
            "
          >
            <div
              className="
                w-full
                aspect-video
                rounded-xl
                relative
                overflow-hidden
                
              "
            >
              <Image
                src="/images/rakso_migo.jpg"
                alt="Miguel Justin at the Rakso CT Office Logo"
                fill
                className="object-cover object-top"
                loading="eager"
              />
            </div>
          </div>

            <div>
              <ul
                className="
                  h-52
                  overflow-y-auto
                  space-y-3

                  bg-transparent

                  text-sm
                  text-slate-600
                  dark:text-slate-300

                  pr-2

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-slate-300
                  dark:scrollbar-thumb-slate-700
                "
              >
                {selectedExperience.achievements.map((item) => (
                  <li
                    key={item}
                    className="
                      text-sm
                      text-gray-600
                      dark:text-gray-300
                      leading-relaxed
                      flex flex-row gap-2 items-start
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4 mt-2" /> <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-36 flex items-center mb-8">

        {/* Line */}
        <div className="absolute h-px bg-rose-300 dark:bg-rose-950 w-full" />

        {/* Points */}
        <div className="relative z-10 flex w-[60%] mx-auto justify-center">

          {
            EXPERIENCE_CONSTS.map((exp) => {
              return <TimelinePoint
                key={exp.role}
                role={exp.role}
                date={exp.shortened_date}
                position="bottom"
                onClick={() => setSelectedExperience(exp)}
              />
            })
          }

        </div>
      </div>

      {/* Technologies Modal */}
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center

          bg-black/50
          backdrop-blur-xs

          transition-opacity duration-300

          ${
            isTechModalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsTechModalOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative overflow-hidden

            w-[90%]
            max-w-2xl

            rounded-xl
            border border-slate-300
            dark:border-slate-800

            backdrop-blur-md
            bg-slate-50
            dark:bg-slate-950/70

            p-6

            transition-all duration-300

            ${
              isTechModalOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              Technologies Used
            </h3>

            <button
              onClick={() => setIsTechModalOpen(false)}
              className="
                text-sm
                hover:text-slate-700
                dark:hover:text-slate-300
                cursor-pointer
                text-slate-900
                dark:text-slate-100
                flex flex-row items-center align-middle
              "
            >
              <X />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedExperience.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-xl
                  bg-rose-500
                  dark:bg-rose-900

                  px-3 py-1

                  text-xs
                  text-slate-200
                  font-semibold
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSectionSmall = () => {
  const [selectedExperience, setSelectedExperience] =
    useState(EXPERIENCE_CONSTS[0]);

  const [isTechModalOpen, setIsTechModalOpen] =
    useState(false);

  const visibleTechnologies =
    selectedExperience.technologies.slice(0, 5);

  const hiddenTechnologies =
    selectedExperience.technologies.slice(5);

  return (
    <section className="flex flex-col h-fit overflow-hidden mx-4 lg:mx-auto mb-8">

      {/* Header */}
      <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3 mt-12">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Experience
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative h-24 flex items-center mb-8">

        {/* Line */}
        <div className="absolute h-px bg-rose-300 dark:bg-rose-950 w-full" />

        {/* Points */}
        <div className="relative z-10 flex w-[60%] mx-auto justify-center text-xs">

          {
            EXPERIENCE_CONSTS.map((exp) => {
              return <TimelinePoint
                key={exp.role}
                role={exp.role}
                date={exp.shortened_date}
                position="bottom"
                onClick={() => setSelectedExperience(exp)}
              />
            })
          }

        </div>
      </div>

      {/* Selected Experience */}
      <div className="flex-1">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            py-4
          "
        >
          <div className="w-full px-4 overflow-y-auto">
            <div className="mb-2">
              <div className="flex items-center flex-wrap justify-between">
                <h2 className="text-base lg:text-xl font-bold">
                  {selectedExperience.role}
                </h2>

                <p className="text-xs italic text-slate-500 text-right">
                  {selectedExperience.start_date} - {selectedExperience.finish_date}
                </p>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedExperience.company_name}
              </p>
            </div>

            <div className="my-1">
              <div className="flex flex-wrap gap-1">
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl
                      bg-rose-800
                      px-2 py-0.5
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    {tech}
                  </span>
                ))}

                {hiddenTechnologies.length > 0 && (
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="
                      rounded-xl
                      bg-slate-200
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-300
                      px-2 py-0.5
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-slate-200
                      dark:hover:bg-slate-600
                    "
                  >
                    +{hiddenTechnologies.length}
                  </button>
                )}
              </div>
            </div>
            <div
            className="
              w-full
              pb-4 pt-2
              flex
              items-center
              justify-center
              bg-radial from-slate-400/50  to-transparent 
              dark:from-slate-300/20 dark:to-transparent
              to-75%
            "
          >
            <div
              className="
                w-full
                aspect-video
                rounded-xl
                relative
                overflow-hidden
                
              "
            >
              <Image
                src="/images/rakso_migo.jpg"
                alt="Miguel Justin at the Rakso CT Office Logo"
                fill
                className="object-cover object-top"
                loading="eager"
              />
            </div>
          </div>

            <div>
              <ul
                className="
                  h-52
                  overflow-y-auto
                  space-y-3

                  bg-transparent

                  text-sm
                  text-slate-600
                  dark:text-slate-300

                  pr-2

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-slate-300
                  dark:scrollbar-thumb-slate-700
                "
              >
                {selectedExperience.achievements.map((item) => (
                  <li
                    key={item}
                    className="
                      text-xs
                      text-gray-600
                      dark:text-gray-300
                      leading-relaxed
                      flex flex-row gap-2 items-start
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4 mt-2" /> <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Modal */}
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center

          bg-black/50
          backdrop-blur-xs

          transition-opacity duration-300

          ${
            isTechModalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsTechModalOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative overflow-hidden

            w-[90%]
            max-w-2xl

            rounded-xl
            border border-slate-300
            dark:border-slate-800

            backdrop-blur-md
            bg-slate-50
            dark:bg-slate-950/70

            p-6

            transition-all duration-300

            ${
              isTechModalOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              Technologies Used
            </h3>

            <button
              onClick={() => setIsTechModalOpen(false)}
              className="
                text-sm
                hover:text-slate-700
                dark:hover:text-slate-300
                cursor-pointer
                text-slate-900
                dark:text-slate-100
                flex flex-row items-center align-middle
              "
            >
              <X />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedExperience.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-xl
                  bg-rose-500
                  dark:bg-rose-900

                  px-3 py-1

                  text-xs
                  text-slate-200
                  font-semibold
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// BlogSection: The section to contain blog posts regarding my professional career or progress
// I.e. if I earned a new certification, etc
type BlogCardProps = {
  title: string;
  date: string;
  excerpt: string;
  href?: string;
  className?: string;
};

const BlogCard = ({
  title,
  date,
  excerpt,
  href,
  className = "",
}: BlogCardProps) => {
  return (
    <div
      className={`
        aspect-square
        relative
        overflow-hidden
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        overflow-y-auto

        [scrollbar:thin]
        [scrollbar-color:#52525b_transparent]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-600
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500

        ${className}
      `}
    >
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      <div className="flex flex-col h-full overflow-y-auto p-4 lg:p-6 gap-2">
        <h3 className="text-xl font-semibold text-justify">
          {title}
        </h3>

        <span className="rounded-xl bg-rose-800 px-2 py-1 text-xs font-semibold text-slate-50 w-fit">
          {date}
        </span>

        <p className="md:mt-2 text-justify 
        text-base 
        italic text-slate-700 dark:text-slate-300 lg:text-base">
          {excerpt.length > 128
            ? `${excerpt.slice(0, 128)}...`
            : excerpt}
        </p>

        <div className="flex flex-1 items-end justify-end">
          <a
            href={href}
            className="w-fit text-md lg:text-md text-slate-700 dark:text-slate-300 cursor-pointer hover:underline flex flex-row items-start"
          >
            Read more
            <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return <section className="flex flex-col w-full h-fit overflow-hidden lg:mx-auto ">

    {/* Header */}
    <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center mt-12">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
        Blog
      </h1>
    </div>

    {/* Body */}
    <div className="hidden lg:flex flex-1 gap-4 py-4 items-center justify-center mb-12">
      
      {/* Dynamic Rendering */}
      {BLOG_POSTS.map((post) => (
        <BlogCard
          key={post.title}
          {...post}
          className="w-2/7"
        />
      ))}

    </div>

    {/* Body - Medium/Tablet Resolutions */}
    <div className="hidden sm:flex lg:hidden flex-1 gap-4 py-4 px-8 items-center justify-center mb-12">
      
      <div className="hidden sm:flex lg:hidden gap-4 py-4 px-8 justify-center mb-12">
        {BLOG_POSTS.slice(0, 2).map((post) => (
          <BlogCard
            key={post.title}
            {...post}
            className="flex-1"
          />
        ))}
      </div>

    </div>

    {/* Footer/Hyperlink */}
    <div className="w-full mb-8 text-center text-base text-gray-800/90 dark:text-slate-50/90">
      Read all of my other blog posts{" "}
      <a className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer">
        using this link right here
        <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
      </a>
    </div>
    
  </section>
}

const BlogSectionSmall = () => {
  return (
    <section className="flex flex-col h-fit overflow-hidden mx-4 mb-8">
      
      {/* Header */}
      <div className="flex flex-col items-center justify-center mt-12 mb-6">
        <h1 className="text-2xl tracking-wider font-bold uppercase text-slate-400">
          Blog
        </h1>
      </div>

      {/* Cards */}
      <div className="flex flex-col items-center gap-4">
        {BLOG_POSTS.map((post) => (
          <BlogCard
            key={post.title}
            {...post}
            className="
              w-[85%]
              min-h-48
              aspect-auto
            "
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-800/90 dark:text-slate-50/90">
        Read all of my other blog posts{" "}
        <a className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer">
          using this link right here
          <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
        </a>
      </div>

    </section>
  );
};

// CommuneyeSection: Mandatory section to promote my software project Instagram account, lol.
// I have to, at this point.
const CommuneyeSection = () => {
  return <section className="w-full aspect-video flex flex-col mb-8">

    {/* Header */}
    <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center mt-12">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
        Communeye
      </h1>
    </div>

    {/* Body */}
    <div className="flex flex-row flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">

      {/* Left Half */}
      <div className="w-1/2 flex items-center justify-center bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
        <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
          <Image
            src="/images/communeye.png"
            alt="Communeye Software"
            className="object-cover object-top"
            loading="eager"
            fill
          />
        </div>
      </div>

      {/* Right Half */}
      <div className="w-1/2 bg-transparent flex flex-col items-center justify-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <div className="bg-transparent w-fit h-fit flex items-center align-middle">
          <Eye className="w-6 lg:w-10 h-6 lg:h-10 text-slate-950 dark:text-slate-50"/>
        </div>
        <h1 className="text-lg lg:text-2xl font-bold tracking-wide"><span className="text-rose-800">Communeye</span> Software</h1>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          <b>Communeye Software</b> is a space for showcasing software engineering projects outside of Migo's personal brand. Right now, it functions as a casual, low-pressure sandbox — a place to share both Communeye-branded projects and other content, without a fixed posting schedule.
        </p>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-sm md:text-base lg:text-xl">
          <a
            href={'https://www.instagram.com/communeye.software/'}
            className="w-fit text-xs lg:text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:underline flex flex-row items-start"
          >
            Follow Communeye Software on Instagram
            <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
          </a>
        </p>
      </div>
    </div>

  </section>
}

const CommuneyeSectionSmall = () => {
  return (
    <section className="w-full flex flex-col mb-8">

      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center mt-12">
        <h1 className="text-2xl tracking-wider font-bold uppercase text-slate-400">
          Communeye
        </h1>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center px-6 gap-4">

        {/* Image */}
        <div className="flex items-center justify-center w-full bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
          <div className="relative w-[70%] aspect-square rounded-xl overflow-hidden">
            <Image
              src="/images/communeye.png"
              alt="Communeye Software"
              className="object-cover object-top"
              loading="eager"
              fill
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-3 text-center mt-4">
          <Eye className="w-8 h-8 text-slate-950 dark:text-slate-50" />

          <h1 className="text-lg font-bold tracking-wide">
            <span className="text-rose-800">Communeye</span> Software
          </h1>

          <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-sm px-4 mb-4">
            <b>Communeye Software</b> is a space for showcasing software engineering projects outside of Migo's personal brand. Right now, it functions as a casual, low-pressure sandbox — a place to share both Communeye-branded projects and other content, without a fixed posting schedule.
          </p>
          <a
            href={'https://www.instagram.com/communeye.software/'}
            className="w-fit text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:underline flex flex-row items-center"
          >
            Follow Communeye Software on Instagram
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

    </section>
  );
};

// ContactSection: A dedicated section where there is a form with captcha one can use to 
// email me. I don't know why you would email me. But here we go.
const ContactButton = ({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
}) => {
  return (
    <button
      onClick={() => href && window.open(href, "_blank")}
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        py-2 px-4
        flex flex-row gap-2
        justify-center items-center
        cursor-pointer
        text-slate-900
        dark:text-slate-50
        transition-transform
        duration-300
        hover:scale-[1.02]
      "
    >
      {/* Base glass layer, same as cards */}
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      {/* Hover shine layer */}
      <div
        className="
          absolute inset-0 -z-10
          bg-radial from-slate-300/40 via-slate-200/10 to-transparent
          dark:from-slate-400/30 dark:via-slate-300/10 dark:to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      />

      <Icon size={18} />
      {label}
    </button>
  );
};

const ContactForm = () => {

}

const ContactSection = () => {
  return <section className="flex flex-col w-full h-fit overflow-hidden lg:mx-auto aspect-video  mb-8">

    {/* Body */}
    <div className="flex flex-row flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">

      {/* Left Half */}
      <div className="w-1/2 bg-transparent flex flex-col items-start justify-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <h1 className="text-6xl tracking-wide text-justify">
          Got a concern in mind? <b className="text-rose-800">Let's connect!</b>.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 text-justify max-w-lg">
          I'm always up for a conversation about software engineering, web development, or the industry in general. The form on the right sends a message straight to my email — or if you'd rather reach out directly, I've listed a few social links below.
        </p>
        <div className="w-full grid grid-cols-2 griw-rows-auto gap-2">
          <ContactButton icon={Briefcase} label="Facebook" href="..." />
          <ContactButton icon={Mail} label="LinkedIn" href="..." />
          <ContactButton icon={Code2} label="GitHub" href="..." />
          <ContactButton icon={Code2} label="Communeye IG" href="..." />
        </div>
      
      </div>

      {/* Right Half */}
      <div className="w-1/2 flex items-center justify-center bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
      </div>

    </div>

  </section>
}

const ContactSectionSmall = () => {
  return 
}

// Footer: The footer to be used throughout the website.
const Footer = () => {
  return (
    <footer
      className="
        flex flex-col
        px-8 md:px-8 
        py-6
        w-full
        bg-slate-100
        dark:bg-slate-950
        border-t
        border-slate-300
        dark:border-slate-800
      "
    >
      {/* Upper Layout - Medium/Large */}
      <div className="hidden sm:grid w-full lg:w-[90%] lg:mx-auto grid-cols-3 gap-8 py-4">

        {/* Branding */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-2 items-center">
            <span className="text-slate-950 dark:text-slate-50">
              MIGUEL
            </span>

            <Code2
              size={20}
              className="text-slate-950 dark:text-slate-50"
            />

            <span className="text-rose-800 dark:text-rose-500">
              JUSTIN
            </span>
          </span>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs text-justify">
            Information Technology graduate focused on application
            development, software engineering, and continuous learning.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Navigation
          </h3>

          <a className="hover:underline cursor-pointer">
            Skills
          </a>

          <a className="hover:underline cursor-pointer">
            Education
          </a>

          <a className="hover:underline cursor-pointer">
            Experience
          </a>

          <a className="hover:underline cursor-pointer">
            Blog
          </a>

          <a className="hover:underline cursor-pointer">
            Contact
          </a>
        </div>

        {/* External Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
            External Links
          </h3>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <Code size={16} />
            GitHub
          </a>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <BriefcaseBusinessIcon size={16} />
            LinkedIn
          </a>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <FileText size={16} />
            Resume
          </a>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>

      {/* Upper Layout - Small */}
      <div className="grid sm:hidden gap-6 py-4">

        {/* Branding */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-lg uppercase tracking-wide flex flex-row gap-2 items-center justify-center">
            <span className="text-slate-950 dark:text-slate-50">
              MIGUEL
            </span>

            <Code2
              size={18}
              className="text-slate-950 dark:text-slate-50"
            />

            <span className="text-rose-800 dark:text-rose-500">
              JUSTIN
            </span>
          </span>

          <p className="text-xs text-center text-slate-600 dark:text-slate-400">
            Information Technology graduate focused on application
            development and software engineering.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">
              Navigation
            </h3>

            <a className="hover:underline cursor-pointer text-sm">
              Skills
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Education
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Experience
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Blog
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Contact
            </a>
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">
              Links
            </h3>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <Code size={14} />
              GitHub
            </a>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <BriefcaseBusinessIcon size={14} />
              LinkedIn
            </a>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <FileText size={14} />
              Resume
            </a>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <Mail size={14} />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Medium/Large */}
      <div
        className="
          hidden sm:flex
          w-full
          lg:w-[90%]
          lg:mx-auto
          pt-6
          mt-4
          border-t
          border-slate-300
          dark:border-slate-800
          text-sm
        "
      >
        <button className="hover:underline cursor-pointer">
          © 2026 Miguel Justin
        </button>

        <div className="flex-1 flex justify-end gap-6">
          <button className="hover:underline cursor-pointer">
            Terms of Service
          </button>

          <button className="hover:underline cursor-pointer">
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Bottom Footer - Small */}
      <div
        className="
          flex sm:hidden
          flex-col
          items-center
          gap-2
          pt-4
          mt-2
          border-t
          border-slate-300
          dark:border-slate-800
          text-xs
        "
      >
        <button className="hover:underline cursor-pointer">
          © 2026 Miguel Justin
        </button>

        <div className="flex gap-4">
          <button className="hover:underline cursor-pointer">
            Terms of Service
          </button>

          <button className="hover:underline cursor-pointer">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

// Home: the default component to be exported, contains the entirety of the home page.
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <Header />

      {/* Main Content - Medium-Large */}
      <main className="hidden sm:flex flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Education Section */}
        <EducationSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Communeye Section */}
        <CommuneyeSection />

        {/* ContactSection */}
        <ContactSection />

      </main>

      {/* Main Content - Small */}
      <main className="flex sm:hidden flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">

        {/* Hero Section - Small */}
        <HeroSectionSmall />

        {/* About Me - Small */}
        <AboutSectionSmall />

        {/* Skills Section - Small */}
        <SkillSectionSmall />
        
        {/* Education Section - Small  */}
        <EducationSectionSmall />

        {/* Experience Section - Small */}
        <ExperienceSectionSmall />
        
        {/* Blog Section - Small */}
        <BlogSectionSmall />

        {/* CommuneyeSectionSmall */}
        <CommuneyeSectionSmall />

        <section className="w-full bg-indigo-600 h-screen py-8 px-12">
          CTA - Contact Me
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
