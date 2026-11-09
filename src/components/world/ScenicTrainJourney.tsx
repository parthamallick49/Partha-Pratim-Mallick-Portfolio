'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
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

interface LiveTourState {
  status: 'idle' | 'cruising' | 'dwelling' | 'finished';
  targetStationIndex: number;
  countdown: number;
}

interface ScenicJourneyProps {
  isNight?: boolean;
  onActiveStationChange?: (index: number) => void;
  isLiveView?: boolean;
  onLiveViewChange?: (active: boolean) => void;
  onLiveTourStateChange?: (state: LiveTourState) => void;
}

interface DynamicSmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  growth: number;
  opacity: number;
  fade: number;
  el: SVGGElement;
  c1: SVGCircleElement;
  c2: SVGCircleElement;
  c3: SVGCircleElement;
  c4: SVGCircleElement;
}

export function ScenicTrainJourney({
  isNight = false,
  onActiveStationChange,
  isLiveView = false,
  onLiveViewChange,
  onLiveTourStateChange,
}: ScenicJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraStageRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Live Tour Autopilot Engine references
  const liveTweenRef = useRef<gsap.core.Tween | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isLiveViewRef = useRef(isLiveView);
  isLiveViewRef.current = isLiveView;
  const activeStationIndexRef = useRef(activeStationIndex);
  activeStationIndexRef.current = activeStationIndex;
  const onLiveTourStateChangeRef = useRef(onLiveTourStateChange);
  onLiveTourStateChangeRef.current = onLiveTourStateChange;
  const onLiveViewChangeRef = useRef(onLiveViewChange);
  onLiveViewChangeRef.current = onLiveViewChange;
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Ultra-Smooth, Slow Cinematic Scroll Engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.6, // Generous, smooth deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth decay
      smoothWheel: true,
      wheelMultiplier: 0.65, // Deliberately slower, controlled wheel progression
      touchMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    // Connect to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      lenisRef.current = null;
    };
  }, []);

  const stopLiveTour = () => {
    if (liveTweenRef.current) {
      liveTweenRef.current.kill();
      liveTweenRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (lenisRef.current) {
      // Cleanly stop any active programmatic scrollTo without resetting user position
      lenisRef.current.stop();
      lenisRef.current.start();
    }
  };

  const getStationScrollY = (stationIdx: number): number => {
    if (!containerRef.current) return 0;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = Math.max(1, containerRef.current.offsetHeight - window.innerHeight);
    return containerTop + (stationIdx / 5) * totalScrollable;
  };

  // Setup GSAP Camera Follower, Articulated Train, and Dynamic Procedural Smoke Engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animFrameId: number;
    let idlePuffIntervalId: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      const trackGuide = document.getElementById('train-track-guide') as unknown as SVGPathElement | null;
      const carLead = document.getElementById('train-car-lead');
      const carCoach1 = document.getElementById('train-car-coach-1');
      const carCoach2 = document.getElementById('train-car-coach-2');
      const carRear = document.getElementById('train-car-rear');
      const lightFront = document.getElementById('front-headlight-group');
      const lightRear = document.getElementById('rear-headlight-group');
      const lampFront = document.getElementById('front-headlight-lamp');
      const lampRear = document.getElementById('rear-headlight-lamp');
      const leadDriveRods = document.getElementById('lead-drive-rods');
      const rearDriveRods = document.getElementById('rear-drive-rods');
      const dynamicSmokeContainer = document.getElementById('dynamic-smoke-container');
      const cameraStage = cameraStageRef.current;

      if (!trackGuide || !carLead || !cameraStage || !containerRef.current) return;

      const totalLength = trackGuide.getTotalLength();

      // Track buffer geometry:
      // Lead-in from (240, 120) to (240, 400) is 280px.
      // Exit tail from (960, 5400) to (960, 5680) is 280px.
      const startDist = 280;
      const endDist = Math.max(startDist + 100, totalLength - 280);
      const journeyLength = endDist - startDist;

      // =========================================================================
      // DYNAMIC PROCEDURAL TOY TRAIN SMOKE SYSTEM (World-Space Lingering Particles)
      // =========================================================================
      const activeParticles: DynamicSmokeParticle[] = [];
      const particlePool: DynamicSmokeParticle[] = [];
      const POOL_SIZE = 45;

      if (dynamicSmokeContainer) {
        dynamicSmokeContainer.innerHTML = '';
        for (let i = 0; i < POOL_SIZE; i++) {
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('filter', 'url(#toySmokeFilter)');
          g.style.display = 'none';

          // Main cloud center
          const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c1.setAttribute('cx', '0');
          c1.setAttribute('cy', '0');
          c1.setAttribute('r', '6');
          c1.setAttribute('fill', '#FFFFFF');
          c1.setAttribute('stroke', '#8A7868');
          c1.setAttribute('stroke-width', '1.1');

          // Left puff lobe
          const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c2.setAttribute('cx', '-3');
          c2.setAttribute('cy', '2');
          c2.setAttribute('r', '4.5');
          c2.setAttribute('fill', '#FAF5EE');
          c2.setAttribute('stroke', '#8A7868');
          c2.setAttribute('stroke-width', '0.9');

          // Right puff lobe
          const c3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c3.setAttribute('cx', '3');
          c3.setAttribute('cy', '-1.5');
          c3.setAttribute('r', '4');
          c3.setAttribute('fill', '#EFE8DB');
          c3.setAttribute('stroke', '#8A7868');
          c3.setAttribute('stroke-width', '0.9');

          // Highlight glint
          const c4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c4.setAttribute('cx', '-1');
          c4.setAttribute('cy', '-2');
          c4.setAttribute('r', '1.6');
          c4.setAttribute('fill', '#FFFFFF');
          c4.setAttribute('opacity', '0.9');

          g.appendChild(c1);
          g.appendChild(c2);
          g.appendChild(c3);
          g.appendChild(c4);
          dynamicSmokeContainer.appendChild(g);

          particlePool.push({
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            r: 6,
            growth: 0.35,
            opacity: 0.9,
            fade: 0.015,
            el: g,
            c1,
            c2,
            c3,
            c4,
          });
        }
      }

      // Spawns a real toy smoke puff in world track coordinates
      const spawnSmokePuff = (
        originX: number,
        originY: number,
        headingAngleRad: number,
        isReverse: boolean = false
      ) => {
        if (particlePool.length === 0) return;
        const p = particlePool.pop()!;

        p.x = originX + (Math.random() - 0.5) * 4;
        p.y = originY + (Math.random() - 0.5) * 4;
        p.r = 5.5 + Math.random() * 2.5;
        p.growth = 0.32 + Math.random() * 0.15;
        p.opacity = 0.92;
        p.fade = 0.014 + Math.random() * 0.006;

        // Velocity: Pushed backward opposite to travel direction + buoyant upward float (-Y)
        const throwImpulse = isReverse
          ? 0.7 + Math.random() * 0.5
          : -(0.7 + Math.random() * 0.5);

        p.vx = Math.cos(headingAngleRad) * throwImpulse + (Math.random() - 0.5) * 0.5;
        p.vy = Math.sin(headingAngleRad) * throwImpulse - (0.5 + Math.random() * 0.4);

        p.el.setAttribute('transform', `translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`);
        p.el.style.opacity = p.opacity.toFixed(2);
        p.el.style.display = 'block';

        activeParticles.push(p);
      };

      // Physics update loop for all floating smoke particles
      const updateSmokePhysics = () => {
        for (let i = activeParticles.length - 1; i >= 0; i--) {
          const p = activeParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.r += p.growth;
          p.opacity -= p.fade;

          if (p.opacity <= 0) {
            p.el.style.display = 'none';
            activeParticles.splice(i, 1);
            particlePool.push(p);
          } else {
            p.el.setAttribute('transform', `translate(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`);
            p.el.style.opacity = p.opacity.toFixed(2);

            const r = p.r;
            p.c1.setAttribute('r', r.toFixed(1));

            p.c2.setAttribute('cx', (-r * 0.45).toFixed(1));
            p.c2.setAttribute('cy', (r * 0.3).toFixed(1));
            p.c2.setAttribute('r', (r * 0.72).toFixed(1));

            p.c3.setAttribute('cx', (r * 0.45).toFixed(1));
            p.c3.setAttribute('cy', (-r * 0.25).toFixed(1));
            p.c3.setAttribute('r', (r * 0.68).toFixed(1));

            p.c4.setAttribute('cx', (-r * 0.15).toFixed(1));
            p.c4.setAttribute('cy', (-r * 0.35).toFixed(1));
            p.c4.setAttribute('r', (r * 0.3).toFixed(1));
          }
        }
        animFrameId = requestAnimationFrame(updateSmokePhysics);
      };
      animFrameId = requestAnimationFrame(updateSmokePhysics);

      // Helper to compute and apply articulated transform along the SVG track path with centrifugal sway
      const applyCarTransform = (el: HTMLElement | null, dist: number, swayFactor: number = 0) => {
        if (!el) return { x: 0, y: 0, angle: 0, angleRad: 0 };
        const clampedDist = Math.max(0, Math.min(dist, totalLength));
        const pt = trackGuide.getPointAtLength(clampedDist);
        const ahead = trackGuide.getPointAtLength(Math.min(clampedDist + 4, totalLength));
        const angleRad = Math.atan2(ahead.y - pt.y, ahead.x - pt.x);
        let angle = angleRad * (180 / Math.PI);

        // Add subtle rail banking / micro-sway into turns
        if (swayFactor !== 0) {
          angle += swayFactor;
        }

        el.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        return { x: pt.x, y: pt.y, angle, angleRad };
      };

      // Initial placement at Station 1 (Departure)
      const initLeadDist = startDist;
      let currentLeadInfo = applyCarTransform(carLead, initLeadDist);
      applyCarTransform(carCoach1, initLeadDist - 60);
      applyCarTransform(carCoach2, initLeadDist - 120);
      let currentRearInfo = applyCarTransform(carRear, initLeadDist - 180);

      // Default initial headlights: Lead engine active, rear engine off
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

      let lastPuffDistance = initLeadDist;
      let currentDirection = 1;

      // Master ScrollTrigger across 1600vh synchronized with Lenis smooth engine
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // Harmonized with Lenis smooth physics
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          currentDirection = self.direction;

          // Map progress to active station (0 to 5)
          const stationIdx = Math.min(Math.floor(p * 6), 5);
          setActiveStationIndex(stationIdx);
          if (onActiveStationChange) {
            onActiveStationChange(stationIdx);
          }

          // Exact mathematical position for each articulated car along the S-curve track
          const leadDist = startDist + p * journeyLength;

          // Subtle centrifugal banking sway on coaches
          const sway = Math.sin(leadDist * 0.005) * 1.5;
          currentLeadInfo = applyCarTransform(carLead, leadDist, sway * 0.5);
          applyCarTransform(carCoach1, leadDist - 60, sway * 0.8);
          applyCarTransform(carCoach2, leadDist - 120, -sway * 0.8);
          currentRearInfo = applyCarTransform(carRear, leadDist - 180, -sway * 0.5);

          // Realistic Mechanical Piston / Drive-Rod Pumping
          const pistonOffset = Math.sin(leadDist * 0.15) * 3.5;
          if (leadDriveRods) {
            leadDriveRods.setAttribute('transform', `translate(${pistonOffset.toFixed(2)}, 0)`);
          }
          if (rearDriveRods) {
            rearDriveRods.setAttribute('transform', `translate(${(-pistonOffset).toFixed(2)}, 0)`);
          }

          // Spawn Dynamic Smoke Puff every ~18px of physical movement
          const deltaMove = Math.abs(leadDist - lastPuffDistance);
          if (deltaMove >= 18) {
            lastPuffDistance = leadDist;

            if (self.direction >= 0) {
              // Forward travel: Front chimney throws smoke puff drifting backward along track
              const frontChimneyX = currentLeadInfo.x + Math.cos(currentLeadInfo.angleRad) * 18;
              const frontChimneyY = currentLeadInfo.y + Math.sin(currentLeadInfo.angleRad) * 18;
              spawnSmokePuff(frontChimneyX, frontChimneyY, currentLeadInfo.angleRad, false);
            } else {
              // Backward reverse travel: Rear engine chimney throws smoke puff drifting forward
              const rearChimneyX = currentRearInfo.x - Math.cos(currentRearInfo.angleRad) * 15;
              const rearChimneyY = currentRearInfo.y - Math.sin(currentRearInfo.angleRad) * 15;
              spawnSmokePuff(rearChimneyX, rearChimneyY, currentRearInfo.angleRad, true);
            }
          }

          // Direction-dependent headlights
          if (self.direction >= 0) {
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

          // Camera Stage: Smoothly follows train without CSS transition fighting
          const targetCameraY = -p * 4980;
          cameraStage.style.transform = `translate3d(0, ${targetCameraY.toFixed(1)}px, 0)`;
        },
      });

      // Subtle Idle Puff every 950ms when stationary so train feels alive
      idlePuffIntervalId = setInterval(() => {
        if (currentDirection >= 0) {
          const frontChimneyX = currentLeadInfo.x + Math.cos(currentLeadInfo.angleRad) * 18;
          const frontChimneyY = currentLeadInfo.y + Math.sin(currentLeadInfo.angleRad) * 18;
          spawnSmokePuff(frontChimneyX, frontChimneyY, currentLeadInfo.angleRad, false);
        } else {
          const rearChimneyX = currentRearInfo.x - Math.cos(currentRearInfo.angleRad) * 15;
          const rearChimneyY = currentRearInfo.y - Math.sin(currentRearInfo.angleRad) * 15;
          spawnSmokePuff(rearChimneyX, rearChimneyY, currentRearInfo.angleRad, true);
        }
      }, 950);

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
      cancelAnimationFrame(animFrameId);
      clearInterval(idlePuffIntervalId);
      ctx.revert();
    };
  }, [onActiveStationChange, isNight]);

  // Live Tour Driver Effect
  useEffect(() => {
    if (!isLiveView) {
      stopLiveTour();
      return;
    }

    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = Math.max(1, containerRef.current.offsetHeight - window.innerHeight);
    const currentScroll = window.scrollY;
    const currentFraction = Math.max(0, Math.min(1, (currentScroll - containerTop) / totalScrollable));
    const currentStationEst = currentFraction * 5;

    // Determine target station: if near end, loop from Station 0; else next station ahead
    let startTarget = 0;
    if (currentStationEst >= 4.9) {
      startTarget = 0;
    } else {
      startTarget = Math.min(5, Math.floor(currentStationEst + 1));
    }

    const runTourStep = (targetIdx: number) => {
      if (!isLiveViewRef.current) return;

      // Locomotive whistle sounds as train starts moving!
      soundEngine.playWhistle();

      const targetY = getStationScrollY(targetIdx);
      const dist = Math.abs(targetY - window.scrollY);
      // Relaxed, cinematic pacing (~10 to 12 seconds per station segment)
      const duration = Math.max(5.5, Math.min(14.0, (dist / (totalScrollable / 5)) * 10.5));

      onLiveTourStateChangeRef.current?.({
        status: 'cruising',
        targetStationIndex: targetIdx,
        countdown: 10,
      });

      const scrollObj = { y: window.scrollY };
      liveTweenRef.current = gsap.to(scrollObj, {
        y: targetY,
        duration,
        ease: 'power1.inOut',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        },
        onComplete: () => {
          soundEngine.playTrackClack();

          if (targetIdx >= 5) {
            // Reached Station 06 (Terminal Pier)
            let dwellCount = 10;
            onLiveTourStateChangeRef.current?.({
              status: 'dwelling',
              targetStationIndex: 5,
              countdown: dwellCount,
            });

            countdownIntervalRef.current = setInterval(() => {
              dwellCount -= 1;
              if (dwellCount > 0) {
                onLiveTourStateChangeRef.current?.({
                  status: 'dwelling',
                  targetStationIndex: 5,
                  countdown: dwellCount,
                });
              } else {
                if (countdownIntervalRef.current) {
                  clearInterval(countdownIntervalRef.current);
                  countdownIntervalRef.current = null;
                }
                onLiveTourStateChangeRef.current?.({
                  status: 'finished',
                  targetStationIndex: 5,
                  countdown: 0,
                });
                onLiveViewChangeRef.current?.(false);
              }
            }, 1000);
          } else {
            // Dwell for 10 seconds at this intermediate station
            let dwellCount = 10;
            onLiveTourStateChangeRef.current?.({
              status: 'dwelling',
              targetStationIndex: targetIdx,
              countdown: dwellCount,
            });

            countdownIntervalRef.current = setInterval(() => {
              dwellCount -= 1;
              if (dwellCount > 0) {
                onLiveTourStateChangeRef.current?.({
                  status: 'dwelling',
                  targetStationIndex: targetIdx,
                  countdown: dwellCount,
                });
              } else {
                if (countdownIntervalRef.current) {
                  clearInterval(countdownIntervalRef.current);
                  countdownIntervalRef.current = null;
                }
                if (isLiveViewRef.current) {
                  runTourStep(targetIdx + 1);
                }
              }
            }, 1000);
          }
        },
      });
    };

    runTourStep(startTarget);

    return () => {
      stopLiveTour();
    };
  }, [isLiveView]);

  // Detect intentional manual user interruption during Live Tour (auto-pause on intentional scroll/touch)
  useEffect(() => {
    if (!isLiveView) return;

    // 600ms grace period so clicking/tapping the button doesn't immediately abort
    const activationTime = Date.now();
    let accumulatedDelta = 0;

    const pauseTour = () => {
      if (!isLiveViewRef.current) return;
      stopLiveTour();
      onLiveViewChangeRef.current?.(false);
      onLiveTourStateChangeRef.current?.({
        status: 'idle',
        targetStationIndex: activeStationIndexRef.current,
        countdown: 10,
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (Date.now() - activationTime < 600) return;
      accumulatedDelta += Math.abs(e.deltaY) + Math.abs(e.deltaX);
      if (accumulatedDelta > 35) {
        pauseTour();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Date.now() - activationTime < 600) return;
      const currentY = e.touches[0]?.clientY || 0;
      if (Math.abs(currentY - touchStartY) > 35) {
        pauseTour();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (Date.now() - activationTime < 600) return;
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
        pauseTour();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKey, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isLiveView]);

  // Fast Travel jump (also cleanly suspends Live Tour if active)
  const scrollToStation = (index: number) => {
    if (isLiveViewRef.current) {
      stopLiveTour();
      onLiveViewChangeRef.current?.(false);
    }
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / 5) * totalScrollable;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, { duration: 1.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[1600vh]">
      {/* Pinned / Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Parallax Celestial & Mountain Landscape Background with Real Scroll Depth */}
        <EnvironmentLayers isNight={isNight} progress={scrollProgress} />

        {/* Dynamic Camera Stage (Zero CSS lag, pure 60/120fps GPU composited) */}
        <div
          ref={cameraStageRef}
          className="relative w-full h-[6000px] will-change-transform"
        >
          {/* SVG Railway Track, Articulated Train & Dynamic Smoke Particles */}
          <RailwayTrack progress={scrollProgress} isNight={isNight} />

          {/* 6 Stations Alternating Along the Journey with Arrival Focusing Glow */}
          <div className="absolute inset-0 w-full pointer-events-auto">
            {/* Station 1: Grand Central Terminal (Train on LEFT, Details on RIGHT) */}
            <div
              className={`absolute top-[120px] right-3 sm:right-6 lg:right-10 left-auto w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[62vw] xl:w-[58vw] max-w-3xl xl:max-w-4xl max-md:left-14 max-md:right-2 z-20 transition-all duration-700 ease-out ${
                activeStationIndex === 0
                  ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl shadow-rail-orange/15'
                  : 'opacity-40 scale-[0.98] pointer-events-none hover:opacity-75'
              }`}
            >
              <Station1Terminal
                isNight={isNight}
                onScrollToNext={() => scrollToStation(1)}
              />
            </div>

            {/* Station 2: The Foundry & Switchyard (Train on RIGHT, Details on LEFT) */}
            <div
              className={`absolute top-[1120px] left-3 sm:left-6 lg:left-10 right-auto w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[62vw] xl:w-[58vw] max-w-3xl xl:max-w-4xl max-md:left-14 max-md:right-2 z-20 transition-all duration-700 ease-out ${
                activeStationIndex === 1
                  ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl shadow-rail-gold/15'
                  : 'opacity-40 scale-[0.98] pointer-events-none hover:opacity-75'
              }`}
            >
              <Station2Switchyard isNight={isNight} />
            </div>

            {/* Station 3: Innovation Valley Suspension Bridge (Train on LEFT, Details on RIGHT) */}
            <div
              className={`absolute top-[2120px] right-3 sm:right-6 lg:right-10 left-auto w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[62vw] xl:w-[58vw] max-w-3xl xl:max-w-4xl max-md:left-14 max-md:right-2 z-20 transition-all duration-700 ease-out ${
                activeStationIndex === 2
                  ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl shadow-rail-orange/15'
                  : 'opacity-40 scale-[0.98] pointer-events-none hover:opacity-75'
              }`}
            >
              <Station3Bridge isNight={isNight} />
            </div>

            {/* Station 4: The Mountain Pass (Train on RIGHT, Details on LEFT) */}
            <div
              className={`absolute top-[3120px] left-3 sm:left-6 lg:left-10 right-auto w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[62vw] xl:w-[58vw] max-w-3xl xl:max-w-4xl max-md:left-14 max-md:right-2 z-20 transition-all duration-700 ease-out ${
                activeStationIndex === 3
                  ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl shadow-rail-teal/20'
                  : 'opacity-40 scale-[0.98] pointer-events-none hover:opacity-75'
              }`}
            >
              <Station4MountainPass isNight={isNight} />
            </div>

            {/* Station 5: The Summit Observatory (Train on LEFT, Details on RIGHT) */}
            <div
              className={`absolute top-[4120px] right-3 sm:right-6 lg:right-10 left-auto w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[62vw] xl:w-[58vw] max-w-3xl xl:max-w-4xl max-md:left-14 max-md:right-2 z-20 transition-all duration-700 ease-out ${
                activeStationIndex === 4
                  ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl shadow-rail-gold/15'
                  : 'opacity-40 scale-[0.98] pointer-events-none hover:opacity-75'
              }`}
            >
              <Station5Observatory isNight={isNight} />
            </div>

            {/* Station 6: Coastal Pier & Telegraph (Train on RIGHT, Details on LEFT) */}
            <div
              className={`absolute top-[5050px] left-3 sm:left-6 lg:left-10 right-auto w-[90vw] sm:w-[84vw] md:w-[68vw] lg:w-[62vw] xl:w-[58vw] max-w-3xl xl:max-w-4xl max-md:left-14 max-md:right-2 z-20 transition-all duration-700 ease-out ${
                activeStationIndex === 5
                  ? 'opacity-100 scale-100 pointer-events-auto shadow-2xl shadow-rail-orange/15'
                  : 'opacity-40 scale-[0.98] pointer-events-none hover:opacity-75'
              }`}
            >
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
