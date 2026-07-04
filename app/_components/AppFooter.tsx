import { Code2, Code, BriefcaseBusinessIcon, FileText, Mail } from "lucide-react";

// Footer: The footer to be used throughout the website.
export const AppFooter = () => {
  return (
    <footer
      className="
        flex flex-col
        px-8 md:px-8 
        py-6
        w-full
        bg-slate-100
        dark:bg-slate-950
        border-t
        border-slate-300
        dark:border-slate-800
      "
    >
      {/* Upper Layout - Medium/Large */}
      <div className="hidden sm:grid w-full lg:w-[90%] lg:mx-auto grid-cols-3 gap-8 py-4">

        {/* Branding */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-2 items-center">
            <span className="text-slate-950 dark:text-slate-50">
              MIGUEL
            </span>

            <Code2
              size={20}
              className="text-slate-950 dark:text-slate-50"
            />

            <span className="text-rose-800 dark:text-rose-500">
              JUSTIN
            </span>
          </span>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs text-justify">
            Information Technology graduate focused on application
            development, software engineering, and continuous learning.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Navigation
          </h3>

          <a className="hover:underline cursor-pointer">
            Skills
          </a>

          <a className="hover:underline cursor-pointer">
            Education
          </a>

          <a className="hover:underline cursor-pointer">
            Experience
          </a>

          <a className="hover:underline cursor-pointer">
            Blog
          </a>

          <a className="hover:underline cursor-pointer">
            Contact
          </a>
        </div>

        {/* External Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
            External Links
          </h3>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <Code size={16} />
            GitHub
          </a>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <BriefcaseBusinessIcon size={16} />
            LinkedIn
          </a>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <FileText size={16} />
            Resume
          </a>

          <a className="flex items-center gap-2 hover:underline cursor-pointer">
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>

      {/* Upper Layout - Small */}
      <div className="grid sm:hidden gap-6 py-4">

        {/* Branding */}
        <div className="flex flex-col gap-3">
          <span className="font-bold text-lg uppercase tracking-wide flex flex-row gap-2 items-center justify-center">
            <span className="text-slate-950 dark:text-slate-50">
              MIGUEL
            </span>

            <Code2
              size={18}
              className="text-slate-950 dark:text-slate-50"
            />

            <span className="text-rose-800 dark:text-rose-500">
              JUSTIN
            </span>
          </span>

          <p className="text-xs text-center text-slate-600 dark:text-slate-400">
            Information Technology graduate focused on application
            development and software engineering.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">
              Navigation
            </h3>

            <a className="hover:underline cursor-pointer text-sm">
              Skills
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Education
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Experience
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Blog
            </a>

            <a className="hover:underline cursor-pointer text-sm">
              Contact
            </a>
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">
              Links
            </h3>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <Code size={14} />
              GitHub
            </a>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <BriefcaseBusinessIcon size={14} />
              LinkedIn
            </a>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <FileText size={14} />
              Resume
            </a>

            <a className="flex items-center gap-2 hover:underline cursor-pointer text-sm">
              <Mail size={14} />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Medium/Large */}
      <div
        className="
          hidden sm:flex
          w-full
          lg:w-[90%]
          lg:mx-auto
          pt-6
          mt-4
          border-t
          border-slate-300
          dark:border-slate-800
          text-sm
        "
      >
        <button className="hover:underline cursor-pointer">
          © 2026 Miguel Justin
        </button>

        <div className="flex-1 flex justify-end gap-6">
          <button className="hover:underline cursor-pointer">
            Terms of Service
          </button>

          <button className="hover:underline cursor-pointer">
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Bottom Footer - Small */}
      <div
        className="
          flex sm:hidden
          flex-col
          items-center
          gap-2
          pt-4
          mt-2
          border-t
          border-slate-300
          dark:border-slate-800
          text-xs
        "
      >
        <button className="hover:underline cursor-pointer">
          © 2026 Miguel Justin
        </button>

        <div className="flex gap-4">
          <button className="hover:underline cursor-pointer">
            Terms of Service
          </button>

          <button className="hover:underline cursor-pointer">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};