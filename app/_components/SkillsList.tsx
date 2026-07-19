"use client";

import { BookOpen, ChevronsDown, ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";

type SkillsListProps = {
  skills: string[];
};

// Matches your grid-cols-1 (sm) / grid-cols-2 (md) / grid-cols-3 (lg) breakpoints
const VISIBLE_COUNT_BY_BREAKPOINT = {
  base: 1, // < md
  md: 2, // >= 768px
  lg: 3, // >= 1024px
};

function useVisibleSkillCount() {
  const [count, setCount] = useState(VISIBLE_COUNT_BY_BREAKPOINT.base);

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)");
    const lgQuery = window.matchMedia("(min-width: 1024px)");

    const updateCount = () => {
      if (lgQuery.matches) {
        setCount(VISIBLE_COUNT_BY_BREAKPOINT.lg);
      } else if (mdQuery.matches) {
        setCount(VISIBLE_COUNT_BY_BREAKPOINT.md);
      } else {
        setCount(VISIBLE_COUNT_BY_BREAKPOINT.base);
      }
    };

    updateCount();

    mdQuery.addEventListener("change", updateCount);
    lgQuery.addEventListener("change", updateCount);

    return () => {
      mdQuery.removeEventListener("change", updateCount);
      lgQuery.removeEventListener("change", updateCount);
    };
  }, []);

  return count;
}

export function SkillsList({ skills }: SkillsListProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = useVisibleSkillCount();

  const visibleSkills = skills.slice(0, visibleCount);
  const hiddenSkills = skills.slice(visibleCount);
  const hasMore = hiddenSkills.length > 0;

  return (
    <div className="w-full flex flex-col">
      {/* Skills wrapper — controls its own internal gap, isolated from the toggle */}
      <div className="w-full flex flex-col gap-4">
        {/* Always-visible, count depends on breakpoint */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min gap-4 text-slate-800 dark:text-slate-400">
          {visibleSkills.map((s) => (
            <span
              className="text-base flex flex-row items-center gap-2 select-none"
              key={`skill-${s}`}
            >
              <BookOpen size={20} />
              {s}
            </span>
          ))}
        </div>

        {/* Animated collapsible wrapper for the rest */}
        {hasMore && (
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden min-h-0">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min gap-4 text-slate-800 dark:text-slate-400">
                {hiddenSkills.map((s) => (
                  <span
                    className="text-base flex flex-row items-center gap-2 select-none"
                    key={`skill-${s}`}
                  >
                    <BookOpen size={20} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toggle sits outside the gap-4 flow, spacing controlled independently */}
      {hasMore && (
        <div
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full mt-2 flex flex-row items-center gap-2 py-1.5 rounded-xl cursor-pointer select-none text-sm text-slate-800 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-center justify-center border border-slate-300 dark:border-slate-800"
        >
          {expanded ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
          {expanded ? "Show less" : `Show More (+${hiddenSkills.length})`}
        </div>
      )}
    </div>
  );
}
