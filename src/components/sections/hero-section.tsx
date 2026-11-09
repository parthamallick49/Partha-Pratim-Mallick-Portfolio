"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Download,
  CornerDownLeft,
  MapPin,
  Github,
  Linkedin,
} from 'lucide-react';
import { PERSONAL_DATA, CLAUDE_HERO_PROMPTS, ClaudeAssistantQuery } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileImage = PlaceHolderImages.find((p) => p.id === 'profile');

// ─── Variants (defined outside component per framer-motion best practices) ───
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.6 + i * 0.1, type: 'spring' as const, stiffness: 200, damping: 20 },
  }),
};

const roleBadges = [
  { label: 'Flutter & Dart', color: 'badge-cyan', delay: 0 },
  { label: 'Java / Android', color: 'badge-amber', delay: 0.1 },
  { label: '.NET Core', color: 'badge-indigo', delay: 0.2 },
  { label: 'SQL Server', color: 'badge-emerald', delay: 0.3 },
];

const stats = [
  { value: '1.5+', label: 'Years Exp', sub: 'Industry' },
  { value: '7+', label: 'Apps Shipped', sub: 'Production' },
  { value: '14+', label: 'Technologies', sub: 'Cross-Platform' },
  { value: '3.53', label: 'CGPA', sub: 'DIU CSE' },
];

