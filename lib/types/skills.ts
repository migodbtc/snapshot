import { LucideIcon } from "lucide-react";

export type SkillCategory =
  | "languages"
  | "frameworks"
  | "tools"
  | "platforms";

export type SkillSource = "school" | "self-study" | "internship";

export type Skill = {
    name: string;
    icon: LucideIcon;
    timeSpent: string;
    preferred?: boolean;
    description: string;
    sources: SkillSource[];
}