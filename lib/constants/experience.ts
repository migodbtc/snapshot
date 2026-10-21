// experience.ts: Typed professional experience list imported from content/experience.json.

import experienceData from "@/content/experience.json";
import { ExperienceArraySchema, type ExperienceItem } from "@/lib/content/schemas";

export const EXPERIENCE_CONSTS: ExperienceItem[] =
  ExperienceArraySchema.parse(experienceData);