"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
}

function StatCard({ value, label, suffix = "+" }: StatItemProps) {
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
      className="p-6 rounded-2xl bg-raised border border-line flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-blue/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 group"
    >
      <div className="font-sora text-4xl sm:text-5xl font-extrabold text-white mb-2 flex items-center justify-center">
        <span>{count}</span>
        <span className="text-soft-blue text-3xl sm:text-4xl ml-0.5">{suffix}</span>
      </div>
      <p className="text-sm text-muted font-medium group-hover:text-text transition-colors">
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
          subtitle="An engineer who fell in love with building things on the web."
        />

        {/* Two Columns: Text Left, Stats Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Left Column: 3 Paragraphs */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-muted leading-relaxed">
            <Reveal delay={0.1}>
              <p className="text-text/90">
                I have always loved the feeling of building something, and that is what
                brought me into engineering. While studying electrical engineering I
                felt that joy, but something was still missing. Then I discovered
                coding.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                After some thought, I started teaching myself, and it soon gave me the
                joy I was looking for. Today I enjoy building websites and web apps
                powered by AI, turning ideas into real-world work.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p>
                I&apos;m endlessly curious about learning new things. I love science and
                knowing the science behind everything we see.
              </p>
            </Reveal>
          </div>

          {/* Right Column: 3 Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <StatCard value={4} label="Projects completed" />
            <StatCard value={10} label="Tools and technologies" />
            <StatCard value={4} label="Live deployments" />
          </div>
        </div>

        {/* More about me Divider */}
        <div className="relative my-16 flex items-center justify-center">
          <div className="flex-1 h-[1px] bg-line" />
          <div className="px-5 py-1.5 rounded-full bg-raised border border-line text-xs font-semibold text-soft-blue uppercase tracking-wider mx-4 shadow-sm">
            More about me
          </div>
          <div className="flex-1 h-[1px] bg-line" />
        </div>

        {/* Sub-sections */}
        <div className="space-y-16">
          {/* Sub-section a: Interests / Beyond the Code */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-semibold text-soft-blue uppercase tracking-wider block mb-1">
                Interests
              </span>
              <h3 className="font-sora text-2xl sm:text-3xl font-bold text-text mb-2">
                Beyond the{" "}
                <span className="bg-gradient-to-r from-soft-blue to-blue bg-clip-text text-transparent">
                  Code
                </span>
              </h3>
              <p className="text-muted text-sm sm:text-base">
                The things that keep me curious away from the keyboard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Football */}
              <Reveal delay={0.1}>
                <div className="p-6 rounded-2xl bg-raised/80 border border-line h-full flex flex-col justify-between transition-all duration-300 hover:border-line hover:bg-raised hover:-translate-y-1">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4">
                      <IoFootballOutline className="w-5 h-5" />
                    </div>
                    <h4 className="font-sora text-base font-semibold text-text mb-2">
                      Football
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      I love watching football, from the big matches to the small
                      moments that decide them.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Movies */}
              <Reveal delay={0.2}>
                <div className="p-6 rounded-2xl bg-raised/80 border border-line h-full flex flex-col justify-between transition-all duration-300 hover:border-line hover:bg-raised hover:-translate-y-1">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4">
                      <IoFilmOutline className="w-5 h-5" />
                    </div>
                    <h4 className="font-sora text-base font-semibold text-text mb-2">
                      Movies
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      I enjoy watching movies and getting lost in a good story.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Gardening */}
              <Reveal delay={0.3}>
                <div className="p-6 rounded-2xl bg-raised/80 border border-line h-full flex flex-col justify-between transition-all duration-300 hover:border-line hover:bg-raised hover:-translate-y-1">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4">
                      <IoLeafOutline className="w-5 h-5" />
                    </div>
                    <h4 className="font-sora text-base font-semibold text-text mb-2">
                      Gardening
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      I like gardening and watching things grow, a bit like building a
                      product from scratch.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Science */}
              <Reveal delay={0.4}>
                <div className="p-6 rounded-2xl bg-raised/80 border border-line h-full flex flex-col justify-between transition-all duration-300 hover:border-line hover:bg-raised hover:-translate-y-1">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4">
                      <IoFlaskOutline className="w-5 h-5" />
                    </div>
                    <h4 className="font-sora text-base font-semibold text-text mb-2">
                      Science
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      I&apos;m curious about the science behind everything we see, and I
                      love finding out how things work.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Sub-section b: Career focus / What I'm Looking For */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-semibold text-soft-blue uppercase tracking-wider block mb-1">
                Career focus
              </span>
              <h3 className="font-sora text-2xl sm:text-3xl font-bold text-text mb-2">
                What I&apos;m{" "}
                <span className="bg-gradient-to-r from-soft-blue to-blue bg-clip-text text-transparent">
                  Looking For
                </span>
              </h3>
              <p className="text-muted text-sm sm:text-base">
                The kind of work I&apos;m most excited to take on.
              </p>
            </div>

            {/* 3 Role Cards with blue accent bar that slides in on hover */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {/* Full Stack Developer */}
              <div className="relative p-6 rounded-2xl bg-raised/80 border border-line group overflow-hidden transition-all duration-300 hover:bg-raised hover:-translate-y-1">
                {/* Blue accent sliding bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-soft-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4 group-hover:text-blue transition-colors">
                  <HiOutlineCodeBracket className="w-6 h-6" />
                </div>
                <h4 className="font-sora text-lg font-bold text-text mb-2">
                  Full Stack Developer
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  Building complete products, from the interface to the database.
                </p>
              </div>

              {/* Frontend Developer */}
              <div className="relative p-6 rounded-2xl bg-raised/80 border border-line group overflow-hidden transition-all duration-300 hover:bg-raised hover:-translate-y-1">
                {/* Blue accent sliding bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-soft-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4 group-hover:text-blue transition-colors">
                  <HiOutlineCpuChip className="w-6 h-6" />
                </div>
                <h4 className="font-sora text-lg font-bold text-text mb-2">
                  Frontend Developer
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  Crafting responsive, polished interfaces with React, Next.js and
                  Tailwind CSS.
                </p>
              </div>

              {/* AI-powered web apps */}
              <div className="relative p-6 rounded-2xl bg-raised/80 border border-line group overflow-hidden transition-all duration-300 hover:bg-raised hover:-translate-y-1">
                {/* Blue accent sliding bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-soft-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue mb-4 group-hover:text-blue transition-colors">
                  <HiOutlineSparkles className="w-6 h-6" />
                </div>
                <h4 className="font-sora text-lg font-bold text-text mb-2">
                  AI-powered web apps
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  Websites and web apps powered by AI, turning ideas into real-world
                  work.
                </p>
              </div>
            </div>

            {/* Highlighted Full-width Strip */}
            <div className="p-5 sm:p-6 rounded-2xl bg-raised border border-blue/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-black/20">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/30 flex items-center justify-center text-blue shrink-0">
                  <HiOutlineBriefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sora text-sm sm:text-base font-semibold text-text">
                    Looking for full-time, remote opportunities.
                  </p>
                  <p className="text-xs text-muted">
                    Ready to contribute to impactful engineering teams worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-semibold text-soft-blue tracking-wide">
                  Full-time
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-semibold text-soft-blue tracking-wide">
                  Remote
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
