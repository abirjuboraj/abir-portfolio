"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function LoaderVisual({
  progress = 100,
  isNavigation = false,
}: {
  progress?: number;
  isNavigation?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none z-10 px-6">
      {/* Ambient background glow */}
      <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-blue/15 blur-[100px] pointer-events-none -z-10" />

      {/* Decorative top micro badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-line mb-6 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-soft-blue uppercase">
          {isNavigation ? "Loading Page" : "Portfolio"}
        </span>
      </motion.div>

      {/* Centerpiece Name: "Abir" with Luxury Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-baseline"
      >
        <span className="font-sora text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-white via-soft-blue to-blue bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,0.35)]">
          Abir
        </span>
        <span className="font-sora text-6xl sm:text-7xl md:text-8xl font-extrabold text-blue inline-block animate-pulse ml-0.5">
          .
        </span>
      </motion.div>

      {/* Sleek Progress Bar */}
      <div className="w-48 sm:w-60 mt-7 sm:mt-8">
        <div className="h-[2px] w-full bg-surface/90 rounded-full overflow-hidden relative border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-blue via-soft-blue to-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>

        {/* Status line under progress bar */}
        <div className="flex items-center justify-between mt-2.5 px-0.5">
          <span className="text-[10px] font-mono tracking-[0.22em] text-muted uppercase">
            Full Stack Developer
          </span>
          <span className="text-[10px] font-mono font-semibold text-soft-blue">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PageLoader() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [initialLoading, setInitialLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const prevPathnameRef = useRef(pathname);

  // 1. Initial Site Load Animation (on first entry)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Smooth organic acceleration curve
      const step = current < 40 ? 12 : current < 75 ? 8 : 15;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setInitialLoading(false);
        }, 220);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // 2. Intercept internal navigation clicks for instant response
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore anchor links on the same page (#about, #contact, etc.)
      if (href.startsWith("#")) return;

      // Ignore external or target="_blank" links
      if (
        target.target === "_blank" ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // If clicking internal link to another page (e.g. /projects/bazar-dor from /)
      const targetUrl = new URL(target.href, window.location.href);
      if (
        targetUrl.origin === window.location.origin &&
        targetUrl.pathname !== pathname
      ) {
        setNavLoading(true);
        setProgress(30);

        // Progress rapidly
        const navTimer = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(navTimer);
              return 90;
            }
            return prev + 25;
          });
        }, 60);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleLinkClick, { capture: true });
  }, [pathname]);

  // 3. When pathname changes, complete transition and fade out
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setProgress(100);
      const timer = setTimeout(() => {
        setNavLoading(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const showLoader = initialLoading || navLoading;

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          key="global-page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : -15,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09090b] cursor-wait"
          style={{ willChange: "opacity, transform" }}
          aria-live="polite"
          aria-busy="true"
        >
          {/* Subtle noise / architectural grid overlay */}
          <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />

          {/* Core Visual */}
          <LoaderVisual progress={progress} isNavigation={navLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
