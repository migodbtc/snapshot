"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Menu, X, ArrowUpRight } from "lucide-react";

export function V2Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Landing", href: "/", icon: Home },
    { label: "Blog", href: "/blog", icon: BookOpen },
  ];

  return (
    <header className="relative z-30 w-full flex justify-center bg-transparent">
      <nav className="relative w-full flex items-center justify-between px-4 md:px-8 pt-4 h-[10dvh]">
        {/* Left: Ported Logo + Title from original Snapshot design */}
        <Link
          href="/"
          className="flex items-center group cursor-pointer select-none"
        >
          {/* Site Favicon Icon */}
          <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 flex items-center justify-center">
            <Image
              src="/images/favicons/favicon-32x32.png"
              alt="Site Icon"
              width={36}
              height={36}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Title & Subtitle Branding */}
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-extrabold uppercase tracking-wide text-lg sm:text-2xl transition-all duration-300 flex items-center">
                <span className="text-slate-100">SNAP</span>
                <span className="text-rose-800">SHOT</span>
              </span>

              <span className="font-mono uppercase text-slate-300 font-semibold text-xs sm:text-sm tracking-wider">
                BY MIGO
              </span>
            </div>

            {/* Subtitle */}
            <div className="mt-1">
              <span className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-wide uppercase block">
                A Career-focused Website
              </span>
            </div>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links (Landing & Blog) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 sm:gap-2">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive =
              (href === "/" && (pathname === "/" || pathname === "/v2" || pathname === "/v2/landing")) ||
              (href === "/blog" && (pathname?.startsWith("/blog") || pathname?.startsWith("/v2/blog")));

            return (
              <Link
                key={label}
                href={href}
                className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ease-out select-none ${
                  isActive
                    ? "text-white bg-white/10 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:scale-105"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-200 shrink-0 ${
                    isActive ? "text-rose-500" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: CTA Action: Let's Connect button */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/#contact"
            className="flex items-center gap-1.5 font-semibold text-white bg-rose-800 hover:bg-rose-700 rounded-full shadow-[0_0_20px_rgba(159,18,57,0.35)] transition-all hover:scale-[1.02] text-xs sm:text-sm px-5 py-2.5"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 z-50 bg-[#0d121c]/95 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-3 md:hidden">
          <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const isActive =
                (href === "/" && (pathname === "/" || pathname === "/v2" || pathname === "/v2/landing")) ||
                (href === "/blog" && (pathname?.startsWith("/blog") || pathname?.startsWith("/v2/blog")));

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center gap-2.5 text-sm font-medium transition-all duration-200 py-2.5 px-3 rounded-xl ${
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? "text-rose-500" : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center justify-end pt-2">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-white bg-rose-800 hover:bg-rose-700 px-4 py-2 rounded-full shadow-md transition-colors"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
