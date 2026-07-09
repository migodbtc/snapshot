"use client"

import { skillData, sourceMeta } from "@/lib/constants/skills";
import { SkillCategory } from "@/lib/types/skills";
import { ArrowLeft, Blocks, BookOpen, Braces, Brain, Briefcase, Clock, Cloud, Code2, GraduationCap, LucideIcon, Star, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SkillsPage() {
    const [selectedCategory, setSelectedCategory] =
        useState<SkillCategory>("languages");
    const router = useRouter();

    const getButtonClass = (category: SkillCategory) =>
    `w-fit flex-none py-2 px-4 rounded-lg border flex items-center justify-center transition-all duration-300 ease-out cursor-pointer select-none ${
    selectedCategory === category
        ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900"
        : "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-700 dark:hover:text-rose-300 hover:border-rose-300 dark:hover:border-rose-800"
    }`;

    const getSpanClass = (category: SkillCategory) =>
    `overflow-hidden whitespace-nowrap tracking-wider transition-all duration-300 ease-out uppercase ${
    selectedCategory === category
        ? "max-w-32 opacity-100 ml-2"
        : "max-w-0 opacity-0 ml-0"
    }`;

    const getSubsectionClass = (category: SkillCategory) =>
    `col-start-1 row-start-1 w-full transition-opacity duration-300 ease-out ${
    selectedCategory === category
        ? "visible pointer-events-auto"
        : "hidden pointer-events-none"
    }`;

    // Subsection Card Classes
    const cardClass =
    "relative sm:h-fit md:min-h-48 overflow-hidden flex flex-row gap-4 p-4 pb-4 rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md text-slate-700 dark:text-slate-300 text-sm";

    const cardGlowClass =
        "absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent";

    const iconWrapClass =
        "aspect-square h-1/3 flex-none rounded-xl bg-slate-200 dark:bg-slate-900 flex items-center justify-center";

    const iconClass = "text-slate-500 dark:text-slate-200";

    const contentColClass = "flex flex-col flex-1 min-w-0 gap-2 justify-between";

    const headerGroupClass = "flex flex-col gap-2";

    const nameClass = "font-semibold text-base text-slate-900 dark:text-slate-100";

    const badgeRowClass = "flex flex-row flex-wrap gap-2 uppercase";

    const solidBadgeClass =
        "flex items-center gap-1 py-1 px-2 rounded-xl bg-rose-800 text-rose-50 text-xs";

    const descriptionClass =
        "text-justify w-full text-gray-700 dark:text-gray-400 text-md";

    const sourceRowClass = "flex flex-row flex-wrap gap-2";

    const mutedBadgeClass =
        "flex items-center gap-1 py-1 px-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs";

    return <main className="w-full h-fit flex flex-col items-center">

        {/* Unified responsive layout */}
        <section className="
        flex-1 flex flex-col
        w-full md:w-2xl lg:w-4xl
        px-8 md:px-0
        pb-16 md:pb-8 lg:pb-16
        ">
            {/* Return to Home Option */}
            <div className='text-sm italic text-gray-400 dark:text-gray-600 my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase' onClick={() => {router.push("/")}}>
                <ArrowLeft size={16}/>
                <span>Return to Home</span>
            </div>
            
            {/* Page Header */}
            <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3">
                <h1 className="text-3xl tracking-wider font-bold uppercase mb-2 flex flex-row items-center gap-2">
                    <Brain className="text-3xl text-rose-800" size={32}/>
                    Skills
                </h1>
            </div>

            {/* Page Description */}
            <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
                The following content below will display the skills that I am familiar, studied, and applied in some way shape or form. As I continue to grow, I will be able to achieve new skills with new technologies and tools as I continue to master the fundamentals of the existing skills I have. 
            </p>
            <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-4">
                Click any of the buttons to navigate between skills! 
            </p>

            {/* Skill Navigation Dock */}
            <div className="flex flex-row w-full h-fit items-start justify-center gap-2 md:gap-4 pb-4 text-center text-sm md:text-md lg:text-lg">
                <button
                    onClick={() => setSelectedCategory("languages")}
                    className={getButtonClass("languages")}
                >
                    <Braces size={22} />
                    <span className={getSpanClass("languages")}>Languages</span>
                </button>

                <button
                    onClick={() => setSelectedCategory("frameworks")}
                    className={getButtonClass("frameworks")}
                >
                    <Blocks size={22} />
                    <span className={getSpanClass("frameworks")}>Frameworks</span>
                </button>

                <button
                    onClick={() => setSelectedCategory("tools")}
                    className={getButtonClass("tools")}
                >
                    <Wrench size={22} />
                    <span className={getSpanClass("tools")}>Tools</span>
                </button>

                <button
                    onClick={() => setSelectedCategory("platforms")}
                    className={getButtonClass("platforms")}
                >
                    <Cloud size={22} />
                    <span className={getSpanClass("platforms")}>Platforms</span>
                </button>
            </div>

            {/* Subsections */}
            <div className="grid w-full mb-8">
                {(Object.keys(skillData) as SkillCategory[]).map((category) => (
                    <div key={category} className={getSubsectionClass(category)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full">
                            {skillData[category].map((skill) => (
                                <div key={skill.name} className={cardClass}>
                                    <div className={cardGlowClass} />

                                    {/* Icon column */}
                                    <div className={iconWrapClass}>
                                        <skill.icon className={iconClass} size={20} />
                                    </div>

                                    {/* Content column */}
                                    <div className={contentColClass}>
                                        <div className={headerGroupClass}>
                                            <h3 className={nameClass}>{skill.name}</h3>

                                            {/* Time spent + preferred badges */}
                                            <div className={badgeRowClass}>
                                                <span className={solidBadgeClass}>
                                                    <Clock size={12} />
                                                    {skill.timeSpent}
                                                </span>
                                                {skill.preferred && (
                                                    <span className={solidBadgeClass}>
                                                        <Star size={12} />
                                                        Preferred
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className={descriptionClass}>
                                                {skill.description}
                                            </p>
                                        </div>

                                        {/* Source badges — muted */}
                                        <div className={sourceRowClass}>
                                            {skill.sources.map((source) => {
                                                const SourceIcon = sourceMeta[source].icon;
                                                return (
                                                    <span key={source} className={mutedBadgeClass}>
                                                        <SourceIcon size={12} />
                                                        {sourceMeta[source].label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </main>
}