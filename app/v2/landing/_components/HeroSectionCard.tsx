"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SectionCardData } from "../constants";

interface HeroSectionCardProps {
  card: SectionCardData;
  index: number;
}

export function HeroSectionCard({ card, index }: HeroSectionCardProps) {
  return (
    <motion.a
      href={card.href}
      initial={{ opacity: 0, y: 25, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.2 + index * 0.12,
        ease: "easeOut",
      }}
      className="w-full sm:w-[210px] h-[105px] p-4 rounded-2xl bg-slate-900/15 backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between cursor-pointer select-none"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {card.label}
        </span>
        <ArrowRight className="w-4 h-4 text-rose-400 shrink-0" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white truncate">
          {card.title}
        </h3>
      </div>
    </motion.a>
  );
}
