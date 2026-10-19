"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiOutlinePhoto } from "react-icons/hi2";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  expectedPath?: string;
  className?: string;
  aspectRatioClass?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "project" | "avatar";
  fit?: "cover" | "contain";
  imageClassName?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackTitle = "Project Preview",
  expectedPath,
  className = "",
  aspectRatioClass = "aspect-[16/10]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  variant = "project",
  fit = "contain",
  imageClassName = "",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (variant === "avatar") {
    if (error) {
      return (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br from-raised via-surface to-bg border border-line flex flex-col items-center justify-center text-center p-4 ${className}`}
        >
          <span className="font-sora text-2xl sm:text-3xl font-bold text-soft-blue mb-1">
            AH
          </span>
          <span className="text-[11px] sm:text-xs text-muted font-medium">
            Your photo here
          </span>
          {expectedPath && (
            <span className="text-[9px] text-muted/60 mt-1 font-mono">
              {expectedPath}
            </span>
          )}
        </div>
      );
    }

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
          className={imageClassName || "object-cover object-top transition-transform duration-700 hover:scale-105"}
          onError={() => setError(true)}
        />
      </div>
    );
  }

  // Project variant
  return (
    <div
      className={`relative w-full aspect-[2.2/1] overflow-hidden rounded-xl border border-line/70 bg-[#0c0c0f] ${className}`}
    >
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-raised/80 to-surface">
          <div className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-soft-blue/70 mb-3 shadow-inner">
            <HiOutlinePhoto className="w-6 h-6" />
          </div>
          <span className="font-sora text-sm sm:text-base font-semibold text-text mb-1">
            {fallbackTitle}
          </span>
          <span className="text-xs text-muted mb-2 max-w-xs">
            Image preview placeholder
          </span>
          {expectedPath && (
            <code className="text-[10px] sm:text-[11px] text-soft-blue/90 font-mono px-2.5 py-1 rounded bg-bg/80 border border-line/60">
              {expectedPath}
            </code>
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
