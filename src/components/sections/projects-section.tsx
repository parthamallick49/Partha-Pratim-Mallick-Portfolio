"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  X,
  Maximize2,
  Copy,
  Check,
  Terminal,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useProjectFilter } from '@/hooks/use-project-filter';

const CATEGORIES = ['All', 'Mobile', 'Enterprise', 'Full Stack'] as const;

// Category badge config
const CATEGORY_STYLES: Record<string, string> = {
  Mobile: 'badge-cyan',
  Enterprise: 'badge-indigo',
  'Full Stack': 'badge-emerald',
};

// Variants outside component (rerender-variants-object rule)
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 24,
    transition: { duration: 0.2 },
  },
};

export function ProjectsSection() {
  const { filter, setFilter, resetFilter } = useProjectFilter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedClone, setCopiedClone] = useState(false);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      if (filter !== 'All') {
        const matchesTech = project.tags.some(
          (tag) =>
            tag.toLowerCase().includes(filter.toLowerCase()) ||
            filter.toLowerCase().includes(tag.toLowerCase())
        );
        if (!matchesTech) return false;
      }
      if (selectedCategory !== 'All') return project.category === selectedCategory;
      return true;
    });
  }, [filter, selectedCategory]);

  const handleCopyClone = (githubUrl: string) => {
    navigator.clipboard.writeText(`git clone ${githubUrl}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute top-0 inset-x-0 h-px section-divider" />

      <div className="container-editorial">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="flex flex-col items-center text-center space-y-4 mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/25 text-xs font-mono text-primary">
            <FolderGit2 className="w-3.5 h-3.5" />
            03 // Production Artifacts
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Featured Projects &amp;{' '}
            <span className="text-gradient-indigo">Systems</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl">
            Each project represents a distinct architectural challenge across mobile UX, state management, and cloud APIs.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (filter !== 'All') resetFilter();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  selectedCategory === cat && filter === 'All'
                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-glow-sm-indigo'
                    : 'glass border border-white/8 text-muted-foreground hover:text-foreground hover:border-white/15'
                }`}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {cat}
              </motion.button>
            ))}

            {filter !== 'All' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/30 text-xs font-mono text-primary"
              >
                <span>Filtering: {filter}</span>
                <button onClick={resetFilter} className="hover:text-white transition-colors">
                  <RotateCcw className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${selectedCategory}-${filter}`}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => {
              const projectImage = PlaceHolderImages.find((p) => p.id === project.image);
              const catStyle = CATEGORY_STYLES[project.category] || 'badge-indigo';

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  exit="exit"
                  whileHover={{
                    y: -6,
                    transition: { type: 'spring', stiffness: 300, damping: 25 },
                  }}
                  className="group flex flex-col rounded-3xl glass border border-white/8 glow-soft overflow-hidden cursor-pointer"
                  onClick={() => setActiveProject(project)}
                >
                  {/* Top artifact bar */}
                  <div className="px-4 py-2.5 bg-white/3 border-b border-white/6 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-primary/70" />
                      artifact::{project.id}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${catStyle}`}>
                      {project.version}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-white/3 overflow-hidden">
                    {projectImage && (
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-foreground font-mono text-xs font-bold border border-white/20">
                        <Maximize2 className="w-3.5 h-3.5 text-primary" />
                        Inspect Artifact
                      </span>
                    </div>
                    {/* Category badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm ${catStyle}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                        <span>{project.year}</span>
                        <span className="text-primary/70">{project.version}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-1 rounded-lg text-muted-foreground">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-5 py-4 bg-white/2 border-t border-white/6 flex items-center justify-between">
                    <span className="text-xs font-mono text-primary font-semibold group-hover:text-primary/70 transition-colors">
                      Details & Arch →
                    </span>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl glass border border-white/8 text-muted-foreground hover:text-foreground hover:border-white/15 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </motion.a>
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center space-y-4"
          >
            <p className="font-display text-xl text-muted-foreground">
              No projects match &ldquo;{filter}&rdquo;
            </p>
            <button
              onClick={resetFilter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-sm font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Project Inspector Modal ── */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-3xl rounded-3xl glass border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 bg-white/3 border-b border-white/8 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <div className="w-3 h-3 rounded-full bg-secondary/70" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    artifact://{activeProject.id}.spec
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${CATEGORY_STYLES[activeProject.category] || 'badge-indigo'}`}>
                    {activeProject.version}
                  </span>
                </div>
                <motion.button
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 rounded-xl hover:bg-white/8 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <X className="w-4.5 h-4.5" />
                </motion.button>
              </div>

              {/* Scrollable body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span>{activeProject.category} System</span>
                    <span>·</span>
                    <span>{activeProject.year}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {activeProject.title}
                  </h3>
                  <p className="font-sans italic text-sm text-primary/80">
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/8 bg-white/3">
                  {PlaceHolderImages.find((p) => p.id === activeProject.image) && (
                    <Image
                      src={PlaceHolderImages.find((p) => p.id === activeProject.image)!.imageUrl}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Architecture notes */}
                <div className="p-5 rounded-2xl bg-white/3 border border-white/8 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                    <Terminal className="w-3.5 h-3.5" />
                    Architecture & System Design
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeProject.architectureNotes}
                  </p>
                </div>

                {/* Key features */}
                <div className="space-y-3">
                  <h4 className="font-display text-lg font-bold text-foreground">Key Production Features</h4>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {activeProject.keyFeatures.map((feat, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className="flex items-start gap-2 p-3 rounded-xl bg-white/3 border border-white/8 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech badges */}
                <div className="space-y-2">
                  <h4 className="font-mono text-sm font-semibold text-foreground">Technologies & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-xl badge-indigo">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Git clone command */}
                <div className="p-4 rounded-2xl bg-obsidian-800 border border-white/5 text-foreground font-mono text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 truncate min-w-0">
                    <span className="text-primary shrink-0">$</span>
                    <span className="truncate">git clone {activeProject.github}.git</span>
                  </div>
                  <motion.button
                    onClick={() => handleCopyClone(activeProject.github)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/15 border border-primary/30 text-primary text-[11px] font-semibold shrink-0 hover:bg-primary/25 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {copiedClone ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedClone ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-5 bg-white/2 border-t border-white/8 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-xl glass border border-white/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-white/15 transition-all"
                >
                  Close Inspector
                </button>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass border border-white/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/25 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Github className="w-3.5 h-3.5" /> Repository
                  </motion.a>
                  <motion.a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-indigo text-white text-xs font-mono font-semibold shadow-glow-sm-indigo"
                    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
