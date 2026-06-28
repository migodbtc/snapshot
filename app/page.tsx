"use client"

import { ABOUT_ME_INFO, EDUCATION_CONSTS, EXPERIENCE_CONSTS, FRAMEWORK_CONSTS, LANGUAGE_CONSTS, PLATFORM_CONSTS, TOOL_CONSTS } from "@/lib/constants";
import { ArrowUpRight, Atom, Blocks, BookOpen, Braces, Briefcase, Circle, Cloud, Code2, GraduationCap, Languages,Mail, Medal, Menu, School, Server, Target, User, Wind, Wrench } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AboutMeCard, TechnologyCard } from "./_components/cards";
import Header from "./_components/header";

// HeroSection: Dedicated section for the hero part of the portfolio.
// Includes laptop/mobile/tablet responsive layouts.
const HeroSection = () => {
  return <section className="w-full aspect-video flex flex-row mb-8">
    <div className="flex flex-1 flex-col px-6 h-full items-start justify-center gap-3">
      <span className="text-sm lg:text-base text-gray-500">Welcome to my professional website</span>
      <h1 className="text-4xl lg:text-5xl ">My name is <b className="text-rose-800">Migo</b>.</h1>
      <p className="text-justify w-full text-gray-700 dark:text-gray-400">I am an up and coming software engineering with a passion for building human-first digital solutions, collaboration and sharing of technical knowledge and experience, and a willingness to learn and adapt to what is necessary. </p>
      <div className="w-full flex flex-row gap-2">
        <button className="py-2 px-4 flex flex-row gap-2 w-fit bg-rose-800 rounded-lg hover:bg-rose-700 cursor-pointer text-slate-50 items-center">
          <Briefcase size={18}/>
          LinkedIn
        </button>
        <button className="py-2 px-4 flex flex-row gap-2 w-fit bg-gray-500 rounded-lg hover:bg-gray-400 cursor-pointer text-slate-50 items-center">
          <Mail size={18} />
          Contact
        </button>
      </div>
    </div>
    <div className="flex flex-1 h-full items-center justify-center bg-radial from-rose-800 dark:from-slate-50/25 to-transparent to-70%">
      <div className="relative w-[80%] aspect-square rounded-xl overflow-hidden">
        <Image
          src="/images/hero_picture.jpg"
          alt="Miguel Justin Bunda"
          fill
          className="object-cover object-top"
          loading="eager"
        />
      </div>
    </div>
  </section>
}

const HeroSectionSmall = () => {
  return <section className="w-full min-h-[90vh] flex flex-col px-6 pt-6 gap-6 text-center justify-center  bg-radial from-rose-800/25 dark:from-slate-50/10 to-transparent to-65%">
    <div className="flex flex-col gap-4">
      <span className="text-sm text-gray-500">
        Welcome to my professional website
      </span>
      <h1 className="text-3xl tracking-wide">
        My name is <b className="text-rose-800">Migo</b>.
      </h1>
      <div className="w-64 aspect-square relative rounded-xl overflow-hidden self-start mx-auto">
        <Image
          src="/images/hero_picture.jpg"
          alt="Miguel Justin Bunda"
          fill
          className="object-cover object-top"
        />
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-400 text-justify max-w-lg">
        I am an up and coming software engineering with a passion for building human-first digital solutions, collaboration and sharing of technical knowledge and experience, and a willingness to learn and adapt to what is necessary.
      </p>
      <div className="flex flex-col gap-2 items-center justify-center">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-rose-800 rounded-lg text-white text-sm hover:bg-rose-700 transition-colors">
          <Briefcase size={18} />
          LinkedIn
        </button>

        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-500 rounded-lg text-white text-sm hover:bg-gray-400 transition-colors">
          <Mail size={18} />
          Contact
        </button>
      </div>
    </div>
  </section>
}

