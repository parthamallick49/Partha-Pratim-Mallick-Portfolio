export interface StationInfo {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  badge: string;
  altitude: string;
  mileMarker: string;
  sceneryType: 'terminal' | 'switchyard' | 'suspension-bridge' | 'mountain-pass' | 'summit' | 'coastal-lighthouse';
}

export interface TechSkill {
  name: string;
  iconId: string;
  category?: 'mobile-frontend' | 'backend-api' | 'db-cloud' | 'tools-devops';
  badge: string;
  officialColor: string;
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  year: string;
  subtitle: string;
  overview: string;
  image?: string;
  cloneCommand: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  keyFeatures: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  timeline: string;
  location: string;
  status?: string;
  keyImpact: string[];
}

export interface EducationData {
  degree: string;
  institution: string;
  timeline: string;
  focus: string;
  grade?: string;
}

export const STATIONS: StationInfo[] = [
  {
    id: 'station-1',
    number: '01',
    name: 'Grand Central Terminal',
    subtitle: 'Departure & Passenger Dossier',
    badge: 'Origin Platform',
    altitude: '12m ASL',
    mileMarker: 'MP 00.0',
    sceneryType: 'terminal',
  },
  {
    id: 'station-2',
    number: '02',
    name: 'The Foundry & Switchyard',
    subtitle: 'Technical Stacks & Cargo Gantry',
    badge: 'Industrial Junction',
    altitude: '240m ASL',
    mileMarker: 'MP 14.8',
    sceneryType: 'switchyard',
  },
  {
    id: 'station-3',
    number: '03',
    name: 'Innovation Valley Suspension Bridge',
    subtitle: 'Featured Projects & Production Spans',
    badge: 'Canyon Viaduct',
    altitude: '680m ASL',
    mileMarker: 'MP 32.4',
    sceneryType: 'suspension-bridge',
  },
  {
    id: 'station-4',
    number: '04',
    name: 'The Mountain Pass',
    subtitle: 'Professional Milestones & Engineering Impact',
    badge: 'Alpine Switchback',
    altitude: '1,120m ASL',
    mileMarker: 'MP 56.1',
    sceneryType: 'mountain-pass',
  },
  {
    id: 'station-5',
    number: '05',
    name: 'The Summit Observatory',
    subtitle: 'Academic Foundations & Research',
    badge: 'Crest Station',
    altitude: '1,640m ASL',
    mileMarker: 'MP 78.5',
    sceneryType: 'summit',
  },
  {
    id: 'station-6',
    number: '06',
    name: 'Dhaka Coastal Pier & Telegraph',
    subtitle: 'Telegraph Dispatch & Synchronized Telemetry',
    badge: 'Terminal Pier',
    altitude: '4m ASL',
    mileMarker: 'MP 99.9',
    sceneryType: 'coastal-lighthouse',
  },
];

export const BIOGRAPHY = {
  name: 'Partha Pratim Mallick',
  headline: 'Software Engineer & Mobile Developer',
  company: 'Grameen Communications',
  stationMasterTitle: 'Chief Locomotive Engineer & System Architect',
  location: 'Dhaka, Bangladesh',
  coordinates: '23.8103° N, 90.4125° E',
  timezone: 'Asia/Dhaka',
  utcOffsetHours: 6,
  summary:
    'Results-driven Software Engineer specializing in cross-platform mobile architecture (Flutter, Native Android) and scalable enterprise backends (.NET Core, SQL Server, FastAPI). Passionate about zero-jank UI performance, offline-first resilience, and clean architecture.',
  photoUrl: '/assets/profile-photo.jpg',
  fallbackPhotoUrl: '/assets/profile.jpg',
  resumeUrl: '/assets/Partha_Pratim_Mallick_Resume.pdf',
  ticketNumber: 'TKT-BD-2026-PPM',
  trainNumber: 'EXP-6000 "SUNDARBAN RUNNER"',
};

