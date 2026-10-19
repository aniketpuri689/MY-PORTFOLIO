"use client";

import React from "react";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  category?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  title,
  subtitle,
  category = "SYSTEM_NODE"
}) => {
  return (
    <div className="flex flex-col gap-2 mb-12 sm:mb-16">
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400 uppercase">
        <span className="text-zinc-500">[{index}]</span>
        <span className="w-8 h-[1px] bg-zinc-800" />
        <span>{category}</span>
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm md:text-base font-mono text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
