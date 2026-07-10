"use client"

import { ArrowLeft, ArrowUpRight, Camera, Eye, GraduationCapIcon, Mail, Medal, School } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from 'next/image';

export default function EducationPage() {
    const router = useRouter();

    return <main className="w-full h-fit flex flex-col items-center pb-8 min-h-[90vh]">

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
                    <Eye className="text-3xl text-rose-800" size={32}/>
                    Communeye
                </h1>
            </div>

            {/* Page Description */}
            <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
                The Communeye Project is a project of mine which I produce various software, systems, and digital solutions under a separate brand independent of my name and professional experience. It is meant to be able to showchase projects and produce associated content to the masses. Right now, it functions as a casual, low-pressure sandbox — a place to share both Communeye-branded projects and other content, without a fixed posting schedule.
            </p>

            {/* Tooltip */}
            {/* <span className='text-sm italic text-gray-500 mb-4'>For laptop, tap the timeline points to change the content of the card on the right. For tablet & mobile, scroll and tap the timeline points to reveal a pop-up card!</span> */}

            <div className="
                w-full h-48 mt-4 mb-16
                grid grid-cols-3
                gap-2 
            ">
                <div className="flex-1">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                        <Image
                            src="/images/communeye/logo.jpg"
                            alt="Communeye Software"
                            className="object-cover object-top"
                            loading="eager"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            fill
                        />
                    </div>
                </div>
                <div className="
                    ml-4
                    h-fit col-span-2
                    flex flex-col gap-2
                    my-auto

                ">
                    <div className="h-fit flex flex-col lg:col-span-2">
                        <h2 className="text-2xl tracking-wider font-bold uppercase mb-2 flex flex-row items-center gap-2">
                            Reach out to Communeye!
                        </h2>
                        <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
                            Feel free to send your inquiries about the project and contact Communeye Software with the links below.
                        </p>
                    </div>
                    <div className="hidden md:flex w-full flex-row gap-2">
                        <div className="flex-1 h-fit flex flex-col gap-2">
                            <b className="text-rose-800 flex flex-row gap-1 items-center">
                                <Camera size={22}/>
                                Instagram Page
                            </b>
                            <span className="
                                w-fit 
                                text-xs lg:text-sm 
                                text-slate-700 dark:text-slate-300 
                                cursor-pointer hover:underline 
                                flex flex-row items-center 
                            ">
                                Official IG Page
                                <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
                            </span>
                        </div>
                        <div className="flex-1 h-fit flex flex-col gap-2">
                            <b className="text-rose-800 flex flex-row gap-1 items-center">
                                <Mail size={22} />
                                Email Address
                            </b>
                            <a 
                            href={'mailto:communeye@proton.me'}
                            className="
                                w-fit 
                                text-xs lg:text-sm 
                                text-slate-700 dark:text-slate-300 
                                cursor-pointer hover:underline 
                                flex flex-row items-start
                            ">
                                communeye@proton.me
                                <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex md:hidden w-full flex-col gap-4 col-span-3">
                    <div className="flex-1 h-fit flex flex-row justify-between">
                        <b className="text-rose-800 flex flex-row gap-1 items-center text-md">
                            <Camera size={16}/>
                            Instagram Page
                        </b>
                        <span className="
                            w-fit 
                            text-sm
                            text-slate-700 dark:text-slate-300 
                            cursor-pointer hover:underline 
                            flex flex-row items-start
                        ">
                            Official IG Page
                            <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
                        </span>
                    </div>
                    <div className="flex-1 h-fit flex flex-row justify-between">
                        <b className="text-rose-800 flex flex-row gap-1 items-center text-sm">
                            <Mail size={16} />
                            Email Address
                        </b>
                        <a 
                        href={'mailto:communeye@proton.me'}
                        className="
                            w-fit 
                            text-sm 
                            text-slate-700 dark:text-slate-300 
                            cursor-pointer hover:underline 
                            flex flex-row items-start
                        ">
                            communeye@proton.me
                            <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
}