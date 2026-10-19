"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlinePuzzlePiece,
  HiOutlineCpuChip,
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
import JourneyTimeline from "./about/JourneyTimeline";

export function AboutSectionDivider({ label }: { label: string }) {
  return (
    <div className="relative w-full flex items-center justify-center gap-3 my-8 sm:my-12">
      {/* Soft center glow */}
      <div
        className="absolute w-72 sm:w-96 h-8 bg-blue/20 blur-xl rounded-full pointer-events-none -translate-x-1/2 left-1/2"
        aria-hidden="true"
      />

      {/* Left horizontal line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue/40 to-blue pointer-events-none" />

      {/* Subtitle centered on background-colored pad */}
      <div className="relative z-10 px-4 py-1 rounded-full bg-bg border border-white/[0.08] shadow-sm shrink-0">
        <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-muted uppercase">
          {label}
        </span>
      </div>

      {/* Right horizontal line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue/40 to-blue pointer-events-none" />
    </div>
  );
}

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
      className="group/tile relative p-2.5 sm:p-4 md:p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-blue/30 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3.5 md:gap-4 overflow-hidden"
    >
      <div
        className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-surface border border-white/[0.08] flex items-center justify-center shrink-0 ${accentColor} transition-transform duration-300 group-hover/tile:scale-110 shadow-sm`}
      >
        <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
      </div>

      <div className="flex-1 min-w-0 w-full">
        <div className="font-sora text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-baseline justify-center sm:justify-start">
          <span>{count}</span>
          <span className="text-soft-blue ml-0.5 font-bold text-xs sm:text-base md:text-lg">{suffix}</span>
        </div>
        <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-text group-hover/tile:text-white transition-colors leading-tight line-clamp-2 mt-0.5">
          {label}
        </p>
        <p className="text-[11px] text-muted truncate mt-0.5 hidden md:block">
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
    description: "Responsive, accessible interfaces in React & Next.js with visual precision.",
  },
  {
    title: "Full Stack Architecture",
    icon: <HiOutlineServerStack className="w-4 h-4 text-soft-blue" />,
    description: "Type-safe APIs, authentication, and reliable database schemas with MongoDB.",
  },
  {
    title: "Problem Solving",
    icon: <HiOutlinePuzzlePiece className="w-4 h-4 text-soft-blue" />,
    description: "Applying RUET engineering rigor to break down complex architectural challenges.",
  },
];

const beyondTheCode = [
  {
    title: "Football",
    icon: <IoFootballOutline className="w-4 h-4 text-soft-blue" />,
    description: "Tactical teamwork and high-energy play.",
  },
  {
    title: "Science",
    icon: <IoFlaskOutline className="w-4 h-4 text-soft-blue" />,
    description: "Curiosity for physical laws and universal principles.",
  },
  {
    title: "Gardening",
    icon: <IoLeafOutline className="w-4 h-4 text-soft-blue" />,
    description: "Patience, steady care, and organic growth.",
  },
  {
    title: "Cinema",
    icon: <IoFilmOutline className="w-4 h-4 text-soft-blue" />,
    description: "Visual storytelling and thoughtful atmosphere.",
  },
  {
    title: "IoT & Hardware",
    icon: <HiOutlineCpuChip className="w-4 h-4 text-soft-blue" />,
    description: "Experimenting with microcontrollers and circuits.",
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

      {/* Top Header: Clean Executive Profile Badge (No code snippet, no window dots, no active badge) */}
      <div className="relative z-10 flex items-center justify-between pb-5 mb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue/20 to-blue/5 border border-blue/25 flex items-center justify-center text-soft-blue shadow-inner">
            <span className="font-sora text-sm font-bold tracking-tight text-white">AH</span>
          </div>
          <div>
            <h3 className="font-sora text-sm sm:text-base font-bold text-white tracking-tight">
              Md. Abir Hossen
            </h3>
            <p className="text-[11px] sm:text-xs text-muted">Engineering Mindset • Full Stack Craft</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-soft-blue">
          <span>Full Stack Developer</span>
        </div>
      </div>

      {/* Main Body: Personality Narrative (No Underlines) */}
      <div className="relative z-10 max-w-3xl space-y-4">
        <p className="text-justify text-base sm:text-lg md:text-[19px] text-text/90 leading-relaxed sm:leading-loose">
          Hi, I&apos;m glad you&apos;re here. I&apos;m a{" "}
          <span className="text-white font-semibold">
            precision-minded developer
          </span>{" "}
          who likes things done right—from the spacing between two buttons to how an API handles an edge case. I&apos;m friendly, easy to work with, and I&apos;d rather ask a good question early than guess.
        </p>
      </div>

      {/* Bottom: 3 Bento Metric Tiles (Horizontal on Mobile & Desktop) */}
      <div className="relative z-10 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/[0.06] grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
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

function WorkAndInterestsShowcase() {
  const [activeTab, setActiveTab] = useState<"work" | "beyond">("work");

  return (
    <div className="w-full">
      {/* Mobile Segmented Toggle (below md to keep height compact) */}
      <div className="flex md:hidden justify-center mb-5">
        <div className="inline-flex p-1 rounded-xl bg-surface border border-white/[0.08] shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("work")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "work"
                ? "bg-blue/20 text-white border border-blue/40 shadow-sm"
                : "text-muted hover:text-white"
            }`}
          >
            <span>⚡</span>
            <span>Work I Enjoy</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("beyond")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === "beyond"
                ? "bg-blue/20 text-white border border-blue/40 shadow-sm"
                : "text-muted hover:text-white"
            }`}
          >
            <span>🌱</span>
            <span>Beyond the Code</span>
          </button>
        </div>
      </div>

      {/* Mobile Compact Content (below md) */}
      <div className="block md:hidden">
        {activeTab === "work" ? (
          <div className="space-y-2.5">
            {workIEnjoy.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue/30 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-surface border border-white/[0.08] flex items-center justify-center text-soft-blue shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-sora text-sm font-semibold text-text">
                    {item.title}
                  </h4>
                  <p className="text-[13px] sm:text-sm text-muted/95 leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {beyondTheCode.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue/30 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1 rounded-md bg-surface border border-white/[0.08] text-soft-blue">
                    {item.icon}
                  </span>
                  <h4 className="font-sora text-[13px] sm:text-sm font-semibold text-text truncate">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-[13px] text-muted/95 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop & Tablet Display (md and up): Sleek 2-column bento side-by-side */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Left Panel: Work I Enjoy */}
        <div className="relative h-full p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#131317]/95 via-[#101014]/95 to-[#0b0b0e]/95 border border-white/[0.08] backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between hover:border-blue/30 transition-all duration-300 group">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue/25 to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue" />
              <h3 className="font-sora text-lg sm:text-xl font-bold text-white">
                Work I Enjoy
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
              Areas where I build, architect, and refine modern web applications.
            </p>

            <div className="space-y-3">
              {workIEnjoy.map((item) => (
                <div
                  key={item.title}
                  className="group/item flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface border border-white/[0.08] flex items-center justify-center text-soft-blue group-hover/item:text-blue group-hover/item:border-blue/30 transition-colors shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sora text-sm sm:text-base font-semibold text-text group-hover/item:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted/95 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Beyond the Code */}
        <div className="relative h-full p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#131317]/95 via-[#101014]/95 to-[#0b0b0e]/95 border border-white/[0.08] backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden flex flex-col justify-between hover:border-blue/30 transition-all duration-300 group">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue/25 to-transparent pointer-events-none" />

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="font-sora text-lg sm:text-xl font-bold text-white">
                Beyond the Code
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
              Personal pursuits that keep my thinking grounded and creative.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {beyondTheCode.map((item, idx) => (
                <div
                  key={item.title}
                  className={`p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue/30 hover:bg-white/[0.04] transition-all duration-200 group/interest ${
                    idx === 4 ? "sm:col-span-2" : ""
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
                  <p className="text-[13px] sm:text-sm text-muted/95 leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
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

        {/* 1. Personality Subtitle Divider */}
        <AboutSectionDivider label="Personality & Approach" />

        {/* 2. Main Narrative & Metrics Canvas */}
        <Reveal delay={0.1}>
          <MainNarrativeCard />
        </Reveal>

        {/* 3. Journey Timeline (includes its own symmetrical subtitle divider) */}
        <Reveal delay={0.15}>
          <JourneyTimeline />
        </Reveal>

        {/* 4. Focus & Pursuits Subtitle Divider */}
        <AboutSectionDivider label="Focus & Pursuits" />

        {/* 5. Work & Interests Showcase */}
        <Reveal delay={0.2}>
          <WorkAndInterestsShowcase />
        </Reveal>
      </div>
    </section>
  );
}
