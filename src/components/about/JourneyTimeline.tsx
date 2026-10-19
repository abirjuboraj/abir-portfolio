"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export const milestones = [
  {
    label: "RUET · EEE",
    title: "Where it began",
    description:
      "I started my engineering journey in Electrical and Electronic Engineering at RUET, learning to think logically and solve problems step by step.",
    state: "past",
  },
  {
    label: "The spark",
    title: "Discovering code",
    description:
      "Somewhere between circuits and equations, I discovered a real passion for coding and decided to follow it.",
    state: "past",
  },
  {
    label: "The shift",
    title: "Into web development",
    description:
      "That curiosity led me into web development, where I could turn logic into things people actually use.",
    state: "past",
  },
  {
    label: "Today",
    title: "Still learning",
    description:
      "I'm still learning with the same curiosity and passion, and I treat every project as a chance to get better.",
    state: "current",
  },
] as const;

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  // Mobile active scroll index tracking
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor horizontal scroll on mobile to update active dot
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    // Calculate index based on child item offsets
    const children = Array.from(el.querySelectorAll<HTMLElement>("li"));
    if (children.length === 0) return;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    const containerLeft = el.getBoundingClientRect().left;

    children.forEach((child, idx) => {
      const childLeft = child.getBoundingClientRect().left;
      const distance = Math.abs(childLeft - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to milestone when progress dot is clicked on mobile
  const scrollToMilestone = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("li");
    const targetItem = items[index];
    if (targetItem) {
      targetItem.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  // Keyboard accessibility for mobile swipe strip
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = Math.min(activeIndex + 1, milestones.length - 1);
      scrollToMilestone(nextIndex);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = Math.max(activeIndex - 1, 0);
      scrollToMilestone(prevIndex);
    }
  };

  return (
    <div ref={containerRef} className="w-full my-10 sm:my-14 md:my-16">
      {/* 1) Section Heading Divider */}
      <div className="relative w-full flex items-center justify-center gap-3 mb-10 sm:mb-14">
        {/* Soft glow under the center */}
        <div
          className="absolute w-72 sm:w-96 h-8 bg-blue/20 blur-xl rounded-full pointer-events-none -translate-x-1/2 left-1/2"
          aria-hidden="true"
        />

        {/* Left horizontal line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue/40 to-blue pointer-events-none" />

        {/* Subtitle centered on background-colored pad so line doesn't cut through */}
        <div className="relative z-10 px-4 py-1 rounded-full bg-bg border border-white/[0.08] shadow-sm shrink-0">
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-muted uppercase">
            My journey to coding
          </span>
        </div>

        {/* Right horizontal line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue/40 to-blue pointer-events-none" />
      </div>

      {/* 2) Tablet and Desktop Timeline (768px and up) */}
      <div className="hidden md:block max-w-[760px] mx-auto relative pl-4 lg:pl-6">
        {/* Thin vertical line running through the left dot column */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView || shouldReduceMotion ? 1 : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: "easeInOut" }
          }
          style={{ originY: 0 }}
          className="absolute left-[23px] lg:left-[31px] top-3 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-[#1e3a8a] via-blue to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <ol className="space-y-10 lg:space-y-12 relative" aria-label="Milestones timeline">
          {milestones.map((milestone, idx) => {
            const isCurrent = milestone.state === "current";

            return (
              <motion.li
                key={milestone.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                animate={
                  isInView || shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: idx * 0.16, ease: "easeOut" }
                }
                className="group relative flex items-start gap-6 cursor-default"
              >
                {/* Dot Column */}
                <div className="relative w-4 h-4 mt-1.5 flex items-center justify-center shrink-0">
                  {isCurrent ? (
                    /* Current Milestone: Filled Accent Dot with Soft Pulsing Glow */
                    <div className="relative flex items-center justify-center">
                      {!shouldReduceMotion && (
                        <span className="animate-ping absolute -inset-1 rounded-full bg-blue/40" />
                      )}
                      <span className="relative w-3.5 h-3.5 rounded-full bg-blue shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
                    </div>
                  ) : (
                    /* Past Milestone: Outlined Dot with Hover Accent Glow */
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/25 bg-surface transition-all duration-300 group-hover:border-blue group-hover:bg-blue/15 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                  )}
                </div>

                {/* Milestone Details: Airy, no heavy boxes, spacing and hairlines */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-soft-blue font-semibold tracking-wider uppercase mb-1">
                    {milestone.label}
                  </div>
                  <h3 className="font-sora text-lg lg:text-xl font-bold text-text group-hover:text-blue transition-colors duration-200 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted leading-relaxed max-w-xl text-justify">
                    {milestone.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* 3) Mobile Horizontal Swipe Timeline (below 768px) */}
      <div className="md:hidden relative w-full">
        {/* Horizontal line running across the top of the strip */}
        <div className="relative mx-6 mb-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue/50 via-[#1e3a8a] to-transparent pointer-events-none" />
        </div>

        {/* Scrollable Container with scroll-snap */}
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="My journey to coding timeline. Use left and right arrow keys to navigate."
          onKeyDown={handleKeyDown}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 px-6 pt-1 pb-3 scroll-pl-6 scroll-pr-6 scroll-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ol className="flex gap-3.5 w-max">
            {milestones.map((milestone, idx) => {
              const isCurrent = milestone.state === "current";
              const isActive = activeIndex === idx;

              return (
                <li
                  key={milestone.title}
                  className="w-[82vw] max-w-[310px] shrink-0 snap-start flex flex-col justify-between p-5 rounded-2xl bg-surface/75 border border-white/[0.08] backdrop-blur-md shadow-lg transition-all duration-300 select-none"
                  style={{
                    borderColor: isActive
                      ? "rgba(59, 130, 246, 0.45)"
                      : "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div>
                    {/* Top Row: Milestone Dot & Monospace Label */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex items-center justify-center shrink-0">
                          {isCurrent ? (
                            <div className="relative flex items-center justify-center">
                              {!shouldReduceMotion && (
                                <span className="animate-ping absolute -inset-0.5 rounded-full bg-blue/40" />
                              )}
                              <span className="relative w-3 h-3 rounded-full bg-blue shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                            </div>
                          ) : (
                            <span
                              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                                isActive
                                  ? "border-blue bg-blue/20 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                  : "border-white/20 bg-raised"
                              }`}
                            />
                          )}
                        </div>

                        <span className="text-[11px] font-mono text-soft-blue font-semibold tracking-wider uppercase truncate">
                          {milestone.label}
                        </span>
                      </div>

                      {isCurrent && (
                        <span className="text-[10px] font-mono font-semibold text-soft-blue bg-blue/15 border border-blue/30 px-2 py-0.5 rounded-full">
                          Present
                        </span>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-sora text-base font-bold text-text mb-2">
                      {milestone.title}
                    </h3>

                    {/* Milestone Description */}
                    <p className="text-xs text-muted leading-relaxed text-justify">
                      {milestone.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile Swipe Indicators / Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {milestones.map((m, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={m.title}
                type="button"
                onClick={() => scrollToMilestone(idx)}
                aria-label={`Go to milestone ${idx + 1}: ${m.title}`}
                className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                  isActive
                    ? "w-6 h-1.5 bg-blue shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
