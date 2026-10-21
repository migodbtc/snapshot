// content.ts: Typed blog post collection and helpers derived from content/blog.json.

import blogData from "@/content/blog.json";
import {
  BlogPostsArraySchema,
  calculateReadTime,
  type BlogPost,
} from "@/lib/content/schemas";

export { calculateReadTime };

export enum BlogPostTopic {
  Information = "Information",
  Reflection = "Reflection",
  Industry = "Industry",
  Technical = "Technical",
  Career = "Career",
  Opinion = "Opinion",
  Learning = "Learning",
}

export type BlogItem = BlogPost;

const parsedPosts = BlogPostsArraySchema.parse(blogData);

export const INTRO_POST: BlogItem =
  parsedPosts.find((p) => p.isIntro || p.id === "intro") ?? parsedPosts[0];

export const SORTED_BLOG_POSTS: BlogItem[] = parsedPosts
  .filter((p) => !p.isIntro && p.id !== "intro")
  .sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );

export const ALL_BLOG_ITEMS: BlogItem[] = [INTRO_POST, ...SORTED_BLOG_POSTS];
