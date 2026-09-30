// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Rajan Mishra",
  firstName: "Rajan",
  role: "Full-Stack Developer",
  tagline:
    "Building scalable, modern web applications with a focus on great user experiences and practical solutions.",
  about: [
    "I'm a Full-Stack Developer and Computer Science graduate from Chandigarh University, with hands-on experience building modern web applications using React, Next.js, Node.js, TypeScript, and databases such as MongoDB, MySQL, and PostgreSQL.",
    "I enjoy turning real-world problems into clean, scalable, and user-friendly products — from business platforms and school management systems to AI-powered developer tools.",
    "I'm particularly interested in building products end-to-end: from designing the user experience and APIs to deployment and production optimization.",
  ],
  email: "rm347711@gmail.com",
  github: "https://github.com/Rajanmishra321",
  linkedin: "https://www.linkedin.com/in/rajan-mishra-6699a324a/",
  // Drop your resume at public/resume.pdf
  resume: "/resume.pdf",
  // Profile photo shown in About. Add a square image to public/ (e.g. public/me.jpg) and set "/me.jpg".
  photo: "/me.jpg" as string | undefined,
};

export const highlights = [
  { value: "4", label: "Projects shipped" },
  { value: "3", label: "Client projects" },
  { value: "3", label: "Certifications" },
];

export const skillGroups = [
  { name: "Languages", items: ["JavaScript", "TypeScript", "Java", "C++", "HTML", "CSS", "SQL"] },
  { name: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "shadcn/ui", "Redux"] },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Prisma", "Redis"],
  },
  { name: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL", "Supabase", "Firebase"] },
  { name: "Tools", items: ["Git", "GitHub", "Vercel", "Playwright", "Postman"] },
  {
    name: "Core Concepts",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Agile Methodologies"],
  },
  {
    name: "Other",
    items: [
      "Google Gemini API",
      "WebContainer",
      "Responsive Design",
      "API Integration",
      "Auth & Authorization",
      "Deployment & Hosting",
    ],
  },
];

export type CaseStudy = {
  summary: string;
  role: string;
  period?: string;
  status: string;
  problem: string;
  roleDetail: string;
  contributions: string[];
  challenges: string[];
  results: string;
  modules?: string[];
  stack: string[];
};

export type Project = {
  // Needed for projects with a case study — becomes the URL: /projects/<slug>
  slug?: string;
  title: string;
  description: string;
  tech: string[];
  live?: string;
  code?: string;
  // Optional screenshot, e.g. "/projects/roulocal.png" (put the file in public/projects/)
  image?: string;
  highlights?: string[];
  tag?: string;
  caseStudy?: CaseStudy;
};

export const featuredProject: Project = {
  title: "Roulocal",
  tag: "Client project · France",
  description:
    "A platform built for a French client to help manage and connect local businesses and partners. I improved the core platform and built the administrative and partner-facing portals, with features focused on managing business data and workflows.",
  highlights: [
    "Admin and Partner portals for event & partner management",
    "PDF and CSV export for reporting and data management",
    "Automated end-to-end tests with Playwright",
  ],
  tech: ["TypeScript", "React.js", "Firebase", "Playwright"],
  live: "https://roulocal.re/",
  image: "/projects/roulocal.png",
  slug: "roulocal",
  caseStudy: {
    summary:
      "Improving a French platform that connects local businesses and partners — with dedicated admin and partner portals, data export, and automated end-to-end testing.",
    role: "Full-Stack Developer (Freelance)",
    period: "2025",
    status: "Delivered",
    problem:
      "Roulocal needed improvements to its web platform to better support local businesses and partners. The existing workflows needed a more structured and user-friendly experience — particularly around managing business information and giving different types of users their own dedicated interfaces.",
    roleDetail:
      "I worked remotely as a Full-Stack Developer, improving the existing platform, building frontend functionality with TypeScript and React, working with Firebase for backend services and data, and creating the administrative and partner-facing workflows. I also used Playwright to test critical user flows.",
    contributions: [
      "Built Admin and Partner portals for event and partner management using TypeScript and React",
      "Implemented PDF and CSV export to simplify reporting and data management",
      "Worked with Firebase for backend services and data",
      "Wrote automated end-to-end tests with Playwright to validate critical workflows",
    ],
    challenges: [
      "Understanding and working within an existing codebase",
      "Building features for different user roles and workflows",
      "Keeping the interface responsive and easy to use",
      "Managing frontend and backend integration",
      "Ensuring changes didn't break existing functionality",
      "Testing important user flows reliably",
    ],
    results:
      "The platform gained a more structured experience for administrators and partners, along with enhanced workflows and functionality. The work resulted in a more maintainable and user-friendly application that better supports the client's business requirements.",
    stack: ["TypeScript", "React.js", "Firebase", "Playwright"],
  },
};

