"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { PERSONAL_DATA } from '@/lib/data';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
];

// Variants defined OUTSIDE component (rerender-variants-object rule)
const mobileMenuVariants = {
  closed: { opacity: 0, x: '100%', transition: { type: 'spring' as const, stiffness: 300, damping: 35 } },
  open: { opacity: 1, x: '0%', transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
};

const navItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, type: 'spring' as const, stiffness: 400, damping: 28 },
  }),
};

export function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 60], ['rgba(10,10,15,0)', 'rgba(10,10,15,0.9)']);
  const headerBorderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'experience', 'projects', 'skills', 'about', 'home'];
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md"
      >
        {/* Border that fades in on scroll */}
        <motion.div
          style={{ opacity: headerBorderOpacity }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
        />

        <div className="container-editorial flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link href="#home" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-indigo flex items-center justify-center font-display font-bold text-sm text-white shadow-glow-sm-indigo transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                P
              </div>
              {/* Live indicator */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
            </div>
            <div>
              <p className="font-display font-bold text-sm text-foreground leading-tight">Partha Mallick</p>
              <p className="font-mono text-[10px] text-muted-foreground leading-tight">Software Engineer</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-primary/15 border border-primary/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-primary font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.a
              href={PERSONAL_DATA.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </motion.a>

            <ThemeToggle />

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/8 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-4.5 h-4.5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-4.5 h-4.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="drawer"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden glass border-l border-white/8 flex flex-col pt-20 pb-8 px-6"
            >
              <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div key={item.href} custom={i} variants={navItemVariants} initial="closed" animate="open">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                        activeSection === item.href.replace('#', '')
                          ? 'bg-primary/15 text-primary border border-primary/25 font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-white/8 pt-6 space-y-3">
                <a
                  href={PERSONAL_DATA.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-indigo text-white text-sm font-semibold shadow-glow-sm-indigo"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <p className="text-center text-xs font-mono text-muted-foreground">
                  Dhaka, Bangladesh · GMT+6
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
