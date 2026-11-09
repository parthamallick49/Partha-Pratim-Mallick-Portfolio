'use client';

import React from 'react';
import { Station1Terminal } from '@/components/stations/Station1Terminal';
import { Station2Switchyard } from '@/components/stations/Station2Switchyard';
import { Station3Bridge } from '@/components/stations/Station3Bridge';
import { Station4MountainPass } from '@/components/stations/Station4MountainPass';
import { Station5Observatory } from '@/components/stations/Station5Observatory';
import { Station6Pier } from '@/components/stations/Station6Pier';

interface ClassicViewProps {
  isNight?: boolean;
}

export function ClassicPortfolioView({ isNight = false }: ClassicViewProps) {
  return (
    <div className="relative w-full min-h-screen pt-20 pb-28 px-4 sm:px-6 space-y-24 max-w-6xl mx-auto">
      <div className="p-4 rounded-xl border border-rail-gold/40 bg-rail-midnight/80 backdrop-blur-md text-rail-vanilla text-center text-xs font-mono">
        <span className="text-rail-gold font-bold">ACCESSIBLE EDITORIAL VIEW ENABLED</span> — All 6 railway stations rendered in standard responsive layout with zero motion constraints.
      </div>

      <Station1Terminal isNight={isNight} />
      <div className="h-px bg-rail-teal/40 w-full" />

      <Station2Switchyard isNight={isNight} />
      <div className="h-px bg-rail-teal/40 w-full" />

      <Station3Bridge isNight={isNight} />
      <div className="h-px bg-rail-teal/40 w-full" />

      <Station4MountainPass isNight={isNight} />
      <div className="h-px bg-rail-teal/40 w-full" />

      <Station5Observatory isNight={isNight} />
      <div className="h-px bg-rail-teal/40 w-full" />

      <Station6Pier isNight={isNight} />
    </div>
  );
}
