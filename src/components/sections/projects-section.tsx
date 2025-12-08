import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-muted/50 dark:bg-muted/20">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.image);
            return (
              <Card key={project.title} className="flex flex-col group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="overflow-hidden">
                    {projectImage && (
                      <Image
                        src={projectImage.imageUrl}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={projectImage.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="mb-1 text-lg">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-xs mb-3 h-10">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0.5">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live Demo
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
