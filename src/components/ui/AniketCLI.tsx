"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";
import { PERSONAL_INFO, CAPABILITIES_DATA, HACKATHONS } from "@/lib/constants";
import { FEATURED_PROJECTS } from "@/data/projects";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const AniketCLI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-cyan-400 font-bold">ANIKET.SYS NEURAL CONSOLE [v2.4.0-PROD]</p>
          <p className="text-zinc-400">Type <span className="text-white font-semibold underline">help</span> or tap any quick-chip below to execute commands.</p>
        </div>
      ),
      time: "00:00:01"
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Subtle audio blip synthesizer for tactile feedback
  const playBeep = (freq = 880, duration = 0.04) => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay restrictions fallback
    }
  };

  // Keyboard shortcut toggle (~ or /) and custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "~" || (e.key === "/" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-aniket-cli", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-aniket-cli", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const getTime = () => {
    const d = new Date();
    return d.toTimeString().split(" ")[0];
  };

  const executeCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    playBeep(1200, 0.05);

    let resultNode: React.ReactNode;

    switch (cleanCmd) {
      case "help":
        resultNode = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-cyan-300 font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 font-mono">
              <div><span className="text-white font-bold">whoami</span> — Identity & Academic Profile</div>
              <div><span className="text-white font-bold">skills</span> — Full-Stack & AI Stack Matrix</div>
              <div><span className="text-white font-bold">projects</span> — Featured Repos & Demos</div>
              <div><span className="text-white font-bold">awards</span> — Hackathon Victories</div>
              <div><span className="text-white font-bold">benchmark</span> — Real-Time Latency Test</div>
              <div><span className="text-white font-bold">hire</span> — Direct Dispatch Channel</div>
              <div><span className="text-white font-bold">clear</span> — Purge Terminal Buffer</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="space-y-2 text-xs text-zinc-300">
            <p className="text-cyan-400 font-bold uppercase">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</p>
            <p className="text-zinc-300">{PERSONAL_INFO.bio[0]}</p>
            <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
              <span className="text-cyan-400">INSTITUTION:</span> {PERSONAL_INFO.university} ({PERSONAL_INFO.year})<br />
              <span className="text-cyan-400">SPECIALIZATION:</span> {PERSONAL_INFO.program}<br />
              <span className="text-cyan-400">LOCATION:</span> {PERSONAL_INFO.location}<br />
              <span className="text-cyan-400">STATUS:</span> {PERSONAL_INFO.status}
            </div>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold uppercase">AUTHENTICATED SKILL SPECTRUM:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              {CAPABILITIES_DATA.map((c) => (
                <div key={c.id} className="p-2 rounded bg-zinc-900/80 border border-zinc-800/80 flex justify-between items-center">
                  <span className="text-white font-medium">{c.name}</span>
                  <span className="text-cyan-400 font-bold">{c.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold uppercase">FEATURED LABORATORY PROJECTS:</p>
            <div className="flex flex-col gap-2">
              {FEATURED_PROJECTS.map((p) => (
                <div key={p.id} className="p-2.5 rounded bg-zinc-900 border border-zinc-800 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{p.title}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{p.category}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">{p.description}</p>
                  <div className="flex gap-3 text-[10px] font-mono pt-1 text-zinc-300">
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">GitHub ↗</a>
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Live Demo ↗</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "awards":
      case "hackathons":
        resultNode = (
          <div className="space-y-2 text-xs">
            <p className="text-amber-400 font-bold uppercase">COMPETITIVE VICTORIES:</p>
            {HACKATHONS.map((h) => (
              <div key={h.id} className="p-2.5 rounded bg-zinc-900 border border-amber-500/30">
                <span className="text-amber-300 font-bold">{h.award}</span> — {h.title} ({h.organizer})
                <p className="text-zinc-400 text-[11px] mt-0.5">{h.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "benchmark":
        resultNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-emerald-400 font-bold">RUNNING SYSTEM DIAGNOSTICS...</p>
            <p className="text-zinc-400">⚡ Client Render Latency: <span className="text-white font-bold">&lt; 16.6ms (60 FPS Stable)</span></p>
            <p className="text-zinc-400">⚡ Edge CV Processing: <span className="text-cyan-400 font-bold">&lt; 45ms Local Inference</span></p>
            <p className="text-zinc-400">⚡ Memory Footprint: <span className="text-emerald-300 font-bold">OPTIMAL (Zero Memory Leaks)</span></p>
            <p className="text-zinc-400">⚡ Type Safety: <span className="text-indigo-400 font-bold">100% Strict TypeScript</span></p>
            <p className="text-emerald-400 font-semibold mt-1">STATUS: ALL ENGINES NOMINAL</p>
          </div>
        );
        break;

      case "hire":
      case "contact":
        resultNode = (
          <div className="p-3 rounded bg-cyan-950/40 border border-cyan-500/40 space-y-2 text-xs">
            <p className="text-cyan-300 font-bold">TRANSMISSION FREQUENCY READY:</p>
            <p className="text-white text-sm font-mono font-semibold">{PERSONAL_INFO.email}</p>
            <p className="text-zinc-400">Open for full-stack engineering builds, AI/ML integrations, and high-impact software roles.</p>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
              className="inline-block px-3 py-1.5 rounded bg-cyan-400 text-black font-bold font-mono text-[11px] hover:bg-cyan-300 transition-colors"
            >
              DISPATCH EMAIL NOW ↗
            </a>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        resultNode = (
          <p className="text-rose-400 text-xs">
            Command not recognized: &quot;{cmdStr}&quot;. Type <span className="text-white font-bold underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> for system commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdStr,
        output: resultNode,
        time: getTime()
      }
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal("");
  };

  const quickChips = ["help", "whoami", "skills", "projects", "benchmark", "hire"];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        id="btn-floating-cli-trigger"
        aria-label="Open Cyber Terminal"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/90 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-md text-xs font-mono transition-all duration-200 active:scale-95 group shadow-2xl"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
        <TerminalIcon className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="font-semibold tracking-wider">ANIKET.CLI</span>
        <span className="text-[10px] text-zinc-500 border border-zinc-800 rounded px-1 hidden sm:inline">[~]</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full sm:max-w-2xl h-[85vh] sm:h-[600px] flex flex-col bg-[#08090b] border-t sm:border border-cyan-500/40 sm:rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden"
        role="dialog"
        aria-label="Aniket Developer Interactive Terminal"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#0d0e12]">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 pl-2 text-xs font-mono text-zinc-300">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">aniket@engine:~#</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-cyan-400 hidden sm:inline">60 FPS TELEMETRY</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Command Buffer */}
        <div
          ref={scrollContainerRef}
          className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs space-y-4 scrollbar-thin scrollbar-thumb-zinc-800"
        >
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                <span className="text-cyan-400 font-bold">❯</span>
                <span className="text-zinc-200 font-semibold">{entry.command}</span>
                <span className="text-[10px] text-zinc-600 ml-auto">{entry.time}</span>
              </div>
              <div className="pl-4 border-l border-zinc-800/80 py-0.5">
                {entry.output}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">QUICK:</span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => executeCommand(chip)}
              className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-zinc-800/80 transition-all whitespace-nowrap active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800 bg-[#090a0d]"
        >
          <span className="text-cyan-400 font-mono text-sm font-bold">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. skills, benchmark, hire)..."
            className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-zinc-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AniketCLI;
