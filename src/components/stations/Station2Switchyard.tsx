'use client';

import React, { useState } from 'react';
import { TECH_TRACKS, TechSkill } from '@/data/portfolioData';
import { StationScenery } from '@/components/world/StationScenery';
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
  SiGithub,
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
  const [activeSkill, setActiveSkill] = useState<TechSkill | null>(null);

  // Helper to map iconId to the react-icon component
  const renderBrandIcon = (iconId: string, className = 'w-6 h-6') => {
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
        return <Layers className="w-4 h-4 text-rail-orange" />;
      case 'backend-api':
        return <Cpu className="w-4 h-4 text-rail-gold" />;
      case 'db-cloud':
        return <Box className="w-4 h-4 text-rail-teal-light" />;
      case 'tools-devops':
        return <Wrench className="w-4 h-4 text-rail-orange" />;
      default:
        return <Terminal className="w-4 h-4 text-rail-vanilla" />;
    }
  };

  return (
    <section
      id="station-2"
      className="relative w-full max-w-2xl p-2 sm:p-4"
    >
      {/* Station Plaque */}
      <div className="relative z-10 mb-4 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rail-gold/40 bg-rail-gold/10 text-rail-gold text-xs font-mono font-semibold uppercase tracking-widest mb-2">
          <span>Station 02 • Industrial Junction (MP 14.8)</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-rail-vanilla drop-shadow-md">
          The Foundry & Switchyard
        </h2>
        <p className="font-mono text-xs text-rail-gold mt-1 tracking-wide">
          FOUR SIGNAL TRACKS • CARGO TECH MANIFEST
        </p>
      </div>

      {/* 4 Tracks Cargo Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {TECH_TRACKS.map((track) => (
          <div
            key={track.id}
            className="rounded-2xl border border-rail-teal/40 bg-rail-midnight/85 backdrop-blur-md p-5 sm:p-6 shadow-xl flex flex-col justify-between"
          >
            {/* Track Header with Rail Gantry Style */}
            <div className="border-b border-rail-teal/30 pb-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/40">
                  {getTrackIcon(track.id)}
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-rail-vanilla">{track.title}</h3>
                  <span className="text-[11px] font-mono text-rail-gold uppercase tracking-wider">{track.trackName}</span>
                </div>
              </div>
            </div>

            {/* Cargo Badges Container Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {track.skills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onMouseEnter={() => {
                    setActiveSkill(skill);
                    soundEngine.playTrackClack();
                  }}
                  onClick={() => setActiveSkill(skill)}
                  className="group relative p-3 rounded-xl border border-rail-teal/30 bg-rail-teal/10 hover:bg-rail-teal/25 hover:border-rail-gold/60 transition-all text-left flex flex-col items-center justify-center gap-2 shadow-sm"
                >
                  {/* Brand Icon with hover color transition */}
                  <div
                    className="p-2 rounded-lg bg-rail-midnight/80 border border-rail-teal/20 text-rail-vanilla transition-transform duration-300 group-hover:scale-110"
                    style={{
                      color: activeSkill?.name === skill.name ? skill.officialColor : undefined,
                    }}
                  >
                    {renderBrandIcon(skill.iconId, 'w-6 h-6')}
                  </div>
                  <span className="text-xs font-semibold text-rail-vanilla text-center group-hover:text-rail-gold transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[9px] font-mono text-rail-vanilla/60 bg-rail-midnight/60 px-1.5 py-0.5 rounded border border-rail-teal/20">
                    {skill.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active Skill Telemetry Cargo Drawer (Inspect selected cargo) */}
      <div className="relative z-10 w-full mt-6 rounded-xl border border-rail-gold/40 bg-rail-midnight/90 backdrop-blur-md p-4 text-rail-vanilla flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rail-gold/15 border border-rail-gold/30 text-rail-gold">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-rail-gold font-bold">
              CARGO INSPECTION MANIFEST
            </div>
            <div className="text-sm font-semibold text-rail-vanilla">
              {activeSkill ? (
                <span>
                  <strong className="text-rail-orange">{activeSkill.name}</strong> — {activeSkill.description}
                </span>
              ) : (
                <span className="text-rail-vanilla/65">Hover or tap any cargo badge above to read technical manifest specs.</span>
              )}
            </div>
          </div>
        </div>

        {activeSkill && (
          <span className="text-[11px] font-mono px-3 py-1 rounded bg-rail-teal/30 border border-rail-teal/40 text-rail-vanilla">
            Official Palette: {activeSkill.officialColor}
          </span>
        )}
      </div>
    </section>
  );
}
