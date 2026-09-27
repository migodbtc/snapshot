"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectPicture } from "@/lib/constants/projects";

interface ProjectThumbnailButtonProps {
  image: ProjectPicture;
  projectName: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProjectThumbnailButton({
  image,
  projectName,
  index,
  isSelected,
  onSelect,
}: ProjectThumbnailButtonProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ margin: "-30px", once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      onClick={onSelect}
      className={`relative flex-1 aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden bg-neutral-900 border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-rose-500 ring-2 ring-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.25)] opacity-100 scale-[1.02]"
          : "border-white/5 opacity-60 hover:opacity-100 hover:scale-[1.02]"
      }`}
      title={`View preview ${index + 2}`}
    >
      <Image
        src={image.imageRef}
        alt={`${projectName} supporting ${index + 1}`}
        fill
        sizes="(max-width: 1024px) 25vw, 15vw"
        className="object-cover object-top grayscale"
      />
      <div
        className={`absolute inset-0 ${
          isSelected ? "bg-rose-600/30" : "bg-neutral-900/80"
        }`}
      />
    </motion.button>
  );
}
