"use client";

import React, { useState } from "react";
import { Project } from "@/lib/constants";
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, Activity } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      id={`project-${project.id}`}
      className={`group relative flex flex-col justify-between border transition-all duration-300 p-6 sm:p-8 bg-zinc-950/70 backdrop-blur-sm ${
        project.heroInspiration
          ? "border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.06)]"
          : "border-zinc-800/80 hover:border-zinc-700 hover:shadow-2xl"
      }`}
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>PROJ_{String(index + 1).padStart(2, "0")}</span>
            <span>//</span>
            <span className="text-zinc-400 uppercase">{project.subtitle}</span>
          </div>

          {project.heroInspiration && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-400/50 bg-cyan-950/40 text-[10px] font-mono text-cyan-300 uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>ThunderFace Inspiration</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-200 mb-3 font-sans">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Telemetry Stats If Present */}
        {project.stats && (
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-900 mb-6 font-mono text-xs">
            {project.stats.map((st: { label: string; value: string }) => (
              <div key={st.label} className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {st.label}
                </span>
                <span className="text-cyan-400 font-semibold mt-0.5">
                  {st.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Expandable Architecture Details */}
        {project.architectureDetails && (
          <div className="mb-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors uppercase tracking-wider focus:outline-none"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              <span>
                {expanded ? "Hide Architecture Blueprint" : "Inspect Architecture Blueprint"}
              </span>
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {expanded && (
              <div className="mt-3 p-4 border border-zinc-800 bg-zinc-900/40 rounded-none text-xs font-mono text-zinc-300 space-y-2 animate-in fade-in duration-200">
                {project.architectureDetails.map((detail: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer: Tech Tags & Action Buttons */}
      <div className="pt-4 border-t border-zinc-900/80 mt-auto">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(project.techStack ?? []).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wider text-zinc-400 bg-zinc-900/90 border border-zinc-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons: GitHub Repo & Live Demo */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-github-${project.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider uppercase border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-500 text-zinc-200 transition-all duration-200 group/btn"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-white" />
            <span>GitHub Repo</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`btn-demo-${project.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider uppercase border border-cyan-500/50 bg-cyan-950/30 hover:bg-cyan-900/40 hover:border-cyan-400 text-cyan-300 transition-all duration-200 group/btn shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  );
};
