import React from 'react';
import Image from 'next/image';

export const SKILLS_DATA = [
  {
    title: 'Frontend',
    skills: [
     { name: 'Flutter', icon: <Image src="https://skills.syvixor.com/api/icons?i=flutter" alt="Flutter" width={40} height={40} unoptimized/> },
     { name: 'Native Android', icon: <Image src="https://skills.syvixor.com/api/icons?perline=15&i=android" alt="Native Androd" width={40} height={40} unoptimized/> },
      
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Java', icon: <Image src="https://skills.syvixor.com/api/icons?i=java" alt="Java" width={40} height={40} unoptimized/> },
      { name: '.NET Core', icon: <Image src="https://skills.syvixor.com/api/icons?i=dotnet" alt=".NET Core" width={40} height={40} unoptimized/> },
      { name: 'Php', icon: <Image src="https://skills.syvixor.com/api/icons?perline=15&i=php" alt="Php" width={40} height={40} unoptimized/> },
      { name: 'Express.js', icon: <Image src="https://skills.syvixor.com/api/icons?i=express" alt="Express.js" width={40} height={40} unoptimized/> },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySql', icon: <Image src="https://skills.syvixor.com/api/icons?perline=15&i=mysql" alt="MySql" width={40} height={40} unoptimized/> },
      { name: 'SQL Server', icon: <Image src="https://skills.syvixor.com/api/icons?i=sqlserver" alt="SQL Server" width={40} height={40}unoptimized /> },
      { name: 'Firebase', icon: <Image src="https://skills.syvixor.com/api/icons?i=firebase" alt="Firebase" width={40} height={40} unoptimized/> },
      { name: 'MongoDB', icon: <Image src="https://skills.syvixor.com/api/icons?i=mongodb" alt="MongoDB" width={40} height={40} unoptimized/> },
    ],
  },
  {
    title: 'Other Tools',
    skills: [
      { name: 'Android Studio', icon: <Image src="https://skills.syvixor.com/api/icons?perline=15&i=androidstudio" alt="Android Studio" width={40} height={40} unoptimized/> },
      { name: 'Figma', icon: <Image src="https://skills.syvixor.com/api/icons?i=figma" alt="Figma" width={40} height={40} unoptimized/> },
      { name: 'Git & GitHub', icon: <Image src="https://skills.syvixor.com/api/icons?i=git" alt="Git" width={40} height={40} unoptimized/> },
      { name: 'Postman', icon: <Image src="https://skills.syvixor.com/api/icons?perline=15&i=postman" alt="Postman" width={40} height={40} unoptimized/> },
      { name: 'Docker', icon: <Image src="https://skills.syvixor.com/api/icons?perline=15&i=docker" alt="Docker" width={40} height={40} unoptimized/> },
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: 'Task Manager App',
    description: 'A basic full-stack task management application with CRUD (Create, Read, Update, Delete) functionality.',
    tags: ['Flutter', 'Dart', 'Node.js(Express)', 'MongoDB','Docker',],
    image: 'project-1',
    link: '#',
    github: 'https://github.com/parthamallick49/task_manager_app',
  },
  {
    title: 'Nobin EP App',
    description: 'This is for the Nobin Equity Program members. They can view their live data from this app. (Note: Source-code is not public, for security reason)',
    tags: ['.NET Core', 'Flutter', 'SQL Server', 'REST API'],
    image: 'project-2',
    link: '#',
    github: 'https://github.com/parthamallick49/nobin-ep-mobile-app',
  },
  {
    title: 'AgriMan',
    description: 'AgriMan is a powerful and easy-to-use Agricultural Management System designed to empower farmers, sellers, and buyers with real-time access to critical agricultural data and services.',
    tags: ['Android (Java)', 'Firebase'],
    image: 'project-3',
    link: '#',
    github: 'https://github.com/parthamallick49/AgriMan',
  },
];

export const EXPERIENCE_DATA = [
    {
        title: 'Junior Software Engineer',
        company: 'Grameen Communications',
        date: 'July 2025 - Present',
        responsibilities: [
            'Translating product requirements into performant UI and state management flows.',
            'Integrated REST APIs and handled data persistence using SQL Server.',
            'Improved app stability and responsiveness.',
        ],
    },
    {
        title: 'Software Developer Intern',
        company: 'Grameen Communications',
        date: 'January 2025 - June 2025',
        responsibilities: [
            'Built prototype features using Flutter and Java.',
            'Helped migrate/organize API calls and database queries.',
            'Worked in cross-functional teams to deliver user-facing features and internal tooling.',
        ],
    },
];
