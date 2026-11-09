'use client';

import React from 'react';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap, Award, Compass, School } from 'lucide-react';

interface StationProps {
  isNight?: boolean;
}

export function Station5Observatory({ isNight = false }: StationProps) {
  return (
    <section
      id="station-5"
      className="relative w-full max-w-xl lg:max-w-2xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-3">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-gold/15 border border-rail-gold/40 text-rail-gold font-bold">
            <Compass className="w-3.5 h-3.5" />
            STATION 05 • MP 78.5
          </span>
          <span className="text-rail-gold/80 font-mono text-[11px]">CREST OBSERVATORY</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-rail-vanilla">
          The Summit Observatory
        </h2>
        <p className="font-mono text-xs text-rail-gold mt-0.5">
          ACADEMIC DEGREES • ADVANCED COMPUTER SCIENCE
        </p>
      </div>

      {/* Stacked Academic Degree Cards */}
      <div className="space-y-3">
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-rail-teal/30 bg-rail-teal/10 p-4 space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rail-gold/15 border border-rail-gold/30 text-rail-gold shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-rail-vanilla leading-snug">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-rail-gold mt-0.5">
                    <School className="w-3.5 h-3.5" />
                    <span>{edu.institution}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-rail-midnight/80 border border-rail-teal/30 text-rail-vanilla shrink-0">
                {edu.timeline}
              </span>
            </div>

            <div className="bg-rail-midnight/50 p-2.5 rounded-lg border border-rail-teal/20 text-xs font-sans leading-relaxed text-rail-vanilla/85">
              <span className="font-mono text-[10px] text-rail-gold block uppercase font-bold mb-0.5">
                Academic Focus:
              </span>
              {edu.focus}
            </div>

            {edu.grade && (
              <div className="flex items-center justify-between text-xs font-mono pt-1 text-rail-vanilla/70">
                <span>Degree Standing:</span>
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
