"use client";

import { motion } from "framer-motion";
import type { SkillSection } from "../constants";

interface SkillRowProps {
  section: SkillSection;
  index: number;
}

export function SkillRow({ section, index }: SkillRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-40px", once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      className="w-full border-b border-white/10 pb-10 sm:pb-14 pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start group"
    >
      {/* Left: Bracketed Index */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-40px", once: true }}
        transition={{
          duration: 0.45,
          delay: index * 0.06 + 0.04,
          ease: "easeOut",
        }}
        className="md:col-span-2 lg:col-span-2 shrink-0"
      >
        <span className="font-mono text-xs sm:text-sm text-slate-500 group-hover:text-rose-600 transition-colors tracking-wider select-none whitespace-nowrap inline-block">
          [ {section.index} ]
        </span>
      </motion.div>

      {/* Middle: Title & Tagline */}
      <div className="md:col-span-5 lg:col-span-5 flex flex-col">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-40px", once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.06 + 0.08,
            ease: "easeOut",
          }}
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight"
        >
          {section.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-40px", once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.06 + 0.12,
            ease: "easeOut",
          }}
          className="text-md sm:text-lg text-slate-400 my-1.5 sm:my-2"
        >
          {section.subtitle}
        </motion.p>
      </div>

      {/* Right: Detailed Description & Badges */}
      <div className="md:col-span-5 lg:col-span-5 flex flex-col">
        <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
          {section.skills.map(({ name, icon: Icon, color }, bIdx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-40px", once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.06 + 0.16 + bIdx * 0.025,
                ease: "easeOut",
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 text-slate-300 hover:text-white transition-all duration-200 select-none group/badge shadow-sm cursor-default"
            >
              <Icon
                className={`w-5 h-5 ${color} group-hover/badge:scale-110 transition-transform duration-200 shrink-0`}
              />
              <span className="text-sm font-mono tracking-wide">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
