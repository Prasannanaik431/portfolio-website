"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMPACT_STATS, type ImpactStat } from "@/lib/impact-stats";

function formatValue(value: number, decimals = 0) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

function StatCounter({
  stat,
  duration = 1.2,
}: {
  stat: ImpactStat;
  duration?: number;
}) {
  const [count, setCount] = useState(stat.static ? stat.value : 0);

  useEffect(() => {
    if (stat.static || stat.displayText) return;

    const end = stat.value;
    const decimals = stat.decimals ?? 0;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = () => {
      frame++;
      const progress = frame / totalFrames;
      const current = end * progress;

      if (frame < totalFrames) {
        setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
        requestAnimationFrame(counter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(counter);
  }, [stat, duration]);

  if (stat.displayText) {
    return <span className="tabular-nums tracking-tight">{stat.displayText}</span>;
  }

  const display = stat.static
    ? `${formatValue(stat.value, stat.decimals)}${stat.suffix ?? ""}`
    : `${formatValue(count, stat.decimals)}${stat.suffix ?? ""}`;

  return <span className="tabular-nums tracking-tight">{display}</span>;
}

export default function ImpactStatGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 ${className}`}>
      {IMPACT_STATS.map((stat, idx) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08, duration: 0.35 }}
          className="group relative overflow-hidden rounded-lg border border-black/5 dark:border-white/5 bg-white/[0.02] p-4 shadow-sm transition-colors hover:border-brand-cyan/20 hover:bg-brand-cyan/[0.02]"
        >
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-brand-cyan mb-1">
            <StatCounter stat={stat} />
          </div>
          <div className="text-xs font-semibold text-foreground/90 leading-snug mb-1">
            {stat.label}
          </div>
          {stat.detail && (
            <div className="text-[10px] text-muted-foreground leading-relaxed">
              {stat.detail}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
