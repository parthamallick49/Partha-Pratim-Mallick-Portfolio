"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  MapPin,
  Calendar,
  Zap,
} from 'lucide-react';
import { PERSONAL_DATA } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find((p) => p.id === 'about');

// Variants defined outside component (rerender-variants-object rule)
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

const principles = [
  'Clean Architecture',
  'BLoC & Provider',
  'RESTful API Contracts',
  'Relational Persistence',
  'Testable Modules',
  'Low-Latency Sync',
];

const principleColors = [
  'badge-indigo',
  'badge-cyan',
  'badge-emerald',
  'badge-amber',
  'badge-indigo',
  'badge-cyan',
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 inset-x-0 h-px section-divider" />

      <div className="container-editorial">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/25 text-xs font-mono text-primary">
            <Cpu className="w-3.5 h-3.5" />
            01 // Engineering Profile
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            About &amp;{' '}
            <span className="text-gradient-aurora">Engineering Philosophy</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl">
            Bridging pixel-level UI precision with robust enterprise data pipelines.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Card 1: Mission & Summary (col-7) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            className="md:col-span-7 glass border border-white/8 rounded-3xl p-7 sm:p-8 glow-soft flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle top-left glow */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/8 rounded-full blur-2xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/6">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  What I Bring to the Table
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg badge-emerald">
                  Production Mindset
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                  Translating UX visions into{' '}
                  <span className="text-gradient-indigo">performant, reliable</span> applications.
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {PERSONAL_DATA.summary}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {PERSONAL_DATA.mission}
                </p>
              </div>

              {/* Core Principles */}
              <div className="flex flex-wrap gap-2">
                {principles.map((principle, i) => (
                  <motion.span
                    key={principle}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono ${principleColors[i % principleColors.length]}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 300, damping: 24 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {principle}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="relative mt-7 pt-5 border-t border-white/6 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Grameen Communications · Junior Software Engineer</span>
              <span className="text-secondary font-semibold">Available For Hire</span>
            </div>
          </motion.div>

          {/* Card 2: Architecture Discipline (col-5) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
            className="md:col-span-5 relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 glow-soft"
            style={{
              background: 'linear-gradient(145deg, hsl(262 50% 18%), hsl(262 40% 12%))',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            {/* BG texture image */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
              {aboutImage && (
                <Image src={aboutImage.imageUrl} alt={aboutImage.description} fill className="object-cover" />
              )}
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/15 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-mono text-indigo-pale">
                <Cpu className="w-3.5 h-3.5" />
                Architecture Discipline
              </span>

              <h4 className="font-display text-2xl font-bold text-white leading-tight">
                Software engineered for reliability &amp; long-term maintainability.
              </h4>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Specialized in multi-tier applications where user interfaces remain buttery smooth while syncing transactional databases under unreliable network conditions.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-5 border-t border-white/15 grid grid-cols-2 gap-4">
              <div>
                <p className="font-display text-3xl font-bold text-white">3.53</p>
                <p className="text-xs font-mono text-white/60 mt-0.5">DIU CSE CGPA</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">100%</p>
                <p className="text-xs font-mono text-white/60 mt-0.5">Commitment to Quality</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Stats Row (col-12) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-12 glass border border-white/8 rounded-3xl p-5 glow-soft"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_DATA.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className={`p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden ${
                    idx === 0 ? 'bg-primary/8 border border-primary/15' : 'bg-white/3 border border-white/5'
                  }`}
                  whileHover={{
                    scale: 1.03,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                >
                  {idx === 0 && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/15 rounded-full blur-xl pointer-events-none" />
                  )}
                  <div className="relative">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-gradient-indigo">
                      {stat.value}
                    </span>
                    <p className="font-sans font-semibold text-sm text-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground mt-2 relative">
                    {stat.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
