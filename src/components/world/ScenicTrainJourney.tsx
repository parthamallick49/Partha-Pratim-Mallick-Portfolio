'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RailwayTrack } from './RailwayTrack';
import { EnvironmentLayers } from './EnvironmentLayers';
import { Station1Terminal } from '../stations/Station1Terminal';
import { Station2Switchyard } from '../stations/Station2Switchyard';
import { Station3Bridge } from '../stations/Station3Bridge';
import { Station4MountainPass } from '../stations/Station4MountainPass';
import { Station5Observatory } from '../stations/Station5Observatory';
import { Station6Pier } from '../stations/Station6Pier';
import { FastTravelNavbar } from '../navigation/FastTravelNavbar';
import { soundEngine } from '@/lib/audioSynthesizer';
import { STATIONS } from '@/data/portfolioData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScenicJourneyProps {
  isNight?: boolean;
  onActiveStationChange?: (index: number) => void;
}

export function ScenicTrainJourney({
  isNight = false,
  onActiveStationChange,
}: ScenicJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraStageRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Setup GSAP Camera Follower & Articulated Multi-Carriage Train Controller
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const trackGuide = document.getElementById('train-track-guide') as unknown as SVGPathElement | null;
      const carLead = document.getElementById('train-car-lead');
      const carCoach1 = document.getElementById('train-car-coach-1');
      const carCoach2 = document.getElementById('train-car-coach-2');
      const carRear = document.getElementById('train-car-rear');
      const smokeFront = document.getElementById('front-smoke-group');
      const smokeRear = document.getElementById('rear-smoke-group');
      const lightFront = document.getElementById('front-headlight-group');
      const lightRear = document.getElementById('rear-headlight-group');
      const lampFront = document.getElementById('front-headlight-lamp');
      const lampRear = document.getElementById('rear-headlight-lamp');
      const cameraStage = cameraStageRef.current;

      if (!trackGuide || !carLead || !cameraStage || !containerRef.current) return;

      const totalLength = trackGuide.getTotalLength();

      // Track buffer geometry:
      // Lead-in from (240, 120) to (240, 400) is 280px.
      // Exit tail from (960, 5400) to (960, 5680) is 280px.
      const startDist = 280;
      const endDist = Math.max(startDist + 100, totalLength - 280);
      const journeyLength = endDist - startDist;

      // Helper to compute and apply articulated transform along the SVG track path
      const applyCarTransform = (el: HTMLElement | null, dist: number) => {
        if (!el) return;
        const clampedDist = Math.max(0, Math.min(dist, totalLength));
        const pt = trackGuide.getPointAtLength(clampedDist);
        const ahead = trackGuide.getPointAtLength(Math.min(clampedDist + 4, totalLength));
        const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * (180 / Math.PI);
        el.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
      };

      // Initial placement at Station 1 (Departure)
      const initLeadDist = startDist;
      applyCarTransform(carLead, initLeadDist);
      applyCarTransform(carCoach1, initLeadDist - 60);
      applyCarTransform(carCoach2, initLeadDist - 120);
      applyCarTransform(carRear, initLeadDist - 180);

      // Default initial state: Lead engine smoke & light active, rear engine off
      if (smokeFront) {
        smokeFront.classList.add('smoke-active');
        smokeFront.classList.remove('smoke-hidden');
      }
      if (smokeRear) {
        smokeRear.classList.add('smoke-hidden');
        smokeRear.classList.remove('smoke-active');
      }
      if (lightFront) {
        lightFront.classList.add('headlight-active');
        lightFront.classList.remove('headlight-hidden');
      }
      if (lightRear) {
        lightRear.classList.add('headlight-hidden');
        lightRear.classList.remove('headlight-active');
      }
      if (lampFront) {
        lampFront.setAttribute('fill', isNight ? '#FEF08A' : '#FDE047');
        if (isNight) lampFront.setAttribute('filter', 'url(#railGlow)');
      }
      if (lampRear) {
        lampRear.setAttribute('fill', '#3A3828');
        lampRear.removeAttribute('filter');
      }

      cameraStage.style.transform = `translate3d(0, 0px, 0)`;

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

          // Exact mathematical position for each articulated car along the S-curve track
          const leadDist = startDist + p * journeyLength;
          applyCarTransform(carLead, leadDist);
          applyCarTransform(carCoach1, leadDist - 60);
          applyCarTransform(carCoach2, leadDist - 120);
          applyCarTransform(carRear, leadDist - 180);

          // Scroll-Direction Dependent Toy Train Smoke & Headlights:
          // Forward scroll (down): Front engine throws fluffy smoke circles & front headlight illuminates forward tracks.
          // Backward scroll (up): Rear engine throws fluffy smoke circles & rear headlight illuminates reverse tracks.
          if (self.direction >= 0) {
            // Forward travel
            if (smokeFront) {
              smokeFront.classList.add('smoke-active');
              smokeFront.classList.remove('smoke-hidden');
            }
            if (smokeRear) {
              smokeRear.classList.add('smoke-hidden');
              smokeRear.classList.remove('smoke-active');
            }
            if (lightFront) {
              lightFront.classList.add('headlight-active');
              lightFront.classList.remove('headlight-hidden');
            }
            if (lightRear) {
              lightRear.classList.add('headlight-hidden');
              lightRear.classList.remove('headlight-active');
            }
            if (lampFront) {
              lampFront.setAttribute('fill', isNight ? '#FEF08A' : '#FDE047');
              if (isNight) lampFront.setAttribute('filter', 'url(#railGlow)');
            }
            if (lampRear) {
              lampRear.setAttribute('fill', '#3A3828');
              lampRear.removeAttribute('filter');
            }
          } else {
            // Backward reverse travel
            if (smokeFront) {
              smokeFront.classList.add('smoke-hidden');
              smokeFront.classList.remove('smoke-active');
            }
            if (smokeRear) {
              smokeRear.classList.add('smoke-active');
              smokeRear.classList.remove('smoke-hidden');
            }
            if (lightFront) {
              lightFront.classList.add('headlight-hidden');
              lightFront.classList.remove('headlight-active');
            }
            if (lightRear) {
              lightRear.classList.add('headlight-active');
              lightRear.classList.remove('headlight-hidden');
            }
            if (lampFront) {
              lampFront.setAttribute('fill', '#3A3828');
              lampFront.removeAttribute('filter');
            }
            if (lampRear) {
              lampRear.setAttribute('fill', isNight ? '#FEF08A' : '#FDE047');
              if (isNight) lampRear.setAttribute('filter', 'url(#railGlow)');
            }
          }

          // Camera Stage: Smoothly follows train from 0 to -4980px
          // Keeping all station cards safely positioned between HUD header and Ticket Stub navbar
          const targetCameraY = -p * 4980;
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
          {/* SVG Railway Track & Articulated Multi-Carriage Train */}
          <RailwayTrack progress={scrollProgress} isNight={isNight} />

          {/* 6 Stations Alternating Along the Journey (Generous 1000px Spacing) */}
          <div className="absolute inset-0 w-full pointer-events-auto">
            {/* Station 1: Grand Central Terminal (Train on LEFT, Details on RIGHT) */}
            <div className="absolute top-[140px] right-3 sm:right-6 lg:right-12 left-auto w-full max-w-md sm:max-w-lg lg:max-w-xl max-md:left-14 max-md:right-2 z-20">
              <Station1Terminal
                isNight={isNight}
                onScrollToNext={() => scrollToStation(1)}
              />
            </div>

            {/* Station 2: The Foundry & Switchyard (Train on RIGHT, Details on LEFT) */}
            <div className="absolute top-[1140px] left-3 sm:left-6 lg:left-12 right-auto w-full max-w-md sm:max-w-lg lg:max-w-xl max-md:left-14 max-md:right-2 z-20">
              <Station2Switchyard isNight={isNight} />
            </div>

            {/* Station 3: Innovation Valley Suspension Bridge (Train on LEFT, Details on RIGHT) */}
            <div className="absolute top-[2140px] right-3 sm:right-6 lg:right-12 left-auto w-full max-w-md sm:max-w-lg lg:max-w-xl max-md:left-14 max-md:right-2 z-20">
              <Station3Bridge isNight={isNight} />
            </div>

            {/* Station 4: The Mountain Pass (Train on RIGHT, Details on LEFT) */}
            <div className="absolute top-[3140px] left-3 sm:left-6 lg:left-12 right-auto w-full max-w-md sm:max-w-lg lg:max-w-xl max-md:left-14 max-md:right-2 z-20">
              <Station4MountainPass isNight={isNight} />
            </div>

            {/* Station 5: The Summit Observatory (Train on LEFT, Details on RIGHT) */}
            <div className="absolute top-[4140px] right-3 sm:right-6 lg:right-12 left-auto w-full max-w-md sm:max-w-lg lg:max-w-xl max-md:left-14 max-md:right-2 z-20">
              <Station5Observatory isNight={isNight} />
            </div>

            {/* Station 6: Coastal Pier & Telegraph (Train on RIGHT, Details on LEFT) */}
            <div className="absolute top-[5040px] left-3 sm:left-6 lg:left-12 right-auto w-full max-w-md sm:max-w-lg lg:max-w-xl max-md:left-14 max-md:right-2 z-20">
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
