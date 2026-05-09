// Profile — canonical narrative for masthead, hero, ticker, and contact.
// Priority: résumé (user-supplied) > migration extracts > prior placeholder.

export const profile = {
  name: "FERNANDO FRANCO JR.",
  shortName: "Fernando Franco Jr.",
  title: "SOFTWARE ENGINEER",

  /** Masthead tagline under the hero name */
  tagline:
    "REAL-TIME SYSTEMS // EMBEDDED // DISTRIBUTED // CLOUD // INTERFACES",

  location: "OKLAHOMA, USA",

  /** Shown in metadata bar — editorial status read */
  status: "ACTIVE",

  /** Second line under status in the terminal pane */
  statusDetail: "BOEING — AEROSPACE FLIGHT & SIMULATION SOFTWARE",

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
    "Engineer at the seam where embedded systems, real-time software, and the cloud quietly converge — building infrastructure that reads more like an interface than a wiring diagram.",

  /** Professional summary / deck — résumé-first, systems tone */
  deck:
    "Software engineer working across embedded C/C++, real-time Linux, simulation, and cloud — currently shipping aerospace flight and simulation software at Boeing. Drawn to the rare projects where embedded, distributed, and human-facing layers all meet, and where careful engineering quietly turns into something that feels like good design.",

  stats: [
    { label: "LANGUAGES", value: "C · C++ · PYTHON · JAVA" },
    { label: "DOMAINS", value: "EMBEDDED · SIMULATION · CLOUD" },
    { label: "RUNTIMES", value: "LINUX · REAL-TIME · DISTRIBUTED" },
    { label: "CURRENTLY", value: "BOEING · AEROSPACE SOFTWARE" },
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
    "Good engineering ages quietly into good design — the architecture stops being noticed and just gets trusted.",

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
