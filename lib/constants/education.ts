// education.ts: Typed education milestones imported from content/education.json.

import educationData from "@/content/education.json";
import { EducationArraySchema, type EducationItem } from "@/lib/content/schemas";

export const EDUCATION_LIST: EducationItem[] =
  EducationArraySchema.parse(educationData);

export const EDUCATION_CONSTS = EDUCATION_LIST.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, EducationItem>
);