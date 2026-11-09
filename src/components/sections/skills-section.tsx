"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Filter, ArrowRight, RotateCcw, Code, Layers } from 'lucide-react';
import { SKILLS_CATEGORIES, SkillItem, PROJECTS_DATA } from '@/lib/data';
import { useProjectFilter } from '@/hooks/use-project-filter';

// Variants outside component
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

const skillButtonVariants = {
  idle: { scale: 1, y: 0 },
  hover: {
    scale: 1.06,
    y: -3,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
  tap: { scale: 0.96 },
  selected: {
    scale: 1.04,
    y: -2,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
};

// Category accent colors
const CATEGORY_ACCENTS: Record<string, { border: string; glow: string; badge: string }> = {
  'mobile-frontend': {
    border: 'rgba(6,182,212,0.25)',
    glow: 'rgba(6,182,212,0.08)',
    badge: 'badge-cyan',
  },
  backend: {
    border: 'rgba(124,58,237,0.25)',
    glow: 'rgba(124,58,237,0.08)',
    badge: 'badge-indigo',
  },
  databases: {
    border: 'rgba(16,185,129,0.25)',
    glow: 'rgba(16,185,129,0.08)',
    badge: 'badge-emerald',
  },
  'tools-devops': {
    border: 'rgba(245,158,11,0.25)',
    glow: 'rgba(245,158,11,0.08)',
    badge: 'badge-amber',
  },
};

export function SkillsSection() {
  const { filter, setFilter, resetFilter } = useProjectFilter();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getMatchingCount = (tech: string) =>
    PROJECTS_DATA.filter((p) =>
      p.tags.some(
        (tag) =>
          tag.toLowerCase().includes(tech.toLowerCase()) ||
          tech.toLowerCase().includes(tag.toLowerCase())
      )
    ).length;

  const activeMatchingCount =
    filter !== 'All' ? getMatchingCount(filter) : PROJECTS_DATA.length;

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute top-0 inset-x-0 h-px section-divider" />
      <div className="absolute bottom-0 inset-x-0 h-px section-divider" />

      <div className="container-editorial">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="flex flex-col items-center text-center space-y-3 mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/25 text-xs font-mono text-primary">
            <Terminal className="w-3.5 h-3.5" />
            02 // Interactive Tech Matrix
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Live Skills &amp;{' '}
            <span className="text-gradient-emerald">Technology Stack</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl">
            Click any technology to dynamically filter and inspect corresponding projects.
          </p>

          {/* Active Filter Pill */}
          <AnimatePresence>
            {filter !== 'All' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="mt-3 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-primary/10 border border-primary/30 text-sm font-mono shadow-glow-sm-indigo"
              >
                <Filter className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-semibold">
                  {filter} — {activeMatchingCount} {activeMatchingCount === 1 ? 'match' : 'matches'}
                </span>
                <Link href="#projects" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs">
                  View <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={resetFilter}
                  className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  title="Clear filter"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {SKILLS_CATEGORIES.map((category) => {
            const accent = CATEGORY_ACCENTS[category.id] || {
              border: 'rgba(255,255,255,0.1)',
              glow: 'rgba(255,255,255,0.03)',
              badge: 'badge-indigo',
            };

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  transition: { type: 'spring', stiffness: 300, damping: 25 },
                }}
                className="rounded-3xl p-6 sm:p-7 glass glow-soft flex flex-col justify-between relative overflow-hidden"
                style={{
                  borderColor: accent.border,
                  border: `1px solid ${accent.border}`,
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                  style={{ background: accent.glow }}
                />

                <div className="relative">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                    </div>
                    <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-xl ${accent.badge}`}>
                      {category.skills.length} techs
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {category.skills.map((skill: SkillItem) => {
                      const isSelected = filter.toLowerCase() === skill.name.toLowerCase();
                      const matchCount = getMatchingCount(skill.name);

                      return (
                        <motion.button
                          key={skill.name}
                          onClick={() => setFilter(skill.name)}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          variants={skillButtonVariants}
                          initial="idle"
                          whileHover="hover"
                          whileTap="tap"
                          animate={isSelected ? 'selected' : 'idle'}
                          className={`text-left p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                            isSelected
                              ? 'bg-primary/15 border-primary/40 shadow-glow-sm-indigo'
                              : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId={`skill-selected-${category.id}`}
                              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl"
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}

                          <div className="relative flex items-center justify-between w-full mb-2">
                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center p-1">
                              {skill.iconSrc ? (
                                <Image
                                  src={skill.iconSrc}
                                  alt={skill.name}
                                  width={22}
                                  height={22}
                                  unoptimized
                                  className="object-contain"
                                />
                              ) : (
                                <Code className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-lg ${
                                isSelected ? 'badge-indigo' : 'bg-white/5 text-muted-foreground'
                              }`}
                            >
                              {skill.badge}
                            </span>
                          </div>

                          <div className="relative">
                            <p className={`font-sans font-semibold text-xs truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                              {skill.name}
                            </p>
                            <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-muted-foreground">
                              <span>{skill.proficiency}</span>
                              {matchCount > 0 && (
                                <span className={`font-bold ${isSelected ? 'text-primary' : ''}`}>
                                  {matchCount}p
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer hint */}
                <div className="relative mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Tap to filter showcase</span>
                  <span className="text-primary/70 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Spring Physics
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
