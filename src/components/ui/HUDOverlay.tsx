"use client";

import React, { useState, useEffect } from "react";
import { AudioToggle } from "./AudioToggle";

export const HUDOverlay: React.FC = () => {
  const [activeTab, setActiveTab] = useState("core");

  const navItems = [
    { id: "core", label: "CORE", href: "#core" },
    { id: "identity", label: "IDENTITY", href: "#identity" },
    { id: "capabilities", label: "CAPABILITIES", href: "#capabilities" },
    { id: "laboratory", label: "LABORATORY", href: "#laboratory" },
    { id: "beyond", label: "BEYOND", href: "#beyond" },
    { id: "communicate", label: "COMMUNICATE", href: "#communicate" },
  ];

  useEffect(() => {
    const sectionIds = ["core", "identity", "capabilities", "laboratory", "beyond", "communicate"];

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Bottom of page -> highlight communicate
        if (scrollY + windowHeight >= docHeight - 80) {
          setActiveTab((prev) => (prev !== "communicate" ? "communicate" : prev));
          return;
        }

        // Find which section is currently active
        const viewportMid = scrollY + windowHeight * 0.35;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.offsetTop <= viewportMid) {
            const nextTab = sectionIds[i];
            setActiveTab((prev) => (prev !== nextTab ? nextTab : prev));
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Run initially
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    setActiveTab(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      if (window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      {/* Viewport Corner Matrix Brackets */}
      <div className="fixed top-3 left-3 w-3 h-3 border-t border-l border-zinc-700 pointer-events-none z-40 hidden sm:block" />
      <div className="fixed top-3 right-3 w-3 h-3 border-t border-r border-zinc-700 pointer-events-none z-40 hidden sm:block" />
      <div className="fixed bottom-3 left-3 w-3 h-3 border-b border-l border-zinc-700 pointer-events-none z-40 hidden sm:block" />
      <div className="fixed bottom-3 right-3 w-3 h-3 border-b border-r border-zinc-700 pointer-events-none z-40 hidden sm:block" />

      {/* Floating Tactical Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-30 px-3 sm:px-6 md:px-12 py-3 flex items-center justify-between pointer-events-none font-mono text-xs">
        {/* Brand / Logo */}
        <a
          href="#core"
          onClick={(e) => handleNavClick(e, "core", "#core")}
          id="nav-logo"
          className="pointer-events-auto flex items-center gap-2 text-zinc-200 hover:text-cyan-400 transition-colors uppercase tracking-widest font-semibold"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-none shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          <span className="hidden xs:inline">ANIKET.SYS</span>
        </a>

        {/* Center Pill Navigation Bar */}
        <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-[#121316]/90 backdrop-blur-md border border-zinc-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.8)] overflow-x-auto max-w-[calc(100vw-130px)] sm:max-w-none scrollbar-none">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id, item.href)}
              className={`px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-sans tracking-wider uppercase rounded-full transition-all duration-200 whitespace-nowrap ${
                activeTab === item.id
                  ? "bg-zinc-800/90 text-white font-semibold shadow-inner border border-zinc-700/50"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Audio / Atmosphere Controller */}
        <div className="pointer-events-auto flex items-center">
          <AudioToggle />
        </div>
      </header>
    </>
  );
};

export default HUDOverlay;
