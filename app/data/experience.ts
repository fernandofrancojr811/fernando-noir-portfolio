// Work log — résumé ordering and facts take precedence.

export type ExperienceStatus = "ACTIVE" | "ARCHIVED" | "OK" | "CLASSIFIED";

export type Experience = {
  company: string;
  role: string;
  /** Program or product line, e.g. B-52H Software Blocks */
  program?: string;
  dates: string;
  location: string;
  stack: string[];
  impact: string[];
  status: ExperienceStatus;
};

export const experience: Experience[] = [
  {
    company: "BOEING",
    role: "SOFTWARE ENGINEER",
    program: "B-52H SOFTWARE BLOCKS PROGRAM",
    dates: "DEC 2025 — PRESENT",
    location: "DEFENSE AEROSPACE — UNITED STATES",
    stack: [
      "C/C++",
      "Linux",
      "Embedded",
      "Simulation",
      "Avionics",
      "HIL",
      "V&V",
    ],
    impact: [
      "Develop and maintain real-time embedded flight and simulation software in C/C++ on Linux.",
      "Design and validate hardware–software interfaces for avionics and simulation environments.",
      "Execute unit, integration, and verification & validation workflows for mission-critical reliability.",
      "Support hardware-in-the-loop simulation, integration, and fault isolation.",
    ],
    status: "ACTIVE",
  },
  {
    company: "XVECTOR.US",
    role: "SECURE AI SOFTWARE ENGINEER",
    dates: "JUL 2025 — SEPT 2025",
    location: "EMBEDDED SYSTEMS — U.S.",
    stack: [
      "C/C++",
      "Python",
      "Embedded",
      "Telemetry",
      "AWS Cognito",
      "AWS KMS",
      "CloudWatch",
    ],
    impact: [
      "Optimized embedded C/C++ for constrained targets: −50% latency, −41% memory on representative workloads.",
      "Hardened telemetry pipelines for profiling, observability, and deployment feedback on resource-bound AI/ML hardware.",
      "Partnered on secure release workflows and integration between firmware, tooling, and operational monitoring.",
    ],
    status: "ARCHIVED",
  },
  {
    company: "CANDIDATE TOOLS",
    role: "SOFTWARE ENGINEER",
    dates: "APR 2025 — JUL 2025",
    location: "OPERATIONS — U.S.",
    stack: [
      "React",
      "Node.js",
      "Python",
      "REST",
      "MCU",
      "Docker",
    ],
    impact: [
      "Built MCU-backed device control paths with deterministic diagnostics integrated to field hardware.",
      "Shipped React + Node telemetry dashboards; reduced mean debugging cycle time by ~18%.",
      "Implemented Python REST services for configuration, telemetry ingress, and operator workflows.",
    ],
    status: "ARCHIVED",
  },
];
