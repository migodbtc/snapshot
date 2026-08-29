import { GraduationCap, Trophy, Briefcase, Code2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type StatItem = {
  icon: React.ElementType;
  stat: string;
  label: string;
  context: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  {
    icon: GraduationCap,
    stat: "1.26",
    label: "Final GPA",
    context: "Philippine scale — 1.00 is highest",
  },
  {
    icon: Trophy,
    stat: "#1",
    label: "Class Rank",
    context: "Graduated as Valedictorian",
  },
  {
    icon: Briefcase,
    stat: "3 mos",
    label: "Work Experience",
    context: "Software Development Intern",
  },
  {
    icon: Code2,
    stat: "4+ yrs",
    label: "Coding Experience",
    context: "From HTML pages to full-stack",
  },
];

// ── StatSegment ───────────────────────────────────────────────────────────────

type StatSegmentProps = StatItem;

const StatSegment = ({
  icon: Icon,
  stat,
  label,
  context,
}: StatSegmentProps) => (
  <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 py-6 px-3 sm:py-10 sm:px-6 text-center">
    {/* Icon */}
    <Icon
      className="text-rose-800 dark:text-rose-500 w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11"
      strokeWidth={1.5}
    />

    {/* Main stat */}
    <span className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-none">
      {stat}
    </span>

    {/* Label + context */}
    <div className="flex flex-col gap-0.5">
      <span className="text-xs sm:text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </span>
      <span className="text-xs sm:text-xs md:text-sm text-slate-500 dark:text-slate-500">
        {context}
      </span>
    </div>
  </div>
);

// ── StatsStrip ────────────────────────────────────────────────────────────────

// StatsStrip: A full-width horizontal band of 4 professional stats.
// md+: 4 segments in a row divided by subtle vertical lines.
// mobile: horizontal scroll-snap carousel — peek at next card hints scrollability.
export const StatsStrip = () => {
  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto py-4">
        {/* ── Mobile: 2x2 grid with inner-only borders ────────────────────────────── */}
        <div className="grid grid-cols-2 md:hidden">
          {STATS.map((item, i) => (
            <div
              key={item.label}
              className={[
                // right border on left-column items (0, 2)
                i % 2 === 0 ? "border-r border-slate-200 dark:border-slate-800" : "",
                // bottom border on top-row items (0, 1)
                i < 2 ? "border-b border-slate-200 dark:border-slate-800" : "",
              ].join(" ")}
            >
              <StatSegment {...item} />
            </div>
          ))}
        </div>

        {/* ── md+: horizontal strip ────────────────────────────────────────── */}
        <div className="hidden md:flex divide-x divide-slate-200 dark:divide-slate-800">
          {STATS.map((item) => (
            <div key={item.label} className="flex-1">
              <StatSegment {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
