import type {
  FeaturedProject,
  ProductionProject,
  SkillCategory,
  ExperienceItem,
} from '../types';

export const PERSONAL_INFO = {
  name: 'Charu Sonker',
  title: 'Full Stack Developer',
  headline: "Hi, I'm Charu.",
  subheadline: 'Full Stack Developer\nbuilding practical digital products.',
  supportingLine:
    'I build responsive web applications, AI-integrated products, real-time systems and production-ready digital experiences.',
  availability: 'Available for full-time & freelance projects',
  email: 'csonker04@gmail.com',
  github: 'https://github.com/Charu-web',
  linkedin: 'https://www.linkedin.com/in/charu-sonker-196910250',
  location: 'Lucknow, India',
  about:
    'I’m a Full Stack Developer focused on building responsive, scalable web applications and AI-integrated digital products. I work across frontend, backend, databases and real-time systems, with a strong focus on turning ideas into practical production-ready applications.',
};

export const ALL_PROJECTS: FeaturedProject[] = [
  {
    id: 'zenith-hrms',
    title: 'HRMS — Human Resource Management System',
    category: 'Enterprise HRMS Platform',
    filterCategory: 'App',
    tagline: 'FactoHR-inspired enterprise HRMS with Face Attendance AI, GPS Geofencing, Payroll & 8-tab Employee Profiles',
    description:
      'A complete enterprise HRMS platform engineered with Next.js 14, TypeScript, Tailwind CSS, Neon PostgreSQL and Prisma ORM. Features 15 integrated modules including Face AI Attendance, GPS Geofencing, Multi-tier Leave Approvals, Configurable Payroll & Payslips, ATS Recruitment Pipeline, and Audit Trails.',
    highlight:
      'Production-ready FactoHR-style architecture with client-side biometric facial landmark verification, Haversine GPS geofencing, month-locked payroll batches, and Neon PostgreSQL persistence.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma ORM', 'JWT Auth'],
    liveUrl: 'https://hrms-chi-three.vercel.app',
    githubUrl: 'https://github.com/Charu-web/HRMS',
    visualType: 'hrms',
    caseStudy: {
      overview:
        'ZenithHR is a production-grade Human Resource Management System inspired by FactoHR enterprise workflows. It automates the complete employee lifecycle from recruitment through daily attendance, leave approvals, salary structure computation, payroll batch processing, and document verification.',
      problem:
        'Traditional mid-market HR software relies on fragmented spreadsheets or expensive legacy tools with rigid licensing, lacking real-time biometric verification, GPS geofencing for remote or hybrid teams, and automated salary slip generation.',
      solution:
        'Architected a unified full-stack HRMS with Next.js 14 App Router, Prisma ORM, and Neon PostgreSQL. Implemented browser-based facial vector capture & similarity matching, mobile GPS coordinate validation against company office polygons, multi-tier leave approval loops, and automated payroll disbursement calculations.',
      keyFeatures: [
        'Enterprise Dashboard: 9 live KPI metric cards, Recharts attendance trends, department breakdowns, and punch boards.',
        'Employee 360 Vault: Comprehensive 8-tab employee profile covering Personal, Employment, Attendance, Leaves, Payroll, Documents, OKRs, and Audit History.',
        'Face AI Attendance: Client-side 128-dimensional facial landmark vector extraction with Euclidean distance verification against enrolled employee biometrics.',
        'GPS Geofencing: Real-time latitude/longitude coordinate capture with Haversine formula radius validation against configured office branches.',
        'Configurable Payroll & Payslips: Basic, HRA, Allowances, PF, ESI, TDS calculations, month locking, batch processing, and printable/downloadable payslips.',
        'Multi-Tier Leave Workflow: 6 standard leave types with dynamic balance enforcement, manager and HR review queues, and rejection reason tracking.',
        'ATS Recruitment Pipeline: 7-stage visual Kanban board from Applied to Joined, candidate ratings, CTC negotiation, and interview scheduling.',
        'Document Vault & Announcements: KYC verification badges, priority company bulletin boards, and real-time in-app notification center.',
      ],
      technicalImplementation: [
        'Built 50+ RESTful Next.js 14 route handlers protected with JWT authentication and Role-Based Access Control (Admin, Manager, Employee).',
        'Modelled 20+ relational database entities in Prisma ORM targeting serverless Neon PostgreSQL with indexed foreign keys and cascades.',
        'Developed client-side face detection and vector encoding using Web APIs with strict biometric user consent tracking.',
        'Enforced strict row-level salary and document isolation ensuring employees can only query their own compensation records.',
        'Built responsive FactoHR-styled UI with dark/light theme switching, sticky sidebar navigation, and mobile bottom tab bar.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['Next.js 14 (App Router)', 'React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Lucide Icons'] },
        { category: 'Backend & APIs', tools: ['Next.js Route Handlers', 'JWT Authentication', 'Bcryptjs', 'Haversine GPS Engine'] },
        { category: 'Database & ORM', tools: ['Neon PostgreSQL', 'Prisma ORM', 'Relational Schema', 'Cascade Constraints'] },
        { category: 'Security & Hosting', tools: ['Vercel Edge Deployment', 'RBAC Middleware', 'Biometric Consent Vault', 'Audit Trails'] },
      ],
      challenges: [
        'Implementing client-side facial landmark extraction without external heavy third-party cloud SDK dependencies.',
        'Formulating high-precision GPS geofence calculations handling device hardware accuracy variations across mobile browsers.',
        'Designing a flexible payroll computation model supporting configurable company allowances, tax slabs, and month locking.',
      ],
      outcome:
        'Successfully delivered and deployed a full-fledged enterprise HRMS with 32 active employee profiles, 480+ attendance logs, verified salary structures, and zero mock data, fully accessible online with sub-second page transitions.',
    },
  },
  {
    id: 'nexus360-crm',
    title: 'NEXUS360 CRM',
    category: 'Enterprise CRM / Operations',
    filterCategory: 'App',
    tagline: 'Operational CRM for lead intake, verification tracking & role-based access control',
    description:
      'An end-to-end operational CRM tailored for lead intake, multi-stage verification pipelines, role-based access control (RBAC), and executive analytics dashboards.',
    highlight:
      'Role-based access control (RBAC), multi-stage lead lifecycles, and real-time operations dashboard with secure document handling.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST APIs'],
    liveUrl: 'https://nexus360-crm.vercel.app',
    githubUrl: 'https://github.com/Charu-web/dsa-crm',
    visualType: 'dsa-crm',
    caseStudy: {
      overview:
        'NEXUS360 CRM is a centralized full-stack customer relationship and operations platform built for distributed agent teams to manage lead lifecycles, document audits, and payout pipelines.',
      problem:
        'Fragmented lead sources and unorganized spreadsheets caused severe processing bottlenecks, duplicate entries, and lack of accountability across agent tiers.',
      solution:
        'Engineered a centralized MERN CRM with role-based access tiers (Admin, Operations, Agent), live status pipelines, automated lead distribution, and audit logging.',
      keyFeatures: [
        'Role-Based Access Control (Admin, Operations, Agent permission levels)',
        'Visual multi-stage lead status pipeline with instant stage transitions',
        'Document verification workflows with cryptographically signed audit logs',
        'Comprehensive multi-field search, filtering, and automated CSV reporting',
      ],
      technicalImplementation: [
        'Constructed modular React dashboard components with optimistic UI updates and zero-layout shift state transitions.',
        'Implemented Express.js REST APIs with robust token-based authorization middleware and rate limiting.',
        'Structured MongoDB collections with compound indexing for instant query responses under high dataset density.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React.js', 'Tailwind CSS', 'Lucide Icons', 'Vite'] },
        { category: 'Backend', tools: ['Node.js', 'Express.js', 'JWT Auth', 'REST APIs'] },
        { category: 'Database', tools: ['MongoDB', 'Mongoose ODM', 'Compound Indexes'] },
      ],
      challenges: [
        'Enforcing strict data isolation between competing agent teams without sacrificing query throughput.',
        'Optimizing heavy document table queries under simultaneous multi-user filters.',
      ],
      outcome:
        'Delivered a streamlined operations application that drastically reduced lead turnaround times and improved pipeline visibility.',
    },
  },
  {
    id: 'pixel-art-ai-studio',
    title: 'PIXEL ART AI STUDIO',
    category: 'AI / Creative Engineering',
    filterCategory: 'Web',
    tagline: 'AI-driven image transformation application with canvas quantization & palette extraction',
    description:
      'AI-driven image transformation application that converts user-uploaded images into stylized retro pixel-art with adjustable quantization, color palette extraction, and instant export.',
    highlight:
      'Engineered an image processing pipeline with client-side canvas rasterization, server-assisted color clustering, and responsive UI controls.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML5 Canvas', 'REST APIs'],
    liveUrl: 'https://pixel-art-ai-studio.vercel.app',
    githubUrl: 'https://github.com/Charu-web/pixel-art-image-transformer',
    visualType: 'pixel-art',
    caseStudy: {
      overview:
        'PIXEL ART AI STUDIO allows users to upload high-resolution images and dynamically transform them into structured, retro-styled pixel art through algorithmic color quantization and grid sampling.',
      problem:
        'Standard pixelation tools typically produce blurry downsamples or erratic color banding without preserving edge coherence or allowing granular palette control.',
      solution:
        'Developed a hybrid image transformation architecture combining fast client-side HTML5 Canvas pixel manipulation with Node.js/Express image processing routines for palette optimization and adaptive downsampling.',
      keyFeatures: [
        'Dynamic resolution grid slider (8x8 up to 128x128 grid mapping)',
        'Custom color palette quantization with K-means color clustering algorithms',
        'Real-time split-screen side-by-side comparison before and after rendering',
        'Lossless high-res PNG and SVG pixel matrix export options',
        'Responsive drag-and-drop workspace with instant client-side feedback',
      ],
      technicalImplementation: [
        'Extracted raw ImageData buffer arrays via HTML5 Canvas 2D rendering context.',
        'Implemented spatial quantization algorithms to calculate average and dominant RGBA values per grid block.',
        'Integrated Node.js / Express REST API endpoints for batch filters and palette extraction storage.',
        'Optimized client memory footprint during large image uploads through progressive downscaling.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React.js', 'HTML5 Canvas', 'Tailwind CSS'] },
        { category: 'Backend & Processing', tools: ['Node.js', 'Express.js', 'REST APIs'] },
        { category: 'Database & Storage', tools: ['MongoDB', 'Mongoose', 'Binary Asset Storage'] },
      ],
      challenges: [
        'Handling high-resolution images on mobile devices without causing main-thread UI lag.',
        'Preserving critical facial and object contrast when reducing color palettes down to 8 or 16 tones.',
      ],
      outcome:
        'Delivered a responsive web tool that transforms images with high visual fidelity, predictable color output, and zero external software requirements.',
    },
  },
  {
    id: 'sketch-duel-ai',
    title: 'SKETCH DUEL AI',
    category: 'AI / Real-Time WebSocket',
    filterCategory: 'Web',
    tagline: 'Real-time multiplayer drawing and guessing game with AI sketch classification',
    description:
      'Real-time multiplayer drawing and guessing game with AI-powered functionality. Features low-latency bidirectional room synchronization, JWT authentication, and automated AI sketch classification.',
    highlight:
      'Real-time WebSocket architecture + AI integration with sub-50ms stroke synchronization, OpenAI API integration, and MongoDB match persistence.',
    technologies: ['React.js', 'Node.js', 'Socket.io', 'MongoDB', 'OpenAI API', 'JWT'],
    liveUrl: 'https://sketch-duel-ai-doodle-battles.vercel.app',
    githubUrl: 'https://github.com/Charu-web/sketch-duel-ai-doodle-battles',
    visualType: 'doodle-duel',
    caseStudy: {
      overview:
        'SKETCH DUEL AI is a real-time collaborative and competitive web application where players sketch against the clock while an AI model and human opponents compete to recognize the drawing dynamically.',
      problem:
        'Multiplayer canvas interactions suffer from coordinate transmission latency, packet dropouts, and room state desync, while AI classification models require lightweight payload contracts for live recognition.',
      solution:
        'Engineered a dedicated Node.js + Socket.io backend managing synchronized lobby state, room lifecycles, and stroke broadcasting with delta-compression, paired with OpenAI API evaluation and MongoDB storage.',
      keyFeatures: [
        'Sub-50ms real-time multi-user canvas synchronization with vector smoothing',
        'AI sketch classification and prompt evaluation using OpenAI API integration',
        'Lobby and matchmaking system with private rooms and turn management',
        'Secure JWT authentication with player session tracking and match history',
        'Touch-optimized pressure and smoothing canvas for cross-device support',
      ],
      technicalImplementation: [
        'Engineered delta-compressed stroke packet broadcasts over WebSockets to minimize network overhead.',
        'Implemented Bezier vector interpolation to reconstruct smooth continuous paths between coordinate samples.',
        'Integrated OpenAI API prompt engineering pipeline for multi-stage semantic sketch evaluation.',
        'Designed MongoDB schemas for player authentication, active room lifecycles, and game analytics.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React.js', 'HTML5 Canvas API', 'Tailwind CSS'] },
        { category: 'Backend & Real-Time', tools: ['Node.js', 'Express.js', 'Socket.io', 'REST APIs'] },
        { category: 'AI & Authentication', tools: ['OpenAI API', 'JWT Authentication', 'Bcrypt'] },
        { category: 'Database', tools: ['MongoDB', 'Mongoose ODM', 'Indexed Queries'] },
      ],
      challenges: [
        'Eliminating stroke rendering latency and packet jitter across concurrent participants.',
        'Structuring AI evaluation prompts to return structured JSON responses within strict timeout thresholds.',
      ],
      outcome:
        'Successfully delivered a high-performance multiplayer web application demonstrating advanced proficiency in WebSockets, AI API integration, and full-stack MERN architecture.',
    },
  },
  {
    id: 'hda-production',
    title: 'HDA Production',
    category: 'Commercial Web Platform',
    filterCategory: 'Web',
    tagline: 'Modern production platform supporting client inquiries & media portfolio showcases',
    description:
      'Engineered a modern web platform supporting client inquiries, media portfolio showcases, dynamic service management, and responsive layouts.',
    highlight:
      'Built responsive frontend components, optimized media delivery, and integrated structured REST API endpoints.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/hda-production/',
    githubUrl: 'https://github.com/Charu-web/hda-production',
    visualType: 'hda-production',
  },
  {
    id: 'yuvahub',
    title: 'YuvaHub',
    category: 'Community & Career Portal',
    filterCategory: 'Web',
    tagline: 'Career development & community platform with interactive directory filters',
    description:
      'A responsive web portal connecting users to career development resources, event listings, community discussions, and mentorship opportunities.',
    highlight:
      'Implemented clean navigation architecture, interactive directory filters, dynamic data fetching, and mobile-first layouts.',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'CSS3', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/yuvahub/',
    githubUrl: 'https://github.com/Charu-web/yuvahub',
    visualType: 'yuvahub',
  },
  {
    id: 'yuvahub-naukri-mahotsav-2026',
    title: 'YuvaHub — Naukri Mahotsav 2026',
    category: 'Employment / Job Registration Platform',
    filterCategory: 'Web',
    tagline: 'Full-Stack Web Application for Naukri Mahotsav 2026 with digital job card pass & persistent cloud database',
    description:
      'A complete employment platform created for Naukri Mahotsav 2026, featuring candidate registration, digital Job Card generation and lookup, persistent candidate data, Admin Panel, authentication, candidate management, search/filter, status updates and CSV export.',
    highlight:
      'Full-stack serverless architecture with Netlify Functions, persistent cloud storage (@netlify/blobs), bcrypt admin authentication, real-time candidate search/filter, and automated CSV export.',
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'REST API',
      'Netlify Functions',
      'Serverless',
      'Cloud Database',
      'Admin Panel',
      'Authentication',
      'Responsive Design',
    ],
    liveUrl: 'https://cozy-sable-726aa1.netlify.app',
    githubUrl: 'https://github.com/Charu-web/yuvahub',
    visualType: 'yuvahub-naukri-mahotsav',
    caseStudy: {
      overview:
        'YuvaHub — Naukri Mahotsav 2026 is an end-to-end employment and recruitment platform engineered for Dharashiv constituency. It enables thousands of job seekers to register, receive unique digital candidate passes, and be matched with 50+ participating corporate employers during the recruitment mega drive.',
      problem:
        'Large-scale employment drives traditionally suffer from massive physical congestion, lost paper resumes, lack of applicant verification mechanisms, and inability for coordinators to track candidate metrics in real time.',
      solution:
        'Engineered a complete serverless full-stack web application with Netlify Functions and Netlify Blobs persistent cloud database, instant unique Job Card generation, responsive bilingual UI, and a secure real-time administrative command center.',
      keyFeatures: [
        'Candidate Registration: Streamlined multi-step applicant registration with immediate unique Candidate ID generation (MP-JOB-2026-XXXXXX).',
        'Digital Job Card: Instant generation of digital PVC Job Card pass for candidates.',
        'Job Card Unique Code Lookup: Public verification and status lookup via unique Candidate ID or phone number.',
        'Persistent Candidate Database: High-reliability cloud key-value database using Netlify Blobs with strong consistency across cold starts.',
        'Admin Dashboard: Real-time KPIs tracking total applicant volume, daily registrations, district distribution, and educational qualifications.',
        'Candidate Search & Filters: Instant search by name, candidate ID, contact number, and filters by qualification and district.',
        'Candidate Details: Full profile modal view displaying complete educational and professional background.',
        'Candidate Status Update: Granular administrative status transitions (Verified, Approved, Pending, Rejected).',
        'CSV Export: Automated UTF-8 BOM CSV dataset export for administrative reporting and corporate recruiters.',
        'Admin Login / Logout: Secure bcrypt password verification and cryptographic bearer token session management.',
        'Protected Admin Routes: Guard middleware enforcing 401 Unauthorized rejection for all unauthenticated administrative requests.',
        'Responsive UI: Mobile-first bilingual (Marathi / English) interface optimized across mobile, tablet, and desktop viewports.',
      ],
      technicalImplementation: [
        'Built modern, responsive React.js frontend with Tailwind CSS and Vite, optimized for fast initial render and Core Web Vitals.',
        'Developed 15 RESTful API routes in Express.js bundled into Netlify Functions via serverless-http.',
        'Integrated @netlify/blobs persistent cloud key-value store with strong consistency across serverless cold starts.',
        'Implemented Bcrypt password verification and cryptographically secure token-based session guard middleware.',
        'Constructed automated UTF-8 BOM CSV generation pipeline for on-demand candidate dataset exports.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React', 'JavaScript', 'Tailwind CSS', 'Vite', 'Responsive Design'] },
        { category: 'Backend & Serverless', tools: ['Node.js', 'Express.js', 'Netlify Functions', 'Serverless', 'REST API'] },
        { category: 'Database & Storage', tools: ['Cloud Database', 'Netlify Blobs (Strong Consistency)', 'JSON Store'] },
        { category: 'Security & Auth', tools: ['Admin Panel', 'Authentication (Bcrypt & Bearer Tokens)', 'Protected Admin Routes'] },
      ],
      challenges: [
        'Ensuring 100% data persistence across ephemeral serverless cold starts without incurring expensive database cluster overhead.',
        'Rendering Marathi Unicode typography seamlessly in exported CSV spreadsheets across different operating systems.',
      ],
      outcome:
        'Delivered a production-ready, high-performance web platform actively deployed in production on Netlify, facilitating seamless candidate enrollment, instant pass generation, and live administrative management for thousands of job seekers.',
    },
  },
  {
    id: 'neon-space-shooter',
    title: 'Neon Space Shooter',
    category: 'Interactive Web / Game',
    filterCategory: 'Web',
    tagline: 'High-performance 60FPS browser arcade engine with custom collision & particle dynamics',
    description:
      'Browser-based arcade game featuring custom 60FPS game loop physics, dynamic enemy wave spawning, collision detection grids, and canvas rendering.',
    highlight:
      'HTML5 Canvas, Game mechanics, Collision detection, High-score system, and Responsive experience with zero external dependencies.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Node.js', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/neon-space-shooter/',
    githubUrl: 'https://github.com/Charu-web/neon-space-shooter',
    visualType: 'space-shooter',
    caseStudy: {
      overview:
        'Neon Space Shooter is an arcade-style interactive game built directly in vanilla JavaScript and HTML5 Canvas, showcasing front-end performance engineering, state management, and mathematical physics modeling.',
      problem:
        'Browser-based canvas games frequently suffer from frame drops during intense particle effects and garbage collection pauses when instantiating bullet entities.',
      solution:
        'Implemented memory-safe object pooling for projectiles, enemies, and particle emitters, coupled with requestAnimationFrame delta-time normalization.',
      keyFeatures: [
        'Stable 60 FPS rendering with delta-time frame compensation',
        'Spatial partition collision detection for high-density projectile counts',
        'Procedural enemy wave generation with scaling difficulty algorithms',
        'Dynamic glowing neon particle physics engine with velocity dampening',
        'Responsive input mapping supporting keyboard, mouse, and touch controls',
      ],
      technicalImplementation: [
        'Constructed custom entity-component architecture in pure JavaScript (ES6+).',
        'Implemented object pooling patterns to eliminate garbage collection spikes during high-frequency firing.',
        'Built custom circular and axis-aligned bounding box (AABB) collision algorithms.',
        'Integrated Web Audio API for synthesized retro sound effects without external audio asset lag.',
      ],
      technologyStack: [
        { category: 'Core Engine', tools: ['Vanilla JavaScript (ES6+)', 'Object Pooling Pattern'] },
        { category: 'Rendering', tools: ['HTML5 Canvas 2D', 'requestAnimationFrame Game Loop'] },
        { category: 'Backend & APIs', tools: ['Node.js', 'Express REST Endpoints', 'Leaderboard API'] },
      ],
      challenges: [
        'Maintaining a locked 60 FPS across low-power mobile devices and high-refresh desktop monitors.',
        'Fine-tuning hitboxes and collision resolution under fast projectile velocities without tunneling.',
      ],
      outcome:
        'Created a fast, engaging web game demonstrating solid mathematical fundamentals, memory optimization, and frontend performance control.',
    },
  },
  {
    id: 'dsa-sathi-crm',
    title: 'DSA Sathi CRM',
    category: 'Enterprise CRM / Full Stack',
    filterCategory: 'App',
    tagline: 'Business workflow management, pipeline automation & role-based dashboard',
    description:
      'A CRM-focused web application designed around business workflows, multi-stage lead lifecycles, role-based dashboards, document verification, and user management.',
    highlight:
      'Dashboard, Authentication, Business workflows, CRM functionality, and Backend integration with Role-Based Access Control (RBAC).',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
    liveUrl: 'https://github.com/Charu-web/dsa-sathi-crm',
    githubUrl: 'https://github.com/Charu-web/dsa-sathi-crm',
    visualType: 'dsa-sathi-crm',
  },
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter',
    category: 'Interactive Web / Game',
    filterCategory: 'Web',
    tagline: 'Physics-based canvas puzzle game with ray-cast trajectory & cluster matching',
    description:
      'An interactive browser arcade game featuring ray-cast angle trajectory projection, hexagonal bubble grid collision math, cluster matching algorithms, and fluid canvas animations.',
    highlight:
      'Implemented recursive cluster detection (flood-fill algorithm) to calculate floating bubble drop chains upon matching three or more same-color nodes.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Math Physics'],
    liveUrl: 'https://github.com/Charu-web',
    githubUrl: 'https://github.com/Charu-web',
    visualType: 'bubble-shooter',
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS;

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'volna-technologies',
    company: 'Volna Technologies',
    role: 'Full Stack Developer',
    period: 'July 2026 – October 2026 (Expected)',
    status: 'CURRENT',
    responsibilities: [
      'Developed and maintained responsive full-stack web applications and reusable UI components using React.js and modern JavaScript (ES6+).',
      'Built and integrated robust RESTful API endpoints and backend services with Node.js and Express.js, handling client-side state and async data pipelines.',
      'Designed and optimized MongoDB database schemas, ensuring data integrity, efficient queries, and reliable data synchronization.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JavaScript'],
  },
  {
    id: 'empire-it-xpert',
    company: 'Empire IT Xpert',
    role: 'Web Developer Intern',
    period: 'April 2026 – June 2026',
    status: 'PREVIOUS',
    responsibilities: [
      'Engineered responsive front-end interfaces, dynamic workflows, and dashboards for CRM and web applications (DSA CRM, DSA Sathi CRM, HDA Production, YuvaHub) using React.js and Tailwind CSS.',
      'Implemented backend REST APIs with Node.js and Express.js, integrating Role-Based Access Control (RBAC), multi-stage lead tracking, and secure authentication workflows.',
      'Collaborated on Git/GitHub version control workflows for client requirements, sprint feature delivery, and cross-browser production deployments.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'hi-tech-engineering',
    company: 'Hi-Tech Engineering',
    role: 'Web Developer Intern',
    period: '',
    status: 'PREVIOUS',
    responsibilities: [
      'Shipped 3+ responsive MERN stack applications, lifting cross-device compatibility by 40% and cutting data-fetch latency by 25% through optimized REST API integration.',
      'Redesigned MongoDB schemas and implemented indexing for Node.js/Express services, improving database query performance by 30%.',
      'Raised Core Web Vitals scores by 35% through lazy loading, code splitting, and asset compression.',
      'Collaborated within a 5-member Agile team using Git and GitHub for version control and sprint delivery.',
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'REST APIs', 'Git'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'FRONTEND',
    description: 'Client-side web development',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'],
  },
  {
    id: 'backend',
    number: '02',
    title: 'BACKEND',
    description: 'Server architecture & APIs',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'JWT'],
  },
  {
    id: 'database',
    number: '03',
    title: 'DATABASE',
    description: 'Data storage & querying',
    skills: ['MongoDB', 'Mongoose', 'SQL'],
  },
  {
    id: 'ai-ml',
    number: '04',
    title: 'AI / ML',
    description: 'Machine learning & AI integration',
    skills: ['OpenAI API', 'Prompt Engineering', 'TensorFlow.js', 'Generative AI'],
  },
  {
    id: 'tools',
    number: '05',
    title: 'TOOLS',
    description: 'Developer tooling & DevOps',
    skills: ['Git', 'GitHub', 'Postman', 'Vercel', 'Netlify', 'Render', 'CI/CD'],
  },
];

