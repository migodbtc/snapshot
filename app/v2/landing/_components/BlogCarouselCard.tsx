"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogCarouselItem } from "../constants";

interface BlogCarouselCardProps {
  post: BlogCarouselItem;
}

export function BlogCarouselCard({ post }: BlogCarouselCardProps) {
  return (
    <Link
      href={post.href}
      className="group relative w-[280px] sm:w-[320px] md:w-[350px] h-[400px] sm:h-[440px] rounded-3xl overflow-hidden shrink-0 border border-white/10 hover:border-white/25 shadow-2xl shadow-black/60 hover:shadow-black/90 transition-all duration-300 hover:scale-[1.02] bg-neutral-900 cursor-pointer block"
    >
      {/* Visual Background: Image or Dark Placeholder */}
      {post.image ? (
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 280px, 350px"
            className="object-cover object-center grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 brightness-90"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-neutral-900 flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.06),transparent_70%)]" />
          <div className="absolute top-6 right-6 font-mono text-[10px] text-slate-600 uppercase tracking-widest select-none">
            [ — ]
          </div>
        </div>
      )}

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

      {/* Bottom Content: Category Tag, Title, and Meta */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 flex flex-col justify-end text-left z-10 pointer-events-auto">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
            {post.tag}
          </span>
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-200 leading-snug mt-2 line-clamp-2 group-hover:text-white transition-colors duration-200">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-2.5 font-mono text-xs text-slate-400">
          <span>{post.meta}</span>
        </div>
      </div>
    </Link>
  );
}
