import { LucideIcon, MapPin, School, BookOpen, Coffee, Dumbbell, Target, LanguagesIcon, Atom, FileCode2, Wind, Database, GitBranch, Braces, Cpu, Server, Code2, FlaskConical, Globe, Zap, Boxes, Container, Terminal, Workflow, Cloud } from "lucide-react";

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

export const LANGUAGE_CONSTS = [
  {
    icon: FileCode2,
    name: "TypeScript",
    years: 3,
    description:
      "Primary language for building scalable full-stack applications across React, Next.js, Node.js, and cloud-native projects.",
  },
  {
    icon: Braces,
    name: "JavaScript",
    years: 4,
    description:
      "Used extensively for frontend and backend development, delivering responsive web applications and RESTful services.",
  },
  {
    icon: LanguagesIcon,
    name: "Python",
    years: 4,
    description:
      "Developed Flask APIs, automation utilities, machine learning integrations, and cloud-connected backend services.",
  },
  {
    icon: Database,
    name: "SQL",
    years: 3,
    description:
      "Designed relational schemas, optimized queries, and managed application data across MySQL and PostgreSQL systems.",
  },
  {
    icon: FileCode2,
    name: "PHP",
    years: 1,
    description:
      "Built database-driven web applications and backend functionality using Laravel and modern PHP practices.",
  },
];

export const FRAMEWORK_CONSTS = [
  {
    icon: Atom,
    name: "React",
    years: "3",
    description:
      "Built responsive single-page applications using component-based architecture and modern React patterns.",
  },
  {
    icon: Globe,
    name: "Next.js",
    years: "2",
    description:
      "Developed full-stack web applications with SSR, SSG, API routes, and optimized performance.",
  },
  {
    icon: Zap,
    name: "Vite",
    years: "2",
    description:
      "Used as a modern frontend build tool for fast development, HMR, and optimized production builds.",
  },
  {
    icon: Code2,
    name: "FastAPI",
    years: "1",
    description:
      "Built high-performance REST APIs with automatic OpenAPI documentation and Python type hints.",
  },
  {
    icon: FlaskConical,
    name: "Flask",
    years: "1",
    description:
      "Developed lightweight Python web applications and backend services with flexible architecture.",
  },
  {
    icon: Database,
    name: "Laravel",
    years: "1",
    description:
      "Implemented CRUD systems, authentication flows, and database-driven web applications.",
  },
  {
    icon: Code2,
    name: "Express.js",
    years: "2",
    description:
      "Built lightweight backend services and REST APIs using Node.js and Express.",
  },
];

export const TOOL_CONSTS = [
  {
    icon: GitBranch,
    name: "GitHub",
    years: "2",
    description:
      "Repository hosting, pull requests, project management, and code reviews.",
  },
  {
    icon: Container,
    name: "Docker",
    years: "3",
    description:
      "Containerization, multi-service development environments, and deployment consistency.",
  },
  {
    icon: Terminal,
    name: "Linux",
    years: "2",
    description:
      "Server administration, shell scripting, and development environment management.",
  },
  {
    icon: Boxes,
    name: "Bicep",
    years: "<1",
    description:
      "Infrastructure-as-Code provisioning and Azure resource automation.",
  },
  {
    icon: Workflow,
    name: "GitHub Actions",
    years: "1",
    description:
      "Continuous integration and deployment automation for cloud-native applications.",
  },
  {
    icon: GitBranch,
    name: "Git",
    years: "2",
    description:
      "Version control, branching strategies, and collaborative development workflows.",
  },
];

export const PLATFORM_CONSTS = [
  {
    icon: Cloud,
    name: "Microsoft Azure",
    years: "1",
    description:
      "Provisioned and managed cloud-native infrastructure, networking, and application hosting using Azure services.",
  },
  {
    icon: Cloud,
    name: "AWS",
    years: "1",
    description:
      "Deployed and hosted applications using AWS services, including cloud compute and machine learning workloads.",
  },
  {
    icon: Database,
    name: "Supabase",
    years: "2",
    description:
      "Utilized managed PostgreSQL, authentication, storage, and realtime capabilities for full-stack applications.",
  },
  {
    icon: Database,
    name: "PostgreSQL",
    years: "2",
    description:
      "Designed relational schemas and managed production-ready application data for modern web systems.",
  },
  {
    icon: Database,
    name: "MySQL",
    years: "3",
    description:
      "Developed and maintained relational databases supporting CRUD operations, analytics, and business workflows.",
  },
  {
    icon: Server,
    name: "Vercel",
    years: "2",
    description:
      "Hosted and deployed Next.js applications with automated CI/CD integration and global edge delivery.",
  },
];

