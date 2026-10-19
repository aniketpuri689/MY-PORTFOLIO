"use client";

import React, { useEffect, useRef } from "react";
import { Code2, Database, CheckCircle2 } from "lucide-react";

export const AiForgeVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Modular nodes representing the educational curriculum pipeline
    const nodes = [
      { id: "input", label: "DATA", x: 0.2, y: 0.5 },
      { id: "layer1", label: "MATH", x: 0.4, y: 0.3 },
      { id: "layer2", label: "LOGIC", x: 0.4, y: 0.7 },
      { id: "eval", label: "EVAL", x: 0.65, y: 0.4 },
      { id: "cache", label: "STORAGE", x: 0.65, y: 0.6 },
      { id: "output", label: "RESULT", x: 0.85, y: 0.5 }
    ];

    const edges = [
      [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5]
    ];

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Connecting Neural Traces
      for (const [from, to] of edges) {
        const p1 = nodes[from];
        const p2 = nodes[to];

        ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p1.x * width, p1.y * height);
        ctx.lineTo(p2.x * width, p2.y * height);
        ctx.stroke();

        // Animated traveling pulses
        const progress = (t * 0.7 + from * 0.3) % 1.0;
        const px = (p1.x + (p2.x - p1.x) * progress) * width;
        const py = (p1.y + (p2.y - p1.y) * progress) * height;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00f0ff";
        ctx.fill();
      }

      // 2. Draw Interactive Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nx = node.x * width;
        const ny = node.y * height;
        const isSelected = i === 3 || i === 5;

        // Outer Glow Ring
        ctx.beginPath();
        ctx.arc(nx, ny, 16, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "rgba(0, 240, 255, 0.15)" : "rgba(30, 41, 59, 0.6)";
        ctx.fill();
        ctx.strokeStyle = isSelected ? "#00f0ff" : "rgba(100, 116, 139, 0.5)";
        ctx.lineWidth = isSelected ? 1.5 : 1;
        ctx.stroke();

        // Center Core
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#00f0ff" : "#94a3b8";
        ctx.fill();

        // Text Label
        ctx.font = "9px monospace";
        ctx.fillStyle = "#cbd5e1";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + 28);
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
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] bg-[#07080a] flex items-center justify-center overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Top Status */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-[#090a0d]/90 px-3 py-1.5 rounded-full border border-zinc-800">
        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-zinc-200 uppercase font-medium">Zero-Backend Sandbox</span>
        <span className="text-zinc-600">//</span>
        <span className="text-cyan-400">VANILLA JS</span>
      </div>

      {/* Bottom Status Indicators */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
        <Database className="w-3 h-3 text-cyan-400" />
        <span>LOCALSTORAGE TREE PERSISTENCE</span>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>100% CLIENT OFFLINE</span>
      </div>
    </div>
  );
};

export default AiForgeVisual;