export const TECH_TRACKS = [
  {
    id: 'mobile-frontend',
    title: 'Mobile & Client Architecture',
    trackName: 'Track 1 — Rolling Stock UI',
    skills: [
      { name: 'Flutter', iconId: 'flutter', officialColor: '#02569B', badge: 'Cross-Platform', description: 'Declarative UI, BLoC, custom render boxes, offline cache' },
      { name: 'Dart', iconId: 'dart', officialColor: '#0175C2', badge: 'Language', description: 'Sound null-safety, isolates, asynchronous event streams' },
      { name: 'Native Android', iconId: 'android', officialColor: '#3DDC84', badge: 'Mobile OS', description: 'Java/Kotlin runtime, services, broadcast receivers' },
      { name: 'Java', iconId: 'java', officialColor: '#EA2D2E', badge: 'Language', description: 'Object-oriented patterns, multithreading, enterprise Android' },
      { name: 'React / Next.js', iconId: 'react', officialColor: '#61DAFB', badge: 'Web UI', description: 'SSR, App Router, Tailwind design systems' },
    ],
  },
  {
    id: 'backend-api',
    title: 'Backend Services & Enterprise APIs',
    trackName: 'Track 2 — Heavy Traction Engines',
    skills: [
      { name: '.NET Core', iconId: 'dotnet', officialColor: '#512BD4', badge: 'Enterprise Framework', description: 'High-throughput Web APIs, EF Core, dependency injection' },
      { name: 'Java Spring', iconId: 'java', officialColor: '#6DB33F', badge: 'Backend', description: 'Enterprise service layer, secure authentication' },
      { name: 'REST APIs', iconId: 'api', officialColor: '#2F6F6D', badge: 'Architecture', description: 'Contract design, OpenAPI, rate-limiting, idempotency' },
      { name: 'FastAPI / Python', iconId: 'python', officialColor: '#3776AB', badge: 'Microservices', description: 'Asynchronous vision endpoints, AI service ingestion' },
    ],
  },
  {
    id: 'db-cloud',
    title: 'Databases & Cloud Infrastructure',
    trackName: 'Track 3 — Fuel & Storage Depot',
    skills: [
      { name: 'MS SQL Server', iconId: 'sqlserver', officialColor: '#CC292B', badge: 'Enterprise RDBMS', description: 'Stored procedures, execution plan tuning, transactions' },
      { name: 'MySQL', iconId: 'mysql', officialColor: '#4479A1', badge: 'RDBMS', description: 'Relational indexing, connection pooling, schema migration' },
      { name: 'MongoDB', iconId: 'mongodb', officialColor: '#47A248', badge: 'NoSQL', description: 'Document schemas, aggregation pipelines, caching' },
      { name: 'Firebase', iconId: 'firebase', officialColor: '#FFCA28', badge: 'Cloud BaaS', description: 'Realtime database, Cloud Firestore, Firebase Auth' },
      { name: 'PostgreSQL', iconId: 'postgresql', officialColor: '#4169E1', badge: 'RDBMS', description: 'Relational constraints, JSONB operators, Supabase' },
    ],
  },
  {
    id: 'tools-devops',
    title: 'Tooling, CI/CD & Design Systems',
    trackName: 'Track 4 — Maintenance Shed',
    skills: [
      { name: 'Docker', iconId: 'docker', officialColor: '#2496ED', badge: 'Containers', description: 'Multi-stage builds, container virtualization, compose' },
      { name: 'Git & GitHub', iconId: 'git', officialColor: '#F05032', badge: 'VCS & CI', description: 'Branch management, pull-request reviews, GitHub Actions' },
      { name: 'Android Studio', iconId: 'androidstudio', officialColor: '#3DDC84', badge: 'IDE', description: 'Memory profiler, layout inspector, APK optimization' },
      { name: 'Postman', iconId: 'postman', officialColor: '#FF6C37', badge: 'API Testing', description: 'Automated test collections, environment mock servers' },
      { name: 'Figma', iconId: 'figma', officialColor: '#F24E1E', badge: 'UI/UX', description: 'Design tokens, auto-layout handoffs, interactive prototypes' },
    ],
  },
];

