import React from "react";
import { ICON_REGISTRY, type IconComponent } from "@/lib/content/icons";
import { Code2, Terminal } from "lucide-react";
import skillsJson from "@/content/skills.json";

// Precompute lowercase lookup map from skills.json for exact brand icons and colors
const SKILL_MAP: Record<string, { iconKey: string; color: string }> = {};

skillsJson.forEach((section) => {
  section.skills.forEach((s) => {
    SKILL_MAP[s.name.toLowerCase()] = { iconKey: s.iconKey, color: s.color };
  });
});

// Alias normalizer for common variant names found in project tags
function normalizeSkillKey(skillName: string): { iconKey: string; color: string } | null {
  const lower = skillName.toLowerCase().trim();

  // Direct lookup
  if (SKILL_MAP[lower]) return SKILL_MAP[lower];

  // Common pattern aliases
  if (lower.includes("python")) return SKILL_MAP["python"] || null;
  if (lower === "react.js" || lower === "react") return SKILL_MAP["react"] || null;
  if (lower.includes("react native")) return { iconKey: "SiReact", color: "text-[#61DAFB]" };
  if (lower.includes("tailwind")) return SKILL_MAP["tailwind css"] || null;
  if (lower.includes("next.js") || lower.includes("nextjs")) return SKILL_MAP["next.js"] || null;
  if (lower.includes("bootstrap")) return SKILL_MAP["bootstrap"] || null;
  if (lower.includes("bedrock")) return { iconKey: "TbBrandAws", color: "text-[#FF9900]" };
  if (lower.includes("aws") || lower.includes("amazon web services")) return SKILL_MAP["aws (ec2)"] || null;
  if (lower.includes("azure")) return SKILL_MAP["microsoft azure"] || null;
  if (lower.includes("ci/cd") || lower.includes("continuous integration")) return SKILL_MAP["github actions"] || null;
  if (lower.includes("docker") || lower.includes("container")) return SKILL_MAP["docker"] || null;
  if (lower.includes("mysql")) return SKILL_MAP["mysql"] || null;
  if (lower.includes("postgresql")) return SKILL_MAP["postgresql"] || null;
  if (lower.includes("gemini")) return SKILL_MAP["google gemini"] || null;
  if (lower.includes("langchain")) return SKILL_MAP["langchain"] || null;
  if (lower.includes("ollama")) return SKILL_MAP["ollama"] || null;
  if (lower.includes("tensorflow") || lower.includes("machine learning")) return SKILL_MAP["tensorflow"] || null;
  if (lower.includes("vitest")) return SKILL_MAP["vitest"] || null;
  if (lower.includes("pytest")) return SKILL_MAP["pytest"] || null;

  return null;
}

interface ProjectSkillBadgeProps {
  skill: string;
  isFocused?: boolean;
  isDimmed?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export function ProjectSkillBadge({
  skill,
  isFocused = false,
  isDimmed = false,
  onHover,
  onLeave,
}: ProjectSkillBadgeProps) {
  const match = normalizeSkillKey(skill);

  let Icon: IconComponent = Code2;
  let color = "text-rose-500";

  if (match) {
    Icon = ICON_REGISTRY[match.iconKey] || Terminal;
    color = match.color || "text-slate-300";
  }

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl select-none group shadow-sm cursor-default transition-all duration-200 border ${
        isFocused
          ? "bg-neutral-900 border-rose-500/70 shadow-[0_0_18px_rgba(244,63,94,0.25)] text-white scale-105 z-10"
          : isDimmed
            ? "bg-neutral-900/40 border-white/5 text-slate-500 opacity-40 grayscale-[20%]"
            : "bg-neutral-900/80 hover:bg-neutral-900 border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
      }`}
    >
      <Icon
        className={`w-4 h-4 sm:w-5 sm:h-5 ${color} ${
          isFocused ? "scale-110" : "group-hover:scale-110"
        } transition-transform duration-200 shrink-0`}
      />
      <span className="text-xs sm:text-sm font-mono tracking-wide">{skill}</span>
    </div>
  );
}
