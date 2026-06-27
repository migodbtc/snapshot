import { LucideIcon, LanguagesIcon, Atom } from "lucide-react";

// AboutMeCard: A dedicated subcomponent for the rendering of the about me cards for both desktop and mobile
type AboutMeCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  className?: string;
};

export function AboutMeCard({
  icon: Icon,
  title,
  value,
  className = "",
}: AboutMeCardProps) {
  return (
    <div
      className={`flex flex-col justify-center border border-slate-400/50 dark:border-slate-800 rounded-2xl p-4 backdrop-blur-xl ${className}`}
    >
      <span className="text-xs lg:text-sm text-rose-500 font-medium flex items-center gap-1">
        <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
        {title}
      </span>

      <h3 className="text-sm lg:text-xl text-gray-800 dark:text-gray-100 font-bold">
        {value}
      </h3>
    </div>
  );
}

// TechnologyCard: A unified card in order to deal with languages, frameworks, tools, and platforms.
type TechnologyCardProps = {
  icon: LucideIcon;
  name: string;
  years: string | number;
  description: string;
};

export const TechnologyCard = ({
  icon: Icon,
  name,
  years,
  description,
}: TechnologyCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 backdrop-blur-md">
      <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      <div className="flex h-full">
        <div className="flex flex-1 items-center justify-center">
          <div className="ml-2 flex h-[75%] w-full items-center justify-center border-r-2 border-slate-200 dark:border-slate-900 bg-radial from-rose-700/10 dark:from-rose-800/40 to-transparent to-50%">
            <Icon className="h-8 w-8 lg:h-12 lg:w-12 text-rose-800 dark:text-rose-500" />
          </div>
        </div>

        <div className="flex-3 flex flex-col items-start justify-center gap-0 py-2 pl-4 lg:gap-1">
          <div className="flex w-full items-center justify-between pr-4">
            <h3 className="font-bold">{name}</h3>

            <span className="rounded-xl bg-rose-500 px-2 py-0.5 text-xs font-semibold text-slate-50 dark:bg-rose-800">
              {years}yrs
            </span>
          </div>

          <p className="w-full pr-4 text-justify text-xs italic text-gray-800 dark:text-gray-400">
            {description.length > 125
              ? `${description.slice(0, 124)}...`
              : description}
          </p>
        </div>
      </div>
    </div>
  );
};