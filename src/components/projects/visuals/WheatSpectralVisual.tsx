"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, Volume2, Activity, Sprout, Sparkles } from "lucide-react";

export const WheatSpectralVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const voiceQueries = [
    { query: '"What is the crop health status in Sector 4?"', response: "NDVI: 0.82 — Healthy chlorophyll index detected." },
    { query: '"Check spectral reflectance at 780nm"', response: "Near-Infrared reflectance normal; zero water stress." },
    { query: '"Predict harvest yield based on hyperspectral scan"', response: "Yield forecast: +14.2% above regional baseline." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQueryIndex((prev) => (prev + 1) % voiceQueries.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [voiceQueries.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Hyperspectral Scanning Grid (False-color NIR heatmap)
      const cols = 14;
      const rows = 9;
      const cellW = width / cols;
      const cellH = (height * 0.55) / rows;
      const scanY = ((Math.sin(t * 0.8) + 1) / 2) * (rows * cellH);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW;
          const y = 35 + r * cellH;

          // Compute pseudo-NDVI vegetation value
          const distFromCenter = Math.hypot(c - cols / 2, r - rows / 2);
          const val = 0.5 + 0.45 * Math.sin(c * 0.4 + r * 0.3 + t * 0.5) - distFromCenter * 0.03;
          const clamped = Math.max(0.1, Math.min(0.95, val));

          // False-color gradient: dark green to electric emerald to cyan
          const g = Math.floor(clamped * 220);
          const b = Math.floor(clamped * 140);
          const rCol = Math.floor((1 - clamped) * 80);

          ctx.fillStyle = `rgba(${rCol}, ${g}, ${b}, 0.28)`;
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);

          // Grid cell border
          ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x, y, cellW, cellH);
        }
      }

      // 2. Glowing Laser Scan Line
      ctx.strokeStyle = "rgba(52, 211, 153, 0.85)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(0, 35 + scanY);
      ctx.lineTo(width, 35 + scanY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Audio Voice Waveform at bottom
      const waveY = height * 0.82;
      const barCount = 36;
      const barW = (width - 60) / barCount;

      for (let i = 0; i < barCount; i++) {
        const bx = 30 + i * barW;
        // Dynamic voice frequency pulse
        const freq = Math.sin(t * 4 + i * 0.4) * Math.cos(t * 2 + i * 0.2);
        const barH = Math.max(4, Math.abs(freq) * 32);

        // Gradient from cyan to emerald
        const grad = ctx.createLinearGradient(0, waveY - barH / 2, 0, waveY + barH / 2);
        grad.addColorStop(0, "#00f0ff");
        grad.addColorStop(1, "#10b981");

        ctx.fillStyle = grad;
        ctx.fillRect(bx, waveY - barH / 2, barW - 3, barH);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const current = voiceQueries[activeQueryIndex];

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] bg-[#07080a] flex flex-col justify-between overflow-hidden select-none p-5">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-[#0c0e12]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/40">
          <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-white">HYPERSPECTRAL 224-BAND</span>
          <span className="text-zinc-600">//</span>
          <span className="text-emerald-400 font-mono">NIR 700-900nm</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60">
          <Activity className="w-3 h-3 animate-pulse text-cyan-400" />
          <span>VOICE AI ACTIVE</span>
        </div>
      </div>

      {/* Center Conversational Voice Dialogue Card */}
      <div className="relative z-20 my-auto mx-auto max-w-sm w-full">
        <div className="p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300">
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1.5">
            <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold uppercase tracking-wider">Farmer Voice Query</span>
          </div>
          <p className="text-xs font-sans text-white italic mb-2.5">
            {current.query}
          </p>

          <div className="pt-2 border-t border-zinc-800/80 flex items-start gap-2 text-xs font-mono text-cyan-300">
            <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{current.response}</span>
          </div>
        </div>
      </div>

      {/* Bottom Audio Telemetry Indicator */}
      <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-3 border-t border-zinc-900/90">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>REAL-TIME NATURAL LANGUAGE STREAM</span>
        </div>
        <div className="text-emerald-400 font-semibold">
          96.4% CONFIDENCE
        </div>
      </div>
    </div>
  );
};

export default WheatSpectralVisual;
