'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  gsap.registerPlugin(ScrollTrigger);
}

interface ScenicJourneyProps {
  isNight: boolean;
  onActiveStationChange?: (index: number) => void;
}

export function ScenicTrainJourney({ isNight, onActiveStationChange }: ScenicJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraStageRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Setup GSAP Camera Follower & Locomotive Controller
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const trackGuide = document.getElementById('train-track-guide') as unknown as SVGPathElement | null;
      const train = document.getElementById('locomotive-group');
      const cameraStage = cameraStageRef.current;

      if (!trackGuide || !train || !cameraStage || !containerRef.current) return;

      const totalLength = trackGuide.getTotalLength();

      // Initialize train & camera at starting station
      const startPoint = trackGuide.getPointAtLength(0);
      const nextPoint = trackGuide.getPointAtLength(4);
      const startAngle = Math.atan2(nextPoint.y - startPoint.y, nextPoint.x - startPoint.x) * (180 / Math.PI);
      train.setAttribute('transform', `translate(${startPoint.x}, ${startPoint.y}) rotate(${startAngle})`);

      // Camera starts at 0 so Station 1 sits comfortably below the HUD header
      const viewportHeight = window.innerHeight;
      const initialCameraY = Math.min(0, -(startPoint.y - viewportHeight * 0.42));
      cameraStage.style.transform = `translate3d(0, ${initialCameraY}px, 0)`;

      // Master ScrollTrigger across 750vh
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Smooth damping for visible, cinematic train travel
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Map progress to active station (0 to 5)
          const stationIdx = Math.min(Math.floor(p * 6), 5);
          setActiveStationIndex(stationIdx);
          if (onActiveStationChange) {
            onActiveStationChange(stationIdx);
          }

          // Exact mathematical point on the SVG track
          const currentLength = p * totalLength;
          const pt = trackGuide.getPointAtLength(currentLength);
          const ahead = trackGuide.getPointAtLength(Math.min(currentLength + 6, totalLength));
          const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * (180 / Math.PI);

          // Update train transform directly inside SVG coordinate space
          train.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);

          // Camera Stage: Clamped at top (0) so Station 1 never collides with HUD header
          const currentViewportH = window.innerHeight;
          const minCameraY = -(6000 - currentViewportH);
          const rawCameraY = -(pt.y - currentViewportH * 0.42);
          const targetCameraY = Math.max(minCameraY, Math.min(0, rawCameraY));
          cameraStage.style.transform = `translate3d(0, ${targetCameraY}px, 0)`;
        },
      });

      // Play subtle track clack on station transitions
      STATIONS.forEach((_, idx) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `${(idx / 6) * 100}% top`,
          onEnter: () => soundEngine.playTrackClack(),
          onEnterBack: () => soundEngine.playTrackClack(),
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onActiveStationChange]);

  // Fast Travel jump
  const scrollToStation = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / 5) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[750vh]">
      {/* Pinned / Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Parallax Celestial & Mountain Landscape Background */}
        <EnvironmentLayers isNight={isNight} />

        {/* Dynamic Camera Stage (Smoothly follows the locomotive) */}
        <div
          ref={cameraStageRef}
          className="relative w-full h-[6000px] will-change-transform transition-transform duration-75 ease-out"
        >
          {/* SVG Railway Track & Locked Locomotive */}
          <RailwayTrack progress={scrollProgress} isNight={isNight} />

          {/* 6 Stations Alternating Along the Journey (Generous 1000px Spacing) */}
          <div className="absolute inset-0 w-full pointer-events-auto">
            {/* Station 1: Grand Central Terminal (Train on LEFT, Details on RIGHT) */}
            <div className="absolute top-[120px] right-3 sm:right-8 lg:right-16 left-auto w-full max-w-xl lg:max-w-2xl max-md:left-16 max-md:right-2 z-20">
              <Station1Terminal
                isNight={isNight}
                onScrollToNext={() => scrollToStation(1)}
              />
            </div>

            {/* Station 2: The Foundry & Switchyard (Train on RIGHT, Details on LEFT) */}
            <div className="absolute top-[1120px] left-3 sm:left-8 lg:left-16 right-auto w-full max-w-xl lg:max-w-2xl max-md:left-16 max-md:right-2 z-20">
              <Station2Switchyard isNight={isNight} />
            </div>

            {/* Station 3: Innovation Valley Suspension Bridge (Train on LEFT, Details on RIGHT) */}
            <div className="absolute top-[2120px] right-3 sm:right-8 lg:right-16 left-auto w-full max-w-xl lg:max-w-2xl max-md:left-16 max-md:right-2 z-20">
              <Station3Bridge isNight={isNight} />
            </div>

            {/* Station 4: The Mountain Pass (Train on RIGHT, Details on LEFT) */}
            <div className="absolute top-[3120px] left-3 sm:left-8 lg:left-16 right-auto w-full max-w-xl lg:max-w-2xl max-md:left-16 max-md:right-2 z-20">
              <Station4MountainPass isNight={isNight} />
            </div>

            {/* Station 5: The Summit Observatory (Train on LEFT, Details on RIGHT) */}
            <div className="absolute top-[4120px] right-3 sm:right-8 lg:right-16 left-auto w-full max-w-xl lg:max-w-2xl max-md:left-16 max-md:right-2 z-20">
              <Station5Observatory isNight={isNight} />
            </div>

            {/* Station 6: Coastal Lighthouse Pier (Train on RIGHT, Details on LEFT) */}
            <div className="absolute top-[5120px] left-3 sm:left-8 lg:left-16 right-auto w-full max-w-xl lg:max-w-2xl max-md:left-16 max-md:right-2 z-20">
              <Station6Pier
                isNight={isNight}
                onReturnToStart={() => scrollToStation(0)}
              />
            </div>
          </div>
        </div>

        {/* Fast-Travel Ticket Stub Schedule Navbar (Fixed at viewport bottom) */}
        <FastTravelNavbar
          activeStationIndex={activeStationIndex}
          onSelectStation={scrollToStation}
        />
      </div>
    </div>
  );
}
