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

        {/* ==============================================================
            THE LOCOMOTIVE (LOCKED DIRECTLY INSIDE SVG COORDINATE SYSTEM)
            Centered at (0,0), facing +X (Forward). GSAP will animate along #train-track-guide!
            ============================================================== */}
        <g id="locomotive-group" transform="translate(300, 350)" className="pointer-events-auto">
          {/* Night Mode Forward Conical Headlight Beam (Shooting Forward in +X Direction) */}
          {isNight && (
            <g opacity="0.9">
              <polygon
                points="40,0 240,-55 240,55"
                fill="url(#beamGradient)"
                filter="url(#headlightBlur)"
              />
              <polygon
                points="40,0 180,-30 180,30"
                fill="url(#beamGradient)"
                opacity="0.8"
              />
            </g>
          )}

          {/* Steam Puffs Drifting Backward (-X Direction) */}
          <g opacity={isNight ? 0.45 : 0.75}>
            <circle cx="-15" cy="-2" r="5" fill="#FAF6EE" opacity="0.6" />
            <circle cx="-28" cy="-5" r="7" fill="#FAF6EE" opacity="0.5" />
            <circle cx="-42" cy="-8" r="9" fill="#FAF6EE" opacity="0.35" />
          </g>

          {/* Under-Chassis / Wheels Shadow */}
          <rect x="-44" y="-14" width="86" height="28" rx="5" fill="#0A1514" opacity="0.6" />

          {/* Steel Flanged Wheels (aligned with dual rails at y = -8 and y = +8) */}
          {[-32, -18, -4, 10, 24].map((wx, wIdx) => (
            <g key={wIdx}>
              {/* Left Rail Wheel */}
              <rect x={wx - 5} y="-12" width="10" height="4" rx="1.5" fill="#182322" stroke="#E3B23C" strokeWidth="1" />
              {/* Right Rail Wheel */}
              <rect x={wx - 5} y="8" width="10" height="4" rx="1.5" fill="#182322" stroke="#E3B23C" strokeWidth="1" />
            </g>
          ))}

          {/* Connecting Drive Rods on Left and Right */}
          <line x1="-32" y1="-12" x2="24" y2="-12" stroke="#E3B23C" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-32" y1="12" x2="24" y2="12" stroke="#E3B23C" strokeWidth="1.8" strokeLinecap="round" />

          {/* Main Boiler Body (Bloody Orange) */}
          <rect
            x="-18"
            y="-9.5"
            width="52"
            height="19"
            rx="5"
            fill="url(#trainBoiler)"
            stroke="#6C1E12"
            strokeWidth="1.5"
          />

          {/* Golden Brass Boiler Bands */}
          <line x1="-8" y1="-9.5" x2="-8" y2="9.5" stroke="#E3B23C" strokeWidth="1.5" />
          <line x1="6" y1="-9.5" x2="6" y2="9.5" stroke="#E3B23C" strokeWidth="1.5" />
          <line x1="20" y1="-9.5" x2="20" y2="9.5" stroke="#E3B23C" strokeWidth="1.5" />

          {/* Front Boiler Cap / Nose Dome */}
          <path d="M 34 -9.5 Q 40 0 34 9.5 Z" fill="#8F2A1A" stroke="#5E160C" strokeWidth="1.2" />

          {/* Smokestack / Chimney */}
          <circle cx="24" cy="0" r="4.5" fill="#202A29" stroke="#0F1615" strokeWidth="1.2" />
          <circle cx="24" cy="0" r="2.5" fill="#E3B23C" />

          {/* Steam Dome */}
          <ellipse cx="6" cy="0" rx="3.5" ry="3" fill="#E3B23C" stroke="#A87F1C" strokeWidth="1" />

          {/* Engineer Cabin (Rusted Teal with Overhanging Roof) */}
          <rect
            x="-42"
            y="-13"
            width="25"
            height="26"
            rx="3"
            fill="url(#trainCabin)"
            stroke="#143634"
            strokeWidth="1.5"
          />

          {/* Cabin Warm Glowing Windows (Left & Right) */}
          <rect
            x="-36"
            y="-11"
            width="14"
            height="5"
            rx="1.5"
            fill={isNight ? '#FEF08A' : '#FFFBEB'}
            stroke="#143634"
            strokeWidth="0.8"
          />
          <rect
            x="-36"
            y="6"
            width="14"
            height="5"
            rx="1.5"
            fill={isNight ? '#FEF08A' : '#FFFBEB'}
            stroke="#143634"
            strokeWidth="0.8"
          />

          {/* Cabin Roof Center Rib */}
          <line x1="-42" y1="0" x2="-17" y2="0" stroke="#E3B23C" strokeWidth="1.5" />

          {/* Cowcatcher / Pilot on Front Nose */}
          <polygon
            points="34,-8 44,0 34,8"
            fill="#2F6F6D"
            stroke="#122E2C"
            strokeWidth="1.2"
          />
          <line x1="36" y1="-5" x2="41" y2="0" stroke="#FAF5EB" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="36" y1="5" x2="41" y2="0" stroke="#FAF5EB" strokeWidth="1" strokeOpacity="0.7" />

          {/* High-Intensity Headlight Lamp Housing */}
          <rect x="36" y="-3.5" width="5" height="7" rx="1.5" fill="#142625" />
          <circle
            cx="40"
            cy="0"
            r="3.5"
            fill={isNight ? '#FEF08A' : '#FDE047'}
            filter={isNight ? 'url(#railGlow)' : undefined}
          />

          {/* Locomotive Brass Nameplate */}
          <rect x="-10" y="-3" width="20" height="6" rx="1" fill="#E3B23C" stroke="#7A5A0A" strokeWidth="0.6" />
          <text
            x="0"
            y="1.5"
            fill="#1C2E2D"
            fontSize="3.8"
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
