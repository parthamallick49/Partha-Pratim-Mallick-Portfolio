import React, { type ReactNode } from 'react';
import Image from 'next/image';

export interface PersonalInfo {
  name: string;
  pronouns: string;
  role: string;
  tagline: string;
  subheadline: string;
  location: string;
  timezone: string;
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  status: string;
  availability: string;
  summary: string;
  mission: string;
  stats: { label: string; value: string; detail: string }[];
}

export const PERSONAL_DATA: PersonalInfo = {
  name: 'Partha Pratim Mallick',
  pronouns: 'he/him',
  role: 'Software Engineer & Mobile App Developer',
  tagline: 'Crafting resilient mobile experiences and scalable backend architectures.',
  subheadline: 'Junior Software Engineer at Grameen Communications specializing in Flutter, Java, .NET Core, and distributed REST services.',
  location: 'Dhaka, Bangladesh',
  timezone: 'GMT+6 (BST)',
  email: 'parthamallick.cs@gmail.com',
  github: 'https://github.com/parthamallick49',
  linkedin: 'https://www.linkedin.com/in/parthamalllick/',
  cvUrl: '/Partha-Pratim-Mallick-CV.pdf',
  status: 'Available for new opportunities',
  availability: 'Open for full-time roles & engineering collaborations',
  summary: 'I bring an end-to-end product focus, translating UX designs into performant mobile features and connecting them to robust backend services. I excel in cross-functional teamwork, collaborating with product designers, QA, and backend engineers to ship stable production releases.',
  mission: "My mission is to architect maintainable, human-centered software systems. With hands-on proficiency across Flutter/Dart, Java, and .NET Core, I design clean API boundaries, optimize state machines, and ensure seamless data persistence across SQL Server, MySQL, and MongoDB.",
  stats: [
    { label: 'Industry Experience', value: '1.5+ yrs', detail: 'Mobile & enterprise software' },
    { label: 'Production Projects', value: '7+', detail: 'Enterprise & open-source' },
    { label: 'Core Technologies', value: '14+', detail: 'Cross-platform, native & cloud' },
    { label: 'Code Craft', value: 'Clean Arch', detail: 'BLoC, MVVM, SOLID, Repository' },
  ],
};

