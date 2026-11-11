export type ProjectCategory = "fullstack" | "frontend";

export interface Project {
  slug: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  challenges: string[];
  futurePlans: string[];
  image: string;
  category: ProjectCategory;
  isDeveloping?: boolean;
}

export const projectsData: Project[] = [
  {
    slug: "studiospace",
    name: "StudioSpace",
    description:
      "A modern, peer-to-peer creative workspace rental and studio booking platform. Connects photographers, videographers, podcasters, music producers, and artists with professionally equipped studios and soundstages with instant booking capabilities, conflict detection, and host listing management.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Better Auth",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    liveUrl: "https://studiospace-client.vercel.app",
    githubUrl: "https://github.com/abirjuboraj/studioSpace-client",
    challenges: [
      "Designing a real-time reservation conflict detection and slot validation algorithm to prevent overlapping bookings across operating hours.",
      "Implementing self-service booking lifecycle management (Pending, Confirmed, Completed, Cancelled) while dynamically recalculating creator spending and host payout metrics.",
      "Integrating Better Auth with credential validation, Google OAuth, and JWT session authorization across client and Express backend.",
    ],
    futurePlans: [
      "Integrate Stripe & SSLCommerz for real-time escrow payments and automated host security deposit refunds.",
      "Add interactive 360-degree virtual studio tours and equipment rental add-ons at checkout.",
      "Implement real-time in-app chat between studio hosts and creators using WebSockets.",
    ],
    image: "/projects/studiospace.jpg",
    category: "fullstack",
    isDeveloping: true,
  },
  {
    slug: "bazar-dor",
    name: "BazarDor (বাজার দর)",
    description:
      "A Bengali online marketplace web app where users can browse products by category, search for what they need, sign up or sign in, and manage their profile. The interface is responsive on mobile, tablet and desktop, with toast notifications for feedback.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Better Auth",
      "MongoDB",
      "React Hot Toast",
      "React Icons",
    ],
    liveUrl: "https://b14-bazar-dor.vercel.app",
    githubUrl: "https://github.com/abirjuboraj/b14-Bazar-Dor",
    challenges: [
      "Setting up Better Auth with MongoDB for sign up and sign in.",
      "Keeping the layout consistent across screen sizes.",
      "Handling loading states while data is fetched.",
    ],
    futurePlans: [
      "Add cart and checkout.",
      "Add product search and filters.",
      "Add an admin dashboard to manage products.",
    ],
    image: "/projects/bazar-dor.png",
    category: "frontend",
  },
  {
    slug: "fitlog",
    name: "FITLOG",
    description:
      "A fitness companion app to discover workouts, build a daily workout plan and save exercises for later. Each workout has detailed info (muscle group, equipment, difficulty, duration, calories, sets, reps, rating) plus step-by-step instructions. The workout list can be sorted by duration, calories or rating.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "React Icons",
      "React Toastify",
    ],
    liveUrl: "https://b14-a6-fit-log.vercel.app/",
    githubUrl: "https://github.com/abirjuboraj/B14-A6-fit-log",
    challenges: [
      "Managing \"Today's Plan\" and \"Saved\" workouts across different pages.",
      "Implementing sorting by multiple criteria.",
      "Designing a clean workout details page.",
    ],
    futurePlans: [
      "Persist plans and saved workouts in a database.",
      "Add user accounts and progress tracking with charts.",
      "Add custom workout creation.",
    ],
    image: "/projects/fitlog.png",
    category: "frontend",
  },
  {
    slug: "bangla-news-24",
    name: "Bangla News 24",
    description:
      "A modern, responsive Bengali news website. Readers can browse the latest news, explore stories by category and open full article pages. It fetches content from a news API, shows loading UI while data loads, has custom error pages, and supports user authentication.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Better Auth",
      "MongoDB",
      "News API",
    ],
    liveUrl: "https://bangla-news-24-coral.vercel.app/",
    githubUrl: "https://github.com/abirjuboraj/bangla-news-24",
    challenges: [
      "Fetching and displaying data from a news API with proper loading and error states.",
      "Building dynamic category and details routes.",
      "Integrating Better Auth with MongoDB.",
    ],
    futurePlans: [
      "Add search and bookmarks.",
      "Add pagination or infinite scroll.",
      "Add dark mode and a breaking-news ticker.",
    ],
    image: "/projects/bangla-news-24.png",
    category: "frontend",
  },
  // {
  //   slug: "devconf-2026",
  //   name: "DevConf 2026",
  //   description:
  //     "A clean landing page for a three-day developer conference in San Francisco. It shows the speakers across four tracks (AI/ML, Cloud & DevOps, Frontend, Security), three ticket plans (Standard, Pro, Team) and venue details like parking, transit and accessibility. Fully responsive.",
  //   techStack: ["HTML5", "CSS3"],
  //   liveUrl: "https://abirjuboraj.github.io/B14-A01/",
  //   githubUrl: "https://github.com/abirjuboraj/B14-A01",
  //   challenges: [
  //     "Building a fully responsive layout with plain CSS only.",
  //     "Structuring many sections (speakers, tickets, venue) so the page stays easy to scan.",
  //   ],
  //   futurePlans: [
  //     "Add a working registration form and ticket selection with JavaScript.",
  //     "Add animations and a countdown timer.",
  //     "Rebuild it with React or Next.js.",
  //   ],
  //   image: "/projects/devconf-2026.png",
  //   category: "frontend",
  // },
];
