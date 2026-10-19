"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { HiShieldCheck, HiOutlineChevronDown } from "react-icons/hi2";
import SectionHeading from "./SectionHeading";
import { skillsData, Skill, SkillCategory } from "@/data/skills";

// Helper function to resolve icon component
function getSkillIcon(iconName: string) {
  switch (iconName) {
    case "SiReact":
      return SiReact;
    case "SiNextdotjs":
      return SiNextdotjs;
    case "SiJavascript":
      return SiJavascript;
    case "SiTypescript":
      return SiTypescript;
    case "SiTailwindcss":
      return SiTailwindcss;
    case "SiMongodb":
      return SiMongodb;
    case "BetterAuth":
      return HiShieldCheck;
    case "SiGit":
      return SiGit;
    case "SiGithub":
      return SiGithub;
    case "SiVercel":
      return SiVercel;
    default:
      return HiShieldCheck;
  }
}

function SkillCard({ skill }: { skill: Skill }) {
  const IconComponent = getSkillIcon(skill.iconName);
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
      className="relative p-5 rounded-2xl bg-raised border border-line flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 overflow-hidden group"
      style={{
        borderColor: isHovered ? `${skill.brandColor}50` : undefined,
      }}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${skill.brandColor}18, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Large icon box */}
        <div
          className="w-14 h-14 rounded-2xl bg-surface border border-line flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
          style={{
            boxShadow: isHovered
              ? `0 0 16px -2px ${skill.brandColor}35`
              : "none",
          }}
        >
          <IconComponent
            className="w-7 h-7 transition-colors duration-300"
            style={{ color: skill.brandColor }}
          />
        </div>

        {/* Skill name & Category */}
        <h3 className="font-sora text-sm sm:text-base font-bold text-text group-hover:text-white transition-colors mb-0.5">
          {skill.name}
        </h3>
        <span className="text-[11px] font-medium text-muted uppercase tracking-wider mb-4">
          {skill.category}
        </span>
      </div>

      {/* 3-segment level meter and level label */}
      <div className="relative z-10 w-full pt-3 border-t border-line/60 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 w-full max-w-[100px]">
          {[1, 2, 3].map((segment) => {
            const isActive = segment <= skill.levelSegments;
            return (
              <div
                key={segment}
                className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: isActive
                    ? skill.brandColor
                    : "rgba(255, 255, 255, 0.1)",
                }}
              />
            );
          })}
        </div>
        <span className="text-[11px] font-semibold text-muted group-hover:text-text transition-colors">
          {skill.level}
        </span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  const categories: Array<"All" | SkillCategory> = [
    "All",
    "Frontend",
    "Backend",
    "Tools",
  ];

  const filteredSkills =
    selectedFilter === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedFilter);

  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative overflow-hidden section-dimmer"
    >
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Expertise"
          subtitle="The tools I use to design, build and ship."
        />

        {/* Infinite Scrolling Marquee */}
        <div className="mb-14 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-3 py-2 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {[...skillsData, ...skillsData].map((skill, index) => {
              const IconComp = getSkillIcon(skill.iconName);
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-raised border border-line text-xs font-medium text-text select-none hover:border-line hover:bg-surface transition-colors shrink-0"
                >
                  <IconComp
                    className="w-4 h-4 shrink-0"
                    style={{ color: skill.brandColor }}
                  />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Pills with Counts */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? skillsData.length
                : skillsData.filter((s) => s.category === cat).length;
            const isSelected = selectedFilter === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedFilter(cat);
                  setShowAllMobile(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                  isSelected
                    ? "bg-blue text-white shadow-md shadow-blue/25"
                    : "bg-raised text-muted hover:text-text border border-line hover:bg-surface"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-surface text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tile Grid (auto-fill, min 168px; 2 cols on small mobile) */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const isHiddenOnMobile =
                selectedFilter === "All" && !showAllMobile && index >= 4;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={isHiddenOnMobile ? "hidden sm:block" : "block"}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Mobile "See more" / "See less" button - Only visible in mobile view when "All" tab has > 4 cards */}
        {selectedFilter === "All" && filteredSkills.length > 4 && (
          <div className="sm:hidden flex justify-center mt-7">
            <button
              type="button"
              onClick={() => setShowAllMobile((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-text hover:text-white bg-raised hover:bg-surface border border-line transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              <span>{showAllMobile ? "See less" : "See more"}</span>
              <HiOutlineChevronDown
                className={`w-3.5 h-3.5 text-soft-blue transition-transform duration-300 ${
                  showAllMobile ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
