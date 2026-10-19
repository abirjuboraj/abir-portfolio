"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlinePuzzlePiece,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import {
  IoFootballOutline,
  IoFilmOutline,
  IoLeafOutline,
  IoFlaskOutline,
} from "react-icons/io5";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface MetricItemProps {
  value: number;
  label: string;
  suffix?: string;
}

function MetricItem({ value, label, suffix = "+" }: MetricItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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
    <div ref={ref} className="text-center sm:text-left py-2">
      <div className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
        <span>{count}</span>
        <span className="text-soft-blue ml-0.5 font-bold">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm text-muted mt-1.5 font-medium">{label}</p>
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
          <div className="relative p-7 sm:p-10 md:p-12 rounded-2xl bg-gradient-to-b from-[#131317]/95 via-[#101014]/95 to-[#0b0b0e]/95 border border-white/[0.08] backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden group hover:border-line transition-all duration-300">
            {/* Subtle top edge light line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue/30 to-transparent pointer-events-none" />

            {/* Personality & Journey Narrative */}
            <div className="max-w-3xl space-y-5 text-base sm:text-lg text-muted/95 leading-relaxed">
              <p>
                Hi, I&apos;m glad you&apos;re here. I&apos;m a{" "}
                <span className="text-white font-medium">
                  precision-minded developer
                </span>{" "}
                who likes things done right—from the spacing between two buttons to how an API handles an edge case. I&apos;m friendly, easy to work with, and I&apos;d rather ask a good question early than guess.
              </p>
              <p>
                My journey began in{" "}
                <span className="text-white font-medium">
                  Electrical and Electronic Engineering at RUET
                </span>
                , which shaped how I approach software: thinking logically, breaking down complex challenges, and finding practical solutions. Today, as a Full Stack Web Developer, I build modern web applications using{" "}
                <span className="text-white font-medium">
                  Next.js, React, TypeScript, and Tailwind CSS
                </span>
                .
              </p>
            </div>

            {/* Clean, Integrated Metrics Row */}
            <div className="pt-8 mt-8 border-t border-line/60 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <MetricItem value={4} label="Projects completed" />
              <MetricItem value={10} label="Tools and technologies" />
              <MetricItem value={4} label="Live deployments" />
            </div>
          </div>
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
                <p className="text-sm text-muted leading-relaxed mb-6">
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
                        <p className="text-xs sm:text-sm text-muted leading-relaxed mt-1">
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
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Personal pursuits that keep my thinking grounded, patient, and creative.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <p className="text-xs text-muted leading-relaxed">
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
