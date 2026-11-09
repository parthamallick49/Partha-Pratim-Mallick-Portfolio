'use client';

import React, { useState } from 'react';
import { TECH_TRACKS, TechSkill } from '@/data/portfolioData';
import { Layers, Cpu, Box, Wrench, Sparkles, Terminal } from 'lucide-react';

// Brand icons
import {
  SiFlutter,
  SiDart,
  SiAndroid,
  SiDotnet,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiAndroidstudio,
  SiPostman,
  SiFigma,
  SiPython,
  SiReact,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { soundEngine } from '@/lib/audioSynthesizer';

interface StationProps {
  isNight?: boolean;
}

export function Station2Switchyard({ isNight = false }: StationProps) {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const activeTrack = TECH_TRACKS[selectedTrackIndex] || TECH_TRACKS[0];
  const [activeSkill, setActiveSkill] = useState<TechSkill | null>(activeTrack.skills[0]);

  const renderBrandIcon = (iconId: string, className = 'w-5 h-5') => {
    switch (iconId) {
      case 'flutter':
        return <SiFlutter className={className} />;
      case 'dart':
        return <SiDart className={className} />;
      case 'android':
        return <SiAndroid className={className} />;
      case 'java':
        return <FaJava className={className} />;
      case 'react':
        return <SiReact className={className} />;
      case 'dotnet':
        return <SiDotnet className={className} />;
      case 'python':
        return <SiPython className={className} />;
      case 'sqlserver':
        return <span className={`font-mono font-bold text-xs ${className}`}>SQL</span>;
      case 'mysql':
        return <SiMysql className={className} />;
      case 'mongodb':
        return <SiMongodb className={className} />;
      case 'firebase':
        return <SiFirebase className={className} />;
      case 'postgresql':
        return <SiPostgresql className={className} />;
      case 'docker':
        return <SiDocker className={className} />;
      case 'git':
        return <SiGit className={className} />;
      case 'androidstudio':
        return <SiAndroidstudio className={className} />;
      case 'postman':
        return <SiPostman className={className} />;
      case 'figma':
        return <SiFigma className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'mobile-frontend':
        return <Layers className="w-3.5 h-3.5" />;
      case 'backend-api':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'db-cloud':
        return <Box className="w-3.5 h-3.5" />;
      case 'tools-devops':
        return <Wrench className="w-3.5 h-3.5" />;
      default:
        return <Terminal className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="station-2"
      className="relative w-full max-w-3xl xl:max-w-4xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl space-y-3.5 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-gold/15 border border-rail-gold/40 text-rail-gold font-bold text-[11px]">
              STATION 02 • MP 14.8
            </span>
            <span className="text-rail-vanilla/60 font-mono text-[10px]">SWITCHYARD GANTRY</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
            The Foundry & Switchyard
          </h2>
        </div>
        <p className="font-mono text-[11px] text-rail-gold sm:text-right">
          TECHNICAL STACKS • 4 SIGNAL TRACKS
        </p>
      </div>

      {/* Track Selector Bar (Tabs) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {TECH_TRACKS.map((track, idx) => {
          const isSelected = selectedTrackIndex === idx;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => {
                soundEngine.playTrackClack();
                setSelectedTrackIndex(idx);
                setActiveSkill(track.skills[0]);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-rail-orange text-rail-vanilla font-bold shadow-md shadow-rail-orange/30'
                  : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/35'
              }`}
            >
              {getTrackIcon(track.id)}
              <span>{track.title}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Wide Console Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
        {/* Left Column: Cargo Badges Grid (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-3 gap-2">
          {activeTrack.skills.map((skill) => {
            const isInspected = activeSkill?.name === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => {
                  setActiveSkill(skill);
                  soundEngine.playTrackClack();
                }}
                onClick={() => setActiveSkill(skill)}
                className={`group p-2.5 rounded-xl border transition-all text-left flex flex-col items-center justify-center gap-1 ${
                  isInspected
                    ? 'bg-rail-teal/30 border-rail-gold shadow-md shadow-rail-gold/20 scale-102'
                    : 'bg-rail-teal/10 border-rail-teal/30 hover:bg-rail-teal/20 hover:border-rail-teal/50'
                }`}
              >
                <div
                  className="p-1.5 rounded-lg bg-rail-midnight/80 border border-rail-teal/20 transition-transform group-hover:scale-110"
                  style={{
                    color: isInspected ? skill.officialColor : undefined,
                  }}
                >
                  {renderBrandIcon(skill.iconId, 'w-5 h-5')}
                </div>
                <span className="text-xs font-semibold text-rail-vanilla text-center truncate max-w-full">
                  {skill.name}
                </span>
                <span className="text-[8.5px] font-mono text-rail-vanilla/60 bg-rail-midnight/60 px-1 py-0.5 rounded">
                  {skill.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Cargo Inspection Drawer (5 cols) */}
        <div className="md:col-span-5 h-full">
          {activeSkill ? (
            <div className="p-3.5 rounded-xl border border-rail-gold/30 bg-rail-midnight/90 text-rail-vanilla space-y-2 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-rail-gold mb-1">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-rail-gold" />
                    CARGO SPEC
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-rail-teal/20 text-rail-teal-light text-[9px]">
                    {activeTrack.trackName}
                  </span>
                </div>
                <h4 className="font-editorial text-lg font-bold text-rail-vanilla">
                  {activeSkill.name}
                </h4>
                <p className="text-xs text-rail-vanilla/85 font-sans leading-relaxed mt-1">
                  {activeSkill.description}
                </p>
              </div>

              <div className="pt-2 border-t border-rail-teal/20 flex items-center justify-between text-[10px] font-mono text-rail-vanilla/70">
                <span>Freight Classification:</span>
                <span className="text-rail-orange font-bold">{activeSkill.badge}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-rail-teal/20 bg-rail-midnight/50 text-rail-vanilla/50 text-xs font-mono text-center">
              Hover over any badge to inspect cargo specifications
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
