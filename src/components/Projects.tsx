"use client";

import React, { useState } from "react";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projectsData, ProjectCategory } from "@/data/projects";
import { siteConfig } from "@/data/site";

type TabFilter = "all" | ProjectCategory;

const TABS: { id: TabFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Fullstack" },
  { id: "frontend", label: "Frontend" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  const filteredProjects = projectsData.filter((project) => {
    if (activeTab === "all") return true;
    return project.category === activeTab;
  });

  return (
    <section id="projects" className="py-20 md:py-28 relative section-dimmer">
      <div className="max-w-280 mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          subtitle="Some projects I've worked on recently."
        />

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex items-center p-1.5 rounded-2xl bg-raised border border-line shadow-lg backdrop-blur-md gap-1"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "all"
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-project-tab"
                      className="absolute inset-0 bg-gradient-to-r from-blue to-soft-blue rounded-xl shadow-md shadow-blue/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-surface border border-line text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 columns on tablet and desktop (>=768px), 1 col on mobile */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive GitHub Callout Box */}
        <div className="mt-14 sm:mt-20 max-w-3xl mx-auto rounded-3xl bg-linear-to-b from-raised via-surface to-raised border border-line p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl group">
          {/* Subtle ambient backlight */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top subtle blue highlight line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-blue to-transparent" />

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-semibold text-soft-blue mb-4 shadow-sm">
            <SiGithub className="w-3.5 h-3.5 text-white" />
            <span>Open Source &amp; Side Projects</span>
          </div>

          {/* Heading */}
          <h3 className="font-sora text-2xl sm:text-3xl font-bold text-text mb-3 leading-snug">
            Want to see more of my{" "}
            <span className="bg-linear-to-r from-soft-blue to-blue bg-clip-text text-transparent">
              work?
            </span>
          </h3>

          {/* Subtitle */}
          <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            I regularly build, experiment with AI, and contribute to the
            developer community. Explore all my repositories, experiments, and
            code on GitHub.
          </p>

          {/* Interactive Button */}
          <div className="flex justify-center">
            <a
              href={siteConfig.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-surface hover:bg-raised border border-line hover:border-blue/50 transition-all duration-300 shadow-xl hover:shadow-blue/20 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
            >
              <SiGithub className="w-5 h-5 transition-transform duration-200 group-hover/btn:scale-110" />
              <span>Visit My GitHub</span>
              <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-soft-blue transition-transform duration-200 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
