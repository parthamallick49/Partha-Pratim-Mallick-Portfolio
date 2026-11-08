import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Lock } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-muted/40 dark:bg-muted/15">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Featured Projects</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            A selection of mobile and backend applications built with Flutter, Android, and .NET Core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => {
            const projectImage = PlaceHolderImages.find((p) => p.id === project.image);
            const hasLiveDemo = project.link && project.link !== '#';

            return (
              <Card
                key={project.title}
                className="flex flex-col group overflow-hidden border-border/70 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
              >
                {/* Visual Preview Header */}
                <CardHeader className="p-0 relative overflow-hidden bg-muted/70 dark:bg-muted/30">
                  <div className="relative h-60 w-full overflow-hidden flex items-center justify-center p-4">
                    {projectImage && (
                      <div className="relative h-full w-auto max-w-[170px] shadow-md rounded-xl overflow-hidden border-2 border-background/80 transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={projectImage.imageUrl}
                          alt={project.title}
                          width={400}
                          height={750}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    {project.statusBadge && (
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="text-[11px] font-medium bg-background/90 backdrop-blur-sm shadow-sm"
                        >
                          {project.statusBadge}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                {/* Content */}
                <CardContent className="p-5 flex-grow space-y-3">
                  <CardTitle className="text-xl font-bold font-headline group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed min-h-[4rem]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[11px] px-2 py-0.5 font-normal bg-accent/10 border-accent/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Footer Actions */}
                <CardFooter className="p-5 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                  {project.statusBadge === 'Enterprise / Private' ? (
                    <div className="flex items-center text-xs text-muted-foreground gap-1.5 py-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Enterprise (Code Restricted)</span>
                    </div>
                  ) : (
                    <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source on GitHub`}
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code Repository
                      </Link>
                    </Button>
                  )}

                  {hasLiveDemo ? (
                    <Button asChild size="sm" className="gap-1.5 text-xs ml-auto">
                      <Link
                        href={project.link!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live Demo
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="ghost" size="sm" className="text-xs ml-auto">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Details <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
