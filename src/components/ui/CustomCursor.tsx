"use client";

import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.dataset.interactive === "true";
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Cyan Cyber Ring */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 16}px, ${pos.y - 16}px, 0)`,
          width: "32px",
          height: "32px",
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-200 ${
            isHovered
              ? "border-cyan-400 scale-150 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              : "border-cyan-500/30 scale-100"
          }`}
        />
      </div>

      {/* Center Precise Dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          transform: `translate3d(${pos.x - 2}px, ${pos.y - 2}px, 0)`,
          width: "4px",
          height: "4px",
        }}
      >
        <div className="w-full h-full rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
      </div>
    </>
  );
};

export default CustomCursor;
