"use client";

import { NotebookPen, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NoteCardProps = {
  note: string;
};

export function NoteCard({ note }: NoteCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portals need a browser document to attach to — guard for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape key closes the modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!note) return null;

  const modal = (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative overflow-hidden
          w-[90%]
          max-w-md lg:max-w-2xl
          max-h-[80vh]
          flex flex-col
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50
          dark:bg-slate-950
          p-6 lg:p-8
          transition-all duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Glass base layer */}
        <div
          className="absolute inset-0 -z-10 bg-radial 
        from-slate-500/20 via-slate-100 to-transparent 
        dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent"
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4 flex-none">
          <span className="font-bold text-lg uppercase tracking-wide flex flex-row gap-2 items-center">
            <NotebookPen size={18} className="text-rose-800" />
            <span className="text-slate-950 dark:text-slate-50">
              Personal Note
            </span>
          </span>

          <button
            onClick={() => setIsOpen(false)}
            className="
              p-1.5
              text-slate-700 dark:text-slate-300
              hover:text-rose-800 dark:hover:text-rose-500
              hover:bg-rose-50 dark:hover:bg-rose-950/30
              rounded-md
              transition-colors
              cursor-pointer
            "
            aria-label="Close note"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable note content */}
        <div className="overflow-y-auto">
          <p className="text-justify whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-400">
            {note}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Compact preview card — same truncated treatment at every breakpoint */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative w-full flex flex-col rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md text-slate-700 dark:text-slate-300 text-sm overflow-hidden text-left cursor-pointer transition hover:scale-[1.02]"
      >
        {/* Glow — matches ProjectSnippetCard */}
        <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <div className="flex flex-col gap-3 p-4">
          {/* Header */}
          <h2 className="flex flex-row items-center gap-2 font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-slate-100">
            <NotebookPen size={16} className="text-rose-800" />
            Personal Note
          </h2>

          {/* Always-truncated preview */}
          <div className="relative overflow-hidden max-h-24">
            <p className="text-justify whitespace-pre-wrap text-gray-700 dark:text-gray-400">
              {note}
            </p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
          </div>

          {/* Read prompt */}
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Click to read full note
          </span>
        </div>
      </button>

      {/* Portal the modal to document.body to escape any ancestor stacking contexts */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
