"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PERSONAL_DATA } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 bg-background relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/4 blur-3xl rounded-full pointer-events-none" />

      <div className="container-editorial py-14 relative">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-indigo flex items-center justify-center font-display font-bold text-sm text-white shadow-glow-sm-indigo">
                P
              </div>
              <div>
                <p className="font-display font-bold text-base text-foreground leading-tight">
                  Partha Pratim Mallick
                </p>
                <p className="text-xs font-mono text-muted-foreground">Software Engineer & Mobile Developer</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs text-center md:text-left">
              {PERSONAL_DATA.tagline}
            </p>

            {/* Design token swatches */}
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-primary border border-primary/50" title="Electric Indigo" />
              <span className="w-3.5 h-3.5 rounded-full bg-secondary border border-secondary/50" title="Emerald Glow" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-400/50" title="Warm Amber" />
              <span className="w-3.5 h-3.5 rounded-full bg-obsidian-700 border border-white/10" title="Deep Obsidian" />
              <span className="text-[10px] font-mono text-muted-foreground ml-1">Design System v2</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {[
              { href: PERSONAL_DATA.github, icon: <Github className="w-4 h-4" />, label: 'GitHub' },
              { href: PERSONAL_DATA.linkedin, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
              { href: `mailto:${PERSONAL_DATA.email}`, icon: <Mail className="w-4 h-4" />, label: 'Email' },
              { href: PERSONAL_DATA.cvUrl, icon: <FileText className="w-4 h-4" />, label: 'Resume' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/8 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/25 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {icon} {label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © {currentYear} Partha Pratim Mallick · Dhaka, Bangladesh
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs font-mono text-muted-foreground">
              Built with <span className="text-gradient-indigo font-semibold">Next.js 15</span> · <span className="text-gradient-emerald font-semibold">Framer Motion</span>
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
