"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, GitBranch, Terminal, Shield, Eye, Code } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage/relative level
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Platform Infrastructure",
    icon: <Cloud className="h-4.5 w-4.5 text-brand-blue" />,
    skills: [
      { name: "Kubernetes Platform", level: 95 },
      { name: "AWS Services", level: 90 },
      { name: "Azure Services", level: 85 },
      { name: "Helm Templating", level: 95 },
    ],
  },
  {
    title: "GitOps & Pipelines",
    icon: <GitBranch className="h-4.5 w-4.5 text-brand-cyan" />,
    skills: [
      { name: "Flux2 GitOps", level: 95 },
      { name: "ArgoCD", level: 80 },
      { name: "Jenkins Pipelines", level: 90 },
      { name: "Groovy Shared Libs", level: 90 },
    ],
  },
  {
    title: "Infrastructure as Code",
    icon: <Terminal className="h-4.5 w-4.5 text-brand-teal" />,
    skills: [
      { name: "Terraform IaC", level: 90 },
      { name: "Ansible Playbooks", level: 85 },
      { name: "Docker Containerization", level: 90 },
      { name: "Bash Automations", level: 95 },
    ],
  },
  {
    title: "Security & DevSecOps",
    icon: <Shield className="h-4.5 w-4.5 text-brand-blue" />,
    skills: [
      { name: "Kyverno Policy-as-Code", level: 90 },
      { name: "Secrets Lifecycle (AWS/Azure)", level: 95 },
      { name: "SonarQube Quality Gates", level: 85 },
      { name: "Dependency Track (SBOM)", level: 85 },
    ],
  },
  {
    title: "Observability Platforms",
    icon: <Eye className="h-4.5 w-4.5 text-brand-cyan" />,
    skills: [
      { name: "Prometheus Monitoring", level: 90 },
      { name: "Grafana Dashboards", level: 90 },
      { name: "Elasticsearch & Kibana", level: 85 },
      { name: "AWS CloudWatch & Loki", level: 80 },
    ],
  },
  {
    title: "Languages & Core",
    icon: <Code className="h-4.5 w-4.5 text-brand-teal" />,
    skills: [
      { name: "Python Scripting", level: 85 },
      { name: "Bash Scripting", level: 95 },
      { name: "C++ (Algorithms)", level: 80 },
      { name: "PostgreSQL & Neo4j", level: 85 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/10 dark:bg-black/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wider uppercase mb-2">
            $ grep -r &quot;expert&quot; /etc/profile.d/skills
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Skills & Expertise
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              className="glass-panel p-6 rounded-lg border border-black/5 dark:border-white/5 text-left"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/5">
                <span className="p-2 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center">
                  {category.icon}
                </span>
                <h4 className="text-base font-bold text-foreground font-mono">{category.title}</h4>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-foreground/90 font-medium">{skill.name}</span>
                      <span className="text-brand-cyan/80">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-1.5 w-full bg-white/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: sIdx * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
