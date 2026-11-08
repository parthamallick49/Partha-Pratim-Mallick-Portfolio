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
  Layers, 
  CheckCircle2, 
  X, 
  Maximize2, 
  Copy, 
  Check, 
  Terminal, 
  Filter, 
  RotateCcw,
  Code2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PROJECTS_DATA, ProjectItem } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useProjectFilter } from '@/hooks/use-project-filter';

const CATEGORIES = ['All', 'Mobile', 'Enterprise', 'Full Stack'] as const;

export function ProjectsSection() {
  const { filter, setFilter, resetFilter } = useProjectFilter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedClone, setCopiedClone] = useState(false);

  // Compute filtered projects based on category or specific tech filter
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      // If a specific tech filter is active (not All and not a category)
      if (filter !== 'All') {
        const matchesTech = project.tags.some((tag) =>
          tag.toLowerCase().includes(filter.toLowerCase()) ||
          filter.toLowerCase().includes(tag.toLowerCase())
        );
        if (!matchesTech) return false;
      }

      // If category tab is active
      if (selectedCategory !== 'All') {
        return project.category === selectedCategory;
      }

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
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DBC2] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono text-[#2F6F6D] dark:text-[#E6DBC2]">
            <FolderGit2 className="w-3.5 h-3.5 text-[#C84630]" />
            <span>03 // Production Artifacts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B18] dark:text-[#FAF6EC] tracking-tight">
            Featured Projects &amp; Systems
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#52504A] dark:text-[#B5C7C6] max-w-2xl">
            Each project represents a distinct architectural challenge across mobile UX, state management, and cloud APIs.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (filter !== 'All') resetFilter();
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                  selectedCategory === cat && filter === 'All'
                    ? 'bg-[#2F6F6D] dark:bg-[#C84630] text-[#FAF6EC] border-transparent shadow-sm font-semibold'
                    : 'bg-[#FAF6EC] dark:bg-[#204E4D] text-[#1C1B18] dark:text-[#FAF6EC] border-[#DCD0B6] dark:border-[#2E6B69] hover:bg-[#E6DBC2]'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Active Tech Tag Override */}
            {filter !== 'All' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C84630] text-[#FAF6EC] text-xs font-mono shadow-sm">
                <span>Filtering by: {filter}</span>
                <button
                  onClick={resetFilter}
                  className="hover:opacity-80"
                  title="Clear tech filter"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid: Claude Artifact Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const projectImage = PlaceHolderImages.find((p) => p.id === project.image);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card hover:shadow-claude-hover transition-all overflow-hidden"
              >
                {/* Artifact Top Bar */}
                <div className="px-4 py-2.5 bg-[#E6DBC2]/60 dark:bg-[#1A403F]/70 border-b border-[#DCD0B6] dark:border-[#2E6B69] flex items-center justify-between text-xs font-mono text-[#52504A] dark:text-[#B5C7C6]">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-[#C84630]" />
                    artifact::{project.id}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#2F6F6D] dark:text-[#FAF6EC]">
                    {project.version}
                  </span>
                </div>

                {/* Mockup Preview Area */}
                <div
                  onClick={() => setActiveProject(project)}
                  className="relative aspect-[16/10] bg-[#E6DBC2] dark:bg-[#1A403F] overflow-hidden cursor-pointer"
                >
                  {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  )}
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-[#1C1B18]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6EC] text-[#1C1B18] font-mono text-xs font-bold shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C84630]" />
                      Inspect Artifact
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#2F6F6D] dark:text-[#DCD0B6]">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3
                      onClick={() => setActiveProject(project)}
                      className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B18] dark:text-[#FAF6EC] hover:text-[#C84630] cursor-pointer transition-colors"
                    >
                      {project.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#52504A] dark:text-[#DCD0B6] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Monospace Tech Badges */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E6DBC2]/80 dark:bg-[#1A403F] text-[#1C1B18] dark:text-[#FAF6EC] border border-[#DCD0B6]/60 dark:border-[#2E6B69]/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E6DBC2]/50 text-[#52504A] dark:text-[#B5C7C6]">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-[#E6DBC2]/30 dark:bg-[#1A403F]/40 border-t border-[#DCD0B6]/60 dark:border-[#2E6B69]/60 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-mono font-semibold text-[#2F6F6D] dark:text-[#FAF6EC] hover:text-[#C84630] flex items-center gap-1"
                  >
                    Details &amp; Arch →
                  </button>

                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2.5 rounded-full text-xs font-mono hover:bg-[#E6DBC2] dark:hover:bg-[#1A403F]"
                    >
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3.5 h-3.5 mr-1 text-[#1C1B18] dark:text-[#FAF6EC]" />
                        Source
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      className="h-8 px-3 rounded-full text-xs font-mono bg-[#C84630] hover:bg-[#B83E29] text-[#FAF6EC]"
                    >
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state if filter yields zero */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="font-serif text-xl text-[#1C1B18] dark:text-[#FAF6EC]">
              No projects found matching &ldquo;{filter}&rdquo;
            </p>
            <Button
              onClick={resetFilter}
              variant="outline"
              className="rounded-full font-mono text-xs"
            >
              Reset Filters
            </Button>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CLAUDE ARTIFACT LIVE INSPECTOR DRAWER / MODAL */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-[#1C1B18]/70 backdrop-blur-sm"
            />

            {/* Artifact Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Header styled as Claude Artifact window */}
              <div className="px-6 py-4 bg-[#E6DBC2] dark:bg-[#1A403F] border-b border-[#DCD0B6] dark:border-[#2E6B69] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#C84630]" />
                  <span className="font-mono text-xs text-[#1C1B18] dark:text-[#FAF6EC] font-semibold">
                    claude-artifact://{activeProject.id}.spec
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono border-[#C84630] text-[#C84630]">
                    {activeProject.version}
                  </Badge>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#1C1B18] dark:text-[#FAF6EC] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Content (Scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Header Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#2F6F6D] dark:text-[#DCD0B6]">
                    <span>{activeProject.category} System</span>
                    <span>·</span>
                    <span>Year: {activeProject.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                    {activeProject.title}
                  </h3>
                  <p className="font-serif italic text-base text-[#C84630]">
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Device Mockup */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#DCD0B6] dark:border-[#2E6B69] bg-[#E6DBC2]">
                  {PlaceHolderImages.find((p) => p.id === activeProject.image) && (
                    <Image
                      src={PlaceHolderImages.find((p) => p.id === activeProject.image)!.imageUrl}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Architecture Summary */}
                <div className="p-5 rounded-2xl bg-[#E6DBC2]/50 dark:bg-[#1A403F]/60 border border-[#DCD0B6] dark:border-[#2E6B69] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#2F6F6D] dark:text-[#FAF6EC] font-semibold">
                    <Terminal className="w-3.5 h-3.5 text-[#C84630]" />
                    Architecture &amp; System Design Notes
                  </div>
                  <p className="text-sm font-sans text-[#1C1B18]/90 dark:text-[#FAF6EC]/90 leading-relaxed">
                    {activeProject.architectureNotes}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                    Key Production Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {activeProject.keyFeatures.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-xl bg-[#FAF6EC] dark:bg-[#1A403F] border border-[#DCD0B6]/60 dark:border-[#2E6B69]/60 text-xs font-sans text-[#52504A] dark:text-[#DCD0B6]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C84630] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="space-y-2">
                  <h4 className="font-serif text-sm font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                    Technologies &amp; Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#2F6F6D]/10 dark:bg-[#1A403F] text-[#2F6F6D] dark:text-[#FAF6EC] border border-[#2F6F6D]/20 dark:border-[#2E6B69]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Git Clone Command */}
                <div className="p-3.5 rounded-xl bg-[#1C1B18] text-[#FAF6EC] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#C84630]">$</span>
                    <span className="truncate">git clone {activeProject.github}.git</span>
                  </div>
                  <button
                    onClick={() => handleCopyClone(activeProject.github)}
                    className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2F6F6D] hover:bg-[#3D8C8A] text-[11px] transition-colors"
                  >
                    {copiedClone ? <Check className="w-3 h-3 text-[#FAF6EC]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedClone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

              </div>

              {/* Modal Footer Action Bar */}
              <div className="p-6 bg-[#E6DBC2] dark:bg-[#1A403F] border-t border-[#DCD0B6] dark:border-[#2E6B69] flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full font-mono text-xs border-[#DCD0B6] dark:border-[#2E6B69]"
                >
                  Close Inspector
                </Button>

                <div className="flex items-center gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full font-mono text-xs border-[#DCD0B6] dark:border-[#2E6B69] bg-[#FAF6EC] dark:bg-[#204E4D]"
                  >
                    <Link href={activeProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      View Repository
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="rounded-full font-mono text-xs bg-[#C84630] hover:bg-[#B83E29] text-[#FAF6EC]"
                  >
                    <Link href={activeProject.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Live Demo / Build
                    </Link>
                  </Button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
