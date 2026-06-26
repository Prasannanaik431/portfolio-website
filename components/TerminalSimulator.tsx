"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, RefreshCw } from "lucide-react";

import { KUBERNETES_VERSION } from "@/lib/platform-versions";

interface CommandTab {
  id: string;
  label: string;
  command: string;
  output: string[];
}

const COMMAND_TABS: CommandTab[] = [
  {
    id: "neofetch",
    label: "neofetch",
    command: "neofetch --user prasanna",
    output: [
      "   .---.        prasanna@naik-platform",
      "  /     \\       ---------------------",
      "  \\  o o /      OS: Ubuntu 22.04.4 LTS x86_64",
      "   \\  - /       Kernel: Linux 5.15.0-101-generic",
      "    `---'       Uptime: 247 days, 6 hours, 12 mins",
      "                Shell: zsh 5.8.1",
      `                Platform: Kubernetes v${KUBERNETES_VERSION} (AWS EKS)`,
      "                GitOps: Flux2 & ArgoCD",
      "                Infrastructure: AWS & Azure",
      "                CPU: AMD EPYC (64 cores) @ 2.50GHz",
      "                Memory: 16.4 GiB / 256 GiB (6%)",
      "                Environments: 35+ Production (EKS/AKS)",
      "                CI/CD: 100+ Pipelines · 95% Faster Deploys",
      "                Automation: 99% Manual Config Eliminated",
      "                Uptime SLO: 99.999% · Platform Engineer",
      "                Security: Kyverno Policy-as-Code",
      "                Observability: Prometheus & Grafana",
    ],
  },
  {
    id: "kubernetes",
    label: "kubectl",
    command: "kubectl get pods -n prod-ems -o wide",
    output: [
      "NAME                           READY   STATUS    RESTARTS   AGE    IP            NODE",
      "ems-api-6f4b9cdb48-abcde       1/1     Running   0          12d    10.244.2.14   eks-prod-pool-1",
      "ems-api-6f4b9cdb48-fghij       1/1     Running   0          12d    10.244.1.89   eks-prod-pool-2",
      "ems-worker-7d8e9f0a1b-cdefg    1/1     Running   0          3d4h   10.244.2.40   eks-prod-pool-1",
      "db-postgre-0                   1/1     Running   0          45d    10.244.0.12   eks-prod-pool-3",
      "cache-redis-78bfb9cd4e-xyz78   1/1     Running   0          45d    10.244.1.5    eks-prod-pool-2",
    ],
  },
  {
    id: "helm",
    label: "helm",
    command: "helm upgrade --install ems-service ./charts/ems-service --namespace prod-ems --values values-prod.yaml",
    output: [
      "Release \"ems-service\" has been upgraded. Happy Helming!",
      "NAME: ems-service",
      "LAST DEPLOYED: Fri Jun 26 18:20:00 2026",
      "NAMESPACE: prod-ems",
      "STATUS: deployed",
      "REVISION: 42",
      "TEST SUITE: None",
      "NOTES:",
      "1. Get the application URL by running these commands:",
      "   export SERVICE_IP=$(kubectl get svc --namespace prod-ems ems-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')",
      "   echo http://$SERVICE_IP:8080",
    ],
  },
  {
    id: "flux",
    label: "flux",
    command: "flux reconcile kustomization ems-app --with-source",
    output: [
      "► reconciling source GitRepository/flux-system/ems-infra...",
      "✔ GitRepository reconciled, revision: main@sha1:e83d8e9f",
      "► reconciling Kustomization/prod-ems/ems-app...",
      "✔ Kustomization reconciled in 4.823s",
      "✔ applied 14 resources",
      "★ Reconciliation completed successfully: 2026-06-26 18:20:12",
    ],
  },
  {
    id: "terraform",
    label: "terraform",
    command: "terraform apply -auto-approve",
    output: [
      "google_container_cluster.primary: Refreshing state... [id=projects/naik-prod/locations/us-central1/clusters/ems-cluster]",
      "google_container_node_pool.primary_nodes: Refreshing state...",
      "",
      "Terraform will perform the following actions:",
      "  # google_container_node_pool.primary_nodes will be updated in-place",
      "  ~ node_config {",
      "      ~ machine_type = \"e2-medium\" -> \"e2-standard-4\"",
      "    }",
      "",
      "Plan: 0 to add, 1 to change, 0 to destroy.",
      "google_container_node_pool.primary_nodes: Modifying... [id=projects/naik-prod/locations/us-central1/clusters/ems-cluster/nodePools/primary-nodes]",
      "google_container_node_pool.primary_nodes: Modifications complete after 45s",
      "",
      "Apply complete! Resources: 0 added, 1 changed, 0 destroyed.",
    ],
  },
  {
    id: "ansible",
    label: "ansible",
    command: "ansible-playbook -i inventory/prod configure-nodes.yml --limit k8s_workers",
    output: [
      "PLAY [Configure Kubernetes Worker Nodes] ****************************************",
      "TASK [Gathering Facts] **********************************************************",
      "ok: [k8s-worker-1.naik.internal]",
      "ok: [k8s-worker-2.naik.internal]",
      "TASK [Install containerd and system runtimes] ***********************************",
      "ok: [k8s-worker-1.naik.internal]",
      "ok: [k8s-worker-2.naik.internal]",
      "TASK [Apply Sysctl networking configuration] ***********************************",
      "changed: [k8s-worker-1.naik.internal]",
      "changed: [k8s-worker-2.naik.internal]",
      "PLAY RECAP **********************************************************************",
      "k8s-worker-1.naik.internal : ok=6    changed=1    unreachable=0    failed=0",
      "k8s-worker-2.naik.internal : ok=6    changed=1    unreachable=0    failed=0",
    ],
  },
  {
    id: "docker",
    label: "docker",
    command: "docker buildx build --platform linux/amd64,linux/arm64 -t 123456789012.dkr.ecr.us-east-1.amazonaws.com/naik-prod/ems-service:v1.2.0 --push .",
    output: [
      "[internal] load build definition from Dockerfile",
      "[internal] load .dockerignore",
      "[internal] load metadata for docker.io/library/golang:1.22-alpine",
      "[auth] sharing credentials for ECR",
      "[build 1/4] FROM docker.io/library/golang:1.22-alpine",
      "[build 2/4] WORKDIR /app",
      "[build 3/4] COPY go.mod go.sum ./ && RUN go mod download",
      "[build 4/4] COPY . . && RUN CGO_ENABLED=0 GOOS=linux go build -o main .",
      "exporting to image:",
      "✔ exporting layers",
      "✔ writing image sha256:7f8047970d4b1a45749f7831d1d8a8b1a7d3c01c0c6c",
      "✔ naming to 123456789012.dkr.ecr.us-east-1.amazonaws.com/naik-prod/ems-service:v1.2.0",
      "✔ pushing layers to 123456789012.dkr.ecr.us-east-1.amazonaws.com/naik-prod/ems-service:v1.2.0",
    ],
  },
];

