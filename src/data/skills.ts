export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'KQL', 'Python', 'PHP', 'Rust', 'Java', 'Lua']
  },
  {
    title: 'Frameworks & Runtimes',
    skills: ['.NET / .NET Core', 'React', 'Vue.js', 'Angular', 'Node.js', 'Apollo GraphQL', 'Hangfire', 'Unity', 'Vite']
  },
  {
    title: 'Cloud & Infra',
    skills: [
      'Azure (Functions, App Service, Cosmos DB, Event Hub, Front Door, App Insights)',
      'AWS (Lambda, ECS, Fargate, API Gateway, DynamoDB, CloudWatch)',
      'Docker',
      'Terraform',
      'OneBranch / Azure DevOps',
      'ARM Templates'
    ]
  },
  {
    title: 'AI & Agents',
    skills: ['Model Context Protocol (MCP)', 'AI-assisted development', 'Copilot CLI', 'LLM integration', 'Responsible AI', 'Agentic workflows']
  },
  {
    title: 'Data & Messaging',
    skills: ['PostgreSQL', 'SQL Server', 'MySQL', 'Cosmos DB', 'DynamoDB', 'Kusto (Azure Data Explorer)', 'Redis', 'Event Hub / Event Grid']
  },
  {
    title: 'Practices & Concepts',
    skills: [
      'RESTful APIs',
      'GraphQL',
      'Serverless',
      'Infrastructure as Code',
      'Design Patterns',
      'OOA/D & OOP',
      'Distributed systems',
      'CI/CD',
      'Testing & QA',
      'Agile'
    ]
  }
];
