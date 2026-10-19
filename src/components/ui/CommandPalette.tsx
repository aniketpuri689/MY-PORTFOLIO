"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Command,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Volume2,
  VolumeX,
  FileText,
  Layers,
  Sparkles,
  Bot,
  Brain,
  Code2,
  X
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/lib/constants";
import { FEATURED_PROJECTS } from "@/data/projects";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Links";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Jump to section helper
  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (window.history.pushState) {
        window.history.pushState(null, "", hash);
      }
    }
  };

  // Copy email helper
  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1500);
    }
  };

  // Toggle Atmosphere helper
  const handleToggleAtmosphere = () => {
    const audioBtn = document.getElementById("btn-audio-toggle");
    if (audioBtn) {
      audioBtn.click();
    }
    onClose();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-core",
      category: "Navigation",
      title: "Hero & Neural Orbs",
      subtitle: "Return to the top interactive particle canvas",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      shortcut: "1",
      action: () => navigateTo("#core"),
    },
    {
      id: "nav-identity",
      category: "Navigation",
      title: "Identity & Manifesto",
      subtitle: "Academic background, GLA University & engineering philosophy",
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      shortcut: "2",
      action: () => navigateTo("#identity"),
    },
    {
      id: "nav-capabilities",
      category: "Navigation",
      title: "Capabilities & Stack",
      subtitle: "Explore Next.js, AI/ML models, OpenCV & agentic tools",
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      shortcut: "3",
      action: () => navigateTo("#capabilities"),
    },
    {
      id: "nav-laboratory",
      category: "Navigation",
      title: "The Laboratory / Projects",
      subtitle: "Inspect production projects, code repositories and live demos",
      icon: <Brain className="w-4 h-4 text-sky-400" />,
      shortcut: "4",
      action: () => navigateTo("#laboratory"),
    },
    {
      id: "nav-beyond",
      category: "Navigation",
      title: "Beyond The Code",
      subtitle: "Hackathons won, credentials & community leadership",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      shortcut: "5",
      action: () => navigateTo("#beyond"),
    },
    {
      id: "nav-communicate",
      category: "Navigation",
      title: "Get In Touch",
      subtitle: "Direct email dispatch & professional networks",
      icon: <ArrowRight className="w-4 h-4 text-zinc-300" />,
      shortcut: "6",
      action: () => navigateTo("#communicate"),
    },

    // Projects
    ...FEATURED_PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      category: "Projects" as const,
      title: proj.title.split("—")[0].trim(),
      subtitle: proj.category,
      icon: <Bot className="w-4 h-4 text-cyan-300" />,
      action: () => navigateTo(`#project-${proj.id}`),
    })),

    // Actions
    {
      id: "act-copy-email",
      category: "Actions",
      title: copied ? "Email Copied!" : "Copy Email Address",
      subtitle: PERSONAL_INFO.email,
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />,
      shortcut: "E",
      action: handleCopyEmail,
    },
    {
      id: "act-atmosphere",
      category: "Actions",
      title: "Toggle Atmosphere & Audio",
      subtitle: "Ambient sub-bass drone and interactive particle excitation",
      icon: <Volume2 className="w-4 h-4 text-cyan-400" />,
      shortcut: "M",
      action: handleToggleAtmosphere,
    },

    // Links
    {
      id: "link-github",
      category: "Links",
      title: "GitHub Profile",
      subtitle: "Explore open-source repositories @aniketpuri689",
      icon: <GithubIcon className="w-4 h-4 text-zinc-300" />,
      action: () => {
        window.open(PERSONAL_INFO.socials.github, "_blank");
        onClose();
      },
    },
    {
      id: "link-linkedin",
      category: "Links",
      title: "LinkedIn Profile",
      subtitle: "Connect professionally on LinkedIn",
      icon: <LinkedinIcon className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.open(PERSONAL_INFO.socials.linkedin, "_blank");
        onClose();
      },
    },
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle?.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-fade-in">
      {/* Background click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0c0d12] border border-zinc-800 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.06)] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/90 bg-zinc-950/60">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, projects, sections, or actions..."
            className="flex-1 bg-transparent text-sm font-sans text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          className="max-h-[360px] sm:max-h-[420px] overflow-y-auto p-2 scrollbar-none"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-zinc-800/80 text-white"
                      : "text-zinc-300 hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? "bg-zinc-900 border-cyan-500/40 text-cyan-300"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400"
                      }`}
                    >
                      {cmd.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium font-sans truncate text-white">
                        {cmd.title}
                      </div>
                      {cmd.subtitle && (
                        <div className="text-[11px] font-mono text-zinc-400 truncate">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Helpful Keyboard Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950/80 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">
                ↓
              </kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">
                ↵
              </kbd>
              <span>select</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-400">Available for Summer 2026 Roles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
