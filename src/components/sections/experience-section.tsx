"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Award,
  Zap,
} from 'lucide-react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '@/lib/data';

// Variants defined outside component
const timelineItemVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -32 : 32,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 },
  },
};

const nodePulseVariants = {
  idle: { scale: 1 },
  pulse: {
    scale: [1, 1.3, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 65%'],
  });

  // GPU-accelerated: only animating scaleY (transform)
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section-padding relative">
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
            <Clock className="w-3.5 h-3.5" />
            04 // Chronology
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Experience &amp;{' '}
            <span className="text-gradient-aurora">Education Timeline</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl">
            A chronological progression of engineering roles, software achievements, and academic rigor.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Static track */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/6 rounded-full" />

          {/* Animated scroll beam — only scaleY is animated (GPU-safe transform) */}
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
            className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/50 rounded-full"
          />

          {/* ── Work Experience ── */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-10">
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-primary/10 border border-primary/25 shadow-glow-sm-indigo z-10">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-sm text-primary">
                  Professional Industry Experience
                </span>
              </div>
            </div>

            <div className="space-y-14">
              {EXPERIENCE_DATA.map((exp, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={exp.title + exp.date}
                    className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-start"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 mt-6">
                      <div className="relative w-9 h-9 rounded-full glass border-2 border-primary flex items-center justify-center shadow-glow-sm-indigo">
                        <Zap className="w-4 h-4 text-primary" />
                        {/* Pulse ring for current role */}
                        {exp.badge === 'Current Role' && (
                          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-40" />
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <motion.div
                      custom={isEven}
                      variants={timelineItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      whileHover={{
                        y: -4,
                        transition: { type: 'spring', stiffness: 300, damping: 25 },
                      }}
                      className={`pl-14 sm:pl-0 ${isEven ? 'sm:pr-10 sm:text-left' : 'sm:col-start-2 sm:pl-10'}`}
                    >
                      <div className="glass border border-white/8 rounded-3xl p-6 glow-soft relative overflow-hidden">
                        {/* Top glow accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/6 rounded-full blur-2xl pointer-events-none" />

                        {/* Meta header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/6">
                          <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.date}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2.5 py-1 rounded-xl font-bold ${
                              exp.badge === 'Current Role'
                                ? 'badge-emerald'
                                : 'badge-amber'
                            }`}
                          >
                            {exp.badge}
                          </span>
                        </div>

                        {/* Title & Company */}
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="font-sans text-sm text-secondary mt-1 flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold">{exp.company}</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </p>

                        {/* Responsibilities */}
                        <ul className="mt-4 space-y-2.5">
                          {exp.responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="mt-5 pt-3 border-t border-white/6 flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-2.5 py-1 rounded-xl bg-white/4 border border-white/8 text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Education ── */}
          <div className="pt-6">
            <div className="flex items-center justify-center mb-10">
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-secondary/10 border border-secondary/25 z-10">
                <GraduationCap className="w-4 h-4 text-secondary" />
                <span className="font-display font-bold text-sm text-secondary">
                  Formal Education & Degrees
                </span>
              </div>
            </div>

            <div className="space-y-14">
              {EDUCATION_DATA.map((edu, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={edu.degree}
                    className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-start"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 mt-6">
                      <div className="w-9 h-9 rounded-full glass border-2 border-secondary flex items-center justify-center shadow-glow-emerald">
                        <Award className="w-4 h-4 text-secondary" />
                      </div>
                    </div>

                    {/* Card */}
                    <motion.div
                      custom={!isEven}
                      variants={timelineItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      whileHover={{
                        y: -4,
                        transition: { type: 'spring', stiffness: 300, damping: 25 },
                      }}
                      className={`pl-14 sm:pl-0 ${!isEven ? 'sm:pr-10 sm:text-left' : 'sm:col-start-2 sm:pl-10'}`}
                    >
                      <div className="glass border border-white/8 rounded-3xl p-6 glow-soft relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/6 rounded-full blur-2xl pointer-events-none" />

                        {/* Meta */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/6">
                          <span className="text-xs font-mono font-semibold text-secondary flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {edu.date}
                          </span>
                          <span className="text-xs font-mono px-2.5 py-1 rounded-xl badge-emerald font-bold">
                            {edu.scoreLabel}: {edu.score}
                          </span>
                        </div>

                        {/* Degree & School */}
                        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                          {edu.degree}
                        </h3>
                        <p className="font-sans text-sm text-primary mt-1 font-semibold">
                          {edu.institution}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground mt-0.5">
                          {edu.location} · {edu.field}
                        </p>

                        {/* Highlights */}
                        <ul className="mt-3 space-y-1.5">
                          {edu.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-primary font-bold">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
