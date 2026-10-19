"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, Sparkles, Check, Copy } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export const LiveStatusBar: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch }) => {
  const [timeStr, setTimeStr] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTimeStr(formatter.format(now));
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full py-3 px-4 sm:px-6 rounded-2xl bg-[#090a0f]/90 border border-zinc-800/90 shadow-[0_4px_25px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
      {/* Left: Availability Indicator */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-zinc-200 font-sans font-medium text-xs sm:text-sm">
          Available for Summer & Fall 2026 Engineering Roles
        </span>
        <span className="hidden md:inline text-zinc-600">//</span>
        <span className="hidden md:inline text-zinc-400">
          GLA University B.Tech CSE (AI/ML)
        </span>
      </div>

      {/* Right: Live IST Clock & Quick Copy */}
      <div className="flex items-center gap-4 text-[11px] text-zinc-400">
        {/* Live IST Clock */}
        <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span className="text-zinc-200">{timeStr || "07:54 AM IST"}</span>
          <span className="text-zinc-500 text-[10px]">IST</span>
        </div>

        {/* Quick Email Pill */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Click to copy email"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-zinc-400" />
              <span>Copy Email</span>
            </>
          )}
        </button>

        {/* Cmd+K trigger */}
        <button
          onClick={() => {
            if (onOpenSearch) {
              onOpenSearch();
            } else if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("open-command-palette"));
            }
          }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Search or jump to section (⌘K)"
        >
          <span>Search</span>
          <kbd className="px-1 text-[10px] bg-zinc-800 rounded font-mono text-zinc-300">⌘K</kbd>
        </button>
      </div>
    </div>
  );
};

export default LiveStatusBar;
