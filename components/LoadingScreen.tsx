"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "$ init platform environment...",
  "$ loading gitops controllers [flux2]...",
  "$ mounting kubernetes api server...",
  "$ syncing helm releases across namespaces...",
  "$ validating kyverno policies...",
  "$ starting observability stack [prometheus/grafana]...",
  "$ platform ready — launching UI ✓",
];

export default function LoadingScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[idx]]);
        setProgress(Math.round(((idx + 1) / BOOT_LINES.length) * 100));
        idx++;
      } else {
        clearInterval(interval);
        // Brief pause then fade out
        setTimeout(() => setExiting(true), 300);
        setTimeout(() => setDone(true), 900);
      }
    }, 170);
    return () => clearInterval(interval);
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99998] bg-[#050816] flex items-center justify-center"
          style={{ cursor: "none" }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          {/* Cyan radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-brand-cyan/5 blur-[100px]" />
          </div>

          <div className="relative z-10 w-full max-w-sm px-6">
            {/* Brand */}
            <div className="mb-8 text-left">
              <div className="font-mono text-white text-xl font-bold tracking-tight mb-1">
                prasanna<span className="text-brand-cyan">.naik</span>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                Platform Engineer · DevOps · GitOps
              </div>
            </div>

            {/* Boot lines */}
            <div className="font-mono text-xs space-y-1.5 mb-8 min-h-[126px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={
                    i === lines.length - 1
                      ? "text-brand-cyan"
                      : "text-muted-foreground/50"
                  }
                >
                  {line}
                  {i === lines.length - 1 && progress < 100 && (
                    <span className="ml-1 inline-block w-1 h-3 bg-brand-cyan animate-pulse align-middle" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="h-px w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground/40">
                <span>booting platform</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
