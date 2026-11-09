'use client';

import React from 'react';

interface RailwayTrackProps {
  progress?: number; // 0 to 1
  isNight?: boolean;
}

export function RailwayTrack({ progress = 0, isNight = false }: RailwayTrackProps) {
  // SVG coordinates for a 6-stage vertical S-curve journey
  // Width: 1000, Total Height: 6000 (1000 units per station stop)
  // Station 1: x: 300, y: 350 (Departure)
  // Station 2: x: 720, y: 1350 (Foundry & Switchyard - curve to right)
  // Station 3: x: 280, y: 2350 (Suspension Bridge - curve to left)
  // Station 4: x: 740, y: 3350 (Mountain Pass - curve to right)
  // Station 5: x: 280, y: 4350 (Summit Observatory - curve to left)
  // Station 6: x: 500, y: 5450 (Coastal Lighthouse Pier - center ocean terminal)

  const trackPathD = `
    M 300 350
    C 300 750, 720 950, 720 1350
    C 720 1750, 280 1950, 280 2350
    C 280 2750, 740 2950, 740 3350
    C 740 3750, 280 3950, 280 4350
    C 280 4800, 500 5000, 500 5450
  `;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <svg
        viewBox="0 0 1000 6000"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="railGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Gravel Ballast Bed (Sub-track foundation) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#122625' : '#D5C5A8'}
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Wooden Ties / Sleepers (Repeated dashed thick stroke) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#1A3331' : '#654C38'}
          strokeWidth="30"
          strokeDasharray="6, 14"
          strokeLinecap="butt"
          opacity="0.85"
        />

        {/* Inner Ballast line */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#0C1C1B' : '#BCA888'}
          strokeWidth="18"
          opacity="0.75"
        />

        {/* Outer Steel Rail (Left) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#447C79' : '#8A7A68'}
          strokeWidth="4"
          transform="translate(-7, 0)"
          opacity="0.9"
        />

        {/* Outer Steel Rail (Right) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#447C79' : '#8A7A68'}
          strokeWidth="4"
          transform="translate(7, 0)"
          opacity="0.9"
        />

        {/* Center Guide Path (Used by GSAP MotionPath) */}
        <path
          id="train-track-guide"
          d={trackPathD}
          fill="none"
          stroke="transparent"
          strokeWidth="2"
        />

        {/* Active Illuminated Rail Section (shows progress trail) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#FEF08A' : '#C84630'}
          strokeWidth="2.5"
          strokeDasharray="12, 18"
          opacity="0.45"
          filter={isNight ? 'url(#railGlow)' : undefined}
        />

        {/* Station Milepost Signal Lights */}
        {[
          { cx: 300, cy: 350, name: 'STA 01', greenAt: 0.05 },
          { cx: 720, cy: 1350, name: 'STA 02', greenAt: 0.22 },
          { cx: 280, cy: 2350, name: 'STA 03', greenAt: 0.42 },
          { cx: 740, cy: 3350, name: 'STA 04', greenAt: 0.62 },
          { cx: 280, cy: 4350, name: 'STA 05', greenAt: 0.82 },
          { cx: 500, cy: 5450, name: 'STA 06', greenAt: 0.98 },
        ].map((sig, idx) => {
          const isPassed = progress >= sig.greenAt;
          return (
            <g key={idx} transform={`translate(${sig.cx + (idx % 2 === 0 ? 32 : -32)}, ${sig.cy})`}>
              {/* Signal Mast */}
              <line x1="0" y1="-25" x2="0" y2="25" stroke="#122524" strokeWidth="3" />
              {/* Signal Box */}
              <rect x="-8" y="-22" width="16" height="28" rx="4" fill="#0A1615" stroke="#2F6F6D" strokeWidth="1" />
              {/* Red Lamp */}
              <circle
                cx="0"
                cy="-13"
                r="4"
                fill={!isPassed ? '#EF4444' : '#451A1A'}
                filter={!isPassed ? 'url(#railGlow)' : undefined}
              />
              {/* Green Lamp */}
              <circle
                cx="0"
                cy="-1"
                r="4"
                fill={isPassed ? '#10B981' : '#0B3326'}
                filter={isPassed ? 'url(#railGlow)' : undefined}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
