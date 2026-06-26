"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background transition-colors duration-500">
      {/* Moving grid overlay */}
      <div className="absolute inset-0 grid-bg" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Floating gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Blob 1: Blue/Indigo */}
        <motion.div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-brand-blue/15 blur-[120px] dark:bg-brand-blue/10"
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2: Cyan */}
        <motion.div
          className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-brand-cyan/15 blur-[100px] dark:bg-brand-cyan/10"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 3: Teal */}
        <motion.div
          className="absolute -bottom-20 left-1/3 h-[550px] w-[550px] rounded-full bg-brand-teal/15 blur-[110px] dark:bg-brand-teal/10"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, 40, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
