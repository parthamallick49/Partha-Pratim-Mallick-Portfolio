'use client';

import React from 'react';
import { EDUCATION } from '@/data/portfolioData';
import { StationScenery } from '@/components/world/StationScenery';
import { GraduationCap, BookOpen, Award, Compass, School } from 'lucide-react';

interface StationProps {
  isNight?: boolean;
}

export function Station5Observatory({ isNight = false }: StationProps) {
  return (
    <section
      id="station-5"
      className="relative w-full max-w-2xl p-2 sm:p-4"
    >
      {/* Station Plaque */}
      <div className="relative z-10 mb-4 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rail-gold/40 bg-rail-gold/10 text-rail-gold text-xs font-mono font-semibold uppercase tracking-widest mb-2">
          <Compass className="w-3.5 h-3.5 text-rail-gold" />
          <span>Station 05 • Crest Station (MP 78.5)</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-rail-vanilla drop-shadow-md">
          The Summit Observatory
        </h2>
        <p className="font-mono text-xs text-rail-gold mt-1 tracking-wide">
          ACADEMIC DEGREES • ADVANCED COMPUTER SCIENCE
        </p>
      </div>

      {/* Degrees Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-rail-teal/40 bg-rail-midnight/85 backdrop-blur-md p-6 sm:p-8 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-rail-teal/30 pb-3 mb-4">
                <div className="p-2.5 rounded-xl bg-rail-gold/15 border border-rail-gold/30 text-rail-gold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-rail-teal/20 border border-rail-teal/40 text-rail-vanilla">
                  {edu.timeline}
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-rail-vanilla mb-1">{edu.degree}</h3>
              <p className="text-xs font-mono text-rail-gold flex items-center gap-1.5 mb-4">
                <School className="w-3.5 h-3.5" />
                <span>{edu.institution}</span>
              </p>

              <div className="bg-rail-teal/10 rounded-xl p-3.5 border border-rail-teal/20 mb-4">
                <span className="block text-[10px] font-mono uppercase text-rail-vanilla/60 mb-1">
                  Academic Focus:
                </span>
                <p className="text-xs sm:text-sm text-rail-vanilla/90 leading-relaxed font-sans">{edu.focus}</p>
              </div>
            </div>

            {edu.grade && (
              <div className="pt-2 flex items-center justify-between text-xs font-mono border-t border-rail-teal/20">
                <span className="text-rail-vanilla/60">Degree Status:</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-rail-gold" />
                  {edu.grade}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
