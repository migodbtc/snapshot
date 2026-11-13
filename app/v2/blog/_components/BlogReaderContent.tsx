"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { formatBlogDate, type BlogItem } from "../constants";

interface BlogReaderContentProps {
  post: BlogItem;
}

// Tokenizer for inline markdown formatting
function renderInlineMarkdown(text: string): React.ReactNode {
  // Regex splits text into matching tokens and plain strings
  const tokenRegex =
    /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-white/10 font-mono text-xs sm:text-sm text-rose-300 border border-white/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-400 hover:text-rose-300 underline underline-offset-4 font-medium transition-colors"
        >
          {linkText}
        </a>
      );
    }

    // Bold + Italic: ***text***
    if (part.startsWith("***") && part.endsWith("***") && part.length >= 6) {
      return (
        <strong key={index} className="font-bold italic text-white">
          {part.slice(3, -3)}
        </strong>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Strikethrough: ~~text~~
    if (part.startsWith("~~") && part.endsWith("~~") && part.length >= 4) {
      return (
        <del key={index} className="line-through text-slate-500">
          {part.slice(2, -2)}
        </del>
      );
    }

    return part;
  });
}

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" }
  | { type: "code"; lang: string; code: string }
  | { type: "paragraph"; text: string };

function parseMarkdownBlocks(raw: string): MarkdownBlock[] {
  const lines = raw.split("\n");
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Fenced Code Block: ```lang
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i++; // skip closing fence
      }
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    // Horizontal Rule: ---, ***, ___
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Headings: #, ##, ###, ####
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Blockquote: lines starting with >
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith(">") ||
          (lines[i].trim() === "" &&
            i + 1 < lines.length &&
            lines[i + 1].trim().startsWith(">")))
      ) {
        if (lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        }
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join("\n") });
      continue;
    }

    // Unordered List: -, *, •
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered List: 1., 2., etc.
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraph: collect lines until empty line or next markdown block
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("```") &&
      !/^(\*{3,}|-{3,}|_{3,})$/.test(lines[i].trim()) &&
      !lines[i].match(/^(#{1,6})\s+/) &&
      !lines[i].trim().startsWith(">") &&
      !/^[-*•]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

function CodeSnippet({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-5 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/90 shadow-xl group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
        <span className="text-xs font-mono text-slate-400 select-none">
          {lang || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-rose-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function BlogReaderContent({ post }: BlogReaderContentProps) {
  const { date } = formatBlogDate(post.datetime);
  const blocks = parseMarkdownBlocks(post.excerpt);

  return (
    <div className="w-full h-full flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Post Headline in Reader View */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
            {post.title}
          </h1>

          {/* Divider matching Skills in landing page */}
          <div className="w-full border-b border-white/10" />

          {/* Markdown Content Blocks */}
          <div className="flex flex-col gap-4 pt-2">
            {blocks.map((block, blockIndex) => {
              switch (block.type) {
                case "heading": {
                  if (block.level === 1) {
                    return (
                      <h2
                        key={blockIndex}
                        className="text-2xl sm:text-3xl font-black text-white mt-8 mb-2 border-b border-white/10 pb-3"
                      >
                        {renderInlineMarkdown(block.text)}
                      </h2>
                    );
                  }
                  if (block.level === 2) {
                    return (
                      <h3
                        key={blockIndex}
                        className="text-xl sm:text-2xl font-extrabold text-white mt-7 mb-2"
                      >
                        {renderInlineMarkdown(block.text)}
                      </h3>
                    );
                  }
                  if (block.level === 3) {
                    return (
                      <h4
                        key={blockIndex}
                        className="text-lg sm:text-xl font-bold text-rose-400 mt-6 mb-1"
                      >
                        {renderInlineMarkdown(block.text)}
                      </h4>
                    );
                  }
                  return (
                    <h5
                      key={blockIndex}
                      className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-1"
                    >
                      {renderInlineMarkdown(block.text)}
                    </h5>
                  );
                }

                case "blockquote":
                  return (
                    <blockquote
                      key={blockIndex}
                      className="my-3 border-l-2 border-rose-500 pl-4 py-2.5 bg-rose-500/5 rounded-r-xl italic text-slate-200 text-sm sm:text-base leading-relaxed"
                    >
                      {renderInlineMarkdown(block.text)}
                    </blockquote>
                  );

                case "ul":
                  return (
                    <ul
                      key={blockIndex}
                      className="flex flex-col gap-2.5 my-2 pl-1"
                    >
                      {block.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed"
                        >
                          <span className="text-rose-500 font-bold shrink-0 mt-0.5 select-none">
                            •
                          </span>
                          <span className="flex-1">
                            {renderInlineMarkdown(item)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );

                case "ol":
                  return (
                    <ol
                      key={blockIndex}
                      className="flex flex-col gap-2.5 my-2 pl-1"
                    >
                      {block.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed"
                        >
                          <span className="font-mono text-rose-500 font-semibold shrink-0 text-xs sm:text-sm mt-0.5 select-none">
                            {itemIdx + 1}.
                          </span>
                          <span className="flex-1">
                            {renderInlineMarkdown(item)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  );

                case "hr":
                  return (
                    <hr
                      key={blockIndex}
                      className="my-6 border-t border-white/10"
                    />
                  );

                case "code":
                  return (
                    <CodeSnippet
                      key={blockIndex}
                      code={block.code}
                      lang={block.lang}
                    />
                  );

                case "paragraph":
                default:
                  return (
                    <p
                      key={blockIndex}
                      className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed text-justify sm:text-left"
                    >
                      {renderInlineMarkdown(block.text)}
                    </p>
                  );
              }
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
