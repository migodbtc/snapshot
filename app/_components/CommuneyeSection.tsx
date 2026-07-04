
// CommuneyeSection: Mandatory section to promote my software project Instagram account, lol.

import { Eye, ArrowUpRight } from "lucide-react";
import Image from 'next/image';

// I have to, at this point.
export const CommuneyeSection = () => {
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

export const CommuneyeSectionSmall = () => {
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