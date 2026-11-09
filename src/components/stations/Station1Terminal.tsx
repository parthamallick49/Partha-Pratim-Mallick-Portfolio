'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BIOGRAPHY } from '@/data/portfolioData';
import { StationScenery } from '@/components/world/StationScenery';
import { Download, Compass, ArrowDown, Sparkles, MapPin, Ticket } from 'lucide-react';
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
      className="relative w-full max-w-2xl p-2 sm:p-4"
    >
      {/* Station Platform Header Plaque */}
      <div className="relative z-10 mb-4 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rail-orange/40 bg-rail-orange/10 text-rail-orange text-xs font-mono font-semibold uppercase tracking-widest mb-2">
          <Ticket className="w-3.5 h-3.5" />
          <span>Station 01 • Origin Platform (MP 00.0)</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-rail-vanilla drop-shadow-md">
          Grand Central Terminal
        </h1>
        <p className="font-mono text-xs text-rail-gold mt-1 tracking-wide">
          DEPARTURE STATION • PARTHA PRATIM MALLICK
        </p>
      </div>

      {/* Main Vintage Passenger Dossier & ID Frame */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-rail-midnight/85 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Left: Station Master ID Portrait Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group">
            {/* Vintage Ornate Ticket Frame Border */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-rail-orange via-rail-gold to-rail-teal opacity-60 blur-sm group-hover:opacity-90 transition-opacity" />
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-xl overflow-hidden border-2 border-rail-gold/70 bg-rail-midnight shadow-inner">
              <Image
                src={imgError ? BIOGRAPHY.fallbackPhotoUrl : BIOGRAPHY.photoUrl}
                alt={BIOGRAPHY.name}
                fill
                priority
                className="object-cover object-center filter saturate-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rail-midnight via-transparent to-transparent opacity-60" />

              {/* Gold Plaque at base of portrait */}
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1.5 rounded bg-rail-midnight/90 border border-rail-gold/40 text-center">
                <p className="text-[10px] font-mono uppercase tracking-wider text-rail-gold font-bold">
                  PASSENGER #01: STATION MASTER
                </p>
                <p className="text-xs font-semibold text-rail-vanilla truncate">{BIOGRAPHY.name}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-rail-vanilla/70">
            <MapPin className="w-3.5 h-3.5 text-rail-orange" />
            <span>{BIOGRAPHY.location}</span>
            <span className="text-rail-teal">•</span>
            <span>{BIOGRAPHY.company}</span>
          </div>
        </div>

        {/* Right: Technical Biography & Passenger Ticket Details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 text-left">
          <div className="border-b border-rail-teal/30 pb-3">
            <div className="flex items-center justify-between text-xs font-mono text-rail-orange font-bold uppercase tracking-wider">
              <span>BOARDING PASS: {BIOGRAPHY.ticketNumber}</span>
              <span className="text-rail-vanilla/60 font-sans">{BIOGRAPHY.trainNumber}</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-rail-vanilla mt-1">
              {BIOGRAPHY.headline}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-rail-vanilla/85 leading-relaxed font-sans">
            {BIOGRAPHY.summary}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-2.5 rounded-lg bg-rail-teal/20 border border-rail-teal/40">
              <span className="block text-[10px] font-mono text-rail-vanilla/60 uppercase">Primary Track</span>
              <span className="text-xs sm:text-sm font-semibold text-rail-vanilla">Flutter & Android</span>
            </div>
            <div className="p-2.5 rounded-lg bg-rail-teal/20 border border-rail-teal/40">
              <span className="block text-[10px] font-mono text-rail-vanilla/60 uppercase">Enterprise Core</span>
              <span className="text-xs sm:text-sm font-semibold text-rail-vanilla">.NET & SQL Server</span>
            </div>
            <div className="p-2.5 rounded-lg bg-rail-teal/20 border border-rail-teal/40 col-span-2 sm:col-span-1">
              <span className="block text-[10px] font-mono text-rail-vanilla/60 uppercase">Craft Standard</span>
              <span className="text-xs sm:text-sm font-semibold text-rail-vanilla">Clean Architecture</span>
            </div>
          </div>

          {/* Action Row: Download Passenger Ticket (Resume PDF) & Signal Light */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {/* Resume Download Ticket Button */}
            <a
              href={BIOGRAPHY.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs sm:text-sm font-bold shadow-lg shadow-rail-orange/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Passenger Ticket (Resume PDF)</span>
            </a>

            {/* Departure Signal Light Trigger */}
            <button
              type="button"
              onClick={handleDepartClick}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-rail-teal/60 bg-rail-teal/25 hover:bg-rail-teal/40 text-rail-vanilla font-mono text-xs transition-all"
            >
              {/* Signal Light Indicator (Red -> Green) */}
              <span
                className={`w-3.5 h-3.5 rounded-full border border-black/40 transition-colors shadow-sm ${
                  signalGreen ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-rail-orange shadow-rail-orange/50'
                }`}
              />
              <span>{signalGreen ? 'Signal Clear: Proceeding' : 'Signal: Click to Depart'}</span>
              <ArrowDown className="w-3.5 h-3.5 text-rail-vanilla/70 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