// AboutSection: Dedicated section for a small summary of myself
const AboutSection = () => {
  return <section className="w-full aspect-video flex flex-col pb-12">
    <div className="flex flex-col px-6 py-4 w-full h-fit items-center justify-center gap-3 ">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">About Me</h1>
    </div>
    <div className="flex flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">
      <div className="flex-1 bg-transparent flex flex-col items-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <div className="border-3 border-slate-950 dark:border-slate-50 rounded-full bg-transparent w-12 lg:w-20 h-12 lg:h-20 flex items-center justify-center align-middle">
          <User className="w-6 lg:w-10 h-6 lg:h-10 text-slate-950 dark:text-slate-50"/>
        </div>
        <h1 className="text-lg lg:text-2xl font-bold tracking-wide">Who is <span className="text-rose-800">Migo?</span></h1>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          <b>Miguel Justin Bunda</b> is a software engineer dedicated to building modern, technical solutions that put people first. A graduate of Don Bosco Technical College in Mandaluyong City with a Bachelor of Science in Information Technology, Migo earned Magna Cum Laude honors, a Service Award, and the distinction of Batch Valedictorian.
        </p>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          Migo first started programming by developing simple web pages on his laptop. Raw HTML, CSS, with little JavaScript. Now, Migo primarily uses both <b>TypeScript</b> and <b>Python</b>, along with a consortium of languages, frameworks, and technologies such as GitHub, Docker, AWS, Nextjs, Supabase, and more.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
        <div className="w-full h-full grid grid-cols-2 gap-4 m-auto">
            {ABOUT_ME_INFO.map((item) => (
              <AboutMeCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                value={item.value}
                className="h-full"
              />
            ))}
        </div>
      </div>
      
    </div>
  </section>
}

const AboutSectionSmall = () => {
  return <section className="w-full aspect-video flex flex-col pb-4">
    <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3 ">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">About Me</h1>
    </div>
    <div className="flex flex-col flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">
      <div className="flex-1 bg-transparent flex flex-col items-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <div className="border-3 border-slate-950 dark:border-slate-50 rounded-full bg-transparent w-12 lg:w-20 h-12 lg:h-20 flex items-center justify-center align-middle">
          <User className="w-6 lg:w-10 h-6 lg:h-10 text-slate-950 dark:text-slate-50"/>
        </div>
        <h1 className="text-lg lg:text-2xl font-bold tracking-wide">Who is <span className="text-rose-800">Migo?</span></h1>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          <b>Miguel Justin Bunda</b> is a software engineer dedicated to building modern, technical solutions that put people first. A graduate of Don Bosco Technical College in Mandaluyong City with a Bachelor of Science in Information Technology, Migo earned Magna Cum Laude honors, a Service Award, and the distinction of Batch Valedictorian.
        </p>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          Migo first started programming by developing simple web pages on his laptop. Raw HTML, CSS, with little JavaScript. Now, Migo primarily uses both <b>TypeScript</b> and <b>Python</b>, along with a consortium of languages, frameworks, and technologies such as GitHub, Docker, AWS, Nextjs, Supabase, and more.
        </p>
      </div>

      <div className="mx-4 flex gap-3 overflow-x-auto pb-2">
        {ABOUT_ME_INFO.map((item) => (
          <AboutMeCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
            className="aspect-5/3 min-w-fit"
          />
        ))}
      </div>
    </div>
  </section>
}

