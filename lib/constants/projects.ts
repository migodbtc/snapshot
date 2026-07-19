export type ProjectPicture = {
  imageRef: string;
  orientation: "portrait" | "landscape";
  thumbnail: boolean;
};

export type Project = {
  projectId: number;
  projectName: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  skills: string[];
  imageRefs: ProjectPicture[];
  description: string;
  note: string;
  associatedWith: string[];
};

export const PROJECT_INDEX: Project[] = [
  {
    projectId: 1,
    projectName: "ARCHiVER: Digital Accession Record System",
    startDate: "2024-04",
    endDate: "2024-06",
    currentlyWorking: false,
    skills: [
      "REST APIs",
      "Full-Stack Development",
      "Bootstrap (Framework)",
      "Flask",
      "MySQL",
      "Database Management System (DBMS)",
      "Web Development",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/01_archiver/login_feature.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/register_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/register_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/dashboard_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/catalog_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/catalog_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/users_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/sql_snippet.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/01_archiver/codebase_bugged.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A digital accession record management system built with Flask, MySQL, and AdminLTE. Streamlines record management with multi-user functionality and role-based permissions for secure, organized access. Features a searchable table for locating accession records by attributes like ISBN, title, and author, with an intuitive CRUD system accessible via the data table and control menu. The UI is enhanced with AdminLTE (a Bootstrap-based CSS framework), Jinja2, FontAwesome, jQuery, and AJAX. Archived as of May 2025.",
    note: "This project basically marked the beginning of my project-building spree which I continued from second year all the way to now, where I still build projects (Snapshot, this portfolio website!) but have gained so much insight, experience, realization, and lessons from countless decisions that I ended up paying the price over time.\n\nARCHiVER was initially conceptualized from a group project involving me and a few of my classmates during second year: the idea was that instead of finding a digital solution for the library borrowing management system (which the library of our school did not permit us due to already having an existing system), we ended up making a digital system for the accession records. I remember the accession records itself being piles upon piles of documents dating years of information... and there was no way to manage that.\n\nBut what was the result of that group project ended up being a Visual Basic application, to which we nearly failed the final project despite having a near-functional system that can be deployed locally in the library due to having unclear instructions and plenty of indecisive opinions on our work by the professor. Me and my team fiercely defended our work, but still we were left disappointed.\n\nOn the bright side, I was starting to learn on how to build servers using Python, Flask, AdminLTE (CSS Bootstrap framework), and such. I asked my groupmates if I was allowed to take our idea and make another project with the same premise but with websites instead of an application. Fortunately, they had allowed me... and I ended up building this after a while.\n\nFurthermore, I had demonstrated this during the end of one of our subjects (Object-oriented Programming) because of my professor calling me onto the front of the class. He was aware of my progress as he was the one who recommended me Flask, and since he was also our professor for Web Systems & Technologies, he decided it was best for the class to have a sneak peek on what was about to come for the next semester.",
    associatedWith: ["Don Bosco Technical College, Mandaluyong"],
  },
  {
    projectId: 2,
    projectName: "Cerebral: Local Password Manager",
    startDate: "2024-06",
    endDate: "2024-12",
    currentlyWorking: false,
    skills: [
      "REST APIs",
      "Full-Stack Development",
      "Bootstrap (Framework)",
      "Jinja",
      "HTML",
      "Web Development",
      "Flask",
      "Python (Programming Language)",
      "MySQL",
      "Cascading Style Sheets (CSS)",
      "API Development",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/02_cerebral/index_feature.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/02_cerebral/index_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/02_cerebral/index_feature_alt_two.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/02_cerebral/login_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/02_cerebral/register_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A Flask web application integrating MySQL and AdminLTE, originally a passion project converted into an academic project. Designed to securely and efficiently store passwords and account details locally without third-party applications. Features a secure login authentication process with encryption and decryption to protect user credentials, plus a registration system that lets users create personalized profiles for managing their stored information. Development halted indefinitely as of May 2025.",
    note: "Cerebral was another Flask project that I made during the time of around second or third year of my college study. With a burning mind of what to build, I went and made a local password manager unique to me using the same technologies.\n\nAt that time, I had little idea about cybersecurity and how I can properly secure my application. To be fair, I was not going to deploy the application and only left it as a development stage and it never left my machine/laptop. I remember simply wanting to use more of the elements for AdminLTE and find out more about Flask - getting more and more familiar with it as days pass.\n\nThis was a project that wasn't made for any particular subject, but funnily enough, I ended up reusing the project because I had a final project which needed to use Flask (the same subject I talked earlier in ARCHiVER where we were taught web technologies). While many of my classmates were stressing out on how to build the project, I already had it lock and loaded within my folders... giving me leeway to work on other subjects, other projects outside academia, or just be able to enjoy life a little bit more relaxed.\n\nAfter several weeks of work, I ended up burning out but I was happy with what I had done since I still had engineered a feature. At that time, I was not fully reliant on LLM tooling to speed up my development so I was happy I was able to make something. While not being the most secure application, it was still an important project for me as it gave confidence that I was able to make tools that I could be able to use that only I can utilize or improve my quality of life. That being said, eventually down the line I would realize that it is also fulfilling to make projects not for myself, but for others.",
    associatedWith: ["Don Bosco Technical College, Mandaluyong"],
  },
  {
    projectId: 3,
    projectName: "Midas Financial Tracker",
    startDate: "2024-11",
    endDate: "2025-03",
    currentlyWorking: false,
    skills: [
      "REST APIs",
      "API Development",
      "Flask",
      "Python (Programming Language)",
      "Full-Stack Development",
      "React.js",
      "Bootstrap (Framework)",
      "Web Development",
      "MySQL",
      "Database Management System (DBMS)",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/03_midas/dashboard_feature.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/03_midas/login_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/03_midas/balances_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/03_midas/balances_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/03_midas/profile_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/03_midas/profile_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/03_midas/devlogs.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/03_midas/code_snippet.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A web application system integrating Flask, React.js, MySQL, and AdminLTE to help users efficiently manage day-to-day transactions, accounts, and expenditures. Built on a normalized SQL database with multiple constrained tables for secure, well-structured storage of transactions, account balances, and profile details. The React.js frontend features a dark-and-yellow color palette via AdminLTE and custom CSS, offering a seamless and highly interactive interface. Development paused in March 2025 to prioritize a more urgent academic project; also served to help the developer sharpen integration skills.",
    note: "Midas is the last of my Flask applications that I made and at that time, I was basically burning out from the continuous cycle of building and stopping and building again. At first, it was fun because it was new but now I was basically designing, building, abruptly stopping, and looking into the mistakes of the last project, before proceeding to the next one aiming to not do the mistakes of the last one... Instead of just fixing my own mistakes, and moving on to the next feature. It was foolish of me to start building based on passion and emotion rather than design documents, feature planning, task lists, HLDs & LLDs, and the like... but I (at least right now, as I write this) have learned my lesson in what is very much the hard way.\n\nDuring that time, I had been tracking my expenses using Google Sheets and manually doing the statistics - not still exposed to the idea of financial trackers for both web and mobile, to which I have within my phone. I thought it would be a brilliant idea to be able to track my own expenses in an application that I myself built, and eventually fine tune over time.\n\nSpoiler: I did not, in fact, fine tune it over time.\n\nAlthough it sparked my interest back in financial technology. My parents had worked on finance-focused businesses via their sales and marketing experience, so I was somewhat exposed to how technology and money (two of my greatest interests as well) collide and function in a wide-scale economy.\n\nThis was also one of the first projects where I was dealing with foreign keys and became more in-depth with database tables and relational data in general. Right now, it was simple, but over time as I build more and learn more I eventually improve my RDBMS technicalities. Not perfect, but improving. ",
    associatedWith: ["Don Bosco Technical College, Mandaluyong"],
  },
  {
    projectId: 4,
    projectName: "Bosledger: Accounting & Registrar System",
    startDate: "2025-09",
    endDate: "2025-10",
    currentlyWorking: false,
    skills: [
      "PostgreSQL",
      "Cloud Computing",
      "React.js",
      "Tailwind CSS",
      "User Interface Design",
      "Full-Stack Development",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/04_bosledger/landing_one.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/04_bosledger/landing_two.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/04_bosledger/landing_three.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/04_bosledger/dashboard_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/04_bosledger/students_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/04_bosledger/course_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/04_bosledger/admin_management_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/04_bosledger/role_management_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A cloud-integrated accounting and registrar system with role-based access control. Centralizes student records, enrollment status, and payment histories so students, registrars, and accounting staff can view balances, manage enrollments, and complete tasks from a single dashboard. Built-in reports and quick-action cards help resolve issues and process approvals faster, with a mobile-friendly, role-aware interface that surfaces relevant tools per user. Uses a TypeScript React frontend with a shared Supabase client for auth and data, React Query for caching, and Tailwind-based UI primitives. Architected for reuse and observability, with pages organized for easy extension.",
    note: "Bosledger was a product made by me under the initial ProtoCampus Development Group or PDG. It was made during the subject of IT272, integrating both scrum methodology and AI-generated web applications (during a time where building AI-generated applications was still in its early phase).\n\nTo give context, PDG was a 7-person team with me having the privilege of being the team leader, but since the subject valued efficiency and we had both limited time and overpopulated members, we needed to make a plan to progress while still making sure that no one gets left out. So we concocted a plan to split PDG into several departments, like how organizations do it in the industry. The departments were as follows: Boscocare (a department focused on pastoral and guidance offices of the school consisting 3 students), SDB (a department focused on the digital prospectus and the student portal of the school consisting of 3 students), and Bosledger (me, a solo department using AI agents as helpers).\n\nThe problem wasn't that there was a project involving scrum or AI-generated applications; The real problem was that it was 1 out of 3 final projects that we needed to pass for the third year in order to become fourth year students. One was a UI/UX-focused project, another was the capstone project (see Apollo), and this one.\n\nFortunately though, me and my team were able to complete the subject. While Bosledger and Boscocare had passed the standards of the professor (who had more than a decade of experience in the industry, working as a project manager in a Singaporean company at that time), SDB had logistic hurdles and communication problems which led to the department having multiple issues during the final defense. Thankfully, we were all able to graduate properly, so it just serves as a memory to tell.",
    associatedWith: [],
  },
  {
    projectId: 5,
    projectName: "Apollo: Cross-Platform Fire Emergency Response System",
    startDate: "2025-01",
    endDate: "2025-11",
    currentlyWorking: false,
    skills: [
      "React.js",
      "React Native",
      "Flask",
      "Bootstrap (Framework)",
      "MySQL",
      "GitHub",
      "TensorFlow",
      "Machine Learning",
      "Amazon Web Services (AWS)",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/05_apollo/landing_hero.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/login_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/home_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/about_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/capture_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/capture_feature_next.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/capture_feature_final.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/05_apollo/capture_feature_submitted.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/portable_crud_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/history_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/05_apollo/current_responders_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/reports_page_mobile.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/reports_media_preview.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/dashboard_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/report_map_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/05_apollo/admin_reports_management_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/05_apollo/admin_user_management_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/profile_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/media_storage_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/05_apollo/machine_learning_feature_toggle.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/server_health_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/IAM_feature.jpg",
        orientation: "portrait",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/05_apollo/code_snippet.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A real-time fire monitoring mobile application developed for Capstone Project 1 & 2, in collaboration with the Daang Bakal Fire Station at Barangay Daang Bakal. Streamlines and speeds up the fire report submission process using mobile apps, geographic information systems (GIS), machine learning models, and REST APIs powered by Flask. Aims to improve communication between civilians and responders to save time, extinguish fires earlier, and protect more people and property.",
    note: "Apollo was one of those projects which changed the entire course of my academic and professional career.\n\nThis was made in compliance to subjects Capstone Project 1 and 2, over what was nearly a year of design, development, deployment, maintenance, and several agile sprints of changing features, design choices, technologies... and having to stress out night after night after night on how to connect web development, mobile development, artificial intelligence/machine learning, cloud-native architecture, process automation, geographic information system, and more. I had a small team and had the honor of taking forefront initiative as their Capstone Leader, and they have seen so much pressure from the subject, the professors and the panelists, and the unknown that comes from building something we have no idea what would look like after a year.\n\nWe collaborated with the Daang Bakal Fire Station to obtain information on their current information systems and how they coordinate their reports. We built upon the ideas of an already existing fire emergency mobile application, existing social media pages and groups, and countless other software engineers and fellow students who have also published their work publicly on the internet.\n\nAfter nearly a year of blood, sweat, and multiple doses of caffeine, the project had granted me the opportunity to achieve many things such as being able to present during the school's Technical Research Conference 2026 as the Top 1 out of 8 Capstone groups. Quite proud of the progress and I am thankful to not only my team but also the other groups of which I had forged stronger connections with as time passed during our Capstone Projects 1 and 2. ",
    associatedWith: ["Don Bosco Technical College, Mandaluyong"],
  },
  {
    projectId: 6,
    projectName: "Estarossa",
    startDate: "2025-11",
    endDate: "2026-01",
    currentlyWorking: false,
    skills: [
      "Next.js",
      "Tailwind CSS",
      "API Development",
      "Full-Stack Development",
      "TypeScript",
      "Web Development",
      "Web Design",
      "Flask",
      "Web Applications",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_hero.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_about.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_features.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_location.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_team.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_cta.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/landing_footer.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/login_with_email.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/register_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/dashboard_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/appointments_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/patients_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/site_admin_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/settings_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/06_estarossa/code_snippet.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A casual personal project modeled after current clinic web systems, using mostly mock data. Includes JWT authorization via cookies with flask-jwt-token and role-based access control. Tailwind CSS was used to build a proper landing page and dashboard layout, alongside developing Next.js proficiency with client-side rendering for pages and server-side rendering for requests to the Flask API. Involved building a custom Flask server architecture using blueprints, monkeypatch-based automated testing, auth middleware, data encryption/decryption, and a controller object inspired by Laravel 17. The database schema experimented with separating user authentication from user details and integrating audit logs within server operations, inspired by Supabase. Discontinued due to burnout, academic/career changes, and a desire to build beyond CRUD web applications.",
    note: "",
    associatedWith: [],
  },
  {
    projectId: 7,
    projectName: "Qualisync",
    startDate: "2026-01",
    endDate: "2026-03",
    currentlyWorking: false,
    skills: [
      "GitHub",
      "Flask",
      "REST APIs",
      "MySQL",
      "Next.js",
      "Configuration Management",
      "Docker",
      "Container Orchestration",
      "pytest",
      "vitest",
      "JSON Web Token (JWT)",
      "Virtualization",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/07_qualisync/fuchsia_login_feature.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef:
          "/images/projectDemos/07_qualisync/fuchsia_register_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/thumbnail.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/docker_compose.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/docker_compose_code.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/code_snippet.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/LLD_one.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/LLD_two.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/LLD_three.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/07_qualisync/github_repository.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A full-stack DevOps and QA automation platform built to explore manual and automated QA, version control practices, development standards, virtualization, orchestration, cloud, and configuration management. Centered on Fuchsia ATMS, a fictional apartment-tenant management application with a Next.js frontend, Flask API backend, JWT authentication, and a normalized MySQL database. Used script-based linting and formatting (Black, Flake8, ESLint, Prettier) via pyproject.toml and package.json, with Pytest and Flask Test Client for API testing and Vitest for UI component/integration testing. Integrated Taskfile.yml to batch shell commands across root and service levels, and orchestrated custom Docker images per service via docker-compose.yml, including a dedicated MySQL image. Incorporated AI agent-based development using AGENTS.md and structured prompts in VS Code Copilot. Version-controlled with GitHub, including branching and workflows.",
    note: "",
    associatedWith: [],
  },
  {
    projectId: 8,
    projectName: "Deter",
    startDate: "2026-03",
    endDate: "2026-04",
    currentlyWorking: false,
    skills: [
      "GitHub",
      "Docker",
      "TypeScript",
      "MySQL",
      "Cloud Computing",
      "Virtualization",
      "Full-Stack Development",
      "Git",
      "Linux",
      "Microsoft Azure",
      "Azure DevOps Services",
      "Laravel",
      "PHP",
      "DevOps",
      "Continuous Integration and Continuous Delivery (CI/CD)",
      "Nginx",
      "Redis",
      "Containerization",
      "Networking",
      "GitHub Copilot",
    ],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/08_deter/landing_hero.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/08_deter/login_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/register_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/dashboard_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/user_view_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/new_accounts_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/risky_users.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/reset_users.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/data_control_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/cleaning_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/licenses_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/cicd_process.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/workflow_history.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/bicep_preview.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/bicep_preview_2.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/bicep_preview_3.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/github_repository.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/github_repository_readme.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/08_deter/github_repository_readme_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/08_deter/azure_resource_group.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A cloud-native Laravel analytics application and CI/CD deployment pipeline built for data automation and analytics, using a monolithic Laravel backend with a React/Inertia frontend, spanning PHP, TypeScript/React, Vite, Tailwind CSS, and Bicep Infrastructure as Code. Features a containerized architecture with multi-stage Docker builds, Docker Compose orchestration, Nginx reverse proxying, PHP-FPM, and Supervisor process management. Built an automated GitHub Actions CI/CD pipeline for Docker image builds, Azure Container Registry pushes, and continuous deployment to Azure App Service. Provisioned enterprise-grade Azure infrastructure via Bicep IaC, including App Service, Container Registry, MySQL Flexible Server, Redis Cache, Virtual Networks, and private DNS, following GitOps practices. Includes a mock analytics dashboard with statistics, paginated/filterable user tables, data cleaning utilities (department normalization, duplicate detection), and license management with upgrade recommendations. Used Composer for PHP dependencies and pnpm with workspace configuration for a monorepo frontend, plus environment-based config management, GitHub Secrets for secret injection, and container-startup database migrations.",
    note: "",
    associatedWith: [],
  },
  {
    projectId: 9,
    projectName: "Meridian Nexus",
    startDate: "2026-04",
    endDate: "2026-05",
    currentlyWorking: false,
    skills: [
      "React.js",
      "TypeScript",
      "GitHub",
      "Tailwind CSS",
      "PostgreSQL",
      "Next.js",
      "Continuous Integration and Continuous Delivery (CI/CD)",
      "YAML",
    ],
    imageRefs: [
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/polaris_talents_feature.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/09_meridian-nexus/polaris_login.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/09_meridian-nexus/polaris_register.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/polaris_email_verification.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/talent_onboarding_form.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/polaris_single_talents_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/polaris_single_talents_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/github_repository.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/github_repository_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/09_meridian-nexus/supabase_dashboard.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/09_meridian-nexus/supabase_envs.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A simulated case-study ERP system built around a mock talent agency, Meridian Nexus Group Ltd, with business requirements based on real-life data and research, solved by a fictional ERP solution called Polaris Engine. Built as a full-stack web engine on Next.js App Router with React 19, combining server-rendered routes, client UI, and API handlers in one codebase. Used Supabase (PostgreSQL, Auth, Storage) with server-side SSR clients for secure session handling. Designed a role-aware security model using PostgreSQL RLS policies across guest, talent, client, ops, finance, admin, and superadmin roles for least-privilege data access. Modeled a domain-first relational schema (profiles, talents, clients, contracts, vaults, vault files, feedback) with enums, constraints, and timestamps for data integrity, and automated lifecycle workflows via database triggers such as auto-creating contract vaults on finalization. Centralized auth flow through Next.js API routes and middleware-based route protection, with a CI/CD-ready stack via GitHub workflows and Vercel deployment hooks. Development became increasingly difficult as a solo developer working with PostgreSQL and Next.js's App Router structure, compounded by repeated Supabase rate limiting that blocked access to the app even in development, and growing friction switching between development and deployment environments.",
    note: "",
    associatedWith: [],
  },
  {
    projectId: 10,
    projectName: "Leuchtturm",
    startDate: "2026-05",
    endDate: "2026-06",
    currentlyWorking: false,
    skills: [
      "React.js",
      "Python (Programming Language)",
      "PHP",
      "Laravel",
      "TypeScript",
      "Next.js",
      "Google Gemini",
      "Retrieval-Augmented Generation (RAG)",
      "FastAPI",
      "Inertia.js",
      "Vector Databases",
      "LangChain",
      "Ollama",
    ],
    imageRefs: [
      {
        imageRef:
          "/images/projectDemos/10_leuchtturm/Screenshot 2026-05-27 185042.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef:
          "/images/projectDemos/10_leuchtturm/Screenshot 2026-05-25 230154.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/10_leuchtturm/Screenshot 2026-05-25 230216.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/10_leuchtturm/Screenshot 2026-05-25 230108.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/10_leuchtturm/Screenshot 2026-05-25 230123.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/10_leuchtturm/code_snippet.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef:
          "/images/projectDemos/10_leuchtturm/Screenshot 2026-06-15 191935.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "A RAG-based chatbot system centered on a codebase-aware AI chatbot for discourse and interaction. Includes Yellowpad, a simple customizable notepad storage app where users create notepads and add rows like checkboxes, list items, or flagged variants. Also includes Leuchtturm UI, a minimalist chat-based web application for creating conversations with the AI and sending messages or queries about Yellowpad. Designed Sumerian, a full RAG-centric pipeline covering codebase scanning, vector embedding, and text response generation, connected via a centralized FastAPI server that links the chat service to the RAG pipeline and codebase.",
    note: "Leuchtturm was a project that I wanted to be careful with. Having properly learned my lesson of not getting scoped creeped in my projects in order to properly finish building something, plus knowing that it is much better to learn slowly and understand before making a big project... I wanted to be careful in understanding what RAG systems actually are. I studied for a while before I even made a single line of code: document embeddings, chunking, ASTs, Ollama, open-source models versus API models, and the whole pipeline on a very small single-person scale.\n\nI remember having some fear or anxiety on the back of my mind considering I needed more compute power and I was risking it all on an 8GB memory laptop, additionally knowing how I don't have the best processing power too. I had to use weaker models for my inference and take advantage of the fact Gemini API did not really use my machine so I had a hybrid approach going on with my LLM models. Either way, I had learned a lot and had enjoyed my time engineering this project, plus I had learned to market myself through social media (which was somewhat of a flop).",
    associatedWith: [],
  },
  {
    projectId: 11,
    projectName: "Snapshot",
    startDate: "2026-06",
    endDate: "",
    currentlyWorking: true,
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "React.js"],
    imageRefs: [
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_hero.png",
        orientation: "landscape",
        thumbnail: true,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_about.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_experience.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_education.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_skills.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_blog.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_cta.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_dark.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_menu.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/landing_footer.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/projects_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/experience_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/experience_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/education_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/education_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/skills_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/blog_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/blog_feature_single.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/about_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/about_feature_alt.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/communeye_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
      {
        imageRef: "/images/projectDemos/11_snapshot/contact_feature.png",
        orientation: "landscape",
        thumbnail: false,
      },
    ],
    description:
      "The official web portfolio of Miguel Justin Bunda, showcasing his work, experience, education, and personal reflections on the tech industry — clean and minimal by design, but built with intention. Built with TypeScript, Next.js, Tailwind CSS, and Lucide Icons, hosted on Vercel at migueljustin.vercel.app. Features a scrollable landing page with rich visuals and interactive components, with select sections expanding into dedicated subpages, each with its own distinct design. Fully responsive across web, tablet, and mobile, with light and dark mode that automatically adapts to device settings. Includes direct links to GitHub, LinkedIn, and other contact channels.",
    note: "",
    associatedWith: [],
  },
];
