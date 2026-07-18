// ExperienceSection: The section containing all the experience I have professionally.
// Not much to put considering I just graduated and finished a 3-month internship so, unfortunate.

import { ArrowUpRight, Circle, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { EXPERIENCE_CONSTS } from "@/lib/constants/experience";
import Link from "next/link";

// TimelinePoint: Dedicated subcomponent to show different points in time for my journey
type TimelinePointProps = {
  role: string;
  date: string;
  position?: "top" | "bottom";
  onClick?: () => void;
};

export const TimelinePoint = ({
  role,
  date,
  position = "bottom",
  onClick,
}: TimelinePointProps) => {
  const isTop = position === "top";

  return (
    <div className="relative">
      {isTop && (
        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            text-center
          "
        >
          <p className="text-sm lg:text-base font-semibold">{role}</p>

          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 italic">
            ({date})
          </p>
        </div>
      )}

      <div
        className="
          h-6 w-6 rounded-full
          bg-rose-800 dark:bg-rose-500
          border-4
          border-slate-50 dark:border-slate-950
          z-10
          transition-all duration-300
          hover:scale-125
          hover:shadow-[0_0_16px_rgba(190,24,93,0.6)]
          dark:hover:shadow-[0_0_20px_rgba(244,63,94,0.75)]
          cursor-pointer
        "
        onClick={onClick}
      />

      {!isTop && (
        <div
          className="
            absolute
            top-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            text-center
          "
        >
          <p className="text-sm lg:text-base font-semibold">{role}</p>

          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 italic">
            ({date})
          </p>
        </div>
      )}
    </div>
  );
};

export const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState(
    EXPERIENCE_CONSTS[0],
  );

  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  const visibleTechnologies = selectedExperience.technologies.slice(0, 3);

  const hiddenTechnologies = selectedExperience.technologies.slice(3);

  return (
    <section className="flex flex-col h-fit overflow-hidden mx-8 lg:mx-auto">
      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3 mt-12">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
          Experience
        </h1>
      </div>

      {/* Selected Experience - Large */}
      <div className="hidden lg:block flex-1 mx-12 ">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            py-4
            px-4
          "
        >
          {/* Experience Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="mb-2">
              <div className="flex items-center gap-3 flex-wrap justify-between">
                <h2 className="text-base font-bold">
                  {selectedExperience.role}
                </h2>

                <p className="text-sm italic text-slate-500 text-right">
                  {selectedExperience.start_date} -{" "}
                  {selectedExperience.finish_date}
                </p>
              </div>

              <p className="text-base text-gray-500 dark:text-gray-400">
                {selectedExperience.company_name}
              </p>
            </div>

            <div className="my-3">
              <div className="flex flex-wrap gap-2">
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl
                      bg-rose-800
                      px-3 py-1
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    {tech}
                  </span>
                ))}

                {hiddenTechnologies.length > 0 && (
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="
                      rounded-xl
                      bg-slate-200
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-300
                      px-3 py-1
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-slate-200
                      dark:hover:bg-slate-600
                    "
                  >
                    +{hiddenTechnologies.length}
                  </button>
                )}
              </div>
            </div>

            <div>
              <ul
                className="
                  h-84
                  overflow-y-auto
                  space-y-3

                  bg-transparent

                  text-sm
                  text-slate-600
                  dark:text-slate-300

                  pr-2

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-slate-300
                  dark:scrollbar-thumb-slate-700
                "
              >
                {selectedExperience.achievements.map((item) => (
                  <li
                    key={item}
                    className="
                      text-sm
                      text-gray-600
                      dark:text-gray-300
                      leading-relaxed
                      flex flex-row gap-2 items-start
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4 mt-2" />{" "}
                    <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="
              w-1/2
              px-8
              flex
              items-center
              justify-center
              bg-radial from-slate-400/50  to-transparent 
              dark:from-slate-300/20 dark:to-transparent
              to-75%
            "
          >
            <div
              className="
                w-full
                aspect-video
                rounded-xl
                relative
                overflow-hidden
                
              "
            >
              <Image
                src="/images/rakso_migo.jpg"
                alt="Miguel Justin at the Rakso CT Office Logo"
                fill
                className="object-cover object-top"
                loading="eager"
                sizes="(max-width: 1024px) 75vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Experience - Medium */}
      <div className="block lg:hidden flex-1">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            py-4
          "
        >
          <div className="w-full p-6 overflow-y-auto">
            <div className="mb-2">
              <div className="flex items-center gap-3 flex-wrap justify-between">
                <h2 className="text-lg lg:text-xl font-bold">
                  {selectedExperience.role}
                </h2>

                <p className="text-sm italic text-slate-500 text-right">
                  {selectedExperience.start_date} -{" "}
                  {selectedExperience.finish_date}
                </p>
              </div>

              <p className="text-base text-gray-500 dark:text-gray-400">
                {selectedExperience.company_name}
              </p>
            </div>

            <div className="my-3">
              <div className="flex flex-wrap gap-2">
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl
                      bg-rose-800
                      px-3 py-1
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    {tech}
                  </span>
                ))}

                {hiddenTechnologies.length > 0 && (
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="
                      rounded-xl
                      bg-slate-200
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-300
                      px-3 py-1
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-slate-200
                      dark:hover:bg-slate-600
                    "
                  >
                    +{hiddenTechnologies.length}
                  </button>
                )}
              </div>
            </div>
            <div
              className="
              w-full
              pb-4 pt-2
              flex
              items-center
              justify-center
              bg-radial from-slate-400/50  to-transparent 
              dark:from-slate-300/20 dark:to-transparent
              to-75%
            "
            >
              <div
                className="
                w-[75%]
                aspect-video
                rounded-xl
                relative
                overflow-hidden
                
              "
              >
                <Image
                  src="/images/rakso_migo.jpg"
                  alt="Miguel Justin at the Rakso CT Office Logo"
                  fill
                  className="object-cover object-top"
                  loading="eager"
                  sizes="100vw"
                />
              </div>
            </div>

            <div>
              <ul
                className="
                  h-52
                  overflow-y-auto
                  space-y-3

                  bg-transparent

                  text-sm
                  text-slate-600
                  dark:text-slate-300

                  pr-2

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-slate-300
                  dark:scrollbar-thumb-slate-700
                "
              >
                {selectedExperience.achievements.map((item) => (
                  <li
                    key={item}
                    className="
                      text-sm
                      text-gray-600
                      dark:text-gray-300
                      leading-relaxed
                      flex flex-row gap-2 items-start
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4 mt-2" />{" "}
                    <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-36 flex items-center mb-8">
        {/* Line */}
        <div className="absolute h-px bg-rose-300 dark:bg-rose-950 w-full" />

        {/* Points */}
        <div className="relative z-10 flex w-[60%] mx-auto justify-center">
          {EXPERIENCE_CONSTS.map((exp) => {
            return (
              <TimelinePoint
                key={exp.role}
                role={exp.role}
                date={exp.shortened_date}
                position="bottom"
                onClick={() => setSelectedExperience(exp)}
              />
            );
          })}
        </div>
      </div>

      {/* Redirect to /experience */}
      <div className="w-full text-center text-base text-gray-700/90 dark:text-slate-50/90">
        More details regarding my experience{" "}
        <Link
          href="/experience"
          className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer"
        >
          at the dedicated page here
          <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
        </Link>
      </div>

      {/* Technologies Modal */}
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center

          bg-black/50
          backdrop-blur-xs

          transition-opacity duration-300

          ${
            isTechModalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsTechModalOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative overflow-hidden

            w-[90%]
            max-w-2xl

            rounded-xl
            border border-slate-300
            dark:border-slate-800

            backdrop-blur-md
            bg-slate-50
            dark:bg-slate-950/70

            p-6

            transition-all duration-300

            ${isTechModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Technologies Used</h3>

            <button
              onClick={() => setIsTechModalOpen(false)}
              className="
                text-sm
                hover:text-slate-700
                dark:hover:text-slate-300
                cursor-pointer
                text-slate-900
                dark:text-slate-100
                flex flex-row items-center align-middle
              "
            >
              <X />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedExperience.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-xl
                  bg-rose-500
                  dark:bg-rose-900

                  px-3 py-1

                  text-xs
                  text-slate-200
                  font-semibold
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ExperienceSectionSmall = () => {
  const [selectedExperience, setSelectedExperience] = useState(
    EXPERIENCE_CONSTS[0],
  );

  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  const visibleTechnologies = selectedExperience.technologies.slice(0, 3);

  const hiddenTechnologies = selectedExperience.technologies.slice(3);

  return (
    <section className="flex flex-col h-fit overflow-hidden mx-4 lg:mx-auto mb-8">
      {/* Header */}
      <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3 mt-12">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
          Experience
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative h-24 flex items-center mb-8">
        {/* Line */}
        <div className="absolute h-px bg-rose-300 dark:bg-rose-950 w-full" />

        {/* Points */}
        <div className="relative z-10 flex w-[60%] mx-auto justify-center text-xs">
          {EXPERIENCE_CONSTS.map((exp) => {
            return (
              <TimelinePoint
                key={exp.role}
                role={exp.role}
                date={exp.shortened_date}
                position="bottom"
                onClick={() => setSelectedExperience(exp)}
              />
            );
          })}
        </div>
      </div>

      {/* Selected Experience */}
      <div className="flex-1 mb-8">
        <div
          className="
            flex h-full overflow-hidden
            rounded-xl
            border border-slate-300
            dark:border-slate-800
            py-4
          "
        >
          <div className="w-full px-4 overflow-y-auto">
            <div className="mb-2">
              <div className="flex items-center flex-wrap justify-between">
                <h2 className="text-base lg:text-xl font-bold">
                  {selectedExperience.role}
                </h2>

                <p className="text-xs italic text-slate-500 text-right">
                  {selectedExperience.start_date} -{" "}
                  {selectedExperience.finish_date}
                </p>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedExperience.company_name}
              </p>
            </div>

            <div className="my-1">
              <div className="flex flex-wrap gap-1">
                {visibleTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-xl
                      bg-rose-800
                      px-2 py-0.5
                      text-xs
                      font-semibold
                      text-slate-100
                    "
                  >
                    {tech}
                  </span>
                ))}

                {hiddenTechnologies.length > 0 && (
                  <button
                    onClick={() => setIsTechModalOpen(true)}
                    className="
                      rounded-xl
                      bg-slate-200
                      dark:bg-slate-800
                      text-slate-700
                      dark:text-slate-300
                      px-2 py-0.5
                      text-xs
                      font-semibold
                      cursor-pointer
                      transition-colors
                      hover:bg-slate-200
                      dark:hover:bg-slate-600
                    "
                  >
                    +{hiddenTechnologies.length}
                  </button>
                )}
              </div>
            </div>
            <div
              className="
              w-full
              pb-4 pt-2
              flex
              items-center
              justify-center
              bg-radial from-slate-400/50  to-transparent 
              dark:from-slate-300/20 dark:to-transparent
              to-75%
            "
            >
              <div
                className="
                w-full
                aspect-video
                rounded-xl
                relative
                overflow-hidden
                
              "
              >
                <Image
                  src="/images/rakso_migo.jpg"
                  alt="Miguel Justin at the Rakso CT Office Logo"
                  fill
                  className="object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>

            <div>
              <ul
                className="
                  h-52
                  overflow-y-auto
                  space-y-3

                  bg-transparent

                  text-sm
                  text-slate-600
                  dark:text-slate-300

                  pr-2

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-slate-300
                  dark:scrollbar-thumb-slate-700
                "
              >
                {selectedExperience.achievements.map((item) => (
                  <li
                    key={item}
                    className="
                      text-xs
                      text-gray-600
                      dark:text-gray-300
                      leading-relaxed
                      flex flex-row gap-2 items-start
                      text-justify
                    "
                  >
                    <Circle className="w-4 h-4 mt-2" />{" "}
                    <p className=" flex-1 mx-2">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Redirect to /experience */}
      <div className="w-full text-center text-base text-gray-700/90 dark:text-slate-50/90">
        More details regarding my experience{" "}
        <Link
          href="/experience"
          className="inline-flex items-start text-rose-800 dark:text-rose-500 hover:underline cursor-pointer"
        >
          at the dedicated page here
          <ArrowUpRight className="h-4 w-4 mt-0.5 -translate-y-0.5" />
        </Link>
      </div>

      {/* Technologies Modal */}
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center

          bg-black/50
          backdrop-blur-xs

          transition-opacity duration-300

          ${
            isTechModalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsTechModalOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative overflow-hidden

            w-[90%]
            max-w-2xl

            rounded-xl
            border border-slate-300
            dark:border-slate-800

            backdrop-blur-md
            bg-slate-50
            dark:bg-slate-950/70

            p-6

            transition-all duration-300

            ${isTechModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="absolute inset-0 -z-10 bg-radial from-slate-400/50 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Technologies Used</h3>

            <button
              onClick={() => setIsTechModalOpen(false)}
              className="
                text-sm
                hover:text-slate-700
                dark:hover:text-slate-300
                cursor-pointer
                text-slate-900
                dark:text-slate-100
                flex flex-row items-center align-middle
              "
            >
              <X />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedExperience.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-xl
                  bg-rose-500
                  dark:bg-rose-900

                  px-3 py-1

                  text-xs
                  text-slate-200
                  font-semibold
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
