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

// Divider phrases for the About section
export const aboutDividerPhrases = [
  "Software Engineering",
  "AWS Certified AI Practitioner",
  "Valedictorian '26",
  "Don Bosco Technical College",
  "Full-Stack Developer",
];

// 3 FYI cards for About Me (styled like hero cards)
export interface AboutFyiCardData {
  label: string;
  title: string;
  icon: LucideIcon;
}

export const aboutFyiCards: AboutFyiCardData[] = [
  {
    label: "Education",
    title: "BS Information Technology",
    icon: GraduationCap,
  },
  {
    label: "Academic Honors",
    title: "Valedictorian, Magna Cum Laude",
    icon: Trophy,
  },
  {
    label: "Began Career",
    title: "2022",
    icon: Calendar,
  },
];

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

export const skillSections: SkillSection[] = [
  {
    index: "01",
    title: "Programming & Query Languages",
    subtitle:
      "Core languages for type-safe applications, script automation, and database querying.",
    description:
      "Proficient in type-safe full-stack engineering, asynchronous backend services, and structured query optimization across production and prototype environments.",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
      { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
      { name: "Bash", icon: SiGnubash, color: "text-[#4EAA25]" },
      { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS", icon: SiCss, color: "text-[#1572B6]" },
      { name: "YAML", icon: SiYaml, color: "text-[#CB171E]" },
    ],
  },
  {
    index: "02",
    title: "Frameworks & UI Systems",
    subtitle:
      "Modern client-side and server-side frameworks for reactive, accessible web platforms.",
    description:
      "Building high-performance SSR/SSG applications, modular REST APIs, and responsive design systems with deep emphasis on accessibility and developer velocity.",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "React Native", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Expo", icon: SiExpo, color: "text-white" },
      { name: "Inertia.js", icon: SiInertia, color: "text-[#9553E9]" },
      { name: "Vite", icon: SiVite, color: "text-[#646CFF]" },
      { name: "FastAPI", icon: SiFastapi, color: "text-[#009688]" },
      { name: "Flask", icon: SiFlask, color: "text-white" },
      { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-[#7952B3]" },
    ],
  },
  {
    index: "03",
    title: "Cloud, DevOps & Data Platforms",
    subtitle:
      "Infrastructure-as-Code, containerization, automated CI/CD, and scalable database layers.",
    description:
      "Hands-on experience provisioning Azure App Services and container registries via Bicep, deploying AWS compute instances, and configuring least-privilege PostgreSQL RLS.",
    skills: [
      { name: "Microsoft Azure", icon: TbBrandAzure, color: "text-[#0078D4]" },
      { name: "AWS (EC2)", icon: TbBrandAws, color: "text-[#FF9900]" },
      { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Linux", icon: SiLinux, color: "text-[#FCC624]" },
      { name: "Nginx", icon: SiNginx, color: "text-[#009639]" },
      { name: "Redis", icon: SiRedis, color: "text-[#FF4438]" },
      { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        color: "text-[#2088FF]",
      },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
    ],
  },
  {
    index: "04",
    title: "AI Engineering, Testing & Tools",
    subtitle:
      "Context-aware RAG pipelines, automated test suites, and enterprise auth patterns.",
    description:
      "Certified in foundational and agentic AI concepts on AWS. Experienced architecting vector RAG ingestion pipelines, automated Pytest/Vitest suites, and role-based security.",
    skills: [
      { name: "Google Gemini", icon: SiGooglegemini, color: "text-[#8E75B2]" },
      { name: "LangChain", icon: SiLangchain, color: "text-[#1C3C3C]" },
      { name: "Ollama", icon: SiOllama, color: "text-white" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-[#FF6F00]" },
      { name: "Pytest", icon: SiPytest, color: "text-[#0A9EDC]" },
      { name: "Vitest", icon: SiVitest, color: "text-[#FCC72B]" },
    ],
  },
];

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
      href: `/v2/blog?post=${post.id}`,
      isPlaceholder: false,
    };
  }),
  {
    id: "empty-1",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/v2/blog",
    isPlaceholder: true,
  },
  {
    id: "empty-2",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/v2/blog",
    isPlaceholder: true,
  },
  {
    id: "empty-3",
    tag: "UPCOMING",
    title: "—",
    meta: "Draft in progress",
    image: null,
    href: "/v2/blog",
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

export const testimoniesData: TestimonyItem[] = [
  {
    id: 1,
    title: "Technical Leadership & Client Communication",
    quote:
      "I worked alongside Miguel on a cybersecurity audit project at Don Bosco Technical College, where he stepped up as team lead to direct an interview with the department head. He created a transcript, documented findings, that we used to evaluate security vulnerabilities. His client-facing communication and initiative during discovery assessments kept our audit thorough and grounded in real operational needs. Miguel is a dependable leader who maintains high standards across both technical deliverables and team coordination.",
    author: "Lance Kennedy Nafarrete",
    organization: "Fresh Graduate Data Analyst",
    isPlaceholder: false,
  },
  {
    id: 2,
    title: "—",
    quote: "—",
    author: "—",
    organization: "Pending Endorsement",
    isPlaceholder: true,
  },
  {
    id: 3,
    title: "—",
    quote: "—",
    author: "—",
    organization: "Pending Endorsement",
    isPlaceholder: true,
  },
  {
    id: 4,
    title: "—",
    quote: "—",
    author: "—",
    organization: "Pending Endorsement",
    isPlaceholder: true,
  },
];

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

export const sectionCards: SectionCardData[] = [
  {
    label: "Selected Works",
    title: "Featured Projects",
    href: "#projects",
  },
  {
    label: "Background",
    title: "About Me",
    href: "#about",
  },
  {
    label: "Capabilities",
    title: "Technical Skills",
    href: "#skills",
  },
];
