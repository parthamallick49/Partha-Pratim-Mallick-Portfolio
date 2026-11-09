'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
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
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Setup GSAP ScrollTrigger & MotionPath on SVG #locomotive-group
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const train = document.getElementById('locomotive-group');
      const trackGuide = document.getElementById('train-track-guide');

      if (train && trackGuide) {
        // Timeline that scrubs the SVG locomotive along the track
        gsap.to('#locomotive-group', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
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
          motionPath: {
            path: '#train-track-guide',
            align: '#train-track-guide',
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          ease: 'none',
        });
      }

      // Station milestones clack audio
      STATIONS.forEach((station) => {
        const stationEl = document.getElementById(station.id);
        if (stationEl) {
          ScrollTrigger.create({
            trigger: stationEl,
            start: 'top 30%',
            end: 'bottom 70%',
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

      {/* SVG Railway Track with center-locked Locomotive */}
      <RailwayTrack progress={scrollProgress} isNight={isNight} />

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
