"use client";

import React, { useEffect, useRef } from "react";
import { FaceCanvas } from "./FaceCanvas";
import { HeroTelemetry } from "./HeroTelemetry";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ThunderFaceProps {
  className?: string;
}

export const ThunderFace: React.FC<ThunderFaceProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<number>(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") {
      progressRef.current = 0.5;
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    // High-performance hardware-accelerated scroll calculation (works 100% reliably on all mobile & desktop browsers)
    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const totalDistance = rect.height - viewportH;

        if (totalDistance <= 0) {
          progressRef.current = 0;
          return;
        }

        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
        progressRef.current = progress;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      id="core"
      className={`relative w-full ${
        reducedMotion ? "h-screen" : "h-[175vh] sm:h-[220vh]"
      } bg-[#030303] text-white ${className}`}
    >
      {/* Sticky Pinned Viewport Container (GPU native sticky, safe on iOS dynamic address bars) */}
      <div
        ref={pinWrapperRef}
        className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#030303] will-change-transform"
      >
        {/* Procedural Canvas Simulation (Particles + Organic Idle Float + Tactile Touch) */}
        <FaceCanvas progressRef={progressRef} reducedMotion={reducedMotion} />

        {/* Minimalist Futuristic Typography & HUD Telemetry */}
        <HeroTelemetry progressRef={progressRef} reducedMotion={reducedMotion} />

        {/* Subtle Edge Gradients for Smooth Handoff */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default ThunderFace;
