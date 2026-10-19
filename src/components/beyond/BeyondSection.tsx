"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  HACKATHONS,
  CERTIFICATIONS,
  EXTRACURRICULARS,
  HackathonItem,
  CertificationItem,
  ExtracurricularItem
} from "@/lib/constants";
import {
  Trophy,
  Award,
  Users,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight
} from "lucide-react";

type BeyondTab = "all" | "hackathons" | "certifications" | "extracurriculars";

export const BeyondSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BeyondTab>("all");

  return (
    <section
      id="beyond"
      className="relative w-full py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-[#050505] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Background Cyber Ambient Radiance */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <SectionHeading
          index="04"
          category="EXPEDITIONS & CREDENTIALS"
          title="Beyond The Code"
          subtitle="Hackathon victories, verified machine learning credentials, and leadership in the student developer community."
        />

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
              activeTab === "all"
                ? "bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALL ACHIEVEMENTS</span>
          </button>

          <button
            onClick={() => setActiveTab("hackathons")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
              activeTab === "hackathons"
                ? "bg-[#e5a93c] text-black border-[#e5a93c] font-bold shadow-[0_0_20px_rgba(229,169,60,0.3)]"
                : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>HACKATHONS WON ({HACKATHONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("certifications")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
              activeTab === "certifications"
                ? "bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>CERTIFICATIONS ({CERTIFICATIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("extracurriculars")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
              activeTab === "extracurriculars"
                ? "bg-emerald-400 text-black border-emerald-400 font-bold shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>CAMPUS LEADERSHIP ({EXTRACURRICULARS.length})</span>
          </button>
        </div>

        {/* 1. HACKATHONS WON SECTION */}
        {(activeTab === "all" || activeTab === "hackathons") && (
          <div className="mb-16">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#e5a93c] uppercase mb-6">
              <Trophy className="w-4 h-4" />
              <span>COMPETITIVE HACKATHONS & TOURNAMENT VICTORIES</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {HACKATHONS.map((hackathon: HackathonItem) => (
                <div
                  key={hackathon.id}
                  className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 relative group hover:border-[#e5a93c]/80 hover:shadow-[0_0_30px_rgba(229,169,60,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-600/60 text-[#e5a93c] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-3 h-3 text-[#e5a93c]" />
                        <span>{hackathon.award}</span>
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {hackathon.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-sans text-white mb-1 group-hover:text-amber-200 transition-colors">
                      {hackathon.title}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mb-4">
                      ORGANIZER: {hackathon.organizer}
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-6">
                      {hackathon.description}
                    </p>
                  </div>

                  <div>
                    {/* Impact Metric Box */}
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        {hackathon.metricLabel}
                      </span>
                      <span className="text-base font-mono font-bold text-[#e5a93c]">
                        {hackathon.impactMetric}
                      </span>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                      {hackathon.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. CERTIFICATIONS SECTION */}
        {(activeTab === "all" || activeTab === "certifications") && (
          <div className="mb-16">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-6">
              <Award className="w-4 h-4" />
              <span>ACCREDITED MACHINE LEARNING & ENGINEERING CERTIFICATIONS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATIONS.map((cert: CertificationItem) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 relative group hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                        <span className="uppercase tracking-wider">VERIFIED CREDENTIAL</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">{cert.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-sans text-white mb-1 group-hover:text-cyan-200 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mb-5">
                      ISSUING BODY: <span className="text-zinc-200">{cert.issuer}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                      COMPETENCIES ASSESSED
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/60 text-cyan-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. EXTRACURRICULAR ACTIVITIES & LEADERSHIP */}
        {(activeTab === "all" || activeTab === "extracurriculars") && (
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-emerald-400 uppercase mb-6">
              <Users className="w-4 h-4" />
              <span>CAMPUS LEADERSHIP, WORKSHOPS & COMMUNITY IMPACT</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {EXTRACURRICULARS.map((extra: ExtracurricularItem) => (
                <div
                  key={extra.id}
                  className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 relative group hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(52,211,153,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 uppercase tracking-wider font-semibold">
                        {extra.badge}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">{extra.period}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-sans text-white mb-1">
                      {extra.role}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mb-4">
                      {extra.organization}
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-6">
                      {extra.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-900">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2.5">
                      KEY CONTRIBUTIONS
                    </div>
                    <ul className="flex flex-col gap-2">
                      {extra.keyContributions.map((contrib, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-zinc-300 font-sans leading-snug"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{contrib}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeyondSection;
