"use client";

import React from "react";
import { motion } from "framer-motion";

export default function KubernetesClusterVisual() {
  return (
    <div className="relative w-full h-[360px] flex items-center justify-center bg-black/20 rounded-lg border border-white/5 overflow-hidden glass-panel">
      {/* Visual Title */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">
        <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
        Cluster Visualization: k8s-prod-cluster
      </div>

      <svg
        viewBox="0 0 500 350"
        className="w-full h-full max-w-[460px] p-4 text-foreground"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>

        {/* --- Paths (Data Pipelines) --- */}
        {/* Ingress to Router */}
        <path d="M 250 35 L 250 85" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Router to Nodes */}
        <path d="M 250 100 L 95 180" id="path-node1" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <path d="M 250 100 L 250 180" id="path-node2" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <path d="M 250 100 L 405 180" id="path-node3" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

        {/* --- Animated Packets (Gliding Particles) --- */}
        {/* Particle 1 (Ingress -> Service Router) */}
        <motion.circle
          r="4"
          fill="#06b6d4"
          filter="url(#glow-cyan)"
          animate={{
            cy: [35, 85],
            cx: [250, 250],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Particle 2 (Router -> Node 1) */}
        <motion.circle
          r="3"
          fill="#3b82f6"
          filter="url(#glow-blue)"
          animate={{
            cx: [250, 95],
            cy: [100, 180],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
        />

        {/* Particle 3 (Router -> Node 2) */}
        <motion.circle
          r="3"
          fill="#06b6d4"
          filter="url(#glow-cyan)"
          animate={{
            cx: [250, 250],
            cy: [100, 180],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1.2,
            ease: "easeInOut",
          }}
        />

        {/* Particle 4 (Router -> Node 3) */}
        <motion.circle
          r="3"
          fill="#14b8a6"
          filter="url(#glow-cyan)"
          animate={{
            cx: [250, 405],
            cy: [100, 180],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: 0.1,
            ease: "easeInOut",
          }}
        />

        {/* --- INGRESS GATEWAY (Client Entrance) --- */}
        <g transform="translate(210, 10)">
          <rect width="80" height="25" rx="6" fill="#111827" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <text x="40" y="16" fill="rgba(255,255,255,0.8)" fontSize="8" fontFamily="monospace" textAnchor="middle">
            ingress / loadbalancer
          </text>
        </g>

        {/* --- SERVICE ROUTER (Kubernetes Service proxy) --- */}
        <g transform="translate(200, 85)">
          <rect width="100" height="30" rx="8" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="2" filter="url(#glow-blue)" />
          <text x="50" y="19" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            service-mesh
          </text>
        </g>

        {/* --- NODE 1 (GKE-Node-Pool-1) --- */}
        <g transform="translate(45, 180)">
          {/* Node base frame */}
          <rect width="100" height="110" rx="10" fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <text x="50" y="18" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">
            node-01 (api)
          </text>

          {/* Pods inside Node 1 */}
          {/* Pod 1 */}
          <motion.rect
            x="15" y="30" width="30" height="30" rx="6"
            fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="30" cy="45" r="3" fill="#06b6d4" />
          <text x="30" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">api-a</text>

          {/* Pod 2 */}
          <motion.rect
            x="55" y="30" width="30" height="30" rx="6"
            fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          />
          <circle cx="70" cy="45" r="3" fill="#06b6d4" />
          <text x="70" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">api-b</text>

          {/* Pod 3 (Worker) */}
          <motion.rect
            x="35" y="70" width="30" height="30" rx="6"
            fill="#1d2d2a" stroke="#14b8a6" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="50" cy="85" r="3" fill="#14b8a6" />
          <text x="50" y="95" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">db-proxy</text>
        </g>

        {/* --- NODE 2 (GKE-Node-Pool-2) --- */}
        <g transform="translate(200, 180)">
          {/* Node base frame */}
          <rect width="100" height="110" rx="10" fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <text x="50" y="18" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">
            node-02 (workers)
          </text>

          {/* Pods inside Node 2 */}
          {/* Pod 1 */}
          <motion.rect
            x="15" y="30" width="30" height="30" rx="6"
            fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
          />
          <circle cx="30" cy="45" r="3" fill="#3b82f6" />
          <text x="30" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">wrk-1</text>

          {/* Pod 2 */}
          <motion.rect
            x="55" y="30" width="30" height="30" rx="6"
            fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
          />
          <circle cx="70" cy="45" r="3" fill="#3b82f6" />
          <text x="70" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">wrk-2</text>

          {/* Pod 3 */}
          <motion.rect
            x="35" y="70" width="30" height="30" rx="6"
            fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
          />
          <circle cx="50" cy="85" r="3" fill="#3b82f6" />
          <text x="50" y="95" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">cache</text>
        </g>

        {/* --- NODE 3 (GKE-Node-Pool-3) --- */}
        <g transform="translate(355, 180)">
          {/* Node base frame */}
          <rect width="100" height="110" rx="10" fill="#111827" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <text x="50" y="18" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace" textAnchor="middle">
            node-03 (data)
          </text>

          {/* Pods inside Node 3 */}
          {/* Pod 1 */}
          <motion.rect
            x="15" y="30" width="30" height="30" rx="6"
            fill="#2c1a1a" stroke="#ef4444" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="30" cy="45" r="3" fill="#ef4444" />
          <text x="30" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">postgres</text>

          {/* Pod 2 */}
          <motion.rect
            x="55" y="30" width="30" height="30" rx="6"
            fill="#1e1829" stroke="#a855f7" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
          />
          <circle cx="70" cy="45" r="3" fill="#a855f7" />
          <text x="70" y="55" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">neo4j</text>

          {/* Pod 3 */}
          <motion.rect
            x="35" y="70" width="30" height="30" rx="6"
            fill="#1d2d2a" stroke="#14b8a6" strokeWidth="1.5"
            animate={{ strokeWidth: [1, 2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
          />
          <circle cx="50" cy="85" r="3" fill="#14b8a6" />
          <text x="50" y="95" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" textAnchor="middle">elk-log</text>
        </g>
      </svg>
    </div>
  );
}
