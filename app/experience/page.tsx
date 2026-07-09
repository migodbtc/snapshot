"use client"
import { ArrowLeft, Briefcase, Building, Building2, Circle, Laptop, Pencil, User, UserCheck2 } from 'lucide-react'
import { TimelinePoint } from '../_components/ExperienceSection'
import { useState } from 'react';
import { EXPERIENCE_CONSTS } from '@/lib/constants/experience';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function ExperiencePage() {
    const [selectedExperience, setSelectedExperience] =
        useState(EXPERIENCE_CONSTS[0]);
    const visibleTechnologies =
        selectedExperience.technologies

    const router = useRouter()
    
    return <main className="w-full h-fit flex flex-col items-center pb-8">

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
                    <Briefcase className="text-3xl text-rose-800" size={32}/>
                    Experience
                </h1>
            </div>

            {/* Page Description */}
            <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
                This section of the website will explain the experience that I have garnered and have shaped my professional career by exposing me into different environments. As of 07/09/2026, I have not yet gathered as much experience as I recently graduated and my professional career is just starting. 
            </p>

            {/* Timeline Component */}
            <div className="relative h-fit pt-4 pb-12 flex items-center mb-8">

                {/* Line */}
                <div className="absolute h-px bg-rose-300 dark:bg-rose-950 w-full" />

                {/* Points */}
                <div className="relative z-10 flex w-[60%] mx-auto justify-center">
                {EXPERIENCE_CONSTS.map((exp) => (
                    <TimelinePoint
                    key={exp.role}
                    role={exp.role}
                    date={exp.shortened_date}
                    position="bottom"
                    onClick={() => setSelectedExperience(exp)}
                    />
                ))}
                </div>
            </div>

            {/* Selection Component */}
            <div className="flex-1">
                
                {/* Image Gallery. */}
                <div
                    className="
                        w-full
                        mb-4
                        grid
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        gap-4
                    "
                >
                    {/* Slot 1 — real image, always visible */}
                    <div
                        className="
                            aspect-video
                            rounded-xl
                            border border-slate-300
                            dark:border-slate-800
                            relative
                            overflow-hidden
                        "
                    >
                        <Image
                            src={
                                selectedExperience.images?.[0]
                                    ?? "https://placehold.co/800x450/e2e8f0/64748b?text=Placeholder"
                                }
                            alt="Miguel Justin at the Rakso CT Office Logo"
                            fill
                            className="object-cover object-top"
                            loading="eager"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>

                    {/* Slot 2 — appears from md up */}
                    <div
                        className="
                            hidden md:block
                            aspect-video
                            rounded-xl
                            border border-slate-300
                            dark:border-slate-800
                            relative
                            overflow-hidden
                        "
                    >
                        <Image
                            src={
                                selectedExperience.images?.[1]
                                    ?? "https://placehold.co/800x450/e2e8f0/64748b?text=Placeholder"
                                }
                            alt="Miguel Justin at the Rakso CT Office Logo"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                    </div>

                    {/* Slot 3 — appears from lg up */}
                    <div
                        className="
                            hidden lg:block
                            aspect-video
                            rounded-xl
                            border border-slate-300
                            dark:border-slate-800
                            relative
                            overflow-hidden
                        "
                    >
                        <Image
                            src={
                                selectedExperience.images?.[2]
                                    ?? "https://placehold.co/800x450/e2e8f0/64748b?text=Placeholder"
                                }
                            alt="Miguel Justin at the Rakso CT Office Logo"
                            fill
                            className="object-cover object-top"
                            sizes="33vw"
                        />
                    </div>
                </div>

                {/* Body Content */}
                <div
                    className="
                        w-full
                        overflow-y-auto
                        p-6 lg:p-8
                        rounded-xl
                        border border-slate-300
                        dark:border-slate-800
                        backdrop-blur-md
                        bg-slate-50/50
                        dark:bg-slate-950/30
                    "
                >
                    <div className='absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent'/>
                    <div className="mb-2">
                        <div className="flex items-center gap-1 flex-wrap justify-between">
                            <h2 className="text-xl md:text-2xl font-bold flex flex-row gap-2 items-center">
                                <UserCheck2 size={24} className='text-rose-800'/>
                                {selectedExperience.role}
                            </h2>

                            <p className="text-base italic text-slate-500 text-right">
                                {selectedExperience.start_date} - {selectedExperience.finish_date}
                            </p>
                        </div>

                        <p className="text-md text-gray-500 dark:text-gray-400 flex flex-row gap-2 items-center">
                            <Building2 size={16}/>
                            {selectedExperience.company_name}
                        </p>
                    </div>

                    {/* Tooltip */}
                    <span className='text-sm italic text-gray-500'>Scroll to navigate achievements!</span>

                    {/* Achievements */}
                    <div className='mt-2'>
                        <ul
                            className="
                                h-60
                                overflow-y-auto
                                space-y-3

                                bg-transparent

                                text-xs md:text-sm
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
                                        text-sm md:text-md
                                        text-gray-600
                                        dark:text-gray-300
                                        leading-relaxed
                                        flex flex-row gap-2 items-start
                                        text-justify
                                    "
                                >
                                    <Circle className="w-4 h-4 mt-2" /> <p className="flex-1 mx-2">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Additional Content */}
                <div
                    className='
                        w-full mt-4
                        grid grid-cols-1 md:grid-cols-2
                        gap-4
                    '>
                    {/* Short Summary */}
                    <div 
                        className='
                            w-full 
                            sm:h-fit md:aspect-square lg:aspect-4/3
                            flex flex-col gap-2
                            overflow-y-auto p-6 lg:p-8
                            rounded-xl
                            border border-slate-300
                            dark:border-slate-800
                            backdrop-blur-md
                            bg-slate-50/50
                            dark:bg-slate-950/30
                        '
                    >
                        <div className='absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent'/>
                        <h2 className="text-xl md:text-2xl font-bold flex flex-row gap-2 items-center">
                            <Pencil size={24} className='text-rose-800'/>
                            Short Summary
                        </h2>
                        <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-1">
                            {selectedExperience.summary}
                        </p>
                    </div>
                    
                    {/* Technologies */}
                    <div 
                        className='
                            w-full 
                            sm:h-fit md:aspect-square lg:aspect-4/3
                            overflow-y-auto p-6
                            rounded-xl
                            border border-slate-300
                            dark:border-slate-800
                            backdrop-blur-md
                            bg-slate-50/50
                            dark:bg-slate-950/30
                        '
                    >
                        <div className='absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent'/>
                        <div className="w-full flex flex-col gap-2">
                            <h2 className="text-xl md:text-2xl font-bold flex flex-row gap-2 items-center">
                                <Laptop size={24} className='text-rose-800'/>
                                Technologies
                            </h2>
                            <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-1">
                                Technologies used during the involvement of the experience.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {visibleTechnologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="
                                            rounded-xl
                                            bg-rose-800
                                            px-2 py-0.5 md:px-3 md:py-1
                                            text-xs
                                            font-semibold
                                            text-slate-100
                                        "
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </main>
}