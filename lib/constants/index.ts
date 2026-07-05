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
    value: "Intro to Networking",
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
    value: "Max out life stats",
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

export const EXPERIENCE_CONSTS = [
  {
    role: "Backend Development Intern",
    company_name: "Rakso Creative Technologies",
    shortened_date: "Jan 2026 to Apr 2026",
    start_date: "January 2026",
    finish_date: "April 2026",
    technologies: [
      "PHP",
      "MySQL",
      "Reactjs",
      "TailwindCSS",
      "Microsoft Azure",
      "Laravel",
      "TypeScript",
      "Git",
      "GitHub"
    ],
    achievements: [
      "Operated under the 'CRM Development' Department as a Backend Developer & 'Azure Deployment' Department as a Cloud Developer",
      "Learned and applied technologies such as Laravel (PHP), Tailwind, React (TypeScript), and more for the development of the CRM application",
      "Developed Deter Analytics (see Projects) under the objective of learning about the Cloud and DevOps technologies and tools such as Microsoft Azure, IaC through Bicep, GitHub Workflows & Actions, Azure CLI, and more",
      "Created design documentation and contributed to the architecture of the CRM application, such as making the user flowchart and database schema",
      "Contributed to database refactoring, ORM scaffolding, API/route handling, backend-frontend-integration, etc.",
      "Researched and developed Qualisync (see Projects) as part of a separate objective in order to improve technical expertise in disciplines such as QA, Automation, DevOps, Containerization/Virtualization, etc.",
    ]
  }
]

export const BLOG_POSTS = [
  {
    title: "Dealing with Career Unknowns Post-Graduation",
    date: "07-02-2026, 1:53 PM",
    excerpt:
      "This description is intentionally AI-generated because the actual article has not been written yet. The goal is not to perfectly represent my thoughts, but to provide a placeholder for the type of discussion I eventually want to have. As a recent graduate entering the professional world, one of the most uncomfortable realizations is that uncertainty does not disappear after earning a degree. In many ways, it becomes more visible. Questions about specialization, career direction, long-term goals, industry expectations, and personal growth become harder to answer when there is no longer a structured academic environment providing guidance. This future article will likely explore the tension between ambition and uncertainty, the pressure to make the 'right' decisions early in a career, and how navigating unknowns may be less about finding immediate answers and more about developing confidence in adapting to change over time.",
  },

  {
    title: "A Fresh Graduate's Perspective on the Current Technology Job Market",
    date: "06-28-2026, 9:10 AM",
    excerpt:
      "This excerpt was generated with AI and should be treated as a temporary stand-in until I write the article myself. The intended topic revolves around my observations of the current technology landscape from the perspective of someone entering the industry rather than someone already established within it. Discussions around software engineering, infrastructure, cloud computing, cybersecurity, AI, and application development often come from experienced professionals, but the experience can look very different from the viewpoint of a new graduate trying to understand where opportunities actually exist. The article may explore trends in hiring, the growing emphasis on practical experience, the influence of artificial intelligence on entry-level roles, the increasing expectations placed on junior developers, and the challenge of determining which technologies are genuinely worth learning versus those that are simply receiving temporary attention. Rather than offering expert conclusions, the goal is to document observations, questions, and lessons learned while attempting to understand an industry that continues to evolve faster than most people can comfortably keep up with.",
  },

  {
    title: "Learning to Slow Down in the Age of Artificial Intelligence",
    date: "06-20-2026, 4:45 PM",
    excerpt:
      "This summary is also AI-generated and serves only as a placeholder until I replace it with my own writing. The central idea is a reflection on how easy it has become to move too quickly in a world increasingly assisted by artificial intelligence. Modern tools can accelerate research, learning, development, communication, and content creation to an unprecedented degree. While this can be incredibly empowering, it also introduces the temptation to prioritize speed over understanding. The future article may discuss the importance of slowing down intentionally, spending more time thinking through problems independently, questioning assumptions, developing original perspectives, and allowing genuine learning to occur before reaching for automated assistance. As someone working within technology, I find this tension particularly interesting because the same tools that increase productivity can also reduce opportunities for deep practice if used carelessly. The article will likely explore how artificial intelligence can be integrated into personal growth without allowing it to replace the deliberate effort that builds competence, judgment, and long-term expertise.",
  },
];