import React from 'react';
import {
  IconFlutter,
  IconAndroid,
  IconJava,
  IconDotNet,
  IconPhp,
  IconExpress,
  IconMySQL,
  IconSQLServer,
  IconFirebase,
  IconMongoDB,
  IconAndroidStudio,
  IconFigma,
  IconGit,
  IconPostman,
  IconDocker,
} from '@/components/icons';

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  link?: string | null;
  statusBadge?: string;
}

export interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  date: string;
  responsibilities: string[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Mobile & Frontend',
    skills: [
      { name: 'Flutter', icon: <IconFlutter className="w-10 h-10" /> },
      { name: 'Native Android', icon: <IconAndroid className="w-10 h-10" /> },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Java', icon: <IconJava className="w-10 h-10" /> },
      { name: '.NET Core', icon: <IconDotNet className="w-10 h-10" /> },
      { name: 'PHP', icon: <IconPhp className="w-10 h-10" /> },
      { name: 'Express.js', icon: <IconExpress className="w-10 h-10" /> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: <IconMySQL className="w-10 h-10" /> },
      { name: 'SQL Server', icon: <IconSQLServer className="w-10 h-10" /> },
      { name: 'Firebase', icon: <IconFirebase className="w-10 h-10" /> },
      { name: 'MongoDB', icon: <IconMongoDB className="w-10 h-10" /> },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Android Studio', icon: <IconAndroidStudio className="w-10 h-10" /> },
      { name: 'Docker', icon: <IconDocker className="w-10 h-10" /> },
      { name: 'Git & GitHub', icon: <IconGit className="w-10 h-10" /> },
      { name: 'Postman', icon: <IconPostman className="w-10 h-10" /> },
      { name: 'Figma', icon: <IconFigma className="w-10 h-10" /> },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: 'Task Manager App',
    description: 'A full-stack task management application with robust CRUD functionality, task categorization, and seamless cloud syncing.',
    tags: ['Flutter', 'Dart', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    image: 'project-1',
    github: 'https://github.com/parthamallick49/task_manager_app',
    statusBadge: 'Open Source',
  },
  {
    title: 'Nobin EP App',
    description: 'Enterprise mobile platform for Nobin Equity Program members providing secure authentication, live financial dashboards, and portfolio monitoring.',
    tags: ['.NET Core', 'Flutter', 'SQL Server', 'REST API'],
    image: 'project-2',
    github: 'https://github.com/parthamallick49/nobin-ep-mobile-app',
    statusBadge: 'Enterprise / Private',
  },
  {
    title: 'AgriMan',
    description: 'Agricultural management system empowering farmers, buyers, and sellers with real-time market data, inventory tracking, and crop management.',
    tags: ['Android (Java)', 'Firebase', 'Mobile UI'],
    image: 'project-3',
    github: 'https://github.com/parthamallick49/AgriMan',
    statusBadge: 'Open Source',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: 'Junior Software Engineer',
    company: 'Grameen Communications',
    location: 'Dhaka, Bangladesh',
    date: 'July 2025 - Present',
    responsibilities: [
      'Translating complex product requirements into performant, elegant UI flows and reactive state management architectures.',
      'Architecting and integrating REST APIs with secure data persistence using SQL Server and .NET Core.',
      'Optimizing application performance, reducing memory overhead, and improving mobile crash-free rates.',
      'Collaborating in agile sprints with cross-functional teams, QA engineers, and backend leads to ship production features.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'Grameen Communications',
    location: 'Dhaka, Bangladesh',
    date: 'January 2025 - June 2025',
    responsibilities: [
      'Developed native Android and cross-platform Flutter prototypes for internal and customer-facing tools.',
      'Standardized REST API endpoints and optimized relational database queries.',
      'Participated in code reviews, bug fixing, and continuous integration testing workflows.',
    ],
  },
];
