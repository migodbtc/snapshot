"use client";

import {
  Code2,
  User,
  Braces,
  GraduationCap,
  Briefcase,
  BookOpen,
  Eye,
  Mail,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "About", icon: User, href: "/about" },
  { label: "Skills", icon: Braces, href: "/skills" },
  { label: "Education", icon: GraduationCap, href: "/education" },
  { label: "Experience", icon: Briefcase, href: "/experience" },
  { label: "Blog", icon: BookOpen, href: "/blog" },
  { label: "Communeye", icon: Eye, href: "/communeye" },
  { label: "Contact", icon: Mail, href: "/contact" },
];

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // navigation handler
  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="flex flex-row px-4 sm:px-8 py-4 w-full text-rose-800">

      {/* Header Title & Logo */}
      <div className="flex-1 my-auto">
        <span className="font-bold text-lg sm:text-xl uppercase tracking-wide flex flex-row gap-2">
          <span className="text-slate-950 dark:text-slate-50">MIGUEL</span>
          <span className="text-slate-950 dark:text-slate-50 text-lg sm:text-xl">
            <Code2 />
          </span>
          <span>JUSTIN</span>
        </span>
      </div>

      {/* Hamburger Trigger (All Resolutions) */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-rose-800 hover:bg-rose-100 dark:hover:bg-rose-950/30 rounded-md transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Glass Navigation Modal */}
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/50
          backdrop-blur-sm
          transition-opacity duration-300
          ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative overflow-hidden
            w-[90%]
            max-w-md lg:max-w-2xl
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            bg-slate-50/90
            dark:bg-slate-950/70
            p-6 lg:p-8
            transition-all duration-300
            ${
              isMenuOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          {/* Glass base layer */}
          <div className="absolute inset-0 -z-10 bg-radial 
          from-slate-500/20 via-slate-100 to-transparent 
          dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          {/* Modal Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg uppercase tracking-wide flex flex-row gap-2 items-center">
              <span className="text-slate-950 dark:text-slate-50">NAVIGATION</span>
            </span>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="
                p-1.5
                text-slate-700 dark:text-slate-300
                hover:text-rose-800 dark:hover:text-rose-500
                hover:bg-rose-50 dark:hover:bg-rose-950/30
                rounded-md
                transition-colors
                cursor-pointer
              "
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links - Portrait (sm) : single column stacked */}
          <div className="flex flex-col lg:hidden gap-1">
            {NAV_LINKS.map(({ label, icon: Icon, href }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleNavigate(href)}
                className="
                  flex items-center gap-3
                  px-3 py-3
                  rounded-lg
                  border border-slate-300 dark:border-slate-800
                  text-slate-800 dark:text-slate-200
                  hover:bg-rose-50 dark:hover:bg-rose-950/30
                  hover:text-rose-800 dark:hover:text-rose-300
                  hover:border-rose-300 dark:hover:border-rose-800
                  cursor-pointer
                  transition-colors
                  uppercase
                  text-sm
                "
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Nav Links - Landscape (lg) : grid layout */}
          <div className="hidden lg:grid grid-cols-2 gap-2">
            {NAV_LINKS.map(({ label, icon: Icon, href }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleNavigate(href)}
                className="
                  flex items-center gap-3
                  px-4 py-3
                  rounded-lg
                  border border-slate-400/40 dark:border-slate-800
                  text-slate-800 dark:text-slate-200
                  hover:bg-rose-50 dark:hover:bg-rose-950/30
                  hover:text-rose-800 dark:hover:text-rose-300
                  hover:border-rose-300 dark:hover:border-rose-800
                  cursor-pointer
                  transition-colors
                  uppercase
                  text-sm
                "
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}