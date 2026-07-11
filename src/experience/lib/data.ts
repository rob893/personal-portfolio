/** Canonical site origin. */
export const SITE_URL = 'https://rwherber.com';

export const PROFILE = {
  name: 'Robert Herber',
  firstName: 'Robert',
  role: 'Principal Software Engineer',
  status: 'Principal Software Engineer · Microsoft',
  taglines: [
    'build AI-powered developer platforms.',
    'ship cloud-scale systems.',
    'automate what slows teams down.',
    'turn hard problems into clean software.',
    'architect it, ship it, make it fast.'
  ],
  bio: "I'm a Principal Software Engineer at Microsoft who enjoys building cool stuff — from AI-powered developer platforms and cloud-scale services to game engines and the occasional emoji-only cache. I design systems that make thousands of engineers more productive.",
  about: {
    lead: 'I design and ship systems end to end — from cloud services and developer platforms to the AI tooling and automation that make engineering teams faster.',
    p2: 'At Microsoft I build platforms used company-wide for security, compliance, and governance — including an internal MCP server and AI-powered code-transformation systems that have saved engineering-years of work.',
    p3: 'I care about building simple, fast, reliable software — designed for how people actually use it, not just clean on paper.',
    credentials: [
      'Principal Software Engineer @ Microsoft',
      'M.S. Software Engineering — Kennesaw State (4.0 GPA)',
      'Azure Impact Award (2023 · 2024)',
      'Based in Atlanta, GA'
    ]
  },
  email: 'rwherber@gmail.com',
  location: 'Atlanta, GA',
  resume: '/RobertHerberResume.pdf',
  siteUrl: `${SITE_URL}/`,
  socials: {
    github: 'https://github.com/rob893',
    linkedin: 'https://www.linkedin.com/in/robert-herber-2b9837b8/',
    npm: 'https://www.npmjs.com/~rob893'
  }
};

export type Job = {
  company: string;
  title: string;
  range: string;
  location: string;
  blurb: string;
  points: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: 'Microsoft',
    title: 'Principal Software Engineer',
    range: 'Sep 2025 — Present',
    location: 'Atlanta · Remote',
    blurb: 'Building AI-powered developer platforms used company-wide for security, compliance, and governance.',
    points: [
      'Designed and built an internal Model Context Protocol (MCP) server that became a primary way engineers and AI agents interact with the platform — scaled from a few hundred to ~9,500 monthly users, serving millions of requests weekly',
      "Authored my org's official guidelines for building remote MCP servers — now the org-wide standard, letting teams ship servers that are secure and compliant by default",
      'Led an AI-powered code-transformation system that auto-opens PRs fixing security and compliance violations — an estimated 5+ engineering-years saved in a single half',
      'Built a high-performance, cache-backed data-access SDK now load-bearing across services — cutting key p50 latencies roughly in half',
      'Built (Electron, React, TypeScript) an internal dev-tools app every engineer on the team now uses daily'
    ]
  },
  {
    company: 'Microsoft',
    title: 'Senior Software Engineer',
    range: 'Mar 2022 — Sep 2025',
    location: 'Atlanta · Remote',
    blurb:
      'Built platforms and automation that track governance, compliance, and security for every service across the company.',
    points: [
      'Led a team building a system that scans Microsoft source for security violations and, using AI, opens automatic fix PRs — thousands of PRs, tens of thousands of dev-hours saved',
      'Designed and built from scratch a deployment-gate system (Azure Functions) running ~200 e2e tests against canary regions in CI — blocking bad builds and helping sustain a 99.9% uptime SLA',
      'Built a syncing system (.NET + Hangfire) that auto-creates Azure DevOps work items company-wide, cutting resolution time ~20%',
      'Led incident response for a major auth vulnerability across all services; authored the postmortem presented to senior leadership',
      'Earned the Azure Impact Award in both 2023 and 2024'
    ]
  },
  {
    company: 'MGM Resorts International',
    title: 'Software Engineering Lead / Sr. Engineer',
    range: 'Jan 2020 — Mar 2022',
    location: 'Las Vegas',
    blurb: 'Led teams building the cloud services behind contactless digital check-in.',
    points: [
      'Delivered core backend services for contactless check-in 6 months early, helping cut operational loss from $300M/mo to $100M/mo',
      'Led a GraphQL layer (Apollo, Node.js, TypeScript) unifying many REST services, scaled to millions of requests/day on AWS ECS + Lambda',
      'Led a team of 15 engineers; shipped the first monetization feature, generating $1.3M in two months',
      'Built CI/CD with GitHub Actions + Terraform and automated monitoring to hold a 99.9% uptime SLA'
    ]
  }
];

export type Skill = {
  /** HUD module number, "01".."06" */
  num: string;
  name: string;
  items: string;
};

