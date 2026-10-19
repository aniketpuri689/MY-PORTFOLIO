"use client";

import React from "react";
import { SplitProjectCard } from "./SplitProjectCard";
import { FEATURED_PROJECTS } from "@/data/projects";

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="laboratory"
      className="relative w-full py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-[#030303] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-950/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header Matching User's Reference Screenshot */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
            <span className="text-zinc-500">[03]</span>
            <span className="w-8 h-[1px] bg-zinc-800" />
            <span className="text-[#e5a93c]">LIVE EXPERIMENTS & PROJECTS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-2 font-sans">
            The Laboratory
          </h2>
        </div>

        {/* Stack of Split Project Cards */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {FEATURED_PROJECTS.map((project, index) => (
            <SplitProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
