"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, GitPullRequest, ArrowDown } from "lucide-react";

export const LeanPrVisual: React.FC = () => {
  const [tokensSaved, setTokensSaved] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokensSaved(63 + Math.floor(Math.random() * 5));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const diffLines = [
    { type: "del", text: "- function calculateRedundantContext(ast, tokens) {" },
    { type: "del", text: "-   let verboseBuffer = serializeAST(ast, true);" },
    { type: "opt", text: "⚡ [AST HEURISTIC]: Stripped 280 boilerplate tokens" },
    { type: "add", text: "+ const compressedPrompt = sliceAST(ast, { maxDepth: 3 });" },
    { type: "normal", text: "  return streamToLLM(compressedPrompt);" }
  ];

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] bg-[#07080a] flex flex-col justify-between p-6 sm:p-8 overflow-hidden select-none font-mono">
      {/* Top Status Header */}
      <div className="flex justify-between items-center z-10 text-[10px]">
        <div className="flex items-center gap-2 text-zinc-400 bg-[#090a0d]/90 px-3 py-1.5 rounded-full border border-zinc-800">
          <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-zinc-200 uppercase font-medium">AST Token Compressor</span>
          <span className="text-zinc-600">//</span>
          <span className="text-cyan-400">STREAMLIT</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-400 font-semibold">
          <Zap className="w-3 h-3" />
          <span>DEVPOST HACKATHON</span>
        </div>
      </div>

      {/* Simulated Code Diff Window */}
      <div className="my-auto z-10 w-full bg-zinc-950/90 border border-zinc-800/80 rounded-xl p-4 sm:p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-3 text-[10px] text-zinc-500">
          <span>pr_optimizer_engine.py</span>
          <span className="text-emerald-400 font-semibold">COMPRESSED</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {diffLines.map((line, idx) => (
            <div
              key={idx}
              className={`px-2 py-1 rounded font-mono text-[11px] sm:text-xs leading-relaxed ${
                line.type === "del"
                  ? "bg-red-950/20 text-red-400/80 line-through"
                  : line.type === "add"
                  ? "bg-emerald-950/30 text-emerald-300 font-medium"
                  : line.type === "opt"
                  ? "bg-cyan-950/30 text-cyan-300 border-l-2 border-cyan-400 font-medium text-[10px]"
                  : "text-zinc-400"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Token Efficiency Telemetry */}
      <div className="flex items-center justify-between z-10 border-t border-zinc-900/80 pt-3 text-[10px] text-zinc-500">
        <div className="flex items-center gap-2 text-emerald-400 font-medium">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          <span>TOKEN CONSUMPTION: -{tokensSaved}%</span>
        </div>
        <span className="text-zinc-600">INPUT TOKENS REDUCED</span>
      </div>

      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default LeanPrVisual;
