import { EXPERIENCE_DATA } from '@/lib/data';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Work Experience</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            My professional journey and contributions as a software engineer.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline spine */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-border"
          />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start">
                  {/* Timeline Node Badge */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-9 h-9 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-sm z-10"
                  >
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>

                  {/* Card wrapper */}
                  <div
                    className={`w-full pl-12 md:pl-0 ${
                      isEven
                        ? 'md:w-[calc(50%-2rem)] md:mr-auto md:pr-4'
                        : 'md:w-[calc(50%-2rem)] md:ml-auto md:pl-4'
                    }`}
                  >
                    <Card className="transition-all duration-200 hover:shadow-md border-border/70 hover:border-primary/40">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                          {item.location && (
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold font-headline text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mb-4">
                          {item.company}
                        </p>

                        <ul className="text-sm text-muted-foreground space-y-2 text-left">
                          {item.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
