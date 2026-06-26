"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ArrowRight, ShieldCheck, Cpu, CloudLightning } from "lucide-react";
import TerminalSimulator from "./TerminalSimulator";
import KubernetesClusterVisual from "./KubernetesClusterVisual";
import TechStackMarquee from "./TechStackMarquee";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero() {
  const [consoleView, setConsoleView] = useState<"terminal" | "cluster">("terminal");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between pt-16 md:pt-24 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Floating Cloud/DevOps Decor Elements */}
      <div className="absolute top-1/4 left-1/10 text-brand-cyan/20 animate-pulse pointer-events-none hidden md:block">
        <Cpu className="h-10 w-10 animate-bounce" style={{ animationDuration: "6s" }} />
      </div>
      <div className="absolute bottom-1/3 right-1/12 text-brand-blue/20 animate-pulse pointer-events-none hidden md:block">
        <ShieldCheck className="h-12 w-12 animate-bounce" style={{ animationDuration: "8s" }} />
      </div>
      <div className="absolute top-1/2 right-1/2 text-brand-teal/20 animate-pulse pointer-events-none hidden lg:block">
        <CloudLightning className="h-8 w-8 animate-bounce" style={{ animationDuration: "5s" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto w-full">
        {/* Left Column: Heading, Info, CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col text-left space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 px-3.5 py-1 text-xs font-mono font-medium tracking-wide text-brand-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-ping" />
              Open to Platform & DevOps Engineering Roles
            </span>
          </motion.div>

          {/* Name & Titles */}
          <div className="space-y-2">
            <motion.h2 
              variants={itemVariants} 
              className="text-sm font-mono text-muted-foreground tracking-wider uppercase"
            >
              PRASANNA SURESH NAIK
            </motion.h2>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400"
            >
              Platform Engineer
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-1.5 text-xs font-mono text-brand-cyan"
            >
              <span>#PlatformEngineering</span>
              <span className="text-muted-foreground">•</span>
              <span>#Kubernetes</span>
              <span className="text-muted-foreground">•</span>
              <span>#GitOps</span>
              <span className="text-muted-foreground">•</span>
              <span>#DevSecOps</span>
              <span className="text-muted-foreground">•</span>
              <span>#IDP</span>
              <span className="text-muted-foreground">•</span>
              <span>#IaC</span>
            </motion.div>
          </div>

          {/* Headline copy */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Platform Engineer with 1.5+ years designing Internal Developer Platforms, enterprise GitOps workflows, and production-grade Kubernetes infrastructure across 35+ environments on AWS &amp; Azure. Specialized in DevSecOps, secrets management, and developer self-service tooling.
          </motion.p>

          {/* Call-to-Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-slate-500/10 dark:hover:shadow-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#blog"
              className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Read Blog
            </a>
            <a
              href="/resume/Prasanna_Naik_DevOps.pdf"
              download
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand-cyan transition-colors py-2 px-3 font-mono border border-white/10 rounded-full hover:border-brand-cyan/20"
            >
              ↓ resume.pdf
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4 border-t border-white/5">
            <span className="text-xs font-mono text-muted-foreground">Follow active feeds:</span>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/prasanna-naik-40124b1ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-brand-cyan hover:border-brand-cyan/20 transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://leetcode.com/u/prasannanaik431/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-brand-blue hover:border-brand-blue/20 transition-all hover:scale-110"
                aria-label="LeetCode Profile"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Prasannanaik431"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:border-white/20 transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Column: Console Switcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-5 flex flex-col w-full"
        >
          {/* Console control header */}
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setConsoleView("terminal")}
                className={`text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded transition-all ${
                  consoleView === "terminal"
                    ? "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Live CLI Shell
              </button>
              <button
                onClick={() => setConsoleView("cluster")}
                className={`text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded transition-all ${
                  consoleView === "cluster"
                    ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                Kubernetes Topology
              </button>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Agent online
            </div>
          </div>

          {/* Active View Container */}
          <div className="relative w-full">
            {consoleView === "terminal" ? (
              <TerminalSimulator />
            ) : (
              <KubernetesClusterVisual />
            )}
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Marquee (Bottom) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full mt-12 border-t border-white/5 pt-4"
      >
        <TechStackMarquee />
      </motion.div>

      {/* Scrolling Indicator */}
      <div className="flex justify-center mt-6 select-none">
        <a 
          href="#about"
          className="flex flex-col items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("about");
            if (element) {
              window.scrollTo({
                top: element.offsetTop - 80,
                behavior: "smooth",
              });
            }
          }}
        >
          <span>EXPLORE PLATFORM</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-7 w-4.5 rounded-full border border-muted-foreground/30 flex justify-center pt-1"
          >
            <div className="h-1.5 w-1 rounded-full bg-brand-cyan" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
