"use client";

import React, { useState } from "react";
import { Code2, Play, Copy, Check, Terminal, Zap, ArrowRight, Cpu, Layers } from "lucide-react";

interface CodeTab {
  id: string;
  title: string;
  language: string;
  badge: string;
  latency: string;
  description: string;
  code: string;
  simulatedOutput: {
    status: string;
    metrics: string;
    response: string;
  };
}

export const ArchitectureCodeSandbox: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>("nextjs");
  const [copied, setCopied] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const tabs: CodeTab[] = [
    {
      id: "nextjs",
      title: "Next.js 16 & React 19 Client",
      language: "typescript",
      badge: "TypeScript 5 • Server Actions",
      latency: "8ms Edge Hydration",
      description:
        "Reactive client-side architecture using React 19 Server Components, Turbopack bundling, and strict TypeScript types for instantaneous page load and state sync.",
      code: `// src/actions/streamPayload.ts
"use server";

import { revalidateTag } from "next/cache";

export async function dispatchAgentStream(payload: { prompt: string; sessionId: string }) {
  const response = await fetch("https://api.aniket.dev/v1/orchestrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, timestamp: Date.now() }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(\`Gateway dispatch failed: \${response.statusText}\`);
  }

  return response.json();
}`,
      simulatedOutput: {
        status: "200 OK",
        metrics: "Edge TTFB: 8ms • Payload: 1.4KB",
        response: '{"status": "dispatched", "streamId": "str_89a02f", "latency": "8ms"}',
      },
    },
    {
      id: "fastapi",
      title: "FastAPI & Uvicorn Async Gateway",
      language: "python",
      badge: "Python 3.12 • AsyncIO ASGI",
      latency: "4ms Coroutines",
      description:
        "Asynchronous ASGI transport layer handling high-concurrency requests, Pydantic V2 schema validation, and streaming WebSockets between frontend and ML models.",
      code: `# app/routers/orchestrator.py
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
import asyncio

router = APIRouter(prefix="/v1/orchestrate", tags=["pipeline"])

class StreamRequest(BaseModel):
    prompt: str = Field(..., min_length=2, max_length=1000)
    session_id: str

@router.post("/", status_code=status.HTTP_200_OK)
async def handle_stream(req: StreamRequest):
    # Non-blocking async coroutine dispatch
    inference_task = asyncio.create_task(run_feature_extractor(req.prompt))
    result = await asyncio.wait_for(inference_task, timeout=2.5)
    return {"status": "success", "session": req.session_id, "data": result}`,
      simulatedOutput: {
        status: "200 OK",
        metrics: "Async Coroutines: 4ms • Memory: 22MB",
        response: '{"status": "success", "features_extracted": 128, "verified": true}',
      },
    },
    {
      id: "opencv",
      title: "OpenCV & Edge Biometrics",
      language: "python",
      badge: "OpenCV • NumPy Vectors",
      latency: "30+ FPS Hardware",
      description:
        "Real-time computer vision pipeline computing dense facial biometric landmarks, normalized cosine distance matrices, and hardware triggers over ESP32 serial.",
      code: `# vision/face_matcher.py
import cv2
import numpy as np

def extract_facial_biometrics(frame: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    equalized = cv2.equalizeHist(gray)
    
    # Extract dense facial landmarks & normalize coordinates [-0.5, 0.5]
    faces = face_cascade.detectMultiScale(equalized, scaleFactor=1.1, minNeighbors=5)
    if len(faces) == 0:
        return np.zeros((128,), dtype=np.float32)
        
    (x, y, w, h) = faces[0]
    roi = equalized[y:y+h, x:x+w]
    features = cv2.resize(roi, (64, 64)).flatten() / 255.0
    return features`,
      simulatedOutput: {
        status: "TARGET VERIFIED",
        metrics: "FPS: 32.4 • Confidence: 99.2%",
        response: '{"subject": "Aniket", "landmark_match": 0.992, "trigger": "ESP32_PIN_14"}',
      },
    },
    {
      id: "agent",
      title: "Autonomous Agent Tool Loop",
      language: "typescript",
      badge: "Agentic AI • Tool Calling",
      latency: "Self-Correcting",
      description:
        "Multi-step agent reasoning loop observing environment context, synthesizing plans, executing tool calls (terminal, APIs, database), and validating objectives autonomously.",
      code: `// agents/dispatcher.ts
export class AutonomousAgentLoop {
  async executeMission(goal: string, maxIterations = 5) {
    let state = await this.observeEnvironment();
    
    for (let step = 0; step < maxIterations; step++) {
      const plan = await this.llm.decideAction(goal, state);
      if (plan.action === "FINISH") return plan.result;

      // Invoke external tool & catch exceptions with self-correction
      try {
        const output = await this.tools.invoke(plan.tool, plan.args);
        state = await this.evaluateFeedback(state, output);
      } catch (err) {
        state = await this.recoverFromError(err, state);
      }
    }
  }
}`,
      simulatedOutput: {
        status: "GOAL ACHIEVED",
        metrics: "Iterations: 3 • Tools Called: 2",
        response: '{"plan_completed": true, "verified_result": "Deployment Verified"}',
      },
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult(currentTab.simulatedOutput.response);
    }, 600);
  };

  return (
    <div className="w-full my-12 rounded-2xl bg-[#090a0f] border border-zinc-800/90 shadow-2xl overflow-hidden">
      {/* Top Header & Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800/90 bg-[#06070a] px-4 py-3 gap-3">
        {/* Window controls & label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-zinc-400 font-semibold pl-2 border-l border-zinc-800">
            SYSTEM ARCHITECTURE & CODE BENCH
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setSimulationResult(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-zinc-800 text-white font-semibold shadow-inner border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                {tab.title.split("&")[0].trim()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Details Sub-bar */}
      <div className="px-5 py-3 bg-[#0a0c12]/80 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 font-mono text-[11px]">
            {currentTab.badge}
          </span>
          <span className="text-zinc-400 font-mono text-[11px] hidden sm:inline">
            Latency Target: <span className="text-white font-semibold">{currentTab.latency}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulate Action */}
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-mono transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? "Executing..." : "Test Simulation"}</span>
          </button>

          {/* Copy Snippet */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-zinc-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Code Content */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-[#07080c] overflow-x-auto text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
          <pre className="selection:bg-cyan-500/30 selection:text-white">
            <code>{currentTab.code}</code>
          </pre>
        </div>

        {/* Live Simulation Output & Architectural Context */}
        <div className="lg:col-span-4 p-5 bg-[#090b10] border-t lg:border-t-0 lg:border-l border-zinc-800/80 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENGINEERING RATIONALE</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-5">
              {currentTab.description}
            </p>

            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>TELEMETRY BENCHMARK</span>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/90 text-xs font-mono space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">{currentTab.simulatedOutput.status}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Metrics:</span>
                <span className="text-zinc-200">{currentTab.simulatedOutput.metrics}</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Response Output */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
              LIVE SIMULATION OUTPUT
            </div>
            <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-cyan-300 break-all">
              {simulationResult || currentTab.simulatedOutput.response}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureCodeSandbox;
