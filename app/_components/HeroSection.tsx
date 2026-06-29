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