export interface SkillItem {
  name: string;
  category: string;
  proficiency: 'Advanced' | 'Intermediate' | 'Core';
  iconSrc?: string;
  badge: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    id: 'mobile-frontend',
    title: 'Mobile & Frontend',
    description: 'Cross-platform and native client engineering with reactive state management.',
    skills: [
      { name: 'Flutter', category: 'mobile-frontend', proficiency: 'Advanced', badge: 'Cross-Platform', iconSrc: 'https://skills.syvixor.com/api/icons?i=flutter' },
      { name: 'Dart', category: 'mobile-frontend', proficiency: 'Advanced', badge: 'Language', iconSrc: 'https://skills.syvixor.com/api/icons?i=dart' },
      { name: 'Native Android', category: 'mobile-frontend', proficiency: 'Intermediate', badge: 'Mobile OS', iconSrc: 'https://skills.syvixor.com/api/icons?perline=15&i=android' },
      { name: 'Java (Android)', category: 'mobile-frontend', proficiency: 'Advanced', badge: 'Mobile SDK', iconSrc: 'https://skills.syvixor.com/api/icons?i=java' },
      { name: 'React / Next.js', category: 'mobile-frontend', proficiency: 'Intermediate', badge: 'Web UI', iconSrc: 'https://skills.syvixor.com/api/icons?i=react' },
      { name: 'Tailwind CSS', category: 'mobile-frontend', proficiency: 'Advanced', badge: 'Styling', iconSrc: 'https://skills.syvixor.com/api/icons?i=tailwind' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    description: 'Resilient web services, business logic engines, and RESTful contract implementations.',
    skills: [
      { name: 'Java', category: 'backend', proficiency: 'Advanced', badge: 'Enterprise', iconSrc: 'https://skills.syvixor.com/api/icons?i=java' },
      { name: '.NET Core', category: 'backend', proficiency: 'Advanced', badge: 'Framework', iconSrc: 'https://skills.syvixor.com/api/icons?i=dotnet' },
      { name: 'Node.js / Express', category: 'backend', proficiency: 'Intermediate', badge: 'Runtime', iconSrc: 'https://skills.syvixor.com/api/icons?i=express' },
      { name: 'PHP', category: 'backend', proficiency: 'Intermediate', badge: 'Web Backend', iconSrc: 'https://skills.syvixor.com/api/icons?perline=15&i=php' },
      { name: 'RESTful API Design', category: 'backend', proficiency: 'Advanced', badge: 'Architecture', iconSrc: 'https://skills.syvixor.com/api/icons?i=postman' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Cloud',
    description: 'Relational data modeling, schema optimization, and NoSQL real-time synchronization.',
    skills: [
      { name: 'SQL Server', category: 'databases', proficiency: 'Advanced', badge: 'Relational RDBMS', iconSrc: 'https://skills.syvixor.com/api/icons?i=sqlserver' },
      { name: 'MySQL', category: 'databases', proficiency: 'Advanced', badge: 'Relational RDBMS', iconSrc: 'https://skills.syvixor.com/api/icons?perline=15&i=mysql' },
      { name: 'MongoDB', category: 'databases', proficiency: 'Intermediate', badge: 'Document Store', iconSrc: 'https://skills.syvixor.com/api/icons?i=mongodb' },
      { name: 'Firebase', category: 'databases', proficiency: 'Advanced', badge: 'BaaS & Auth', iconSrc: 'https://skills.syvixor.com/api/icons?i=firebase' },
    ],
  },
  {
    id: 'tools-devops',
    title: 'Tools & DevOps',
    description: 'Toolchains, containerization, collaborative version control, and design handoffs.',
    skills: [
      { name: 'Docker', category: 'tools-devops', proficiency: 'Intermediate', badge: 'Containers', iconSrc: 'https://skills.syvixor.com/api/icons?perline=15&i=docker' },
      { name: 'Git & GitHub', category: 'tools-devops', proficiency: 'Advanced', badge: 'VCS', iconSrc: 'https://skills.syvixor.com/api/icons?i=git' },
      { name: 'Android Studio', category: 'tools-devops', proficiency: 'Advanced', badge: 'IDE', iconSrc: 'https://skills.syvixor.com/api/icons?perline=15&i=androidstudio' },
      { name: 'Postman', category: 'tools-devops', proficiency: 'Advanced', badge: 'API Testing', iconSrc: 'https://skills.syvixor.com/api/icons?perline=15&i=postman' },
      { name: 'Figma', category: 'tools-devops', proficiency: 'Intermediate', badge: 'UI/UX Specs', iconSrc: 'https://skills.syvixor.com/api/icons?i=figma' },
    ],
  },
];

// Preserving legacy SKILLS_DATA shape for backward compatibility
export const SKILLS_DATA = SKILLS_CATEGORIES.map(category => ({
  title: category.title,
  skills: category.skills.map(s => ({
    name: s.name,
    icon: s.iconSrc ? (
      <Image src={s.iconSrc} alt={s.name} width={40} height={40} unoptimized />
    ) : (
      <span className="font-mono text-xs">{s.name[0]}</span>
    ),
  })),
}));

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Mobile' | 'Full Stack' | 'Enterprise';
  subtitle: string;
  description: string;
  architectureNotes: string;
  keyFeatures: string[];
  tags: string[];
  image: string;
  link: string;
  github: string;
  featured: boolean;
  version: string;
  year: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'task-manager-app',
    title: 'Task Manager App',
    category: 'Full Stack',
    subtitle: 'Cross-platform reactive productivity platform with Dockerized Express backend',
    description: 'A full-stack task management application with real-time CRUD lifecycle, JWT authentication, and responsive state synchronization across devices.',
    architectureNotes: 'Engineered clean layered architecture separating presentation (Flutter BLoC/Provider), business validation services, and a containerized Node.js REST API with MongoDB ODM layer.',
    keyFeatures: [
      'Complete CRUD lifecycle for nested tasks & status states',
      'Containerized deployment using Docker for zero-setup environment reproduction',
      'REST API with token-based authorization and input validation',
      'Smooth optimistic UI updates with offline local caching fallback',
    ],
    tags: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'REST API'],
    image: 'project-1',
    link: 'https://github.com/parthamallick49/task_manager_app',
    github: 'https://github.com/parthamallick49/task_manager_app',
    featured: true,
    version: 'v1.4.0',
    year: '2024',
  },
  {
    id: 'nobin-ep-app',
    title: 'Nobin EP Mobile App',
    category: 'Enterprise',
    subtitle: 'Financial equity monitoring & live analytics client for Nobin Equity Program members',
    description: 'Enterprise mobile platform for Nobin Equity Program stakeholders to monitor live business metrics, balance accounts, and transaction records securely in real time.',
    architectureNotes: 'Integrated with an enterprise .NET Core backend microservices layer and Microsoft SQL Server. Implemented rigorous data protection policies, session handling, and high-performance list virtualization.',
    keyFeatures: [
      'Real-time financial status tracking & portfolio analytics',
      'Enterprise authentication and token renewal cycles',
      'Synchronized with Microsoft SQL Server through high-throughput .NET Core endpoints',
      'Secure credential storage and encrypted local state management',
    ],
    tags: ['.NET Core', 'Flutter', 'SQL Server', 'REST API', 'C#', 'State Management'],
    image: 'project-2',
    link: 'https://github.com/parthamallick49/nobin-ep-mobile-app',
    github: 'https://github.com/parthamallick49/nobin-ep-mobile-app',
    featured: true,
    version: 'v2.1.0',
    year: '2024–2025',
  },
  {
    id: 'agriman-app',
    title: 'AgriMan — Agricultural Ecosystem',
    category: 'Mobile',
    subtitle: 'Native Android agricultural management and marketplace system powered by Firebase',
    description: 'AgriMan is an intuitive Agricultural Management System engineered to empower farmers, sellers, and agricultural buyers with real-time access to market pricing, inventory forecasting, and harvest advisory.',
    architectureNotes: 'Constructed natively in Java for Android using the Repository Pattern, Firebase Realtime Database / Firestore, and Firebase Authentication with zero cold-start latency.',
    keyFeatures: [
      'Farmer-to-buyer direct communication and listing portal',
      'Real-time cloud database syncing with Firebase backend',
      'Accessible UI layout optimized for diverse literacy and device performance tiers',
      'Offline data caching for intermittent rural connectivity',
    ],
    tags: ['Android (Java)', 'Firebase', 'Mobile Architecture', 'Material Design', 'Offline Sync'],
    image: 'project-3',
    link: 'https://github.com/parthamallick49/AgriMan',
    github: 'https://github.com/parthamallick49/AgriMan',
    featured: true,
    version: 'v1.1.2',
    year: '2023',
  },
];

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  type: string;
  date: string;
  badge: string;
  responsibilities: string[];
  technologies: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: 'Junior Software Engineer',
    company: 'Grameen Communications',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    date: 'July 2025 – Present',
    badge: 'Current Role',
    responsibilities: [
      'Translating complex product requirements into performant UI architectures and scalable state management flows in Flutter and native platforms.',
      'Integrating robust enterprise REST APIs and implementing high-throughput relational data persistence using Microsoft SQL Server.',
      'Conducting performance profiling to eliminate UI jank, reduce memory footprints, and improve cold-start load times.',
      'Collaborating closely with product managers, QA analysts, and infrastructure engineers in agile sprint cycles.',
    ],
    technologies: ['Flutter', 'Dart', '.NET Core', 'SQL Server', 'REST APIs', 'Git'],
  },
  {
    title: 'Software Developer Intern',
    company: 'Grameen Communications',
    location: 'Dhaka, Bangladesh',
    type: 'Internship',
    date: 'January 2025 – June 2025',
    badge: 'Completed',
    responsibilities: [
      'Engineered functional prototype modules and UI components using Flutter and Java.',
      'Refactored legacy database queries and standardized API request/response interceptors.',
      'Participated in cross-functional standups, code reviews, and production release validation.',
    ],
    technologies: ['Flutter', 'Java', 'Android SDK', 'SQL', 'Postman'],
  },
];

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  date: string;
  score: string;
  scoreLabel: string;
  field: string;
  highlights: string[];
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'B.Sc. in Computer Science and Engineering (CSE)',
    institution: 'Daffodil International University (DIU)',
    location: 'Ashulia, Dhaka, Bangladesh',
    date: '2020 – 2024',
    score: '3.53',
    scoreLabel: 'CGPA',
    field: 'Computer Science & Software Engineering',
    highlights: [
      'Graduated with honors focusing on Software Engineering, Mobile Systems, and Database Management.',
      'Capstone Project focused on cross-platform mobile solutions with cloud-backed persistence.',
      'Active participant in university programming labs and tech colloquiums.',
    ],
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Keshabpur Government Degree College',
    location: 'Keshabpur, Jashore, Bangladesh',
    date: '2017 – 2019',
    score: '3.82',
    scoreLabel: 'GPA',
    field: 'Science Group',
    highlights: ['Core curriculum in Higher Mathematics, Physics, Chemistry, and Information Technology.'],
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Keshabpur Government Pilot Secondary School',
    location: 'Keshabpur, Jashore, Bangladesh',
    date: '2015 – 2017',
    score: '4.57',
    scoreLabel: 'GPA',
    field: 'Science Group',
    highlights: ['Graduated with distinction in general science and analytical mathematics.'],
  },
];

