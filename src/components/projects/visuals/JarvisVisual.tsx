"use client";

import React, { useEffect, useRef } from "react";
import { Mic, Activity, Radio } from "lucide-react";

export const JarvisVisual: React.FC = () => {
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

    let frame = 0;
    const barCount = 42;

    const render = () => {
      frame += 0.04;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const baseRadius = Math.min(width, height) * 0.22;

      // 1. Central Pulsing AI Voice Core
      const corePulse = Math.sin(frame * 2.0) * 10;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        5,
        centerX,
        centerY,
        baseRadius * 0.8
      );
      coreGrad.addColorStop(0, "rgba(0, 240, 255, 0.45)");
      coreGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.2)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.8 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      // 2. Concentric Orbit Rings
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.35, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Radial Waveform Frequency Bars
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2;
        const wave = Math.sin(angle * 6 + frame * 3) * Math.cos(angle * 3 - frame * 2);
        const barHeight = 12 + Math.abs(wave) * 36;

        const x1 = centerX + Math.cos(angle) * (baseRadius + 4);
        const y1 = centerY + Math.sin(angle) * (baseRadius + 4);
        const x2 = centerX + Math.cos(angle) * (baseRadius + 4 + barHeight);
        const y2 = centerY + Math.sin(angle) * (baseRadius + 4 + barHeight);

        ctx.strokeStyle = i % 2 === 0 ? "rgba(0, 240, 255, 0.85)" : "rgba(147, 197, 253, 0.7)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 4. Floating Satellite Data Nodes (as seen in reference UI)
      const nodeAngles = [frame * 0.6, frame * -0.4 + 2, frame * 0.8 + 4];
      for (let i = 0; i < nodeAngles.length; i++) {
        const a = nodeAngles[i];
        const dist = baseRadius * (1.2 + i * 0.25);
        const nx = centerX + Math.cos(a) * dist;
        const ny = centerY + Math.sin(a) * dist;

        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#00f0ff" : "#f59e0b";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.strokeStyle = i === 0 ? "rgba(0, 240, 255, 0.3)" : "rgba(245, 158, 11, 0.3)";
        ctx.stroke();
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

      {/* Top Left Status Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-[#090a0d]/90 px-3 py-1.5 rounded-full border border-zinc-800">
        <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="text-zinc-200 uppercase font-medium">Asynchronous Stream</span>
        <span className="text-zinc-600">//</span>
        <span className="text-cyan-400">FASTAPI + REACT</span>
      </div>

      {/* Floating Status Pill */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
        <Radio className="w-3 h-3 text-emerald-400" />
        <span>UVICORN EVENT LOOP: &lt;120ms</span>
      </div>

      {/* Bottom Right Audio Telemetry */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
        <Activity className="w-3.5 h-3.5 text-cyan-400" />
        <span>44.1 kHz REALTIME</span>
      </div>
    </div>
  );
};

export default JarvisVisual;
