// Technical capability map — grouped for the dossier skills section.

export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    items: ["C", "C++", "Python", "Java", "TypeScript", "SQL", "Bash"],
  },
  {
    id: "embedded-systems",
    label: "EMBEDDED / SYSTEMS",
    items: [
      "Real-time systems",
      "Embedded software",
      "Linux / Unix development",
      "Simulation systems",
      "Hardware–software integration",
      "Debugging",
      "Performance optimization",
      "Fault-tolerant systems",
    ],
  },
  {
    id: "cloud-devops",
    label: "CLOUD & DEVOPS",
    items: [
      "AWS",
      "S3",
      "Lambda",
      "ECS",
      "CloudWatch",
      "Cognito",
      "KMS",
      "Docker",
      "GitHub Actions",
      "GitLab CI/CD",
    ],
  },
  {
    id: "networking-tooling",
    label: "NETWORKING / TOOLING",
    items: [
      "TCP/IP",
      "System monitoring",
      "Unit testing",
      "Peer code review",
      "CMake",
      "Make",
    ],
  },
  {
    id: "full-stack",
    label: "FULL-STACK",
    items: [
      "React",
      "Node.js",
      "REST APIs",
      "Telemetry dashboards",
      "Data visualization systems",
    ],
  },
  {
    id: "tools",
    label: "TOOLS & PROCESS",
    items: [
      "Git",
      "Jira",
      "Agile",
      "IBM DOORS",
      "Jenkins",
      "Confluence",
      "Bitbucket",
    ],
  },
];
