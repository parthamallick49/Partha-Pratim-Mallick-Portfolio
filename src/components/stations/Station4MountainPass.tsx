'use client';

import React from 'react';
import { WORK_EXPERIENCES } from '@/data/portfolioData';
import { StationScenery } from '@/components/world/StationScenery';
import { Briefcase, Calendar, MapPin, CheckCircle2, Milestone } from 'lucide-react';

interface StationProps {
  isNight?: boolean;
}

export function Station4MountainPass({ isNight = false }: StationProps) {
  return (
    <section
      id="station-4"
      className="relative min-h-[95vh] flex flex-col justify-center items-center py-16 px-4 max-w-6xl mx-auto"
    >
      {/* Background Mountain Pass Tunnel Scenery */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-lg z-0 opacity-40 sm:opacity-60 pointer-events-none">
        <StationScenery type="mountain-pass" isNight={isNight} />
      </div>

      {/* Station Plaque */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rail-teal-light/40 bg-rail-teal/20 text-rail-teal-light text-xs font-mono font-semibold uppercase tracking-widest mb-3">
          <Milestone className="w-3.5 h-3.5 text-rail-orange" />
          <span>Station 04 • Alpine Switchback (MP 56.1)</span>
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-rail-vanilla drop-shadow-md">
          The Mountain Pass
        </h2>
        <p className="font-mono text-xs sm:text-sm text-rail-vanilla/70 mt-2 tracking-wide">
          PROFESSIONAL ENGINEERING STOPS • GRAMEEN COMMUNICATIONS MILEPOSTS
        </p>
      </div>

      {/* Timeline Milestones Grid */}
      <div className="relative z-10 w-full space-y-6">
        {WORK_EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-rail-teal/40 bg-rail-midnight/85 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Top Milepost Badge */}
            <div className="flex flex-wrap items-center justify-between border-b border-rail-teal/30 pb-4 mb-4 gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rail-orange/20 border border-rail-orange/40 text-rail-orange">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-rail-vanilla">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-rail-gold">
                    <span className="font-bold">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-rail-vanilla/70">
                      <MapPin className="w-3 h-3 text-rail-orange" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-rail-teal/30 border border-rail-teal/50 text-rail-vanilla font-semibold">
                  <Calendar className="w-3 h-3 text-rail-orange" />
                  {exp.timeline}
                </span>
                {exp.status && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                    {exp.status}
                  </span>
                )}
              </div>
            </div>

            {/* Key Impact Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-rail-vanilla/60 font-semibold tracking-wider">
                Production Engineering Highlights:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-rail-vanilla/85">
                {exp.keyImpact.map((item, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-2.5 bg-rail-teal/10 p-3 rounded-xl border border-rail-teal/20">
                    <CheckCircle2 className="w-4 h-4 text-rail-orange shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
