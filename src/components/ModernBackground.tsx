"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

export default function ModernBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default off-screen)
    const mouse = { x: -1000, y: -1000 };

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Adjust particle count for device
    const isMobile = width < 768;
    const particleCount = isMobile ? 32 : 65;
    const connectionDistance = isMobile ? 100 : 140;
    const mouseRadius = 180;

    const colors = [
      "rgba(147, 197, 253,", // soft-blue
      "rgba(96, 165, 250,",  // light-blue
      "rgba(59, 130, 246,",  // blue
      "rgba(255, 255, 255,",  // crisp light
    ];

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = 0.45 + Math.random() * 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5 + Math.random() * 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha,
      });
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particles if motion not reduced
        if (!prefersReducedMotion) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 0 || p1.y > height) p1.vy *= -1;
        }

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.32;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse interaction: interactive connection lines to cursor
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouseRadius) {
          const malpha = (1 - mdist / mouseRadius) * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(147, 197, 253, ${malpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color} ${p1.baseAlpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* 2. Top Celestial Horizon Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1.5px] bg-gradient-to-r from-transparent via-blue to-transparent shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[950px] h-[480px] bg-gradient-to-b from-blue/35 via-soft-blue/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* 3. Deep Atmospheric Ambient Glow Pools (more vibrant & visible) */}
      <div className="absolute top-[24%] -left-32 w-[600px] h-[600px] bg-blue/[0.12] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[60%] -right-32 w-[650px] h-[650px] bg-soft-blue/[0.10] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-blue/[0.08] rounded-full blur-[130px] pointer-events-none" />


      {/* 5. Interactive Neural Circuit / Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. Subtle Tactile Noise Texture for Matte OLED Finish */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

      {/* 7. Perimeter Vignette for Depth & Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,9,0.55)_100%)] pointer-events-none" />
    </div>
  );
}
