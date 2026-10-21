import React from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiYaml,
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiInertia,
  SiVite,
  SiFastapi,
  SiFlask,
  SiLaravel,
  SiTailwindcss,
  SiBootstrap,
  SiDocker,
  SiLinux,
  SiNginx,
  SiRedis,
  SiSupabase,
  SiGithubactions,
  SiVercel,
  SiGit,
  SiPytest,
  SiVitest,
  SiLangchain,
  SiTensorflow,
  SiGooglegemini,
  SiOllama,
} from "react-icons/si";
import { TbBrandAzure, TbBrandAws } from "react-icons/tb";
import {
  GraduationCap,
  Trophy,
  Calendar,
  Code2,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";

export type IconComponent = IconType | LucideIcon | React.ComponentType<{ className?: string; size?: number }>;

export const ICON_REGISTRY: Record<string, IconComponent> = {
  // Languages
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiYaml,

  // Frameworks
  SiNextdotjs,
  SiReact,
  SiExpo,
  SiInertia,
  SiVite,
  SiFastapi,
  SiFlask,
  SiLaravel,
  SiTailwindcss,
  SiBootstrap,

  // Cloud & Platforms
  TbBrandAzure,
  TbBrandAws,
  SiDocker,
  SiLinux,
  SiNginx,
  SiRedis,
  SiSupabase,
  SiGithubactions,
  SiVercel,
  SiGit,

  // AI & Testing
  SiGooglegemini,
  SiLangchain,
  SiOllama,
  SiTensorflow,
  SiPytest,
  SiVitest,

  // Lucide Icons
  GraduationCap,
  Trophy,
  Calendar,
  Code2,
  Terminal,
};

export function getIcon(key: string): IconComponent {
  return ICON_REGISTRY[key] || Code2;
}
