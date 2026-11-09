'use client';

import React from 'react';
import { soundEngine } from '@/lib/audioSynthesizer';
import { User, Cpu, Code2, Briefcase, GraduationCap, Mail } from 'lucide-react';

interface NavbarProps {
  activeStationIndex: number; // 0 to 5
  onSelectStation: (index: number) => void;
  className?: string;
}

export function FastTravelNavbar({ activeStationIndex, onSelectStation, className = '' }: NavbarProps) {
  const navItems = [
    { label: 'About', icon: User },
    { label: 'Skills', icon: Cpu },
    { label: 'Projects', icon: Code2 },
    { label: 'Experience', icon: Briefcase },
    { label: 'Education', icon: GraduationCap },
    { label: 'Contact', icon: Mail },
  ];

  const handleClick = (index: number) => {
    soundEngine.playTrackClack();
    onSelectStation(index);
  };

  return (
    <nav
      aria-label="Portfolio Navigation Dock"
      className={`fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none ${className}`}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-xl shadow-2xl shadow-black/50">
        {navItems.map((item, idx) => {
          const isActive = activeStationIndex === idx;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(idx)}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-rail-orange text-rail-vanilla font-bold shadow-lg shadow-rail-orange/30 scale-105'
                  : 'text-rail-vanilla/65 hover:text-rail-vanilla hover:bg-rail-teal/25'
              }`}
              title={`Jump to ${item.label}`}
            >
              <Icon className={`w-3.5 h-3.5 transition-transform ${isActive ? 'scale-110' : 'opacity-80'}`} />
              <span className="hidden sm:inline text-[11px] tracking-wide">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-rail-vanilla animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