// ─── Orbital visual element ───
const OrbitalElement = () => (
  <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
    {/* Outer ambient glow rings */}
    <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow" />
    <div className="absolute inset-4 rounded-full border border-secondary/10" style={{ animation: 'spin-slow 15s linear infinite reverse' }} />

    {/* Profile image container */}
    <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-primary/30 shadow-glow-indigo">
      {profileImage ? (
        <Image
          src={profileImage.imageUrl}
          alt={profileImage.description}
          fill
          priority
          className="object-cover"
          sizes="300px"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
          <span className="font-display text-5xl font-bold text-gradient-indigo">P</span>
        </div>
      )}
      {/* Overlay shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>

    {/* Orbiting tech icons */}
    {[
      { icon: '⚡', label: 'Flutter', angle: 0, color: '#67e8f9' },
      { icon: '☕', label: 'Java', angle: 90, color: '#fcd34d' },
      { icon: '💜', label: '.NET', angle: 180, color: '#c4b5fd' },
      { icon: '🔥', label: 'Firebase', angle: 270, color: '#6ee7b7' },
    ].map(({ icon, label, angle, color }) => {
      const rad = (angle * Math.PI) / 180;
      const r = 118;
      const cx = 50 + (r / 160) * 50 * Math.cos(rad);
      const cy = 50 + (r / 160) * 50 * Math.sin(rad);
      return (
        <motion.div
          key={label}
          className="absolute w-10 h-10 rounded-full glass flex items-center justify-center text-base shadow-card"
          style={{
            left: `${cx}%`,
            top: `${cy}%`,
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${color}40`,
          }}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2 + angle / 90, repeat: Infinity, ease: 'easeInOut', delay: angle / 180 }}
          title={label}
        >
          {icon}
        </motion.div>
      );
    })}

    {/* Status badge */}
    <motion.div
      className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-secondary/30 text-xs font-mono"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
      </span>
      <span className="text-secondary font-semibold">Available Now</span>
    </motion.div>
  </div>
);

// ─── Main component ───
export function HeroSection() {
  const [selectedPrompt, setSelectedPrompt] = useState<ClaudeAssistantQuery | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState('');

  const handleSelectPrompt = (prompt: ClaudeAssistantQuery) => {
    setSelectedPrompt(prompt);
    setIsTyping(true);
    setStreamedText('');
  };

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
    }, 14);
    return () => clearInterval(timer);
  }, [selectedPrompt, isTyping]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const lower = customInput.toLowerCase();
    const match = CLAUDE_HERO_PROMPTS.find((p) =>
      lower.includes('project') || lower.includes('work') || lower.includes('build')
        ? p.id === 'projects'
        : lower.includes('skill') || lower.includes('stack') || lower.includes('flutter') || lower.includes('java')
        ? p.id === 'stack'
        : lower.includes('exp') || lower.includes('job') || lower.includes('grameen')
        ? p.id === 'experience'
        : p.id === 'contact'
    ) || CLAUDE_HERO_PROMPTS[0];
    setSelectedPrompt({ ...match, query: customInput });
    setIsTyping(true);
    setStreamedText('');
    setCustomInput('');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden hero-mesh">
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/6 blur-3xl pointer-events-none" />

      <div className="container-editorial w-full">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* ── Left Column ── */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Status pill */}
            <motion.div variants={heroItemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-secondary/25 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              <span className="text-secondary font-semibold">{PERSONAL_DATA.status}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Dhaka, BD
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div variants={heroItemVariants} className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                Software Engineer & Mobile Developer
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
                {PERSONAL_DATA.name.split(' ').map((word, i) => (
                  <span key={i} className={i === 2 ? 'text-gradient-aurora block' : 'block'}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Crafting <span className="text-primary font-semibold">resilient mobile experiences</span> and{' '}
                <span className="text-secondary font-semibold">scalable backend architectures</span> at{' '}
                <span className="text-foreground font-semibold">Grameen Communications</span>.
              </p>
            </motion.div>

            {/* Role badges */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap gap-2">
              {roleBadges.map(({ label, color }, i) => (
                <motion.span
                  key={label}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono font-medium ${color}`}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Link
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-indigo text-white text-sm font-semibold shadow-glow-sm-indigo hover:shadow-glow-indigo transition-shadow duration-300"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <a
                  href={PERSONAL_DATA.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-foreground text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  <Download className="w-4 h-4 text-primary" />
                  Download CV
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-muted-foreground text-sm font-medium hover:text-foreground transition-colors duration-200"
                >
                  Say Hello →
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={heroItemVariants}
              className="grid grid-cols-4 gap-3 pt-2 border-t border-white/6"
            >
              {stats.map(({ value, label, sub }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={statVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col"
                >
                  <span className="font-display text-xl sm:text-2xl font-bold text-gradient-indigo">{value}</span>
                  <span className="text-[11px] font-semibold text-foreground leading-tight">{label}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{sub}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={heroItemVariants} className="flex items-center gap-3">
              {[
                { href: PERSONAL_DATA.github, icon: <Github className="w-4 h-4" />, label: 'GitHub' },
                { href: PERSONAL_DATA.linkedin, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-white/8 text-muted-foreground text-xs font-mono hover:text-foreground hover:border-primary/25 transition-all duration-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {icon} {label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: Orbital Visual ── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
          >
            <OrbitalElement />
          </motion.div>
        </motion.div>

        {/* ── Interactive Prompt Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 120, damping: 20 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8 glow-soft">
            {/* Widget header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/6">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-indigo flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="font-display font-semibold text-sm text-foreground">AI Portfolio Assistant</span>
                  <p className="text-[11px] font-mono text-muted-foreground">Ask anything about Partha's background</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/70" />
                <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                <div className="w-2 h-2 rounded-full bg-secondary/70" />
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="space-y-3 mb-5">
              <p className="text-xs font-mono text-muted-foreground">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {CLAUDE_HERO_PROMPTS.map((prompt) => {
                  const isSelected = selectedPrompt?.id === prompt.id;
                  return (
                    <motion.button
                      key={prompt.id}
                      onClick={() => handleSelectPrompt(prompt)}
                      className={`text-xs px-3.5 py-2 rounded-xl font-mono transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-white shadow-glow-sm-indigo font-semibold'
                          : 'glass border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30'
                      }`}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {prompt.chipLabel}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Custom input */}
            <form onSubmit={handleCustomSubmit} className="relative">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask about Partha's mobile projects, .NET backend, or availability..."
                className="w-full pl-4 pr-28 py-3.5 rounded-2xl bg-white/4 border border-white/8 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all font-mono"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/15 border border-primary/30 text-primary text-xs font-mono font-semibold hover:bg-primary/25 transition-all duration-200"
              >
                Ask <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>

            {/* AI Response stream */}
            <AnimatePresence mode="wait">
              {selectedPrompt && (
                <motion.div
                  key={selectedPrompt.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="mt-5 pt-5 border-t border-white/6 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary">
                      <Sparkles className="w-3.5 h-3.5" />
                      Portfolio AI Response:
                    </span>
                    <button
                      onClick={() => setSelectedPrompt(null)}
                      className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Dismiss ×
                    </button>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {selectedPrompt.responseHeadline}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {streamedText}
                    {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-primary cursor-blink" />}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {selectedPrompt.bulletPoints.map((bp, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                      >
                        <span className="text-primary font-bold mt-0.5">▸</span>
                        <span>{bp}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link
                    href={`#${selectedPrompt.targetSectionId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-secondary hover:text-secondary/80 transition-colors"
                  >
                    {selectedPrompt.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
