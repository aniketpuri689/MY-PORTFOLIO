"use client";

import React, { useEffect, useRef, useState } from "react";
import { Film, Network, Compass, Sparkles } from "lucide-react";

interface MovieNode {
  id: string;
  title: string;
  genre: string;
  x: number;
  y: number;
  similarity: number;
  isTarget?: boolean;
}

export const MovieRecVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<string>("Interstellar");

  const movies: MovieNode[] = [
    { id: "1", title: "Interstellar", genre: "Sci-Fi / Space", x: 0.5, y: 0.48, similarity: 1.0, isTarget: true },
    { id: "2", title: "Inception", genre: "Sci-Fi / Mind", x: 0.32, y: 0.32, similarity: 0.94 },
    { id: "3", title: "The Martian", genre: "Sci-Fi / Survival", x: 0.68, y: 0.35, similarity: 0.91 },
    { id: "4", title: "Arrival", genre: "Sci-Fi / Linguistics", x: 0.35, y: 0.68, similarity: 0.88 },
    { id: "5", title: "Blade Runner 2049", genre: "Cyberpunk / AI", x: 0.65, y: 0.65, similarity: 0.86 },
    { id: "6", title: "Dune: Part Two", genre: "Sci-Fi / Epic", x: 0.82, y: 0.48, similarity: 0.82 },
    { id: "7", title: "Tenet", genre: "Sci-Fi / Physics", x: 0.18, y: 0.52, similarity: 0.81 }
  ];

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
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Multi-Dimensional Concentric Distance Rings from Target
      const target = movies[0];
      const tx = target.x * width;
      const ty = target.y * height;

      for (let r = 1; r <= 3; r++) {
        const radius = r * 75 + Math.sin(t + r) * 4;
        ctx.strokeStyle = "rgba(14, 165, 233, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(tx, ty, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 2. Draw Vector Similarity Connections from Target to Neighbors
      for (let i = 1; i < movies.length; i++) {
        const node = movies[i];
        const nx = node.x * width + Math.sin(t * 0.8 + i) * 3;
        const ny = node.y * height + Math.cos(t * 0.8 + i) * 3;

        // Line with opacity proportional to similarity
        ctx.strokeStyle = `rgba(0, 240, 255, ${node.similarity * 0.45})`;
        ctx.lineWidth = node.similarity * 2.2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Traveling pulse along vector connection
        const progress = (t * 0.6 + i * 0.25) % 1.0;
        const px = tx + (nx - tx) * progress;
        const py = ty + (ny - ty) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Movie Vector Nodes
      for (let i = 0; i < movies.length; i++) {
        const node = movies[i];
        const nx = (i === 0 ? tx : node.x * width + Math.sin(t * 0.8 + i) * 3);
        const ny = (i === 0 ? ty : node.y * height + Math.cos(t * 0.8 + i) * 3);
        const isTarget = node.isTarget;

        // Outer glow
        ctx.beginPath();
        ctx.arc(nx, ny, isTarget ? 24 : 16, 0, Math.PI * 2);
        ctx.fillStyle = isTarget ? "rgba(0, 240, 255, 0.18)" : "rgba(30, 41, 59, 0.5)";
        ctx.fill();
        ctx.strokeStyle = isTarget ? "#00f0ff" : "rgba(56, 189, 248, 0.5)";
        ctx.lineWidth = isTarget ? 2 : 1;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, ny, isTarget ? 6 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isTarget ? "#ffffff" : "#38bdf8";
        ctx.fill();

        // Title Label
        ctx.font = isTarget ? "bold 11px sans-serif" : "10px sans-serif";
        ctx.fillStyle = isTarget ? "#ffffff" : "#94a3b8";
        ctx.textAlign = "center";
        ctx.fillText(node.title, nx, ny + (isTarget ? 36 : 26));

        // Cosine Sim score tag
        if (!isTarget) {
          ctx.font = "9px monospace";
          ctx.fillStyle = "#38bdf8";
          ctx.fillText(`cos θ: ${node.similarity}`, nx, ny - 20);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] bg-[#07080a] flex flex-col justify-between overflow-hidden select-none p-5">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-[#0c0e12]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-500/40">
          <Network className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold text-white">TF-IDF & COSINE VECTOR SPACE</span>
          <span className="text-zinc-600">//</span>
          <span className="text-sky-400 font-mono">50K+ CORPUS</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60">
          <Compass className="w-3 h-3 text-cyan-400" />
          <span>QUERY: &lt;15ms</span>
        </div>
      </div>

      {/* Center Target Indicator Pill */}
      <div className="relative z-20 pointer-events-none mt-auto mb-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
          <Film className="w-3 h-3 text-cyan-400" />
          <span>QUERY TARGET: <strong>Interstellar</strong></span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">TOP MATCH: Inception (0.942)</span>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-3 border-t border-zinc-900/90">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span>SPARSE MATRIX DECOMPOSITION</span>
        </div>
        <div className="text-sky-400 font-semibold">
          REAL-TIME NEAREST NEIGHBORS
        </div>
      </div>
    </div>
  );
};

export default MovieRecVisual;
