'use client';

import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Radio, Moon, Sun } from 'lucide-react';

interface TelemetryProps {
  variant?: 'hud' | 'expanded' | 'card';
  className?: string;
}

export function DhakaTelemetryWidget({ variant = 'hud', className = '' }: TelemetryProps) {
  const [dhakaTimeStr, setDhakaTimeStr] = useState<string>('--:--:--');
  const [dhakaHour, setDhakaHour] = useState<number>(12);
  const [visitorTz, setVisitorTz] = useState<string>('');
  const [hourDiff, setHourDiff] = useState<number>(0);
  const [isAwake, setIsAwake] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Dhaka time formatted
      const dhakaFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setDhakaTimeStr(dhakaFormatter.format(now));

      // Calculate Dhaka hour (0-23) for awake/coding status
      const dhakaHourFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(dhakaHourFormatter.format(now), 10);
      setDhakaHour(hour);

      // Awake: 8:00 AM (08:00) to 1:00 AM (01:00)
      const awakeStatus = hour >= 8 || hour < 1;
      setIsAwake(awakeStatus);

      // Visitor timezone & offset calculation
      try {
        const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
        setVisitorTz(detectedTz.replace(/_/g, ' '));

        // Time offset comparison in hours
        const visitorOffset = -now.getTimezoneOffset() / 60; // in hours from UTC
        const dhakaOffset = 6; // UTC+6
        const diff = visitorOffset - dhakaOffset;
        setHourDiff(diff);
      } catch {
        // Fallback
        setVisitorTz('Local');
        setHourDiff(0);
      }
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Format difference description
  const getDifferenceText = () => {
    if (Math.abs(hourDiff) < 0.25) {
      return 'Same timezone as Partha';
    }
    const absDiff = Math.abs(Math.round(hourDiff));
    if (hourDiff < 0) {
      return `${absDiff}h behind Dhaka`;
    }
    return `${absDiff}h ahead of Dhaka`;
  };

  if (variant === 'hud') {
    return (
      <div className={`flex items-center gap-2 sm:gap-3 text-xs tracking-wide ${className}`}>
        {/* Status Pill */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono transition-colors ${
            isAwake
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
          }`}
          title={isAwake ? 'Partha is online / awake in Dhaka' : 'Partha is resting / off-duty'}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isAwake ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="hidden sm:inline font-medium">{isAwake ? 'Awake & Coding' : 'Off-duty'}</span>
        </div>

        {/* Dhaka Time Clock */}
        <div className="flex items-center gap-1.5 text-rail-vanilla/90 font-mono">
          <Clock className="w-3.5 h-3.5 text-rail-orange" />
          <span className="font-semibold">{dhakaTimeStr}</span>
          <span className="hidden md:inline text-[10px] text-rail-vanilla/60 font-sans">(Dhaka GMT+6)</span>
        </div>

        {/* Visitor offset badge */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-rail-vanilla/65 font-mono px-2 py-0.5 rounded bg-rail-teal/30 border border-rail-teal/40">
          <span>{getDifferenceText()}</span>
        </div>
      </div>
    );
  }

  // Ultra-Compact Console Card (for Station 6 / Pier widescreen dashboard)
  if (variant === 'card') {
    return (
      <div
        className={`p-3 rounded-xl border border-rail-teal/30 bg-rail-midnight/80 backdrop-blur-md text-rail-vanilla shadow-md space-y-2 ${className}`}
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-rail-teal/20 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-rail-orange animate-pulse" />
            <h4 className="font-editorial text-sm font-bold tracking-wide text-rail-vanilla">Live Railway Telemetry</h4>
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
              isAwake
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isAwake ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isAwake ? 'Awake & Coding' : 'Off-Duty'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div>
            <span className="text-[9px] text-rail-vanilla/60 block uppercase font-bold">Dispatch Post: Dhaka, BD</span>
            <div className="text-base font-bold text-rail-orange leading-tight mt-0.5">{dhakaTimeStr}</div>
            <span className="text-[9px] text-rail-vanilla/70 block mt-0.5">23.81° N, 90.41° E (GMT+6)</span>
          </div>
          <div className="border-l border-rail-teal/25 pl-2.5">
            <span className="text-[9px] text-rail-vanilla/60 block uppercase font-bold">Your Local Radar</span>
            <div className="text-xs text-rail-vanilla font-medium truncate leading-tight mt-0.5">{visitorTz || 'Local Device'}</div>
            <span className="text-[9.5px] text-rail-gold inline-block mt-0.5 font-bold">{getDifferenceText()}</span>
          </div>
        </div>
      </div>
    );
  }

  // Expanded / Card Variant (for Station 6 / Pier)
  return (
    <div
      className={`p-5 rounded-xl border border-rail-teal/40 bg-rail-midnight/80 backdrop-blur-md text-rail-vanilla shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-rail-teal/30">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-rail-orange animate-pulse" />
          <h4 className="font-editorial text-lg tracking-wide text-rail-vanilla">Live Railway Telemetry</h4>
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
            isAwake
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
          }`}
        >
          {isAwake ? <Sun className="w-3.5 h-3.5 text-emerald-400" /> : <Moon className="w-3.5 h-3.5 text-amber-400" />}
          <span>{isAwake ? 'Awake & Coding' : 'Sleeping / Off-Duty'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Partha's Dhaka Telemetry */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-rail-vanilla/60 font-mono">
            <MapPin className="w-3.5 h-3.5 text-rail-orange" />
            <span>DISPATCH POST: DHAKA, BD</span>
          </div>
          <div className="text-2xl font-mono font-bold text-rail-orange tracking-tight">{dhakaTimeStr}</div>
          <p className="text-xs text-rail-vanilla/70">
            Coordinates: <span className="font-mono text-rail-vanilla">23.8103° N, 90.4125° E</span> (GMT+6 BST)
          </p>
        </div>

        {/* Visitor Location & Offset */}
        <div className="space-y-1.5 border-t md:border-t-0 md:border-l md:pl-4 border-rail-teal/30 pt-3 md:pt-0">
          <div className="flex items-center gap-1.5 text-xs text-rail-vanilla/60 font-mono">
            <Clock className="w-3.5 h-3.5 text-rail-teal-light" />
            <span>YOUR LOCAL RADAR</span>
          </div>
          <div className="text-sm font-mono font-medium text-rail-vanilla truncate">
            {visitorTz || 'Detected Timezone'}
          </div>
          <p className="text-xs text-rail-vanilla/80 font-mono bg-rail-teal/20 px-2.5 py-1 rounded border border-rail-teal/30 inline-block">
            {getDifferenceText()}
          </p>
        </div>
      </div>
    </div>
  );
}
