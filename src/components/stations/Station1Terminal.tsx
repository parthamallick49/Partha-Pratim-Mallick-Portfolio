'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BIOGRAPHY } from '@/data/portfolioData';
import { Download, ArrowDown, MapPin, Ticket, Building2, Sparkles } from 'lucide-react';
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
      className="relative w-full max-w-3xl xl:max-w-4xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl text-rail-vanilla space-y-4"
    >
      {/* Professional Profile Header */}
      <div className="border-b border-rail-teal/30 pb-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rail-orange/15 border border-rail-orange/40 text-rail-orange font-bold text-[11px]">
              ENGINEERING DOSSIER
            </span>
            <span className="text-rail-gold font-mono text-[10px]">{BIOGRAPHY.location}</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
            {BIOGRAPHY.name}
          </h1>
        </div>
        <p className="font-mono text-xs text-rail-orange font-semibold sm:text-right">
          {BIOGRAPHY.headline}
        </p>
      </div>

      {/* Main Dossier Content (Wide Multi-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left Column: Station Master Portrait & Location (4 cols) */}
        <div className="md:col-span-4 flex flex-row md:flex-col items-center gap-3">
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border-2 border-rail-gold/70 bg-rail-midnight shadow-md shrink-0">
            <Image
              src={imgError ? BIOGRAPHY.fallbackPhotoUrl : BIOGRAPHY.photoUrl}
              alt={BIOGRAPHY.name}
              fill
              priority
              className="object-cover object-center filter saturate-105"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <span className="text-[10px] font-mono text-rail-gold font-bold uppercase tracking-wider">
              Lead Mobile Engineer
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-rail-vanilla/80 mt-1">
              <MapPin className="w-3 h-3 text-rail-orange" />
              <span>{BIOGRAPHY.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-rail-teal mt-0.5">
              <Building2 className="w-3 h-3" />
              <span>{BIOGRAPHY.company}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Details, Architecture Badges & Actions (8 cols) */}
        <div className="md:col-span-8 space-y-3">
          <p className="text-xs sm:text-sm text-rail-vanilla/90 leading-relaxed font-sans">
            {BIOGRAPHY.summary}
          </p>

          {/* 3 Architecture Metric Pills */}
          <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
            <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/30">
              <span className="block text-[9px] font-mono text-rail-vanilla/60 uppercase">Primary Focus</span>
              <span className="text-xs font-semibold text-rail-vanilla">Flutter & Android</span>
            </div>
            <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/30">
              <span className="block text-[9px] font-mono text-rail-vanilla/60 uppercase">Backend Core</span>
              <span className="text-xs font-semibold text-rail-vanilla">.NET & SQL</span>
            </div>
            <div className="p-2 rounded-lg bg-rail-teal/20 border border-rail-teal/30">
              <span className="block text-[9px] font-mono text-rail-vanilla/60 uppercase">Methodology</span>
              <span className="text-xs font-semibold text-rail-vanilla">Clean Architecture</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={BIOGRAPHY.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs font-bold shadow-md shadow-rail-orange/20 transition-all text-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Resume</span>
            </a>

            <button
              type="button"
              onClick={handleDepartClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-rail-teal/60 bg-rail-teal/25 hover:bg-rail-teal/40 text-rail-vanilla font-mono text-xs transition-all"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full border border-black/40 transition-colors ${
                  signalGreen ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-rail-orange'
                }`}
              />
              <span>{signalGreen ? 'Departing...' : 'Next: Technical Skills'}</span>
              <ArrowDown className="w-3.5 h-3.5 text-rail-vanilla/70 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
