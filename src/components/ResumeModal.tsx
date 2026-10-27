"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineEye,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  downloadFilename?: string;
}

export default function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = "/resume.pdf",
  downloadFilename = "Abir_Hossen_Resume.pdf",
}: ResumeModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview Modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-4xl h-[90vh] sm:h-[86vh] flex flex-col bg-[#0f0f14] border border-white/[0.1] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#14141c]/90 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue/15 border border-blue/30 flex items-center justify-center text-soft-blue">
                  <HiOutlineEye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sora text-sm sm:text-base font-semibold text-white tracking-tight flex items-center gap-2">
                    Resume Preview
                    <span className="hidden sm:inline-block text-[11px] font-normal text-muted px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                      PDF
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted truncate max-w-[180px] sm:max-w-none">
                    Md. Abir Hossen • Full Stack Developer
                  </p>
                </div>
              </div>

              {/* Action Buttons: Download CTA + Close */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Direct download button requested by user */}
                <a
                  href={pdfUrl}
                  download={downloadFilename}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue hover:bg-blue/90 border border-blue/60 shadow-md shadow-blue/25 hover:shadow-blue/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  aria-label="Download Resume"
                >
                  <HiOutlineArrowDownTray className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Download</span>
                </a>

                {/* External open button (useful on mobile browsers where iframe PDF viewer may have limited pinch-zoom) */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-muted hover:text-white transition-colors"
                  title="Open in new tab"
                  aria-label="Open PDF in new tab"
                >
                  <HiOutlineArrowTopRightOnSquare className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-muted hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue cursor-pointer"
                  aria-label="Close Preview"
                >
                  <HiOutlineXMark className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* PDF Preview Frame */}
            <div className="relative flex-1 w-full bg-[#09090d] overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#09090d] z-10">
                  <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs sm:text-sm text-muted">
                    Loading Resume preview...
                  </span>
                </div>
              )}

              <object
                data={`${pdfUrl}#toolbar=0&navpanes=0`}
                type="application/pdf"
                className="w-full h-full border-none"
                onLoad={() => setIsLoading(false)}
              >
                {/* Fallback if browser doesn't natively render PDFs */}
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-soft-blue mb-4">
                    <HiOutlineArrowDownTray className="w-6 h-6" />
                  </div>
                  <h4 className="font-sora text-base font-semibold text-white mb-2">
                    Preview not supported on this browser
                  </h4>
                  <p className="text-sm text-muted max-w-md mb-5 leading-relaxed">
                    Your mobile browser does not embed PDF previews inline, but you can download or view it directly:
                  </p>
                  <a
                    href={pdfUrl}
                    download={downloadFilename}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue hover:bg-blue/90 shadow-lg shadow-blue/20"
                  >
                    <HiOutlineArrowDownTray className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
