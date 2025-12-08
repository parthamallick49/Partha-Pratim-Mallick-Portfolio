"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

export function HeroSection() {
  return (
    <section id="home" className="section-padding bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-up">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter">
              Partha Pratim Mallick
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium">
              Software Engineer | Mobile App Developer
            </p>
            <p className="text-muted-foreground max-w-lg">
              I'm a results-oriented Software Engineer building scalable, user-friendly mobile experiences and backend services. Fluent in Flutter, Java, and .NET Core.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="/Partha-Pratim-Mallick-CV.pdf" download>
                Download CV <Download className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {profileImage && (
             <div className="relative w-72 h-72 md:w-96 md:h-96">
                <Image
                    src={profileImage.imageUrl}
                    alt={profileImage.description}
                    width={400}
                    height={400}
                    priority
                    className="rounded-full object-cover shadow-lg border-4 border-card"
                    data-ai-hint={profileImage.imageHint}
                />
                <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
