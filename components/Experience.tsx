"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Clock } from "lucide-react";

interface RoleDetails {
  title: string;
  department: string;
  company: string;
  period: string;
  skills: string[];
  points: string[];
  active?: boolean;
}

const ROLES: RoleDetails[] = [
  {
    title: "Software Engineer",
    department: "Platform Engineering",
    company: "Mareana Software Ltd",
    period: "Apr 2026 – Present",
    active: true,
    skills: [
      "Internal Developer Platform",
      "Self-service Infrastructure",
      "GitOps (Flux2)",
      "Kyverno Policy Engine",
      "AWS Secrets Manager",
      "Azure Key Vault",
      "Prometheus & Grafana",
      "Kibana & Elasticsearch",
      "FinOps & Scheduling",
      "Canary & Blue-Green",
    ],
    points: [
      "Designing self-service Internal Developer Platforms (IDP) enabling developers to spin up application architectures independently.",
      "Enforcing cluster security policies using Kyverno Policy-as-Code to secure multi-tenant GKE/AKS topologies.",
      "Automating secrets rotations and lifecycle triggers using AWS Secrets Manager and Azure Key Vault mappings.",
      "Building FinOps scheduled clusters automation, reducing non-prod resource consumption by scheduling automated cluster scaling.",
      "Implementing platform level observability dashboards using Prometheus, Grafana, Kibana, and Elasticsearch.",
    ],
  },
  {
    title: "Associate Software Engineer",
    department: "DevOps",
    company: "Mareana Software Ltd",
    period: "Oct 2024 – Mar 2026",
    active: false,
    skills: [
      "35+ Environments",
      "Helm Framework",
      "Jenkins Libraries",
      "Terraform",
      "Ansible",
      "PostgreSQL Automation",
      "Neo4j Automation",
      "SonarQube",
      "Slack/Email Alerts",
    ],
    points: [
      "Managed and maintained cloud-infrastructure resources for 35+ non-production and production environments.",
      "Created a reusable Helm deployment framework standardizing releases for 100+ services, reducing boilerplate YAML configurations by 90%.",
      "Architected Groovy-based Jenkins Shared Libraries to modularize pipeline builds, embedding SonarQube quality gates and Dependency Track SBOM checks.",
      "Provisioned infrastructure declaratively using Terraform and orchestrated node deployments using Ansible playbooks.",
      "Built database management automations for PostgreSQL and Neo4j backups, migrations, and cluster scaling tasks.",
    ],
  },
  {
    title: "Problem Setter Intern",
    department: "Engineering",
    company: "Mocha Works (Remote)",
    period: "Apr 2023 – Jan 2024",
    active: false,
    skills: ["Algorithms", "Data Structures", "Problem Design", "Python", "C++", "Test Case Generation"],
    points: [
      "Designed multi-difficulty algorithmic challenges with robust test cases for competitive programming platforms.",
      "Validated problem logic, edge cases, and solution correctness collaborating with engineering teams using Python.",
      "Implemented optimized C++ reference solutions and designed exhaustive test-case edge cases to validate candidate submissions.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black/10 dark:bg-black/10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wider uppercase mb-2">
            $ systemctl status career.service
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Work Experience
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
        </div>

        {/* Linux systemctl output panel header */}
        <div className="mb-10 w-full glass-panel rounded-lg overflow-hidden border border-white/10 dark:border-white/5 font-mono text-xs text-left">
          <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex items-center gap-1.5 select-none">
            <Server className="h-4 w-4 text-brand-cyan" />
            <span>systemctl status career.service</span>
          </div>
          <div className="p-4 bg-black/60 space-y-1 text-white/70 select-text leading-relaxed">
            <p>● career.service - Prasanna Suresh Naik Career Timeline</p>
            <p className="pl-4">Loaded: loaded (/etc/systemd/system/career.service; enabled; vendor preset: enabled)</p>
            <p className="pl-4 flex items-center gap-1.5">
              Active: 
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold">
                active (running)
              </span> 
              since Oct 2024
            </p>
            <p className="pl-4 flex items-center gap-1"><Clock className="h-3 w-3 text-brand-cyan" /> Main PID: 20241026 (platform-engineer)</p>
            <p className="pl-4">Tasks: 35+ running (limit: 512)</p>
            <p className="pl-4">CGroup: /system.slice/career.service</p>
            <p className="pl-8">└─20241026 &quot;node --max-old-space-size=4096 GKE-Cluster-Operator&quot;</p>
          </div>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12">
          {ROLES.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative text-left"
            >
              {/* Timeline Bullet Node */}
              <span className="absolute -left-[35px] md:-left-[51px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border border-white/10 dark:border-white/5">
                {role.active ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-md shadow-green-400/50"
                  />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                )}
              </span>

              {/* Role Box */}
              <div className="glass-panel p-6 rounded-lg relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-300">
                {role.active && (
                  <div className="absolute top-0 right-0 h-[2px] w-24 bg-gradient-to-r from-brand-blue to-brand-cyan" />
                )}
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-foreground flex flex-wrap items-center gap-2">
                      {role.title}
                      <span className="text-xs font-normal font-mono text-brand-cyan px-2 py-0.5 bg-brand-cyan/5 border border-brand-cyan/20 rounded">
                        {role.department}
                      </span>
                    </h4>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">{role.company}</p>
                  </div>
                  <div className="text-xs font-mono text-brand-blue bg-brand-blue/5 border border-brand-blue/20 px-3 py-1 rounded-full self-start md:self-center">
                    {role.period}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  {role.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex gap-2.5 items-start">
                      <span className="mt-1 text-brand-cyan font-bold select-none">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 select-none">
                  {role.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono text-muted-foreground bg-white/[0.02] border border-white/5 hover:border-brand-cyan/20 hover:text-brand-cyan px-2.5 py-1 rounded transition-colors"
                    >
                      {skill}
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
