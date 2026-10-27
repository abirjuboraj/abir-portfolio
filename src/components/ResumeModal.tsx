"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineEye,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowPath,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineMagnifyingGlassMinus,
} from "react-icons/hi2";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  downloadFilename?: string;
}

declare global {
  interface Window {
    pdfjsLib?: {
      GlobalWorkerOptions: {
        workerSrc: string;
      };
      getDocument: (src: string | { data: Uint8Array }) => {
        promise: Promise<{
          numPages: number;
          getPage: (pageNumber: number) => Promise<{
            getViewport: (params: { scale: number }) => {
              width: number;
              height: number;
            };
            render: (params: {
              canvasContext: CanvasRenderingContext2D;
              viewport: unknown;
            }) => {
              promise: Promise<void>;
            };
          }>;
        }>;
      };
    };
  }
}

export default function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = "/resume.pdf",
  downloadFilename = "Abir_Hossen_Resume.pdf",
}: ResumeModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const [baseDimensions, setBaseDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Touch pinch-to-zoom tracking refs
  const initialPinchDistRef = useRef<number | null>(null);
  const startPinchScaleRef = useRef<number>(1);

  // Render PDF onto high-resolution canvas at native sharpness (1.4x container width)
  const renderPdf = useCallback(async () => {
    if (!isOpen) return;
    setIsLoading(true);
    setLoadError(false);

    try {
      // 1. Ensure PDF.js library script is loaded
      if (!window.pdfjsLib) {
        await new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector(
            'script[src="/vendor/pdf.min.js"]'
          );
          if (existingScript) {
            existingScript.addEventListener("load", () => resolve());
            existingScript.addEventListener("error", () =>
              reject(new Error("Failed to load PDF script"))
            );
            if (window.pdfjsLib) resolve();
            return;
          }

          const script = document.createElement("script");
          script.src = "/vendor/pdf.min.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load PDF script"));
          document.head.appendChild(script);
        });
      }

      if (!window.pdfjsLib) {
        throw new Error("PDF.js library not found");
      }

      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.js";

      // 2. Load the document
      const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      if (!canvasRef.current || !containerRef.current) return;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not get canvas context");

      // Measure available width
      const containerWidth = containerRef.current.clientWidth || 360;
      const isMobile = window.innerWidth < 640;
      const padding = isMobile ? 16 : 48;
      const baseDisplayWidth = Math.max(containerWidth - padding, 280);

      const unscaledViewport = page.getViewport({ scale: 1 });
      const baseScale = baseDisplayWidth / unscaledViewport.width;

      // Render canvas with high pixel density (crisp even when zoomed in up to 2.5x)
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const renderScale = baseScale * dpr * 1.35;
      const viewport = page.getViewport({ scale: renderScale });

      const displayW = Math.floor(baseDisplayWidth);
      const displayH = Math.floor(
        (baseDisplayWidth / unscaledViewport.width) * unscaledViewport.height
      );

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      setBaseDimensions({ width: displayW, height: displayH });

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      setIsLoading(false);
    } catch (err) {
      console.error("Resume preview render error:", err);
      setLoadError(true);
      setIsLoading(false);
    }
  }, [isOpen, pdfUrl]);

  const handleClose = useCallback(() => {
    setZoomScale(1);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        renderPdf();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, renderPdf]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Touch Pinch-to-Zoom handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      startPinchScaleRef.current = zoomScale;
      setIsPinching(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && initialPinchDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / initialPinchDistRef.current;
      const nextScale = Math.min(Math.max(startPinchScaleRef.current * factor, 0.8), 2.5);
      setZoomScale(nextScale);
    }
  };

  const handleTouchEnd = () => {
    initialPinchDistRef.current = null;
    setIsPinching(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview Modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-4xl h-[94vh] sm:h-[88vh] flex flex-col bg-[#0f0f14] border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
          >
            {/* Header Toolbar: Clean, uncluttered, properly responsive */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-white/[0.08] bg-[#14141c]/95 backdrop-blur-md shrink-0">
              {/* Left Identity: Preview Title on mobile; Name & Role on tablet & laptop */}
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue/15 border border-blue/30 flex items-center justify-center text-soft-blue shrink-0">
                  <HiOutlineEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-sora text-xs sm:text-base font-semibold text-white tracking-tight leading-tight truncate">
                      Resume Preview
                    </h3>
                    <span className="hidden sm:inline-block text-[10px] font-normal text-muted px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                      PDF
                    </span>
                  </div>
                  {/* Name and Title: Hidden on mobile (<640px), visible on tablet and laptop */}
                  <p className="hidden sm:block text-xs text-muted leading-tight mt-0.5 truncate">
                    Md. Abir Hossen <span className="opacity-40">•</span> Full Stack Developer
                  </p>
                </div>
              </div>

              {/* Action Buttons: Smooth Zoom + Download CTA + External Tab + Close */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom Controls */}
                <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setZoomScale((prev) => Math.max(0.8, Number((prev - 0.2).toFixed(1))))
                    }
                    disabled={zoomScale <= 0.8}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-muted hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <HiOutlineMagnifyingGlassMinus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] sm:text-xs font-mono px-1 sm:px-1.5 text-muted min-w-[32px] sm:min-w-[38px] text-center select-none">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setZoomScale((prev) => Math.min(2.5, Number((prev + 0.2).toFixed(1))))
                    }
                    disabled={zoomScale >= 2.5}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-muted hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <HiOutlineMagnifyingGlassPlus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct Download Button */}
                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue hover:bg-blue/90 border border-blue/60 shadow-md shadow-blue/25 hover:shadow-blue/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue shrink-0"
                  aria-label="Download Resume"
                >
                  <HiOutlineArrowDownTray className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="whitespace-nowrap">Download</span>
                </a>

                {/* Open in new tab button */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-muted hover:text-white transition-colors shrink-0"
                  title="Open PDF in new tab"
                  aria-label="Open PDF in new tab"
                >
                  <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-muted hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue cursor-pointer shrink-0"
                  aria-label="Close Preview"
                >
                  <HiOutlineXMark className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Document Viewer Container with Pinch-to-Zoom & Touch Gestures */}
            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="relative flex-1 w-full bg-[#09090d] overflow-y-scroll overflow-x-auto touch-pan-y touch-pan-x p-2 sm:p-6"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Spinner while loading */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#09090d]/90 backdrop-blur-xs z-20">
                  <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs sm:text-sm text-muted">
                    Loading Resume preview...
                  </span>
                </div>
              )}

              {/* Error fallback state */}
              {loadError && !isLoading && (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-soft-blue mb-4">
                    <HiOutlineArrowDownTray className="w-6 h-6" />
                  </div>
                  <h4 className="font-sora text-base font-semibold text-white mb-2">
                    Preview unavailable
                  </h4>
                  <p className="text-sm text-muted max-w-sm mb-5 leading-relaxed">
                    You can still download the PDF directly or try reloading the preview.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={pdfUrl}
                      download={downloadFilename}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue hover:bg-blue/90 shadow-md shadow-blue/20"
                    >
                      <HiOutlineArrowDownTray className="w-4 h-4" />
                      Download Resume
                    </a>
                    <button
                      type="button"
                      onClick={() => renderPdf()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-text bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] cursor-pointer"
                    >
                      <HiOutlineArrowPath className="w-4 h-4" />
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Fluid, Hardware-Accelerated Scaled Canvas Wrapper */}
              <div
                className="flex items-start justify-center pb-14 sm:pb-8 pt-1"
                style={{
                  minWidth: baseDimensions.width > 0 ? `${Math.ceil(baseDimensions.width * zoomScale)}px` : "100%",
                  minHeight: baseDimensions.height > 0 ? `${Math.ceil(baseDimensions.height * zoomScale)}px` : "auto",
                }}
              >
                <div
                  className={`transition-opacity duration-300 shadow-2xl rounded-lg overflow-hidden border border-white/[0.1] bg-white origin-top-left sm:origin-top ${
                    isLoading || loadError ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: "top center",
                    transition: isPinching
                      ? "none"
                      : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <canvas ref={canvasRef} className="block max-w-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
