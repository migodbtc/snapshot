// schemas.ts: Centralized Zod 4 validation schemas for Snapshot Portfolio's JSON content layer.
// Enforces strict structural and type contracts across all 8 files in content/*.json.

import { z } from "zod";

export const ProjectPictureSchema = z.object({
  imageRef: z.string(),
  orientation: z.enum(["portrait", "landscape"]),
  thumbnail: z.boolean(),
});

export const ProjectSchema = z.object({
  projectId: z.number(),
  slug: z.string(),
  projectName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  currentlyWorking: z.boolean(),
  skills: z.array(z.string()),
  imageRefs: z.array(ProjectPictureSchema),
  description: z.string(),
  note: z.string(),
  associatedWith: z.array(z.string()),
});

export const ProjectsArraySchema = z.array(ProjectSchema);

export const BlogPostSchema = z.object({
  id: z.union([z.number(), z.literal("intro")]),
  slug: z.string(),
  title: z.string(),
  datetime: z.string(),
  topic: z.string(),
  read_time: z.string(),
  excerpt: z.string(),
  isIntro: z.boolean().default(false),
});

export const BlogPostsArraySchema = z.array(BlogPostSchema);

export const SkillItemSchema = z.object({
  name: z.string(),
  iconKey: z.string(),
  color: z.string(),
});

export const SkillSectionSchema = z.object({
  index: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  skills: z.array(SkillItemSchema),
});

export const SkillsArraySchema = z.array(SkillSectionSchema);

export const TestimonyItemSchema = z.object({
  id: z.number(),
  order: z.number().optional(),
  title: z.string(),
  quote: z.string(),
  author: z.string(),
  organization: z.string(),
  isPlaceholder: z.boolean(),
});

export const TestimoniesArraySchema = z.array(TestimonyItemSchema);

export const SiteConfigSchema = z.object({
  profile: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string(),
    location: z.string(),
    email: z.string(),
    avatar: z.string(),
    statusText: z.string(),
  }),
  socialLinks: z.object({
    github: z.string(),
    linkedin: z.string(),
    facebook: z.string(),
    communeye: z.string(),
  }),
  aboutDividerPhrases: z.array(z.string()),
  aboutFyiCards: z.array(
    z.object({
      label: z.string(),
      title: z.string(),
      iconKey: z.string(),
    })
  ),
  testimonies: z.array(TestimonyItemSchema).optional(),
  sectionCards: z.array(
    z.object({
      label: z.string(),
      title: z.string(),
      href: z.string(),
    })
  ),
});

export const TimelineItemSchema = z.object({
  role: z.string(),
  company_name: z.string(),
  shortened_date: z.string(),
  start_date: z.string(),
  finish_date: z.string(),
  technologies: z.array(z.string()),
  achievements: z.array(z.string()),
  images: z.array(z.string()),
  summary: z.string(),
});

export const ExperienceItemSchema = TimelineItemSchema.extend({
  id: z.string().optional(),
  order: z.number().optional(),
});

export const ExperienceArraySchema = z.array(ExperienceItemSchema);

export const EducationItemSchema = z.object({
  id: z.string(),
  order: z.number().optional(),
  badge_content: z.string(),
  school_name: z.string(),
  date_range: z.string(),
  subtitle: z.string(),
  address: z.string(),
  awards_and_honors: z.array(z.string()),
  personal_description: z.string(),
});

export const EducationArraySchema = z.array(EducationItemSchema);

export const TimelineDataSchema = z.object({
  experience: z.array(TimelineItemSchema),
  education: z.record(z.string(), EducationItemSchema),
});

export const AboutContentSchema = z.object({
  quickFacts: z.array(
    z.object({
      iconKey: z.string(),
      title: z.string(),
      value: z.string(),
    })
  ),
  stories: z.array(
    z.object({
      id: z.number(),
      label: z.string(),
      image: z.string(),
      credit: z.string(),
      description: z.string(),
    })
  ),
});

export function calculateReadTime(text: string, wordsPerMinute = 200): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectPicture = z.infer<typeof ProjectPictureSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type SkillSection = z.infer<typeof SkillSectionSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type TimelineData = z.infer<typeof TimelineDataSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type AboutContent = z.infer<typeof AboutContentSchema>;
export type TestimonyItem = z.infer<typeof TestimonyItemSchema>;
