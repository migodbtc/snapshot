"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SectionCardData } from "../constants";

interface HeroSectionCardProps {
  card: SectionCardData;
  index: number;
}

export function HeroSectionCard({ card, index }: HeroSectionCardProps) {
  return (
    <Link href={card.href} className="w-full min-w-0 block">
      <motion.div
        initial={{ opacity: 0, y: 25, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.2 + index * 0.12,
          ease: "easeOut",
        }}
        className="w-full min-w-0 h-[88px] sm:h-[100px] lg:h-[105px] p-3 sm:p-4 rounded-2xl bg-slate-900/35 hover:bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-white/20 flex flex-col justify-between cursor-pointer select-none border border-white/10 group shadow-lg"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors truncate pr-1">
            {card.label}
          </span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-rose-100 transition-colors truncate">
            {card.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
