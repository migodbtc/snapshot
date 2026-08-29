import Link from "next/link";
import { GraduationCap, Trophy, MapPin, Target } from "lucide-react";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type StatCard = {
  icon: React.ElementType;
  subtext: string;
  mainText: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const STAT_CARDS: StatCard[] = [
  {
    icon: GraduationCap,
    subtext: "Education",
    mainText: "BS Information Technology",
  },
  {
    icon: Trophy,
    subtext: "Academic Awards",
    mainText: "Valedictorian, Magna Cum Laude",
  },
  {
    icon: MapPin,
    subtext: "Based in",
    mainText: "Mandaluyong, Philippines",
  },
  {
    icon: Target,
    subtext: "Current Professional Goal",
    mainText: "First SWE Job",
  },
];

// ── GlassStatCard ─────────────────────────────────────────────────────────────

type GlassStatCardProps = {
  icon: React.ElementType;
  subtext: string;
  mainText: string;
};

const GlassStatCard = ({
  icon: Icon,
  subtext,
  mainText,
}: GlassStatCardProps) => (
  <div
    className="
      relative overflow-hidden
      rounded-xl
      border border-slate-300 dark:border-slate-800
      backdrop-blur-md
      bg-slate-50/50 dark:bg-slate-950/30
      p-5
      flex flex-col justify-between
      min-h-32
    "
  >
    {/* Glass radial glow */}
    <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

    {/* Icon — top right */}
    <div className="flex justify-end">
      <Icon
        className="text-rose-800 dark:text-rose-500 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
        strokeWidth={1.75}
      />
    </div>

    {/* Text — bottom left */}
    <div className="flex flex-col gap-0.5 mt-auto">
      <span className="text-xs sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
        {subtext}
      </span>
      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
        {mainText}
      </span>
    </div>
  </div>
);

// ── AboutSection ──────────────────────────────────────────────────────────────

// Inline link style reused across paragraphs
const inlineLink =
  "text-rose-800 dark:text-rose-500 underline underline-offset-2 hover:text-rose-600 dark:hover:text-rose-400 transition-colors";

// AboutSection: Split-column layout on md+, stacked on mobile.
// Left: badge + two story paragraphs. Right: 2x2 (md+) / 1x4 (mobile) stat cards.
export const AboutSection = () => {
  return (
    <section className="w-full h-auto px-6 py-16 max-w-5xl mx-auto flex items-center">
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4 md:flex-1"
        >
          {/* Badge */}
          <span
            className="
              w-fit
              px-3 py-1
              rounded-xl
              bg-rose-800
              text-white dark:text-white
              text-xs font-bold tracking-widest uppercase
              select-none
            "
          >
            About Me
          </span>

          {/* Story paragraphs */}
          <p className="text-base text-gray-700 dark:text-gray-400 text-justify leading-relaxed">
            Welcome to my portfolio page! My name is Miguel Justin Bunda, but
            you can call me Migo. This web portfolio is not only a reflection of
            my professional experience which include my journey from when I
            started making HTML pages at home to being an aspiring software
            engineer looking to learn everything about the industry. This
            portfolio may change over time, not just in the basic content, but
            how I structure the website in general — because I would like this
            project to be a reflection of my philosophy as a professional: to
            learn, adapt, automate, and evolve.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-400 text-justify leading-relaxed">
            On the top right of the website is the hamburger menu (the three
            lines stacked on top of each other), which is a navigation button
            that would help you go from one segment of the website to another.
            The landing page of this website already tells a lot of my
            professional history, but if you wish to know more about my{" "}
            <Link href="/skills" className={inlineLink}>
              skills
            </Link>
            ,{" "}
            <Link href="/education" className={inlineLink}>
              education
            </Link>
            , or even a{" "}
            <Link href="/blog" className={inlineLink}>
              blog
            </Link>{" "}
            where you can see what I have written over time. Happy scrolling!
          </p>
        </motion.div>

        {/* Right Column — 2x2 on md+, 1x4 on mobile */}
        <div className="grid grid-cols-1 gap-4 md:flex-1">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.subtext}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            >
              <GlassStatCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