export const projects: Project[] = [
  {
    title: "AI Software Engineer",
    tag: "AI · Developer tool",
    description:
      "An AI-powered developer platform that assists with software development tasks, combining Google Gemini with an in-browser development environment to generate and run code.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "Redis", "JWT", "WebContainer"],
    code: "https://github.com/Rajanmishra321/Software_Engineer_ai",
    image: "/projects/ai-software-engineer.png",
  },
  {
    title: "School IMS & LMS",
    tag: "Client project · Dynamic Academy of Science",
    description:
      "A school management and learning platform with dedicated roles for Principal, Teacher, Accountant, Student and Parent — covering attendance, assignments, tests, marks, fees, announcements and performance, with AI doubt resolution planned.",
    tech: ["Next.js", "TypeScript", "Redux", "shadcn/ui", "Prisma", "PostgreSQL", "Supabase", "Razorpay", "Playwright"],
    image: "/projects/school-ims.png",
    slug: "school-ims-lms",
    caseStudy: {
      summary:
        "A centralized, role-based platform that brings a school's academic and administrative work — attendance, assignments, tests, marks, fees and announcements — into one place.",
      role: "Full-Stack Developer",
      status: "In production · actively developed",
      problem:
        "Schools often manage attendance, assignments, tests, marks, fees, announcements and student information through disconnected processes. The goal was a centralized platform where administrators, teachers, students, parents and accountants can manage and access exactly the information relevant to their role.",
      roleDetail:
        "I designed and developed the platform end-to-end — frontend, backend, database architecture, authentication, APIs and deployment — including role-based workflows for the Principal, Teacher, Class Teacher, Accountant, Student and Parent portals.",
      contributions: [
        "Designed role-based workflows and permissions for six different portals",
        "Architected a modular database with Prisma and PostgreSQL on Supabase",
        "Built secure authentication and authorization across all roles",
        "Connected frontend features to backend APIs and database operations",
        "Structured the IMS so the LMS layer can be built on top of it",
      ],
      challenges: [
        "Designing a database structure that supports many school modules",
        "Managing different permissions and workflows for multiple user roles",
        "Designing attendance, assignment, test, marks and performance workflows",
        "Maintaining data consistency across related academic modules",
        "Integrating authentication and authorization securely",
        "Managing development and production database environments",
      ],
      results:
        "The project became a modular school management platform covering core academic and administrative workflows. The IMS provides the foundation for attendance, assignments, tests, marks, announcements, student management and fees — while the LMS layer extends it with study materials, performance insights and AI-powered doubt resolution.",
      modules: [
        "Principal Portal",
        "Teacher Portal",
        "Class Teacher Portal",
        "Accountant Portal",
        "Student Portal",
        "Parent Portal",
        "Attendance Management",
        "Assignment Management",
        "Tests & Marks",
        "Announcements",
        "Student Performance",
        "Fee Management",
        "LMS / Study Materials",
        "AI Doubt Resolution",
      ],
      stack: [
        "Next.js",
        "React.js",
        "TypeScript",
        "Redux",
        "Tailwind CSS",
        "shadcn/ui",
        "Node.js",
        "Prisma",
        "PostgreSQL",
        "Supabase",
        "Playwright",
        "Razorpay",
      ],
    },
  },
  {
    title: "Dynamic Academy of Science",
    tag: "Client website",
    description:
      "A modern school website and management platform with a secure admin system powered by Firebase Authentication and a Firebase backend.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase", "Firebase Auth"],
    live: "https://dynamicacademyofscience.com/",
    image: "/projects/das.png",
  },
];

export const currentlyLearning = ["Java"];

// Projects that have a full case study page.
export const caseStudies = [featuredProject, ...projects].filter(
  (p): p is Project & { slug: string; caseStudy: CaseStudy } => Boolean(p.slug && p.caseStudy)
);

export const journey = [
  {
    kind: "Experience",
    title: "Full-Stack Developer",
    place: "Freelance · Remote",
    period: "2025",
    detail:
      "Working with international clients, including the Roulocal platform — developing and improving application features, integrating services, and working across frontend and backend.",
  },
  {
    kind: "Hackathon",
    title: "Team Lead",
    place: "Smart India Hackathon",
    period: "",
    detail:
      "Led a team through multiple rounds of the Smart India Hackathon, reaching the third round while building a technology-driven solution together.",
  },
  {
    kind: "Education",
    title: "B.E. in Computer Science",
    place: "Chandigarh University",
    period: "2022 – 2026",
    detail: "Graduated in Computer Science and Engineering with a CGPA of 7.65.",
  },
];

export const certifications = [
  { title: "MERN Stack Development", issuer: "100xDevs", year: "2024" },
  { title: "Cloud Computing", issuer: "NPTEL", year: "2023" },
  { title: "Multi-Core Computer Architecture", issuer: "NPTEL", year: "2022" },
];
