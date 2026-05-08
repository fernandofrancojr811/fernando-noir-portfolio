// Official record — University of Oklahoma (résumé). SHPE + credentialing tone.

export type Education = {
  institution: string;
  degree: string;
  graduation: string;
  location: string;
  honors?: string;
  coursework: string[];
  leadership?: string[];
};

export const education: Education[] = [
  {
    institution: "UNIVERSITY OF OKLAHOMA",
    degree: "BACHELOR OF SCIENCE — COMPUTER SCIENCE",
    graduation: "COMPLETED MAY 2025",
    location: "NORMAN, OKLAHOMA",
    honors: "GPA 3.41 / 4.0 · DEAN'S LIST (SELECT TERMS)",
    coursework: [
      "SOFTWARE ENGINEERING",
      "OPERATING SYSTEMS",
      "COMPUTER ARCHITECTURE",
      "DATA STRUCTURES & ALGORITHMS",
      "DATABASE SYSTEMS",
      "COMPUTER NETWORKS",
      "OBJECT-ORIENTED SYSTEMS",
      "DISCRETE MATHEMATICS",
    ],
    leadership: [
      "SOCIETY OF HISPANIC PROFESSIONAL ENGINEERS (SHPE) — MEMBER & ENGAGEMENT (OU)",
      "ENGINEERING / SYSTEMS TRACK — SOFTWARE & INTEGRATION FOCUS",
      "SCHOLARSHIPS (FILED): BOEING · HISPANIC SCHOLARSHIP FUND · CSINCLUDES — SEE CV",
    ],
  },
];