export const SKILLS: Skill[] = [
  { num: '01', name: 'Languages', items: 'C# · TypeScript · PHP · Rust' },
  { num: '02', name: 'Cloud & Infra', items: 'Azure · AWS · Docker · Terraform' },
  { num: '03', name: 'Backend', items: '.NET · Node.js · GraphQL · REST' },
  { num: '04', name: 'Frontend', items: 'React · Vue · Angular' },
  { num: '05', name: 'AI & Agents', items: 'MCP · Claude Code · Copilot CLI · RAG · LLMs' },
  { num: '06', name: 'Data', items: 'PostgreSQL · SQL Server · MySQL · Kusto · Redis' }
];

export type Project = {
  id: string;
  title: string;
  meta: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Gradient endpoints used to generate the orbiting card artwork. */
  colorA: string;
  colorB: string;
  /** External link (GitHub / live). Null = no public link. */
  link: string | null;
  linkLabel?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'downbeat',
    title: 'Downbeat',
    meta: '2026 · Web app',
    tagline: 'Band management for live gigs',
    description:
      'A band-management and live-gig platform — manage bands, members, setlists, and songs. Modern .NET 10 + React 19 stack with full CI/CD and cloud deploy to Azure.',
    tags: ['.NET 10', 'React 19', 'PostgreSQL', 'Azure'],
    colorA: '#8b5cf6',
    colorB: '#38bdf8',
    link: 'https://downbeatapp.dev',
    linkLabel: 'Visit downbeatapp.dev',
    featured: true
  },
  {
    id: 'derpcode',
    title: 'DerpCode',
    meta: '2026 · Web app',
    tagline: 'Coding challenges with live test runs',
    description:
      'A coding-practice platform where developers solve programming challenges with automated test execution. Full-stack .NET 10 Web API (EF Core + Identity + Postgres) with a React front end.',
    tags: ['.NET 10', 'React', 'PostgreSQL', 'EF Core'],
    colorA: '#22d3ee',
    colorB: '#a3e635',
    link: 'https://derpcode.dev',
    linkLabel: 'Visit derpcode.dev',
    featured: true
  },
  {
    id: 'algo-visualizer',
    title: 'Algorithm Visualizer',
    meta: '2023 · Rust · WebAssembly',
    tagline: 'Pathfinding, powered by Rust + WASM',
    description:
      'An interactive pathfinding-algorithm visualizer where all of the pathfinding logic is written in Rust and compiled to WebAssembly, then run at runtime in the browser.',
    tags: ['Rust', 'WebAssembly', 'TypeScript'],
    colorA: '#f97316',
    colorB: '#fbbf24',
    link: 'https://rob893.github.io/algo-visualizer',
    linkLabel: 'Live demo',
    featured: true
  },
  {
    id: 'wow-watcher',
    title: 'WoW Auction House Watcher',
    meta: '2021 · Web app',
    tagline: 'Track prices, get alerts',
    description:
      'A service + PWA that tracks World of Warcraft auction prices with watch lists and price-movement alerts. RESTful API with JSON Patch, EF Core migrations, background jobs, and event-based alerting.',
    tags: ['Vue.js', 'C#', '.NET', 'Azure', 'Hangfire'],
    colorA: '#0069ff',
    colorB: '#4cc9f0',
    link: 'https://github.com/rob893/wow-market-watcher',
    linkLabel: 'View on GitHub'
  },
  {
    id: 'entropy',
    title: 'Entropy Game Engine',
    meta: '2020 · Game engine',
    tagline: 'A 2D engine, Unity-style',
    description:
      'A fully functional 2D game engine in TypeScript modeled after Unity — component-based game objects, A* pathfinding over weighted graphs, spatial-hashing collision detection, and a custom input/event system.',
    tags: ['TypeScript', 'Jest', 'Canvas'],
    colorA: '#7c3aed',
    colorB: '#f0abfc',
    link: 'https://github.com/rob893/Entropy-Game-Engine',
    linkLabel: 'View on GitHub'
  },
  {
    id: 'ts-linq',
    title: 'typescript-extended-linq',
    meta: 'NPM · Library',
    tagline: '.NET LINQ for TypeScript',
    description:
      "A JavaScript/TypeScript library modeled after .NET's System.Linq with extra operators inspired by MoreLINQ. Published to NPM.",
    tags: ['TypeScript', 'Node.js', 'NPM'],
    colorA: '#3178c6',
    colorB: '#7df9ff',
    link: 'https://www.npmjs.com/package/typescript-extended-linq',
    linkLabel: 'View on NPM'
  },
  {
    id: 'emoji-cache',
    title: 'emoji-cache',
    meta: 'PHP · For fun',
    tagline: 'An LRU cache written in emojis',
    description:
      'A fully working LRU cache in PHP where every identifier — classes, methods, variables — is an emoji. Yes, it actually works. Installable via Composer.',
    tags: ['PHP', 'Composer'],
    colorA: '#f43f5e',
    colorB: '#f0abfc',
    link: 'https://github.com/rob893/emoji-cache',
    linkLabel: 'View on GitHub'
  }
];

export const ARCHIVE_URL = 'https://github.com/rob893';
