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
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
          {BIOGRAPHY.name}
        </h1>
        <p className="font-mono text-xs sm:text-sm text-rail-orange font-semibold sm:text-right">
          {BIOGRAPHY.headline}
        </p>
      </div>

      {/* Main Dossier Content (Balanced 5-col / 7-col Split with Large Portrait) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Large Clear Executive Portrait & Credentials (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] h-[320px] sm:h-[350px] rounded-2xl overflow-hidden border-2 border-rail-gold/80 bg-rail-midnight shadow-2xl shrink-0 group">
            <Image
              src={imgError ? BIOGRAPHY.fallbackPhotoUrl : BIOGRAPHY.photoUrl}
              alt={BIOGRAPHY.name}
              fill
              priority
              sizes="(max-width: 768px) 280px, 300px"
              className="object-cover object-top filter saturate-105 group-hover:scale-102 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
            {/* Live Availability Badge overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 flex items-center justify-between text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
              <span className="text-rail-gold font-mono text-[10px]">Dhaka, BD</span>
            </div>
          </div>

          {/* Quick Credential Card */}
          <div className="w-full max-w-[280px] mt-3 p-2.5 rounded-xl bg-rail-teal/15 border border-rail-teal/30 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between text-rail-vanilla/90">
              <span className="text-[10px] text-rail-gold uppercase font-bold">Organization:</span>
              <span className="font-semibold">{BIOGRAPHY.company}</span>
            </div>
            <div className="flex items-center justify-between text-rail-vanilla/90 pt-1 border-t border-rail-teal/20">
              <span className="text-[10px] text-rail-gold uppercase font-bold">Engineering:</span>
              <span className="font-semibold text-rail-orange">Mobile & Backend</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Details, Architecture Badges & Actions (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3.5">
          <div>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-rail-vanilla leading-tight mb-2">
              Engineering High-Performance Mobile & Distributed Solutions
            </h3>
            <p className="text-xs sm:text-sm text-rail-vanilla/85 leading-relaxed font-sans">
              {BIOGRAPHY.summary}
            </p>
          </div>

          {/* 3 Architecture Metric Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left pt-0.5">
            <div className="p-2.5 rounded-xl bg-rail-teal/20 border border-rail-teal/30">
              <span className="block text-[9.5px] font-mono text-rail-gold uppercase font-bold">Mobile Apps</span>
              <span className="text-xs font-bold text-rail-vanilla block mt-0.5">Flutter & Android</span>
              <span className="text-[10px] text-rail-vanilla/70 block mt-0.5">Offline-first, 60fps</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rail-teal/20 border border-rail-teal/30">
              <span className="block text-[9.5px] font-mono text-rail-gold uppercase font-bold">Backend & DB</span>
              <span className="text-xs font-bold text-rail-vanilla block mt-0.5">.NET & SQL Server</span>
              <span className="text-[10px] text-rail-vanilla/70 block mt-0.5">REST APIs, scalable</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rail-teal/20 border border-rail-teal/30">
              <span className="block text-[9.5px] font-mono text-rail-gold uppercase font-bold">Discipline</span>
              <span className="text-xs font-bold text-rail-vanilla block mt-0.5">Clean Architecture</span>
              <span className="text-[10px] text-rail-vanilla/70 block mt-0.5">Modular, robust</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={BIOGRAPHY.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs font-bold shadow-md shadow-rail-orange/30 transition-all text-center"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume</span>
            </a>

            <button
              type="button"
              onClick={handleDepartClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-rail-teal/60 bg-rail-teal/25 hover:bg-rail-teal/40 text-rail-vanilla font-mono text-xs font-bold transition-all"
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
      </div>
    </section>
  );
}
