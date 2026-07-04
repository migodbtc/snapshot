import { Briefcase, Mail } from 'lucide-react';
import Image from 'next/image';

// HeroSection: Dedicated section for the hero part of the portfolio.
// Includes laptop/mobile/tablet responsive layouts.
export const HeroSection = () => {
  return <section className="w-full aspect-video flex flex-row mb-8">
    <div className="flex flex-1 flex-col px-6 h-full items-start justify-center gap-3">
      <span className="text-sm lg:text-base text-gray-500">Welcome to my professional website</span>
      <h1 className="text-4xl lg:text-5xl ">My name is <b className="text-rose-800">Migo</b>.</h1>
      <p className="text-justify w-full text-gray-700 dark:text-gray-400">I am an up and coming software engineering with a passion for building human-first digital solutions, collaboration and sharing of technical knowledge and experience, and a willingness to learn and adapt to what is necessary. </p>
      <div className="w-full flex flex-row gap-2">
        <button
          className="
            w-fit
            flex items-center justify-center
            gap-2
            py-2 px-4
            border
            rounded-lg
            cursor-pointer
            bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900
          "
        >
          <Briefcase size={18}/>
          LinkedIn
          </button>
        <button
          className="
            group
            relative
            overflow-hidden
            py-2 px-4
            flex flex-row gap-2
            w-fit
            items-center
            rounded-lg
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            cursor-pointer
            text-slate-900
            dark:text-slate-50
            transition-transform
            duration-300
            hover:scale-[1.02]
          "
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

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
          className="object-cover object-top"
          loading="eager"
          fill
        />
      </div>
    </div>
  </section>
}

export const HeroSectionSmall = () => {
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
        <button
          className="
            w-full
            flex items-center justify-center
            gap-2
            py-2 px-4
            border
            rounded-lg
            cursor-pointer
            bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900
          "
        >
          <Briefcase size={18} />
          LinkedIn
        </button>

        <button
          className="
            group
            relative
            overflow-hidden
            w-full
            flex items-center justify-center
            gap-2
            py-2 px-4
            rounded-lg
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            text-sm
            cursor-pointer
            text-slate-900
            dark:text-slate-50
            transition-transform
            duration-300
            hover:scale-[1.02]
          "
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

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

          <Mail size={18} />
          Contact
        </button>
      </div>
    </div>
  </section>
}