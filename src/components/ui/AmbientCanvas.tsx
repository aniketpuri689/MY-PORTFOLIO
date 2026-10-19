"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number = 0;
    let width = 0;
    let height = 0;
    let isDestroyed = false;
    let isVisible = true;

    const isMobile = window.innerWidth < 768;
    const orbCount = isMobile ? 16 : 32;

    interface AmbientOrb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseAlpha: number;
      pulsePhase: number;
    }

    const orbs: AmbientOrb[] = [];
    const colors = [
      "rgba(0, 240, 255,", // Cyan
      "rgba(99, 102, 241,", // Indigo
      "rgba(16, 185, 129,", // Emerald
      "rgba(229, 169, 60,"  // Gold / Amber
    ];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    for (let i = 0; i < orbCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1.2 + Math.random() * 2.0,
        color,
        baseAlpha: 0.15 + Math.random() * 0.3,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let lastTime = performance.now();

    // Pause when tab is hidden
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible && !animId && !isDestroyed) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const render = (time: number) => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const maxDist = isMobile ? 65 : 100;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        o.x += o.vx * dt * 60;
        o.y += o.vy * dt * 60;

        if (o.x < -10) o.x = width + 10;
        else if (o.x > width + 10) o.x = -10;

        if (o.y < -10) o.y = height + 10;
        else if (o.y > height + 10) o.y = -10;

        const pulse = Math.sin(time * 0.0015 + o.pulsePhase);
        const alpha = Math.max(0.05, o.baseAlpha + pulse * 0.1);

        // Draw Orb
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.size, 0, Math.PI * 2);
        ctx.fillStyle = `${o.color} ${alpha})`;
        ctx.fill();

        // Connect with nearby orbs (lightweight)
        for (let j = i + 1; j < orbs.length; j++) {
          const o2 = orbs[j];
          const dx = o.x - o2.x;
          const dy = o.y - o2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const lineAlpha = (1 - distSq / maxDistSq) * 0.08;
            ctx.beginPath();
            ctx.moveTo(o.x, o.y);
            ctx.lineTo(o2.x, o2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (!isDestroyed) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 select-none"
      aria-hidden="true"
    />
  );
};

export default AmbientCanvas;
