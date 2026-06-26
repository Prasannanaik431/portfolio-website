"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Medal } from "lucide-react";

interface AchievementDetails {
  id: number;
  title: string;
  subtitle: string;
  meta: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: "blue" | "cyan" | "teal";
}

const ACHIEVEMENTS: AchievementDetails[] = [
  {
    id: 1,
    title: "LeetCode Competitive Coding",
    subtitle: "Contest Rating 1752",
    meta: "Ranked 7th in India (Biweekly Contest 126)",
    description: "Actively participate in algorithmic contests on LeetCode. Achieved a peak rating of 1752, ranking among the top participants in national Biweekly challenges, solving complex graph theory, dynamic programming, and optimization problems.",
    icon: <Trophy className="h-5 w-5" />,
    tags: ["Algorithms", "Data Structures", "Problem Solving", "C++"],
    color: "cyan",
  },
  {
    id: 2,
    title: "Mareana Spot Award",
    subtitle: "Reusable Helm Framework",
    meta: "Awarded by Mareana Software Ltd",
    description: "Recognized for architecting the Reusable Helm Deployment Framework across 35+ environments — eliminating 99% of manual configuration, cutting deploy time by 95%, and standardizing 100+ microservices on a single golden path.",
    icon: <Award className="h-5 w-5" />,
    tags: ["Kubernetes", "Helm", "Infrastructure Velocity", "Team Enablement"],
    color: "blue",
  },
  {
    id: 3,
    title: "Ace Alliance Award",
    subtitle: "IFAAC Early Environment Delivery",
    meta: "Awarded by Mareana Software Ltd",
    description: "Awarded for exceptional delivery speed and resource planning. Automated the deployment configurations and database setups to hand over the IFAAC tenant environments ahead of the projected client schedule.",
    icon: <Medal className="h-5 w-5" />,
    tags: ["CI/CD", "Environment Automation", "Velocity", "Database Automation"],
    color: "teal",
  },
];

export default function Achievements() {
  const getBadgeColor = (color: string) => {
    switch (color) {
      case "blue": return "text-brand-blue border-brand-blue/20 bg-brand-blue/5";
      case "cyan": return "text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5";
      case "teal": return "text-brand-teal border-brand-teal/20 bg-brand-teal/5";
      default: return "text-muted-foreground border-white/10";
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case "blue": return "hover:border-brand-blue/30";
      case "cyan": return "hover:border-brand-cyan/30";
      case "teal": return "hover:border-brand-teal/30";
      default: return "hover:border-white/20";
    }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wide mb-2">
            $ journalctl -u awards.service
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Recognition that matched the work.
          </h3>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Awards for velocity, standardization, and delivery — the outcomes behind the metrics.
          </p>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((ach) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: ach.id * 0.1 }}
              className={`glass-panel p-6 rounded-lg flex flex-col justify-between border border-black/5 dark:border-white/5 transition-all duration-300 ${getBorderColor(ach.color)}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg border ${getBadgeColor(ach.color)}`}>
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-brand-cyan font-bold tracking-wide uppercase select-none">
                      {ach.subtitle}
                    </h4>
                    <p className="text-[10px] font-mono text-muted-foreground">{ach.meta}</p>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-3">{ach.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {ach.description}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-1 select-none">
                  {ach.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-mono text-muted-foreground bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
