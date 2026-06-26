"use client";

import React from "react";

const STACK_ROW_1 = [
  "Kubernetes",
  "AWS",
  "Terraform",
  "Flux2",
  "Helm",
  "Prometheus",
  "Grafana",
  "Elasticsearch",
  "Kibana",
  "Python",
  "PostgreSQL",
];

const STACK_ROW_2 = [
  "Azure",
  "Ansible",
  "ArgoCD",
  "Jenkins",
  "Kyverno",
  "Bash",
  "C++",
  "Loki",
  "SonarQube",
  "Neo4j",
  "Secrets Manager",
];

export default function TechStackMarquee() {
  // Duplicate arrays to make seamless loops
  const row1 = [...STACK_ROW_1, ...STACK_ROW_1];
  const row2 = [...STACK_ROW_2, ...STACK_ROW_2];

  return (
    <div className="w-full overflow-hidden py-6 flex flex-col gap-4 select-none">
      {/* Row 1: Left scrolling */}
      <div className="relative flex w-full overflow-x-hidden">
        <div className="flex animate-marquee gap-4 whitespace-nowrap">
          {row1.map((item, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] px-5 py-2.5 text-xs font-mono font-medium text-muted-foreground hover:text-brand-cyan hover:border-brand-cyan/20 transition-colors"
            >
              <span className="text-brand-cyan/80 mr-1.5 font-bold">#</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Right scrolling */}
      <div className="relative flex w-full overflow-x-hidden">
        <div className="flex animate-marquee-reverse gap-4 whitespace-nowrap">
          {row2.map((item, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] px-5 py-2.5 text-xs font-mono font-medium text-muted-foreground hover:text-brand-blue hover:border-brand-blue/20 transition-colors"
            >
              <span className="text-brand-blue/80 mr-1.5 font-bold">#</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
