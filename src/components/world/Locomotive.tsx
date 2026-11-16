'use client';

import React from 'react';

interface LocomotiveProps {
  isNight?: boolean;
  isMoving?: boolean;
  className?: string;
}

export function Locomotive({ isNight = false, isMoving = true, className = '' }: LocomotiveProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Night Mode Forward Headlight Conical Beam */}
      {isNight && (
        <div
          className="absolute left-[88%] top-[28px] w-56 h-28 pointer-events-none transform -translate-y-1/2 z-0 opacity-85 headlight-beam"
          aria-hidden="true"
        />
      )}

      {/* Steam Puffs from Chimney */}
      {isMoving && (
        <div className="absolute left-[78px] -top-6 pointer-events-none z-30" aria-hidden="true">
          <span className="absolute w-4 h-4 rounded-full bg-rail-vanilla/70 steam-puff-1 filter blur-[1px]" />
          <span className="absolute w-5 h-5 rounded-full bg-rail-vanilla/60 steam-puff-2 filter blur-[1.5px]" />
          <span className="absolute w-6 h-6 rounded-full bg-rail-vanilla/50 steam-puff-3 filter blur-[2px]" />
        </div>
      )}

      {/* SVG Stylized Locomotive */}
      <svg
        viewBox="0 0 160 85"
        className="w-36 h-20 md:w-44 md:h-24 drop-shadow-xl relative z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="boilerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E45B44" />
            <stop offset="60%" stopColor="#C84630" />
            <stop offset="100%" stopColor="#8F2A1A" />
          </linearGradient>
          <linearGradient id="cabinGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A8A87" />
            <stop offset="100%" stopColor="#1E4D4B" />
          </linearGradient>
          <filter id="lampGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Train Chassis / Frame */}
        <rect x="12" y="52" width="136" height="10" rx="3" fill="#1C2E2D" stroke="#0B1514" strokeWidth="1.5" />

        {/* Cowcatcher / Pilot on front */}
        <polygon points="144,54 158,62 144,62" fill="#2F6F6D" stroke="#122E2C" strokeWidth="1" />
        <line x1="146" y1="56" x2="152" y2="62" stroke="#F3E9D2" strokeWidth="1" strokeOpacity="0.6" />

        {/* Main Boiler Tank */}
        <rect x="42" y="24" width="76" height="30" rx="4" fill="url(#boilerGradient)" stroke="#6C1E12" strokeWidth="1.5" />

        {/* Gold boiler bands */}
        <line x1="62" y1="24" x2="62" y2="54" stroke="#E3B23C" strokeWidth="1.8" />
        <line x1="84" y1="24" x2="84" y2="54" stroke="#E3B23C" strokeWidth="1.8" />
        <line x1="104" y1="24" x2="104" y2="54" stroke="#E3B23C" strokeWidth="1.8" />

        {/* Front Boiler Cap / Dome */}
        <path d="M 118 24 Q 128 39 118 54 Z" fill="#8F2A1A" stroke="#5E160C" strokeWidth="1" />

        {/* Steam Dome on top of boiler */}
        <path d="M 64 24 Q 70 14 76 24 Z" fill="#E3B23C" stroke="#A87F1C" strokeWidth="1" />

        {/* Smokestack / Chimney */}
        <path d="M 92 24 L 90 9 L 102 9 L 100 24 Z" fill="#202A29" stroke="#0F1615" strokeWidth="1.5" />
        <ellipse cx="96" cy="9" rx="7" ry="2.5" fill="#E3B23C" />

        {/* Engineer Cabin */}
        <path d="M 12 16 L 44 16 L 44 52 L 12 52 Z" fill="url(#cabinGradient)" stroke="#143634" strokeWidth="1.5" />
        {/* Cabin Overhanging Curved Roof */}
        <path d="M 9 16 Q 28 11 47 16" fill="none" stroke="#E3B23C" strokeWidth="3" strokeLinecap="round" />

        {/* Cabin Window (Warm Glow at night or day) */}
        <rect
          x="18"
          y="23"
          width="18"
          height="14"
          rx="2"
          fill={isNight ? '#FDE047' : '#FFFBEB'}
          stroke="#1C4442"
          strokeWidth="1.5"
          className="transition-colors duration-500"
        />
        {/* Silhouette of Engineer in window */}
        <circle cx="26" cy="29" r="3" fill="#1C3836" />
        <path d="M 22 37 Q 26 33 30 37 Z" fill="#1C3836" />

        {/* Headlight Housing on Front */}
        <rect x="120" y="32" width="8" height="10" rx="1.5" fill="#142625" />
        <circle
          cx="126"
          cy="37"
          r="4.5"
          fill={isNight ? '#FEF08A' : '#FDE047'}
          filter={isNight ? 'url(#lampGlow)' : undefined}
        />

        {/* Train Wheels (Large drive wheels & front truck) */}
        {/* Rear Drive Wheel 1 */}
        <circle cx="32" cy="62" r="11" fill="#182322" stroke="#E3B23C" strokeWidth="2" />
        <circle cx="32" cy="62" r="3.5" fill="#C84630" />
        <line x1="32" y1="51" x2="32" y2="73" stroke="#8A9695" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="21" y1="62" x2="43" y2="62" stroke="#8A9695" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Middle Drive Wheel 2 */}
        <circle cx="64" cy="62" r="11" fill="#182322" stroke="#E3B23C" strokeWidth="2" />
        <circle cx="64" cy="62" r="3.5" fill="#C84630" />
        <line x1="64" y1="51" x2="64" y2="73" stroke="#8A9695" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="53" y1="62" x2="75" y2="62" stroke="#8A9695" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Front Drive Wheel 3 */}
        <circle cx="96" cy="62" r="11" fill="#182322" stroke="#E3B23C" strokeWidth="2" />
        <circle cx="96" cy="62" r="3.5" fill="#C84630" />
        <line x1="96" y1="51" x2="96" y2="73" stroke="#8A9695" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="85" y1="62" x2="107" y2="62" stroke="#8A9695" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Front Truck Small Wheel */}
        <circle cx="128" cy="65" r="7.5" fill="#121B1A" stroke="#E3B23C" strokeWidth="1.5" />
        <circle cx="128" cy="65" r="2.5" fill="#C84630" />

        {/* Connecting Drive Rod */}
        <line x1="32" y1="65" x2="96" y2="65" stroke="#E3B23C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="65" r="2" fill="#FFFFFF" />
        <circle cx="64" cy="65" r="2" fill="#FFFFFF" />
        <circle cx="96" cy="65" r="2" fill="#FFFFFF" />

        {/* Locomotive Brass Plate / Callout */}
        <rect x="52" y="36" width="30" height="7" rx="1.5" fill="#E3B23C" stroke="#7A5A0A" strokeWidth="0.8" />
        <text
          x="67"
          y="41.5"
          fill="#1C2E2D"
          fontSize="4.5"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          EXP-6000
        </text>
      </svg>
    </div>
  );
}
