import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 text-muted-foreground">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span>&copy; {currentYear} Partha Pratim Mallick. Built with</span>
          <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          <span>using Next.js & Tailwind CSS.</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/parthamallick49"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/parthamalllick/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <a
            href="mailto:parthamallick.cs@gmail.com"
            className="hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
