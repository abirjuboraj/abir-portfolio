"use client";

import React from "react";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 relative section-dimmer">
      <div className="max-w-280 mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          subtitle="Some projects I've worked on recently."
        />

        {/* 2 columns on tablet and desktop (>=768px), 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

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
