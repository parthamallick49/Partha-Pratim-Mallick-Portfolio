import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Server, Database, Sparkles, CheckCircle2 } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: 'Mobile Engineering',
    description: 'Specializing in Flutter and Native Android with reactive state management and pixel-perfect UIs.',
  },
  {
    icon: <Server className="w-6 h-6 text-primary" />,
    title: 'Backend & APIs',
    description: 'Designing scalable RESTful APIs, microservices, and business logic using .NET Core and Java.',
  },
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: 'Data & Persistence',
    description: 'Hands-on schema modeling and performance optimization across SQL Server, MySQL, and MongoDB.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: 'Product Delivery',
    description: 'Passionate about translating product roadmaps into stable, maintainable production software.',
  },
];

const KEY_STRENGTHS = [
  'End-to-end mobile development (architecture to deployment)',
  'RESTful API design and database query optimization',
  'Cross-functional collaboration with QA, design, and product leads',
  'Clean code principles, error handling, and performance profiling',
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-muted/40 dark:bg-muted/15">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">About Me</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Get to know my background, core focus areas, and engineering philosophy.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Narrative Card */}
          <Card className="lg:col-span-7 flex flex-col justify-between border-border/70">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-headline font-bold text-foreground mb-3">
                  Hi, I'm <span className="text-primary">Partha Pratim Mallick</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I am a results-oriented <strong>Software Engineer</strong> currently based in Dhaka, Bangladesh, working at <strong>Grameen Communications</strong>. I specialize in building robust, performant mobile applications and resilient backend services that solve real-world problems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My work spans the full development cycle: from translating complex UX wireframes into fluid Flutter and Android interfaces to architecting high-throughput REST APIs powered by .NET Core and Java. I prioritize maintainable architectures, test coverage, and smooth user experiences.
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                  Key Strengths
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {KEY_STRENGTHS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Focus Pillars */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {HIGHLIGHTS.map((highlight, index) => (
              <Card
                key={index}
                className="transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">{highlight.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
