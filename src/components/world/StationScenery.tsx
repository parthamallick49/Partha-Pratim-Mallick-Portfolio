'use client';

import React from 'react';

interface StationSceneryProps {
  type: 'terminal' | 'switchyard' | 'suspension-bridge' | 'mountain-pass' | 'summit' | 'coastal-lighthouse';
  isNight?: boolean;
}

export function StationScenery({ type, isNight = false }: StationSceneryProps) {
  switch (type) {
    case 'terminal':
      return (
        <div className="relative w-full max-w-sm h-36 flex items-end justify-center pointer-events-none opacity-90">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            {/* Grand Station Arch */}
            <path d="M 30 120 L 30 50 Q 150 5 270 50 L 270 120 Z" fill={isNight ? '#102423' : '#E6DAC3'} stroke="#2F6F6D" strokeWidth="2.5" />
            <path d="M 50 120 L 50 60 Q 150 20 250 60 L 250 120 Z" fill={isNight ? '#0B1817' : '#DBCBB0'} stroke="#2F6F6D" strokeWidth="1.5" />
            {/* Glass Panes */}
            <path d="M 80 120 L 80 75 Q 150 45 220 75 L 220 120 Z" fill={isNight ? '#1C3836' : '#FAF6EE'} opacity="0.8" />
            {/* Platform Central Clock */}
            <circle cx="150" cy="50" r="14" fill="#FAF6EE" stroke="#C84630" strokeWidth="2.5" />
            <line x1="150" y1="50" x2="150" y2="42" stroke="#102423" strokeWidth="2" strokeLinecap="round" />
            <line x1="150" y1="50" x2="157" y2="50" stroke="#102423" strokeWidth="2" strokeLinecap="round" />
            {/* Roof Pinnacle */}
            <line x1="150" y1="18" x2="150" y2="2" stroke="#E3B23C" strokeWidth="2" />
            <circle cx="150" cy="2" r="3" fill="#E3B23C" />
          </svg>
        </div>
      );

    case 'switchyard':
      return (
        <div className="relative w-full max-w-sm h-36 flex items-end justify-center pointer-events-none opacity-90">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            {/* Signal Gantry Structure */}
            <rect x="30" y="30" width="8" height="90" fill="#203635" />
            <rect x="262" y="30" width="8" height="90" fill="#203635" />
            <rect x="25" y="24" width="250" height="8" rx="2" fill="#2F6F6D" />
            {/* Diagonal Truss Crossings */}
            <line x1="38" y1="32" x2="100" y2="120" stroke="#2F6F6D" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="262" y1="32" x2="200" y2="120" stroke="#2F6F6D" strokeWidth="1.5" strokeOpacity="0.5" />
            {/* Industrial Cargo Containers */}
            <rect x="75" y="70" width="60" height="50" rx="3" fill="#C84630" stroke="#8A2818" strokeWidth="1.5" />
            <rect x="145" y="55" width="65" height="65" rx="3" fill="#2F6F6D" stroke="#1B4745" strokeWidth="1.5" />
            <rect x="220" y="80" width="45" height="40" rx="3" fill="#E3B23C" stroke="#A88019" strokeWidth="1.5" />
            {/* Container ribbed lines */}
            <line x1="88" y1="72" x2="88" y2="118" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="105" y1="72" x2="105" y2="118" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="122" y1="72" x2="122" y2="118" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        </div>
      );

    case 'suspension-bridge':
      return (
        <div className="relative w-full max-w-sm h-36 flex items-end justify-center pointer-events-none opacity-90">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            {/* Suspension Tower Left */}
            <polygon points="55,120 62,20 74,20 81,120" fill="#203837" stroke="#2F6F6D" strokeWidth="1.5" />
            {/* Suspension Tower Right */}
            <polygon points="219,120 226,20 238,20 245,120" fill="#203837" stroke="#2F6F6D" strokeWidth="1.5" />
            {/* Main Suspension Cable Swags */}
            <path d="M 10 70 Q 68 20 150 75 Q 232 20 290 70" fill="none" stroke="#E3B23C" strokeWidth="2.5" />
            {/* Vertical Hanger Cables */}
            <line x1="95" y1="52" x2="95" y2="100" stroke="#E3B23C" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="120" y1="67" x2="120" y2="100" stroke="#E3B23C" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="150" y1="75" x2="150" y2="100" stroke="#E3B23C" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="180" y1="67" x2="180" y2="100" stroke="#E3B23C" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="205" y1="52" x2="205" y2="100" stroke="#E3B23C" strokeWidth="1" strokeOpacity="0.6" />
            {/* Bridge Deck Girder */}
            <rect x="10" y="98" width="280" height="12" rx="2" fill="#C84630" stroke="#872314" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'mountain-pass':
      return (
        <div className="relative w-full max-w-sm h-36 flex items-end justify-center pointer-events-none opacity-90">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            {/* Mountain Tunnel Face */}
            <path d="M 20 120 L 50 30 Q 150 10 250 30 L 280 120 Z" fill={isNight ? '#0D1E1D' : '#3D716F'} stroke="#152B2A" strokeWidth="2" />
            {/* Tunnel Arch Portal */}
            <path d="M 85 120 L 85 70 Q 150 25 215 70 L 215 120 Z" fill="#060C0B" stroke="#E3B23C" strokeWidth="3" />
            {/* Keystone atop arch */}
            <polygon points="144,38 156,38 153,52 147,52" fill="#E3B23C" />
            {/* Alpine Pines flanking tunnel */}
            <polygon points="35,120 50,75 65,120" fill="#1C4543" />
            <polygon points="235,120 250,75 265,120" fill="#1C4543" />
          </svg>
        </div>
      );

    case 'summit':
      return (
        <div className="relative w-full max-w-sm h-36 flex items-end justify-center pointer-events-none opacity-90">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            {/* University / Observatory Base */}
            <rect x="70" y="60" width="160" height="60" fill={isNight ? '#122423' : '#DED2BB'} stroke="#2F6F6D" strokeWidth="2" />
            {/* Observatory Dome */}
            <path d="M 100 60 A 50 50 0 0 1 200 60 Z" fill={isNight ? '#1F3C3A' : '#FAF5EA'} stroke="#2F6F6D" strokeWidth="2" />
            {/* Dome Slit Aperture */}
            <path d="M 144 60 L 140 18 L 155 18 L 151 60 Z" fill="#0A1615" />
            {/* Telescope Barrel angled outward */}
            <line x1="147" y1="40" x2="168" y2="12" stroke="#E3B23C" strokeWidth="4" strokeLinecap="round" />
            {/* Classical Columns */}
            <line x1="90" y1="60" x2="90" y2="120" stroke="#2F6F6D" strokeWidth="2" />
            <line x1="120" y1="60" x2="120" y2="120" stroke="#2F6F6D" strokeWidth="2" />
            <line x1="180" y1="60" x2="180" y2="120" stroke="#2F6F6D" strokeWidth="2" />
            <line x1="210" y1="60" x2="210" y2="120" stroke="#2F6F6D" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'coastal-lighthouse':
      return (
        <div className="relative w-full max-w-sm h-36 flex items-end justify-center pointer-events-none opacity-90">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            {/* Ocean Waves */}
            <path d="M 0 115 Q 40 110 80 115 Q 120 120 160 115 Q 200 110 240 115 Q 280 120 300 115 L 300 120 L 0 120 Z" fill="#184342" />
            {/* Wooden Pier Deck */}
            <rect x="20" y="105" width="260" height="10" fill="#784E2D" stroke="#3D2411" strokeWidth="1" />
            {/* Pier Pilings */}
            <rect x="50" y="115" width="8" height="15" fill="#4A2E19" />
            <rect x="120" y="115" width="8" height="15" fill="#4A2E19" />
            <rect x="190" y="115" width="8" height="15" fill="#4A2E19" />
            <rect x="260" y="115" width="8" height="15" fill="#4A2E19" />
            {/* Lighthouse Tower */}
            <polygon points="135,105 142,25 158,25 165,105" fill="#FAF5EB" stroke="#C84630" strokeWidth="2" />
            {/* Red Spiral / Horizontal Bands */}
            <polygon points="138,75 162,75 164,88 136,88" fill="#C84630" />
            <polygon points="140,45 160,45 161,56 139,56" fill="#C84630" />
            {/* Lantern Room & Gallery */}
            <rect x="138" y="18" width="24" height="8" rx="1" fill="#FEF08A" stroke="#2F6F6D" strokeWidth="1.5" />
            <polygon points="136,18 150,8 164,18" fill="#C84630" />
            {/* Sweeping Light Ray in Night Mode */}
            {isNight && (
              <polygon
                points="150,22 290,0 290,45"
                fill="url(#lighthouseGlow)"
                className="opacity-75"
              />
            )}
            <defs>
              <linearGradient id="lighthouseGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
