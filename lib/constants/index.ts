import { LucideIcon, MapPin, School, BookOpen, Coffee, Dumbbell, Target, LanguagesIcon, Atom, FileCode2, Wind, Database, GitBranch, Braces, Cpu, Server } from "lucide-react";

export const ABOUT_ME_INFO: {
  icon: LucideIcon;
  title: string;
  value: string;
}[] = [
  {
    icon: MapPin,
    title: "Location",
    value: "Mandaluyong",
  },
  {
    icon: School,
    title: "Alma Mater",
    value: "DBTC",
  },
  {
    icon: BookOpen,
    title: "Currently Studying",
    value: "Terraform",
  },
  {
    icon: Coffee,
    title: "Favorite Coffee",
    value: "Vietnamese Coffee",
  },
  {
    icon: Dumbbell,
    title: "Hobbies",
    value: "Fitness & Travel",
  },
  {
    icon: Target,
    title: "Goals",
    value: "Secure First Job",
  },
];

export const SKILLS_CONSTS = [
  {
    icon: LanguagesIcon,
    skillName: "Python",
    years: 4,
    description:
      "Experienced in building automation scripts, backend APIs, data processing tools, and desktop applications using Python.",
  },
  {
    icon: Atom,
    skillName: "React",
    years: 3,
    description:
      "Develop responsive, component-driven user interfaces with modern React patterns, hooks, and state management.",
  },
  {
    icon: FileCode2,
    skillName: "TypeScript",
    years: 3,
    description:
      "Build scalable and maintainable applications with static typing, improving code quality and developer productivity.",
  },
  {
    icon: Wind,
    skillName: "Tailwind CSS",
    years: 3,
    description:
      "Create responsive, modern interfaces quickly using utility-first styling while maintaining a consistent design system.",
  },
  {
    icon: Database,
    skillName: "PostgreSQL",
    years: 2,
    description:
      "Design relational databases, write optimized SQL queries, and manage application data efficiently.",
  },
  {
    icon: Server,
    skillName: "Node.js",
    years: 2,
    description:
      "Develop REST APIs, backend services, and real-time applications using Express and other Node.js libraries.",
  },
  {
    icon: GitBranch,
    skillName: "Git",
    years: 4,
    description:
      "Comfortable with branching strategies, pull requests, collaborative workflows, and version control best practices.",
  },
  {
    icon: Braces,
    skillName: "C++",
    years: 2,
    description:
      "Strong foundation in object-oriented programming, algorithms, and data structures for academic and personal projects.",
  },
  {
    icon: Cpu,
    skillName: "Arduino",
    years: 2,
    description:
      "Built embedded systems and IoT prototypes integrating sensors, actuators, and serial communication.",
  },
];