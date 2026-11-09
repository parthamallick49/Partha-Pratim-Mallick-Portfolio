'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BIOGRAPHY } from '@/data/portfolioData';
import { Download, ArrowDown, MapPin, Ticket } from 'lucide-react';
import { soundEngine } from '@/lib/audioSynthesizer';

interface StationProps {
  isNight?: boolean;
  onScrollToNext?: () => void;
}

export function Station1Terminal({ isNight = false, onScrollToNext }: StationProps) {
  const [imgError, setImgError] = useState(false);
  const [signalGreen, setSignalGreen] = useState(false);

  const handleDepartClick = () => {
    soundEngine.playWhistle();
    setSignalGreen(true);
    if (onScrollToNext) {
      setTimeout(onScrollToNext, 250);
    }
  };

  return (
    <section
      id="station-1"
      className="relative w-full max-w-xl lg:max-w-2xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-3">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-orange/15 border border-rail-orange/40 text-rail-orange font-bold">
            <Ticket className="w-3.5 h-3.5" />
            STATION 01 • MP 00.0
          </span>
          <span className="text-rail-gold/80 font-mono text-[11px]">{BIOGRAPHY.ticketNumber}</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-rail-vanilla">
          Grand Central Terminal
        </h1>
        <p className="font-mono text-xs text-rail-gold mt-0.5">
          DEPARTURE PLATFORM • PASSENGER DOSSIER
        </p>
      </div>

      {/* Profile & Identity Row */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Portrait Photo */}
        <div className="relative shrink-0">
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border-2 border-rail-gold/70 bg-rail-midnight shadow-md">
            <Image
              src={imgError ? BIOGRAPHY.fallbackPhotoUrl : BIOGRAPHY.photoUrl}
              alt={BIOGRAPHY.name}
              fill
              priority
              className="object-cover object-center filter saturate-105"
              onError={() => setImgError(true)}
            />
          </div>
          <span className="block text-center text-[9px] font-mono text-rail-gold font-bold mt-1">
            STATION MASTER
          </span>
        </div>

        {/* Bio Highlights */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-rail-vanilla">
              {BIOGRAPHY.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-rail-orange">
              {BIOGRAPHY.headline}
            </p>
          </div>

          <p className="text-xs text-rail-vanilla/80 leading-relaxed font-sans">
            {BIOGRAPHY.summary}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-mono text-rail-vanilla/70 pt-1">
            <MapPin className="w-3 h-3 text-rail-orange" />
            <span>{BIOGRAPHY.location}</span>
            <span className="text-rail-teal">•</span>
            <span>{BIOGRAPHY.company}</span>
          </div>
        </div>
      </div>

      {/* 3 Architecture Pills */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/30">
          <span className="block text-[9px] font-mono text-rail-vanilla/60 uppercase">Primary</span>
          <span className="text-xs font-semibold text-rail-vanilla">Flutter & Android</span>
        </div>
        <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/30">
          <span className="block text-[9px] font-mono text-rail-vanilla/60 uppercase">Enterprise</span>
          <span className="text-xs font-semibold text-rail-vanilla">.NET & SQL</span>
        </div>
        <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/30">
          <span className="block text-[9px] font-mono text-rail-vanilla/60 uppercase">Pattern</span>
          <span className="text-xs font-semibold text-rail-vanilla">Clean Arch</span>
        </div>
      </div>

      {/* Action Row: Resume Download + Departure Signal */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <a
          href={BIOGRAPHY.resumeUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs font-bold shadow-lg shadow-rail-orange/20 transition-all text-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Resume Ticket</span>
        </a>

        <button
          type="button"
          onClick={handleDepartClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rail-teal/60 bg-rail-teal/25 hover:bg-rail-teal/40 text-rail-vanilla font-mono text-xs transition-all"
        >
          <span
            className={`w-3 h-3 rounded-full border border-black/40 transition-colors ${
              signalGreen ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-rail-orange'
            }`}
          />
          <span>{signalGreen ? 'Signal Green: Rolling' : 'Signal: Click to Depart'}</span>
          <ArrowDown className="w-3.5 h-3.5 text-rail-vanilla/70 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
