import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import ImageWithFallback from "@/components/ImageWithFallback";
import { projectsData } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | Md. Abir Hossen`,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const projectNumber = String(projectIndex + 1).padStart(2, "0");

  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projectsData.length - 1
      ? projectsData[projectIndex + 1]
      : null;

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-lg py-1 px-2 -ml-2 group"
          >
            <HiOutlineArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to projects</span>
          </Link>
        </div>

        {/* Two-Column Hero: Details Left, Large Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 pb-16 border-b border-line">
          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised border border-line text-xs font-semibold text-soft-blue tracking-wide uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              <span>Project {projectNumber}</span>
            </div>

            {/* Title */}
            <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {project.name}
            </h1>

            {/* Description */}
            <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 text-justify">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary Blue CTA: Live Project */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white bg-blue hover:bg-blue/90 border border-blue/70 transition-all duration-200 shadow-lg shadow-blue/25 hover:shadow-blue/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <span>Live Project</span>
                <HiOutlineArrowTopRightOnSquare className="w-4 h-4" />
              </a>

              {/* Outline CTA: GitHub */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-text hover:text-white bg-surface hover:bg-raised border border-line transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
              >
                <SiGithub className="w-4 h-4" />
                <span>GitHub</span>
                <HiOutlineArrowTopRightOnSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Large Image Column */}
          <div className="lg:col-span-6">
            <ImageWithFallback
              src={project.image}
              alt={project.name}
              fallbackTitle={project.name}
              expectedPath={`public${project.image}`}
              aspectRatioClass="aspect-[2.2/1]"
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>

        {/* Main Tech Stack Badges */}
        <div className="mb-16">
          <h2 className="font-sora text-xl sm:text-2xl font-bold text-text mb-4">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl bg-raised border border-line text-xs sm:text-sm font-medium text-text hover:border-soft-blue/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges & Future Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Challenges Faced */}
          <div>
            <h2 className="font-sora text-xl sm:text-2xl font-bold text-text mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue" />
              <span>Challenges Faced</span>
            </h2>
            <div className="space-y-4">
              {project.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-raised border border-line flex items-start gap-4"
                >
                  <span className="font-sora text-xs font-bold text-soft-blue bg-surface border border-line px-2.5 py-1 rounded-lg shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm sm:text-base text-muted leading-relaxed text-justify">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Future Improvements */}
          <div>
            <h2 className="font-sora text-xl sm:text-2xl font-bold text-text mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-soft-blue" />
              <span>Future Improvements</span>
            </h2>
            <div className="space-y-4">
              {project.futurePlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-raised border border-line flex items-start gap-4"
                >
                  <span className="font-sora text-xs font-bold text-blue bg-surface border border-line px-2.5 py-1 rounded-lg shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm sm:text-base text-muted leading-relaxed text-justify">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Previous / Next Project Navigation */}
        <div className="pt-10 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="w-full sm:w-auto p-4 rounded-xl bg-surface border border-line hover:bg-raised transition-colors flex items-center gap-3 group"
            >
              <HiOutlineChevronLeft className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
              <div className="text-left">
                <span className="text-[11px] uppercase tracking-wider text-muted block">
                  Previous Project
                </span>
                <span className="font-sora text-sm font-semibold text-text group-hover:text-soft-blue transition-colors">
                  {prevProject.name}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="w-full sm:w-auto p-4 rounded-xl bg-surface border border-line hover:bg-raised transition-colors flex items-center justify-end gap-3 text-right group ml-auto"
            >
              <div>
                <span className="text-[11px] uppercase tracking-wider text-muted block">
                  Next Project
                </span>
                <span className="font-sora text-sm font-semibold text-text group-hover:text-soft-blue transition-colors">
                  {nextProject.name}
                </span>
              </div>
              <HiOutlineChevronRight className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>
    </div>
  );
}
