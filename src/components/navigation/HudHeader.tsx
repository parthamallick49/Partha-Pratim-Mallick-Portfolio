'use client';

import React from 'react';
import { DhakaTelemetryWidget } from '@/components/world/DhakaTelemetryWidget';
import { Sun, Moon, Volume2, VolumeX, Train, Radio, Play, Pause, Clock } from 'lucide-react';
import { soundEngine } from '@/lib/audioSynthesizer';

interface HudProps {
  isNight: boolean;
  onToggleNight: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isLiveView: boolean;
  onToggleLiveView: () => void;
  liveTourState?: {
    status: 'idle' | 'cruising' | 'dwelling' | 'finished';
    targetStationIndex: number;
    countdown: number;
  };
  currentStationName?: string;
  mileMarker?: string;
}

export function HudHeader({
  isNight,
  onToggleNight,
  isMuted,
  onToggleMute,
  isLiveView,
  onToggleLiveView,
  liveTourState = { status: 'idle', targetStationIndex: 0, countdown: 10 },
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-2 sm:px-6 py-2 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-auto">
        {/* Left: Branding & Mile Marker */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md shadow-lg">
            <Train className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rail-orange shrink-0" />
            <div className="flex flex-col">
              <span className="font-editorial text-xs sm:text-sm font-bold text-rail-vanilla leading-none truncate max-w-[140px] sm:max-w-none">
                Partha Pratim Mallick
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-rail-gold leading-tight mt-0.5 truncate max-w-[140px] sm:max-w-none">
                <span className="sm:hidden">Software Engineer</span>
                <span className="hidden sm:inline">Software Engineer & Mobile App Developer</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Dhaka Telemetry Clock */}
        <div className="hidden md:flex items-center px-3 py-1.5 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md shadow-lg">
          <DhakaTelemetryWidget variant="hud" />
        </div>

        {/* Right: Controls (Live View, Audio, Day/Night) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Autopilot Live View Controller */}
          {!isLiveView ? (
            <button
              type="button"
              onClick={onToggleLiveView}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md text-rail-vanilla/90 hover:text-rail-gold hover:border-rail-gold/60 transition-all shadow-lg group shrink-0"
              title="Start Live View: Autopilot journey through all stations with 10s stopovers and whistle SFX"
            >
              <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rail-orange group-hover:scale-110 transition-transform animate-pulse" />
              <span className="font-bold tracking-wider">Live</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-xl border border-rail-orange/70 bg-rail-midnight/95 backdrop-blur-md shadow-xl shadow-rail-orange/20 shrink-0">
              <div className="flex items-center gap-1 font-mono text-xs shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rail-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rail-orange"></span>
                </span>
                <span className="text-rail-orange font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                  LIVE
                </span>
              </div>

              {/* Status Message */}
              <div className="text-[10px] sm:text-[11px] font-mono text-rail-vanilla/90 flex items-center gap-1">
                {liveTourState.status === 'cruising' ? (
                  <span className="flex items-center gap-1 text-rail-gold">
                    <Train className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rail-orange animate-bounce" />
                    <span>Sta 0{liveTourState.targetStationIndex + 1}</span>
                  </span>
                ) : liveTourState.status === 'dwelling' ? (
                  <span className="flex items-center gap-1 text-rail-vanilla">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rail-gold animate-spin" />
                    <span><strong className="text-rail-orange">{liveTourState.countdown}s</strong></span>
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold text-[10px]">End</span>
                )}
              </div>

              {/* Pause Button */}
              <button
                type="button"
                onClick={onToggleLiveView}
                className="p-0.5 sm:p-1 rounded-lg bg-rail-teal/30 hover:bg-rail-teal/50 text-rail-vanilla transition-colors"
                title="Pause Live Tour (or scroll manually)"
              >
                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rail-gold" />
              </button>
            </div>
          )}

          {/* Audio Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={handleMuteClick}
            className="p-1.5 sm:p-2 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md text-rail-vanilla hover:text-rail-gold transition-colors shadow-lg shrink-0"
            title={isMuted ? 'Turn Sound On (Whistle & Track SFX)' : 'Mute Ambient Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rail-vanilla/60" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rail-orange animate-pulse" />}
          </button>

          {/* Day / Night Toggle */}
          <button
            type="button"
            onClick={onToggleNight}
            className="p-1.5 sm:p-2 rounded-xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md text-rail-vanilla hover:text-rail-gold transition-colors shadow-lg shrink-0"
            title={isNight ? 'Switch to Day Mode (Smoked Vanilla Sky)' : 'Switch to Night Mode (Midnight Sky & Starfield)'}
          >
            {isNight ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FEF08A]" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rail-orange" />}
          </button>
        </div>
      </div>
    </header>
  );
}
