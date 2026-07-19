"use client";

import type { ProjectPicture } from "@/lib/constants/projects";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  GalleryVertical,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryView = "landscape" | "portrait";

type ProjectDocumentationGalleryProps = {
  pictures: ProjectPicture[];
};

export function ProjectDocumentationGallery({
  pictures,
}: ProjectDocumentationGalleryProps) {
  const landscapePictures = pictures.filter(
    (p) => p.orientation === "landscape",
  );
  const portraitPictures = pictures.filter((p) => p.orientation === "portrait");

  const hasLandscape = landscapePictures.length > 0;
  const hasPortrait = portraitPictures.length > 0;

  const [view, setView] = useState<GalleryView>(
    hasLandscape ? "landscape" : "portrait",
  );
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePictures =
    view === "landscape" ? landscapePictures : portraitPictures;
  const isModalOpen = activeIndex !== null;

  // Fade transition when switching between landscape / portrait
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [view]);

  // Keyboard navigation for the modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % activePictures.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + activePictures.length) % activePictures.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, activePictures.length]);

  if (!hasLandscape && !hasPortrait) {
    return (
      <p className="text-sm italic text-slate-600 dark:text-slate-500 select-none">
        No documentation available for this project yet.
      </p>
    );
  }

  const activePicture =
    activeIndex !== null ? activePictures[activeIndex] : null;

  const goNext = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % activePictures.length,
    );
  const goPrev = () =>
    setActiveIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + activePictures.length) % activePictures.length,
    );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Segmented toggle — only show if both orientations exist */}
      {hasLandscape && hasPortrait && (
        <div className="w-fit flex flex-row items-center gap-1 p-1 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 select-none">
          <button
            onClick={() => setView("landscape")}
            className={`flex flex-row items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
              view === "landscape"
                ? "bg-rose-800 text-rose-50"
                : "text-slate-600 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <GalleryHorizontal size={14} />
            Landscape
          </button>
          <button
            onClick={() => setView("portrait")}
            className={`flex flex-row items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
              view === "portrait"
                ? "bg-rose-800 text-rose-50"
                : "text-slate-600 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <GalleryVertical size={14} />
            Portrait
          </button>
        </div>
      )}

      {/* Gallery grid */}
      <div
        className={`w-full grid gap-4 transition-opacity duration-300 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        } ${
          view === "landscape"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        }`}
      >
        {activePictures.map((picture, i) => (
          <button
            key={picture.imageRef}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`
              relative w-full rounded-xl bg-slate-300 dark:bg-slate-800 border border-slate-700
              overflow-hidden cursor-pointer
              transition-transform duration-200 hover:scale-[1.02]
              ${view === "landscape" ? "aspect-video" : "aspect-[3/4]"}
            `}
          >
            <Image
              src={picture.imageRef}
              alt=""
              fill
              className="object-cover bg-slate-300 dark:bg-slate-800"
              sizes={
                view === "landscape"
                  ? "(min-width: 768px) 33vw, 50vw"
                  : "(min-width: 768px) 25vw, 33vw"
              }
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox modal — same glass/blur aesthetic as AppHeader nav modal */}
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/50
          backdrop-blur-sm
          transition-opacity duration-300
          ${isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setActiveIndex(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative overflow-hidden
            w-[90%]
            max-w-3xl lg:max-w-5xl
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            bg-slate-50
            dark:bg-slate-950
            p-4 sm:p-6
            transition-all duration-300
            ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          {/* Glass base layer */}
          <div
            className="absolute inset-0 -z-10 bg-radial 
          from-slate-500/20 via-slate-100 to-transparent 
          dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent"
          />

          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-sm uppercase tracking-wide flex flex-row gap-2 items-center text-slate-950 dark:text-slate-50">
              <Camera size={16} className="text-rose-800" />
              {activeIndex !== null
                ? `${activeIndex + 1} / ${activePictures.length}`
                : ""}
            </span>

            <button
              onClick={() => setActiveIndex(null)}
              className="
                p-1.5
                text-slate-700 dark:text-slate-300
                hover:text-rose-800 dark:hover:text-rose-500
                hover:bg-rose-50 dark:hover:bg-rose-950/30
                rounded-md
                transition-colors
                cursor-pointer
              "
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image + nav arrows */}
          {activePicture && (
            <div className="relative w-full flex items-center justify-center">
              {activePictures.length > 1 && (
                <button
                  onClick={goPrev}
                  className="
          absolute left-0 z-10
          p-2 rounded-full
          bg-slate-50/80 dark:bg-slate-950/80
          border border-slate-300 dark:border-slate-800
          text-slate-700 dark:text-slate-300
          hover:text-rose-800 dark:hover:text-rose-500
          hover:border-rose-300 dark:hover:border-rose-800
          cursor-pointer
          transition-colors
        "
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              <div
                className={`
        relative w-full rounded-lg overflow-hidden
        bg-slate-200 dark:bg-slate-900
        ${
          activePicture.orientation === "landscape"
            ? "aspect-video"
            : "aspect-[3/4] max-w-sm mx-auto"
        }
      `}
              >
                <Image
                  src={activePicture.imageRef}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {activePictures.length > 1 && (
                <button
                  onClick={goNext}
                  className="
          absolute right-0 z-10
          p-2 rounded-full
          bg-slate-50/80 dark:bg-slate-950/80
          border border-slate-300 dark:border-slate-800
          text-slate-700 dark:text-slate-300
          hover:text-rose-800 dark:hover:text-rose-500
          hover:border-rose-300 dark:hover:border-rose-800
          cursor-pointer
          transition-colors
        "
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
