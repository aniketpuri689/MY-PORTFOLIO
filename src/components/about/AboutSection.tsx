"use client";

import React from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PERSONAL_INFO, PHILOSOPHY_PILLARS } from "@/lib/constants";
import { Brain, Layers, GraduationCap, User } from "lucide-react";
import { ArchitecturePlayground } from "./ArchitecturePlayground";
import { LiveStatusBar } from "@/components/ui/LiveStatusBar";
import { MetricsStrip } from "@/components/common/MetricsStrip";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="identity"
      className="relative w-full py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-[#050505] text-white border-t border-zinc-900 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto z-10">
        <SectionHeading
          index="01"
          category="IDENTITY & BACKGROUND"
          title="Engineering & Intelligence"
          subtitle="Specializing in modern Full-Stack Web Development, Machine Learning, and Agentic AI Systems, backed by production-first engineering to build responsive, intelligent platforms."
        />

        {/* Live Status Bar: Indian Standard Time, Availability & Quick Copy */}
        <div className="mb-10">
          <LiveStatusBar />
        </div>

        {/* Asymmetric Core Bio & University Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Manifesto & Story */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <div className="p-6 sm:p-8 border border-zinc-800/90 bg-zinc-950/70 backdrop-blur-sm relative rounded-2xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
                <User className="w-4 h-4" />
                <span>ABOUT ME</span>
              </div>
              <p className="text-zinc-100 mb-4 text-base sm:text-lg font-sans font-medium leading-relaxed">
                {PERSONAL_INFO.bio[0]}
              </p>
              <p className="text-zinc-400 mb-4 font-sans leading-relaxed">
                {PERSONAL_INFO.bio[1]}
              </p>
              <p className="text-zinc-400 font-sans leading-relaxed">
                {PERSONAL_INFO.bio[2]}
              </p>
            </div>

            {/* Core Pillars: ML/Vision + Full Stack + Edge AI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="p-5 border border-zinc-900/90 bg-zinc-950/50 hover:border-zinc-700 transition-colors rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs text-cyan-400 font-bold mb-1.5 font-mono">
                      {pillar.index}
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 font-sans">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: GLA University Academic Card & Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 border border-cyan-500/30 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 relative overflow-hidden group rounded-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC FOUNDATION</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 rounded">
                  {PERSONAL_INFO.year}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest">
                    INSTITUTION
                  </div>
                  <div className="text-lg font-bold text-white font-sans mt-0.5">
                    {PERSONAL_INFO.university}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest">
                    SPECIALIZATION
                  </div>
                  <div className="text-sm font-medium text-cyan-200 mt-0.5 font-sans">
                    {PERSONAL_INFO.program}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                  <div>
                    <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest">
                      LOCATION
                    </div>
                    <div className="text-xs text-zinc-300 mt-0.5 font-sans">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500 font-mono uppercase tracking-widest">
                      CORE FOCUS
                    </div>
                    <div className="text-xs text-zinc-300 mt-0.5 font-sans">
                      Full-Stack Web & Agentic AI
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">STATUS:</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  OPEN TO FULL-STACK & AI BUILDS
                </span>
              </div>
            </div>

            {/* Quick Domain Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-zinc-900 bg-zinc-950/40 rounded-xl">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono mb-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CORE CRAFT</span>
                </div>
                <div className="text-base font-bold font-sans text-white">
                  Full-Stack Web
                </div>
                <div className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Next.js • React • TypeScript
                </div>
              </div>

              <div className="p-4 border border-zinc-900 bg-zinc-950/40 rounded-xl">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono mb-1">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>INTELLIGENCE</span>
                </div>
                <div className="text-base font-bold font-sans text-white">
                  AI/ML & Agentic AI
                </div>
                <div className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Autonomous Agents • ML Models
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grounded Proof-of-Work Metrics Strip */}
        <MetricsStrip />

        {/* Interactive Full-Stack Architecture Simulator */}
        <ArchitecturePlayground />
      </div>
    </section>
  );
};

export default AboutSection;
