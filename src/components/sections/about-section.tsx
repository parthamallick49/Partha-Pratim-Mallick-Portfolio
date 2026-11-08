"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Cpu, 
  Layers, 
  Workflow, 
  CheckCircle2, 
  ArrowUpRight, 
  Award, 
  Code2, 
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PERSONAL_DATA } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find((p) => p.id === 'about');

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      {/* Background divider line */}
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DBC2] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono text-[#2F6F6D] dark:text-[#E6DBC2]">
            <Compass className="w-3.5 h-3.5 text-[#C84630]" />
            <span>01 // Editorial Profile</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B18] dark:text-[#FAF6EC] tracking-tight">
            About &amp; Engineering Philosophy
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#52504A] dark:text-[#B5C7C6] max-w-2xl">
            Bridging pixel-level UI precision with robust enterprise data pipelines.
          </p>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Core Mission & Editorial Essay (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card hover:shadow-claude-hover transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
                <span className="text-xs font-mono tracking-wider uppercase text-[#C84630] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  What I Bring to the Table
                </span>
                <span className="text-xs font-mono text-[#52504A] dark:text-[#B5C7C6]">
                  Production Mindset
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B18] dark:text-[#FAF6EC] leading-snug">
                  Translating UX visions into performant, reliable applications.
                </h3>
                <p className="text-sm sm:text-base text-[#52504A] dark:text-[#DCD0B6] leading-relaxed font-sans text-justify">
                  {PERSONAL_DATA.summary}
                </p>
                <p className="text-sm sm:text-base text-[#52504A] dark:text-[#DCD0B6] leading-relaxed font-sans text-justify">
                  {PERSONAL_DATA.mission}
                </p>
              </div>

              {/* Core Principles Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  'Clean Architecture',
                  'BLoC & Provider',
                  'RESTful API Contracts',
                  'Relational Persistence',
                  'Testable Modules',
                  'Low-Latency Sync',
                ].map((principle) => (
                  <span
                    key={principle}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#E6DBC2]/60 dark:bg-[#1A403F] text-[#1C1B18] dark:text-[#FAF6EC] border border-[#DCD0B6] dark:border-[#2E6B69]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#2F6F6D] dark:text-[#C84630]" />
                    {principle}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#DCD0B6]/60 dark:border-[#2E6B69]/60 flex items-center justify-between text-xs font-mono text-[#52504A] dark:text-[#B5C7C6]">
              <span>Grameen Communications · Junior Software Engineer</span>
              <span className="text-[#C84630]">Available For Hire</span>
            </div>
          </motion.div>

          {/* Bento Card 2: Visual Developer Photo Card (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 bg-[#2F6F6D] text-[#FAF6EC] shadow-claude-card group"
          >
            {/* Background texture or image */}
            <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A403F] border border-[#FAF6EC]/20 text-xs font-mono text-[#FAF6EC]">
                <Cpu className="w-3.5 h-3.5 text-[#C84630]" />
                <span>Architecture Discipline</span>
              </div>

              <h4 className="font-serif text-2xl font-bold leading-tight">
                Software engineered for reliability and long-term maintainability.
              </h4>

              <p className="text-xs sm:text-sm text-[#FAF6EC]/85 leading-relaxed">
                Specialized in multi-tier applications where user interfaces remain buttery smooth while syncing transactional databases under unreliable network conditions.
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-[#FAF6EC]/20 grid grid-cols-2 gap-4">
              <div>
                <p className="font-serif text-3xl font-bold text-[#F3E9D2]">3.53</p>
                <p className="text-[11px] font-mono text-[#FAF6EC]/70">DIU CSE CGPA</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-[#FAF6EC]">100%</p>
                <p className="text-[11px] font-mono text-[#FAF6EC]/70">Commitment to Quality</p>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Key Stats Grid (Col 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card"
          >
            {PERSONAL_DATA.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-4 rounded-2xl ${
                  idx === 0
                    ? 'bg-[#E6DBC2]/60 dark:bg-[#1A403F]/60'
                    : 'bg-transparent'
                } flex flex-col justify-between`}
              >
                <div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C84630] tracking-tight">
                    {stat.value}
                  </span>
                  <p className="font-sans font-semibold text-xs sm:text-sm text-[#1C1B18] dark:text-[#FAF6EC] mt-1">
                    {stat.label}
                  </p>
                </div>
                <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6] mt-2">
                  {stat.detail}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