export default function TerminalSimulator() {
  const [activeTab, setActiveTab] = useState<string>("neofetch");
  const [typedCommand, setTypedCommand] = useState<string>("");
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [autoProgress, setAutoProgress] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoRef  = useRef<NodeJS.Timeout | null>(null);
  const autoProgRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_INTERVAL = 10000; // 10 seconds

  const currentTab = COMMAND_TABS.find((t) => t.id === activeTab) || COMMAND_TABS[0];

  // Reset the 10-second auto-rotate timer
  const resetAutoRotate = () => {
    setAutoProgress(0);
    if (autoRef.current) clearTimeout(autoRef.current);
    if (autoProgRef.current) clearInterval(autoProgRef.current);

    // Progress bar tick every 100ms
    let elapsed = 0;
    autoProgRef.current = setInterval(() => {
      elapsed += 100;
      setAutoProgress(Math.min((elapsed / AUTO_INTERVAL) * 100, 100));
    }, 100);

    // Switch tab after AUTO_INTERVAL
    autoRef.current = setTimeout(() => {
      setActiveTab(prev => {
        const idx = COMMAND_TABS.findIndex(t => t.id === prev);
        return COMMAND_TABS[(idx + 1) % COMMAND_TABS.length].id;
      });
    }, AUTO_INTERVAL);
  };

  const runSimulation = (tab: CommandTab) => {
    setIsTyping(true);
    setTypedCommand("");
    setShowOutput(false);

    if (timerRef.current) clearInterval(timerRef.current);

    let charIdx = 0;
    const commandText = tab.command;

    timerRef.current = setInterval(() => {
      if (charIdx < commandText.length) {
        setTypedCommand((prev) => prev + commandText.charAt(charIdx));
        charIdx++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTyping(false);
        // Show output after a slight delay
        setTimeout(() => {
          setShowOutput(true);
        }, 300);
      }
    }, 30);
  };

  useEffect(() => {
    runSimulation(currentTab);
    resetAutoRotate();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoRef.current) clearTimeout(autoRef.current);
      if (autoProgRef.current) clearInterval(autoProgRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full glass-panel rounded-lg shadow-2xl border border-white/10 overflow-hidden font-mono text-xs text-left h-[360px] flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">
            platform-ops-shell
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => runSimulation(currentTab)}
            disabled={isTyping}
            className="p-1 rounded text-muted-foreground hover:text-white hover:bg-white/5 transition-colors disabled:opacity-40"
            title="Re-run command"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
            title="Copy command"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 bg-black/20 overflow-x-auto no-scrollbar">
        {COMMAND_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (!isTyping) { setActiveTab(tab.id); }
            }}
            disabled={isTyping}
            className={`px-4 py-2 border-r border-white/5 transition-all relative min-w-[70px] text-center ${
              activeTab === tab.id
                ? "bg-white/5 text-brand-cyan font-bold"
                : "text-muted-foreground hover:text-foreground disabled:opacity-50"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan"
              />
            )}
          </button>
        ))}
      </div>

      {/* Auto-rotate progress bar */}
      <div className="h-px w-full bg-white/0">
        <div
          className="h-full bg-brand-cyan/30 transition-none"
          style={{ width: `${autoProgress}%` }}
        />
      </div>

      {/* Console Area */}
      <div className="flex-1 p-4 bg-black/50 overflow-y-auto no-scrollbar relative">
        <div className="flex items-center text-muted-foreground mb-1 select-none">
          <span className="text-brand-teal font-semibold">prasanna@naik-platform</span>
          <span className="mx-1 text-white/50">:</span>
          <span className="text-brand-blue">~/infra</span>
          <span className="ml-1.5 text-brand-cyan font-bold">$</span>
          <span className="ml-2 text-foreground break-all">{typedCommand}</span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-4 bg-brand-cyan ml-0.5"
            />
          )}
        </div>

        {/* Command Output */}
        <AnimatePresence>
          {showOutput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-1 select-text"
            >
              {currentTab.output.map((line, idx) => {
                if (activeTab === "neofetch") {
                  const logoPart = line.substring(0, 16);
                  const infoPart = line.substring(16);
                  
                  if (infoPart.includes(":") && !infoPart.includes("://")) {
                    const colonIdx = infoPart.indexOf(":");
                    const label = infoPart.substring(0, colonIdx + 1);
                    const value = infoPart.substring(colonIdx + 1);
                    return (
                      <div key={idx} className="break-all leading-relaxed whitespace-pre-wrap flex items-center font-mono">
                        <span className="text-brand-teal/80 font-bold inline-block w-16 select-none">{logoPart}</span>
                        <span className="text-brand-cyan/95 font-semibold select-none">{label}</span>
                        <span className="text-white/90 ml-1.5">{value}</span>
                      </div>
                    );
                  }
                  
                  const isTitle = infoPart.includes("@");
                  return (
                    <div key={idx} className="break-all leading-relaxed whitespace-pre-wrap flex items-center font-mono">
                      <span className="text-brand-teal/80 font-bold inline-block w-16 select-none">{logoPart}</span>
                      <span className={isTitle ? "text-brand-cyan font-bold" : "text-white/40"}>
                        {infoPart}
                      </span>
                    </div>
                  );
                }

                let colorClass = "text-white/80 dark:text-white/80";
                
                // Customize coloring for logs to make it look premium and real
                if (line.includes("READY") || line.includes("NAME") || line.includes("TASK [")) {
                  colorClass = "text-brand-blue/90 font-semibold";
                } else if (line.startsWith("✔") || line.includes("Success") || line.includes("complete") || line.includes("reconciled") || line.includes("upgraded")) {
                  colorClass = "text-green-400/90";
                } else if (line.includes("► reconciling") || line.startsWith("Plan:")) {
                  colorClass = "text-brand-cyan/90";
                } else if (line.includes("changed:") || line.includes("changed=1")) {
                  colorClass = "text-yellow-400/90";
                } else if (line.includes("★ Reconciliation completed")) {
                  colorClass = "text-green-400 font-bold";
                } else if (line.startsWith("PLAY") || line.startsWith("Release")) {
                  colorClass = "text-brand-teal font-semibold";
                } else if (line.startsWith("ok:")) {
                  colorClass = "text-green-500/80";
                }

                return (
                  <div key={idx} className={`${colorClass} break-all leading-relaxed whitespace-pre-wrap`}>
                    {line}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
