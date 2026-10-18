"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import ImageWithFallback from "./ImageWithFallback";

interface TechOrbitProps {
  mousePosition: { x: number; y: number };
}

interface FloatingTech {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  position: string;
  floatDelay: number;
  offsetX: number;
  offsetY: number;
}

const techItems: FloatingTech[] = [
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    position: "-top-1.5 right-1.5 sm:top-0 sm:right-2 md:top-1 md:right-3",
    floatDelay: 0,
    offsetX: 12,
    offsetY: -10,
  },
  {
    id: "react",
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    position: "-bottom-1.5 right-1.5 sm:bottom-0 sm:right-2 md:bottom-1 md:right-3",
    floatDelay: 1,
    offsetX: 14,
    offsetY: 12,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    position: "-bottom-1.5 left-1.5 sm:bottom-0 sm:left-2 md:bottom-1 md:left-3",
    floatDelay: 2,
    offsetX: -14,
    offsetY: 10,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#38BDF8",
    position: "-top-1.5 left-1.5 sm:top-0 sm:left-2 md:top-1 md:left-3",
    floatDelay: 1.5,
    offsetX: -12,
    offsetY: -12,
  },
];

export default function TechOrbit({ mousePosition }: TechOrbitProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Subtle mouse shift factor
  const shiftX = mousePosition.x * 12;
  const shiftY = mousePosition.y * 12;

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[470px] aspect-square mx-auto flex items-center justify-center p-2 sm:p-3">
      {/* Rotating gradient ring */}
      <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-full p-[2px] bg-gradient-to-tr from-blue/40 via-soft-blue/20 to-transparent animate-[spin_20s_linear_infinite] pointer-events-none opacity-80" />

      {/* Outer ambient glow */}
      <div className="absolute inset-8 rounded-full bg-blue/5 blur-2xl pointer-events-none" />

      {/* Circular Avatar Container - Enriched & Enlarged */}
      <div className="relative w-[250px] h-[250px] sm:w-[290px] sm:h-[290px] md:w-[325px] md:h-[325px] lg:w-[355px] lg:h-[355px] rounded-full p-1.5 bg-surface border-2 border-line shadow-2xl overflow-hidden z-10 transition-transform duration-500 hover:scale-[1.01]">
        <ImageWithFallback
          src="/photo.jpg"
          alt="Md. Abir Hossen"
          fallbackTitle="AH"
          expectedPath="public/photo.jpg"
          variant="avatar"
          priority
        />
      </div>

      {/* Floating Interactive Tech Buttons */}
      {techItems.map((tech) => {
        const IconComponent = tech.icon;
        const isHovered = activeTooltip === tech.id;

        return (
          <motion.div
            key={tech.id}
            className={`absolute z-20 ${tech.position}`}
            animate={{
              y: [0, -8, 0],
              x: [0, 4, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tech.floatDelay,
            }}
            style={{
              transform: `translate3d(${shiftX * (tech.offsetX / 14)}px, ${
                shiftY * (tech.offsetY / 14)
              }px, 0)`,
            }}
          >
            <div className="relative group">
              <button
                type="button"
                onMouseEnter={() => setActiveTooltip(tech.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                onFocus={() => setActiveTooltip(tech.id)}
                onBlur={() => setActiveTooltip(null)}
                aria-label={`Technology: ${tech.name}`}
                className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-2xl bg-raised/95 border border-line flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110 group-focus:scale-110 group-hover:-rotate-3 group-focus:-rotate-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                style={{
                  boxShadow: isHovered
                    ? `0 0 20px -2px ${tech.color}40, 0 10px 15px -3px rgba(0,0,0,0.5)`
                    : "0 8px 16px -4px rgba(0,0,0,0.4)",
                  borderColor: isHovered ? `${tech.color}80` : undefined,
                }}
              >
                <IconComponent
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300"
                  style={{ color: tech.color }}
                />
              </button>

              {/* Tooltip */}
              <div
                role="tooltip"
                className={`absolute left-1/2 -translate-x-1/2 -bottom-8 px-2.5 py-1 rounded-md bg-surface border border-line text-[11px] font-medium text-text whitespace-nowrap shadow-xl pointer-events-none transition-all duration-200 ${
                  isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
                }`}
              >
                {tech.name}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
