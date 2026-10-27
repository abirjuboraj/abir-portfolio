"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineArrowUpRight,
  HiOutlineChevronUp,
  HiOutlinePhone,
} from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Live Rajshahi (Asia/Dhaka) Local Time
  const [dhakaTime, setDhakaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setDhakaTime(timeString);
      } catch {
        setDhakaTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Back to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getHref = (href: string) => {
    if (isHomePage) return href;
    return `/${href}`;
  };


  // Magnetic hover effect helper for social buttons
  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate3d(0, 0, 0)";
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();

      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "#home");
      } else {
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navHeight = 72;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const targetPosition = Math.max(0, elementPosition - navHeight);
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  return (
    <footer className="relative bg-[#09090b] border-t border-line py-12 md:py-16 overflow-hidden z-20">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Three Columns: Left Statement, Middle Navigate, Right Connect */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Left Column: Statement & Large Email */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-sora text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-snug">
                Have an idea? <br />
                <span className="bg-gradient-to-r from-soft-blue to-blue bg-clip-text text-transparent">
                  Let&apos;s build it.
                </span>
              </h2>

              {/* Large interactive email link */}
              <div className="my-5">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group inline-flex items-center gap-2 text-base sm:text-xl font-medium text-text hover:text-white transition-colors"
                >
                  <span className="relative">
                    {siteConfig.contact.email}
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue origin-bottom-right scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left transition-transform duration-300" />
                  </span>
                  <HiOutlineArrowUpRight className="w-5 h-5 text-soft-blue transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column: Navigate (stacks to 2 columns on mobile) */}
          <div className="md:col-span-3">
            <h3 className="font-sora text-xs font-semibold text-soft-blue uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-muted hover:text-white transition-all duration-200 inline-block hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Connect */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="font-sora text-xs font-semibold text-soft-blue uppercase tracking-wider mb-4">
                Connect
              </h3>

              {/* Social buttons with magnetic hover */}
              <div className="flex items-center gap-3 mb-6">
                <a
                  href={siteConfig.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                  aria-label={siteConfig.socials.github.label}
                  className="w-10 h-10 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-white hover:border-white/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  <SiGithub className="w-4 h-4" />
                </a>

                <a
                  href={siteConfig.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                  aria-label={siteConfig.socials.linkedin.label}
                  className="w-10 h-10 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>

                <a
                  href={siteConfig.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                  aria-label={siteConfig.socials.facebook.label}
                  className="w-10 h-10 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>

              {/* Direct links */}
              <div className="space-y-2 text-xs text-muted mb-6">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-text transition-colors"
                >
                  <HiOutlinePhone className="w-3.5 h-3.5 text-soft-blue" />
                  <span>{siteConfig.contact.phoneRaw}</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-text transition-colors"
                >
                  <FaWhatsapp className="w-3.5 h-3.5 text-soft-blue" />
                  <span>WhatsApp ({siteConfig.contact.phone})</span>
                </a>
              </div>
            </div>

            {/* Bottom Row: Local Time and Back to Top */}
            <div className="flex items-center justify-between pt-4 border-t border-line/60">
              {/* Live Rajshahi Time */}
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>
                  Rajshahi {dhakaTime ? `• ${dhakaTime}` : ""}
                </span>
              </div>

              {/* Back to top button */}
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="w-9 h-9 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-white hover:border-blue/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <HiOutlineChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Centered Copyright */}
        <div className="mt-10 pt-6 border-t border-line/60 flex items-center justify-center text-center">
          <p className="text-xs text-muted">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
