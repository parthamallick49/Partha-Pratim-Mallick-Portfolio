'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, ProjectData } from '@/data/portfolioData';
import { StationScenery } from '@/components/world/StationScenery';
import { ExternalLink, Copy, Check, ChevronDown, ChevronUp, Terminal, Code2 } from 'lucide-react';
import { soundEngine } from '@/lib/audioSynthesizer';
import { useToast } from '@/hooks/use-toast';

interface StationProps {
  isNight?: boolean;
}

export function Station3Bridge({ isNight = false }: StationProps) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(PROJECTS[0].id);

  const handleCopyClone = (project: ProjectData) => {
    soundEngine.playTelegraphKey();
    navigator.clipboard.writeText(project.cloneCommand);
    setCopiedId(project.id);
    toast({
      title: 'Terminal Command Copied!',
      description: project.cloneCommand,
      duration: 3000,
    });
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="station-3"
      className="relative min-h-[95vh] flex flex-col justify-center items-center py-16 px-4 max-w-6xl mx-auto"
    >
      {/* Background Suspension Bridge Scenery */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-lg z-0 opacity-40 sm:opacity-60 pointer-events-none">
        <StationScenery type="suspension-bridge" isNight={isNight} />
      </div>

      {/* Station Plaque */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rail-orange/40 bg-rail-orange/10 text-rail-orange text-xs font-mono font-semibold uppercase tracking-widest mb-3">
          <span>Station 03 • Canyon Viaduct (MP 32.4)</span>
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-rail-vanilla drop-shadow-md">
          Innovation Valley Suspension Bridge
        </h2>
        <p className="font-mono text-xs sm:text-sm text-rail-vanilla/70 mt-2 tracking-wide">
          FOUR FEATURED PROJECT PAVILIONS • 1-CLICK GIT CLONE TERMINAL INTEGRATION
        </p>
      </div>

      {/* Project Pavilions List */}
      <div className="relative z-10 w-full space-y-6">
        {PROJECTS.map((project, idx) => {
          const isExpanded = expandedId === project.id;
          const isCopied = copiedId === project.id;

          return (
            <div
              key={project.id}
              className="rounded-2xl border border-rail-teal/40 bg-rail-midnight/85 backdrop-blur-md overflow-hidden shadow-2xl transition-all"
            >
              {/* Main Card Summary Bar */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Project Image Thumbnail */}
                <div className="lg:col-span-3 flex justify-center">
                  <div className="relative w-full max-w-[200px] h-36 rounded-xl overflow-hidden border border-rail-teal/40 bg-rail-midnight shadow-md">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-rail-teal/20 text-rail-vanilla">
                        <Code2 className="w-8 h-8 text-rail-gold" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rail-midnight/90 border border-rail-gold/40 text-[10px] font-mono font-bold text-rail-gold">
                      Span 0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Project Overview & Info */}
                <div className="lg:col-span-6 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rail-orange/20 border border-rail-orange/40 text-rail-orange">
                      {project.year}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-rail-vanilla">{project.title}</h3>
                  </div>

                  <p className="text-xs font-mono text-rail-gold">{project.subtitle}</p>
                  <p className="text-sm text-rail-vanilla/80 leading-relaxed font-sans">{project.overview}</p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rail-teal/20 border border-rail-teal/40 text-rail-vanilla"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Git Clone Trigger */}
                <div className="lg:col-span-3 flex flex-col gap-2.5 justify-center">
                  {/* Copy git clone terminal button */}
                  <button
                    type="button"
                    onClick={() => handleCopyClone(project)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-rail-midnight border border-rail-gold/40 hover:border-rail-gold text-rail-vanilla font-mono text-xs transition-all shadow-sm group"
                    title="Click to copy git clone command"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Terminal className="w-3.5 h-3.5 text-rail-gold group-hover:text-rail-orange transition-colors" />
                      <span className="truncate text-[11px] text-rail-vanilla/80">git clone ...</span>
                    </div>
                    {isCopied ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-rail-gold/70 group-hover:text-rail-gold" />
                    )}
                  </button>

                  {/* GitHub Repo Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rail-teal/25 hover:bg-rail-teal/40 border border-rail-teal/50 text-rail-vanilla font-mono text-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-rail-orange" />
                    <span>View Repository</span>
                  </a>

                  {/* Expand Architecture Specs Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(project.id)}
                    className="w-full flex items-center justify-center gap-1 text-[11px] font-mono text-rail-vanilla/60 hover:text-rail-vanilla transition-colors pt-1"
                  >
                    <span>{isExpanded ? 'Hide Architecture Specs' : 'View Architecture Specs'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Production Architecture Specs */}
              {isExpanded && (
                <div className="border-t border-rail-teal/30 bg-rail-midnight/95 px-6 py-4">
                  <h4 className="text-xs font-mono uppercase text-rail-gold font-bold tracking-wider mb-2">
                    Key Production Architecture Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-rail-vanilla/85">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-rail-orange font-bold font-mono">▸</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
