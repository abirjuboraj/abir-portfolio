"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import ImageWithFallback from "./ImageWithFallback";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply tilt on hover-capable devices
    if (!window.matchMedia("(hover: hover)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3D tilt angles (max ~5 degrees)
    setRotate({
      x: -y * 6,
      y: x * 6,
    });
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const visibleTags = project.techStack.slice(0, 4);
  const remainingCount = project.techStack.length - 4;
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
        transition: isHovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.5s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      className="group w-full max-w-[400px] sm:max-w-[620px] md:max-w-none mx-auto rounded-2xl bg-raised border border-line p-4 sm:p-5 md:p-6 flex flex-col justify-between hover:border-line/90 hover:shadow-2xl hover:shadow-black/70 relative overflow-hidden"
    >
      {/* Top subtle blue rim accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header Row with Project Number and Quick Action Links */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-surface border border-line text-[11px] font-semibold text-soft-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            Project {projectNumber}
          </span>

          {/* Quick External Links (Live & GitHub) */}
          <div className="flex items-center gap-1.5">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.name}`}
              className="w-7 h-7 rounded-lg bg-surface border border-line flex items-center justify-center text-muted hover:text-white hover:border-soft-blue/40 transition-colors"
            >
              <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code of ${project.name} on GitHub`}
              className="w-7 h-7 rounded-lg bg-surface border border-line flex items-center justify-center text-muted hover:text-white hover:border-soft-blue/40 transition-colors"
            >
              <SiGithub className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Project Thumbnail Image with Fallback */}
        <div className="mb-4 sm:mb-5">
          <ImageWithFallback
            src={project.image}
            alt={project.name}
            fallbackTitle={project.name}
            expectedPath={`public${project.image}`}
            sizes="(max-width: 640px) 400px, (max-width: 768px) 620px, 540px"
          />
        </div>

        {/* Project Title - 1-line clamped for uniform alignment */}
        <h3 className="font-sora text-lg sm:text-xl md:text-2xl font-bold text-text group-hover:text-white transition-colors mb-2 line-clamp-1">
          {project.name}
        </h3>

        {/* 3-line Description Clamp with uniform height */}
        <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3 h-[3.8rem] sm:h-[4.2rem] mb-5 overflow-hidden text-justify">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Tags - Fixed height container so footer aligns horizontally across cards */}
        <div className="flex flex-wrap content-start gap-1.5 mb-5 h-[58px] sm:h-[62px] overflow-hidden">
          {visibleTags.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-surface border border-line/80 text-[11px] sm:text-xs font-medium text-muted group-hover:text-text transition-colors"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="px-2 py-1 rounded-md bg-surface border border-line/80 text-[11px] sm:text-xs font-semibold text-soft-blue">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* View Details Link */}
        <div className="pt-3 border-t border-line/60 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-text group-hover:text-soft-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-lg py-1"
          >
            <span>View Details</span>
            <HiOutlineArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
