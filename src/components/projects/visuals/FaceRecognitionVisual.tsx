"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Scan, Sparkles, Video } from "lucide-react";

interface FaceRecognitionVisualProps {
  videoSrc?: string;
}

export const FaceRecognitionVisual: React.FC<FaceRecognitionVisualProps> = ({
  videoSrc
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceCardRef = useRef<HTMLDivElement | null>(null);
  const yawBadgeRef = useRef<HTMLSpanElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax on mouse move + scroll (Direct DOM Transform - ZERO React re-renders)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let animId: number = 0;
    let isVisible = true;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotY = normX * 32;
      targetRotX = -normY * 20;
    };

    const onMouseLeave = () => {
      targetRotY = 0;
      targetRotX = 0;
    };

    const onScroll = () => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const scrollYaw = (progress - 0.5) * 18;
      targetRotY += (scrollYaw - targetRotY) * 0.2;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(loop);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(container);

    const loop = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;

      const roundedY = Math.round(currentRotY * 10) / 10;
      const roundedX = Math.round(currentRotX * 10) / 10;

      if (faceCardRef.current) {
        faceCardRef.current.style.transform = `rotateY(${roundedY}deg) rotateX(${roundedX}deg)`;
      }

      if (yawBadgeRef.current) {
        yawBadgeRef.current.textContent = `YAW: ${roundedY}°`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Luminous orbs floating around the face on canvas (Paused when off-screen)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number = 0;
    let isVisible = true;

    const isMobile = window.innerWidth < 768;
    const orbCount = isMobile ? 20 : 35;

    const orbs = Array.from({ length: orbCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1.0 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
      alpha: 0.3 + Math.random() * 0.5,
      pulseSpeed: 0.02 + Math.random() * 0.04
    }));

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(render);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);

    let frame = 0;
    const render = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }

      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < 0) orb.x = 1;
        if (orb.x > 1) orb.x = 0;
        if (orb.y < 0) orb.y = 1;
        if (orb.y > 1) orb.y = 0;

        const pulse = Math.sin(frame * orb.pulseSpeed) * 0.18;
        const currentAlpha = Math.max(0.1, orb.alpha + pulse);

        ctx.beginPath();
        ctx.arc(orb.x * width, orb.y * height, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${currentAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(orb.x * width, orb.y * height, orb.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${currentAlpha * 0.22})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full min-h-[380px] lg:min-h-[480px] bg-[#07080a] flex items-center justify-center overflow-hidden select-none group perspective-[1200px]"
    >
      {/* Background Ambient Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* If User Provided Video, Render Video Player */}
      {videoSrc ? (
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-cyan-500/40 rounded-full text-[10px] font-mono text-cyan-300">
            <Video className="w-3 h-3 text-cyan-400" />
            <span>3D ORBS STREAM</span>
          </div>
        </div>
      ) : (
        /* Interactive 3D Turnable Face with Glowing Orbs (Hardware-accelerated) */
        <div
          ref={faceCardRef}
          className="relative w-72 sm:w-80 h-96 sm:h-[400px] flex items-center justify-center will-change-transform"
          style={{
            transform: "rotateY(0deg) rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Face Image Card with 3D Depth */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)]">
            <Image
              src="/images/profile-face.jpg"
              alt="Aniket Face - Edge-AI Recognition Model"
              fill
              className="object-cover object-center filter contrast-125 brightness-95"
              priority
            />

            {/* Cyan Scanline Sweep */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-24 animate-pulse pointer-events-none" />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>

          {/* Computer Vision Target Bounding Box */}
          <div className="absolute inset-4 pointer-events-none border border-cyan-400/40 rounded-xl flex flex-col justify-between p-3 transition-opacity duration-300">
            {/* Top Bounding Box Telemetry */}
            <div className="flex justify-between items-start text-[10px] font-mono text-cyan-300 bg-black/60 backdrop-blur-sm px-2 py-1 border border-cyan-500/30 rounded">
              <div className="flex items-center gap-1.5">
                <Scan className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>CONFIDENCE: 99.2%</span>
              </div>
              <span className="text-zinc-400">FPS: 60</span>
            </div>

            {/* Four Corner Recognition Brackets */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400" />

            {/* Bottom Bounding Box Label */}
            <div className="mt-auto self-start text-[10px] font-mono text-white bg-cyan-950/80 px-2 py-0.5 border border-cyan-400/50 rounded">
              SUBJECT: ANIKET [MATCH VERIFIED]
            </div>
          </div>
        </div>
      )}

      {/* Floating Canvas Particle Orbs Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Top Left Status Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-[#090a0d]/90 px-3 py-1.5 rounded-full border border-zinc-800">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-zinc-200 uppercase font-medium">3D Turnable Mesh</span>
        <span className="text-zinc-600">//</span>
        <span ref={yawBadgeRef} className="text-cyan-400">YAW: 0°</span>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex justify-between items-center text-[10px] font-mono text-zinc-500 pointer-events-none">
        <div className="flex items-center gap-1 text-zinc-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>{isHovered ? "TURNING IN 3D..." : "HOVER & SCROLL TO TURN"}</span>
        </div>
        <span className="text-zinc-600 hidden sm:inline">ESP32 + OPENCV BRIDGE</span>
      </div>
    </div>
  );
};

export default FaceRecognitionVisual;
