'use client';

import React from 'react';

interface RailwayTrackProps {
  progress?: number; // 0 to 1
  isNight?: boolean;
  stageWidth?: number;
}

export function RailwayTrack({ progress = 0, isNight = false, stageWidth = 1200 }: RailwayTrackProps) {
  // Responsive World Geometry:
  // On mobile (<768px): Track hugs screen edges (x=26 on left, x=stageWidth-26 on right)
  // On tablet (768-1024px): Track hugs x=100 on left, stageWidth-100 on right
  // On desktop (>=1024px): Standard 240 / 960 layout
  const isMobile = stageWidth < 768;
  const isTablet = stageWidth >= 768 && stageWidth < 1024;

  const leftX = isMobile ? 26 : isTablet ? 100 : 240;
  const rightX = isMobile ? Math.max(280, stageWidth - 26) : isTablet ? stageWidth - 100 : Math.min(stageWidth - 240, 960);
  const svgWidth = Math.max(320, stageWidth);

  // Station 1: (leftX, 400)  - Train on LEFT  -> Details on RIGHT
  // Station 2: (rightX, 1400) - Train on RIGHT -> Details on LEFT
  // Station 3: (leftX, 2400) - Train on LEFT  -> Details on RIGHT
  // Station 4: (rightX, 3400) - Train on RIGHT -> Details on LEFT
  // Station 5: (leftX, 4400) - Train on LEFT  -> Details on RIGHT
  // Station 6: (rightX, 5400) - Train on RIGHT -> Details on LEFT

  const trackPathD = `
    M ${leftX} 120
    L ${leftX} 400
    C ${leftX} 850, ${rightX} 950, ${rightX} 1400
    C ${rightX} 1850, ${leftX} 1950, ${leftX} 2400
    C ${leftX} 2850, ${rightX} 2950, ${rightX} 3400
    C ${rightX} 3850, ${leftX} 3950, ${leftX} 4400
    C ${leftX} 4850, ${rightX} 4950, ${rightX} 5400
    L ${rightX} 5680
  `;

  return (
    <div className="absolute inset-0 w-full h-[6000px] pointer-events-none z-10">
      <svg
        viewBox={`0 0 ${svgWidth} 6000`}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        suppressHydrationWarning
      >
        <defs>
          <filter id="railGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="headlightBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>

          <filter id="toySmokeFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="-1" dy="1.5" stdDeviation="2" floodColor="#0A1615" floodOpacity="0.3" />
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

          <linearGradient id="beamGradientFwd" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beamGradientRev" x1="1" y1="0" x2="0" y2="0">
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

        {/* Center Guide Path (Used by GSAP to position all carriages) */}
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

        {/* Station Signal Lights & Trackside Station Nameboards */}
        {[
          { cx: leftX, cy: 400, code: 'STATION 01', title: 'Grand Central Terminal', mp: 'MP 00.0', greenAt: 0.05, side: 'left' },
          { cx: rightX, cy: 1400, code: 'STATION 02', title: 'The Switchyard & Foundry', mp: 'MP 22.4', greenAt: 0.22, side: 'right' },
          { cx: leftX, cy: 2400, code: 'STATION 03', title: 'Innovation Valley Bridge', mp: 'MP 45.2', greenAt: 0.42, side: 'left' },
          { cx: rightX, cy: 3400, code: 'STATION 04', title: 'The Mountain Pass Trestle', mp: 'MP 68.0', greenAt: 0.62, side: 'right' },
          { cx: leftX, cy: 4400, code: 'STATION 05', title: 'The Summit Observatory', mp: 'MP 85.5', greenAt: 0.82, side: 'left' },
          { cx: rightX, cy: 5400, code: 'STATION 06', title: 'Dhaka Coastal Pier', mp: 'MP 99.9', greenAt: 0.98, side: 'right' },
        ].map((sig, idx) => {
          const isPassed = progress >= sig.greenAt;
          const xOffset = sig.side === 'left' ? (isMobile ? -16 : -38) : (isMobile ? 16 : 38);
          const boardX = sig.side === 'left' ? -185 : 20;
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

              {/* Station Plaque beside Signal Light (Desktop & Tablet only to eliminate mobile clutter) */}
              {!isMobile && (
                <g transform={`translate(${boardX}, -20)`}>
                  {/* Board Connection Arm */}
                  <line
                    x1={sig.side === 'left' ? 165 : 0}
                    y1="20"
                    x2={sig.side === 'left' ? 185 : -20}
                    y2="20"
                    stroke="#122524"
                    strokeWidth="2.5"
                  />
                  {/* Station Sign Board Plate */}
                  <rect
                    x="0"
                    y="0"
                    width="165"
                    height="40"
                    rx="6"
                    fill="#0A1817"
                    stroke="#E3B23C"
                    strokeWidth="1.2"
                    opacity="0.95"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="159"
                    height="34"
                    rx="4"
                    fill="none"
                    stroke="#2F6F6D"
                    strokeWidth="0.8"
                  />
                  {/* Station Code & MP */}
                  <text
                    x="10"
                    y="15"
                    fill="#E3B23C"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.5"
                  >
                    {sig.code} • {sig.mp}
                  </text>
                  {/* Station Name */}
                  <text
                    x="10"
                    y="29"
                    fill="#FAF6EE"
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {sig.title}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ======================================================== */}
        {/* CARRIAGE 4: REAR PUSHER ENGINE (Mountain Helper Locomotive) */}
        {/* ======================================================== */}
        <g id="train-car-rear" transform={`translate(${leftX}, 220)`} className="pointer-events-auto">
          {/* Headlight Beam Reversing: Active only when scrolling backward */}
          {isNight && (
            <g id="rear-headlight-group" className="headlight-hidden">
              <polygon
                points="-35,0 -240,-60 -240,60"
                fill="url(#beamGradientRev)"
                filter="url(#headlightBlur)"
              />
              <polygon
                points="-35,0 -170,-30 -170,30"
                fill="url(#beamGradientRev)"
                opacity="0.8"
              />
            </g>
          )}

          {/* Chassis */}
          <rect x="-30" y="-14" width="56" height="28" rx="4.5" fill="#0A1514" opacity="0.75" />

          {/* Wheels */}
          {[-20, -7, 6, 19].map((wx, wIdx) => (
            <g key={wIdx}>
              <rect x={wx - 4.5} y="-12.5" width="9" height="4" rx="1.2" fill="#182322" stroke="#E3B23C" strokeWidth="1" />
              <rect x={wx - 4.5} y="8.5" width="9" height="4" rx="1.2" fill="#182322" stroke="#E3B23C" strokeWidth="1" />
            </g>
          ))}

          {/* Drive Rods (Mechanical Pumping Action) */}
          <g id="rear-drive-rods">
            <line x1="-20" y1="-12.5" x2="19" y2="-12.5" stroke="#E3B23C" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="-20" y1="12.5" x2="19" y2="12.5" stroke="#E3B23C" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Pusher Boiler (facing backward) */}
          <rect
            x="-24"
            y="-9.5"
            width="32"
            height="19"
            rx="4.5"
            fill="url(#trainBoiler)"
            stroke="#6C1E12"
            strokeWidth="1.4"
          />

          {/* Brass Bands */}
          <line x1="-10" y1="-9.5" x2="-10" y2="9.5" stroke="#E3B23C" strokeWidth="1.4" />
          <line x1="2" y1="-9.5" x2="2" y2="9.5" stroke="#E3B23C" strokeWidth="1.4" />

          {/* Reversing Smokestack */}
          <circle cx="-15" cy="0" r="4.5" fill="#202A29" stroke="#0F1615" strokeWidth="1.3" />
          <circle cx="-15" cy="0" r="2.5" fill="#E3B23C" />

          {/* Pusher Cabin */}
          <rect
            x="8"
            y="-12.5"
            width="17"
            height="25"
            rx="3"
            fill="url(#trainCabin)"
            stroke="#143634"
            strokeWidth="1.4"
          />

          {/* Cabin Windows */}
          <rect x="11" y="-10.5" width="11" height="4.5" rx="1.2" fill={isNight ? '#FEF08A' : '#FFFBEB'} stroke="#143634" strokeWidth="0.8" />
          <rect x="11" y="6" width="11" height="4.5" rx="1.2" fill={isNight ? '#FEF08A' : '#FFFBEB'} stroke="#143634" strokeWidth="0.8" />

          {/* Reversing Cowcatcher */}
          <polygon points="-24,-8 -33,0 -24,8" fill="#2F6F6D" stroke="#122E2C" strokeWidth="1.3" />

          {/* Rear Headlight Lamp (starts off/dim, lights up on backward scroll) */}
          <circle
            id="rear-headlight-lamp"
            cx="-26"
            cy="0"
            r="3.5"
            fill="#3A3828"
          />

          {/* Forward Coupling Hitch to Coach 2 */}
          <rect x="25" y="-2" width="6" height="4" rx="1" fill="#182322" stroke="#5E160C" strokeWidth="0.8" />
        </g>

        {/* ======================================================== */}
        {/* CARRIAGE 3: PASSENGER COACH 2 (Vintage Terracotta Express) */}
        {/* ======================================================== */}
        <g id="train-car-coach-2" transform={`translate(${leftX}, 280)`} className="pointer-events-auto">
          {/* Couplers */}
          <rect x="-27" y="-2" width="5" height="4" rx="1" fill="#182322" />
          <rect x="22" y="-2" width="5" height="4" rx="1" fill="#182322" />

          {/* Chassis */}
          <rect x="-24" y="-13" width="48" height="26" rx="4" fill="#0A1514" opacity="0.65" />

          {/* Wheels */}
          {[-15, -6, 6, 15].map((wx, wIdx) => (
            <g key={wIdx}>
              <rect x={wx - 4} y="-12.5" width="8" height="3.5" rx="1" fill="#182322" stroke="#E3B23C" strokeWidth="0.9" />
              <rect x={wx - 4} y="9" width="8" height="3.5" rx="1" fill="#182322" stroke="#E3B23C" strokeWidth="0.9" />
            </g>
          ))}

          {/* Coach Body */}
          <rect
            x="-23"
            y="-11.5"
            width="46"
            height="23"
            rx="3.5"
            fill="#8F2A1A"
            stroke="#5E160C"
            strokeWidth="1.3"
          />

          {/* Gold Trim Waistline */}
          <line x1="-21" y1="0" x2="21" y2="0" stroke="#E3B23C" strokeWidth="0.9" strokeDasharray="3, 2" />

          {/* Passenger Windows */}
          {[-14, 0, 14].map((wx, idx) => (
            <g key={idx}>
              <rect x={wx - 3.5} y="-9.5" width="7" height="4" rx="1.2" fill={isNight ? '#FEF08A' : '#FFFBEB'} stroke="#5E160C" strokeWidth="0.8" />
              <rect x={wx - 3.5} y="5.5" width="7" height="4" rx="1.2" fill={isNight ? '#FEF08A' : '#FFFBEB'} stroke="#5E160C" strokeWidth="0.8" />
            </g>
          ))}

          {/* Roof Ventilator Caps */}
          <circle cx="-8" cy="-12" r="1.4" fill="#E3B23C" />
          <circle cx="8" cy="-12" r="1.4" fill="#E3B23C" />
        </g>

        {/* ======================================================== */}
        {/* CARRIAGE 2: PASSENGER COACH 1 (Spruce Teal First Class)  */}
        {/* ======================================================== */}
        <g id="train-car-coach-1" transform={`translate(${leftX}, 340)`} className="pointer-events-auto">
          {/* Couplers */}
          <rect x="-27" y="-2" width="5" height="4" rx="1" fill="#182322" />
          <rect x="22" y="-2" width="5" height="4" rx="1" fill="#182322" />

          {/* Chassis */}
          <rect x="-24" y="-13" width="48" height="26" rx="4" fill="#0A1514" opacity="0.65" />

          {/* Wheels */}
          {[-15, -6, 6, 15].map((wx, wIdx) => (
            <g key={wIdx}>
              <rect x={wx - 4} y="-12.5" width="8" height="3.5" rx="1" fill="#182322" stroke="#E3B23C" strokeWidth="0.9" />
              <rect x={wx - 4} y="9" width="8" height="3.5" rx="1" fill="#182322" stroke="#E3B23C" strokeWidth="0.9" />
            </g>
          ))}

          {/* Coach Body */}
          <rect
            x="-23"
            y="-11.5"
            width="46"
            height="23"
            rx="3.5"
            fill="#1E4D4B"
            stroke="#143634"
            strokeWidth="1.3"
          />

          {/* Gold Trim Waistline */}
          <line x1="-21" y1="0" x2="21" y2="0" stroke="#E3B23C" strokeWidth="0.9" strokeDasharray="3, 2" />

          {/* Passenger Windows */}
          {[-14, 0, 14].map((wx, idx) => (
            <g key={idx}>
              <rect x={wx - 3.5} y="-9.5" width="7" height="4" rx="1.2" fill={isNight ? '#FEF08A' : '#FFFBEB'} stroke="#143634" strokeWidth="0.8" />
              <rect x={wx - 3.5} y="5.5" width="7" height="4" rx="1.2" fill={isNight ? '#FEF08A' : '#FFFBEB'} stroke="#143634" strokeWidth="0.8" />
            </g>
          ))}

          {/* Roof Ventilator Caps */}
          <circle cx="-8" cy="-12" r="1.4" fill="#E3B23C" />
          <circle cx="8" cy="-12" r="1.4" fill="#E3B23C" />
        </g>

        {/* ======================================================== */}
        {/* CARRIAGE 1: LEAD LOCOMOTIVE ENGINE (The Express Engine)  */}
        {/* ======================================================== */}
        <g id="train-car-lead" transform={`translate(${leftX}, 400)`} className="pointer-events-auto">
          {/* Headlight Beam Forward: Active when scrolling forward */}
          {isNight && (
            <g id="front-headlight-group" className="headlight-active">
              <polygon
                points="42,0 260,-65 260,65"
                fill="url(#beamGradientFwd)"
                filter="url(#headlightBlur)"
              />
              <polygon
                points="42,0 190,-35 190,35"
                fill="url(#beamGradientFwd)"
                opacity="0.85"
              />
            </g>
          )}

          {/* Chassis */}
          <rect x="-38" y="-15" width="72" height="30" rx="5" fill="#0A1514" opacity="0.75" />

          {/* Wheels */}
          {[-28, -15, -2, 11, 24].map((wx, wIdx) => (
            <g key={wIdx}>
              <rect x={wx - 5} y="-13" width="10" height="4.5" rx="1.5" fill="#182322" stroke="#E3B23C" strokeWidth="1.2" />
              <rect x={wx - 5} y="8.5" width="10" height="4.5" rx="1.5" fill="#182322" stroke="#E3B23C" strokeWidth="1.2" />
            </g>
          ))}

          {/* Drive Rods (Mechanical Pumping Action) */}
          <g id="lead-drive-rods">
            <line x1="-28" y1="-13" x2="24" y2="-13" stroke="#E3B23C" strokeWidth="2" strokeLinecap="round" />
            <line x1="-28" y1="13" x2="24" y2="13" stroke="#E3B23C" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Boiler */}
          <rect
            x="-16"
            y="-10"
            width="46"
            height="20"
            rx="5"
            fill="url(#trainBoiler)"
            stroke="#6C1E12"
            strokeWidth="1.6"
          />

          {/* Brass Bands */}
          <line x1="-7" y1="-10" x2="-7" y2="10" stroke="#E3B23C" strokeWidth="1.5" />
          <line x1="7" y1="-10" x2="7" y2="10" stroke="#E3B23C" strokeWidth="1.5" />
          <line x1="20" y1="-10" x2="20" y2="10" stroke="#E3B23C" strokeWidth="1.5" />

          {/* Nose Dome */}
          <path d="M 30 -10 Q 37 0 30 10 Z" fill="#8F2A1A" stroke="#5E160C" strokeWidth="1.4" />

          {/* Smokestack */}
          <circle cx="18" cy="0" r="5" fill="#202A29" stroke="#0F1615" strokeWidth="1.4" />
          <circle cx="18" cy="0" r="2.8" fill="#E3B23C" />

          {/* Steam Dome */}
          <ellipse cx="2" cy="0" rx="3.5" ry="3" fill="#E3B23C" stroke="#A87F1C" strokeWidth="1.1" />

          {/* Cabin */}
          <rect
            x="-37"
            y="-13.5"
            width="22"
            height="27"
            rx="3.5"
            fill="url(#trainCabin)"
            stroke="#143634"
            strokeWidth="1.5"
          />

          {/* Cabin Windows */}
          <rect
            x="-33"
            y="-11.5"
            width="13"
            height="5"
            rx="1.5"
            fill={isNight ? '#FEF08A' : '#FFFBEB'}
            stroke="#143634"
            strokeWidth="0.8"
          />
          <rect
            x="-33"
            y="6.5"
            width="13"
            height="5"
            rx="1.5"
            fill={isNight ? '#FEF08A' : '#FFFBEB'}
            stroke="#143634"
            strokeWidth="0.8"
          />

          {/* Forward Cowcatcher */}
          <polygon
            points="30,-8 39,0 30,8"
            fill="#2F6F6D"
            stroke="#122E2C"
            strokeWidth="1.4"
          />
          <line x1="32" y1="-4.5" x2="37" y2="0" stroke="#FAF5EB" strokeWidth="1" strokeOpacity="0.8" />
          <line x1="32" y1="4.5" x2="37" y2="0" stroke="#FAF5EB" strokeWidth="1" strokeOpacity="0.8" />

          {/* Headlight Lamp */}
          <circle
            id="front-headlight-lamp"
            cx="34"
            cy="0"
            r="3.5"
            fill={isNight ? '#FEF08A' : '#FDE047'}
            filter={isNight ? 'url(#railGlow)' : undefined}
          />

          {/* Nameplate */}
          <rect x="-8" y="-3" width="16" height="6" rx="1" fill="#E3B23C" stroke="#7A5A0A" strokeWidth="0.6" />
          <text
            x="0"
            y="1.5"
            fill="#1C2E2D"
            fontSize="3.6"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            EXP-01
          </text>
        </g>

        {/* Dynamic World Smoke Particles (Billows and lingers on the track behind the train) */}
        <g id="dynamic-smoke-container" className="pointer-events-none" />
      </svg>
    </div>
  );
}
