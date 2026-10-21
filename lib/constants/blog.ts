import { SORTED_BLOG_POSTS, BlogPostTopic as V2Topic } from "@/app/v2/blog/content";

export const BlogPostTopic = V2Topic;
export type BlogPostTopic = V2Topic;

export type BlogPost = {
  id: number;
  slug?: string;
  title: string;
  datetime: string;
  topic: V2Topic | string;
  read_time: string;
  excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = SORTED_BLOG_POSTS.filter(
  (p) => typeof p.id === "number"
) as BlogPost[];
