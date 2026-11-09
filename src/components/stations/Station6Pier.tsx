'use client';

import React, { useState } from 'react';
import { CONTACT_CHANNELS } from '@/data/portfolioData';
import { DhakaTelemetryWidget } from '@/components/world/DhakaTelemetryWidget';
import { Mail, Copy, Check, ExternalLink, Send, ArrowUp, Radio, Anchor, Compass } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'telegram' | 'telemetry'>('telegram');
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

    setTimeout(() => soundEngine.playTelegraphKey(), 200);
    setTimeout(() => soundEngine.playTelegraphKey(), 450);

    setTimeout(() => {
      setIsDispatching(false);
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
        title: 'Telegram Dispatched!',
        description: 'Transmitting via mailto with pre-filled telegraph fields.',
      });
    }, 700);
  };

  return (
    <section
      id="station-6"
      className="relative w-full max-w-lg lg:max-w-xl max-h-[calc(100vh-170px)] overflow-y-auto scrollbar-thin bg-rail-midnight/90 backdrop-blur-md border border-rail-teal/40 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-2 text-rail-vanilla"
    >
      {/* Station Plaque Header */}
      <div className="border-b border-rail-teal/30 pb-2">
        <div className="flex items-center justify-between text-xs font-mono mb-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rail-orange/15 border border-rail-orange/40 text-rail-orange font-bold text-[11px]">
            <Anchor className="w-3 h-3" />
            STATION 06 • MP 99.9
          </span>
          <span className="text-rail-gold/80 font-mono text-[10px]">TERMINAL PIER</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-rail-vanilla leading-tight">
          Dhaka Coastal Pier & Telegraph
        </h2>
        <p className="font-mono text-[11px] text-rail-gold mt-0.5">
          SEASIDE DISPATCH • LIVE TELEMETRY RADAR
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => {
            soundEngine.playTrackClack();
            setActiveTab('telegram');
          }}
          className={`py-1.5 px-3 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'telegram'
              ? 'bg-rail-orange text-rail-vanilla font-bold shadow-md shadow-rail-orange/30'
              : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
          }`}
        >
          <Radio className="w-3 h-3" />
          <span>Dispatch Telegram</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playTrackClack();
            setActiveTab('telemetry');
          }}
          className={`py-1.5 px-3 rounded-xl font-mono text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'telemetry'
              ? 'bg-rail-orange text-rail-vanilla font-bold shadow-md shadow-rail-orange/30'
              : 'bg-rail-teal/20 text-rail-vanilla/70 hover:text-rail-vanilla hover:bg-rail-teal/30'
          }`}
        >
          <Compass className="w-3 h-3" />
          <span>Telemetry & Channels</span>
        </button>
      </div>

      {/* Tab 1: Dispatch Form */}
      {activeTab === 'telegram' ? (
        <form onSubmit={handleSendTelegram} className="space-y-2 font-mono text-xs pt-0.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-rail-vanilla/70 text-[10px] mb-0.5">YOUR NAME:</label>
              <input
                type="text"
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                placeholder="e.g. Engineering Lead"
                className="w-full px-2.5 py-1.5 rounded-lg bg-rail-midnight/80 border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-rail-vanilla/70 text-[10px] mb-0.5">RETURN EMAIL:</label>
              <input
                type="email"
                value={senderEmail}
                onChange={e => setSenderEmail(e.target.value)}
                placeholder="e.g. lead@company.com"
                className="w-full px-2.5 py-1.5 rounded-lg bg-rail-midnight/80 border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-rail-vanilla/70 text-[10px] mb-0.5">SUBJECT:</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Mobile Engineering Collaboration"
              className="w-full px-2.5 py-1.5 rounded-lg bg-rail-midnight/80 border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none text-xs"
            />
          </div>

          <div>
            <label className="block text-rail-vanilla/70 text-[10px] mb-0.5">TELEGRAPH MESSAGE:</label>
            <textarea
              required
              rows={2}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message for Partha..."
              className="w-full px-2.5 py-1.5 rounded-lg bg-rail-midnight/80 border border-rail-teal/40 focus:border-rail-gold text-rail-vanilla placeholder-rail-vanilla/30 outline-none text-xs resize-none font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isDispatching}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rail-orange hover:bg-rail-orange-glow text-rail-vanilla font-mono text-xs font-bold shadow-md shadow-rail-orange/30 transition-all"
          >
            <Send className={`w-3.5 h-3.5 ${isDispatching ? 'animate-spin' : ''}`} />
            <span>{isDispatching ? 'TRANSMITTING MORSE CODE...' : 'TRANSMIT TELEGRAM'}</span>
          </button>
        </form>
      ) : (
        /* Tab 2: Telemetry Radar & Direct Channels */
        <div className="space-y-2 pt-0.5">
          <DhakaTelemetryWidget variant="expanded" />

          {/* Email Copy */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-rail-teal/15 border border-rail-teal/30">
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-3.5 h-3.5 text-rail-orange shrink-0" />
              <span className="font-mono text-xs text-rail-vanilla truncate">{CONTACT_CHANNELS.email}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1 rounded-lg bg-rail-teal/30 hover:bg-rail-teal/50 text-rail-vanilla ml-2"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rail-gold" />}
            </button>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={CONTACT_CHANNELS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-rail-midnight border border-rail-teal/40 hover:border-rail-gold text-rail-vanilla font-mono text-xs"
            >
              <SiGithub className="w-3.5 h-3.5 text-rail-vanilla" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-rail-vanilla/40" />
            </a>

            <a
              href={CONTACT_CHANNELS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-rail-midnight border border-rail-teal/40 hover:border-rail-gold text-rail-vanilla font-mono text-xs"
            >
              <FaLinkedin className="w-3.5 h-3.5 text-[#0077B5]" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-rail-vanilla/40" />
            </a>
          </div>

          {/* Return to Departure Express */}
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
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-rail-gold/70 bg-rail-gold/15 hover:bg-rail-gold/25 text-rail-gold font-mono text-xs font-bold transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>RETURN TO DEPARTURE (STATION 01)</span>
          </button>
        </div>
      )}
    </section>
  );
}
