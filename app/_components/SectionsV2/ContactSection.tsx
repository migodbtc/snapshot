"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Code, Mail, Send } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  {
    label: "Email",
    href: "mailto:miguel.bunda@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/miguel-bunda-938810283/",
    icon: Briefcase,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/migodbtc",
    icon: Code,
    external: true,
  },
];

// ── ContactSection ─────────────────────────────────────────────────────────────

export const ContactSection = () => {
  return (
    <section className="w-full h-auto px-6 py-16 md:py-24 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-stretch gap-10 md:gap-12">
        {/* ── Left Column: CTA content ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left gap-5 md:flex-1"
        >
          {/* Badge */}
          <span
            className="
              w-fit px-3 py-1 rounded-xl
              bg-rose-800 text-white
              text-xs font-bold tracking-widest uppercase select-none
            "
          >
            Contact
          </span>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-900 dark:text-slate-50 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
            Let's create
            <span className="block text-rose-800 dark:text-rose-500">
              something memorable.
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-lg">
            Whether you need a polished product, a fresh idea, or a reliable
            collaborator, I'd love to hear what you're building.
          </p>

          {/* Primary + secondary buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            <a
              href="mailto:miguel.bunda@gmail.com"
              className="
                group inline-flex items-center gap-2.5
                rounded-xl bg-rose-800 px-6 py-3.5
                text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-white
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-rose-700
                hover:shadow-lg hover:shadow-rose-900/20
              "
            >
              <Send
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
              Email me
            </a>

            <Link
              href="/contact"
              className="
                inline-flex items-center gap-2.5
                rounded-xl border border-slate-300 dark:border-slate-700
                bg-white/80 dark:bg-slate-900/80
                px-6 py-3.5
                text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em]
                text-slate-700 dark:text-slate-200
                transition-all duration-300
                hover:border-slate-400 dark:hover:border-slate-600
                hover:bg-slate-100 dark:hover:bg-slate-800
                hover:text-slate-900 dark:hover:text-slate-50
              "
            >
              Contact page
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick links row — separated by thin vertical dividers */}
          <div className="flex items-center justify-center md:justify-start divide-x divide-slate-200 dark:divide-slate-800 pt-2">
            {QUICK_LINKS.map(({ label, href, icon: Icon, external }) => {
              const cls =
                "group inline-flex items-center gap-2 px-4 first:pl-0 last:pr-0 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 hover:text-rose-800 dark:hover:text-rose-500 transition-colors";

              return external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ) : (
                <a key={label} href={href} className={cls}>
                  <Icon size={14} />
                  {label}
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* ── Right Column: Image with glow ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="md:flex-1 flex items-center justify-center relative"
        >
          {/* Ambient glow behind image */}
          <div
            className="
              absolute -inset-6 rounded-2xl
              bg-radial from-rose-400/20 via-slate-300/15 to-transparent
              dark:from-rose-500/15 dark:via-slate-500/10 dark:to-transparent
              blur-2xl
            "
          />

          {/* Image container — aspect-4/3 on mobile, stretches to left col height on md+ */}
          <div className="relative w-full aspect-4/3 md:aspect-auto md:h-full min-h-48 rounded-xl overflow-hidden">
            <Image
              src="/images/apollo-demo.jpg"
              alt="Apollo project demo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Bottom gradient bleed into page background */}
            <div className="absolute inset-0 bg-linear-to-t from-white/60 dark:from-slate-950/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
