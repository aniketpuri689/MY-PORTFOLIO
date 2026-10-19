"use client";

import React from "react";
import { FeaturedProject } from "@/data/projects";
import { WheatSpectralVisual } from "./visuals/WheatSpectralVisual";
import { FaceRecognitionVisual } from "./visuals/FaceRecognitionVisual";
import { AiForgeVisual } from "./visuals/AiForgeVisual";
import { MovieRecVisual } from "./visuals/MovieRecVisual";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight } from "lucide-react";

interface SplitProjectCardProps {
  project: FeaturedProject;
  index: number;
}

export const SplitProjectCard: React.FC<SplitProjectCardProps> = ({ project, index }) => {
  // Render project-specific animation visual on the right side
  const renderVisual = () => {
    switch (project.id) {
      case "wheatspectral-ai":
        return <WheatSpectralVisual />;
      case "edge-ai-face":
        return <FaceRecognitionVisual videoSrc={project.videoSrc} />;
      case "ai-forge":
        return <AiForgeVisual />;
      case "movie-recommendation":
        return <MovieRecVisual />;
      default:
        return <FaceRecognitionVisual videoSrc={project.videoSrc} />;
    }
  };

  const getCategoryColor = (cat: string) => {
    if (cat.includes("Voice") || cat.includes("Collaborative")) {
      return "text-emerald-400 border-emerald-500/30 bg-emerald-950/40";
    }
    if (cat.includes("Vision") || cat.includes("Hardware")) {
      return "text-cyan-400 border-cyan-500/30 bg-cyan-950/40";
    }
    if (cat.includes("Full-Stack")) {
      return "text-indigo-300 border-indigo-500/30 bg-indigo-950/40";
    }
    return "text-sky-300 border-sky-500/30 bg-sky-950/40";
  };

  return (
    <article
      id={`project-${project.id}`}
      className="group relative w-full rounded-2xl md:rounded-3xl border border-zinc-800/80 bg-[#0c0d0e] overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.08)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px]">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: PROJECT DETAILS & ACTIONS                                    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#0b0c0e]">
          <div>
            {/* Category Pill & Index */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-zinc-500">
                0{index + 1}
              </span>
              <span className="text-zinc-700">//</span>
              <span
                className={`text-[10px] sm:text-xs font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border ${getCategoryColor(
                  project.category
                )}`}
              >
                {project.category}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-5 font-sans leading-tight group-hover:text-cyan-100 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Distinct Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 pt-2 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 2 Primary Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-zinc-800/80">
            {/* GitHub Repo Button */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`btn-source-${project.id}`}
              className="flex items-center gap-2 rounded-xl bg-white text-black font-semibold text-sm px-6 py-3 hover:bg-zinc-200 transition-all font-sans shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>

            {/* Live Demo Button */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`btn-launch-${project.id}`}
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 text-white font-semibold text-sm px-6 py-3 hover:bg-zinc-800 hover:border-cyan-400/60 transition-all font-sans"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: DEDICATED ANIMATIONS FOR THE PROJECT                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-zinc-800/80 bg-[#07080a] flex items-center justify-center overflow-hidden">
          {renderVisual()}
        </div>
      </div>
    </article>
  );
};

export default SplitProjectCard;
