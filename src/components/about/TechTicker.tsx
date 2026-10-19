"use client";

import React, { useState } from "react";
import { TECH_STACK, TechItem } from "@/lib/constants";

export const TechTicker: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "ALL TECHNOLOGIES" },
    { id: "ai-ml", label: "AI / ML & VISION" },
    { id: "frontend", label: "FRONTEND & CREATIVE" },
    { id: "backend", label: "BACKEND ARCHITECTURE" },
    { id: "edge-iot", label: "EDGE & HARDWARE" }
  ];

  const filteredTech = selectedCategory === "all"
    ? TECH_STACK
    : TECH_STACK.filter((item: TechItem) => item.category === selectedCategory);

  return (
    <div className="w-full flex flex-col gap-6 my-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-tab-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 uppercase border ${
              selectedCategory === cat.id
                ? "border-cyan-400 text-cyan-300 bg-cyan-950/20 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 bg-zinc-950/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Tech Grid Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {filteredTech.map((item) => (
          <div
            key={item.name}
            className={`group relative p-3 border transition-all duration-300 bg-zinc-950/40 backdrop-blur-sm ${
              item.highlight
                ? "border-zinc-800 hover:border-cyan-500/70 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)]"
                : "border-zinc-900 hover:border-zinc-700"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {item.level}
              </span>
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
              )}
            </div>
            <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Horizontal Ambient Marquee */}
      <div className="relative w-full overflow-hidden py-3 border-y border-zinc-900 mt-4">
        <div className="flex w-max animate-marquee space-x-8 text-xs font-mono tracking-widest text-zinc-600 uppercase select-none">
          {TECH_STACK.concat(TECH_STACK).map((t: TechItem, idx: number) => (
            <div key={`${t.name}-${idx}`} className="flex items-center gap-3">
              <span className="text-cyan-500/60">◆</span>
              <span className="text-zinc-400 hover:text-cyan-400 transition-colors">
                {t.name}
              </span>
              <span className="text-zinc-700">[{t.level}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
