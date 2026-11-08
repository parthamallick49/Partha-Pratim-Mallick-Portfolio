"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  Terminal, 
  Send, 
  CornerDownLeft, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Code2,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PERSONAL_DATA, CLAUDE_HERO_PROMPTS, ClaudeAssistantQuery } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileImage = PlaceHolderImages.find((p) => p.id === 'profile');

export function HeroSection() {
  const [selectedPrompt, setSelectedPrompt] = useState<ClaudeAssistantQuery | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState('');

  // Handle suggestion chip click
  const handleSelectPrompt = (prompt: ClaudeAssistantQuery) => {
    setSelectedPrompt(prompt);
    setIsTyping(true);
    setStreamedText('');
  };

  // Streaming text effect when prompt is activated
  useEffect(() => {
    if (!selectedPrompt || !isTyping) return;

    let index = 0;
    const fullText = selectedPrompt.responseParagraph;
    const timer = setInterval(() => {
      index += 2;
      if (index >= fullText.length) {
        setStreamedText(fullText);
        setIsTyping(false);
        clearInterval(timer);
      } else {
        setStreamedText(fullText.slice(0, index));
      }
    }, 15);

    return () => clearInterval(timer);
  }, [selectedPrompt, isTyping]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const lower = customInput.toLowerCase();
    let match = CLAUDE_HERO_PROMPTS.find((p) =>
      lower.includes('project') || lower.includes('work') || lower.includes('build')
        ? p.id === 'projects'
        : lower.includes('skill') || lower.includes('stack') || lower.includes('flutter') || lower.includes('java')
        ? p.id === 'stack'
        : lower.includes('exp') || lower.includes('job') || lower.includes('grameen')
        ? p.id === 'experience'
        : p.id === 'contact'
    ) || CLAUDE_HERO_PROMPTS[0];

    setSelectedPrompt({
      ...match,
      query: customInput,
    });
    setIsTyping(true);
    setStreamedText('');
    setCustomInput('');
  };

  return (
    <section id="home" className="relative pt-6 pb-20 md:pt-12 md:pb-32 overflow-hidden">
      {/* Background radial warmth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E6DBC2]/40 dark:bg-[#204E4D]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Literary Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E6DBC2] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono text-[#1C1B18] dark:text-[#FAF6EC] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C84630] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C84630]" />
              </span>
              <span className="font-medium tracking-tight">{PERSONAL_DATA.status}</span>
              <span className="text-[#52504A] dark:text-[#B5C7C6]">· Dhaka, BD</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-[#2F6F6D] dark:text-[#DCD0B6] font-semibold">
                Software Engineer &amp; Mobile Developer
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C1B18] dark:text-[#FAF6EC] leading-[1.08]">
                Partha Pratim Mallick
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-[#2F6F6D] dark:text-[#E6DBC2]/90 leading-relaxed max-w-xl">
                &ldquo;Engineering resilient mobile systems and scalable backend architectures with human-centric clarity.&rdquo;
              </p>
            </div>

            {/* Sub-description */}
            <p className="text-sm sm:text-base text-[#52504A] dark:text-[#DCD0B6]/90 leading-relaxed max-w-xl font-sans">
              Currently delivering performant client apps and distributed data pipelines at{' '}
              <strong className="text-[#1C1B18] dark:text-[#FAF6EC] font-semibold">Grameen Communications</strong>.
              Specialized in Flutter/Dart, Java (Native Android), .NET Core, and Microsoft SQL Server.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[#C84630] hover:bg-[#B83E29] text-[#FAF6EC] font-medium rounded-full px-6 shadow-sm hover:shadow-claude-glow transition-all"
              >
                <Link href="#projects">
                  Explore Artifacts <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-[#DCD0B6] dark:border-[#2E6B69] bg-[#FAF6EC]/80 dark:bg-[#204E4D]/80 hover:bg-[#E6DBC2] dark:hover:bg-[#2F6F6D] text-[#1C1B18] dark:text-[#FAF6EC] font-mono text-xs px-5"
              >
                <a href={PERSONAL_DATA.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 w-3.5 h-3.5 text-[#C84630]" />
                  Download CV (PDF)
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full hover:bg-[#E6DBC2]/60 dark:hover:bg-[#204E4D]/60 text-xs font-mono text-[#2F6F6D] dark:text-[#FAF6EC]"
              >
                <Link href="#contact">
                  Direct Message →
                </Link>
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#DCD0B6]/80 dark:border-[#2E6B69]/80 max-w-lg">
              <div>
                <p className="font-serif text-2xl font-bold text-[#1C1B18] dark:text-[#FAF6EC]">1.5+ yrs</p>
                <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">Engineering Experience</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#C84630]">7+ Apps</p>
                <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">Shipped &amp; Architected</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#2F6F6D] dark:text-[#FAF6EC]">DIU CSE</p>
                <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">Honors Graduate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Portrait & Architectural Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Decorative warm aura */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#C84630]/30 via-[#2F6F6D]/30 to-[#E6DBC2] blur-xl opacity-70 -z-10" />

              {/* Card Container */}
              <div className="rounded-3xl p-3.5 bg-[#FAF6EC] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card">
                <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden border border-[#DCD0B6]/60 dark:border-[#2E6B69]/60 bg-[#E6DBC2]">
                  {profileImage && (
                    <Image
                      src={profileImage.imageUrl}
                      alt={profileImage.description}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/70 via-transparent to-transparent" />

                  {/* Overlay Meta Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#FAF6EC]/90 dark:bg-[#1A403F]/90 backdrop-blur-md border border-[#DCD0B6] dark:border-[#2E6B69] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-serif font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                        Partha Pratim Mallick
                      </p>
                      <p className="text-[10px] font-mono text-[#52504A] dark:text-[#B5C7C6]">
                        Grameen Communications · Dhaka
                      </p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C84630] animate-pulse" />
                  </div>
                </div>

                {/* Micro tech tags below avatar */}
                <div className="mt-3 flex items-center justify-between px-1.5 text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F6D]" /> Flutter / Dart
                  </span>
                  <span>·</span>
                  <span>Java / .NET</span>
                  <span>·</span>
                  <span>SQL Server</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* INTERACTIVE CLAUDE-STYLE "ASK / EXPLORE" PROMPT WIDGET */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <div className="rounded-3xl p-5 sm:p-7 bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card transition-all">
            
            {/* Claude Prompt Header */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#C84630] text-[#FAF6EC] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-serif text-sm sm:text-base font-semibold text-[#1C1B18] dark:text-[#FAF6EC]">
                  Claude Assistant — Interactive Portfolio Inspector
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">
                Interactive Prompt
              </span>
            </div>

            {/* Suggestion Chips */}
            <div className="space-y-2 mb-4">
              <p className="text-xs font-mono text-[#52504A] dark:text-[#B5C7C6]">
                Click a prompt chip below to explore Partha's qualifications instantly:
              </p>
              <div className="flex flex-wrap gap-2">
                {CLAUDE_HERO_PROMPTS.map((prompt) => {
                  const isSelected = selectedPrompt?.id === prompt.id;
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => handleSelectPrompt(prompt)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-mono transition-all duration-200 border ${
                        isSelected
                          ? 'bg-[#C84630] text-[#FAF6EC] border-[#C84630] shadow-sm font-semibold'
                          : 'bg-[#E6DBC2]/70 dark:bg-[#1A403F]/70 text-[#1C1B18] dark:text-[#FAF6EC] border-[#DCD0B6] dark:border-[#2E6B69] hover:bg-[#FAF6EC] dark:hover:bg-[#2F6F6D] hover:border-[#C84630]'
                      }`}
                    >
                      {prompt.chipLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Input Box */}
            <form onSubmit={handleCustomSubmit} className="relative mt-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask about Partha's mobile projects, .NET backend, or availability..."
                className="w-full pl-4 pr-24 py-3 rounded-2xl bg-[#E6DBC2]/50 dark:bg-[#1A403F]/60 border border-[#DCD0B6] dark:border-[#2E6B69] text-sm text-[#1C1B18] dark:text-[#FAF6EC] placeholder:text-[#52504A]/60 dark:placeholder:text-[#B5C7C6]/60 focus:outline-none focus:ring-2 focus:ring-[#C84630] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2F6F6D] dark:bg-[#C84630] hover:opacity-90 text-[#FAF6EC] text-xs font-mono font-medium transition-all"
              >
                <span>Ask</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>

            {/* Interactive Claude AI Response Stream */}
            <AnimatePresence mode="wait">
              {selectedPrompt && (
                <motion.div
                  key={selectedPrompt.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 pt-5 border-t border-[#DCD0B6] dark:border-[#2E6B69] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#C84630]">
                      <Sparkles className="w-3.5 h-3.5" />
                      Claude Editorial Insight:
                    </span>
                    <button
                      onClick={() => setSelectedPrompt(null)}
                      className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6] hover:text-[#C84630]"
                    >
                      Clear response ×
                    </button>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                    {selectedPrompt.responseHeadline}
                  </h3>

                  <p className="text-sm text-[#1C1B18]/90 dark:text-[#FAF6EC]/90 leading-relaxed font-sans">
                    {streamedText}
                    {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-[#C84630] animate-pulse" />}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {selectedPrompt.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#52504A] dark:text-[#DCD0B6]">
                        <span className="text-[#C84630] font-bold mt-0.5">✦</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-[#2F6F6D] hover:bg-[#235654] text-[#FAF6EC] text-xs font-mono"
                    >
                      <Link href={`#${selectedPrompt.targetSectionId}`}>
                        {selectedPrompt.ctaLabel}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
