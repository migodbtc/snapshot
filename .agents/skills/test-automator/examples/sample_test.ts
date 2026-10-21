// sample_test.ts: Reference pattern for validating Snapshot Portfolio Zod content schemas.
import { ProjectSchema, BlogPostSchema } from "@/lib/content/schemas";

export function validateSampleProject() {
  const sample = {
    projectId: 11,
    slug: "snapshot",
    projectName: "Snapshot",
    startDate: "2026-01",
    endDate: "Present",
    currentlyWorking: true,
    skills: ["Next.js", "TypeScript", "Tailwind CSS"],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_hero.png",
        orientation: "landscape" as const,
        thumbnail: true,
      },
    ],
    description: "Personal software engineering portfolio and Git-backed CMS.",
    note: "Built with Next.js 16 and React 19.",
    associatedWith: ["Personal Project"],
  };

  const parsed = ProjectSchema.safeParse(sample);
  if (!parsed.success) {
    throw new Error(`Schema validation failed: ${parsed.error.message}`);
  }
  return parsed.data;
}

export function validateSampleBlogPost() {
  const sample = {
    id: 1,
    slug: "sample-post",
    title: "Sample Post",
    datetime: "2026-05-01T00:00:00Z",
    topic: "Software Engineering",
    read_time: "5 min read",
    excerpt: "Reflections on building scalable systems.",
    isIntro: false,
  };

  return BlogPostSchema.parse(sample);
}
