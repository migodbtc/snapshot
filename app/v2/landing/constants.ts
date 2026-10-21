import {
  GraduationCap,
  Trophy,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiYaml,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiVite,
  SiFlask,
  SiFastapi,
  SiLaravel,
  SiInertia,
  SiTailwindcss,
  SiBootstrap,
  SiDocker,
  SiLinux,
  SiNginx,
  SiRedis,
  SiGithubactions,
  SiVercel,
  SiGit,
  SiSupabase,
  SiPytest,
  SiVitest,
  SiLangchain,
  SiTensorflow,
  SiGooglegemini,
  SiOllama,
} from "react-icons/si";
import { TbBrandAzure, TbBrandAws } from "react-icons/tb";
import type { IconType } from "react-icons";
import { PROJECT_INDEX } from "@/lib/constants/projects";
import { SORTED_BLOG_POSTS } from "@/app/v2/blog/content";
import siteConfig from "@/content/site-config.json";
import skillsJson from "@/content/skills.json";
import testimoniesJson from "@/content/testimonies.json";

// Divider phrases for the About section (from centralized content/site-config.json)
export const aboutDividerPhrases: string[] = siteConfig.aboutDividerPhrases;

// 3 FYI cards for About Me (styled like hero cards)
export interface AboutFyiCardData {
  label: string;
  title: string;
  icon: LucideIcon;
}

const fyiIconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Trophy,
  Calendar,
};

export const aboutFyiCards: AboutFyiCardData[] = siteConfig.aboutFyiCards.map((card) => ({
  label: card.label,
  title: card.title,
  icon: fyiIconMap[card.iconKey] || Trophy,
}));

// Detailed Skills structured into 4 architectural rows
export interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}

export interface SkillSection {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  skills: SkillItem[];
}

const iconMap: Record<string, IconType> = {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiYaml,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiVite,
  SiFlask,
  SiFastapi,
  SiLaravel,
  SiInertia,
  SiTailwindcss,
  SiBootstrap,
  SiDocker,
  SiLinux,
  SiNginx,
  SiRedis,
  SiGithubactions,
  SiVercel,
  SiGit,
  SiSupabase,
  SiPytest,
  SiVitest,
  SiLangchain,
  SiTensorflow,
  SiGooglegemini,
  SiOllama,
  TbBrandAzure,
  TbBrandAws,
};

export const skillSections: SkillSection[] = (skillsJson as Array<{
  index: string;
  title: string;
  subtitle: string;
  description: string;
  skills: Array<{ name: string; iconKey: string; color: string }>;
}>).map((sec) => ({
  ...sec,
  skills: sec.skills.map((s) => ({
    name: s.name,
    icon: iconMap[s.iconKey] || SiReact,
    color: s.color,
  })),
}));

// Blog items for the rotating carousel gallery (real posts + symbolic empty placeholders)
export interface BlogCarouselItem {
  id: string | number;
  tag: string;
  title: string;
  meta: string;
  image: string | null;
  href: string;
  isPlaceholder: boolean;
}

// Stock images for blog carousel cards
const blogStockImages: Record<number, string> = {
  5: "/images/about_stock_images/stock_1.jpg",
  4: "/images/about_stock_images/stock_2.jpg",
  3: "/images/about_stock_images/stock_3.jpg",
  2: "/images/about_stock_images/stock_4.jpg",
  1: "/images/about_stock_images/stock_5.jpg",
};

export const blogCarouselItems: BlogCarouselItem[] = [
  ...SORTED_BLOG_POSTS.map((post) => {
    const year = new Date(post.datetime).getFullYear();
    const idNum = typeof post.id === "number" ? post.id : 1;
    const image =
      blogStockImages[idNum] ||
      `/images/about_stock_images/stock_${((idNum - 1) % 5) + 1}.jpg`;

    return {
      id: post.id,
      tag: post.topic.toUpperCase(),
      title: post.title,
      meta: `${post.read_time} · ${year}`,
      image,
      href: `/blog?post=${post.id}`,
      isPlaceholder: false,
    };
  }),
  {
    id: "empty-1",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/blog",
    isPlaceholder: true,
  },
  {
    id: "empty-2",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/blog",
    isPlaceholder: true,
  },
  {
    id: "empty-3",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/blog",
    isPlaceholder: true,
  },
];

// Testimonies data for the 2-row squares layout
export interface TestimonyItem {
  id: number;
  title: string;
  quote: string;
  author: string;
  organization: string;
  isPlaceholder: boolean;
}

export const testimoniesData: TestimonyItem[] = testimoniesJson;

// Sort projects from latest to oldest
export const sortedProjects = [...PROJECT_INDEX].sort((a, b) => {
  const dateDiff = b.startDate.localeCompare(a.startDate);
  if (dateDiff !== 0) return dateDiff;
  return b.projectId - a.projectId;
});

// Identify the latest project ID for each year to hold the year number
export const latestProjectIdsByYear = new Set<number>();
const seenYears = new Set<string>();
for (const proj of sortedProjects) {
  const year = proj.startDate ? proj.startDate.slice(0, 4) : "";
  if (year && !seenYears.has(year)) {
    seenYears.add(year);
    latestProjectIdsByYear.add(proj.projectId);
  }
}

// Section quick navigation cards for the Hero section
export interface SectionCardData {
  label: string;
  title: string;
  href: string;
}

export const sectionCards: SectionCardData[] = siteConfig.sectionCards;
