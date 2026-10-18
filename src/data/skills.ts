export type SkillCategory = "Frontend" | "Backend" | "Tools";
export type SkillLevel = "Beginner" | "Intermediate";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  levelSegments: 1 | 2 | 3;
  brandColor: string;
  iconName: string; // Identifier for component rendering
}

export const skillsData: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#61DAFB",
    iconName: "SiReact",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#FFFFFF",
    iconName: "SiNextdotjs",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#F7DF1E",
    iconName: "SiJavascript",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#3178C6",
    iconName: "SiTypescript",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#38BDF8",
    iconName: "SiTailwindcss",
  },
  // Backend
  {
    name: "MongoDB",
    category: "Backend",
    level: "Beginner",
    levelSegments: 1,
    brandColor: "#47A248",
    iconName: "SiMongodb",
  },
  {
    name: "Better Auth",
    category: "Backend",
    level: "Beginner",
    levelSegments: 1,
    brandColor: "#93C5FD",
    iconName: "BetterAuth",
  },
  // Tools
  {
    name: "Git",
    category: "Tools",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#F05032",
    iconName: "SiGit",
  },
  {
    name: "GitHub",
    category: "Tools",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#FFFFFF",
    iconName: "SiGithub",
  },
  {
    name: "Vercel",
    category: "Tools",
    level: "Intermediate",
    levelSegments: 2,
    brandColor: "#FFFFFF",
    iconName: "SiVercel",
  },
];
