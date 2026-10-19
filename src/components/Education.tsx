"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlineCalendar } from "react-icons/hi2";
import SectionHeading from "./SectionHeading";
import { educationData, EducationItem } from "@/data/education";

function ScoreRing({
  score,
  maxScore,
  caption,
}: {
  score: number;
  maxScore: number;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const radius = 26;
  const stroke = 3.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const targetOffset = circumference - (score / maxScore) * circumference;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center shrink-0 min-w-[95px]"
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg] overflow-visible"
        >
          {/* Background Track */}
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Animated Blue Progress Bar */}
          <motion.circle
            stroke="#3B82F6"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isInView ? targetOffset : circumference }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Center Score Value */}
        <span className="absolute font-sora text-xs sm:text-sm font-bold text-white">
          {score.toFixed(2)}
        </span>
      </div>

      <span className="text-[11px] font-medium text-muted mt-1.5 text-center whitespace-nowrap">
        {caption}
      </span>
    </div>
  );
}

function MobileScoreBadge({
  score,
  maxScore,
  caption,
}: {
  score: number;
  maxScore: number;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const radius = 14;
  const stroke = 2.2;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const targetOffset = circumference - (score / maxScore) * circumference;

  return (
    <div
      ref={ref}
      className="sm:hidden inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xl bg-surface/90 border border-line shadow-sm shrink-0"
    >
      <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg] overflow-visible"
        >
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="#3B82F6"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isInView ? targetOffset : circumference }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <span className="absolute font-sora text-[7.5px] font-bold text-white tracking-tighter">
          {score.toFixed(2)}
        </span>
      </div>

      <span className="text-[10px] font-medium text-muted leading-tight whitespace-nowrap">
        {caption}
      </span>
    </div>
  );
}

function TimelineCard({ item, index }: { item: EducationItem; index: number }) {
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
      className="relative p-4 sm:p-7 md:p-8 rounded-2xl bg-raised border border-line transition-all duration-300 hover:border-blue/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 overflow-hidden"
    >
      {/* Cursor-following Spotlight Effect on Hover */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
        <div className="flex-1 space-y-3 w-full">
          {/* Top Row: Period Badge on Left, Row-wise Stat Badge on Right for Mobile - Never Wrap */}
          <div className="flex items-center justify-between gap-1.5 w-full">
            {/* Period Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-surface border border-line text-[11px] sm:text-xs font-semibold text-soft-blue shrink-0">
              <HiOutlineCalendar className="w-3.5 h-3.5 text-blue" />
              <span>{item.period}</span>
            </div>

            {/* Mobile Score Stat: Row-wise at top right instead of stacked at bottom */}
            <MobileScoreBadge
              score={item.score}
              maxScore={item.maxScore}
              caption={item.caption}
            />
          </div>

          {/* Degree & Institution */}
          <div>
            <h3 className="font-sora text-lg sm:text-xl md:text-2xl font-bold text-text mb-1">
              {item.degree}
            </h3>
            <p className="text-sm sm:text-base text-muted flex items-center gap-1.5">
              <HiOutlineAcademicCap className="w-4 h-4 text-soft-blue shrink-0" />
              <span>{item.institution}</span>
            </p>
          </div>

          {/* Badges with hover pop */}
          <div className="flex flex-wrap gap-2 pt-1">
            {item.badges.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-0.5 rounded-md bg-surface border border-line text-[11px] font-medium text-muted hover:text-white hover:border-soft-blue/40 hover:scale-105 transition-all duration-200 cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Score Ring Component - Hidden on mobile, prominent on tablet and desktop */}
        <div className="hidden sm:flex justify-center border-l border-line/60 sm:pl-6 md:pl-8 shrink-0">
          <ScoreRing
            score={item.score}
            maxScore={item.maxScore}
            caption={item.caption}
          />
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section id="education" className="py-20 md:py-28 relative section-dimmer">
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          subtitle="From electrical engineering to building for the web."
        />

        {/* Timeline Container - Wider in tablet (max-w-4xl) and desktop (lg:max-w-5xl) */}
        <div
          ref={containerRef}
          className="relative max-w-4xl lg:max-w-5xl mx-auto pl-6 sm:pl-10 md:pl-12"
        >
          {/* Background continuous track line */}
          <div className="absolute top-4 bottom-4 left-[11px] sm:left-[19px] md:left-[23px] w-[2px] bg-line rounded-full" />

          {/* Dynamic Blue fill line */}
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute top-4 bottom-4 left-[11px] sm:left-[19px] md:left-[23px] w-[2px] bg-gradient-to-b from-blue via-soft-blue to-blue rounded-full origin-top"
          />

          <div className="space-y-8 sm:space-y-10">
            {educationData.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline Node Dot - Centered on track line */}
                <div className="absolute -left-[13px] sm:-left-[21px] md:-left-[25px] top-6 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-raised border-2 border-blue flex items-center justify-center shadow-md shadow-blue/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-soft-blue" />
                  </div>
                </div>

                {/* Timeline Card */}
                <TimelineCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
