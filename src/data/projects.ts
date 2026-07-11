export interface Project {
  name: string;
  category:
    | 'Web App'
    | 'Library'
    | 'Game'
    | 'Game Engine'
    | 'Mobile'
    | 'Platform';
  blurb: string;
  tech: string[];
  links: { label: string; url: string; kind: 'github' | 'live' | 'video' | 'download' | 'npm' }[];
  featured?: boolean;
}

/**
 * Personal projects, newest and most notable first.
 */
export const projects: Project[] = [
  {
    name: 'Downbeat',
    category: 'Web App',
    featured: true,
    blurb:
      'A band-management and live-gig platform: manage bands, members, setlists, and songs (with tempo, notes, and lyrics). Built on a modern .NET 10 + React 19 stack with full CI/CD, observability, and cloud deploy to Azure.',
    tech: ['.NET 10', 'React 19', 'TypeScript', 'PostgreSQL', 'Vite', 'Azure'],
    links: [
      { label: 'Live', url: 'https://downbeatapp.dev', kind: 'live' },
      { label: 'GitHub', url: 'https://github.com/rob893/downbeat', kind: 'github' }
    ]
  },
  {
    name: 'DerpCode',
    category: 'Web App',
    featured: true,
    blurb:
      'A coding-practice platform where developers solve programming challenges with automated test execution and seeded problem sets. Full-stack .NET 10 Web API (EF Core + Identity + Postgres) with a React front end.',
    tech: ['.NET 10', 'React', 'TypeScript', 'PostgreSQL', 'EF Core', 'xUnit'],
    links: [
      { label: 'Live', url: 'https://derpcode.dev', kind: 'live' },
      { label: 'GitHub', url: 'https://github.com/rob893/derpcode', kind: 'github' }
    ]
  },
  {
    name: 'WoW Auction House Watcher',
    category: 'Web App',
    featured: true,
    blurb:
      'A service and progressive web app that tracks World of Warcraft auction prices, letting users build watch lists and price-movement alerts. RESTful API with JSON Patch, EF Core code-first migrations, background jobs, and event-based alerting.',
    tech: ['Vue.js', 'TypeScript', 'C#', '.NET Core', 'Azure', 'Hangfire', 'Docker'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/wow-market-watcher', kind: 'github' },
      { label: 'Live', url: 'https://rob893.github.io/wow-market-watcher-ui', kind: 'live' }
    ]
  },
  {
    name: 'Entropy Game Engine',
    category: 'Game Engine',
    featured: true,
    blurb:
      'A fully functional 2D game engine in TypeScript modeled after Unity\u2019s architecture (component-based game objects, scenes). Features A* pathfinding over weighted graphs, spatial-hashing collision detection, 2D vector math, and a custom input/event system.',
    tech: ['TypeScript', 'Jest', 'Canvas'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/Entropy-Game-Engine', kind: 'github' },
      { label: 'Sample Game', url: 'https://rwherber.com/entropy/sample-game-1/', kind: 'live' }
    ]
  },
  {
    name: 'Algorithm Visualizer',
    category: 'Web App',
    featured: true,
    blurb:
      'An interactive pathfinding-algorithm visualizer that stands out from the crowd: all of the pathfinding logic is written in Rust and compiled to WebAssembly, then run at runtime in the browser.',
    tech: ['Rust', 'WebAssembly', 'TypeScript'],
    links: [
      { label: 'Live', url: 'https://rob893.github.io/algo-visualizer', kind: 'live' },
      { label: 'GitHub', url: 'https://github.com/rob893/algo-visualizer', kind: 'github' }
    ]
  },
  {
    name: 'Fireheart',
    category: 'Game',
    blurb:
      'A 3D action RPG where players explore a hand-crafted world, fight enemies with a complex ability system, and complete quests. NPC behavior via the state pattern; abilities via the strategy pattern.',
    tech: ['C#', 'Unity'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/RPG-Game-Scripts', kind: 'github' },
      { label: 'Video', url: 'https://www.youtube.com/watch?v=CD5NZsRF40s', kind: 'video' }
    ]
  },
  {
    name: 'typescript-extended-linq',
    category: 'Library',
    blurb:
      'A JavaScript/TypeScript library modeled after .NET\u2019s System.Linq, with additional operators inspired by MoreLINQ. Published to NPM.',
    tech: ['TypeScript', 'Node.js', 'Jest', 'NPM'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/typescript-extended-linq', kind: 'github' },
      { label: 'NPM', url: 'https://www.npmjs.com/package/typescript-extended-linq', kind: 'npm' }
    ]
  },
  {
    name: 'typescript-lru-cache',
    category: 'Library',
    blurb: 'A lightweight LRU cache library for JavaScript/TypeScript. Published to NPM.',
    tech: ['TypeScript', 'Node.js', 'Jest', 'NPM'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/typescript-lru-cache', kind: 'github' },
      { label: 'NPM', url: 'https://www.npmjs.com/package/typescript-lru-cache', kind: 'npm' }
    ]
  },
  {
    name: 'PHP OData Query Builder',
    category: 'Library',
    blurb: 'A PHP library for fluently building OData queries. Published to Packagist.',
    tech: ['PHP', 'PHPUnit', 'Packagist'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/PHP-OData-Query-Builder', kind: 'github' }
    ]
  },
  {
    name: 'emoji-cache',
    category: 'Library',
    blurb:
      'A fully working LRU cache implementation in PHP where every identifier \u2014 classes, methods, variables \u2014 is an emoji. Yes, it actually works. Installable via Composer. Purely for fun.',
    tech: ['PHP', 'Composer', 'Packagist'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/emoji-cache', kind: 'github' }
    ]
  },
  {
    name: 'Workout Scheduling App',
    category: 'Web App',
    blurb:
      'A web app for scheduling workout sessions. RESTful API with JSON Patch, EF Core code-first migrations, and JWT-based identity.',
    tech: ['C#', '.NET Core', 'Angular', 'TypeScript', 'MySQL', 'EF Core'],
    links: [{ label: 'GitHub', url: 'https://github.com/rob893/Workout-App', kind: 'github' }]
  },
  {
    name: "It's Another Clue!",
    category: 'Game',
    blurb:
      'A web riddle game where answering five riddles in a row wins. Answers are drawn from a pool of images (all Nicolas Cage!), with logic to avoid repeats within a playthrough.',
    tech: ['PHP', 'HTML', 'CSS', 'Bootstrap'],
    links: [
      { label: 'GitHub', url: 'https://github.com/rob893/AnotherClue', kind: 'github' },
      { label: 'Live', url: 'https://rwherber.com/another-clue/index.php', kind: 'live' }
    ]
  },
  {
    name: 'WoW Guild Sales App',
    category: 'Web App',
    blurb:
      'Tracks in-game sales events, customers, and currency owed to guild members. Integrates Blizzard\u2019s Battle.net and Warcraft Logs REST APIs to automate player data and payout calculations.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'REST'],
    links: [{ label: 'GitHub', url: 'https://github.com/rob893/OrderManagementSystem', kind: 'github' }]
  },
  {
    name: 'Mars Clock',
    category: 'Mobile',
    blurb:
      'An Android app displaying Coordinated Mars Time, Mars Sol Date, and Earth GMT, computed using formulas from NASA.',
    tech: ['Java', 'Android'],
    links: [{ label: 'GitHub', url: 'https://github.com/rob893/MarsClock', kind: 'github' }]
  }
];
