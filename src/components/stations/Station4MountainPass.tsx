'use client';

import React, { useState } from 'react';
import { WORK_EXPERIENCES } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Milestone } from 'lucide-react';
import { soundEngine } from '@/lib/audioSynthesizer';

interface StationProps {
  isNight?: boolean;
}

export function Station4MountainPass({ isNight = false }: StationProps) {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const currentExp = WORK_EXPERIENCES[selectedRoleIndex] || WORK_EXPERIENCES[0];

  return (
    <section
      id="station-4"
      className="relative w-full max-w-xl lg:max-w-2xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-3">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-teal-light/20 border border-rail-teal-light/40 text-rail-teal-light font-bold">
            <Milestone className="w-3.5 h-3.5 text-rail-orange" />
            STATION 04 • MP 56.1
          </span>
          <span className="text-rail-gold/80 font-mono text-[11px]">ALPINE SWITCHBACK</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-rail-vanilla">
          The Mountain Pass
        </h2>
        <p className="font-mono text-xs text-rail-gold mt-0.5">
          ENGINEERING MILESTONES • GRAMEEN COMMUNICATIONS
        </p>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 gap-2">
        {WORK_EXPERIENCES.map((exp, idx) => {
          const isSelected = selectedRoleIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundEngine.playTrackClack();
                setSelectedRoleIndex(idx);
              }}
              className={`p-3 rounded-xl font-mono text-left transition-all ${
                isSelected
                  ? 'bg-rail-orange text-rail-vanilla shadow-md shadow-rail-orange/30'
                  : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="opacity-80">Stop 0{idx + 1}</span>
                <span className="font-bold">{exp.timeline.split('–')[0]}</span>
              </div>
              <span className="font-editorial text-sm font-bold block truncate">{exp.role}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Role Card */}
      <div className="rounded-xl border border-rail-teal/30 bg-rail-teal/10 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rail-teal/20 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rail-orange/20 border border-rail-orange/40 text-rail-orange">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-rail-vanilla">{currentExp.role}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-rail-gold">
                <span className="font-semibold">{currentExp.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-rail-vanilla/70">
                  <MapPin className="w-3 h-3 text-rail-orange" />
                  {currentExp.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-rail-midnight/80 border border-rail-teal/30 text-rail-vanilla">
              <Calendar className="w-3 h-3 text-rail-orange" />
              {currentExp.timeline}
            </span>
          </div>
        </div>

        {/* Impact List */}
        <div className="space-y-2">
          <span className="block text-[10px] font-mono uppercase text-rail-gold font-bold">
            Key Production Highlights:
          </span>
          <ul className="space-y-2 text-xs text-rail-vanilla/85">
            {currentExp.keyImpact.map((item, kIdx) => (
              <li key={kIdx} className="flex items-start gap-2 bg-rail-midnight/50 p-2.5 rounded-lg border border-rail-teal/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-rail-orange shrink-0 mt-0.5" />
                <span className="leading-relaxed font-sans">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
