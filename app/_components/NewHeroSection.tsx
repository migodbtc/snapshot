import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Mail,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS } from "./AppHeader";

// NewHeroSection: Hero Section Version 2.0
export const NewHeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Scroll animations
  const { scrollY } = useScroll();
  const fadeOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const fadeY = useTransform(scrollY, [0, 400], [0, 100]);

  // navigation handler
  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  return (
    <section
      className="
    relative
    flex flex-col 
    w-full h-dvh 
    overflow-hidden 
    mx-auto text-center"
    >
      {/* Background image layer — grayscaled */}
      <div
        className="
        absolute inset-0
        bg-[url('/newheroimage.jpg')] bg-cover bg-top
        grayscale
        backdrop-blur-2xl
        "
      ></div>

      {/* Tint overlay */}
      <div className="absolute inset-0 bg-slate-50/45 dark:bg-slate-950/45"></div>

      {/* Foreground layer — NOT grayscaled */}
      <div
        className="
        absolute inset-0
        bg-[url('/newheroimage_layer.png')]
        bg-cover bg-top
        "
      ></div>

      {/* Gradient overlay — direction flips at xl (1280px+) to avoid iPad Pro portrait bug */}
      <div
        className="
        absolute inset-0
        bg-linear-to-b from-transparent dark:to-black/85
        xl:bg-linear-to-l xl:from-transparent to-slate-50/75 dark:xl:to-black/85
        to-45% xl:to-100%
        "
      ></div>

      {/* Header Content */}
      <div className="absolute inset-0 z-40 w-full h-full py-4 px-8 text-white text-left pointer-events-none">
        <div className="w-full py-4 flex flex-row justify-between pointer-events-auto">
          <Link href="/" className="flex-1 my-auto cursor-pointer">
            <div className="flex flex-col select-none">
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
              <span className="text-xs text-gray-700 dark:text-gray-400  uppercase tracking-wide font-semibold">
                A Career-focused Website
              </span>
            </div>
          </Link>
          {/* Hamburger Trigger (All Resolutions) */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-rose-800 dark:text-slate-50 hover:bg-gray-100/25 dark:hover:bg-gray-800/25 rounded-md transition-colors cursor-pointer"
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
            bg-slate-50
            dark:bg-slate-950
            p-6 lg:p-8
            transition-all duration-300
            ${isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
            >
              {/* Glass base layer */}
              <div
                className="absolute inset-0 -z-10 bg-radial 
          from-slate-500/20 via-slate-100 to-transparent 
          dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent"
              />

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg uppercase tracking-wide flex flex-row gap-2 items-center">
                  <span className="text-slate-950 dark:text-slate-50">
                    NAVIGATION
                  </span>
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
      </div>

      {/* Content layer — always centered with Framer Motion animations */}
      <motion.div
        style={{ opacity: fadeOpacity, y: fadeY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-30 h-full w-full flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl">
          {/* Logo icon */}
          <Image
            src="/images/favicons/favicon-32x32.png"
            alt="Site Icon"
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
          />

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-medium text-slate-900 dark:text-slate-50 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            Hi! My name is <b className="text-rose-700 drop-shadow-[0_2px_8px_rgba(159,18,57,0.6)]">Migo</b>.
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-900 dark:text-slate-100 leading-relaxed drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
            I am an up and coming software engineer with a passion for building
            human-first digital solutions, collaboration and sharing of
            technical knowledge and experience, and a willingness to learn and
            adapt to what is necessary.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-1">
            <a
              href="https://www.linkedin.com/in/migueljustin"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <button
                className="
                  w-full sm:w-52 md:w-60 lg:w-64
                  flex items-center justify-center gap-2
                  py-2.5 px-4
                  rounded-lg
                  bg-rose-800 hover:bg-rose-700 hover:scale-105
                  disabled:opacity-60 disabled:cursor-not-allowed
                  text-slate-50
                  text-sm md:text-base
                  font-semibold
                  cursor-pointer
                  transition-all duration-300
                "
              >
                <Briefcase size={18} />
                Chat Me on LinkedIn!
                <ArrowRight size={18} />
              </button>
            </a>
            <Link
              href="/contact"
              className="
                w-full sm:w-36 md:w-40 lg:w-44
                flex flex-row gap-2 items-center justify-center
                py-2.5 px-6
                rounded-lg
                bg-slate-50 hover:bg-slate-200 hover:scale-105
                cursor-pointer
                text-slate-900
                text-sm md:text-base
                font-semibold
                transition-all duration-300
              "
            >
              <Mail size={18} />
              Contact
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={32} className="text-slate-50" />
      </div>
    </section>
  );
};
