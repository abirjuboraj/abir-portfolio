"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineArrowDownTray,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import TechOrbit from "./TechOrbit";
import { siteConfig } from "@/data/site";
import { useResumeModal } from "@/context/ResumeModalContext";

export default function Hero() {
  const { openResumeModal } = useResumeModal();
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  // Typewriter effect state
  const titles = siteConfig.typingTitles;
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(titles[0]);
      return;
    }

    const currentFullTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === currentFullTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentFullTitle.substring(0, prev.length - 1)
            : currentFullTitle.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex, titles, shouldReduceMotion]);

  // Track mouse coordinates for desktop tilt & subtle glow
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
    setCursorPos({ x: clientX, y: clientY });
  }, []);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-center items-center pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden section-dimmer"
    >
      {/* Desktop Faint Blue Cursor Glow (max 10% opacity) */}
      <div
        className="hidden md:block pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Hero Ambient Background Accent */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue/5 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1120px] w-full mx-auto px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Mobile Avatar on top / Desktop Right column */}
          <div className="md:order-2 md:col-span-5 flex justify-center">
            <TechOrbit mousePosition={mousePosition} />
          </div>

          {/* Left Column: Text & Actions */}
          <div className="md:order-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-raised border border-line mb-6 max-w-full">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-muted tracking-tight truncate">
                {siteConfig.badgeText}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.15] mb-3">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-white via-soft-blue to-blue bg-clip-text text-transparent">
                Abir Hossen
              </span>
            </h1>

            {/* Typewriter Rotating Line */}
            <div className="h-8 sm:h-9 flex items-center mb-5">
              <span className="font-sora text-lg sm:text-2xl font-semibold text-soft-blue tracking-tight">
                {currentText}
              </span>
              <span className="inline-block w-[2px] h-6 ml-1.5 bg-blue animate-pulse" />
            </div>

            {/* Intro Paragraph */}
            <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mb-8 text-justify">
              {siteConfig.heroIntro}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-9 w-full sm:w-auto">
              {/* Primary Blue CTA: Preview & Download Resume */}
              <button
                type="button"
                onClick={openResumeModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-white bg-blue hover:bg-blue/90 border border-blue/70 transition-all duration-200 shadow-lg shadow-blue/25 hover:shadow-blue/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue cursor-pointer"
                aria-label="Preview and Download Resume"
              >
                <HiOutlineArrowDownTray className="w-5 h-5" />
                <span>Download Resume</span>
              </button>

              {/* Secondary Outline CTA: View Projects */}
              <Link
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-text hover:text-white bg-surface hover:bg-raised border border-line transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <span>View Projects</span>
              </Link>
            </div>

            {/* Social Icon Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted uppercase tracking-wider mr-2 hidden sm:inline">
                Find me on
              </span>
              {/* GitHub */}
              <a
                href={siteConfig.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.socials.github.label}
                className="w-10 h-10 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-white hover:border-white/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <SiGithub className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.socials.linkedin.label}
                className="w-10 h-10 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0A66C2]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href={siteConfig.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={siteConfig.socials.facebook.label}
                className="w-10 h-10 rounded-full bg-raised border border-line flex items-center justify-center text-text hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1877F2]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse scroll indicator at bottom (hidden on small screens) */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-muted hover:text-text transition-colors">
        <span className="text-[11px] font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineChevronDown className="w-4 h-4 text-soft-blue" />
        </motion.div>
      </div>
    </section>
  );
}
