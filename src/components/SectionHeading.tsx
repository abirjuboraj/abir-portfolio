import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  // Split title to apply gradient to the last word
  const words = title.trim().split(" ");
  const mainWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  const alignmentClasses =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 md:mb-16 max-w-2xl ${alignmentClasses} ${className}`}>
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raised border border-line text-xs font-medium text-soft-blue tracking-wide uppercase mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-blue" />
        <span>{eyebrow}</span>
      </div>

      {/* Main heading - always visible by default */}
      <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text leading-tight mb-4">
        {mainWords ? `${mainWords} ` : ""}
        <span className="bg-gradient-to-r from-soft-blue to-blue bg-clip-text text-transparent">
          {lastWord}
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
