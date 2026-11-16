'use client';

import React from 'react';

interface EnvironmentLayersProps {
  isNight?: boolean;
  progress?: number;
}

export function EnvironmentLayers({ isNight = false, progress = 0 }: EnvironmentLayersProps) {
  // Parallax offsets (scaled gently to prevent clipping)
  const layer1Y = progress * 60;   // Distant peaks: slow drift
  const layer2Y = progress * 130;  // Midground ridges: medium drift
  const layer3Y = progress * 210;  // Foreground pines: faster drift
  const celestialY = progress * 40; // Sun/Moon subtle rise

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden transition-colors duration-1000">
      {/* Sky Gradient Base */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isNight ? 'journey-sky-night' : 'journey-sky-day'
        }`}
      />

      {/* Sun / Moon Celestial Body (Placed on Left with subtle parallax float) */}
      <div
        className="absolute left-[4%] sm:left-[10%] top-14 sm:top-24 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(0, ${celestialY * 0.4}px, 0)`,
        }}
      >
        {!isNight ? (
          /* Radiant Bloody Orange Sun */
          <div className="relative w-16 h-16 sm:w-28 sm:h-28 md:w-32 md:h-32">
            <div className="absolute inset-0 rounded-full bg-rail-orange/20 filter blur-xl animate-pulse" />
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-rail-orange via-[#E55A44] to-[#FBBF24] shadow-[0_0_50px_rgba(200,70,48,0.5)] border-2 border-rail-orange/40" />
            {/* Atmospheric Sun Rings */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-rail-orange/20 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
        ) : (
          /* Glowing Crescent / Half Moon */
          <div className="relative w-14 h-14 sm:w-24 sm:h-24 md:w-28 md:h-28">
            <div className="absolute inset-0 rounded-full bg-[#FEF08A]/15 filter blur-xl" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(254,240,138,0.6)]">
              <path
                d="M 50 10 A 40 40 0 1 0 90 60 A 35 35 0 1 1 50 10 Z"
                fill="#FEF08A"
                stroke="#FDE047"
                strokeWidth="1"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Night Sky Twinkling Stars */}
      {isNight && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[8%] left-[12%] w-1.5 h-1.5 rounded-full bg-white twinkle-1" />
          <div className="absolute top-[14%] left-[28%] w-1 h-1 rounded-full bg-amber-200 twinkle-2" />
          <div className="absolute top-[6%] left-[45%] w-2 h-2 rounded-full bg-white twinkle-3" />
          <div className="absolute top-[20%] left-[62%] w-1.5 h-1.5 rounded-full bg-teal-200 twinkle-1" />
          <div className="absolute top-[12%] left-[82%] w-2 h-2 rounded-full bg-amber-100 twinkle-2" />
          <div className="absolute top-[28%] left-[75%] w-1 h-1 rounded-full bg-white twinkle-3" />
          <div className="absolute top-[32%] left-[18%] w-1.5 h-1.5 rounded-full bg-cyan-200 twinkle-2" />
          <div className="absolute top-[40%] left-[88%] w-1.5 h-1.5 rounded-full bg-white twinkle-1" />
          <div className="absolute top-[52%] left-[10%] w-2 h-2 rounded-full bg-amber-200 twinkle-3" />
          <div className="absolute top-[65%] left-[80%] w-1 h-1 rounded-full bg-white twinkle-2" />
          <div className="absolute top-[78%] left-[22%] w-1.5 h-1.5 rounded-full bg-teal-200 twinkle-1" />
          <div className="absolute top-[85%] left-[68%] w-2 h-2 rounded-full bg-white twinkle-3" />
        </div>
      )}

      {/* Daytime Flocks of Birds */}
      {!isNight && (
        <div className="absolute top-24 left-0 w-full overflow-hidden flying-birds" aria-hidden="true">
          <svg viewBox="0 0 200 40" className="w-36 h-10 text-rail-teal/70">
            <path d="M 10 20 Q 20 10 30 20 Q 40 10 50 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 60 12 Q 70 4 80 12 Q 90 4 100 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 115 25 Q 123 18 131 25 Q 139 18 147 25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Layer 1: Distant Misty Mountain Silhouettes (Parallax Depth) */}
      <div
        className="absolute bottom-0 w-full h-[52vh] min-h-[340px] opacity-70 will-change-transform"
        style={{
          transform: `translate3d(0, ${layer1Y}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 400 L 0 240 Q 180 140 360 220 Q 560 110 760 200 Q 940 90 1140 230 Q 1300 150 1440 240 L 1440 400 Z"
            fill={isNight ? '#0C1C1B' : '#88ACA8'}
            className="transition-colors duration-1000"
          />
        </svg>
      </div>

      {/* Layer 2: Midground Alpine Ridge & Forest Hills (Parallax Depth) */}
      <div
        className="absolute bottom-0 w-full h-[36vh] min-h-[250px] opacity-85 will-change-transform"
        style={{
          transform: `translate3d(0, ${layer2Y}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 300 L 0 160 Q 200 80 440 150 Q 680 70 920 160 Q 1180 90 1440 170 L 1440 300 Z"
            fill={isNight ? '#132B29' : '#4C8583'}
            className="transition-colors duration-1000"
          />
        </svg>
      </div>

      {/* Layer 3: Foreground Pine Silhouettes (Parallax Depth) */}
      <div
        className="absolute bottom-0 w-full h-[22vh] min-h-[140px] will-change-transform"
        style={{
          transform: `translate3d(0, ${layer3Y}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 150 L 0 80 
               L 40 45 L 80 80 
               L 120 30 L 160 80 
               L 220 50 L 260 80
               L 360 25 L 420 85
               L 520 40 L 580 85
               L 700 35 L 760 85
               L 880 20 L 940 85
               L 1060 45 L 1120 90
               L 1240 30 L 1300 85
               L 1380 45 L 1440 80
               L 1440 150 Z"
            fill={isNight ? '#0B1817' : '#2F6F6D'}
            className="transition-colors duration-1000"
          />
        </svg>
      </div>
    </div>
  );
}
