import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModernBackground from "@/components/ModernBackground";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abir-portfolio.vercel.app"),
  title: {
    default: "Md. Abir Hossen | Full Stack Developer",
    template: "%s | Md. Abir Hossen",
  },
  description:
    "Md. Abir Hossen, Full Stack Developer building websites and web apps powered by AI. Open to full-time and remote roles.",
  keywords: [
    "Md. Abir Hossen",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer",
    "AI Web Apps",
    "Software Engineer",
    "Rajshahi",
    "Bangladesh",
  ],
  authors: [{ name: "Md. Abir Hossen", url: "https://github.com/abirjuboraj" }],
  creator: "Md. Abir Hossen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abir-portfolio.vercel.app",
    title: "Md. Abir Hossen | Full Stack Developer",
    description:
      "Md. Abir Hossen, Full Stack Developer building websites and web apps powered by AI. Open to full-time and remote roles.",
    siteName: "Md. Abir Hossen Portfolio",
    images: [
      {
        url: "/photo.jpg",
        width: 1200,
        height: 630,
        alt: "Md. Abir Hossen - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Abir Hossen | Full Stack Developer",
    description:
      "Md. Abir Hossen, Full Stack Developer building websites and web apps powered by AI. Open to full-time and remote roles.",
    images: ["/photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} scroll-smooth dark`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-bg text-text font-sans antialiased flex flex-col relative selection:bg-blue/30 selection:text-white">
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-blue focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {/* Modern Interactive & Atmospheric Background System */}
        <ModernBackground />

        {/* Global Fixed Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
