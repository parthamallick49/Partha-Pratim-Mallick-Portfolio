'use client';

import React from 'react';

interface RailwayTrackProps {
  progress?: number; // 0 to 1
  isNight?: boolean;
}

export function RailwayTrack({ progress = 0, isNight = false }: RailwayTrackProps) {
  // World Dimensions: 1200 width x 6000 height (generous 1000px vertical station spacing)
  // Station 1: (240, 400)  - Train on LEFT  -> Details on RIGHT
  // Station 2: (960, 1400) - Train on RIGHT -> Details on LEFT
  // Station 3: (240, 2400) - Train on LEFT  -> Details on RIGHT
  // Station 4: (960, 3400) - Train on RIGHT -> Details on LEFT
  // Station 5: (240, 4400) - Train on LEFT  -> Details on RIGHT
  // Station 6: (960, 5400) - Train on RIGHT -> Details on LEFT

  const trackPathD = `
    M 240 400
    C 240 850, 960 950, 960 1400
    C 960 1850, 240 1950, 240 2400
    C 240 2850, 960 2950, 960 3400
    C 960 3850, 240 3950, 240 4400
    C 240 4850, 960 4950, 960 5400
  `;

  return (
    <div className="absolute inset-0 w-full h-[6000px] pointer-events-none z-10">
      <svg
        viewBox="0 0 1200 6000"
        preserveAspectRatio="xMidYMin meet"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="railGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="headlightBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>

          <linearGradient id="trainBoiler" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8F2A1A" />
            <stop offset="35%" stopColor="#C84630" />
            <stop offset="70%" stopColor="#E45B44" />
            <stop offset="100%" stopColor="#8F2A1A" />
          </linearGradient>

          <linearGradient id="trainCabin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E4D4B" />
            <stop offset="50%" stopColor="#2F6F6D" />
            <stop offset="100%" stopColor="#143634" />
          </linearGradient>

          <linearGradient id="beamGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gravel Ballast Bed */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#122625' : '#D5C5A8'}
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Wooden Ties / Sleepers */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#1A3331' : '#654C38'}
          strokeWidth="36"
          strokeDasharray="7, 16"
          strokeLinecap="butt"
          opacity="0.9"
        />

        {/* Inner Ballast line */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#0C1C1B' : '#BCA888'}
          strokeWidth="20"
          opacity="0.75"
        />

        {/* Outer Steel Rail (Left) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#447C79' : '#8A7A68'}
          strokeWidth="4.5"
          transform="translate(-8.5, 0)"
          opacity="0.95"
        />

        {/* Outer Steel Rail (Right) */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#447C79' : '#8A7A68'}
          strokeWidth="4.5"
          transform="translate(8.5, 0)"
          opacity="0.95"
        />

        {/* Center Guide Path */}
        <path
          id="train-track-guide"
          d={trackPathD}
          fill="none"
          stroke="transparent"
          strokeWidth="2"
        />

        {/* Active Progress Illumination */}
        <path
          d={trackPathD}
          fill="none"
          stroke={isNight ? '#FEF08A' : '#C84630'}
          strokeWidth="2.5"
          strokeDasharray="14, 20"
          opacity="0.5"
          filter={isNight ? 'url(#railGlow)' : undefined}
        />

        {/* Station Signal Lights */}
        {[
          { cx: 240, cy: 400, name: 'STA 01', greenAt: 0.05, side: 'left' },
          { cx: 960, cy: 1400, name: 'STA 02', greenAt: 0.22, side: 'right' },
          { cx: 240, cy: 2400, name: 'STA 03', greenAt: 0.42, side: 'left' },
          { cx: 960, cy: 3400, name: 'STA 04', greenAt: 0.62, side: 'right' },
          { cx: 240, cy: 4400, name: 'STA 05', greenAt: 0.82, side: 'left' },
          { cx: 960, cy: 5400, name: 'STA 06', greenAt: 0.98, side: 'right' },
        ].map((sig, idx) => {
          const isPassed = progress >= sig.greenAt;
          const xOffset = sig.side === 'left' ? -38 : 38;
          return (
            <g key={idx} transform={`translate(${sig.cx + xOffset}, ${sig.cy})`}>
              {/* Signal Mast */}
              <line x1="0" y1="-28" x2="0" y2="28" stroke="#122524" strokeWidth="3" />
              {/* Signal Box */}
              <rect x="-9" y="-24" width="18" height="30" rx="4" fill="#0A1615" stroke="#2F6F6D" strokeWidth="1" />
              {/* Red Lamp */}
              <circle
                cx="0"
                cy="-14"
                r="4.5"
                fill={!isPassed ? '#EF4444' : '#451A1A'}
                filter={!isPassed ? 'url(#railGlow)' : undefined}
              />
              {/* Green Lamp */}
              <circle
                cx="0"
                cy="-2"
                r="4.5"
                fill={isPassed ? '#10B981' : '#0B3326'}
                filter={isPassed ? 'url(#railGlow)' : undefined}
              />
            </g>
          );
        })}

        {/* The Locomotive */}
        <g id="locomotive-group" transform="translate(240, 400)" className="pointer-events-auto">
          {/* Headlight Beam */}
          {isNight && (
            <g opacity="0.95">
              <polygon
                points="42,0 260,-65 260,65"
                fill="url(#beamGradient)"
                filter="url(#headlightBlur)"
              />
              <polygon
                points="42,0 190,-35 190,35"
                fill="url(#beamGradient)"
                opacity="0.85"
              />
            </g>
          )}

          {/* Steam Puffs */}
          <g opacity={isNight ? 0.45 : 0.75}>
            <circle cx="-16" cy="-2" r="6" fill="#FAF6EE" opacity="0.65" />
            <circle cx="-30" cy="-6" r="8" fill="#FAF6EE" opacity="0.5" />
            <circle cx="-46" cy="-9" r="10" fill="#FAF6EE" opacity="0.35" />
          </g>

          {/* Chassis */}
          <rect x="-46" y="-16" width="92" height="32" rx="6" fill="#0A1514" opacity="0.65" />

          {/* Wheels */}
          {[-34, -19, -4, 11, 26].map((wx, wIdx) => (
            <g key={wIdx}>
              <rect x={wx - 5.5} y="-13" width="11" height="4.5" rx="1.5" fill="#182322" stroke="#E3B23C" strokeWidth="1.2" />
              <rect x={wx - 5.5} y="8.5" width="11" height="4.5" rx="1.5" fill="#182322" stroke="#E3B23C" strokeWidth="1.2" />
            </g>
          ))}

          {/* Drive Rods */}
          <line x1="-34" y1="-13" x2="26" y2="-13" stroke="#E3B23C" strokeWidth="2" strokeLinecap="round" />
          <line x1="-34" y1="13" x2="26" y2="13" stroke="#E3B23C" strokeWidth="2" strokeLinecap="round" />

          {/* Boiler */}
          <rect
            x="-20"
            y="-10.5"
            width="56"
            height="21"
            rx="5.5"
            fill="url(#trainBoiler)"
            stroke="#6C1E12"
            strokeWidth="1.6"
          />

          {/* Brass Bands */}
          <line x1="-9" y1="-10.5" x2="-9" y2="10.5" stroke="#E3B23C" strokeWidth="1.6" />
          <line x1="7" y1="-10.5" x2="7" y2="10.5" stroke="#E3B23C" strokeWidth="1.6" />
          <line x1="22" y1="-10.5" x2="22" y2="10.5" stroke="#E3B23C" strokeWidth="1.6" />

          {/* Nose Dome */}
          <path d="M 36 -10.5 Q 43 0 36 10.5 Z" fill="#8F2A1A" stroke="#5E160C" strokeWidth="1.4" />

          {/* Smokestack */}
          <circle cx="26" cy="0" r="5" fill="#202A29" stroke="#0F1615" strokeWidth="1.4" />
          <circle cx="26" cy="0" r="2.8" fill="#E3B23C" />

          {/* Steam Dome */}
          <ellipse cx="7" cy="0" rx="4" ry="3.5" fill="#E3B23C" stroke="#A87F1C" strokeWidth="1.2" />

          {/* Cabin */}
          <rect
            x="-45"
            y="-14.5"
            width="27"
            height="29"
            rx="3.5"
            fill="url(#trainCabin)"
            stroke="#143634"
            strokeWidth="1.6"
          />

          {/* Windows */}
          <rect
            x="-39"
            y="-12.5"
            width="15"
            height="5.5"
            rx="1.5"
            fill={isNight ? '#FEF08A' : '#FFFBEB'}
            stroke="#143634"
            strokeWidth="0.9"
          />
          <rect
            x="-39"
            y="7"
            width="15"
            height="5.5"
            rx="1.5"
            fill={isNight ? '#FEF08A' : '#FFFBEB'}
            stroke="#143634"
            strokeWidth="0.9"
          />

          {/* Cowcatcher */}
          <polygon
            points="36,-9 47,0 36,9"
            fill="#2F6F6D"
            stroke="#122E2C"
            strokeWidth="1.4"
          />
          <line x1="38" y1="-5.5" x2="44" y2="0" stroke="#FAF5EB" strokeWidth="1.2" strokeOpacity="0.8" />
          <line x1="38" y1="5.5" x2="44" y2="0" stroke="#FAF5EB" strokeWidth="1.2" strokeOpacity="0.8" />

          {/* Headlight Lamp */}
          <rect x="38" y="-4" width="5.5" height="8" rx="1.8" fill="#142625" />
          <circle
            cx="43"
            cy="0"
            r="4"
            fill={isNight ? '#FEF08A' : '#FDE047'}
            filter={isNight ? 'url(#railGlow)' : undefined}
          />

          {/* Nameplate */}
          <rect x="-11" y="-3.5" width="22" height="7" rx="1.2" fill="#E3B23C" stroke="#7A5A0A" strokeWidth="0.7" />
          <text
            x="0"
            y="1.8"
            fill="#1C2E2D"
            fontSize="4.2"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            EXP-6000
          </text>
        </g>
      </svg>
    </div>
  );
}