export interface ClaudeAssistantQuery {
  id: string;
  chipLabel: string;
  query: string;
  targetSectionId: string;
  responseHeadline: string;
  responseParagraph: string;
  bulletPoints: string[];
  ctaLabel: string;
}

export const CLAUDE_HERO_PROMPTS: ClaudeAssistantQuery[] = [
  {
    id: 'projects',
    chipLabel: '✦ View Featured Projects',
    query: 'Show me Partha’s featured production and open-source projects',
    targetSectionId: 'projects',
    responseHeadline: 'Featured Mobile & Full-Stack Projects',
    responseParagraph: 'Partha has engineered diverse client-facing applications ranging from enterprise equity monitors to full-stack productivity platforms and rural agricultural ecosystems:',
    bulletPoints: [
      'Task Manager App: Cross-platform Flutter + Dockerized Node/Express & MongoDB stack.',
      'Nobin EP Mobile App: Enterprise equity analytics with .NET Core & SQL Server.',
      'AgriMan: Native Android (Java) platform with real-time Firebase syncing.',
    ],
    ctaLabel: 'Inspect Projects Artifacts ↓',
  },
  {
    id: 'stack',
    chipLabel: '⚡ Explore Tech Stack',
    query: 'What technologies and frameworks does Partha specialize in?',
    targetSectionId: 'skills',
    responseHeadline: 'Core Engineering Competencies',
    responseParagraph: 'Partha’s skill graph bridges client-side mobile mastery with enterprise backend robustness:',
    bulletPoints: [
      'Mobile: Flutter (BLoC, Provider), Dart, Native Android (Java), Responsive UI.',
      'Backend: .NET Core, Java, Express.js, PHP, RESTful Architecture.',
      'Databases: Microsoft SQL Server, MySQL, MongoDB, Firebase.',
      'DevOps & Tools: Docker, Git/GitHub, Android Studio, Postman, Figma.',
    ],
    ctaLabel: 'Browse Interactive Skills Bento ↓',
  },
  {
    id: 'experience',
    chipLabel: '💼 Experience Summary',
    query: 'What is Partha’s professional software engineering background?',
    targetSectionId: 'experience',
    responseHeadline: 'Professional Background at Grameen Communications',
    responseParagraph: 'Currently serving as Junior Software Engineer at Grameen Communications in Dhaka, Partha has over 1.5 years of focused software delivery experience:',
    bulletPoints: [
      'Junior Software Engineer (July 2025 – Present): Architecting production Flutter UI flows and .NET/SQL backend integrations.',
      'Software Developer Intern (Jan 2025 – June 2025): Prototyping mobile modules and refactoring database query pipelines.',
      'Academic Foundation: B.Sc. in CSE from Daffodil International University (CGPA 3.53).',
    ],
    ctaLabel: 'View Experience & Education Timeline ↓',
  },
  {
    id: 'contact',
    chipLabel: '✉️ Contact & Collaboration',
    query: 'How can I connect, hire, or collaborate with Partha?',
    targetSectionId: 'contact',
    responseHeadline: 'Get in Touch with Partha',
    responseParagraph: 'Partha is actively open to new engineering opportunities, full-time engineering roles, and innovative technical projects:',
    bulletPoints: [
      'Email: parthamallick.cs@gmail.com (one-click copy available)',
      'LinkedIn: linkedin.com/in/parthamalllick',
      'GitHub: github.com/parthamallick49',
      'Location: Dhaka, Bangladesh (available for remote & on-site engagements)',
    ],
    ctaLabel: 'Open Direct Message Form ↓',
  },
];
