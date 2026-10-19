"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/lib/constants";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer
      id="communicate"
      className="relative w-full py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-[#020202] text-white border-t border-zinc-900 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto z-10 flex flex-col justify-between">
        {/* Top Callout */}
        <div className="flex flex-col gap-6 max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400 uppercase">
            <span className="text-zinc-500">[05]</span>
            <span className="w-8 h-[1px] bg-zinc-800" />
            <span>CONTACT & INQUIRIES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none font-sans">
            Let&apos;s build something exceptional.
          </h2>

          <p className="text-sm md:text-base font-sans text-zinc-400 leading-relaxed">
            Interested in collaborating on modern full-stack web platforms, edge computer vision,
            or autonomous agentic AI systems? Let&apos;s connect.
          </p>
        </div>

        {/* Transmission Center: Email Copy & Social Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-y border-zinc-900 py-12 mb-16">
          {/* Direct Email Action */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 border border-zinc-800 bg-zinc-950/60 rounded-2xl">
            <div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                DIRECT INQUIRY // EMAIL
              </div>
              <div className="text-xl sm:text-2xl font-mono text-cyan-300 font-semibold break-all">
                {PERSONAL_INFO.email}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {/* Interactive Copy Button */}
              <button
                onClick={handleCopyEmail}
                id="btn-copy-email"
                className="flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider uppercase border border-cyan-500/50 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 transition-all duration-200 rounded-xl cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">EMAIL COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>

              {/* Direct Mailto */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                id="btn-mailto"
                className="flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-wider uppercase border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition-all duration-200 rounded-xl cursor-pointer"
              >
                <span>OPEN EMAIL APP</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Social Links Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              PROFESSIONAL NETWORKS & CODE
            </div>

            <div className="flex flex-col gap-3">
              {/* ========================================================== */}
              {/* LINKEDIN BUTTON (INSERT YOUR ACTUAL LINKEDIN PROFILE URL) */}
              {/* ========================================================== */}
              <a
                href={PERSONAL_INFO.socials.linkedin} /* <-- INSERT YOUR LINKEDIN URL IN src/lib/constants.ts */
                target="_blank"
                rel="noopener noreferrer"
                id="link-linkedin"
                className="group flex items-center justify-between p-4 border border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/60 hover:bg-zinc-900/60 transition-all duration-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono text-zinc-200 group-hover:text-white uppercase">
                    LinkedIn Network
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* ========================================================== */}
              {/* GITHUB BUTTON (INSERT YOUR ACTUAL GITHUB PROFILE URL)      */}
              {/* ========================================================== */}
              <a
                href={PERSONAL_INFO.socials.github} /* <-- INSERT YOUR GITHUB URL IN src/lib/constants.ts */
                target="_blank"
                rel="noopener noreferrer"
                id="link-github"
                className="group flex items-center justify-between p-4 border border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/60 hover:bg-zinc-900/60 transition-all duration-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono text-zinc-200 group-hover:text-white uppercase">
                    GitHub Profile
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* ========================================================== */}
              {/* EMAIL BUTTON (INSERT YOUR ACTUAL EMAIL ADDRESS)            */}
              {/* ========================================================== */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`} /* <-- INSERT YOUR EMAIL IN src/lib/constants.ts */
                id="link-email"
                className="group flex items-center justify-between p-4 border border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/60 hover:bg-zinc-900/60 transition-all duration-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono text-zinc-200 group-hover:text-white uppercase">
                    Direct Email
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer Telemetry & Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-zinc-600 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400">{PERSONAL_INFO.university}</span>
            <span>•</span>
            <span>{PERSONAL_INFO.program}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>{PERSONAL_INFO.location}</span>
            <span>•</span>
            <span className="text-cyan-500/80">LATENCY: 0.00ms // STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
