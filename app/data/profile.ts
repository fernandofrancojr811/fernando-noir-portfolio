// Profile — canonical narrative for masthead, hero, ticker, and contact.
// Priority: résumé (user-supplied) > migration extracts > prior placeholder.

export const profile = {
  name: "FERNANDO FRANCO JR.",
  shortName: "Fernando Franco Jr.",
  title: "SOFTWARE ENGINEER",

  /** Masthead tagline under the hero name */
  tagline:
    "REAL-TIME SYSTEMS // DEFENSE // EMBEDDED // FULL-STACK // CLOUD",

  location: "OKLAHOMA, USA",

  /** Shown in metadata bar — current assignment reads as “active ops,” not job-market signal */
  status: "ACTIVE",

  /** Second line under status in the terminal pane */
  statusDetail: "BOEING — B-52H SOFTWARE BLOCKS // FLIGHT & SIMULATION",

  callsign: "ff_jr",

  /** Terminal window title bar */
  shell: "user@fernando:~",

  /** whoami line uses shortName + title; prompt uses these */
  terminal: {
    user: "user@fernando",
    cwd: "~",
    finalCommand: "open mission-report.log",
  },

  /** One-line editorial hero abstract (italic lead) */
  heroAbstract:
    "Mission-critical aerospace and distributed software — embedded, simulated, and verified before it ever touches the aircraft.",

  /** Professional summary / deck — résumé-first, systems tone */
  deck:
    "Software engineer building mission-critical aerospace and distributed systems across embedded C/C++, Linux, simulation, and cloud. Work spans flight and simulation software, hardware–software interfaces, telemetry and observability, verification & validation, and secure full-stack tooling when the mission needs a dashboard — not a slide deck.",

  stats: [
    { label: "PRIMARY LANGUAGES", value: "C · C++ · PYTHON · JAVA" },
    { label: "DOMAINS", value: "EMBEDDED · SIM · CLOUD" },
    { label: "RUNTIME", value: "LINUX · RT · DISTRIBUTED" },
    { label: "CURRENT ASSIGNMENT", value: "BOEING · B-52H" },
  ],

  links: {
    email: "mailto:francofernando77@gmail.com",
    github: "https://github.com/fernandofrancojr811",
    linkedin: "https://www.linkedin.com/in/fernando-franco-jr/",
    /** Place canonical PDF at public/resume.pdf for downloads */
    resume: "/resume.pdf",
  },

  /** `ls`-style directories in the hero terminal */
  focusDirs: [
    "aerospace-flight-software/",
    "simulation-hil/",
    "embedded-linux/",
    "telemetry-pipelines/",
    "secure-cloud-services/",
    "full-stack-telemetry-ui/",
  ],

  classifiedQuote:
    "Flight software temperament: measure twice, integrate once, sign the log.",

  ticker: [
    "MISSION-CRITICAL SOFTWARE",
    "B-52H SOFTWARE BLOCKS PROGRAM",
    "EMBEDDED C/C++ · LINUX",
    "HIL · SIMULATION · V&V",
    "TELEMETRY · DASHBOARDS · DISTRIBUTED SYSTEMS",
    "CLEARANCE: AVAILABLE ON REQUEST",
    "PORTFOLIO DOSSIER // STATIC BUILD OK",
  ],
} as const;

export type Profile = typeof profile;
