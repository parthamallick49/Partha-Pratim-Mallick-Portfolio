'use client';

import React, { useState } from 'react';
import { WORK_EXPERIENCES } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Milestone, Building2 } from 'lucide-react';
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
      className="relative w-full max-w-3xl xl:max-w-4xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl space-y-3.5 text-rail-vanilla"
    >
      {/* Professional Experience Header */}
      <div className="border-b border-rail-teal/30 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-teal-light/20 border border-rail-teal-light/40 text-rail-teal-light font-bold text-[11px]">
              <Briefcase className="w-3.5 h-3.5 text-rail-orange" />
              CAREER TRACK RECORD
            </span>
            <span className="text-rail-gold/80 font-mono text-[10px]">PRODUCTION HISTORY</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
            Professional Work Experience
          </h2>
        </div>
        <p className="font-mono text-xs text-rail-gold sm:text-right font-medium">
          Grameen Communications • Systems Optimization • Engineering Impact
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
              className={`p-2.5 rounded-xl font-mono text-left transition-all ${
                isSelected
                  ? 'bg-rail-orange text-rail-vanilla shadow-md shadow-rail-orange/30'
                  : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
              }`}
            >
              <div className="flex items-center justify-between text-[9.5px] mb-0.5">
                <span className="opacity-80">Role 0{idx + 1}</span>
                <span className="font-bold">{exp.timeline.split('–')[0]}</span>
              </div>
              <span className="font-editorial text-sm font-bold block truncate">{exp.role}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Role Gantry Display (Wide 2-Column Split) */}
      <div className="rounded-xl border border-rail-teal/30 bg-rail-teal/10 p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Column: Organization, Role, Timeline, Location (4 cols) */}
        <div className="md:col-span-4 space-y-2.5">
          <div className="p-3 rounded-xl bg-rail-midnight/80 border border-rail-teal/20 space-y-2">
            <div className="flex items-center gap-2 text-rail-orange">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Company</span>
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-rail-vanilla leading-snug">
                {currentExp.company}
              </h3>
              <p className="text-xs font-semibold text-rail-orange mt-0.5">
                {currentExp.role}
              </p>
            </div>

            <div className="pt-2 border-t border-rail-teal/20 space-y-1 text-[11px] font-mono text-rail-vanilla/75">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rail-gold" />
                <span>{currentExp.timeline}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rail-orange" />
                <span>{currentExp.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Production Highlights (8 cols) */}
        <div className="md:col-span-8 space-y-2">
          <span className="block text-[10px] font-mono uppercase text-rail-gold font-bold">
            Key Production Highlights & Engineering Deliverables:
          </span>
          <ul className="space-y-2 text-xs text-rail-vanilla/90">
            {currentExp.keyImpact.map((item, kIdx) => (
              <li key={kIdx} className="flex items-start gap-2.5 bg-rail-midnight/60 p-2.5 rounded-lg border border-rail-teal/20">
                <CheckCircle2 className="w-4 h-4 text-rail-orange shrink-0 mt-0.5" />
                <span className="leading-relaxed font-sans">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