export const PRODUCTION_PROJECTS: ProductionProject[] = [
  {
    id: 'hda-production',
    title: 'HDA PRODUCTION',
    role: 'Full Stack Web Developer',
    type: 'Production Website',
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs'],
    whatWasBuilt:
      'Engineered a modern web platform supporting client inquiries, media portfolio showcases, and dynamic service management.',
    keyContribution:
      'Built responsive frontend components, optimized media delivery, integrated structured REST API endpoints, and ensured cross-device accessibility.',
  },
];

export const OTHER_EXPERIMENTS = [
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter Game',
    category: 'Interactive Web / Physics',
    description:
      'An interactive browser arcade game featuring ray-cast angle trajectory projection, hexagonal bubble grid collision math, cluster matching algorithms, and fluid canvas animations.',
    highlight:
      'Implemented recursive cluster detection to calculate floating bubble drop chains upon matching three or more same-color nodes.',
    technologies: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'Math Physics'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
];

export const ENGINEERING_STEPS = [
  {
    number: '01',
    title: 'Architecture & System Design',
    summary: 'Designing modular schemas and data contracts.',
    keyPoints: ['State boundaries', 'API schema definition', 'Database index strategy'],
  },
];

export const SERVICES = [
  {
    id: 'full-stack-web-apps',
    title: 'Full Stack Web Applications',
    description: 'Custom web apps built with React, Node.js, Express, and MongoDB.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
];

