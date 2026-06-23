import { BookOpen, Briefcase, Code2, GraduationCap, Mail, Menu, Wrench } from "lucide-react";
import Image from "next/image";

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
        <section className="w-full aspect-video flex flex-row">
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

        
        <section className="w-full bg-violet-300 aspect-video py-8 px-12">
          Summary/Introduction
        </section>
        <section className="w-full bg-pink-200 aspect-video py-8 px-12">
          Skills - Preview
        </section>
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

        <section className="w-full min-h-[90vh] flex flex-col px-6 py-10 gap-6 text-center justify-center  bg-radial from-rose-800/40 dark:from-slate-50/10 to-transparent to-65%">
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

        <section className="w-full bg-violet-300 h-screen py-8 px-12">
          Summary/Introduction
        </section>
        <section className="w-full bg-pink-200 h-screen py-8 px-12">
          Skills - Preview
        </section>
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
