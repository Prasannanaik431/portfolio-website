"use client";

import React from "react";
import ImpactStatGrid from "./ImpactStatGrid";
import { IMPACT_YAML } from "@/lib/impact-stats";

export default function About() {
  const yamlContent = `name: Prasanna Suresh Naik
roles:
  - Platform Engineer
  - DevOps Engineer
  - Cloud Engineer (AWS · Azure)
  - Site Reliability Engineer (SRE)
experience: 2 year
location: Bengaluru, India
email: prasannanaik431@gmail.com
phone: +91 6362090078
github: github.com/Prasannanaik431
linkedin: linkedin.com/in/prasanna-naik-40124b1ba

education:
  degree: B.E. Computer Science & Engineering
  college: RV College of Engineering, Bengaluru
  year: 2020 – 2024
  cgpa: 8.33 / 10

platform_engineering:
  - Internal Developer Platforms (IDP)
  - Golden Paths & Self-Service Templates
  - Helm Framework (100+ microservices)
  - GitOps Workflows (Flux2 / ArgoCD)

devops:
  - Jenkins Groovy Shared Libraries
  - Multi-stage CI/CD Pipelines
  - SonarQube · Dependency Track (SBOM)
  - Docker · Containerization at Scale

cloud:
  - AWS: EKS, Secrets Manager, Lambda, S3
  - Azure: AKS, Key Vault, ACI, AD
  - Terraform IaC · Ansible Playbooks
  - Multi-cloud Provider Aliasing

sre:
  - SLO / SLA / Error Budget Tracking
  - Prometheus · Grafana · ELK Stack
  - Incident Response & Postmortem Culture
  - FinOps & Cost Optimization (40% savings)

devsecops:
  - Kyverno Policy-as-Code
  - Secrets Lifecycle (AWS + Azure KV)
  - SBOM · Supply Chain Security
  - Zero-trust Cluster Hardening

${IMPACT_YAML}`;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="mb-16 text-left">
          <h2 className="text-xs font-mono text-brand-cyan tracking-wide mb-2">
            $ cat /var/log/about_me.log
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400">
            I build the boring kind of reliability.
          </h3>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            The kind that lets platform teams ship fast, scale across clouds, and sleep through the night.
          </p>
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
                I&apos;m a <strong className="text-foreground font-semibold">Platform · DevOps · Cloud · SRE Engineer</strong> in Bengaluru with <strong className="text-foreground font-semibold">2 year</strong> in production — building Internal Developer Platforms, multi-cloud infrastructure on AWS and Azure, and the GitOps and CI/CD pipelines that keep releases predictable.
              </p>
              <p>
                At Mareana, <strong className="text-foreground font-semibold">35+ environments</strong> across AWS EKS and Azure AKS used to mean copy-pasted YAML and hours-long deploys. I replaced that with a Helm golden path, Kyverno policy-as-code, and shared Jenkins libraries — <strong className="text-foreground font-semibold">95% faster deployments</strong>, <strong className="text-foreground font-semibold">99% less manual configuration</strong>, and <strong className="text-foreground font-semibold">100+ pipelines</strong> teams run without filing a ticket. The platform holds a <strong className="text-foreground font-semibold">99.999% uptime SLO</strong> while FinOps automation cut non-prod spend by 40%.
              </p>
              <p>
                Great platform work is invisible — developers get self-service, security is enforced before code hits the cluster, and the on-call engineer gets context before the dashboard loads.
              </p>
            </div>

            <ImpactStatGrid className="pt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
