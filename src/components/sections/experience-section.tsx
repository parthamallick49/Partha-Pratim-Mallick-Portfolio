import { EXPERIENCE_DATA } from '@/lib/data.tsx';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-16">Work Experience</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
          {EXPERIENCE_DATA.map((item, index) => (
            <div key={index} className="relative mb-12">
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1.5 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <div
                className={`w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'float-left text-right' : 'float-right text-left'
                }`}
              >
                <div className="p-6 bg-card border rounded-lg shadow-sm">
                  <p className="text-sm font-semibold text-primary">{item.date}</p>
                  <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-3">{item.company}</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 text-left">
                    {item.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className="clear-both"></div>
        </div>
      </div>
    </section>
  );
}
