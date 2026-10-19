"use client";

import React, { useEffect, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops/laptops with mouse/trackpad)
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768
    ) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.dataset.interactive === "true";
        isHovered = !!interactive;
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Silky smooth 60-120fps hardware-accelerated lerp loop (Zero React re-renders!)
    const loop = () => {
      if (isVisible) {
        // Dot snaps directly to cursor
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
        }

        // Outer ring trails smoothly with lerp
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;

        if (ringRef.current) {
          const scale = isHovered ? "scale(1.4)" : "scale(1)";
          const borderColor = isHovered ? "rgba(0, 240, 255, 0.9)" : "rgba(0, 240, 255, 0.35)";
          const bg = isHovered ? "rgba(0, 240, 255, 0.08)" : "transparent";

          ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) ${scale}`;
          ringRef.current.style.borderColor = borderColor;
          ringRef.current.style.backgroundColor = bg;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer Cyan Cyber Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-50 rounded-full border transition-[border-color,background-color] duration-150 ease-out will-change-transform"
        style={{
          width: "32px",
          height: "32px",
          opacity: 0,
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-50 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.8)] will-change-transform"
        style={{
          width: "4px",
          height: "4px",
          opacity: 0,
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />
    </>
  );
};

export default CustomCursor;
