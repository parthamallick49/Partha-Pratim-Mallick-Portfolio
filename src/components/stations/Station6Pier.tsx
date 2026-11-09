'use client';

import React, { useState } from 'react';
import { CONTACT_CHANNELS } from '@/data/portfolioData';
import { StationScenery } from '@/components/world/StationScenery';
import { DhakaTelemetryWidget } from '@/components/world/DhakaTelemetryWidget';
import { Mail, Copy, Check, ExternalLink, Send, ArrowUp, Radio, Anchor } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { soundEngine } from '@/lib/audioSynthesizer';
import { useToast } from '@/hooks/use-toast';

interface StationProps {
  isNight?: boolean;
  onReturnToStart?: () => void;
}

export function Station6Pier({ isNight = false, onReturnToStart }: StationProps) {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isDispatching, setIsDispatching] = useState(false);

  const handleCopyEmail = () => {
    soundEngine.playTelegraphKey();
    navigator.clipboard.writeText(CONTACT_CHANNELS.email);
    setCopiedEmail(true);
    toast({
      title: 'Email Address Copied',
      description: CONTACT_CHANNELS.email,
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    soundEngine.playTelegraphKey();
    setIsDispatching(true);

    // Simulate telegraph morse dispatch
    setTimeout(() => {
      soundEngine.playTelegraphKey();
    }, 200);
    setTimeout(() => {
      soundEngine.playTelegraphKey();
    }, 450);

    setTimeout(() => {
      setIsDispatching(false);
      // Format mailto link and open
      const emailSubject = encodeURIComponent(subject || `Telegram from ${senderName || 'Railway Passenger'}`);
      const emailBody = encodeURIComponent(
        `DISPATCH TICKET: TELEGRAPH PIER #06\n` +
        `Sender Name: ${senderName || 'Anonymous'}\n` +
        `Sender Email: ${senderEmail || 'N/A'}\n\n` +
        `TELEGRAPH MESSAGE:\n${message}\n\n` +
        `-- Transmitted via Partha's Scenic Train Journey`
      );
      window.location.href = `mailto:${CONTACT_CHANNELS.email}?subject=${emailSubject}&body=${emailBody}`;

      toast({
        title: 'Telegram Dispatched to Mail Client!',
        description: 'Transmitting via mailto with pre-filled telegraph fields.',
      });
    }, 700);
  };

  return (
    <section
      id="station-6"
      className="relative min-h-[95vh] flex flex-col justify-center items-center py-16 px-4 max-w-6xl mx-auto"
    >
      {/* Background Seaside Lighthouse Scenery */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-lg z-0 opacity-40 sm:opacity-60 pointer-events-none">
        <StationScenery type="coastal-lighthouse" isNight={isNight} />
      </div>

      {/* Station Plaque */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rail-orange/40 bg-rail-orange/10 text-rail-orange text-xs font-mono font-semibold uppercase tracking-widest mb-3">
          <Anchor className="w-3.5 h-3.5" />
          <span>Station 06 • Terminal Pier (MP 99.9)</span>
        </div>
        <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-rail-vanilla drop-shadow-md">
          Dhaka Coastal Pier & Telegraph
        </h2>
        <p className="font-mono text-xs sm:text-sm text-rail-vanilla/70 mt-2 tracking-wide">
          TERMINAL STATION • VINTAGE DISPATCH SLIP & DIRECT COMMUNICATION
        </p>
      </div>

      {/* Main Grid: Telegraph Form (Left) & Telemetry / Direct Links (Right) */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive "Send a Telegram" Dispatch Form */}
        <div className="lg:col-span-7 rounded-2xl border border-rail-teal/40 bg-rail-midnight/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Vintage Telegraph Header */}
          <div className="flex items-center justify-between border-b border-rail-teal/30 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-rail-orange/20 border border-rail-orange/30 text-rail-orange">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-editorial text-xl font-bold text-rail-vanilla">Dispatch a Telegram</h3>
                <span className="text-[11px] font-mono text-rail-gold uppercase tracking-wider">
                  OFFICIAL FORM • DHAKA WIRELESS LINE
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-rail-teal/30 border border-rail-teal/40 text-rail-vanilla">
              PRIORITY: EXPRESS
            </span>
          </div>

          <form onSubmit={handleSendTelegram} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-rail-vanilla/70 text-[11px] mb-1">YOUR NAME / OPERATOR:</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  placeholder="e.g., Ada Lovelace"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-rail-midnight border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-rail-vanilla/70 text-[11px] mb-1">RETURN DISPATCH EMAIL:</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={e => setSenderEmail(e.target.value)}
                  placeholder="e.g., traveler@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-rail-midnight border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-rail-vanilla/70 text-[11px] mb-1">SUBJECT DISPATCH LINE:</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g., Mobile Architecture Inquiry / Collaboration"
                className="w-full px-3.5 py-2.5 rounded-xl bg-rail-midnight border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-rail-vanilla/70 text-[11px] mb-1">TELEGRAPH MESSAGE (BODY):</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message for Partha... (Press Transmit to open pre-filled mail)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-rail-midnight border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none transition-colors resize-none font-sans text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isDispatching}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs sm:text-sm font-bold shadow-lg shadow-rail-orange/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
              <span>{isDispatching ? 'TRANSMITTING MORSE CODE...' : 'TRANSMIT TELEGRAM TO PARTHA'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Telemetry Widget & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Telemetry Card */}
          <DhakaTelemetryWidget variant="expanded" />

          {/* Direct Communication Channels */}
          <div className="rounded-2xl border border-rail-teal/40 bg-rail-midnight/85 backdrop-blur-md p-6 shadow-xl space-y-4">
            <h4 className="font-editorial text-xl font-bold text-rail-vanilla border-b border-rail-teal/30 pb-3">
              Direct Channels
            </h4>

            {/* Email with 1-click copy */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-rail-teal/15 border border-rail-teal/30">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-rail-orange shrink-0" />
                <span className="font-mono text-xs text-rail-vanilla truncate">{CONTACT_CHANNELS.email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-rail-teal/30 hover:bg-rail-teal/50 text-rail-vanilla transition-colors ml-2"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rail-gold" />}
              </button>
            </div>

            {/* Social / Profiles */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={CONTACT_CHANNELS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-rail-midnight border border-rail-teal/40 hover:border-rail-gold text-rail-vanilla font-mono text-xs transition-colors"
              >
                <SiGithub className="w-4 h-4 text-rail-vanilla" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-rail-vanilla/50" />
              </a>

              <a
                href={CONTACT_CHANNELS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-rail-midnight border border-rail-teal/40 hover:border-rail-gold text-rail-vanilla font-mono text-xs transition-colors"
              >
                <FaLinkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-rail-vanilla/50" />
              </a>
            </div>

            {/* Return to Departure Express Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playWhistle();
                  if (onReturnToStart) {
                    onReturnToStart();
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-rail-gold/70 bg-rail-gold/15 hover:bg-rail-gold/25 text-rail-gold font-mono text-xs font-bold transition-all shadow-md group"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span>RETURN TO DEPARTURE (STATION 01)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
