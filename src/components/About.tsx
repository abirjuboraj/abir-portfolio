"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlinePuzzlePiece,
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineCommandLine,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import {
  IoFootballOutline,
  IoFilmOutline,
  IoLeafOutline,
  IoFlaskOutline,
} from "react-icons/io5";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface MetricTileProps {
  value: number;
  label: string;
  sublabel: string;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

function MetricTile({
  value,
  label,
  sublabel,
  suffix = "+",
  icon: Icon,
  accentColor,
}: MetricTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.floor(progress * end);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="group/tile relative p-4 sm:p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-blue/30 transition-all duration-300 flex items-start gap-4 overflow-hidden"
    >
      <div
        className={`w-10 h-10 rounded-xl bg-surface border border-white/[0.08] flex items-center justify-center shrink-0 ${accentColor} transition-transform duration-300 group-hover/tile:scale-110 shadow-sm`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-sora text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-baseline">
          <span>{count}</span>
          <span className="text-soft-blue ml-0.5 font-bold text-lg">{suffix}</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-text group-hover/tile:text-white transition-colors truncate">
          {label}
        </p>
        <p className="text-[11px] text-muted truncate mt-0.5">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

const workIEnjoy = [
  {
    title: "Frontend Craft",
    icon: <HiOutlineCodeBracket className="w-4 h-4 text-soft-blue" />,
    description:
      "Building responsive, accessible interfaces with React, Next.js, and Tailwind CSS—focusing on fluid interactions and visual clarity.",
  },
  {
    title: "Full Stack Architecture",
    icon: <HiOutlineServerStack className="w-4 h-4 text-soft-blue" />,
    description:
      "Connecting clean user interfaces to reliable backend logic, type-safe APIs, and structured data with MongoDB.",
  },
  {
    title: "Problem Solving",
    icon: <HiOutlinePuzzlePiece className="w-4 h-4 text-soft-blue" />,
    description:
      "Applying RUET engineering fundamentals to break down complex challenges, diagnose root causes, and find practical solutions.",
  },
];

const beyondTheCode = [
  {
    title: "Football",
    icon: <IoFootballOutline className="w-4 h-4 text-soft-blue" />,
    description: "Tactical nuances, teamwork, and high-pressure moments.",
  },
  {
    title: "Science",
    icon: <IoFlaskOutline className="w-4 h-4 text-soft-blue" />,
    description: "Curiosity for physical laws and how the universe works.",
  },
  {
    title: "Gardening",
    icon: <IoLeafOutline className="w-4 h-4 text-soft-blue" />,
    description: "Patience, steady care, and nurturing organic growth.",
  },
  {
    title: "Cinema",
    icon: <IoFilmOutline className="w-4 h-4 text-soft-blue" />,
    description: "Visual storytelling, atmosphere, and thoughtful pacing.",
  },
  {
    title: "IoT & Hardware",
    icon: <HiOutlineCpuChip className="w-4 h-4 text-soft-blue" />,
    description:
      "Building small IoT projects and experimenting with microcontrollers in spare time.",
  },
];

function MainNarrativeCard() {
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative p-6 sm:p-9 md:p-10 rounded-2xl bg-gradient-to-b from-[#141418]/95 via-[#101014]/95 to-[#0b0b0e]/95 border border-white/[0.08] backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden group hover:border-blue/30 transition-all duration-300"
    >
      {/* Dynamic Cursor-following Spotlight Effect on Hover */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
      />

      {/* Subtle top edge light line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent pointer-events-none" />

      {/* Top Architectural Console Header Bar */}
      <div className="relative z-10 flex items-center justify-between pb-5 mb-7 border-b border-white/[0.06] flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-xs font-mono text-soft-blue/80 tracking-tight flex items-center gap-1.5">
            <HiOutlineCommandLine className="w-3.5 h-3.5" />
            <span>~/engineer-profile.tsx</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-line text-xs font-medium text-muted shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-text font-semibold">RUET EEE</span>
          <span className="text-line">•</span>
          <span>Full Stack Developer</span>
        </div>
      </div>

      {/* Main Body: 2-Column Split (Story Narrative & Engineering DNA) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Personality & Journey Narrative */}
        <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-muted/95 leading-relaxed">
          <p className="text-justify">
            Hi, I&apos;m glad you&apos;re here. I&apos;m a{" "}
            <span className="text-white font-medium underline decoration-blue/40 decoration-2 underline-offset-4">
              precision-minded developer
            </span>{" "}
            who likes things done right—from the spacing between two buttons to how an API handles an edge case. I&apos;m friendly, easy to work with, and I&apos;d rather ask a good question early than guess.
          </p>
          <p className="text-justify">
            My journey began in{" "}
            <span className="text-white font-medium underline decoration-soft-blue/40 decoration-2 underline-offset-4">
              Electrical and Electronic Engineering at RUET
            </span>
            , which shaped how I approach software: thinking logically, breaking down complex challenges, and finding practical solutions. Today, as a Full Stack Web Developer, I build modern web applications using{" "}
            <span className="text-white font-medium">
              Next.js, React, TypeScript, and Tailwind CSS
            </span>
            .
          </p>

          {/* Quick Pillars Badge Strip */}
          <div className="pt-2 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-surface border border-line text-xs font-semibold text-soft-blue flex items-center gap-1.5">
              <span>⚡</span> Logic-First Engineering
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-surface border border-line text-xs font-medium text-muted hover:text-white transition-colors flex items-center gap-1.5">
              <span>🎯</span> Pixel Precision
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-surface border border-line text-xs font-medium text-muted hover:text-white transition-colors flex items-center gap-1.5">
              <span>🚀</span> Next.js &amp; Turbopack
            </span>
          </div>
        </div>

        {/* Right: Engineering DNA Highlights Stack */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200 group/dna">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="p-1 rounded-md bg-surface border border-line text-soft-blue group-hover/dna:text-blue transition-colors">
                <HiOutlineCpuChip className="w-4 h-4" />
              </span>
              <h4 className="font-sora text-sm font-semibold text-text group-hover/dna:text-white transition-colors">
                Circuit Logic → Web Code
              </h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Breaking down complex asynchronous state and APIs with the deterministic rigor of electrical circuits.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200 group/dna">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="p-1 rounded-md bg-surface border border-line text-amber-300 group-hover/dna:text-amber-200 transition-colors">
                <HiOutlineSparkles className="w-4 h-4" />
              </span>
              <h4 className="font-sora text-sm font-semibold text-text group-hover/dna:text-white transition-colors">
                Zero Guesswork
              </h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Obsessive about spacing rhythm, responsive fluid layouts, and asking clarifying questions early.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200 group/dna">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="p-1 rounded-md bg-surface border border-line text-emerald-400 group-hover/dna:text-emerald-300 transition-colors">
                <HiOutlineRocketLaunch className="w-4 h-4" />
              </span>
              <h4 className="font-sora text-sm font-semibold text-text group-hover/dna:text-white transition-colors">
                Fast &amp; Production Ready
              </h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Shipping complete applications with type-safety, authentication, and live database integrations.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: 3 Bento Metric Tiles */}
      <div className="relative z-10 pt-8 mt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <MetricTile
          value={4}
          label="Projects Completed"
          sublabel="Full stack web apps shipped"
          icon={HiOutlineRocketLaunch}
          accentColor="text-blue"
        />
        <MetricTile
          value={10}
          label="Tools & Technologies"
          sublabel="Next.js, TS, React, Mongo"
          icon={HiOutlineCommandLine}
          accentColor="text-soft-blue"
        />
        <MetricTile
          value={4}
          label="Live Deployments"
          sublabel="Production verified on Vercel"
          icon={HiOutlineGlobeAlt}
          accentColor="text-emerald-400"
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative section-dimmer">
      {/* Restrained ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_15%,rgba(59,130,246,0.06),transparent_70%)]" />

      <div className="max-w-[1040px] mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="ABOUT ME"
          title="Who I Am"
          subtitle="From engineering principles to building meaningful digital products."
        />

        {/* 1. Main Narrative & Metrics Canvas */}
        <Reveal delay={0.1}>
          <MainNarrativeCard />
        </Reveal>

        {/* 2. Lower Split Panels: Work I Enjoy & Beyond the Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8 items-stretch">
          {/* Left Panel: Work I Enjoy */}
          <Reveal delay={0.2} className="h-full">
            <div className="relative h-full p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#131317]/95 via-[#101014]/95 to-[#0b0b0e]/95 border border-white/[0.08] backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between hover:border-blue/30 transition-all duration-300 group">
              {/* Subtle top edge light line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue/25 to-transparent pointer-events-none" />

              <div>
                <h3 className="font-sora text-lg sm:text-xl font-bold text-white mb-2">
                  Work I Enjoy
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6 text-justify">
                  Areas where I spend most of my time building and refining digital products.
                </p>

                <div className="space-y-3.5">
                  {workIEnjoy.map((item) => (
                    <div
                      key={item.title}
                      className="group/item flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-surface border border-white/[0.08] flex items-center justify-center text-soft-blue group-hover/item:text-blue group-hover/item:border-blue/30 transition-colors shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-sora text-sm sm:text-base font-semibold text-text group-hover/item:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed mt-1 text-justify">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Panel: Beyond the Code */}
          <Reveal delay={0.3} className="h-full">
            <div className="relative h-full p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#131317]/95 via-[#101014]/95 to-[#0b0b0e]/95 border border-white/[0.08] backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between hover:border-blue/30 transition-all duration-300 group">
              {/* Subtle top edge light line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue/25 to-transparent pointer-events-none" />

              <div>
                <h3 className="font-sora text-lg sm:text-xl font-bold text-white mb-2">
                  Beyond the Code
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6 text-justify">
                  Personal pursuits that keep my thinking grounded, patient, and creative.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {beyondTheCode.map((item, idx) => (
                    <div
                      key={item.title}
                      className={`p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200 group/interest ${idx === 4 ? "sm:col-span-2" : ""
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="p-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-soft-blue group-hover/interest:text-blue transition-colors">
                          {item.icon}
                        </span>
                        <h4 className="font-sora text-sm font-semibold text-text group-hover/interest:text-white transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed text-justify">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Availability Footer */}
              <div className="pt-6 mt-6 border-t border-line/60 flex items-center gap-2.5 text-xs text-muted">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-text font-medium">
                  Available for full-time & remote roles
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
