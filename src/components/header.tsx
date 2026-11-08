"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Sparkles, FileText } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { PERSONAL_DATA } from '@/lib/data';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills Bento' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Timeline' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6">
      <div
        className={`mx-auto max-w-5xl rounded-full transition-all duration-300 px-4 sm:px-6 h-14 flex items-center justify-between border ${
          isScrolled
            ? 'bg-[#F3E9D2]/90 dark:bg-[#1A403F]/90 backdrop-blur-md shadow-claude-card border-[#DCD0B6] dark:border-[#2E6B69]'
            : 'bg-[#F3E9D2]/75 dark:bg-[#1A403F]/75 backdrop-blur-sm border-[#DCD0B6]/60 dark:border-[#2E6B69]/60'
        }`}
      >
        {/* Brand / Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
        >
          <div className="w-8 h-8 rounded-full bg-[#C84630] text-[#FAF6EC] flex items-center justify-center font-serif font-bold text-sm shadow-sm transition-transform group-hover:rotate-6">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base tracking-tight text-[#1C1B18] dark:text-[#F3E9D2] leading-tight">
              Partha Mallick
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#52504A] dark:text-[#B5C7C6]">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-full bg-[#E6DBC2]/60 dark:bg-[#204E4D]/60 border border-[#DCD0B6]/70 dark:border-[#2E6B69]/70 text-xs font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[#FAF6EC] font-semibold bg-[#2F6F6D] dark:bg-[#C84630] shadow-sm'
                    : 'text-[#1C1B18]/80 dark:text-[#F3E9D2]/80 hover:text-[#C84630] dark:hover:text-[#FAF6EC] hover:bg-[#FAF6EC]/50 dark:hover:bg-[#1A403F]/50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Resume link */}
          <a
            href={PERSONAL_DATA.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-[#C84630] text-[#FAF6EC] hover:bg-[#B83E29] transition-all shadow-sm hover:shadow"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
            <ArrowUpRight className="w-3 h-3 opacity-80" />
          </a>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 rounded-full text-[#1C1B18] dark:text-[#F3E9D2] hover:bg-[#E6DBC2] dark:hover:bg-[#204E4D]"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-[#F3E9D2] dark:bg-[#1A403F] border-l border-[#DCD0B6] dark:border-[#2E6B69] p-6 text-[#1C1B18] dark:text-[#F3E9D2]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 pb-6 border-b border-[#DCD0B6] dark:border-[#2E6B69]">
                      <div className="w-9 h-9 rounded-full bg-[#C84630] text-[#FAF6EC] flex items-center justify-center font-serif font-bold text-base">
                        P
                      </div>
                      <div>
                        <p className="font-serif font-bold text-lg leading-tight">Partha Mallick</p>
                        <p className="text-xs font-mono text-[#52504A] dark:text-[#B5C7C6]">Software Engineer</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      {NAV_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="px-4 py-2.5 rounded-xl font-medium text-sm transition-colors hover:bg-[#E6DBC2] dark:hover:bg-[#204E4D] hover:text-[#C84630]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#DCD0B6] dark:border-[#2E6B69] space-y-3">
                    <a
                      href={PERSONAL_DATA.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#C84630] text-[#FAF6EC] text-xs font-mono font-medium hover:bg-[#B83E29] transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Download Resume (PDF)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <p className="text-[11px] text-center text-[#52504A] dark:text-[#B5C7C6] font-mono">
                      Dhaka, Bangladesh · GMT+6
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
