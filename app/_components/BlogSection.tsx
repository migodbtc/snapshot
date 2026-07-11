// BlogSection: The section to contain blog posts regarding my professional career or progress

import { BLOG_POSTS } from "@/lib/constants/blog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// I.e. if I earned a new certification, etc
type BlogCardProps = {
  title: string;
  date: string;
  excerpt: string;
  href?: string;
  className?: string;
};

const BlogCard = ({
  title,
  date,
  excerpt,
  href,
  className = "",
}: BlogCardProps) => {
  return (
    <div
      className={`
        aspect-square
        relative
        overflow-hidden
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        overflow-y-auto

        [scrollbar:thin]
        [scrollbar-color:#52525b_transparent]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-600
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500

        ${className}
      `}
    >
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      <div className="flex flex-col h-full overflow-y-auto p-4 lg:p-6 gap-2">
        <h3 className="text-lg md:text-2xl lg:text-xl font-semibold text-justify">
          {title}
        </h3>

        <span className="rounded-xl bg-rose-800 px-2 py-1 text-xs font-semibold text-slate-50 w-fit">
          {date}
        </span>

        {/* Paragraph Content */}
        <p
          className="
        flex-1
        overflow-hidden
        md:mt-2 text-justify 
        text-sm md:text-lg lg:text-base 
        italic text-slate-700 dark:text-slate-300
        "
        >
          {excerpt + "..."}
        </p>

        {/* Gradient Mask */}
        <div
          className="
            pointer-events-none
            absolute bottom-0 left-0 right-0
            h-8
            bg-linear-to-t
            from-slate-50 dark:from-slate-950
            to-transparent
          "
        />

        <div className="flex h-fit items-end justify-end pt-4">
          <a
            href={href}
            className="w-fit text-sm lg:text-md text-slate-700 dark:text-slate-300 cursor-pointer hover:underline flex flex-row items-start"
          >
            Read more
            <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const BlogSection = () => {
  return (
    <section className="flex flex-col w-full h-fit overflow-hidden lg:mx-auto ">
      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center mt-12">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
          Blog
        </h1>
      </div>

      {/* Body */}
      <div className="hidden lg:flex flex-1 gap-4 py-4 items-center justify-center mb-12">
        {/* Dynamic Rendering */}
        {BLOG_POSTS.map((post) => (
          <BlogCard
            key={post.title}
            date={post.datetime}
            {...post}
            className="w-2/7"
          />
        ))}
      </div>

      {/* Body - Medium/Tablet Resolutions */}
      <div className="hidden sm:flex lg:hidden flex-1 gap-4 py-4 px-8 items-center justify-center mb-12">
        <div className="hidden sm:flex lg:hidden gap-4 py-4 px-8 justify-center mb-12">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <BlogCard
              key={post.title}
              date={post.datetime}
              {...post}
              className="flex-1"
            />
          ))}
        </div>
      </div>

      {/* Footer/Hyperlink */}
      <div className="w-full mb-8 text-center text-base text-gray-800/90 dark:text-slate-50/90">
        Read all of my other blog posts{" "}
        <Link
          href="/blog"
          className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer"
        >
          using this link right here
          <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
};

export const BlogSectionSmall = () => {
  return (
    <section className="flex flex-col h-fit overflow-hidden mx-4 mb-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mt-12 mb-6">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
          Blog
        </h1>
      </div>

      {/* Cards */}
      <div className="flex flex-col items-center gap-4">
        {BLOG_POSTS.map((post) => (
          <BlogCard
            key={post.title}
            date={post.datetime}
            {...post}
            className="
              w-80
              mx-auto
              min-h-48
              aspect-square
            "
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-800/90 dark:text-slate-50/90">
        Read all of my other blog posts{" "}
        <Link
          href="/blog"
          className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer"
        >
          using this link right here
          <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
};
