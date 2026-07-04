import { Code2, Wrench, GraduationCap, Briefcase, BookOpen, Mail, Menu } from "lucide-react";

export default function AppHeader() {
    return (

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
    )
}