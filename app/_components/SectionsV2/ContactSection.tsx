"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Code, Mail, Send } from "lucide-react";

// ── ContactSection ─────────────────────────────────────────────────────────────

export const ContactSection = () => {
  const quickLinks = [
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

  return (
    <section className="w-full h-auto px-6 py-20 md:py-28 max-w-5xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.38, delay: 0.05, ease: "easeOut" }}
            className="mb-4 w-fit rounded-xl bg-rose-800 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white select-none sm:text-[11px]"
          >
            Contact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-medium text-slate-900 dark:text-slate-50 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          >
            Let’s create
            <span className="block text-rose-800 dark:text-rose-500">
              something memorable.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base md:text-lg"
          >
            Whether you need a polished product, a fresh idea, or a reliable
            collaborator, I’d love to hear what you’re building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.42, delay: 0.32, ease: "easeOut" }}
            className="mt-7 mb-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="mailto:miguel.bunda@gmail.com"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-rose-800 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-900/20 sm:px-7 sm:py-4 sm:text-xs md:px-8 md:py-4.5"
            >
              <Send
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
              Email me
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700 transition-all duration-300 hover:border-rose-300 hover:text-rose-800 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-rose-800 dark:hover:text-rose-500 sm:px-7 sm:py-4 sm:text-xs md:px-8 md:py-4.5"
            >
              Contact page
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.42, delay: 0.46, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {quickLinks.map(({ label, href, icon: Icon, external }) => {
                const sharedClassName =
                  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100 sm:px-3.5 sm:py-2.5 sm:text-[11px] md:text-xs";

                if (external) {
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={sharedClassName}
                    >
                      <span className="flex w-7 items-center justify-center rounded-md text-slate-600 transition-colors group-hover:text-rose-800 dark:text-slate-300 dark:group-hover:text-rose-500 sm:w-8">
                        <Icon size={15} />
                      </span>
                      {label}
                    </a>
                  );
                }

                return (
                  <Link key={label} href={href} className={sharedClassName}>
                    <span className="flex w-7 items-center justify-center rounded-md text-slate-600 transition-colors group-hover:text-rose-800 dark:text-slate-300 dark:group-hover:text-rose-500 sm:w-8">
                      <Icon size={15} />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