export const EDUCATION_CONSTS = {
  "college": {
    "badge_content": "College",
    "school_name": "Don Bosco Technical College",
    "date_range": "August 2022 to June 2026",
    "subtitle": "Bachelor of Science in Information Technology",
    "address": "736 Gen. Kalentong Street, Mandaluyong City, 1550 Metro Manila, Philippines.",
    "awards_and_honors": [
      "Batch Valedictorian",
      "Magna Cum Laude",
      "Service Award"
    ],
    "personal_description": "Don Bosco Technical College is a private Catholic educational institution in Mandaluyong City administered by the Salesians of Don Bosco. Established in 1953, the college is recognized for its emphasis on technical and vocational education alongside academic programs. It offers undergraduate degrees in fields such as Information Technology, Engineering, Business Administration, and Education while promoting the Salesian values of reason, religion, and loving-kindness."
  },
  "shs": {
    "badge_content": "SHS",
    "school_name": "San Diego Parochial School",
    "date_range": "July 2020 to May 2022",
    "subtitle": "Senior High School - Science, Technology, Engineering, & Mathematics (STEM)",
    "address": "Polo, Poblacion, Valenzuela City, Philippines",
    "awards_and_honors": [
      "With High Honors (2nd year SHS)",
      "With Honors (1st year SHS)"
    ],
    "personal_description": "San Diego Parochial School is a private Catholic educational institution located in Valenzuela City. The junior high school program provides students with a comprehensive curriculum covering core academic subjects while fostering values formation, discipline, and leadership. It prepares learners for senior high school through a balanced focus on academics and personal development."

  },
  "hs2": {
    "badge_content": "JHS",
    "school_name": "San Diego Parochial School",
    "date_range": "June 2017 to May 2020",
    "subtitle": "Junior High School",
    "address": "Polo, Poblacion, Valenzuela City, Philippines",
    "awards_and_honors": [
      "With Honors (Grade 9 & 10)"
    ],
    "personal_description": "San Diego Parochial School is a private Catholic educational institution located in Valenzuela City. The junior high school program provides students with a comprehensive curriculum covering core academic subjects while fostering values formation, discipline, and leadership. It prepares learners for senior high school through a balanced focus on academics and personal development."

  },
  "hs1": {
    "badge_content": "JHS",
    "school_name": "Don Bosco Salesian Sisters Inc",
    "date_range": "July 2016 to April 2017",
    "subtitle": "Junior High School",
    "address": "3500 V. Mapa Avenue, Sampaloc, Manila, Philippines",
    "awards_and_honors": [
      "With Honors (Grade 9 & 10)"
    ],
    "personal_description": "Don Bosco School Manila is a private Catholic institution in Sampaloc, Manila, operated by the Daughters of Mary Help of Christians (Salesian Sisters). The school provides basic education founded on the educational philosophy of Saint John Bosco, integrating academics with character formation, spiritual growth, and community service. It serves students from preschool through senior high school."
  },
  "elementary": {
    "badge_content": "Elementary",
    "school_name": "Don Bosco Technical College",
    "date_range": "June 2020 to April 2016",
    "subtitle": "Elementary School",
    "address": "3500 V. Mapa Avenue, Sampaloc, Manila, Philippines",
    "awards_and_honors": [
      "With Honors (Grade 9 & 10)"
    ],
    "personal_description":  "Don Bosco Technical College offers elementary education as part of its basic education program, providing students with a strong foundation in literacy, numeracy, science, and values education. The curriculum combines academic instruction with character development inspired by the Salesian educational tradition. Students are encouraged to develop discipline, responsibility, and social awareness from an early age."
  },
}