"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineBriefcase,
  HiOutlineCpuChip,
  HiOutlineCodeBracket,
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

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

function StatCard({ value, label, suffix = "+", icon }: StatItemProps) {
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
    <div
      ref={ref}
      className="p-5 sm:p-6 rounded-2xl bg-raised border border-line flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-blue/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group"
    >
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-surface border border-line/80 flex items-center justify-center text-soft-blue mb-3 group-hover:text-blue group-hover:border-blue/30 transition-colors">
          {icon}
        </div>
      )}
      <div className="font-sora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1.5 flex items-center justify-center tracking-tight">
        <span>{count}</span>
        <span className="text-soft-blue text-2xl sm:text-3xl lg:text-4xl ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm text-muted font-medium group-hover:text-text transition-colors">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 relative section-dimmer"
    >
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="About Me"
          title="Who I Am"
          subtitle="Bridging electrical engineering fundamentals with modern full-stack web craftsmanship."
        />

        {/* Primary Narrative & Animated Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12 lg:mb-16">
          {/* Left Column: Authentic Engineering Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-base sm:text-lg text-muted leading-relaxed">
            <Reveal delay={0.1}>
              <p className="text-text/95">
                My background in <span className="text-white font-medium">Electrical and Electronic Engineering at RUET</span> shaped how I approach complex technical challenges. Rigorous training in circuit theory, logic systems, and signals taught me to think from first principles — diagnosing root causes rather than symptoms, and understanding how each component impacts system-wide performance.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                Transitioning into web development was a natural evolution of that systems-oriented mindset. I fell in love with the agility and creative power of web engineering — the ability to conceptualize an idea, architect its structure, and turn it into a high-performance digital product that people can use anywhere.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p>
                Today, as a <span className="text-white font-medium">Full Stack Web Developer</span>, I build reliable, responsive web applications powered by modern technologies like Next.js, React, TypeScript, and AI integrations. I combine engineering discipline with thoughtful design, ensuring that codebases remain clean, scalable, and intuitive for end users.
              </p>
            </Reveal>
          </div>

          {/* Right Column: 3 Animated Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <Reveal delay={0.15}>
              <StatCard
                value={4}
                label="Projects completed"
                icon={<HiOutlineCodeBracket className="w-5 h-5" />}
              />
            </Reveal>
            <Reveal delay={0.25}>
              <StatCard
                value={10}
                label="Tools and technologies"
                icon={<HiOutlineCpuChip className="w-5 h-5" />}
              />
            </Reveal>
            <Reveal delay={0.35}>
              <StatCard
                value={4}
                label="Live deployments"
                icon={<HiOutlineGlobeAlt className="w-5 h-5" />}
              />
            </Reveal>
          </div>
        </div>

        {/* Supporting Grid: Career Focus & Beyond the Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: What I Bring / Career Focus */}
          <Reveal delay={0.2} className="h-full">
            <div className="h-full p-6 sm:p-7 rounded-2xl bg-raised border border-line flex flex-col justify-between transition-all duration-300 hover:border-line/80">
              <div>
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue shrink-0">
                    <HiOutlineBriefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-soft-blue uppercase tracking-wider block">
                      Career Focus
                    </span>
                    <h3 className="font-sora text-lg sm:text-xl font-bold text-text">
                      Engineering Focus & Value
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-5">
                  Dedicated to engineering full-stack web applications with end-to-end ownership — from intuitive frontend interfaces to robust database modeling and intelligent AI workflows.
                </p>

                {/* Focus Areas List */}
                <div className="space-y-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text">Full Stack Architecture</p>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">
                        Building complete, performant web applications with Next.js, React, TypeScript, and MongoDB.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text">Frontend Craft & Accessibility</p>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">
                        Crafting responsive layouts with Tailwind CSS, fine-tuned micro-interactions, and high contrast standards.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-text">AI Integration & Automation</p>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">
                        Enhancing web products with AI APIs and smart functionality to deliver practical real-world utility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Banner */}
              <div className="pt-4 border-t border-line/70 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-text">
                    Available for full-time & remote roles
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface border border-line text-[11px] font-semibold text-soft-blue tracking-wide">
                    Full-time
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface border border-line text-[11px] font-semibold text-soft-blue tracking-wide">
                    Remote
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Beyond the Code (Interests) */}
          <Reveal delay={0.3} className="h-full">
            <div className="h-full p-6 sm:p-7 rounded-2xl bg-raised border border-line flex flex-col justify-between transition-all duration-300 hover:border-line/80">
              <div>
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue shrink-0">
                    <HiOutlineSparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-soft-blue uppercase tracking-wider block">
                      Interests & Life
                    </span>
                    <h3 className="font-sora text-lg sm:text-xl font-bold text-text">
                      Beyond the Code
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-5">
                  Curiosity doesn’t stop at the editor. These personal pursuits refresh my perspective and keep my problem-solving grounded:
                </p>

                {/* 2x2 Grid of Refined Interests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* Football */}
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 hover:border-blue/30 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-raised border border-line/80 flex items-center justify-center text-soft-blue mb-2.5 group-hover:text-blue transition-colors">
                      <IoFootballOutline className="w-4 h-4" />
                    </div>
                    <h4 className="font-sora text-sm font-semibold text-text mb-1">
                      Football
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Tactical nuances, teamwork, and high-pressure moments that decide matches.
                    </p>
                  </div>

                  {/* Science */}
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 hover:border-blue/30 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-raised border border-line/80 flex items-center justify-center text-soft-blue mb-2.5 group-hover:text-blue transition-colors">
                      <IoFlaskOutline className="w-4 h-4" />
                    </div>
                    <h4 className="font-sora text-sm font-semibold text-text mb-1">
                      Science
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Exploring physical phenomena and understanding how our universe functions.
                    </p>
                  </div>

                  {/* Gardening */}
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 hover:border-blue/30 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-raised border border-line/80 flex items-center justify-center text-soft-blue mb-2.5 group-hover:text-blue transition-colors">
                      <IoLeafOutline className="w-4 h-4" />
                    </div>
                    <h4 className="font-sora text-sm font-semibold text-text mb-1">
                      Gardening
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Cultivating living plants with patience, steady care, and organic attention.
                    </p>
                  </div>

                  {/* Movies */}
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-line/60 hover:border-blue/30 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-raised border border-line/80 flex items-center justify-center text-soft-blue mb-2.5 group-hover:text-blue transition-colors">
                      <IoFilmOutline className="w-4 h-4" />
                    </div>
                    <h4 className="font-sora text-sm font-semibold text-text mb-1">
                      Cinema
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      Immersive storytelling, world-building, and artistic visual composition.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote / Mindset Note */}
              <div className="pt-4 border-t border-line/70 flex items-center gap-2 text-xs text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-blue shrink-0" />
                <span>Continuous learner with an enduring curiosity for how things work.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

