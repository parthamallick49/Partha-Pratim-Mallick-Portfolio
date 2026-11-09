'use client';

import React from 'react';
import { DhakaTelemetryWidget } from '@/components/world/DhakaTelemetryWidget';
import { Sun, Moon, Volume2, VolumeX, Eye, Sparkles, Train } from 'lucide-react';
import { soundEngine } from '@/lib/audioSynthesizer';

interface HudProps {
  isNight: boolean;
  onToggleNight: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isClassicView: boolean;
  onToggleClassicView: () => void;
  currentStationName?: string;
  mileMarker?: string;
}

export function HudHeader({
  isNight,
  onToggleNight,
  isMuted,
  onToggleMute,
  isClassicView,
  onToggleClassicView,
  currentStationName = 'Grand Central Terminal',
  mileMarker = 'MP 00.0',
}: HudProps) {
  const handleMuteClick = () => {
    const nextMuted = !isMuted;
    onToggleMute();
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playWhistle();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 pointer-events-auto">
        {/* Left: Branding & Mile Marker */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md shadow-lg">
            <Train className="w-4 h-4 text-rail-orange" />
            <div className="flex flex-col">
              <span className="font-editorial text-sm font-bold text-rail-vanilla leading-none">
                Partha Pratim Mallick
              </span>
              <span className="text-[10px] font-mono text-rail-gold leading-tight mt-0.5">
                {mileMarker} • {currentStationName}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Dhaka Telemetry Clock */}
        <div className="hidden md:flex items-center px-3 py-1.5 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md shadow-lg">
          <DhakaTelemetryWidget variant="hud" />
        </div>

        {/* Right: Controls (Day/Night, Audio, Classic View) */}
        <div className="flex items-center gap-2">
          {/* Classic View Toggle */}
          <button
            type="button"
            onClick={onToggleClassicView}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              isClassicView
                ? 'bg-rail-orange text-rail-vanilla border-rail-orange font-bold'
                : 'bg-rail-midnight/90 border-rail-teal/40 text-rail-vanilla/80 hover:text-rail-vanilla'
            }`}
            title="Toggle between Scenic Journey and Classic Editorial layout"
          >
            <Eye className="w-3.5 h-3.5 text-rail-gold" />
            <span className="hidden sm:inline">{isClassicView ? 'Scenic View' : 'Classic View'}</span>
          </button>

          {/* Audio Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleMuteClick}
            className="p-2 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md text-rail-vanilla hover:text-rail-gold transition-colors shadow-lg"
            title={isMuted ? 'Turn Sound On (Whistle & Track SFX)' : 'Mute Ambient Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rail-vanilla/60" /> : <Volume2 className="w-4 h-4 text-rail-orange animate-pulse" />}
          </button>

          {/* Day / Night Toggle */}
          <button
            type="button"
            onClick={onToggleNight}
            className="p-2 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md text-rail-vanilla hover:text-rail-gold transition-colors shadow-lg"
            title={isNight ? 'Switch to Day Mode (Smoked Vanilla Sky)' : 'Switch to Night Mode (Midnight Sky & Starfield)'}
          >
            {isNight ? <Moon className="w-4 h-4 text-[#FEF08A]" /> : <Sun className="w-4 h-4 text-rail-orange" />}
          </button>
        </div>
      </div>
    </header>
  );
}
