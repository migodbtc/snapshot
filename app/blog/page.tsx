"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Pencil,
  Search,
  SearchX,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BLOG_POSTS, BlogPostTopic } from "@/lib/constants/blog";
import Link from "next/link";

// formatBlogDate: Splits an ISO datetime into separate date/time strings,
// always rendered in Philippine time (UTC+8) regardless of viewer's locale.
const formatBlogDate = (isoString: string) => {
  const d = new Date(isoString);

  const date = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(d);

  const time = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);

  return { date, time };
};

// isWithinRollingWindow: Dedicated function to check whether the date is within the last
// X days (represented by days), with the constants for the dates in DATE_FILTER_DAYS
const DATE_FILTER_DAYS: Record<string, number> = {
  "This Week": 7,
  "This Month": 30,
  "This Year": 365,
};

const isWithinRollingWindow = (isoString: string, days: number) => {
  const postDate = new Date(isoString).getTime();
  const now = Date.now();
  const windowStart = now - days * 24 * 60 * 60 * 1000;
  return postDate >= windowStart && postDate <= now;
};

// FilterDropdown: Separate subcomponent because HTML dropdowns don't match the overall aesthetic
// of the section/website. Contains search functionality as well.
type FilterDropdownProps = {
  icon: React.ElementType;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  align?: "left" | "right";
};

const FilterDropdown = ({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  allLabel = "All",
  align = "left",
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = value || allLabel;

  return (
    <div ref={containerRef} className="relative flex-1 md:flex-none">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          relative
          overflow-hidden
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50/50
          dark:bg-slate-950/30
          px-4 py-3
          flex items-center gap-2
          cursor-pointer
          hover:border-rose-300 dark:hover:border-rose-800
          transition-colors
        "
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <Icon
          size={16}
          className="text-slate-400 dark:text-slate-500 flex-none"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300 flex-1 truncate">
          {displayValue}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 dark:text-slate-500 flex-none transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Panel — clamped width + edge-aware alignment so it never overflows the viewport */}
      {isOpen && (
        <div
          className={`
            absolute z-30 mt-2
            w-max max-w-[calc(100vw-2rem)]
            min-w-[10rem]
            ${align === "right" ? "right-0" : "left-0"}
            overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            bg-slate-50/90
            dark:bg-slate-950/80
            shadow-lg
          `}
        >
          {/* Search within options */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
            <Search
              size={14}
              className="text-slate-400 dark:text-slate-500 flex-none"
            />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="
                flex-1
                bg-transparent
                outline-none
                text-sm
                text-slate-700 dark:text-slate-300
                placeholder:text-slate-400 dark:placeholder:text-slate-600
              "
            />
          </div>

          {/* Options */}
          <div className="max-h-56 overflow-y-auto py-1">
            <button
              onClick={() => {
                onChange("");
                setIsOpen(false);
                setQuery("");
              }}
              className="
                w-full text-left px-3 py-2
                text-sm
                flex items-center justify-between gap-4
                text-slate-700 dark:text-slate-300
                hover:bg-rose-50/50 dark:hover:bg-rose-950/30
                hover:text-rose-800 dark:hover:text-rose-500
                cursor-pointer
              "
            >
              {allLabel}
              {!value && <Check size={14} />}
            </button>

            {filteredOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                  setQuery("");
                }}
                className="
                  w-full text-left px-3 py-2
                  text-sm
                  flex items-center justify-between gap-4
                  text-slate-700 dark:text-slate-300
                  hover:bg-rose-50/50 dark:hover:bg-rose-950/30
                  hover:text-rose-800 dark:hover:text-rose-500
                  cursor-pointer
                "
              >
                {opt}
                {value === opt && <Check size={14} />}
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <p className="px-3 py-2 text-sm text-slate-400 dark:text-slate-600 italic">
                No matches found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// BlogSearchBar: Search bar component for helping the user search certain posts using the title.
// Also has filters for the date itself and the topic.
type BlogSearchBarProps = {
  searchQuery: string;
  dateFilter: string;
  topicFilter: string;
  availableTopics: string[];
  onSearchChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
  onTopicFilterChange: (value: string) => void;
};

const DATE_FILTER_OPTIONS = ["This Week", "This Month", "This Year"];

const BlogSearchBar = ({
  searchQuery,
  dateFilter,
  topicFilter,
  availableTopics,
  onDateFilterChange,
  onSearchChange,
  onTopicFilterChange,
}: BlogSearchBarProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-3">
      {/* Search card */}
      <div
        className="
          relative
          flex-1
          overflow-hidden
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50/50
          dark:bg-slate-950/30
          px-4 py-3
          flex items-center gap-2
        "
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <Search
          size={18}
          className="text-slate-400 dark:text-slate-500 flex-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search post titles..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-slate-700 dark:text-slate-300
            placeholder:text-slate-400 dark:placeholder:text-slate-600
          "
        />
      </div>

      {/* Filter row — date + topic sit side by side even on sm */}
      <div className="flex flex-row gap-3">
        <FilterDropdown
          icon={Calendar}
          label="Dates"
          allLabel="All Dates"
          options={DATE_FILTER_OPTIONS}
          value={dateFilter}
          onChange={onDateFilterChange}
        />

        <FilterDropdown
          icon={Tag}
          label="Topics"
          allLabel="All Topics"
          options={availableTopics}
          value={topicFilter}
          onChange={onTopicFilterChange}
          align="right"
        />
      </div>
    </div>
  );
};

// BlogCard: A dedicated blog feed card that is inspired by Reddit and contains some of the text of the blog.
// Has a read more functionality to show the entirety of the blog post.
type BlogPost = (typeof BLOG_POSTS)[number];

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { date, time } = formatBlogDate(post.datetime);
  const router = useRouter();

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        bg-slate-50/50
        dark:bg-slate-950/30
        p-5 md:p-6
        flex flex-col gap-3
      "
    >
      <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      {/* Badge */}
      <span className="bg-rose-800 rounded-xl px-2 py-0.5 text-xs font-semibold w-fit text-slate-50 uppercase">
        {post.topic}
      </span>

      {/* Header */}
      <h3 className="font-semibold text-lg md:text-xl text-slate-900 dark:text-slate-100 text-justify flex flex-row gap-1 items-center">
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-md md:text-base text-gray-700 dark:text-gray-400 text-justify line-clamp-4">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex flex-row items-center justify-between mt-2 pt-3 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs md:text-base text-slate-500 dark:text-slate-500 italic">
          {date}, {time} · {post.read_time}
        </span>

        <button
          onClick={() => {
            router.push(`/blog/${post.id - 1}`);
          }}
          className="
            flex items-center gap-1
            text-xs md:text-sm font-semibold
            text-rose-800 dark:text-rose-500
            hover:underline
            cursor-pointer
          "
        >
          More
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// BlogFeed: Dedicated subcomponent for rendering the matched keywords to the blog post titles if any
const BlogFeed = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-center py-12">
        <SearchX size={28} className="text-slate-400 dark:text-slate-600" />
        <p className="text-sm text-slate-400 dark:text-slate-600 italic">
          No posts match your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <BlogCard key={post.title} post={post} />
      ))}
    </>
  );
};

