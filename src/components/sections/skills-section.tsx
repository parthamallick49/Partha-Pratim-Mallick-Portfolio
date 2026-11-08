"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Sparkles, 
  Layers, 
  Filter, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Code
} from 'lucide-react';
import { SKILLS_CATEGORIES, SkillItem, PROJECTS_DATA } from '@/lib/data';
import { useProjectFilter } from '@/hooks/use-project-filter';

export function SkillsSection() {
  const { filter, setFilter, resetFilter } = useProjectFilter();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const handleSkillClick = (skillName: string) => {
    setFilter(skillName);
  };

  // Count how many projects match the active or hovered skill
  const getMatchingCount = (tech: string) => {
    return PROJECTS_DATA.filter((p) =>
      p.tags.some((tag) => tag.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(tag.toLowerCase()))
    ).length;
  };

  const activeMatchingCount = filter !== 'All' ? getMatchingCount(filter) : PROJECTS_DATA.length;

  return (
    <section id="skills" className="section-padding bg-[#E6DBC2]/30 dark:bg-[#1A403F]/30 relative">
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DBC2] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono text-[#2F6F6D] dark:text-[#E6DBC2]">
            <Terminal className="w-3.5 h-3.5 text-[#C84630]" />
            <span>02 // Interactive Tech Matrix</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B18] dark:text-[#FAF6EC] tracking-tight">
            Live Skills &amp; Technology Stack
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#52504A] dark:text-[#B5C7C6] max-w-2xl">
            Click any technology below to dynamically filter and inspect corresponding projects in the showcase.
          </p>

          {/* Active Filter Notification Pill */}
          <AnimatePresence>
            {filter !== 'All' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="mt-3 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#C84630] text-[#FAF6EC] text-xs font-mono shadow-claude-glow"
              >
                <span className="flex items-center gap-1.5 font-semibold">
                  <Filter className="w-3.5 h-3.5" />
                  Filtering Projects by: {filter} ({activeMatchingCount} {activeMatchingCount === 1 ? 'match' : 'matches'})
                </span>
                <Link
                  href="#projects"
                  className="underline underline-offset-2 hover:opacity-80 flex items-center gap-1"
                >
                  View in Showcase <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={resetFilter}
                  className="p-1 rounded-full hover:bg-black/20 text-[#FAF6EC]"
                  title="Clear filter"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bento Grid: 4 Pillars of Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 sm:p-7 bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card hover:shadow-claude-hover transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                      {category.title}
                    </h3>
                    <p className="text-xs font-sans text-[#52504A] dark:text-[#B5C7C6] mt-0.5">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#E6DBC2] dark:bg-[#1A403F] text-[#2F6F6D] dark:text-[#FAF6EC]">
                    {category.skills.length} techs
                  </span>
                </div>

                {/* Skills Interactive Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills.map((skill: SkillItem) => {
                    const isSelected = filter.toLowerCase() === skill.name.toLowerCase();
                    const matchCount = getMatchingCount(skill.name);

                    return (
                      <motion.button
                        key={skill.name}
                        onClick={() => handleSkillClick(skill.name)}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`text-left p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#C84630] text-[#FAF6EC] border-[#C84630] shadow-md'
                            : 'bg-[#E6DBC2]/50 dark:bg-[#1A403F]/60 hover:bg-[#FAF6EC] dark:hover:bg-[#2F6F6D] text-[#1C1B18] dark:text-[#FAF6EC] border-[#DCD0B6] dark:border-[#2E6B69]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[#FAF6EC] dark:bg-[#1A403F] flex items-center justify-center p-1 shadow-sm">
                            {skill.iconSrc ? (
                              <Image
                                src={skill.iconSrc}
                                alt={skill.name}
                                width={24}
                                height={24}
                                unoptimized
                                className="object-contain"
                              />
                            ) : (
                              <Code className="w-4 h-4 text-[#C84630]" />
                            )}
                          </div>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-[#FAF6EC] text-[#C84630] font-semibold'
                                : 'bg-[#DCD0B6]/60 dark:bg-[#204E4D] text-[#52504A] dark:text-[#B5C7C6]'
                            }`}
                          >
                            {skill.badge}
                          </span>
                        </div>

                        <div>
                          <p className="font-sans font-semibold text-xs truncate">
                            {skill.name}
                          </p>
                          <div className="flex items-center justify-between mt-1 text-[10px] font-mono opacity-80">
                            <span>{skill.proficiency}</span>
                            {matchCount > 0 && (
                              <span className="font-bold underline decoration-dotted">
                                {matchCount} {matchCount === 1 ? 'proj' : 'projs'}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Hint */}
              <div className="mt-5 pt-3 border-t border-[#DCD0B6]/40 dark:border-[#2E6B69]/40 flex items-center justify-between text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">
                <span>Tap to filter showcase</span>
                <span className="text-[#C84630]">Spring Physics Active</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
