'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/portfolioData';
import { ExternalLink, Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/audioSynthesizer';
import { useToast } from '@/hooks/use-toast';

interface StationProps {
  isNight?: boolean;
}

export function Station3Bridge({ isNight = false }: StationProps) {
  const { toast } = useToast();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const project = PROJECTS[selectedProjectIndex] || PROJECTS[0];

  const handleCopyClone = () => {
    soundEngine.playTelegraphKey();
    navigator.clipboard.writeText(project.cloneCommand);
    setCopied(true);
    toast({
      title: 'Terminal Snippet Copied!',
      description: project.cloneCommand,
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="station-3"
      className="relative w-full max-w-3xl xl:max-w-4xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl space-y-3.5 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-orange/15 border border-rail-orange/40 text-rail-orange font-bold text-[11px]">
              STATION 03 • MP 32.4
            </span>
            <span className="text-rail-gold/80 font-mono text-[10px]">CANYON VIADUCT</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
            Innovation Valley Bridge
          </h2>
        </div>
        <p className="font-mono text-[11px] text-rail-gold sm:text-right">
          4 BRIDGE PAVILIONS • 1-CLICK GIT CLONE
        </p>
      </div>

      {/* Project Span Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {PROJECTS.map((p, idx) => {
          const isSelected = selectedProjectIndex === idx;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                soundEngine.playTrackClack();
                setSelectedProjectIndex(idx);
              }}
              className={`px-2.5 py-1.5 rounded-xl text-center font-mono text-[11px] transition-all truncate ${
                isSelected
                  ? 'bg-rail-orange text-rail-vanilla font-bold shadow-md shadow-rail-orange/30'
                  : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
              }`}
            >
              <span className="block text-[8.5px] opacity-75">Span 0{idx + 1}</span>
              <span className="truncate block font-semibold">{p.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Project Pavilion Display (Wide 2-Column Split) */}
      <div className="rounded-xl border border-rail-teal/30 bg-rail-teal/10 p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Column: Title, Overview, Tech Stack & Action Links (7 cols) */}
        <div className="md:col-span-7 space-y-2.5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rail-orange/20 border border-rail-orange/40 text-rail-orange">
                {project.year}
              </span>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-rail-vanilla">
                {project.title}
              </h3>
            </div>
            <p className="text-xs font-mono text-rail-gold">{project.subtitle}</p>
          </div>

          <p className="text-xs text-rail-vanilla/85 leading-relaxed font-sans">
            {project.overview}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[9.5px] font-mono bg-rail-midnight/80 border border-rail-teal/30 text-rail-vanilla"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={handleCopyClone}
              className="w-full sm:flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rail-midnight/90 border border-rail-teal/40 hover:border-rail-gold text-rail-vanilla font-mono text-xs transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-rail-orange" />
              <span className="truncate">{copied ? 'COPIED TO CLIPBOARD' : project.cloneCommand}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-rail-gold shrink-0" />}
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs font-bold transition-all shrink-0"
              >
                <span>Inspect Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Preview Thumbnail & Key Features (5 cols) */}
        <div className="md:col-span-5 space-y-2.5">
          {project.image && (
            <div className="relative w-full h-28 sm:h-32 rounded-lg overflow-hidden border border-rail-gold/40 bg-rail-midnight shadow-md">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top filter saturate-105"
              />
            </div>
          )}

          <div className="p-2.5 rounded-lg bg-rail-midnight/80 border border-rail-teal/20 space-y-1.5">
            <span className="block text-[9.5px] font-mono text-rail-gold uppercase font-bold">
              Key Architecture Features:
            </span>
            <ul className="space-y-1 text-xs text-rail-vanilla/85">
              {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-1.5">
                  <span className="text-rail-orange font-bold font-mono">▸</span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
