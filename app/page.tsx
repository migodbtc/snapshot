"use client"

import { ABOUT_ME_INFO, FRAMEWORK_CONSTS, LANGUAGE_CONSTS, PLATFORM_CONSTS, TOOL_CONSTS } from "@/lib/constants";
import { ArrowUpRight, Atom, Blocks, BookOpen, Braces, Briefcase, Cloud, Code2, GraduationCap, Languages,Mail, Menu, School, Server, Target, User, Wind, Wrench } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AboutMeCard, TechnologyCard } from "./_components/cards";



// SkillsSection: The dedicated section for the skills where there are subpages for the display depending
// on the selected skill (i.e. languages is the default)
type SkillCategory =
  | "languages"
  | "frameworks"
  | "tools"
  | "platforms";

function SkillsSection() {
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

      <div className="flex flex-row w-full h-fit items-center justify-center gap-4 px-8 pb-4 text-center max-w-xl lg:max-w-3xl mx-auto text-xs lg:text-base">
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
        <div className="w-full aspect-video mx-8 mt-2 flex flex-col">
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

const SkillsSectionMobile = () => {
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
        <div className="w-full aspect-video mx-8 mt-2 flex flex-col">
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

// Home: the default component to be exported, contains the entirety of the home page.
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="flex flex-row px-4 sm:px-8 py-4 w-full text-rose-800 ">

        {/* Header Title & Logo */}
        <div className="flex-1 my-auto">
          <span className="font-bold text-lg sm:text-xl uppercase tracking-wide flex flex-row gap-2 ">
            <span className="text-slate-950 dark:text-slate-50">MIGUEL</span> 
            <span className="text-slate-950 dark:text-slate-50 text-lg sm:text-xl"><Code2 /></span>
            <span>JUSTIN</span>
          </span>
        </div>

        {/* Header Links (Web Only) */}
        <div className="hidden lg:flex flex-2 justify-end items-center gap-4 text-rose-800 text-sm">
          <a className="flex items-center gap-1 hover:underline cursor-pointer uppercase">
            <Wrench size={18} />
            <span>Skills</span>
          </a>

          <a className="flex items-center gap-1 hover:underline cursor-pointer uppercase">
            <GraduationCap size={18} />
            <span>Education</span>
          </a>

          <a className="flex items-center gap-1 hover:underline cursor-pointer uppercase">
            <Briefcase size={18} />
            <span>Experience</span>
          </a>

          <a className="flex items-center gap-1 hover:underline cursor-pointer uppercase">
            <BookOpen size={18} />
            <span>Blog</span>
          </a>

          <a className="flex items-center gap-1 hover:underline cursor-pointer uppercase">
            <Mail size={18} />
            <span>Contact</span>
          </a>
        </div>

        {/* Header Links (Mobile & Web) */}
        <div className="flex lg:hidden flex-1 justify-end">
          <button
            type="button"
            className="p-2 text-rose-800 hover:bg-rose-100 rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>

      </div>

      {/* Main Content - Medium-Large */}
      <main className="hidden sm:flex flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">

        {/* Hero Section */}
        <section className="w-full aspect-video flex flex-row mb-8">
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
              />
            </div>
          </div>
        </section>

        {/* Summary/Introduction Section */}
        <section className="w-full aspect-video flex flex-col pb-12">
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
            {/* <div className="flex-1 ">
              <div className="mx-auto max-w-7xl px-6">
                <div className="ml-4 space-y-12 border-l border-zinc-800">
                  
                    <div className="relative pl-10">
                      <div
                        className={`absolute -left-[5px] top-2 size-2.5 rounded-full ${
                          true
                            ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                            : "bg-zinc-700"
                        }`}
                      />
                      <span className="mb-2 block font-mono text-xs text-zinc-500">
                        Period
                      </span>
                      <h4 className="text-lg font-medium">Title</h4>
                      <p className="mb-2 text-sm text-zinc-500">Org</p>
                      <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
                        Body
                      </p>
                    </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        
        {/* Skills Section */}
        <SkillsSection />

        <section className="w-full bg-violet-300 aspect-video py-8 px-12">
          Education - Preview
        </section>
        <section className="w-full bg-pink-200 aspect-video py-8 px-12">
          Experience - Preview
        </section>
        <section className="w-full bg-violet-300 aspect-video py-8 px-12">
          Blog - Preview
        </section>
        <section className="w-full bg-indigo-600 aspect-video py-8 px-12">
          CTA - Contact Me
        </section>
      </main>

      {/* Main Content - Small */}
      <main className="flex sm:hidden flex-1 w-full h-fit lg:max-w-6xl flex-col items-center justify-between sm:items-start ">

        <section className="w-full min-h-[90vh] flex flex-col px-6 pt-6 gap-6 text-center justify-center  bg-radial from-rose-800/25 dark:from-slate-50/10 to-transparent to-65%">
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

        {/* About Me - Small */}
        <section className="w-full aspect-video flex flex-col pb-4">
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

        {/* Skills Section - Small */}
        <SkillsSectionMobile />
        
        
        <section className="w-full bg-violet-300 h-screen py-8 px-12">
          Education - Preview
        </section>
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
