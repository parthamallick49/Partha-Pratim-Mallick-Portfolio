'use client';

import React from 'react';
import { EDUCATION } from '@/data/portfolioData';
import { GraduationCap, Award, Compass, School, BookOpen } from 'lucide-react';

interface StationProps {
  isNight?: boolean;
}

export function Station5Observatory({ isNight = false }: StationProps) {
  return (
    <section
      id="station-5"
      className="relative w-full max-w-3xl xl:max-w-4xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl space-y-3.5 text-rail-vanilla"
    >
      {/* Professional Education Header */}
      <div className="border-b border-rail-teal/30 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-gold/15 border border-rail-gold/40 text-rail-gold font-bold text-[11px]">
              <GraduationCap className="w-3.5 h-3.5 text-rail-gold" />
              ACADEMIC CREDENTIALS
            </span>
            <span className="text-rail-gold/80 font-mono text-[10px]">COMPUTER SCIENCE & ENGINEERING</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
            Education & Academic Degrees
          </h2>
        </div>
        <p className="font-mono text-xs text-rail-gold sm:text-right font-medium">
          Jahangirnagar University • Daffodil International University
        </p>
      </div>

      {/* Side-by-Side Dual Degree Pavilion (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-rail-teal/30 bg-rail-teal/10 p-3.5 sm:p-4 space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rail-gold/15 border border-rail-gold/30 text-rail-gold shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9.5px] font-mono text-rail-orange font-bold uppercase tracking-wider block">
                      Degree 0{idx + 1}
                    </span>
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-rail-vanilla leading-snug">
                      {edu.degree}
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rail-midnight/80 border border-rail-teal/30 text-rail-vanilla shrink-0">
                  {edu.timeline}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-rail-gold mb-2.5">
                <School className="w-3.5 h-3.5 text-rail-orange" />
                <span className="font-semibold">{edu.institution}</span>
              </div>

              <div className="bg-rail-midnight/60 p-2.5 rounded-lg border border-rail-teal/20 text-xs font-sans leading-relaxed text-rail-vanilla/85">
                <span className="font-mono text-[9.5px] text-rail-gold block uppercase font-bold mb-0.5">
                  Academic Focus & Research:
                </span>
                {edu.focus}
              </div>
            </div>

            {edu.grade && (
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-rail-teal/20 text-rail-vanilla/70">
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
