export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  location?: string;
  current?: boolean;
  points: string[];
  tags?: string[];
}

/**
 * Professional experience. Microsoft entries are intentionally generalized —
 * no internal project codenames, and internal metrics are softened/rounded.
 */
export const experience: Experience[] = [
  {
    role: 'Principal Software Engineer',
    company: 'Microsoft',
    start: 'Sep 2025',
    end: 'Present',
    current: true,
    tags: ['C#', '.NET', 'Azure', 'AI Agents', 'MCP', 'TypeScript'],
    points: [
      'Designed and built an internal Model Context Protocol (MCP) server that became a primary way engineers and AI agents interact with the platform — scaled from a few hundred to ~9,500 monthly users, serving millions of requests weekly.',
      "Authored my organization's official guidelines for building remote MCP servers — distilled from building its first production MCP server — covering secure authentication, security and compliance, multi-region deployment, tooling, and observability. Now the org-wide standard, they let teams ship MCP servers quickly and consistently while being secure and compliant by default when the guidance is followed.",
      'Built a high-performance 3 tier cache-backed data-access (Kusto and Azure Data Explorer) SDK now load-bearing across multiple services — cutting multiple key services p50 latency roughly in half at 50%+ cache hit rates.',
      'Built an internal VS Code extension enabling interactive agentic workflows directly from the editor — 15,000+ installs across the company.',
      "Built (Electron, React, TypeScript) an internal dev-tools app — the favorite thing I've built at Microsoft — that unifies the tools engineers reach for every day into one place: an HTTP/API client, a Kusto query editor, a notes workspace, benchmarking and performance tools, and DevToys-style utilities (formatters, JWT inspectors, and more), with deep integrations into our on-call/incident-management, customer-support, and Azure DevOps systems.",
      'I gave this dev tools app a built-in JavaScript scripting engine so engineers can automate almost anything — from reacting to system events to trigger Copilot CLI, to running a game of Tetris — and tailored each tool to our team (its API client, for example, auto-syncs request collections across the team via Azure DevOps). Every engineer on the team now uses it daily: ~32 active users ran 774 sessions and triggered 37,000+ tool actions (≈1,175 per user) over the first 3 months of adoption.',
      'Mentored junior engineers, ran bi-annual hackathons, and represented my team in engineering-fundamentals and live-site forums.'
    ]
  },
  {
    role: 'Senior Software Engineer',
    company: 'Microsoft',
    start: 'Mar 2022',
    end: 'Sep 2025',
    tags: ['C#', '.NET', 'React', 'Azure', 'Hangfire', 'Kusto'],
    points: [
      'Led a team that designed and built a system scanning Microsoft source code for security violations and, using internal AI tools, opening automatic pull requests to fix them — thousands of PRs to date, saving tens of thousands of developer hours.',
      'Built (in C#/.NET and React) a platform that helps Microsoft measure and track governance, compliance, and security requirements for every service across the company.',
      'Built a syncing system (.NET + Hangfire on Azure) that automatically creates and updates Azure DevOps work items for security and compliance issues for engineers company-wide, cutting resolution time for synced violations by ~20%.',
      'Led the incident response for a major authentication vulnerability across all of our services; authored the postmortem and presented it to senior leadership, driving fixes and doc improvements adopted by other teams.',
      'Designed and built from scratch a deployment-gate system (Azure Functions, TypeScript/Node) that lets any engineer author end-to-end tests which run automatically against our canary regions during CI — blocking bad builds from reaching production. It runs ~200 e2e tests per production deployment, helped sustain our 99.9% uptime SLA, and is confirmed to have prevented multiple production outages.',
      'Earned the Azure Impact Award in both 2023 and 2024.'
    ]
  },
  {
    role: 'Software Engineering Lead',
    company: 'MGM Resorts International',
    start: 'Jul 2021',
    end: 'Mar 2022',
    tags: ['C#', '.NET', 'Azure', 'Leadership'],
    points: [
      'Led a team of 15 engineers building and maintaining C#/.NET services in Azure that power the digital check-in experience.',
      'Delivered digital check-in\u2019s first monetization feature (reservation add-ons), generating $1.3M in the first two months.',
      'Designed and built a cloud housekeeping service that stays in sync with the on-premises source system while providing a fast, highly scalable, highly available API to clients.'
    ]
  },
  {
    role: 'Senior Software Engineer',
    company: 'MGM Resorts International',
    start: 'Jan 2020',
    end: 'Jul 2021',
    tags: ['Node.js', 'GraphQL', 'TypeScript', 'AWS', 'Terraform'],
    points: [
      'Delivered core backend services for contactless digital check-in six months ahead of schedule, helping reduce operational loss from $300M/month to $100M/month.',
      'Led development of a GraphQL layer (Apollo Server, Node.js, TypeScript) unifying many REST services into a single, easy-to-consume API for client apps.',
      'Designed the GraphQL service to scale out to millions of requests per day using AWS ECS and Lambda.',
      'Built CI/CD with GitHub Actions and Terraform infrastructure-as-code, plus automated dashboards, monitoring, and alerting to consistently meet a 99.9% uptime SLA.'
    ]
  },
  {
    role: 'Applications Developer II',
    company: 'Centuri Group',
    start: 'Mar 2019',
    end: 'Jan 2020',
    tags: ['C#', '.NET Core', 'TypeScript', 'PHP', 'Angular'],
    points: [
      'Led the initiative to migrate back-end web services from PHP to .NET Core, yielding up to 100% faster HTTP requests and tighter integration with our Microsoft stack.',
      'Mentored junior and senior developers on C#, TypeScript, and common design patterns.',
      'Championed TypeScript for front-end development, producing more maintainable, self-documenting code with fewer runtime errors.',
      'Built and maintained in-house apps for daily progress reporting, safety audits, and materials management, plus a fluent OData Query Builder library that sped up team development.'
    ]
  },
  {
    role: 'Software Developer Contractor',
    company: 'Wellborn Cabinets',
    start: 'Aug 2016',
    end: 'Jan 2019',
    tags: ['PHP', 'JavaScript', 'Swift', 'SQL', 'Google APIs'],
    points: [
      'Built a web + iOS geofencing application (PHP, JavaScript, SQL, Swift, Google Maps API) that records entries/exits for user-defined map shapes.',
      'Integrated Google Drive, Gmail, YouTube, and Calendar APIs into the company\u2019s content management system, and used the QuickBooks API with OAuth2 for secure transactions.',
      'Built numerous PHP CRUD, scheduling, and room-design applications to collect, analyze, and display business data.'
    ]
  },
  {
    role: 'Software Developer Contractor',
    company: 'Able Games LLC',
    start: 'Dec 2017',
    end: 'Aug 2018',
    tags: ['C#', 'Unity', 'AI'],
    points: [
      'Built a mobile game (Android and iOS) in Unity/C# as part of a small team.',
      'Developed the game\u2019s AI using finite state machines and behavior trees, and scripted ~80% of gameplay mechanics.',
      'Optimized to hold 30+ FPS on target devices while simulating up to 50 units on screen, and demoed the prototype at the 2018 Game Developers Conference.'
    ]
  },
  {
    role: 'CBRN Specialist (Sergeant)',
    company: 'U.S. Army Reserves',
    start: 'Nov 2009',
    end: 'Nov 2017',
    tags: ['Leadership', 'Discipline'],
    points: [
      'Sergeant directly responsible for managing, leading, and training 4 soldiers and over $1.5M of military equipment.',
      'Experienced in detecting, handling, analyzing, and decontaminating hazardous materials across 5 major training events.',
      'Distinguished Honor Graduate of the Army Warrior Leadership Course.'
    ]
  }
];
