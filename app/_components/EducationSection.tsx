// EducationSection: Dedicated section for previewing education. Design is a split type with 

import { EDUCATION_CONSTS } from "@/lib/constants/education";
import { School, ArrowUpRight, Medal } from "lucide-react";
import { useState } from "react";

// card on the left and timeline on the right.
export type EducationKey = keyof typeof EDUCATION_CONSTS;

export const EducationSection = () => {
  const [selectedInstitution, setSelectedInstitution] =
    useState<EducationKey>("college");
  const preview = (({ college }) => ({ college }))(EDUCATION_CONSTS);
  const selected = EDUCATION_CONSTS[selectedInstitution];

  return (
    <section className="flex flex-col w-full overflow-hidden">
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Education
        </h1>
      </div>

      <div className="flex flex-row w-full h-144 items-start justify-center gap-2 pb-4 text-center mx-auto lg:max-w-6xl px-8 text-xs lg:text-base ">

        <div className="flex flex-1 h-full pb-12">
          <div className="flex-1 text-left">
            <div className="flex flex-1 mx-auto max-w-7xl px-6 ">
              <div className="flex-1 h-full ml-4 space-y-12 lg:space-y-12 border-l border-zinc-800 py-[45%]">
                {Object.entries(preview).map(([key, education]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedInstitution(key as EducationKey)}
                    className="rounded-xl cursor-pointer"
                  >
                    <div className="relative pl-10">
                      <div
                        className={`absolute -left-1.25 top-2 size-2.5 rounded-full transition-all ${
                          selectedInstitution === key
                            ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                            : "bg-zinc-700"
                        }`}
                      />

                      <span className="mb-1 block w-full text-left font-mono text-xs text-zinc-500">
                        {education.date_range}
                      </span>

                      <h4 className="flex items-center gap-2 text-left text-sm font-medium lg:text-lg">
                        <School />
                        {education.school_name}
                      </h4>

                      <p className="my-1 text-left text-xs text-zinc-500 lg:text-sm">
                        {education.subtitle}
                      </p>

                      <p className="flex items-center gap-0.5 text-left text-sm leading-relaxed text-zinc-400 hover:underline">
                        View
                        <ArrowUpRight className="h-4 w-4 -translate-y-0.5" />
                      </p>
                    </div>
                  </button>
                ))}
                <button 
                  // onClick={() => setSelectedInstitution("hs2")}
                  className="rounded-xl cursor-pointer"
                >
                  <div className="relative pl-10 h-fit">
                    <div
                      className={`absolute -left-1.25 top-2 size-2.5 rounded-full ${
                        false
                          ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                          : "bg-zinc-700"
                      }`}
                    />
                    <span className="mb-1 rounded-xl bg-rose-500 px-3 py-1 font-semibold text-slate-50 dark:bg-rose-800 select-none hover:underline hover:bg-rose-400 dark:hover:bg-rose-700 cursor-pointer flex flex-row gap-1 text-left text-xs lg:text-sm">
                      See more of my education <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 h-120 px-2 lg:px-4">
          <div className="w-full h-fit max-h-fill relative overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md pt-0 overflow-y-auto [scrollbar:thin] [scrollbar-color:#52525b_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600 hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">

            <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />
            <div className="flex flex-col h-full overflow-y-auto px-6 py-8 lg:px-8 gap-2">
              <span className="rounded-xl bg-rose-500 px-2 py-1 text-sm font-semibold text-slate-50 dark:bg-rose-800 w-fit">
                {selected.badge_content}
              </span>

              <h3 className="text-2xl font-semibold text-left">
                {selected.school_name}
              </h3>

              <p className="italic text-justify text-sm text-gray-800 dark:text-gray-400">
                {selected.address}
              </p>

              <div className="mt-2 grid w-full auto-rows-min grid-cols-1 gap-2 text-left text-xs lg:grid-cols-2 lg:text-sm">
                <div className="col-span-1 font-semibold text-slate-700 dark:text-slate-400 lg:col-span-2">
                  Awards & Honors
                </div>

                {selected.awards_and_honors.map((award) => (
                  <div key={award} className="flex items-center gap-2">
                    <Medal className="h-4 w-4 shrink-0" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-justify text-sm italic text-slate-700 dark:text-slate-300 lg:text-base">
                {selected.personal_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const EducationSectionSmall = () => {
  const [selectedInstitution, setSelectedInstitution] =
  useState<EducationKey | null>(null);
  const preview =
    (({ college }) => ({ college }))(EDUCATION_CONSTS);
  const selected =
    selectedInstitution
      ? EDUCATION_CONSTS[selectedInstitution]
      : null;

  return (<section className="flex flex-col w-full overflow-hidden">
    {/* Header */}
    <div className="flex flex-col px-6 my-4 w-full h-fit items-center justify-center gap-3">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
        Education
      </h1>
    </div>

    {/* Timeline */}
    <div className="mx-auto w-full max-w-2xl px-6">
      <div className="ml-4 border-l border-zinc-800 py-32 space-y-12">
        {Object.entries(preview).map(([key, education]) => (
          <button
            key={key}
            onClick={() => 
              setSelectedInstitution(key as EducationKey)
            }
            className="w-full text-left cursor-pointer group"
          >
            <div className="relative pl-10">

              <div className="
                absolute -left-1.25 top-2
                size-2.5 rounded-full
                bg-zinc-700
                group-hover:bg-rose-500
                transition-colors
              "/>

              <span className="block text-sm text-zinc-500 font-mono mb-1">
                {education.date_range}
              </span>

              <h4 className="flex items-center gap-2 text-lg font-medium">
                <School />
                {education.school_name}
              </h4>

              <p className="text-md text-zinc-500 my-1">
                {education.subtitle}
              </p>

              <p className="flex items-center gap-1 text-md text-zinc-400 hover:underline">
                View
                <ArrowUpRight size={16}/>
              </p>

            </div>
          </button>
        ))}
        <button 
          // onClick={() => setSelectedInstitution("hs2")}
          className="rounded-xl cursor-pointer"
        >
          <div className="relative pl-10 h-fit">
            <div
              className={`absolute -left-1.25 top-2 size-2.5 rounded-full ${
                false
                  ? "bg-rose-500 shadow-[0_0_10px_#e11d48]"
                  : "bg-zinc-700"
              }`}
            />
            <span className="mb-1 rounded-xl bg-rose-500 px-3 py-1 font-semibold text-slate-50 dark:bg-rose-800 select-none hover:underline hover:bg-rose-400 dark:hover:bg-rose-700 cursor-pointer flex flex-row gap-1 text-left text-xs lg:text-sm">
              See more of my education <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
            </span>
          </div>
        </button>
      </div>
    </div>

    {/* Modal */}
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-xs
        transition-opacity duration-300
        ${
          selected
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
      onClick={() => setSelectedInstitution(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative overflow-hidden
          w-[90%] max-w-xl
          max-h-[80vh]
          overflow-y-auto
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50
          dark:bg-slate-950/70
          transition-all duration-300
          ${
            selected
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }
        `}
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        {selected && (
          <div className="m-6 my-8">
            <span className="rounded-xl bg-rose-500 px-2 py-1 text-sm font-semibold text-white w-fit">
              {selected.badge_content}
            </span>

            <h3 className="text-2xl font-semibold mt-3">
              {selected.school_name}
            </h3>

            <p className="italic text-sm text-gray-500">
              {selected.address}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">
                Awards & Honors
              </h4>

              <div className="space-y-2">
                {selected.awards_and_honors.map((award) => (
                  <div
                    key={award}
                    className="flex items-center gap-2"
                  >
                    <Medal size={16}/>
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm italic text-justify">
              {selected.personal_description}
            </p>

            <button
              onClick={() => setSelectedInstitution(null)}
              className="mt-6 w-full rounded-lg bg-rose-800 py-2 text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  </section>)
}