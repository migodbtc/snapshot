// SkillsSection: The dedicated section for the skills where there are subpages for the display depending

import { LANGUAGE_CONSTS, FRAMEWORK_CONSTS, TOOL_CONSTS, PLATFORM_CONSTS } from "@/lib/constants";
import { SkillCategory } from "@/lib/types/skills";
import { Braces, Blocks, Wrench, Cloud, ArrowUpRight, LucideIcon } from "lucide-react";
import { useState } from "react";

// TechnologyCard: A unified card in order to deal with languages, frameworks, tools, and platforms.
type TechnologyCardProps = {
  icon: LucideIcon;
  name: string;
  years: string | number;
  description: string;
};

export const TechnologyCard = ({
  icon: Icon,
  name,
  years,
  description,
}: TechnologyCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      <div className="flex h-full">
        <div className="flex flex-1 items-center justify-center">
          <div className="ml-2 flex h-[75%] w-full items-center justify-center border-r-2 border-slate-200 dark:border-slate-900 bg-radial from-rose-700/10 dark:from-rose-800/40 to-transparent to-50%">
            <Icon className="h-8 w-8 lg:h-12 lg:w-12 text-rose-800 dark:text-rose-500" />
          </div>
        </div>

        <div className="flex-3 flex flex-col items-start justify-center gap-0 py-2 pl-4 lg:gap-1">
          <div className="flex w-full items-center justify-between pr-4">
            <h3 className="font-bold">{name}</h3>

            <span className="rounded-xl bg-rose-500 px-2 py-0.5 text-xs font-semibold text-slate-50 dark:bg-rose-800">
              {years}yrs
            </span>
          </div>

          <p className="w-full pr-4 text-justify text-xs italic text-gray-800 dark:text-gray-400">
            {description.length > 125
              ? `${description.slice(0, 124)}...`
              : description}
          </p>
        </div>
      </div>
    </div>
  );
};

// on the selected skill (i.e. languages is the default)
export const SkillsSection = () => {
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
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
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

          <div className="w-full text-center text-base text-gray-800/90 dark:text-slate-50/90">
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

export const SkillSectionSmall = () => {
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
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
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

          <div className="w-full text-center text-base text-gray-700/90 dark:text-slate-50/90">
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