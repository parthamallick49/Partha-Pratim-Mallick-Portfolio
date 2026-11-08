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

export interface RoleItem {
  title: string;
  employmentType: string;
  date: string;
  duration?: string;
  location: string;
  locationType?: string;
  responsibilities: string[];
  skills?: string[];
}

export interface CompanyExperience {
  company: string;
  companyLogoText?: string;
  website?: string;
  totalDuration?: string;
  location: string;
  roles: RoleItem[];
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

export const COMPANY_EXPERIENCE_DATA: CompanyExperience[] = [
  {
    company: 'Grameen Communications',
    companyLogoText: 'GC',
    website: 'https://grameencommunication.org',
    totalDuration: 'Jan 2025 - Present · 1 yr+',
    location: 'Dhaka, Bangladesh',
    roles: [
      {
        title: 'Junior Software Engineer',
        employmentType: 'Full-time',
        date: 'Jul 2025 - Present',
        duration: 'Present',
        location: 'Dhaka, Bangladesh',
        locationType: 'On-site',
        responsibilities: [
          'Translating complex product requirements into performant, elegant UI flows and reactive state management architectures.',
          'Architecting and integrating REST APIs with secure data persistence using SQL Server and .NET Core.',
          'Optimizing application performance, reducing memory overhead, and improving mobile crash-free rates.',
          'Collaborating in agile sprints with cross-functional teams, QA engineers, and backend leads to ship production features.',
        ],
        skills: ['Flutter', 'Dart', '.NET Core', 'SQL Server', 'REST APIs', 'State Management', 'Mobile App Development'],
      },
      {
        title: 'Software Developer Intern',
        employmentType: 'Internship',
        date: 'Jan 2025 - Jun 2025',
        duration: '6 mos',
        location: 'Dhaka, Bangladesh',
        locationType: 'On-site',
        responsibilities: [
          'Developed native Android and cross-platform Flutter prototypes for internal and customer-facing tools.',
          'Standardized REST API endpoints and optimized relational database queries.',
          'Participated in code reviews, bug fixing, and continuous integration testing workflows.',
        ],
        skills: ['Android (Java)', 'Flutter', 'Relational Databases', 'API Integration', 'Git'],
      },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = COMPANY_EXPERIENCE_DATA[0].roles.map((r) => ({
  title: r.title,
  company: 'Grameen Communications',
  location: r.location,
  date: r.date,
  responsibilities: r.responsibilities,
}));
