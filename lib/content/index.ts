// index.ts: Universal (Client & Server safe) Data Access Layer for Snapshot Portfolio content.
// Imports consolidated JSON array collections from content/*.json and validates with Zod 4 schemas.

import projectsData from "@/content/projects.json";
import blogData from "@/content/blog.json";
import skillsData from "@/content/skills.json";
import testimoniesData from "@/content/testimonies.json";
import experienceData from "@/content/experience.json";
import educationData from "@/content/education.json";
import siteConfigData from "@/content/site-config.json";
import aboutData from "@/content/about.json";

import {
  ProjectsArraySchema,
  BlogPostsArraySchema,
  SkillsArraySchema,
  TestimoniesArraySchema,
  ExperienceArraySchema,
  EducationArraySchema,
  SiteConfigSchema,
  AboutContentSchema,
  type Project,
  type BlogPost,
  type SkillSection,
  type SiteConfig,
  type TimelineData,
  type ExperienceItem,
  type EducationItem,
  type AboutContent,
  type TestimonyItem,
} from "./schemas";

/**
 * Returns all portfolio projects validated with Zod and sorted chronologically (newest first).
 */
export function getProjects(): Project[] {
  const parsed = ProjectsArraySchema.parse(projectsData);
  return [...parsed].sort((a, b) => {
    const dateDiff = b.startDate.localeCompare(a.startDate);
    if (dateDiff !== 0) return dateDiff;
    return b.projectId - a.projectId;
  });
}

export function getProjectById(id: number): Project | undefined {
  return getProjects().find((p) => p.projectId === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/**
 * Returns all blog posts validated with Zod, with the intro post first followed by newest posts.
 */
export function getBlogPosts(): BlogPost[] {
  const parsed = BlogPostsArraySchema.parse(blogData);
  return [...parsed].sort((a, b) => {
    if (a.isIntro) return -1;
    if (b.isIntro) return 1;
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });
}

export function getBlogPostById(id: number | string): BlogPost | undefined {
  return getBlogPosts().find((p) => String(p.id) === String(id));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

/**
 * Returns the 4 architectural skill sections from content/skills.json.
 */
export function getSkillSections(): SkillSection[] {
  const parsed = SkillsArraySchema.parse(skillsData);
  return [...parsed].sort((a, b) => a.index.localeCompare(b.index));
}

/**
 * Returns the global site configuration from content/site-config.json.
 */
export function getSiteConfig(): SiteConfig {
  return SiteConfigSchema.parse(siteConfigData);
}

/**
 * Returns professional experience items from content/experience.json.
 */
export function getExperience(): ExperienceItem[] {
  const parsed = ExperienceArraySchema.parse(experienceData);
  return [...parsed].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Returns education history from content/education.json.
 */
export function getEducation(): EducationItem[] {
  const parsed = EducationArraySchema.parse(educationData);
  return [...parsed].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Returns personal about info and stories from content/about.json.
 */
export function getAbout(): AboutContent {
  return AboutContentSchema.parse(aboutData);
}

/**
 * Returns peer testimonies from content/testimonies.json.
 */
export function getTestimonies(): TestimonyItem[] {
  const parsed = TestimoniesArraySchema.parse(testimoniesData);
  return [...parsed].sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id));
}

/**
 * Computes combined timeline data from experience.json and education.json.
 */
export function getTimeline(): TimelineData {
  const experience = getExperience();
  const education = getEducation();
  const eduRecord = education.reduce(
    (acc, item) => {
      if (item.id) acc[item.id] = item;
      return acc;
    },
    {} as Record<string, EducationItem>
  );
  return { experience, education: eduRecord };
}

export * from "./schemas";
export * from "./icons";
