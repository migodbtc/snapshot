// projects.ts: Typed project collection imported from the consolidated content/projects.json array.

import projectsData from "@/content/projects.json";
import {
  ProjectsArraySchema,
  type Project,
  type ProjectPicture,
} from "@/lib/content/schemas";

export type { Project, ProjectPicture };

export const PROJECT_INDEX: Project[] = ProjectsArraySchema.parse(projectsData);
