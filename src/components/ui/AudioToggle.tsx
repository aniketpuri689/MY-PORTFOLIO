"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (typeof window === "undefined") return;

    let nextState = false;

    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime); // very subtle ambient level
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Sub-bass fundamental oscillator (55Hz, A1)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      // Warm harmonic (110Hz, A2)
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110.2, ctx.currentTime);

      // Lowpass Filter for deep warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(160, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();
      nextState = true;
    } else {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
        nextState = true;
      } else if (audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
        nextState = false;
      }
    }

    setIsPlaying(nextState);
    (window as unknown as { __ATMOSPHERE_ACTIVE__?: boolean }).__ATMOSPHERE_ACTIVE__ = nextState;
    window.dispatchEvent(new CustomEvent("atmosphere-toggle", { detail: { active: nextState } }));
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      id="btn-audio-toggle"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-all duration-200 border ${
        isPlaying
          ? "border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] font-semibold"
          : "border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
      }`}
      title={isPlaying ? "Atmosphere Active: Orbs Playable on Hover" : "Click to activate Playable Atmosphere & Audio"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>ATMOSPHERE: PLAYABLE</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
          <span>ATMOSPHERE: OFF</span>
        </>
      )}
    </button>
  );
};
