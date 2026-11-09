'use client';

import React from 'react';
import { STATIONS } from '@/data/portfolioData';
import { soundEngine } from '@/lib/audioSynthesizer';
import { Ticket } from 'lucide-react';

interface NavbarProps {
  activeStationIndex: number; // 0 to 5
  onSelectStation: (index: number) => void;
  className?: string;
}

export function FastTravelNavbar({ activeStationIndex, onSelectStation, className = '' }: NavbarProps) {
  const stationLabels = [
    { num: '01', label: 'About', id: 'station-1' },
    { num: '02', label: 'Tech Yard', id: 'station-2' },
    { num: '03', label: 'Projects Bridge', id: 'station-3' },
    { num: '04', label: 'Experience Pass', id: 'station-4' },
    { num: '05', label: 'Education', id: 'station-5' },
    { num: '06', label: 'Contact Pier', id: 'station-6' },
  ];

  const handleClick = (index: number) => {
    soundEngine.playTrackClack();
    onSelectStation(index);
  };

  return (
    <nav
      aria-label="Railway Ticket Stub Schedule"
      className={`fixed bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] sm:max-w-3xl w-full px-2 pointer-events-auto ${className}`}
    >
      <div className="relative rounded-xl border border-rail-teal/50 bg-rail-midnight/95 backdrop-blur-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-2xl flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        {/* Ticket Perforation Notch Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 pl-1 pr-2 border-r border-rail-teal/40 text-[11px] font-mono font-bold text-rail-gold shrink-0">
          <Ticket className="w-3.5 h-3.5 text-rail-orange" />
          <span>TICKET STUB</span>
        </div>

        {/* Station Navigation Nodes */}
        <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-around">
          {stationLabels.map((st, idx) => {
            const isActive = activeStationIndex === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => handleClick(idx)}
                className={`relative px-2 sm:px-3 py-1.5 rounded-xl font-mono text-[10px] sm:text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-rail-orange text-rail-vanilla font-bold shadow-md shadow-rail-orange/40 scale-105'
                    : 'text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-rail-vanilla' : 'text-rail-gold'}`}>
                  [{st.num}]
                </span>
                <span className="truncate">{st.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rail-vanilla animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
