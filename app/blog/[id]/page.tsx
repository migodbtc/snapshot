import { BLOG_POSTS } from "@/lib/constants/blog";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Book,
  Calendar,
  Camera,
  Clock,
  Eye,
  GraduationCapIcon,
  Lightbulb,
  Mail,
  Medal,
  Pencil,
  School,
} from "lucide-react";
import Link from "next/link";

type BlogPostPage = {
  params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPage) {
  const { id } = await params;
  const idn = Number(id);
  const selectedPost = BLOG_POSTS[Number(id)];

  return (
    <main className="w-full h-fit flex flex-col items-center pb-8 min-h-[90vh]">
      {/* Unified responsive layout */}
      <section
        className="
        flex-1 flex flex-col
        w-full md:w-2xl lg:w-4xl
        px-8 md:px-0
        pb-16 md:pb-8 lg:pb-16
        "
      >
        {/* Return to Home Option */}
        <Link
          href="/blog"
          className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase"
        >
          <ArrowLeft size={16} />
          <span>Return to Blog</span>
        </Link>

        {/* Page Header */}
        <div className="flex flex-col w-full h-fit gap-3">
          <h1 className="text-xl tracking-wider font-bold uppercase mb-2 flex flex-row items-center gap-2 text-justify">
            {selectedPost.title}
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full mt-2">
          <div className="flex flex-col">
            <b className="text-rose-800 flex flex-row gap-1 items-center">
              <Calendar />
              Date
            </b>
            <span>{new Date(selectedPost.datetime).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col">
            <b className="text-rose-800 flex flex-row gap-1 items-center">
              <Clock />
              Time
            </b>
            <span>
              {new Date(selectedPost.datetime).toTimeString().slice(0, 8)}
            </span>
          </div>
          <div className="flex flex-col">
            <b className="text-rose-800 flex flex-row gap-1 items-center">
              <Book />
              Read Time
            </b>
            <span>{selectedPost.read_time}</span>
          </div>
        </div>

        <hr className="border-slate-300 dark:border-slate-700 my-4" />

        <p className="text-sm md:text-md lg:text-base text-justify w-full whitespace-pre-wrap">
          {selectedPost.excerpt}
        </p>

        <div className="w-full grid-cols-1 md:grid-cols-2 gap-2 mt-8">
          {idn - 1 >= 0 && (
            <Link
              href={`/blog/${idn - 1}`}
              className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase"
            >
              <ArrowLeft size={16} />
              <span>Read Previous Post</span>
            </Link>
          )}

          {idn + 1 < BLOG_POSTS.length && (
            <Link
              href={`/blog/${idn + 1}`}
              className="text-sm italic text-gray-600 dark:text-gray-500 font-semibold my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase text-right justify-end"
            >
              <span>Read Next Post</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
