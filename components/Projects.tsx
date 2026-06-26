"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Cpu, Sparkles, CircleDollarSign, Compass, Layers } from "lucide-react";

interface ProjectDetails {
  id: number;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
  icon: React.ReactNode;
  color: "blue" | "cyan" | "teal";
  command: string;
  simulatedOutput: string[];
}

export default function Projects() {
  const [activeSimulation, setActiveSimulation] = useState<number | null>(null);
  const [simOutput, setSimOutput] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const PROJECTS_LIST: ProjectDetails[] = [
    {
      id: 1,
      title: "Environment Management System (EMS)",
      codename: "EMS",
      tagline: "Self-service environment provisioning and scheduling platform",
      description: "A database-driven developer environment portal allowing developers to spin up complete stacks with a single click. Integrated with scheduling templates to automatically start/stop non-prod namespaces and control cloud costs.",
      features: [
        "Self-service environment provisioning",
        "Environment scaling schedules",
        "FinOps cost dashboards",
        "RBAC security control",
        "GitOps Flux2 reconciliations",
      ],
      tags: ["Python", "FastAPI", "React", "PostgreSQL", "Flux2", "Kubernetes"],
      icon: <CircleDollarSign className="h-5 w-5" />,
      color: "blue",
      command: "emsctl deploy --env sandbox-3 --owner dev-team",
      simulatedOutput: [
        "✔ Initializing authorization for owner 'dev-team'",
        "✔ Creating Postgres migration job: ems-db-migrate-sb3",
        "✔ Launching K8s namespace 'sandbox-3'",
        "✔ Synced GitOps source commit: sha1:b8a34d",
        "★ Deploy complete! Endpoints: https://sb3.ems.internal",
      ],
    },
    {
      id: 2,
      title: "Internal Developer Platform (IDP)",
      codename: "Golden Paths",
      tagline: "Enterprise developer self-service portal",
      description: "Built developer self-service templates (Golden Paths) standardizing application scaffolding, Kubernetes configuration, and security baselines. Automates infra provisioning, policy compliance, and canary deployments.",
      features: [
        "Golden Paths scaffolding templates",
        "Infrastructure automation",
        "Secrets & Policy enforcement",
        "Automated Canary/Blue-Green deployments",
        "Platform API endpoints",
      ],
      tags: ["Go", "Next.js", "Terraform", "Kyverno", "ArgoCD", "AWS"],
      icon: <Compass className="h-5 w-5" />,
      color: "cyan",
      command: "idp-cli create-service --template go-microservice --name auth-api",
      simulatedOutput: [
        "✔ Scaffolding repository: github.com/naik-org/auth-api",
        "✔ Triggered Terraform cloud workspace workspace-auth-api",
        "✔ Enforced Kyverno policies: [network-isolation, read-only-root]",
        "✔ Initialized ArgoCD App: auth-api-staging",
        "★ Golden path initialized successfully!",
      ],
    },
    {
      id: 3,
      title: "Reusable Helm Deployment Framework",
      codename: "Helm Framework",
      tagline: "Boilerplate-free Kubernetes deployments at scale",
      description: "Created a central, reusable Helm deployment framework supporting 100+ microservices. Reduced boilerplate YAML template configurations by 90% through dynamic values, environment templating, and automated sidecar injections.",
      features: [
        "Environment templating",
        "Supports 100+ distinct microservices",
        "Dynamic value bindings",
        "Automated secret injection",
        "Zero boilerplate architecture",
      ],
      tags: ["Helm", "YAML", "Kubernetes", "Azure Key Vault", "AWS Secrets"],
      icon: <Layers className="h-5 w-5" />,
      color: "teal",
      command: "helm lint charts/app-template -f charts/app-template/values-prod.yaml",
      simulatedOutput: [
        "==> Linting charts/app-template",
        "[INFO] Chart.yaml: icon is recommended",
        "1 chart(s) linted, 0 chart(s) failed",
        "✔ Helm manifest parsed successfully with 0 errors.",
      ],
    },
    {
      id: 4,
      title: "Enterprise CI/CD Platform",
      codename: "Database CI/CD",
      tagline: "Groovy-driven database pipeline orchestration",
      description: "Designed a centralized database-driven CI/CD platform using Jenkins Shared Libraries and Groovy. Standardized compliance controls, SBOM generation, SonarQube quality gates, and Dependency Track security verification.",
      features: [
        "Jenkins Groovy Shared Libraries",
        "Database-driven workflow pipelines",
        "SBOM generation & security scans",
        "SonarQube Quality Gates",
        "Multi-stage automated releases",
      ],
      tags: ["Jenkins", "Groovy", "SonarQube", "Dependency Track", "Docker"],
      icon: <Cpu className="h-5 w-5" />,
      color: "blue",
      command: "jenkins-run-pipeline --job ems-service-prod --revision v1.2.0",
      simulatedOutput: [
        "► Checking Jenkins controller queues...",
        "✔ Agent online: worker-node-4",
        "✔ SonarQube analysis: PASSED (Quality Gate: OK)",
        "✔ Generated SBOM file: sbom-ems-v1.2.0.json",
        "✔ Dependency Track report uploaded: 0 Critical, 2 Low vulnerabilities",
        "★ Deployment succeeded to target 'prod-saas'.",
      ],
    },
    {
      id: 5,
      title: "Centralized Logging & Observability",
      codename: "Log Analytics",
      tagline: "AI-powered log analysis and anomaly detection",
      description: "Integrated an LLM-powered anomaly detection model into a centralized log analytics platform. Fetches application logs from Elasticsearch and CloudWatch, auto-detecting anomalies and summarizing root causes in real-time.",
      features: [
        "Elasticsearch, Kibana & Prometheus stacks",
        "LLM-powered log anomaly analyzer",
        "Real-time root cause notifications",
        "Custom Grafana bio metrics",
        "FastAPI middleware collector",
      ],
      tags: ["Python", "FastAPI", "Elasticsearch", "Prometheus", "Grafana", "LLMs"],
      icon: <Sparkles className="h-5 w-5" />,
      color: "cyan",
      command: "log-analyzer scan --cluster prod-ems --last 5m",
      simulatedOutput: [
        "► Querying Elasticsearch log indices...",
        "✔ Scanning 14,820 log lines...",
        "⚠️ Detected anomaly: NullPointerException in auth-worker",
        "► Prompting LLM analyzer for root cause...",
        "★ LLM Summary: Redis cache timeout at 18:20:01 led to database lock.",
      ],
    },
    {
      id: 6,
      title: "Kubernetes Cost Optimization",
      codename: "FinOps Console",
      tagline: "Automated cost reduction and scaling dashboard",
      description: "Designed a cost optimization controller monitoring idle resources across GKE clusters. Automatically deletes orphaned load balancers, scales non-prod node pools to zero after-hours, and flags budget overflows.",
      features: [
        "Node pool scheduling to zero",
        "Idle resource cleanup triggers",
        "Cloud cost API bindings",
        "Budget overflow warnings",
        "Auto scale controls",
      ],
      tags: ["Go", "Kubernetes Operator", "AWS CloudWatch", "Prometheus", "Slack API"],
      icon: <ShieldAlert className="h-5 w-5" />,
      color: "teal",
      command: "finops-controller scan-idle --namespace all",
      simulatedOutput: [
        "► Analyzing CPU/Memory utilization matrix...",
        "⚠️ Found idle service: staging-neo4j-replica (0.01% load in 7d)",
        "✔ Scaled deployment 'staging-neo4j-replica' from 2 to 0 replicas",
        "✔ Deleted orphaned disks: [vol-08a9c3]",
        "★ Monthly savings projected: $240.00",
      ],
    },
  ];

  const runSimulation = (proj: ProjectDetails) => {
    if (isSimulating) return;
    setActiveSimulation(proj.id);
    setIsSimulating(true);
    setSimOutput([]);

    let idx = 0;
    const outputLines = [
      `$ ${proj.command}`,
      ...proj.simulatedOutput
    ];

    const timer = setInterval(() => {
      if (idx < outputLines.length) {
        setSimOutput((prev) => [...prev, outputLines[idx]]);
        idx++;
      } else {
        clearInterval(timer);
        setIsSimulating(false);
      }
    }, 450);
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case "blue": return "hover:border-brand-blue/30 dark:hover:border-brand-blue/30";
      case "cyan": return "hover:border-brand-cyan/30 dark:hover:border-brand-cyan/30";
      case "teal": return "hover:border-brand-teal/30 dark:hover:border-brand-teal/30";
      default: return "hover:border-white/20";
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "blue": return "text-brand-blue border-brand-blue/20 bg-brand-blue/5";
      case "cyan": return "text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5";
      case "teal": return "text-brand-teal border-brand-teal/20 bg-brand-teal/5";
      default: return "text-muted-foreground border-white/10";
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wider uppercase mb-2">
            $ ls -l /opt/platform/projects
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            Platform Projects
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-cyan mt-3 rounded-full" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_LIST.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: proj.id * 0.08 }}
              className={`glass-panel p-6 rounded-lg flex flex-col justify-between border border-black/5 dark:border-white/5 transition-all duration-300 ${getBorderColor(proj.color)}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg border ${getBadgeColor(proj.color)}`}>
                    {proj.icon}
                  </div>
                  <button
                    onClick={() => runSimulation(proj)}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
                    title="Simulate deployment cli"
                  >
                    <Terminal className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-foreground mb-1">{proj.title}</h4>
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                    Codename: {proj.codename}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  {proj.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-1.5 mb-6 text-[11px] text-muted-foreground font-mono">
                  {proj.features.slice(0, 3).map((f, fIdx) => (
                    <li key={fIdx} className="flex gap-1.5 items-center">
                      <span className="h-1 w-1 rounded-full bg-brand-cyan" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tags */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-1 mb-1 select-none">
                  {proj.tags.slice(0, 4).map((tag, tIdx) => (
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

        {/* Modal Simulation Terminal */}
        <AnimatePresence>
          {activeSimulation !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-lg glass-panel border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-xs text-left flex flex-col h-[280px]"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-1 text-[10px] text-muted-foreground">simulated-deploy-log</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!isSimulating) {
                        setActiveSimulation(null);
                        setSimOutput([]);
                      }
                    }}
                    disabled={isSimulating}
                    className="text-[10px] text-muted-foreground hover:text-white px-2 py-0.5 rounded hover:bg-white/5 transition-all disabled:opacity-40"
                  >
                    Close
                  </button>
                </div>
                {/* Body */}
                <div className="flex-1 p-4 bg-black/80 overflow-y-auto space-y-1.5 select-text no-scrollbar">
                  {simOutput.map((line, lIdx) => {
                    let textClass = "text-white/80";
                    if (line.startsWith("$")) {
                      textClass = "text-brand-cyan font-bold";
                    } else if (line.includes("✔") || line.startsWith("★")) {
                      textClass = "text-green-400";
                    } else if (line.startsWith("⚠️")) {
                      textClass = "text-yellow-400";
                    }
                    return (
                      <div key={lIdx} className={`${textClass} break-all leading-normal whitespace-pre-wrap`}>
                        {line}
                      </div>
                    );
                  })}
                  {isSimulating && (
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1.5 h-3.5 bg-brand-cyan"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
