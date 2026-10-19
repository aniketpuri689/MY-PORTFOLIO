"use client";

import React, { useEffect, useRef } from "react";
import { PERSONAL_INFO } from "@/lib/constants";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroTelemetryProps {
  progressRef: React.RefObject<number>;
  reducedMotion?: boolean;
}

export const HeroTelemetry: React.FC<HeroTelemetryProps> = ({
  progressRef,
  reducedMotion = false
}) => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;

    const updateDOM = () => {
      const p = reducedMotion ? 0.8 : (progressRef.current ?? 0);

      // 1. Initial Scroll Prompt: Visible at start, fades out as user scrolls
      if (scrollIndicatorRef.current) {
        const scrollAlpha = Math.max(0, 1 - p * 4.5);
        scrollIndicatorRef.current.style.opacity = `${scrollAlpha}`;
        scrollIndicatorRef.current.style.pointerEvents = scrollAlpha > 0.1 ? "auto" : "none";
      }

      // 2. Center Hero Reveal Quote & Action Pill
      let textAlpha = 0;
      let textTranslateY = 24;

      if (reducedMotion) {
        textAlpha = 1;
        textTranslateY = 0;
      } else if (p >= 0.38 && p < 0.78) {
        const t = (p - 0.38) / 0.40;
        textAlpha = t * 0.98;
        textTranslateY = (1 - t) * 18;
      } else if (p >= 0.78 && p <= 0.91) {
        textAlpha = 1.0;
        textTranslateY = 0;
      } else if (p > 0.91) {
        const t = (p - 0.91) / 0.09;
        textAlpha = Math.max(0, 1.0 - t * 1.6);
        textTranslateY = -t * 22;
      }

      if (quoteRef.current) {
        quoteRef.current.style.opacity = `${textAlpha}`;
        quoteRef.current.style.transform = `translateY(${textTranslateY}px)`;
      }

      if (actionsRef.current) {
        actionsRef.current.style.opacity = `${textAlpha}`;
        actionsRef.current.style.transform = `translateY(${textTranslateY}px)`;
        actionsRef.current.style.pointerEvents = textAlpha > 0.6 ? "auto" : "none";
      }

      animId = requestAnimationFrame(updateDOM);
    };

    animId = requestAnimationFrame(updateDOM);

    return () => cancelAnimationFrame(animId);
  }, [progressRef, reducedMotion]);

  const handleScrollToIdentity = () => {
    const el = document.getElementById("identity");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Brand (Clean, Minimal, Zero cluttered telemetry text) */}
      <header className="flex justify-between items-center text-sm font-sans tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          <span className="text-white font-bold text-base tracking-wider font-sans">{PERSONAL_INFO.name}</span>
        </div>
        <span className="text-xs text-zinc-500 hidden sm:inline font-mono">GLA UNIVERSITY</span>
      </header>

      {/* Center Hero Reveal Quote & Action Matrix */}
      <div className="flex flex-col items-center justify-center text-center my-auto px-4 max-w-4xl mx-auto">
        <div
          ref={quoteRef}
          className="flex flex-col items-center opacity-0 transition-opacity duration-150"
        >
          {/* Subtle Cyber Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-cyan-500/30 text-[11px] font-mono uppercase tracking-widest text-cyan-300 mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>FULL-STACK ARCHITECT • AI/ML & AGENTIC SYSTEMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white uppercase leading-tight font-sans drop-shadow-[0_0_40px_rgba(0,0,0,0.95)]">
            {PERSONAL_INFO.heroQuote}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-xl font-mono tracking-wide leading-relaxed">
            Crafting high-speed Next.js interfaces, autonomous AI agents, and production machine learning models.
          </p>
        </div>

        {/* Primary Call to Action */}
        <div
          ref={actionsRef}
          className="mt-8 flex justify-center opacity-0 transition-opacity duration-150 pointer-events-none"
        >
          <button
            onClick={handleScrollToIdentity}
            id="hero-btn-explore"
            className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
          >
            <span>Explore Architecture</span>
            <span className="text-zinc-600 font-sans">↓</span>
          </button>
        </div>
      </div>

      {/* Bottom Clean Scroll Instruction */}
      <footer className="flex justify-center items-center pb-4">
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center gap-2 text-zinc-400 transition-opacity duration-300 pointer-events-auto"
        >
          <div className="w-5 h-8 rounded-full border border-zinc-700/80 flex items-start justify-center p-1 bg-zinc-950/40 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase text-zinc-400">
            <span>Scroll to initialize</span>
            <ChevronDown className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroTelemetry;
