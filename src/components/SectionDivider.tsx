"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div
      className="w-full max-w-[1120px] mx-auto px-6 py-6 md:py-10 flex items-center justify-center relative overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Left line expanding outward */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-line to-line origin-right"
      />

      {/* Mouse scroll icon with animated dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-4 w-5 h-8 rounded-full border border-line bg-raised/80 flex items-start justify-center p-1 relative"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 h-1.5 rounded-full bg-soft-blue"
        />
      </motion.div>

      {/* Right line expanding outward */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-line to-line origin-left"
      />
    </div>
  );
}
