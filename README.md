# Md. Abir Hossen — Developer Portfolio

A production-grade, responsive developer portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Designed with a neutral dark theme, subtle blue accents, micro-interactions, smooth scrolling, and dynamic project case study pages.

---

## 🚀 Live Demo & Repository

- **Live Website**: [abir-portfolio.vercel.app](https://abir-portfolio.vercel.app)
- **GitHub Repository**: [github.com/abirjuboraj/abir-portfolio](https://github.com/abirjuboraj/abir-portfolio)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server-Side Static Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, fully typed data layer)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS variables & `@theme` design tokens)
- **Typography**: [Sora](https://fonts.google.com/specimen/Sora) (Headings) & [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Body) via `next/font/google`
- **Animations**: [Framer Motion](https://www.framer-motion.dev/) (Scroll spy, spring progress bars, 3D tilt, reveal animations)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/si`, `react-icons/hi2`, `react-icons/fa6`)
- **Optimization**: `next/image` with responsive `sizes` and graceful fallback states

---

## ✨ Key Features

1. **Dark Design System**:
   - Built with curated tokens (`bg #09090B`, `surface #111114`, `raised #18181C`, `line rgba(255,255,255,0.09)`, `text #FAFAFA`, `muted #A1A1AA`, `blue #3B82F6`, `soft-blue #93C5FD`).
   - Architectural ambient background grid and soft radial light flares for depth.
   - Blue is reserved exclusively for primary CTAs, active indicators, and timeline accents.

2. **Hero Section & Interactive Tech Orbit**:
   - Availability status badge with a live pulsing green indicator.
   - Dynamic typewriter rotating line ("Full Stack Developer", "Next.js & TypeScript", "Building with AI").
   - Portrait photo frame with rotating gradient ring and fallback monogram.
   - 4 interactive floating tech buttons (Next.js, TypeScript, React, Tailwind CSS) with tooltips, brand-color glow, and 3D mouse parallax.
   - Faint desktop cursor-follow glow (max 10% opacity).

3. **Smooth-Scroll Navigation**:
   - Blurred glass fixed navbar with scroll progress bar at the very top.
   - Smooth scrolling with active section indicator pill and reliable anchor scrolling.
   - Full-width mobile slide-down drawer with keyboard (Esc) and click-outside dismissal.

4. **About & Background**:
   - 3 narrative paragraphs outlining engineering roots and enthusiasm for web & AI.
   - Count-up animated stat counters (4 Projects, 10 Tools, 4 Deployments).
   - "More about me" divider leading to 4 Interests cards (Football, Movies, Gardening, Science).
   - 3 Career focus role cards with sliding blue accent bars on hover.
   - Full-width banner: *"Looking for full-time, remote opportunities."*

5. **Education Timeline**:
   - Vertical timeline with continuous track and a blue progress line filling on scroll.
   - Interactive nodes with illuminated dots.
   - Hover spotlight cards with animated SVG circular score rings (RUET CGPA 3.68/4.00, Rajshahi College GPA 5.00/5.00, Dhangora High School GPA 5.00/5.00).

6. **Technical Skills**:
   - Infinite marquee of skill pills that pauses on hover.
   - Interactive category filter tabs (All, Frontend, Backend, Tools) with counts.
   - Skill cards with 3-segment level meters (Intermediate / Beginner) and brand-colored hover spotlight.

7. **Featured Projects & Dynamic Case Study Pages**:
   - Responsive grid (compact on mobile, 2 columns on tablet & desktop).
   - 3D interactive tilt cards with tags, live links, and GitHub links.
   - Dynamic detail pages (`/projects/[slug]`) built with Next.js dynamic routing, `await params`, `generateStaticParams`, and `generateMetadata`.
   - Comprehensive case studies featuring Challenges Faced, Future Improvements, and Previous/Next project navigation.
   - Interactive GitHub callout box encouraging visitors to explore open-source work.

8. **Contact Section & Footer**:
   - Clickable contact cards for Email, Phone, WhatsApp, and Location with instant "Copied ✓" clipboard feedback.
   - Floating-label contact form with client-side validation and Formspree integration.
   - Footer featuring live local time for Rajshahi, Bangladesh (Asia/Dhaka, updates every 30s), magnetic social buttons, back-to-top button, and a JS auto-fitted giant ghost "ABIR HOSSEN" watermark spanning 95% of viewport width.

9. **SEO & Accessibility**:
   - Open Graph & Twitter summary card metadata.
   - Dynamic XML sitemap (`/sitemap.xml`) and robots crawler file (`/robots.txt`).
   - Accessible semantic tags, keyboard skip-to-content link, `aria-labels`, and custom 404 page.

---

## 📁 Project Structure

```
abir-portfolio/
├── public/
│   ├── favicon.ico              # Multi-resolution AH monogram icon
│   ├── icon.svg                 # Scalable vector favicon
│   ├── icon.png                 # 32x32 PNG favicon
│   ├── apple-icon.svg           # Scalable Apple touch icon
│   ├── apple-touch-icon.png     # 180x180 Apple touch icon
│   ├── photo.jpg                # Portrait photograph
│   ├── resume.pdf               # Downloadable CV / resume
│   └── projects/                # Project screenshots
│       ├── bazar-dor.png
│       ├── fitlog.png
│       ├── bangla-news-24.png
│       └── devconf-2026.png
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens, @theme, animations & textures
│   │   ├── layout.tsx           # Sora & DM Sans fonts, ambient layer, Navbar, Footer
│   │   ├── not-found.tsx        # Custom 404 error page
│   │   ├── page.tsx             # Home page assembling all sections & dividers
│   │   ├── robots.ts            # Search engine crawler configuration
│   │   ├── sitemap.ts           # Dynamic XML sitemap generator
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx     # Dynamic project detail page (Next.js 16)
│   ├── components/
│   │   ├── About.tsx            # Biography, stats counters, interests, career roles
│   │   ├── Contact.tsx          # Copy cards & floating label Formspree form
│   │   ├── Education.tsx        # Vertical timeline with animated SVG score rings
│   │   ├── Footer.tsx           # Contact statement, navigation, Dhaka time, ghost text
│   │   ├── Hero.tsx             # Status badge, typewriter, CTAs, TechOrbit
│   │   ├── ImageWithFallback.tsx# Image display component with fallback state
│   │   ├── Navbar.tsx           # Fixed glass navigation bar & mobile drawer
│   │   ├── ProjectCard.tsx      # 3D tilt card with tags & case study link
│   │   ├── Projects.tsx         # Responsive projects grid & GitHub callout
│   │   ├── Reveal.tsx           # Staggered scroll-reveal motion wrapper
│   │   ├── ScrollProgress.tsx   # Top progress bar
│   │   ├── SectionDivider.tsx   # Outward animated section dividers
│   │   ├── SectionHeading.tsx   # Eyebrow, gradient last word, subtitle
│   │   ├── Skills.tsx           # Infinite marquee, filter pills & skill meters
│   │   └── TechOrbit.tsx        # Photo frame & 4 floating tech buttons
│   └── data/
│       ├── education.ts         # Education history & academic scores
│       ├── projects.ts          # Featured projects data & challenges
│       ├── site.ts              # Personal info, contact details & social links
│       └── skills.ts            # Technical skills, categories & brand colors
├── .env.example                 # Environment variables template
├── next.config.ts               # Next.js compiler & turbopack configuration
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- npm, yarn, pnpm, or bun

### 1. Clone the repository

```bash
git clone https://github.com/abirjuboraj/abir-portfolio.git
cd abir-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Add your [Formspree](https://formspree.io) form ID to enable the contact form:

```env
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## ✏️ Content Customization Guide

All personal and project data is separated into typed files under `src/data/`:

| File | Content |
|---|---|
| [`src/data/site.ts`](file:///c:/html/Projects_new_course/my%20portfolio/abir-portfolio/src/data/site.ts) | Name, role, contact info, email, phone, location, social URLs |
| [`src/data/projects.ts`](file:///c:/html/Projects_new_course/my%20portfolio/abir-portfolio/src/data/projects.ts) | Project list (slug, title, description, tech stack, links, challenges, future plans, image) |
| [`src/data/skills.ts`](file:///c:/html/Projects_new_course/my%20portfolio/abir-portfolio/src/data/skills.ts) | Skill list, categories (Frontend, Backend, Tools), mastery levels, and brand colors |
| [`src/data/education.ts`](file:///c:/html/Projects_new_course/my%20portfolio/abir-portfolio/src/data/education.ts) | Degrees, institutions, periods, badges, and CGPA/GPA values |

### Adding a new project

Append an object to `projectsData` in [`src/data/projects.ts`](file:///c:/html/Projects_new_course/my%20portfolio/abir-portfolio/src/data/projects.ts):

```typescript
{
  slug: "my-project",
  name: "My Project Name",
  description: "Detailed description of the application...",
  techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  liveUrl: "https://my-project.vercel.app",
  githubUrl: "https://github.com/abirjuboraj/my-project",
  challenges: [
    "Challenge 1 encountered during development.",
    "Challenge 2 resolved with specific architecture."
  ],
  futurePlans: [
    "Feature planned for future release."
  ],
  image: "/projects/my-project.png"
}
```

Next.js will automatically generate its static `/projects/my-project` detail page, sitemap entry, and home page card with zero extra configuration.

---

## 🚢 Deployment

The portfolio is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the project on [Vercel](https://vercel.com/new).
3. Add `NEXT_PUBLIC_FORMSPREE_ID` under Environment Variables.
4. Click **Deploy**.

---

## 📬 Contact

- **Name**: Md. Abir Hossen
- **Email**: [abirhj2010@gmail.com](mailto:abirhj2010@gmail.com)
- **Phone**: [+8801773341277](tel:+8801773341277)
- **LinkedIn**: [linkedin.com/in/abirhossenjuboraj](https://www.linkedin.com/in/abirhossenjuboraj)
- **GitHub**: [github.com/abirjuboraj](https://github.com/abirjuboraj)
- **Location**: Rajshahi, Bangladesh

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
