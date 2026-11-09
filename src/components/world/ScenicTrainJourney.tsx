'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Locomotive } from '@/components/world/Locomotive';
import { RailwayTrack } from '@/components/world/RailwayTrack';
import { EnvironmentLayers } from '@/components/world/EnvironmentLayers';
import { Station1Terminal } from '@/components/stations/Station1Terminal';
import { Station2Switchyard } from '@/components/stations/Station2Switchyard';
import { Station3Bridge } from '@/components/stations/Station3Bridge';
import { Station4MountainPass } from '@/components/stations/Station4MountainPass';
import { Station5Observatory } from '@/components/stations/Station5Observatory';
import { Station6Pier } from '@/components/stations/Station6Pier';
import { FastTravelNavbar } from '@/components/navigation/FastTravelNavbar';
import { STATIONS } from '@/data/portfolioData';
import { soundEngine } from '@/lib/audioSynthesizer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

interface ScenicJourneyProps {
  isNight: boolean;
  onActiveStationChange?: (index: number) => void;
}

export function ScenicTrainJourney({ isNight, onActiveStationChange }: ScenicJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Setup GSAP ScrollTrigger & MotionPath
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Wait for DOM layout to settle
    const ctx = gsap.context(() => {
      const train = trainRef.current;
      const trackGuide = document.getElementById('train-track-guide');

      if (train && trackGuide) {
        // Timeline that scrubs train position across the full height container
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(p);

              // Map 0-1 progress to 6 stations
              const stationIdx = Math.min(Math.floor(p * 6), 5);
              setActiveStationIndex(stationIdx);
              if (onActiveStationChange) {
                onActiveStationChange(stationIdx);
              }
            },
          },
        });

        tl.to(train, {
          motionPath: {
            path: '#train-track-guide',
            align: '#train-track-guide',
            autoRotate: 90, // follow curve orientation
            alignOrigin: [0.5, 0.5],
          },
          ease: 'none',
        });
      }

      // Pin station platforms briefly during scroll for comfortable viewing
      STATIONS.forEach((station) => {
        const stationEl = document.getElementById(station.id);
        if (stationEl) {
          ScrollTrigger.create({
            trigger: stationEl,
            start: 'top 20%',
            end: 'bottom 80%',
            onEnter: () => {
              soundEngine.playTrackClack();
            },
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onActiveStationChange]);

  const scrollToStation = (index: number) => {
    const station = STATIONS[index];
    const el = document.getElementById(station.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden">
      {/* Living Parallax Scenery (Mountains, Sun, Moon, Birds, Stars) */}
      <EnvironmentLayers isNight={isNight} />

      {/* SVG Railway Track & Ballast with Active Signals */}
      <RailwayTrack progress={scrollProgress} isNight={isNight} />

      {/* GSAP MotionPath Follower Locomotive */}
      <div
        ref={trainRef}
        className="fixed top-0 left-0 z-40 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          opacity: scrollProgress < 0.005 ? 0.95 : 1,
        }}
      >
        <Locomotive isNight={isNight} isMoving={true} />
      </div>

      {/* 6 Railway Station Platforms (Section-Pinned / Padded) */}
      <div className="relative z-20 space-y-36 sm:space-y-48 pt-16 pb-40">
        <Station1Terminal
          isNight={isNight}
          onScrollToNext={() => scrollToStation(1)}
        />

        <Station2Switchyard isNight={isNight} />

        <Station3Bridge isNight={isNight} />

        <Station4MountainPass isNight={isNight} />

        <Station5Observatory isNight={isNight} />

        <Station6Pier
          isNight={isNight}
          onReturnToStart={() => scrollToStation(0)}
        />
      </div>

      {/* Fast-Travel Ticket Stub Schedule Navbar */}
      <FastTravelNavbar
        activeStationIndex={activeStationIndex}
        onSelectStation={scrollToStation}
      />
    </div>
  );
}