// SkillsSection: The dedicated section for the skills where there are subpages for the display depending
// on the selected skill (i.e. languages is the default)
type SkillCategory =
  | "languages"
  | "frameworks"
  | "tools"
  | "platforms";

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>("languages");

  // Dedicated class constant due to complexity of the background radial gradient ++ active styling
  const getButtonClass = (category: SkillCategory) =>
  `flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
    selectedCategory === category
      ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900"
      : "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-300 dark:hover:border-rose-800"
  }`;

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col px-6 py-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Skills
        </h1>
      </div>

      <div className="flex flex-row w-full h-fit items-center justify-center gap-4 px-8 pb-4 text-center max-w-xl mx-auto text-xs lg:text-base">
        <button
          onClick={() => setSelectedCategory("languages")}
          className={getButtonClass("languages")}
        >
          <Braces size={18} />
          <span>Languages</span>
        </button>

        <button
          onClick={() => setSelectedCategory("frameworks")}
          className={getButtonClass("frameworks")}
        >
          <Blocks size={18} />
          <span>Frameworks</span>
        </button>

        <button
          onClick={() => setSelectedCategory("tools")}
          className={getButtonClass("tools")}
        >
          <Wrench size={18} />
          <span>Tools</span>
        </button>

        <button
          onClick={() => setSelectedCategory("platforms")}
          className={getButtonClass("platforms")}
        >
          <Cloud size={18} />
          <span>Platforms</span>
        </button>
      </div>

      <div className="flex flex-1 w-full h-full pb-8 gap-4 justify-center">
        <div className="w-full aspect-5/2 mx-8 my-2 flex flex-col">
          {selectedCategory === "languages" && (
            <div className="relative w-full h-100 overflow-hidden rounded-xl mb-4">
              <div className="relative w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-4 auto-rows-[120px]">
                  {
                    LANGUAGE_CONSTS.map((lang) => {
                      return <TechnologyCard 
                        key={lang.name} 
                        icon={lang.icon} 
                        name={lang.name} 
                        description={lang.description} 
                        years={lang.years.toString()}
                      />
                    })
                  }
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "frameworks" && (
            <div className="relative w-full h-100 overflow-hidden rounded-xl mb-4">
              <div className="relative w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-[120px]">
                  {
                    FRAMEWORK_CONSTS.map((framework) => {
                      return <TechnologyCard 
                        key={framework.name} 
                        icon={framework.icon} 
                        name={framework.name} 
                        description={framework.description} 
                        years={framework.years} 
                      />
                    })
                  }
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "tools" && (
            <div className="relative mb-4 h-100 w-full overflow-hidden rounded-xl">
              <div className="relative w-full">
                <div className="grid w-full auto-rows-[120px] grid-cols-1 gap-4 lg:grid-cols-2">
                  {TOOL_CONSTS.map((tool) => {
                    return (
                      <TechnologyCard
                        key={tool.name}
                        icon={tool.icon}
                        name={tool.name}
                        description={tool.description}
                        years={tool.years}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "platforms" && (
            <div className="relative mb-4 h-100 w-full overflow-hidden rounded-xl">
              <div className="relative w-full">
                <div className="grid w-full auto-rows-[120px] grid-cols-1 gap-4 lg:grid-cols-2">
                  {PLATFORM_CONSTS.map((tool) => {
                    return (
                      <TechnologyCard
                        key={tool.name}
                        icon={tool.icon}
                        name={tool.name}
                        description={tool.description}
                        years={tool.years}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="w-full text-center text-base font-semibold text-slate-950/90 dark:text-slate-50/90">
            Want to know more about what I can offer?{" "}
            <a className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer">
              Head to the skills page here.
              <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const SkillSectionSmall = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>("languages");

  const getButtonClass = (category: SkillCategory) =>
  `w-fit py-2 px-4 rounded-lg border flex items-center justify-center gap-0 transition-all duration-200 cursor-pointer text-xs ${
    selectedCategory === category
      ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900"
      : "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-300 dark:hover:border-rose-800"
  }`;

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col px-6 py-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Skills
        </h1>
      </div>

      <div className="flex flex-row w-full h-fit items-center justify-center gap-2 px-4 pb-4 text-center max-w-md mx-auto text-xs lg:text-base">
        <button
          onClick={() => setSelectedCategory("languages")}
          className={getButtonClass("languages")}
        >
          <Braces size={18} />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                selectedCategory === "languages"
                  ? "max-w-25 opacity-100 ml-2"
                  : "max-w-0 opacity-0 ml-0"
              }`}
            >
              Languages
            </span>
        </button>

        <button
          onClick={() => setSelectedCategory("frameworks")}
          className={getButtonClass("frameworks")}
        >
          <Blocks size={18} />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
              selectedCategory === "frameworks"
                ? "max-w-25 opacity-100 ml-2"
                : "max-w-0 opacity-0 ml-0"
            }`}
          >
            Frameworks
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory("tools")}
          className={getButtonClass("tools")}
        >
          <Wrench size={18} />
          <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                selectedCategory === "tools"
                  ? "max-w-25 opacity-100 ml-2"
                  : "max-w-0 opacity-0 ml-0"
              }`}
            >
            Tools
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory("platforms")}
          className={getButtonClass("platforms")}
        >
          <Cloud size={18} />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
              selectedCategory === "platforms"
                ? "max-w-25 opacity-100 ml-2"
                : "max-w-0 opacity-0 ml-0"
            }`}
          >
            Platforms
          </span>
        </button>
      </div>

      <div className="flex flex-1 w-full h-full pb-8 gap-4 justify-center">
        <div className="w-full aspect-5/2 mx-8 my-2 flex flex-col">
          {selectedCategory === "languages" && (
            <div className="relative w-full h-100 overflow-hidden rounded-xl mb-4">
              <div className="relative w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-4 auto-rows-[120px]">
                  {
                    LANGUAGE_CONSTS.map((lang) => {
                      return <TechnologyCard 
                        key={lang.name} 
                        icon={lang.icon} 
                        name={lang.name} 
                        description={lang.description} 
                        years={lang.years.toString()}
                      />
                    })
                  }
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "frameworks" && (
            <div className="relative w-full h-100 overflow-hidden rounded-xl mb-4">
              <div className="relative w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-[120px]">
                  {
                    FRAMEWORK_CONSTS.map((framework) => {
                      return <TechnologyCard 
                        key={framework.name} 
                        icon={framework.icon} 
                        name={framework.name} 
                        description={framework.description} 
                        years={framework.years} 
                      />
                    })
                  }
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "tools" && (
            <div className="relative mb-4 h-100 w-full overflow-hidden rounded-xl">
              <div className="relative w-full">
                <div className="grid w-full auto-rows-[120px] grid-cols-1 gap-4 lg:grid-cols-2">
                  {TOOL_CONSTS.map((tool) => {
                    return (
                      <TechnologyCard
                        key={tool.name}
                        icon={tool.icon}
                        name={tool.name}
                        description={tool.description}
                        years={tool.years}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "platforms" && (
            <div className="relative mb-4 h-100 w-full overflow-hidden rounded-xl">
              <div className="relative w-full">
                <div className="grid w-full auto-rows-[120px] grid-cols-1 gap-4 lg:grid-cols-2">
                  {PLATFORM_CONSTS.map((tool) => {
                    return (
                      <TechnologyCard
                        key={tool.name}
                        icon={tool.icon}
                        name={tool.name}
                        description={tool.description}
                        years={tool.years}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="w-full text-center text-base font-semibold text-slate-950/90 dark:text-slate-50/90">
            Want to know more about what I can offer?{" "}
            <a className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer">
              Head to the skills page here.
              <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// EducationSection: Dedicated section for previewing education. Design is a split type with 
// card on the left and timeline on the right.
type EducationKey = keyof typeof EDUCATION_CONSTS;

const EducationSection = () => {
  const [selectedInstitution, setSelectedInstitution] =
    useState<EducationKey>("college");
  const preview = (({ college, shs, hs2 }) => ({ college, shs, hs2 }))(EDUCATION_CONSTS);
  const selected = EDUCATION_CONSTS[selectedInstitution];

  return (
    <section className="flex flex-col w-full overflow-hidden">
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Education
        </h1>
      </div>

      <div className="flex flex-row w-full h-144 items-start justify-center gap-2 pb-4 text-center mx-auto lg:max-w-6xl px-8 text-xs lg:text-base ">

        <div className="flex-1 h-full">
          <div className="flex-1 text-left">
            <div className="mx-auto max-w-7xl px-6 ">
              <div className="ml-4 space-y-8 lg:space-y-12 border-l border-zinc-800 pt-8">
                {Object.entries(preview).map(([key, education]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedInstitution(key as EducationKey)}
                    className="rounded-xl cursor-pointer"
                  >
                    <div className="relative pl-10">
                      <div
                        className={`absolute -left-1.25 top-2 size-2.5 rounded-full transition-all ${
                          selectedInstitution === key
                            ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                            : "bg-zinc-700"
                        }`}
                      />

                      <span className="mb-1 block w-full text-left font-mono text-xs text-zinc-500">
                        {education.date_range}
                      </span>

                      <h4 className="flex items-center gap-2 text-left text-sm font-medium lg:text-lg">
                        <School />
                        {education.school_name}
                      </h4>

                      <p className="my-1 text-left text-xs text-zinc-500 lg:text-sm">
                        {education.subtitle}
                      </p>

                      <p className="flex items-center gap-0.5 text-left text-sm leading-relaxed text-zinc-400 hover:underline">
                        View
                        <ArrowUpRight className="h-4 w-4 -translate-y-0.5" />
                      </p>
                    </div>
                  </button>
                ))}
                <button 
                  // onClick={() => setSelectedInstitution("hs2")}
                  className="rounded-xl cursor-pointer"
                >
                  <div className="relative pl-10 h-48 lg:h-32">
                    <div
                      className={`absolute -left-1.25 top-2 size-2.5 rounded-full ${
                        false
                          ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                          : "bg-zinc-700"
                      }`}
                    />
                    <span className="mb-1 rounded-xl bg-rose-500 px-3 py-1 font-semibold text-slate-50 dark:bg-rose-800 select-none hover:underline hover:bg-rose-400 dark:hover:bg-rose-700 cursor-pointer flex flex-row gap-1 text-left text-xs lg:text-sm">
                      See more of my education <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 h-120 px-2 lg:px-4">
          <div className="w-full h-fit max-h-fill relative overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md pt-0 overflow-y-auto [scrollbar:thin] [scrollbar-color:#52525b_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600 hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">
            <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />
            <div className="flex flex-col h-full overflow-y-auto px-6 py-8 lg:px-8 gap-2">
              <span className="rounded-xl bg-rose-500 px-2 py-1 text-sm font-semibold text-slate-50 dark:bg-rose-800 w-fit">
                {selected.badge_content}
              </span>

              <h3 className="text-2xl font-semibold text-left">
                {selected.school_name}
              </h3>

              <p className="italic text-justify text-sm text-gray-800 dark:text-gray-400">
                {selected.address}
              </p>

              <div className="mt-2 grid w-full auto-rows-min grid-cols-1 gap-2 text-left text-xs lg:grid-cols-2 lg:text-sm">
                <div className="col-span-1 font-semibold text-slate-700 dark:text-slate-400 lg:col-span-2">
                  Awards & Honors
                </div>

                {selected.awards_and_honors.map((award) => (
                  <div key={award} className="flex items-center gap-2">
                    <Medal className="h-4 w-4 shrink-0" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-justify text-sm italic text-slate-700 dark:text-slate-300 lg:text-base">
                {selected.personal_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const EducationSectionSmall = () => {
  const [selectedInstitution, setSelectedInstitution] =
  useState<EducationKey | null>(null);
  const preview =
    (({ college, shs, hs2 }) => ({ college, shs, hs2 }))(EDUCATION_CONSTS);
  const selected =
    selectedInstitution
      ? EDUCATION_CONSTS[selectedInstitution]
      : null;

  return (<section className="flex flex-col w-full overflow-hidden">
    {/* Header */}
    <div className="flex flex-col px-6 my-4 w-full h-fit items-center justify-center gap-3">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
        Education
      </h1>
    </div>

    {/* Timeline */}
    <div className="mx-auto w-full max-w-2xl px-6">
      <div className="ml-4 border-l border-zinc-800 pt-8 space-y-8">
        {Object.entries(preview).map(([key, education]) => (
          <button
            key={key}
            onClick={() =>
              setSelectedInstitution(key as EducationKey)
            }
            className="w-full text-left cursor-pointer group"
          >
            <div className="relative pl-10">

              <div className="
                absolute -left-1.25 top-2
                size-2.5 rounded-full
                bg-zinc-700
                group-hover:bg-rose-500
                transition-colors
              "/>

              <span className="block text-xs text-zinc-500 font-mono mb-1">
                {education.date_range}
              </span>

              <h4 className="flex items-center gap-2 text-sm font-medium">
                <School />
                {education.school_name}
              </h4>

              <p className="text-xs text-zinc-500 my-1">
                {education.subtitle}
              </p>

              <p className="flex items-center gap-1 text-sm text-zinc-400 hover:underline">
                View
                <ArrowUpRight size={16}/>
              </p>

            </div>
          </button>
        ))}
        <button 
          // onClick={() => setSelectedInstitution("hs2")}
          className="rounded-xl cursor-pointer"
        >
          <div className="relative pl-10 h-24">
            <div
              className={`absolute -left-1.25 top-2 size-2.5 rounded-full ${
                false
                  ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                  : "bg-zinc-700"
              }`}
            />
            <span className="mb-1 rounded-xl bg-rose-500 px-3 py-1 font-semibold text-slate-50 dark:bg-rose-800 select-none hover:underline hover:bg-rose-400 dark:hover:bg-rose-700 cursor-pointer flex flex-row gap-1 text-left text-xs lg:text-sm">
              See more of my education <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
            </span>
          </div>
        </button>
      </div>
    </div>

    {/* Modal */}
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-xs
        transition-opacity duration-300
        ${
          selected
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
      onClick={() => setSelectedInstitution(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative overflow-hidden
          w-[90%] max-w-xl
          max-h-[80vh]
          overflow-y-auto
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50
          dark:bg-slate-950/70
          transition-all duration-300
          ${
            selected
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }
        `}
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        {selected && (
          <div className="m-6 my-8">
            <span className="rounded-xl bg-rose-500 px-2 py-1 text-sm font-semibold text-white w-fit">
              {selected.badge_content}
            </span>

            <h3 className="text-2xl font-semibold mt-3">
              {selected.school_name}
            </h3>

            <p className="italic text-sm text-gray-500">
              {selected.address}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">
                Awards & Honors
              </h4>

              <div className="space-y-2">
                {selected.awards_and_honors.map((award) => (
                  <div
                    key={award}
                    className="flex items-center gap-2"
                  >
                    <Medal size={16}/>
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm italic text-justify">
              {selected.personal_description}
            </p>

            <button
              onClick={() => setSelectedInstitution(null)}
              className="mt-6 w-full rounded-lg bg-rose-800 py-2 text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  </section>)
}

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
    <section className="flex flex-col w-full h-160 overflow-hidden">

      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Experience
        </h1>
      </div>

      {/* Selected Experience Preview */}
      <div className="flex-1">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            p-4 
          "
        >
          <div className="w-1/2 p-6 overflow-y-auto">
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
                      bg-slate-200
                      dark:bg-slate-800
                      px-3 py-1
                      text-xs
                      font-semibold
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
                      bg-rose-100
                      dark:bg-rose-950
                      text-rose-800
                      dark:text-rose-300
                      px-3 py-1
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-rose-200
                      dark:hover:bg-rose-900
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
                  h-60
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
                      flex flex-row gap-2 items-center
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4" /> <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="
              w-1/2
              border-l
              border-slate-300
              dark:border-slate-800
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                h-[80%]
                w-[80%]
                rounded-xl
                border
                border-dashed
                border-slate-300
                dark:border-slate-700
              "
            >
              Visual Placeholder
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-36 flex items-center">

        {/* Line */}
        <div className="absolute h-px bg-rose-300 dark:bg-rose-950 w-full" />

        {/* Points */}
        <div className="relative z-10 flex w-[60%] mx-auto justify-between">

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

          bg-black/40
          backdrop-blur-sm

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
            w-[90%]
            max-w-2xl

            rounded-xl
            border border-slate-300
            dark:border-slate-800

            bg-slate-50
            dark:bg-slate-950

            p-6

            transition-all duration-300

            ${
              isTechModalOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">
              Technologies Used
            </h3>

            <button
              onClick={() => setIsTechModalOpen(false)}
              className="
                text-sm
                text-slate-500
                hover:text-slate-700
                dark:hover:text-slate-300
                cursor-pointer
              "
            >
              Close
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedExperience.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-xl
                  bg-slate-200
                  dark:bg-slate-800

                  px-3 py-1

                  text-xs
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
  
  return <></>
}

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

        <section className="w-full bg-violet-300 aspect-video py-8 px-12">
          Blog - Preview
        </section>
        <section className="w-full bg-indigo-600 aspect-video py-8 px-12">
          CTA - Contact Me
        </section>
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

        <section className="w-full bg-pink-200 h-screen py-8 px-12">
          Experience - Preview
        </section>
        <section className="w-full bg-violet-300 h-screen py-8 px-12">
          Blog - Preview
        </section>
        <section className="w-full bg-indigo-600 h-screen py-8 px-12">
          CTA - Contact Me
        </section>
      </main>

      {/* Footer */}
      <div className="flex flex-col px-4 sm:px-8 py-4 w-full min-h-62.5 bg-rose-800">
        
        {/* Upper Column Layout On Medium-Large */}
        <div className="hidden sm:grid w-full flex-1 bg-yellow-300 grid-cols-3">
          <div className="flex flex-col gap-2">Site Title & Description</div>
          <div className="flex flex-col gap-2">
            <b>Header 1</b>
            <span>Content</span>
            <span>Content</span>
            <span>Content</span>
            <span>Content</span>
          </div>
          <div className="flex flex-col gap-2">
            <b>Header 1</b>
            <span>Content</span>
            <span>Content</span>
            <span>Content</span>
            <span>Content</span>
          </div>
        </div>

        {/* Upper Column Layout on Small */}
        <div className="grid sm:hidden w-full flex-1 bg-amber-500 grid-rows-auto gap-3">
          <div className="flex flex-col gap-2 h-fit py-2">Site Title & Description</div>
          <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-1 flex-col gap-2">
              <b>Header 1</b>
              <span>Content</span>
              <span>Content</span>
              <span>Content</span>
              <span>Content</span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <b>Header 1</b>
              <span>Content</span>
              <span>Content</span>
              <span>Content</span>
              <span>Content</span>
            </div>
          </div>
        </div>

        {/* Lower Column Layout On Medium-Large */}
        <div className="hidden sm:flex bg-green-500 w-full pt-4 md:pt-8 pb-2 md:pb-4 border-t-2 border-t-slate-300 flex-row text-sm">
          <div className="flex-1">Copyright Migo 2026</div>
          <div className="flex-1 text-right">Terms & Conditions | Privacy Policy</div>
        </div>

        {/* Lower Column Layout On Small */}
        <div className="flex sm:hidden bg-green-500 w-full pt-4 md:pt-8 pb-2 md:pb-4 border-t-2 border-t-slate-300 flex-row text-xs">
          <div className="flex-1 text-center">Copyright Migo 2026 | Terms & Conditions | Privacy Policy</div>
        </div>
      </div>
    </div>
  );
}
