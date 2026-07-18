import {
  Code2,
  Code,
  BriefcaseBusinessIcon,
  FileText,
  Mail,
  User,
  Braces,
  GraduationCap,
  Briefcase,
  Newspaper,
  Eye,
  Laptop,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Footer: The footer to be used throughout the website.
export const AppFooter = () => {
  return (
    <footer
      className="
    relative z-30
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
          <Link href="/" className="flex flex-col select-none cursor-pointer">
            <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-1">
              <span className="text-slate-950 dark:text-slate-50 text-lg sm:text-xl">
                <Image
                  src="/images/favicons/favicon-32x32.png"
                  alt="Site Icon"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-slate-950 dark:text-slate-50 flex flex-row">
                SNAP<div className="text-rose-800">SHOT</div>
              </span>
              <span className="flex h-fill items-end text-sm text-slate-500">
                BY MIGO
              </span>
            </span>
            <span className="text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wide font-semibold">
              A Career-focused Website
            </span>
          </Link>

          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xs text-justify">
            The personal portfolio of Miguel Justin Bunda — a software engineer
            documenting his journey through building software, exploring
            technology, and growing within the industry.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Navigation
          </h3>

          <Link
            href="/about"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <User size={16} />
            About
          </Link>

          <Link
            href="/skills"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Braces size={16} />
            Skills
          </Link>

          <Link
            href="/education"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <GraduationCap size={16} />
            Education
          </Link>

          <Link
            href="/experience"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Briefcase size={16} />
            Experience
          </Link>

          <Link
            href="/projects"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Laptop size={16} />
            Projects
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Newspaper size={16} />
            Blog
          </Link>

          <Link
            href="/communeye"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Eye size={16} />
            Communeye
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Mail size={16} />
            Contact
          </Link>
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
          <Link
            href="/"
            className="flex flex-col select-none mx-auto cursor-pointer"
          >
            <span className="font-bold text-xl uppercase tracking-wide flex flex-row gap-1">
              <span className="text-slate-950 dark:text-slate-50 text-lg sm:text-xl">
                <Image
                  src="/images/favicons/favicon-32x32.png"
                  alt="Site Icon"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-slate-950 dark:text-slate-50 flex flex-row">
                SNAP<div className="text-rose-800">SHOT</div>
              </span>
              <span className="flex h-fill items-end text-sm text-slate-500">
                BY MIGO
              </span>
            </span>
            <span className="w-fill text-center text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wide font-semibold">
              A Career-focused Website
            </span>
          </Link>

          <p className="text-base text-center text-slate-600 dark:text-slate-400">
            The personal portfolio of Miguel Justin Bunda — a software engineer
            documenting his journey through building software, exploring
            technology, and growing within the industry.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">
              Navigation
            </h3>

            <Link
              href="/about"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <User size={14} />
              About
            </Link>

            <Link
              href="/skills"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <Braces size={14} />
              Skills
            </Link>

            <Link
              href="/education"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <GraduationCap size={14} />
              Education
            </Link>

            <Link
              href="/experience"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <Briefcase size={14} />
              Experience
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <Laptop size={14} />
              Projects
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <Newspaper size={14} />
              Blog
            </Link>

            <Link
              href="/communeye"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <Eye size={14} />
              Communeye
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 hover:underline cursor-pointer text-sm"
            >
              <Mail size={14} />
              Contact
            </Link>
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wide text-sm">Links</h3>

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