export const PROJECTS: ProjectData[] = [
  {
    id: 'task-manager-app',
    title: 'Task Manager App',
    year: '2024',
    subtitle: 'Containerized Full-Stack Mobile Productivity Engine',
    overview:
      'A full-stack task management application with real-time CRUD lifecycle, JWT authentication, and responsive state synchronization across devices.',
    image: '/assets/task-manager-login-portrait.png',
    cloneCommand: 'git clone https://github.com/parthamallick49/task_manager_app.git',
    githubUrl: 'https://github.com/parthamallick49/task_manager_app',
    techStack: ['Flutter', 'Node.js', 'MongoDB', 'Docker', 'REST API'],
    keyFeatures: [
      'Complete CRUD lifecycle for nested tasks & status states.',
      'Containerized deployment using Docker for zero-setup environment reproduction.',
      'REST API with token-based authorization and input validation.',
      'Smooth optimistic UI updates with offline local caching fallback.',
    ],
  },
  {
    id: 'nobin-ep-mobile-app',
    title: 'Nobin EP Mobile App',
    year: '2025',
    subtitle: 'Enterprise Micro-Fintech & Portfolio Analytics',
    overview:
      'Integrated with an enterprise .NET Core backend and Microsoft SQL Server. Implemented rigorous data protection policies, session handling, and high-performance list virtualization.',
    image: '/assets/nobin-ep-portrait.png',
    cloneCommand: 'git clone https://github.com/parthamallick49/nobin-ep-mobile-app.git',
    githubUrl: 'https://github.com/parthamallick49/nobin-ep-mobile-app',
    techStack: ['.NET Core', 'Flutter', 'SQL Server', 'REST API', 'State Management'],
    keyFeatures: [
      'Real-time financial status tracking & portfolio analytics.',
      'Enterprise authentication and token renewal cycles.',
      'Synchronized with Microsoft SQL Server through high-throughput .NET Core endpoints.',
      'Secure credential storage and encrypted local state management.',
    ],
  },
  {
    id: 'agriman-ecosystem',
    title: 'AgriMan — Agricultural Ecosystem',
    year: '2024',
    subtitle: 'Native Android Farmer-to-Market Exchange',
    overview:
      'Constructed natively in Java for Android using the Repository Pattern, Firebase Realtime Database / Firestore, and Firebase Authentication with zero cold-start latency.',
    image: '/assets/agriman-portrait.png',
    cloneCommand: 'git clone https://github.com/parthamallick49/AgriMan.git',
    githubUrl: 'https://github.com/parthamallick49/AgriMan',
    techStack: ['Android (Java)', 'Firebase', 'Material Design', 'Offline Caching'],
    keyFeatures: [
      'Farmer-to-buyer direct communication and listing portal.',
      'Real-time cloud database syncing with Firebase backend.',
      'Accessible UI layout optimized for diverse literacy and device performance tiers.',
      'Offline data caching for intermittent rural connectivity.',
    ],
  },
  {
    id: 'ghorer-doctor',
    title: 'Ghorer Doctor (Digital Health)',
    year: '2025',
    subtitle: 'AI-Powered Telehealth & Medication Adherence Suite',
    overview:
      'A comprehensive mobile digital health platform engineered to solve medication adherence and clinical record fragmentation in the Bangladesh healthcare ecosystem.',
    image: '/assets/profile.jpg',
    cloneCommand: 'git clone https://github.com/parthamallick49/ghorer-doctor.git',
    githubUrl: 'https://github.com/parthamallick49',
    techStack: ['Flutter', 'Python FastAPI', 'Gemini Vision API', 'Supabase', 'PostgreSQL', 'Clean Architecture'],
    keyFeatures: [
      'Prescription Digitization via AI vision pipelines.',
      'Offline Meal-Time Medication Reminders.',
      'Household Profile Maintenance & Caregiver Adherence Monitoring.',
      'Medicine Alternative Recommendation Engine (MARE).',
      'Doctor History Sharing via Ephemeral QR Codes.',
    ],
  },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    role: 'Junior Software Engineer',
    company: 'Grameen Communications',
    timeline: 'July 2025 – Present',
    location: 'Dhaka, Bangladesh',
    status: 'Current Flagship Stop',
    keyImpact: [
      'Translating complex product requirements into performant UI architectures and scalable state management flows in Flutter and native platforms.',
      'Integrating robust enterprise REST APIs and implementing high-throughput relational data persistence using Microsoft SQL Server.',
      'Conducting performance profiling to eliminate UI jank, reduce memory footprints, and improve cold-start load times.',
      'Collaborating closely with product managers, QA analysts, and infrastructure engineers in agile sprint cycles.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Grameen Communications',
    timeline: 'January 2025 – June 2025',
    location: 'Dhaka, Bangladesh',
    status: 'Foundation Milestone',
    keyImpact: [
      'Engineered functional prototype modules and UI components using Flutter and Java.',
      'Refactored legacy database queries and standardized API request/response interceptors.',
      'Participated in cross-functional standups, code reviews, and production release validation.',
    ],
  },
];

export const EDUCATION: EducationData[] = [
  {
    degree: 'M.Sc. in Computer Science and Engineering (CSE)',
    institution: 'Jahangirnagar University',
    timeline: '2025 – 2026',
    focus: 'Advanced Distributed Systems, Intelligent Data Processing & Software Reliability',
    grade: 'Enrolled / In Progress',
  },
  {
    degree: 'B.Sc. in Computer Science and Engineering (CSE)',
    institution: 'Daffodil International University (DIU)',
    timeline: '2020 – 2024',
    focus: 'Software Engineering, Object-Oriented Analysis, Algorithms & Database Systems',
    grade: 'Graduated with Distinction',
  },
];

export const CONTACT_CHANNELS = {
  email: 'parthamallick.cs@gmail.com',
  github: 'https://github.com/parthamallick49',
  linkedin: 'https://www.linkedin.com/in/parthamalllick/',
  telegraphOffice: 'Dhaka Terminal Telegraph Office #06',
  coordinates: '23.8103° N, 90.4125° E',
  gmt: 'GMT+6 (BST)',
};
