"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileImage = PlaceHolderImages.find((p) => p.id === 'profile');

export function HeroSection() {
  return (
    <section id="home" className="section-padding bg-background relative overflow-hidden">
      {/* Background glow accent */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Open to New Opportunities
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black tracking-tight text-foreground">
              Partha Pratim Mallick
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-semibold">
              Software Engineer | Mobile & Backend Developer
            </p>
            <p className="text-muted-foreground max-w-xl text-base sm:text-lg leading-relaxed">
              Crafting high-performance mobile experiences and robust backend systems with Flutter, Java, and .NET Core. Passionate about clean code, scalability, and intuitive UX.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button asChild size="lg" className="shadow-sm">
              <Link href="#projects">
                View Featured Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/Partha-Pratim-Mallick-CV.pdf" download="Partha-Pratim-Mallick-CV.pdf">
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Quick Social Links */}
          <div className="flex items-center gap-3 pt-3">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Connect:
            </span>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Link
                href="https://github.com/parthamallick49"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Link
                href="https://www.linkedin.com/in/parthamalllick/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <a href="mailto:parthamallick.cs@gmail.com" aria-label="Send Email">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right Column: Profile Avatar */}
        <div className="flex justify-center">
          {profileImage && (
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer decorative ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-dashed border-primary/20"
              />

              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                width={400}
                height={400}
                priority
                className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-card"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
