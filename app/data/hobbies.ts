// Off-duty records — professional tone, dossier-compliant.

export type Hobby = {
  name: string;
  log: string;
  body: string;
  stat: string;
};

export const hobbies: Hobby[] = [
  {
    name: "TENNIS",
    log: "./off-duty/tennis.log",
    body: "Singles and discipline on the line — footwork as timing, and matches as long integration tests against fatigue.",
    stat: "MATCH RECORD: STABLE",
  },
  {
    name: "LEGO / BUILDING",
    log: "./off-duty/lego.log",
    body: "Structural sets and deliberate assembly — quiet practice in tolerances, sequencing, and finishing.",
    stat: "ACTIVE BUILDS: ROTATING",
  },
  {
    name: "FITNESS",
    log: "./off-duty/fitness.log",
    body: "Strength and conditioning on a fixed schedule — recovery as maintenance window, consistency as SLO.",
    stat: "WEEKLY COMMIT: HIGH",
  },
  {
    name: "ENTREPRENEURSHIP",
    log: "./off-duty/venture.log",
    body: "Small ownership projects: scoping risk, shipping minimum instruments that measure real demand, and knowing when to cut scope.",
    stat: "MODE: BUILD · MEASURE",
  },
  {
    name: "GAME DEVELOPMENT",
    log: "./off-duty/games.log",
    body: "Systems-first hobby work — loops, economies, and tooling that stay legible when complexity piles on.",
    stat: "PIPELINE: EXPERIMENTAL",
  },
  {
    name: "CREATIVE FRONTEND",
    log: "./off-duty/interface.log",
    body: "Editorial typography, restrained motion, and interfaces that read as intentional — craft without noise.",
    stat: "AESTHETIC: NOIR · SHARP",
  },
];
