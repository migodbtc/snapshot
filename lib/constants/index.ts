import { LucideIcon, MapPin, School, BookOpen, Coffee, Dumbbell, Target, LanguagesIcon, Atom, FileCode2, Wind, Database, GitBranch, Braces, Cpu, Server, Code2, FlaskConical, Globe, Zap, Boxes, Container, Terminal, Workflow, Cloud } from "lucide-react";

type SelectionGridData = {
  id: number, 
  label: string,
  image: string,
  credit: string,
  description: string,
}

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

export const SELECTION_GRID_CONSTS: SelectionGridData[] = [
  {
    id: 0,
    label: "How I Started",
    image: "/images/about_stock_images/computer-santiago-vargas.jpg",
    credit: "Santiago Vargas | Pinterest",
    description: "My earliest memory of software engineering didn't come from an interest in SWE itself, but from discovering, in the final year of elementary school (Grade 6), that HTML and CSS could be used to build websites. I remember making absurdly simple sites and realizing, for the first time, that I had the option to pursue something in the software space - even without knowing where that decision would eventually lead me.",
  },
  {
    id: 1,
    label: "Career Aspirations",
    image: "/images/about_stock_images/career-aspirations-fortenu.jpg",
    credit: "@fortenu | Pinterest",
    description: "I've spent months, sometimes years, thinking through my career aspirations: what type of software engineer I want to become, what I want to build, and how to grow as both a technical and communicable person. Right now, though, I've landed on something simpler - I want to be in a role where I can provide as much value and contribution as possible, regardless of the title, responsibility, or form that role takes.",
  },
  {
    id: 2,
    label: "Thesis Experience",
    image: "/images/about_stock_images/thesis-horatioloveyou.jpg",
    credit: "@horatioloveyou | Pinterest",
    description: "My thesis experience - Capstone Project 1 and 2, or IT401 and IT402 - was instrumental to my growth as a software engineer. Despite the odds feeling stacked against us, my team and I built Apollo, a fire emergency reporting, monitoring, and response system. It let users capture photo or video reports sent to fire stations within a minute, displayed live reports on a map for civilians and responders, and included ML-based verification, approval notifications, and both web and mobile apps.",
  },
  {
    id: 3,
    label: "Favorite Drinks",
    image: "/images/about_stock_images/coffee-super-junior.jpg",
    credit: "super junior | Pinterest",
    description: "I don't drink much alcohol, but I make up for it with just about everything else - shakes, coffee, milk tea, fruit juices, sodas, and pretty much any beverage that exists. I have a particular soft spot for Vietnamese coffee, as shown on my home page, along with mango graham shakes from local businesses and fruit salad drinks. And, of course, plenty of water to keep up with the rest of the habit.",
  },
  {
    id: 4,
    label: "Hobbies & Pastimes",
    image: "/images/about_stock_images/calisthenics_inumaki_calist.jpg",
    credit: "@inumaki_calist | Pinterest",
    description: "Outside of project development and career growth, I try to balance things out with hobbies that have nothing to do with either - weightlifting, calisthenics, running, cooking, and traveling, whether alone or with others, plus spending time with my family, partner, and friends. I have plenty of goals tied to these too, like getting fitter and faster, and reaching certain places alongside certain people who matter to me.",
  },
  {
    id: 5,
    label: "Industry Inspirations",
    image: "/images/about_stock_images/public_speaking_gabriel.jpg",
    credit: "Gabriel | Pinterest",
    description: "There are plenty of great software engineers, locally and internationally, who've dedicated themselves to their craft. I've drawn inspiration from names like Bryl Lim, Mitchell Hashimoto, Gergely Orosz, and Kelsey Hightower. Just as important, though, has been Mr. Ferdinand Hassan Flojo - a mentor figure who pushed me hard, especially during my second and third years of college, and shaped how I approach this field.",
  },
];