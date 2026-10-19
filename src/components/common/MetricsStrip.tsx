"use client";

import React from "react";
import { Trophy, Code, Target, Cpu, CheckCircle2 } from "lucide-react";

interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const MetricsStrip: React.FC = () => {
  const metrics: MetricItem[] = [
    {
      value: "4+",
      label: "Production Systems",
      sublabel: "Full-stack web & AI integrations",
      icon: <Code className="w-4 h-4 text-cyan-400" />,
    },
    {
      value: "3x",
      label: "Hackathon Podiums",
      sublabel: "Smart India & national hackathons",
      icon: <Trophy className="w-4 h-4 text-amber-400" />,
    },
    {
      value: "99.2%",
      label: "Model Accuracy",
      sublabel: "Benchmarked facial feature matcher",
      icon: <Target className="w-4 h-4 text-emerald-400" />,
    },
    {
      value: "<15ms",
      label: "Edge TTFB Latency",
      sublabel: "Fast Next.js 16 SSR & FastAPI async",
      icon: <Cpu className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <div className="w-full my-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0b0c10] to-[#07080a] border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
        >
          {/* Subtle top indicator */}
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 group-hover:border-cyan-500/30 transition-colors">
              {m.icon}
            </div>
            <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">
              [0{idx + 1}]
            </span>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight group-hover:text-cyan-200 transition-colors">
              {m.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold font-sans text-zinc-200 mt-1">
              {m.label}
            </div>
            <div className="text-[11px] font-sans text-zinc-500 mt-0.5 leading-snug">
              {m.sublabel}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsStrip;
