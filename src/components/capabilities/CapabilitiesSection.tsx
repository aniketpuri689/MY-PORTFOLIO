"use client";

import React, { useState, useMemo } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  CAPABILITIES_DATA,
  CAPABILITY_FILTERS,
  CapabilityCategory,
  CapabilityItem
} from "@/lib/constants";
import {
  Brain,
  Layout,
  Server,
  Bot,
  Sparkles,
  ArrowRight,
  Cpu
} from "lucide-react";

export const CapabilitiesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredCapabilities = useMemo(() => {
    if (selectedCategory === "all") return CAPABILITIES_DATA;
    return CAPABILITIES_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryIcon = (category: CapabilityCategory) => {
    switch (category) {
      case "web-dev":
        return <Layout className="w-4 h-4 text-indigo-400" />;
      case "ai-ml":
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case "agentic-ai":
        return <Bot className="w-4 h-4 text-emerald-400" />;
      case "backend-systems":
        return <Server className="w-4 h-4 text-sky-400" />;
      default:
        return <Cpu className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getCategoryColor = (category: CapabilityCategory) => {
    switch (category) {
      case "web-dev":
        return {
          border: "border-indigo-500/30 hover:border-indigo-400/80",
          glow: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]",
          bar: "from-indigo-500 to-cyan-400",
          badge: "bg-indigo-950/60 border-indigo-800/80 text-indigo-300",
        };
      case "ai-ml":
        return {
          border: "border-cyan-500/30 hover:border-cyan-400/80",
          glow: "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]",
          bar: "from-cyan-500 to-blue-500",
          badge: "bg-cyan-950/60 border-cyan-800/80 text-cyan-300",
        };
      case "agentic-ai":
        return {
          border: "border-emerald-500/30 hover:border-emerald-400/80",
          glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]",
          bar: "from-emerald-500 to-teal-400",
          badge: "bg-emerald-950/60 border-emerald-800/80 text-emerald-300",
        };
      case "backend-systems":
        return {
          border: "border-sky-500/30 hover:border-sky-400/80",
          glow: "group-hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]",
          bar: "from-sky-500 to-cyan-300",
          badge: "bg-sky-950/60 border-sky-800/80 text-sky-300",
        };
      default:
        return {
          border: "border-zinc-800 hover:border-zinc-700",
          glow: "",
          bar: "from-zinc-500 to-zinc-300",
          badge: "bg-zinc-900 border-zinc-800 text-zinc-300",
        };
    }
  };

  return (
    <section
      id="capabilities"
      className="relative w-full py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-[#030303] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-950/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <SectionHeading
          index="02"
          category="TECHNICAL MATRIX"
          title="Capabilities & Tech Stack"
          subtitle="A focused spectrum of modern full-stack web engineering, production machine learning models, and autonomous agentic AI integrations."
        />

        {/* Category Filter Pills (Futuristic Segmented Controller) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CAPABILITY_FILTERS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? CAPABILITIES_DATA.length
                : CAPABILITIES_DATA.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                  isSelected
                    ? "bg-zinc-100 text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-black/10 text-black" : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Capabilities Cards Grid (Punchy, Generalized & Easily Scannable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((item: CapabilityItem) => {
            const colors = getCategoryColor(item.category);

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredSkill(item.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`group relative p-6 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 border ${colors.border} ${colors.glow} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Tactical Top Corner Accents */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-zinc-700 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-zinc-700 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Category & Level Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(item.category)}
                      <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${colors.badge}`}
                    >
                      {item.level}
                    </span>
                  </div>

                  {/* Skill Name & Role */}
                  <h3 className="text-lg font-bold font-sans text-white group-hover:text-cyan-200 transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5 mb-3">
                    {item.role}
                  </div>

                  {/* Concise, Generalized Description (1 sentence for effortless scanning) */}
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Proficiency Meter */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                      <span className="text-zinc-500 uppercase tracking-widest">
                        PROFICIENCY
                      </span>
                      <span className="text-zinc-300 font-semibold">
                        {item.proficiency}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${colors.bar} transition-all duration-700`}
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Tech Stack Chip Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900/80">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-zinc-400 rounded-md group-hover:text-zinc-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End-to-End Architectural Integration Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-zinc-800/90 bg-gradient-to-r from-zinc-950 via-[#0a0f18] to-zinc-950 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                <span>INTEGRATION ARCHITECTURE</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-sans text-white mb-2">
                Full-Stack Web with Embedded Agentic AI
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Seamlessly uniting modern Next.js frontends with autonomous AI agent workflows:
                React interfaces dispatch structured intents, asynchronous FastAPI backends orchestrate multi-step tool calling, and high-performance ML pipelines return instant contextual results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-xs">
              <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-indigo-500/40 text-indigo-300 flex items-center gap-2">
                <Layout className="w-3.5 h-3.5" />
                <span>Next.js 15 App</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 hidden sm:block" />
              <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                <Bot className="w-3.5 h-3.5" />
                <span>Agentic Orchestrator</span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 hidden sm:block" />
              <div className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-cyan-500/40 text-cyan-300 flex items-center gap-2">
                <Brain className="w-3.5 h-3.5" />
                <span>AI/ML Engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