// BlogPage: Main component showing all the things I have written haha
export default function BlogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  const availableTopics = useMemo(() => {
    return Array.from(new Set(BLOG_POSTS.map((post) => post.topic)));
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTopic =
        !topicFilter || post.topic === (topicFilter as BlogPostTopic);
      const matchesDate =
        !dateFilter ||
        isWithinRollingWindow(post.datetime, DATE_FILTER_DAYS[dateFilter]);
      return matchesSearch && matchesTopic && matchesDate;
    }).sort((a, b) => {
      return b.id - a.id;
    });
  }, [searchQuery, topicFilter, dateFilter]);

  return (
    <main className="w-full h-fit flex flex-col items-center pb-8 overflow-x-hidden">
      {/* Unified responsive layout */}
      <section
        className="
        flex-1 flex flex-col
        w-full md:w-2xl lg:w-4xl
        px-8 md:px-0
        pb-4
        "
      >
        {/* Return to Home Option */}
        <Link
          href="/"
          className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase"
        >
          <ArrowLeft size={16} />
          <span>Return to Home</span>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3">
          <h1 className="text-3xl tracking-wider font-bold uppercase mb-2 flex flex-row items-center gap-2">
            <Pencil className="text-3xl text-rose-800" size={32} />
            Blog
          </h1>
        </div>

        {/* Page Description */}
        <p className="text-md text-gray-700 dark:text-gray-400 text-justify w-full mb-2">
          Welcome to my blog! This is a section of the website where I am able
          to post, discuss, and write about various topics in relation to my
          professional career and my research in the software industry. Feel
          free to click any of the posts there to expand and see the full
          article.
        </p>

        <div className="w-full min-h-[100vh] overflow-y-auto space-y-4 mt-4">
          <BlogSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            topicFilter={topicFilter}
            onTopicFilterChange={setTopicFilter}
            availableTopics={availableTopics}
          />

          <BlogFeed posts={filteredPosts} />
        </div>
      </section>
    </main>
  );
}
