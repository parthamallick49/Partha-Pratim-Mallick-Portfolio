import React from 'react';
import Link from 'next/link';
import { COMPANY_EXPERIENCE_DATA } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Building2, MapPin, ExternalLink, Wrench } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Career Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Experience</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Professional roles, key achievements, and technologies utilized in production.
          </p>
        </div>

        {/* Main LinkedIn-style Experience Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="border border-border/70 shadow-sm overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-10">
              {COMPANY_EXPERIENCE_DATA.map((companyGroup, cIdx) => (
                <div key={companyGroup.company} className="space-y-6">
                  {/* Company Header */}
                  <div className="flex items-start gap-4">
                    {/* Company Logo Badge */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-lg md:text-xl shrink-0 shadow-xs">
                      {companyGroup.companyLogoText || <Building2 className="w-6 h-6" />}
                    </div>

                    {/* Company Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl md:text-2xl font-bold font-headline text-foreground leading-tight">
                          {companyGroup.company}
                        </h3>
                        {companyGroup.website && (
                          <Link
                            href={companyGroup.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>

                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                        {companyGroup.totalDuration}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                        <span>{companyGroup.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Connected Roles Timeline (LinkedIn Nested Structure) */}
                  <div className="relative pl-6 md:pl-7 ml-6 md:ml-7 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                    {companyGroup.roles.map((role, rIdx) => (
                      <div key={role.title} className="relative space-y-3">
                        {/* Timeline Node Dot */}
                        <div
                          aria-hidden="true"
                          className="absolute -left-[31px] md:-left-[35px] top-1.5 w-3.5 h-3.5 rounded-full bg-background border-[2.5px] border-primary ring-4 ring-background shadow-xs"
                        />

                        {/* Role Details */}
                        <div>
                          <h4 className="text-base md:text-lg font-bold font-headline text-foreground leading-snug">
                            {role.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                            <span className="font-medium text-primary">{role.employmentType}</span>
                            <span>·</span>
                            <span>{role.date}</span>
                            {role.duration && role.duration !== 'Present' && (
                              <>
                                <span>·</span>
                                <span>{role.duration}</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {role.location} {role.locationType && `· ${role.locationType}`}
                          </p>
                        </div>

                        {/* Bullet Responsibilities */}
                        <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5 pt-1">
                          {role.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary/70 mt-2 shrink-0" />
                              <span className="leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>

                        {/* LinkedIn Skills Highlight */}
                        {role.skills && role.skills.length > 0 && (
                          <div className="pt-2">
                            <div className="p-2.5 rounded-md bg-muted/50 dark:bg-muted/20 border border-border/50 flex items-start gap-2 text-xs">
                              <Wrench className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <div className="text-muted-foreground">
                                <span className="font-semibold text-foreground">Skills: </span>
                                {role.skills.join(' · ')}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {cIdx < COMPANY_EXPERIENCE_DATA.length - 1 && (
                    <hr className="border-border/60" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
