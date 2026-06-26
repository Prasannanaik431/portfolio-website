"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const BOOT_LINES = [
  "Initializing kernel modules...",
  "Mounting filesystems: /dev /proc /sys",
  "Starting network services... [OK]",
  "Connecting to Kubernetes API server...",
  "Authenticating with cloud providers [AWS/Azure]...",
  "Loading GitOps controllers [Flux2]...",
  "Syncing Helm releases...",
  "Platform stack ready. Booting UI...",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [linesShown, setLinesShown] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) return;

    // Animate boot lines one by one
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        const next = prev + 1;
        if (next <= BOOT_LINES.length) {
          setLinesShown(BOOT_LINES.slice(0, next));
          setProgress(Math.round((next / BOOT_LINES.length) * 100));
        }
        if (next >= BOOT_LINES.length) {
          clearInterval(lineInterval);
          // Fade out after last line
          setTimeout(() => setVisible(false), 600);
        }
        return next;
      });
    }, 210);

    return () => clearInterval(lineInterval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#050816] flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 w-full max-w-md px-6">
            {/* Logo / Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Terminal className="h-8 w-8 text-brand-cyan" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-brand-cyan animate-ping" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-brand-cyan" />
              </div>
              <div className="font-mono">
                <div className="text-white font-bold text-lg tracking-tight">
                  prasanna<span className="text-brand-cyan">.naik</span>
                </div>
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Platform Engineer
                </div>
              </div>
            </div>

            {/* Terminal boot lines */}
            <div className="font-mono text-xs space-y-1 mb-6 min-h-[140px]">
              {linesShown.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-2 ${i === linesShown.length - 1 ? "text-white" : "text-muted-foreground/60"}`}
                >
                  <span className="text-brand-cyan select-none">$</span>
                  <span>{line}</span>
                  {i === linesShown.length - 1 && currentLine < BOOT_LINES.length && (
                    <span className="inline-block w-1.5 h-3 bg-brand-cyan ml-0.5 animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>Booting platform environment</span>
                <span className="text-brand-cyan">{progress}%</span>
              </div>
              <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
