// EducationSection: Dedicated section for previewing education. Design is a split type with 

import { EDUCATION_CONSTS } from "@/lib/constants/education";
import { School, ArrowUpRight, Medal, School2, ArrowRight, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// card on the left and timeline on the right.
export type EducationKey = keyof typeof EDUCATION_CONSTS;

export const EducationSection = () => {
  const [selectedInstitution, setSelectedInstitution] =
    useState<EducationKey>("college");
  const preview = (({ college, shs }) => ({ college, shs }))(EDUCATION_CONSTS);
  const selected = EDUCATION_CONSTS[selectedInstitution];

  const router = useRouter();

  return (
    <section className="flex flex-col w-full overflow-hidden min-h-144 align-middle justify-center px-8">
      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">
          Education
        </h1>
      </div>

      {/* Preview Card Layout*/}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {Object.entries(preview).map(([key, education]) => {
          return <div
            key={key}
            className="
              relative
              md:h-fit lg:aspect-4/3
              overflow-hidden
              rounded-xl
              border border-slate-300
              dark:border-slate-800
              backdrop-blur-md
              bg-slate-50/50
              dark:bg-slate-950/30
              p-6
              flex flex-col justify-center
              gap-2
            "
          >
            <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

            <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 flex flex-row gap-2 items-center">
              <School2 size={22} className="text-rose-800"/>
              {education.school_name}
            </h3>
            <span className="bg-rose-800 rounded-xl px-2 py-0.5 text-xs font-semibold w-fit text-slate-50">{education.badge_content}</span>
            <p className="text-base text-gray-700 dark:text-gray-400 flex-1 overflow-hidden text-justify">
              {education.personal_description}
            </p>
          </div>
        })}

        {/* Card 3 — "View More" */}
        <div
          onClick={() => {
            router.push('/education')
          }}
          className="
            relative
            md:h-fit lg:aspect-4/3
            overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            bg-slate-50/50
            dark:bg-slate-950/30
            p-4
            flex flex-col justify-center
            gap-1
            cursor-pointer
            transition-colors
            hover:bg-rose-50/50
            hover:text-rose-800
            dark:hover:text-rose-500
            dark:hover:bg-rose-950/30
            hover:border-rose-300
            dark:hover:border-rose-800
          "
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          <h3 className="font-semibold text-xl flex flex-row gap-2 items-center">
            View More
            <ArrowRight size={22} />
          </h3>
          <p className="text-md">
            Explore my full academic timeline and achievements
          </p>
        </div>
      </div>
    </section>
  )
}

export const EducationSectionSmall = () => {
  const preview = (({ college, shs }) => ({ college, shs  }))(EDUCATION_CONSTS);
  const router = useRouter();

  return (
    <section className="flex flex-col w-full overflow-hidden min-h-fit align-middle justify-center px-6">
      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3">
        <h1 className="text-2xl tracking-wider font-bold uppercase text-slate-400">
          Education
        </h1>
      </div>

      {/* Preview Card Layout — single column, sm-first */}
      <div className="w-full grid grid-cols-1 gap-4 mt-4">
        {Object.entries(preview).map(([key, education]) => {
          return <div
            key={key}
            className="
              relative
              h-fit
              overflow-hidden
              rounded-xl
              border border-slate-300
              dark:border-slate-800
              backdrop-blur-md
              bg-slate-50/50
              dark:bg-slate-950/30
              p-6
              flex flex-col justify-center
              gap-2
            "
          >
            <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

            <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 flex flex-row gap-2 items-center">
              <School2 size={22} className="text-rose-800"/>
              {education.school_name}
            </h3>
            <span className="bg-rose-800 rounded-xl px-2 py-0.5 text-xs font-semibold w-fit text-slate-50">{education.badge_content}</span>
            <p className="text-base text-gray-700 dark:text-gray-400 flex-1 overflow-hidden text-justify">
              {education.personal_description}
            </p>
          </div>
        })}

        {/* "View More" card */}
        <div
          onClick={() => {
            router.push('/education')
          }}
          className="
            relative
            h-fit
            overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            backdrop-blur-md
            bg-slate-50/50
            dark:bg-slate-950/30
            p-4
            flex flex-col justify-center
            gap-1
            cursor-pointer
            transition-colors
            hover:bg-rose-50/50
            hover:text-rose-800
            dark:hover:text-rose-500
            dark:hover:bg-rose-950/30
            hover:border-rose-300
            dark:hover:border-rose-800
          "
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          <h3 className="font-semibold text-xl flex flex-row gap-2 items-center">
            View More
            <ArrowRight size={22} />
          </h3>
          <p className="text-md ">
            Explore my full academic timeline and achievements
          </p>
        </div>
      </div>
    </section>
  )
}