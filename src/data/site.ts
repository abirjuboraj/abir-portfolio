export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  location: string;
}

export const siteConfig = {
  name: "Md. Abir Hossen",
  shortName: "Abir Hossen",
  initials: "AH",
  role: "Full Stack Developer",
  url: "https://abir-portfolio.vercel.app",
  metaDescription:
    "Md. Abir Hossen, Full Stack Developer building websites and web apps powered by AI. Open to full-time and remote roles.",
  headline: "Hi, I'm Abir Hossen",
  typingTitles: [
    "Full Stack Developer",
    "Next.js & TypeScript",
    "Building with AI",
  ],
  heroIntro:
    "A Full Stack Developer building websites and web apps powered by AI. Turning ideas into working products with Next.js, TypeScript and Tailwind CSS.",
  badgeText: "Open to full-time & remote roles",
  socials: {
    github: {
      name: "GitHub",
      url: "https://github.com/abirjuboraj",
      label: "Visit Abir Hossen's GitHub Profile",
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abirhossenjuboraj",
      label: "Connect with Abir Hossen on LinkedIn",
    },
    facebook: {
      name: "Facebook",
      url: "https://www.facebook.com/share/1KFmqXwP7i/",
      label: "Visit Abir Hossen on Facebook",
    },
  },
  contact: {
    email: "abirhj2010@gmail.com",
    phone: "+8801773341277",
    phoneRaw: "+8801892317192",
    whatsappUrl: "https://wa.me/8801773341277",
    location: "Rajshahi, Bangladesh",
  },
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  copyrightYear: 2026,
};
