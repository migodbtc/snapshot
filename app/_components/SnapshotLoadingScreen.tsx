"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SnapshotLoadingScreenProps {
  message?: string;
  className?: string;
}

export function SnapshotLoadingScreen({
  message,
  className = "",
}: SnapshotLoadingScreenProps) {
  return (
    <div
      className={`w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 select-none ${className}`}
    >
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center gap-3 sm:gap-3.5"
      >
        {/* Favicon Icon */}
        <div className="relative shrink-0 flex items-center justify-center">
          <Image
            src="/images/favicons/favicon-32x32.png"
            alt="Snapshot Icon"
            width={38}
            height={38}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
            priority
          />
        </div>

        {/* Title & Subtitle Branding */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 sm:gap-2 leading-none">
            <span className="font-extrabold uppercase tracking-wide text-2xl sm:text-3xl flex items-center">
              <span className="text-slate-100">SNAP</span>
              <span className="text-rose-800">SHOT</span>
            </span>

            <span className="font-mono uppercase text-slate-300 font-semibold text-xs sm:text-sm tracking-wider">
              BY MIGO
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-wider uppercase block font-mono">
              A CAREER-FOCUSED WEBSITE
            </span>
          </div>
        </div>
      </motion.div>

      {/* Optional Subtle Context Message */}
      {message && (
        <p className="mt-6 text-[11px] font-mono text-neutral-600 tracking-widest uppercase">
          {message}
        </p>
      )}
    </div>
  );
}
