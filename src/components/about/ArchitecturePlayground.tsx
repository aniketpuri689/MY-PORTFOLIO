"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Layout,
  Server,
  Brain,
  Bot,
  CheckCircle2,
  Zap,
  Code2,
  ChevronRight,
  Sparkles,
  MousePointerClick
} from "lucide-react";

interface JourneyStage {
  id: string;
  stepNumber: string;
  phaseLabel: string;
  narrative: string;
  name: string;
  category: string;
  badge: string;
  latency: string;
  icon: React.ReactNode;
  accentColor: string;
  borderActive: string;
  bgActive: string;
  textAccent: string;
  glowColor: string;
  details: string;
  technologies: string[];
  codePreview: string;
  statusText: string;
}

export const ArchitecturePlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [displayProgress, setDisplayProgress] = useState<number>(0);

  // References for smooth scroll interpolation and click preservation
  const targetProgressRef = useRef<number>(0);
  const displayProgressRef = useRef<number>(0);
  const lastClickTimeRef = useRef<number>(0);
  const lastClickScrollYRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const stages: JourneyStage[] = [
    {
      id: "frontend",
      stepNumber: "01",
      phaseLabel: "PHASE 01 // INCEPTION",
      narrative: "How a Project Starts",
      name: "React & Next.js Reactive Client",
      category: "PRESENTATION & UI",
      badge: "Next.js 15 & React 19",
      latency: "8ms Hydration",
      icon: <Layout className="w-5 h-5 text-cyan-400" />,
      accentColor: "cyan",
      borderActive: "border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.3)]",
      bgActive: "bg-cyan-950/40",
      textAccent: "text-cyan-400",
      glowColor: "rgba(0, 240, 255, 0.15)",
      details:
        "Every project begins with a resilient, reactive user interface. Architected with Next.js 15 App Router, React Server Components, and strict TypeScript types to deliver instantaneous hydration, reactive state management, and kinetic canvas visuals ready to capture user intentions.",
      technologies: ["React 19", "Next.js 15 App Router", "TypeScript 5", "Tailwind CSS", "Canvas & UI State"],
      codePreview: `// 01. Inception: Type-Safe React & Next.js Client
export default function IntelligentWorkspace() {
  const [prompt, setPrompt] = useState<InputState>();
  return <ReactiveStream payload={prompt} onStream={handleDispatch} />;
}`,
      statusText: "CLIENT HYDRATED & LISTENING"
    },
    {
      id: "ml",
      stepNumber: "02",
      phaseLabel: "PHASE 02 // INTELLIGENCE",
      narrative: "How ML & Vision is Done",
      name: "Machine Learning & Vision Pipeline",
      category: "COMPUTE & MODELING",
      badge: "OpenCV & Scikit-Learn",
      latency: "22ms Inference",
      icon: <Brain className="w-5 h-5 text-indigo-400" />,
      accentColor: "indigo",
      borderActive: "border-indigo-400 shadow-[0_0_35px_rgba(99,102,241,0.3)]",
      bgActive: "bg-indigo-950/40",
      textAccent: "text-indigo-400",
      glowColor: "rgba(99, 102, 241, 0.15)",
      details:
        "Once user inputs and data streams are captured, the intelligence pipeline is engineered. Raw visual and textual data undergo OpenCV feature extraction, TF-IDF / vector cosine matrix transformations, and machine learning models to detect patterns, classify signals, and generate dense embeddings.",
      technologies: ["Machine Learning", "OpenCV", "Scikit-Learn", "Feature Vectors", "NumPy & Cosine"],
      codePreview: `# 02. Intelligence: OpenCV Feature Extraction & ML
def compute_embeddings(stream_frame: np.ndarray) -> FeatureVector:
    features = cv2.extract_dense_biometrics(stream_frame)
    return ml_model.predict_latent_vector(features)`,
      statusText: "INFERENCE PIPELINE ACTIVE"
    },
    {
      id: "backend",
      stepNumber: "03",
      phaseLabel: "PHASE 03 // ORCHESTRATION",
      narrative: "FastAPI & Uvicorn Async Gateway",
      name: "FastAPI & Uvicorn Async Gateway",
      category: "BACKEND & TRANSPORT",
      badge: "FastAPI & Uvicorn ASGI",
      latency: "4ms Coroutines",
      icon: <Server className="w-5 h-5 text-sky-400" />,
      accentColor: "sky",
      borderActive: "border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.3)]",
      bgActive: "bg-sky-950/40",
      textAccent: "text-sky-400",
      glowColor: "rgba(56, 189, 248, 0.15)",
      details:
        "Bridging the frontend client with the machine learning models and agentic engines. An asynchronous ASGI backend powered by Uvicorn and FastAPI handles high-concurrency requests, Pydantic type validation, streaming WebSockets, and low-latency IPC to pipe data between services with near-zero overhead.",
      technologies: ["FastAPI", "Uvicorn ASGI", "AsyncIO Coroutines", "Pydantic V2", "WebSockets"],
      codePreview: `# 03. Backend: Async Gateway & Real-Time Bridge
@app.post("/api/v1/orchestrate", response_model=PipelinePayload)
async def dispatch_bridge(request: RequestState):
    return StreamingResponse(bridge.serve_coroutine(request))`,
      statusText: "ASYNC ASGI GATEWAY STREAMING"
    },
    {
      id: "agents",
      stepNumber: "04",
      phaseLabel: "PHASE 04 // AGENTIC ACTION",
      narrative: "How AI Agents Execute",
      name: "Autonomous AI Agents & Tool Calling",
      category: "AUTONOMOUS EXECUTION",
      badge: "Agentic Reasoning Loops",
      latency: "Self-Correcting",
      icon: <Bot className="w-5 h-5 text-emerald-400" />,
      accentColor: "emerald",
      borderActive: "border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.3)]",
      bgActive: "bg-emerald-950/40",
      textAccent: "text-emerald-400",
      glowColor: "rgba(52, 211, 153, 0.15)",
      details:
        "The ultimate destination: autonomous AI agents taking decisive action. Multi-agent loops observe inputs, formulate dynamic plans, invoke external tools and APIs, self-correct errors in flight, and coordinate multi-agent workflows to fulfill complex mission objectives autonomously.",
      technologies: ["Agentic AI", "Multi-Agent Loops", "Dynamic Tool Calling", "Self-Correction", "Structured I/O"],
      codePreview: `// 04. Execution: Multi-Agent Autonomous Loop
const agent = new AgenticDispatcher({ tools: [Terminal, API, DB] });
const outcome = await agent.runLoopUntilGoalVerified(missionContext);`,
      statusText: "AUTONOMOUS AGENTS DISPATCHED"
    }
  ];

  // User click on any of the 4 cards: immediately switches content smoothly
  const handleCardClick = useCallback((index: number) => {
    setActiveStep(index);
    lastClickTimeRef.current = Date.now();
    lastClickScrollYRef.current = typeof window !== "undefined" ? window.scrollY : 0;
    targetProgressRef.current = (index + 0.5) / 4;
  }, []);

  // Continuous smooth interpolation animation loop (lerp)
  useEffect(() => {
    const updateProgressLoop = () => {
      const current = displayProgressRef.current;
      const target = targetProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        const nextVal = current + diff * 0.12;
        displayProgressRef.current = nextVal;
        if (Math.round(nextVal * 100) !== Math.round(current * 100)) {
          setDisplayProgress(nextVal);
        }
      }

      rafIdRef.current = requestAnimationFrame(updateProgressLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateProgressLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Viewport scroll handler with smooth hysteresis and click lock
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Check if user recently clicked a card (within 2.5s) and hasn't scrolled more than 80px
      const now = Date.now();
      const timeSinceClick = now - lastClickTimeRef.current;
      const scrollDelta = Math.abs(window.scrollY - lastClickScrollYRef.current);

      if (timeSinceClick < 2500 && scrollDelta < 80) {
        // User deliberately clicked a card to inspect it; hold selection
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Perfectly balanced scroll progression between too fast and too slow:
      // Starts as the playground centers into view (approx 45% of viewport height)
      // Completes naturally when the cards reach the upper viewing area (approx -35% of container height)
      const start = windowHeight * 0.45;
      const end = -rect.height * 0.35;
      const totalDistance = Math.max(1, start - end);
      const currentDistance = start - rect.top;

      const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
      targetProgressRef.current = progress;

      // Balanced stage transitions with hysteresis for silky smooth scroll feel
      setActiveStep((prevStep) => {
        if (prevStep === 0 && progress > 0.26) return 1;
        if (prevStep === 1) {
          if (progress < 0.20) return 0;
          if (progress > 0.52) return 2;
        }
        if (prevStep === 2) {
          if (progress < 0.46) return 1;
          if (progress > 0.76) return 3;
        }
        if (prevStep === 3 && progress < 0.70) return 2;

        // Clean fallbacks for fast scrubs
        if (progress <= 0.25) return 0;
        if (progress <= 0.50) return 1;
        if (progress <= 0.75) return 2;
        return 3;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const currentStage = stages[activeStep] || stages[0];

  return (
    <div
      ref={containerRef}
      className="w-full p-6 sm:p-8 rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-950 via-[#06080e] to-zinc-950 relative overflow-hidden my-12 shadow-2xl transition-all"
    >
      {/* Dynamic Cyber Ambient Glow */}
      <div
        className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
          activeStep === 0
            ? "bg-cyan-500/10"
            : activeStep === 1
            ? "bg-indigo-500/10"
            : activeStep === 2
            ? "bg-sky-500/10"
            : "bg-emerald-500/10"
        }`}
      />

      {/* Header & Status Indicator */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>FULL-STACK ARCHITECTURAL LIFECYCLE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-white">
            End-to-End System Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5">
            Scroll down or click any of the 4 cards to inspect the journey from frontend inception to autonomous AI agents.
          </p>
        </div>

        {/* Live Automatic Scroll-Driven Telemetry Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                ACTIVE STAGE:
              </span>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                STAGE 0{activeStep + 1} {"//"} {currentStage.narrative}
              </span>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/70 border border-cyan-700/60 text-cyan-200">
              {Math.round(displayProgress * 100)}%
            </span>
          </div>
        </div>
      </div>


      {/* 4 Connected Pipeline Stages (Clickable + Animated) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative">
        {stages.map((stage, index) => {
          const isCurrentActive = activeStep === index;
          const isPassed = activeStep > index;

          return (
            <div
              key={stage.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(index);
                }
              }}
              className={`cursor-pointer select-none relative p-5 rounded-2xl border transition-all duration-300 ease-out flex flex-col justify-between group active:scale-[0.98] ${
                isCurrentActive
                  ? `${stage.borderActive} ${stage.bgActive} scale-[1.02] -translate-y-1`
                  : isPassed
                  ? "border-zinc-700/80 bg-zinc-900/60 hover:border-zinc-500 hover:bg-zinc-900/80"
                  : "border-zinc-800/80 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-900/40"
              }`}
            >
              <div>
                {/* Step indicator & status badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {stage.phaseLabel}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                      isCurrentActive
                        ? "bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                        : isPassed
                        ? "bg-zinc-800 text-zinc-300 font-medium"
                        : "bg-zinc-900 text-zinc-500"
                    }`}
                  >
                    {isPassed ? "PASSED" : stage.latency}
                  </span>
                </div>

                {/* Subtitle / Narrative Tag */}
                <div className="text-[11px] font-mono text-cyan-300/80 font-medium mb-1">
                  {stage.narrative}
                </div>

                {/* Stage Title & Icon */}
                <div className="flex items-start gap-3 my-2">
                  <div
                    className={`p-2 rounded-xl border transition-all duration-300 ${
                      isCurrentActive
                        ? "bg-zinc-900 border-white/20 scale-105"
                        : "bg-zinc-900/70 border-zinc-800 group-hover:border-zinc-600"
                    }`}
                  >
                    {stage.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-sans text-white leading-tight">
                      {stage.name}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {stage.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Click prompt & status pulse bar */}
              <div className="mt-4 pt-2 border-t border-zinc-800/40">
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span
                    className={`flex items-center gap-1 transition-colors ${
                      isCurrentActive ? "text-cyan-400 font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    <MousePointerClick className="w-3 h-3" />
                    {isCurrentActive ? "ACTIVE STAGE" : "CLICK TO VIEW"}
                  </span>
                  {index < 3 && (
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-colors hidden sm:inline ${
                        isCurrentActive ? "text-cyan-400 animate-pulse" : "text-zinc-600"
                      }`}
                    />
                  )}
                </div>

                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ease-out rounded-full ${
                      isCurrentActive
                        ? "w-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                        : isPassed
                        ? "w-full bg-zinc-600"
                        : "w-0 bg-transparent"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection & Code Architecture Console (Smooth animated transition) */}
      <div
        key={activeStep}
        className="animate-pipeline-fade p-6 rounded-2xl border border-zinc-800 bg-[#0b0d13]/90 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-inner transition-all duration-500"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>INSPECTING STAGE {currentStage.stepNumber}: {currentStage.name}</span>
          </div>
          <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-4">
            {currentStage.details}
          </p>

          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>STACK PRIMITIVES & CAPABILITIES</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentStage.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-cyan-300 shadow-sm transition-transform hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Architecture Code Preview */}
        <div className="w-full lg:w-96 rounded-xl border border-zinc-800/90 bg-black/70 p-4 font-mono text-xs overflow-x-auto shadow-2xl transition-all">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 text-[10px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentStage.category}</span>
            </div>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ACTIVE
            </span>
          </div>

          <pre className="text-[11px] leading-relaxed text-zinc-300 overflow-x-auto font-mono">
            <code>{currentStage.codePreview}</code>
          </pre>

          <div className="mt-3 pt-2 border-t border-zinc-800/70 flex items-center justify-between text-[10px] text-zinc-500">
            <span>STATUS</span>
            <span className="text-cyan-400 font-bold">{currentStage.statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePlayground;
