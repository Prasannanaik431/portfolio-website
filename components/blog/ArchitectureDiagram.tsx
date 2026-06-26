import React from "react";

interface ArchitectureDiagramProps {
  slug: string;
}

const DIAGRAMS: Record<
  string,
  { title: string; caption: string; viewBox: string; content: React.ReactNode }
> = {
  "kubernetes-deployment-strategies": {
    title: "Deployment strategy traffic patterns",
    caption:
      "How user traffic reaches pod versions during rolling, blue-green, canary, and shadow releases.",
    viewBox: "0 0 820 320",
    content: (
      <>
        <rect x="20" y="40" width="120" height="40" rx="6" fill="#0f172a" stroke="#06b6d4" />
        <text x="80" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">Ingress</text>
        <rect x="200" y="20" width="100" height="36" rx="6" fill="#1e3a5f" stroke="#3b82f6" />
        <text x="250" y="42" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">v1 pods</text>
        <rect x="200" y="70" width="100" height="36" rx="6" fill="#134e4a" stroke="#14b8a6" />
        <text x="250" y="92" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">v2 pods</text>
        <text x="400" y="35" fill="#94a3b8" fontSize="11" fontFamily="monospace">Rolling → gradual shift</text>
        <text x="400" y="85" fill="#94a3b8" fontSize="11" fontFamily="monospace">Blue/Green → instant swap</text>
        <text x="400" y="135" fill="#94a3b8" fontSize="11" fontFamily="monospace">Canary → weighted %</text>
        <text x="400" y="185" fill="#94a3b8" fontSize="11" fontFamily="monospace">Shadow → mirror only</text>
        <rect x="580" y="120" width="200" height="80" rx="8" fill="#111827" stroke="#64748b" strokeDasharray="4 2" />
        <text x="680" y="155" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace">Prometheus / HPA</text>
        <text x="680" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">validates canary health</text>
      </>
    ),
  },
  "building-enterprise-gitops-with-flux2": {
    title: "Flux2 GitOps reconciliation loop",
    caption: "Git remains the source of truth; in-cluster controllers pull and reconcile continuously.",
    viewBox: "0 0 820 300",
    content: (
      <>
        <rect x="30" y="110" width="140" height="60" rx="8" fill="#0f172a" stroke="#06b6d4" />
        <text x="100" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">Git Repo</text>
        <path d="M170 140 H240" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="240" y="90" width="160" height="100" rx="8" fill="#111827" stroke="#3b82f6" />
        <text x="320" y="120" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">Source Controller</text>
        <text x="320" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Kustomize / Helm</text>
        <text x="320" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Image Automation</text>
        <path d="M400 140 H470" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="470" y="100" width="150" height="80" rx="8" fill="#0f172a" stroke="#14b8a6" />
        <text x="545" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">AWS EKS · Azure AKS</text>
        <text x="545" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">35+ environments</text>
        <rect x="650" y="40" width="140" height="50" rx="6" fill="#1e293b" stroke="#64748b" />
        <text x="720" y="70" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Slack alerts</text>
        <path d="M545 100 V70 H650" stroke="#64748b" strokeDasharray="3 3" />
      </>
    ),
  },
  "secrets-management-at-scale-using-aws-secrets-manager": {
    title: "AWS Secrets Manager + ESO sync path",
    caption: "Secrets never land in Git; IRSA-scoped ESO syncs from AWS into Kubernetes at runtime.",
    viewBox: "0 0 820 280",
    content: (
      <>
        <rect x="40" y="100" width="150" height="70" rx="8" fill="#1a2e05" stroke="#f59e0b" />
        <text x="115" y="130" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">AWS Secrets</text>
        <text x="115" y="150" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">Manager</text>
        <path d="M190 135 H270" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="270" y="85" width="160" height="100" rx="8" fill="#111827" stroke="#06b6d4" />
        <text x="350" y="115" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">External Secrets</text>
        <text x="350" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">ClusterSecretStore</text>
        <text x="350" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">ExternalSecret CR</text>
        <path d="M430 135 H510" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="510" y="110" width="120" height="50" rx="6" fill="#0f172a" stroke="#3b82f6" />
        <text x="570" y="140" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">K8s Secret</text>
        <path d="M630 135 H700" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="700" y="100" width="90" height="70" rx="8" fill="#134e4a" stroke="#14b8a6" />
        <text x="745" y="140" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Pod</text>
      </>
    ),
  },
  "kubernetes-secrets-management-aws-azure": {
    title: "Multi-cloud secrets with ESO",
    caption: "One operator pattern for AWS Secrets Manager and Azure Key Vault across hybrid clusters.",
    viewBox: "0 0 820 300",
    content: (
      <>
        <rect x="40" y="40" width="130" height="55" rx="6" fill="#1a2e05" stroke="#f59e0b" />
        <text x="105" y="72" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">AWS SM</text>
        <rect x="40" y="190" width="130" height="55" rx="6" fill="#172554" stroke="#3b82f6" />
        <text x="105" y="222" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">Azure KV</text>
        <rect x="280" y="100" width="180" height="90" rx="8" fill="#111827" stroke="#06b6d4" />
        <text x="370" y="135" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace">External Secrets Operator</text>
        <text x="370" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">IRSA + Workload Identity</text>
        <path d="M170 67 H280" stroke="#64748b" markerEnd="url(#arrow)" />
        <path d="M170 217 H280" stroke="#64748b" markerEnd="url(#arrow)" />
        <path d="M460 145 H560" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="560" y="110" width="200" height="70" rx="8" fill="#0f172a" stroke="#14b8a6" />
        <text x="660" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">EKS + AKS workloads</text>
      </>
    ),
  },
  "ci-cd-pipeline-engineering-jenkins-groovy": {
    title: "Jenkins shared library pipeline flow",
    caption: "One Groovy library drives build, scan, SBOM, and Helm deploy for 100+ microservices.",
    viewBox: "0 0 820 260",
    content: (
      <>
        {["Git Push", "Build", "SonarQube", "SBOM", "Helm Deploy"].map((label, i) => (
          <g key={label}>
            <rect x={40 + i * 150} y="100" width="120" height="50" rx="6" fill="#111827" stroke={i === 4 ? "#14b8a6" : "#3b82f6"} />
            <text x={100 + i * 150} y="130" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">{label}</text>
            {i < 4 && <path d={`M${160 + i * 150} 125 H${190 + i * 150}`} stroke="#64748b" markerEnd="url(#arrow)" />}
          </g>
        ))}
        <rect x="280" y="30" width="260" height="40" rx="6" fill="#0f172a" stroke="#06b6d4" strokeDasharray="4 2" />
        <text x="410" y="55" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">Groovy Shared Library (versioned tag)</text>
      </>
    ),
  },
  "kubernetes-helm-framework-100-microservices": {
    title: "Helm golden-path chart model",
    caption: "One app-template chart parameterised per service; Flux bumps versions fleet-wide.",
    viewBox: "0 0 820 280",
    content: (
      <>
        <rect x="60" y="100" width="160" height="80" rx="8" fill="#111827" stroke="#06b6d4" />
        <text x="140" y="135" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="monospace">app-template</text>
        <text x="140" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Helm chart</text>
        <path d="M220 140 H300" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="300" y="60" width="100" height="40" rx="4" fill="#0f172a" stroke="#3b82f6" />
        <rect x="300" y="120" width="100" height="40" rx="4" fill="#0f172a" stroke="#3b82f6" />
        <rect x="300" y="180" width="100" height="40" rx="4" fill="#0f172a" stroke="#3b82f6" />
        <text x="350" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">svc-a</text>
        <text x="350" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">svc-b</text>
        <text x="350" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">svc-n</text>
        <text x="500" y="145" fill="#64748b" fontSize="20" fontFamily="monospace">...</text>
        <rect x="560" y="100" width="180" height="80" rx="8" fill="#134e4a" stroke="#14b8a6" />
        <text x="650" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Flux HelmRelease</text>
        <text x="650" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">100+ services</text>
      </>
    ),
  },
  "designing-an-internal-developer-platform-on-kubernetes": {
    title: "IDP self-service flow",
    caption: "Developers interact with Backstage; platform API provisions infra via operators and GitOps.",
    viewBox: "0 0 820 300",
    content: (
      <>
        <rect x="40" y="120" width="120" height="60" rx="8" fill="#0f172a" stroke="#06b6d4" />
        <text x="100" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Developer</text>
        <path d="M160 150 H230" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="230" y="100" width="130" height="100" rx="8" fill="#111827" stroke="#3b82f6" />
        <text x="295" y="140" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">Backstage</text>
        <text x="295" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Golden Paths</text>
        <path d="M360 150 H430" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="430" y="110" width="140" height="80" rx="8" fill="#1e293b" stroke="#14b8a6" />
        <text x="500" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Platform API</text>
        <path d="M570 150 H640" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="640" y="90" width="150" height="120" rx="8" fill="#0f172a" stroke="#64748b" />
        <text x="715" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Terraform</text>
        <text x="715" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Flux / ArgoCD</text>
        <text x="715" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">K8s CRDs</text>
      </>
    ),
  },
  "kyverno-policy-as-code": {
    title: "Kyverno admission control path",
    caption: "Policies validate, mutate, and generate resources at the Kubernetes API server.",
    viewBox: "0 0 820 260",
    content: (
      <>
        <rect x="40" y="100" width="120" height="60" rx="8" fill="#0f172a" stroke="#06b6d4" />
        <text x="100" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">kubectl / CI</text>
        <path d="M160 130 H240" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="240" y="80" width="160" height="100" rx="8" fill="#311828" stroke="#a855f7" />
        <text x="320" y="115" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontFamily="monospace">Kyverno</text>
        <text x="320" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Validate · Mutate · Generate</text>
        <path d="M400 130 H480" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="480" y="100" width="140" height="60" rx="8" fill="#134e4a" stroke="#14b8a6" />
        <text x="550" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">API Server</text>
        <rect x="660" y="60" width="130" height="45" rx="6" fill="#1e293b" stroke="#64748b" />
        <text x="725" y="88" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Audit mode</text>
        <rect x="660" y="150" width="130" height="45" rx="6" fill="#1e293b" stroke="#ef4444" />
        <text x="725" y="178" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">Enforce mode</text>
      </>
    ),
  },
  "terraform-infrastructure-as-code-production-patterns": {
    title: "Terraform module and state layers",
    caption: "Primitives compose into environment modules; remote state in S3 with DynamoDB locking.",
    viewBox: "0 0 820 280",
    content: (
      <>
        <rect x="40" y="40" width="140" height="50" rx="6" fill="#111827" stroke="#7c3aed" />
        <text x="110" y="70" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="monospace">Primitives</text>
        <rect x="40" y="110" width="140" height="50" rx="6" fill="#111827" stroke="#3b82f6" />
        <text x="110" y="140" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">Compositions</text>
        <rect x="40" y="180" width="140" height="50" rx="6" fill="#111827" stroke="#06b6d4" />
        <text x="110" y="210" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace">Environments</text>
        <path d="M180 65 H280" stroke="#64748b" markerEnd="url(#arrow)" />
        <path d="M180 135 H280" stroke="#64748b" markerEnd="url(#arrow)" />
        <path d="M180 205 H280" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="280" y="90" width="200" height="100" rx="8" fill="#0f172a" stroke="#14b8a6" />
        <text x="380" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">CI Pipeline</text>
        <text x="380" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">plan → review → apply</text>
        <rect x="540" y="100" width="160" height="80" rx="8" fill="#1a2e05" stroke="#f59e0b" />
        <text x="620" y="135" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">S3 State +</text>
        <text x="620" y="155" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">DynamoDB Lock</text>
      </>
    ),
  },
  "platform-observability-prometheus-grafana-elk": {
    title: "Platform observability stack",
    caption: "Metrics, logs, and LLM-assisted analysis form a single on-call workflow.",
    viewBox: "0 0 820 300",
    content: (
      <>
        <rect x="40" y="120" width="110" height="60" rx="8" fill="#134e4a" stroke="#14b8a6" />
        <text x="95" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Apps</text>
        <path d="M150 130 H220" stroke="#64748b" />
        <path d="M150 150 H220" stroke="#64748b" />
        <path d="M150 170 H220" stroke="#64748b" />
        <rect x="220" y="60" width="120" height="50" rx="6" fill="#111827" stroke="#ef4444" />
        <text x="280" y="90" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="monospace">Prometheus</text>
        <rect x="220" y="130" width="120" height="50" rx="6" fill="#111827" stroke="#f59e0b" />
        <text x="280" y="160" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">Filebeat</text>
        <rect x="220" y="200" width="120" height="50" rx="6" fill="#111827" stroke="#3b82f6" />
        <text x="280" y="230" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">Grafana</text>
        <rect x="400" y="100" width="150" height="100" rx="8" fill="#0f172a" stroke="#06b6d4" />
        <text x="475" y="140" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">Elasticsearch</text>
        <text x="475" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Kibana · Logstash</text>
        <path d="M550 150 H620" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="620" y="110" width="160" height="80" rx="8" fill="#1e293b" stroke="#a855f7" />
        <text x="700" y="145" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontFamily="monospace">LLM Analyzer</text>
        <text x="700" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">root-cause summary</text>
      </>
    ),
  },
  "finops-kubernetes-cost-optimization": {
    title: "FinOps automation loop",
    caption: "Scheduled scale-down, request enforcement, and Kubecost feedback reduce non-prod waste.",
    viewBox: "0 0 820 260",
    content: (
      <>
        <rect x="40" y="100" width="130" height="60" rx="8" fill="#0f172a" stroke="#06b6d4" />
        <text x="105" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">EventBridge</text>
        <path d="M170 130 H250" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="250" y="80" width="160" height="100" rx="8" fill="#111827" stroke="#14b8a6" />
        <text x="330" y="115" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="monospace">Scale Controller</text>
        <text x="330" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">node pools → 0</text>
        <path d="M410 130 H490" stroke="#64748b" markerEnd="url(#arrow)" />
        <rect x="490" y="100" width="130" height="60" rx="8" fill="#134e4a" stroke="#3b82f6" />
        <text x="555" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">EKS / AKS</text>
        <path d="M555 160 V210 H330 V170" stroke="#64748b" strokeDasharray="4 2" markerEnd="url(#arrow)" />
        <rect x="250" y="200" width="160" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" />
        <text x="330" y="228" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">Kubecost + Grafana</text>
      </>
    ),
  },
};

export default function ArchitectureDiagram({ slug }: ArchitectureDiagramProps) {
  const diagram = DIAGRAMS[slug];
  if (!diagram) return null;

  return (
    <figure className="my-8 rounded-lg border border-white/10 bg-black/30 overflow-hidden not-prose">
      <div className="px-3 py-2 border-b border-white/5 bg-black/40 flex justify-between items-center">
        <span className="text-[10px] font-mono text-brand-cyan select-none">architecture diagram</span>
        <span className="text-[10px] font-mono text-muted-foreground">{diagram.title}</span>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={diagram.viewBox}
          className="w-full min-w-[600px] max-h-[320px]"
          role="img"
          aria-label={diagram.title}
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
            </marker>
          </defs>
          {diagram.content}
        </svg>
      </div>
      <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-white/5 leading-relaxed">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
