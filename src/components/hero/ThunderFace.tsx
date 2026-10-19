"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaceCanvas } from "./FaceCanvas";
import { HeroTelemetry } from "./HeroTelemetry";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      progressRef.current = 0.85;
      return;
    }

    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!container || !pinWrapper) return;

    // Set initial progress
    progressRef.current = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinWrapper,
        pinSpacing: false,
        scrub: 0.35, // Fast, responsive scrub
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        }
      });
    }, container);

    return () => {
      ctx.revert(); // Automatically cleans up ScrollTrigger and listeners
    };
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      id="core"
      className={`relative w-full ${
        reducedMotion ? "h-screen" : "h-[220vh]"
      } bg-[#030303] text-white ${className}`}
    >
      {/* Sticky Pinned Viewport Container */}
      <div
        ref={pinWrapperRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#030303]"
      >
        {/* Procedural Canvas Simulation (Particles + Organic Lightning) */}
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
