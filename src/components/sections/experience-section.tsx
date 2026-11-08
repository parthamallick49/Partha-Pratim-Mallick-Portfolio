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
  Sparkles,
  Award
} from 'lucide-react';
import { EXPERIENCE_DATA, EDUCATION_DATA } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section-padding bg-[#E6DBC2]/25 dark:bg-[#1A403F]/25 relative">
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DBC2] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono text-[#2F6F6D] dark:text-[#E6DBC2]">
            <Clock className="w-3.5 h-3.5 text-[#C84630]" />
            <span>04 // Chronology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B18] dark:text-[#FAF6EC] tracking-tight">
            Experience &amp; Education Timeline
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#52504A] dark:text-[#B5C7C6] max-w-2xl">
            A chronological progression of engineering roles, software achievements, and academic rigor.
          </p>
        </div>

        {/* Timeline Container with Animated Progress Beam */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto pt-6">
          
          {/* Static Track (Rusted Teal) */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#2F6F6D]/20 dark:bg-[#2E6B69]/40 rounded-full" />

          {/* Animated Scroll Progress Beam (Bloody Orange) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 w-1 bg-[#C84630] rounded-full shadow-claude-glow origin-top"
          />

          {/* Part 1: Professional Work Experience */}
          <div className="mb-14">
            <div className="flex items-center justify-center mb-10">
              <span className="px-4 py-1.5 rounded-full bg-[#2F6F6D] text-[#FAF6EC] font-serif text-sm font-bold shadow-sm flex items-center gap-2 z-10">
                <Briefcase className="w-4 h-4 text-[#FAF6EC]" />
                Professional Industry Experience
              </span>
            </div>

            <div className="space-y-12">
              {EXPERIENCE_DATA.map((exp, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={exp.title + exp.date}
                    className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-center"
                  >
                    {/* Pulsing Central Node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF6EC] dark:bg-[#1A403F] border-2 border-[#C84630] flex items-center justify-center z-10 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C84630]" />
                    </div>

                    {/* Timeline Content Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5 }}
                      className={`pl-12 sm:pl-0 ${
                        isEven ? 'sm:text-right sm:pr-8' : 'sm:col-start-2 sm:pl-8'
                      }`}
                    >
                      <div className="p-6 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card hover:shadow-claude-hover transition-all text-left">
                        {/* Meta header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
                          <span className="text-xs font-mono font-semibold text-[#C84630] flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.date}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E6DBC2] dark:bg-[#1A403F] text-[#2F6F6D] dark:text-[#FAF6EC] font-semibold">
                            {exp.badge}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                          {exp.title}
                        </h3>
                        <p className="font-sans font-medium text-xs sm:text-sm text-[#2F6F6D] dark:text-[#E6DBC2] mt-0.5 flex items-center gap-1.5">
                          <span>{exp.company}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-[#52504A] dark:text-[#B5C7C6]">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </p>

                        {/* Key Responsibilities */}
                        <ul className="mt-4 space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs sm:text-sm font-sans text-[#52504A] dark:text-[#DCD0B6] leading-relaxed"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C84630] shrink-0 mt-1" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Tags */}
                        <div className="mt-5 pt-3 border-t border-[#DCD0B6]/50 dark:border-[#2E6B69]/50 flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E6DBC2]/60 dark:bg-[#1A403F] text-[#1C1B18] dark:text-[#FAF6EC]"
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

          {/* Part 2: Formal Education Timeline */}
          <div className="pt-8">
            <div className="flex items-center justify-center mb-10">
              <span className="px-4 py-1.5 rounded-full bg-[#C84630] text-[#FAF6EC] font-serif text-sm font-bold shadow-sm flex items-center gap-2 z-10">
                <GraduationCap className="w-4 h-4 text-[#FAF6EC]" />
                Formal Education &amp; Degrees
              </span>
            </div>

            <div className="space-y-12">
              {EDUCATION_DATA.map((edu, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={edu.degree}
                    className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-center"
                  >
                    {/* Node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF6EC] dark:bg-[#1A403F] border-2 border-[#2F6F6D] dark:border-[#E6DBC2] flex items-center justify-center z-10 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2F6F6D] dark:bg-[#FAF6EC]" />
                    </div>

                    {/* Timeline Content Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 25 : -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5 }}
                      className={`pl-12 sm:pl-0 ${
                        !isEven ? 'sm:text-right sm:pr-8' : 'sm:col-start-2 sm:pl-8'
                      }`}
                    >
                      <div className="p-6 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card hover:shadow-claude-hover transition-all text-left">
                        {/* Meta Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
                          <span className="text-xs font-mono font-semibold text-[#2F6F6D] dark:text-[#E6DBC2] flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {edu.date}
                          </span>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#C84630] text-[#FAF6EC] font-bold">
                            {edu.scoreLabel}: {edu.score}
                          </span>
                        </div>

                        {/* Degree & School */}
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                          {edu.degree}
                        </h3>
                        <p className="font-sans font-medium text-xs sm:text-sm text-[#C84630] mt-0.5">
                          {edu.institution}
                        </p>
                        <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6] mt-0.5">
                          {edu.location} · {edu.field}
                        </p>

                        {/* Highlights */}
                        <ul className="mt-3 space-y-1.5">
                          {edu.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-xs font-sans text-[#52504A] dark:text-[#DCD0B6] flex items-start gap-1.5"
                            >
                              <span className="text-[#C84630] font-bold">✦</span>
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
