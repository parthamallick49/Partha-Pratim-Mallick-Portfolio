'use client';

import React, { useState, useEffect } from 'react';
import { HudHeader } from '@/components/navigation/HudHeader';
import { ScenicTrainJourney } from '@/components/world/ScenicTrainJourney';
import { STATIONS } from '@/data/portfolioData';
import { soundEngine } from '@/lib/audioSynthesizer';

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiveView, setIsLiveView] = useState(false);
  const [liveTourState, setLiveTourState] = useState<{
    status: 'idle' | 'cruising' | 'dwelling' | 'finished';
    targetStationIndex: number;
    countdown: number;
  }>({
    status: 'idle',
    targetStationIndex: 0,
    countdown: 10,
  });
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // Auto-detect Day / Night based on Dhaka local time
  useEffect(() => {
    try {
      const now = new Date();
      const dhakaHourFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(dhakaHourFormatter.format(now), 10);
      // Day is 6:00 AM (06:00) to 6:00 PM (18:00) Dhaka time
      const isNightTime = hour < 6 || hour >= 18;
      setIsNight(isNightTime);
    } catch {
      // Default to day
      setIsNight(false);
    }
  }, []);

  const handleToggleLiveView = () => {
    const nextLive = !isLiveView;
    setIsLiveView(nextLive);

    // If starting Live Tour and audio was muted, auto-unmute so locomotive whistle & SFX are heard!
    if (nextLive && isMuted) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
  };

  const currentStation = STATIONS[activeStationIndex] || STATIONS[0];

  return (
    <div
      className={`min-h-screen text-rail-vanilla transition-colors duration-1000 ${
        isNight ? 'bg-[#091515]' : 'bg-[#FAF6EE]'
      }`}
    >
      {/* Top Persistent HUD Controls & Telemetry */}
      <HudHeader
        isNight={isNight}
        onToggleNight={() => setIsNight(prev => !prev)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(prev => !prev)}
        isLiveView={isLiveView}
        onToggleLiveView={handleToggleLiveView}
        liveTourState={liveTourState}
        currentStationName={currentStation.name}
        mileMarker={currentStation.mileMarker}
      />

      {/* Main Experience: Scenic Train Journey */}
      <main className="w-full">
        <ScenicTrainJourney
          isNight={isNight}
          onActiveStationChange={(idx) => setActiveStationIndex(idx)}
          isLiveView={isLiveView}
          onLiveViewChange={(active) => setIsLiveView(active)}
          onLiveTourStateChange={(state) => setLiveTourState(state)}
        />
      </main>
    </div>
  );
}
