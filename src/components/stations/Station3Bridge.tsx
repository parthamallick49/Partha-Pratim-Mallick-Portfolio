'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/portfolioData';
import { ExternalLink, Copy, Check, Terminal, Code2 } from 'lucide-react';
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
      className="relative w-full max-w-xl lg:max-w-2xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-3">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-orange/15 border border-rail-orange/40 text-rail-orange font-bold">
            STATION 03 • MP 32.4
          </span>
          <span className="text-rail-gold/80 font-mono text-[11px]">CANYON VIADUCT</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-rail-vanilla">
          Innovation Valley Bridge
        </h2>
        <p className="font-mono text-xs text-rail-gold mt-0.5">
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
              className={`px-2.5 py-2 rounded-xl text-center font-mono text-[11px] transition-all truncate ${
                isSelected
                  ? 'bg-rail-orange text-rail-vanilla font-bold shadow-md shadow-rail-orange/30'
                  : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
              }`}
            >
              <span className="block text-[9px] opacity-75">Span 0{idx + 1}</span>
              <span className="truncate block font-semibold">{p.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Project Pavilion Display */}
      <div className="rounded-xl border border-rail-teal/30 bg-rail-teal/10 p-4 space-y-3">
        {/* Project Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rail-orange/20 border border-rail-orange/40 text-rail-orange">
                {project.year}
              </span>
              <h3 className="font-editorial text-xl font-bold text-rail-vanilla">{project.title}</h3>
            </div>
            <p className="text-xs font-mono text-rail-gold">{project.subtitle}</p>
          </div>

          {/* Thumbnail preview */}
          {project.image && (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-rail-gold/40 shrink-0 bg-rail-midnight">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
              />
            </div>
          )}
        </div>

        {/* Overview text */}
        <p className="text-xs text-rail-vanilla/85 leading-relaxed font-sans">
          {project.overview}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-rail-midnight/80 border border-rail-teal/30 text-rail-vanilla"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Production Highlights */}
        <div className="pt-1 border-t border-rail-teal/20">
          <span className="block text-[10px] font-mono text-rail-gold uppercase font-bold mb-1.5">
            Key Architecture Features:
          </span>
          <ul className="space-y-1 text-xs text-rail-vanilla/80">
            {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
              <li key={fIdx} className="flex items-start gap-1.5">
                <span className="text-rail-orange font-bold font-mono">▸</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Row: 1-Click Git Clone & Repository Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
          {/* Copy Git Clone Snippet Button */}
          <button
            type="button"
            onClick={handleCopyClone}
            className="w-full sm:flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-rail-midnight border border-rail-gold/50 hover:border-rail-gold text-rail-vanilla font-mono text-xs transition-all shadow-sm group"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3.5 h-3.5 text-rail-gold group-hover:text-rail-orange" />
              <span className="truncate text-[11px] text-rail-vanilla/80">{project.cloneCommand}</span>
            </div>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold shrink-0 ml-2">
                <Check className="w-3.5 h-3.5" />
                Copied!
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-rail-gold/70 group-hover:text-rail-gold shrink-0 ml-2" />
            )}
          </button>

          {/* Repo Link */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rail-teal/30 hover:bg-rail-teal/50 border border-rail-teal/50 text-rail-vanilla font-mono text-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rail-orange" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
