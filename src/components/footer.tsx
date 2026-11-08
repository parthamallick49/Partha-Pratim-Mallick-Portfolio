"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { PERSONAL_DATA } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#DCD0B6] dark:border-[#2E6B69] bg-[#E6DBC2]/40 dark:bg-[#1A403F]/50 py-12 transition-colors">
      <div className="container-editorial flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#C84630] text-[#FAF6EC] flex items-center justify-center font-serif text-xs font-bold">
              P
            </span>
            <span className="font-serif font-bold text-base text-[#1C1B18] dark:text-[#FAF6EC]">
              Partha Pratim Mallick
            </span>
          </div>
          <p className="text-xs font-sans text-[#52504A] dark:text-[#B5C7C6]">
            Software Engineer &amp; Mobile Developer · Dhaka, Bangladesh
          </p>
        </div>

        {/* Center: Triple Palette Swatches & Note */}
        <div className="flex flex-col items-center space-y-1.5 text-center">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#F3E9D2] border border-[#DCD0B6]" title="Smoked Vanilla (#F3E9D2)" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#2F6F6D]" title="Rusted Teal (#2F6F6D)" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#C84630]" title="Bloody Orange (#C84630)" />
          </div>
          <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">
            Claude AI Editorial Aesthetic · Crafted with React
          </p>
        </div>

        {/* Right: Copyright & Scroll to Top */}
        <div className="flex items-center gap-4">
          <p className="text-xs font-mono text-[#52504A] dark:text-[#B5C7C6]">
            &copy; {currentYear} Partha Mallick
          </p>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-[#FAF6EC] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] hover:bg-[#C84630] hover:text-[#FAF6EC] hover:border-[#C84630] text-[#1C1B18] dark:text-[#FAF6EC] flex items-center justify-center transition-all shadow-sm"
            title="Return to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
