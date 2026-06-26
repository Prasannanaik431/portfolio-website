"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  target: number;
  label: string;
  suffix: string;
}

const STATS: StatItem[] = [
  { target: 35, label: "Production Environments Managed", suffix: "+" },
  { target: 80, label: "Deployment Time Reduction", suffix: "%" },
  { target: 90, label: "Manual Configuration Reduced", suffix: "%" },
  { target: 100, label: "CI/CD Deployments Automated", suffix: "+" },
];

function StatCounter({ target, suffix, duration = 1.5 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const end = target;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = () => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * progress);

      if (frame < totalFrames) {
        setCount(currentCount);
        requestAnimationFrame(counter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(counter);
  }, [isInView, target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const yamlContent = `name: Prasanna Suresh Naik
role: Platform & DevOps Engineer
experience: 1.5+ Years
specialization:
  - Kubernetes Platform Engineering
  - Internal Developer Platforms (IDP)
  - GitOps & GitOps Pipelines (Flux2)
  - Terraform (Infrastructure as Code)
  - DevSecOps & Kyverno Policy Engine
  - AI-Powered Observability & Logs
achievements:
  deployments: "35+ Prod Envs Orchestrated"
  velocity: "80% reduction in deploy cycles"
  helm: "Built framework serving 100+ services"`;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wider uppercase mb-2">
            $ cat /var/log/about_me.log
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Professional Summary
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: CLI YAML Profile Viewer */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full glass-panel rounded-lg shadow-xl overflow-hidden border border-white/10 dark:border-white/5 font-mono text-xs text-left">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[10px] text-muted-foreground">profile.yaml</span>
                </div>
                <div className="text-[10px] text-muted-foreground">UTF-8</div>
              </div>
              {/* Terminal Body */}
              <div className="p-4 bg-black/60 text-white/80 overflow-x-auto leading-relaxed">
                <div className="flex items-center text-muted-foreground mb-3 select-none">
                  <span className="text-brand-teal">prasanna@naik-platform</span>
                  <span className="mx-1">:</span>
                  <span className="text-brand-blue">~</span>
                  <span className="text-brand-cyan ml-1">$</span>
                  <span className="text-foreground ml-2">cat profile.yaml</span>
                </div>
                <pre className="text-brand-cyan/80 select-all whitespace-pre-wrap">{yamlContent}</pre>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Counter Grid */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                I am a passionate <strong className="text-foreground font-semibold">Platform & DevOps Engineer</strong> with 1.5+ years of production experience designing and automating robust infrastructure pipelines across 35+ environments. My expertise focuses on building enterprise GitOps models, Helm framework standards, and secure CI/CD loops.
              </p>
              <p>
                My ultimate goal is to bridge the gap between development and operations. I build internal developer self-service tooling, enforce policy-as-code guards with Kyverno, and leverage LLMs to perform automated log analysis, reducing operational complexity and driving developer velocity.
              </p>
            </div>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="p-4 rounded-lg bg-white/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 shadow-sm"
                >
                  <div className="text-3xl font-extrabold font-mono text-brand-cyan mb-1.5">
                    <StatCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium leading-normal">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
