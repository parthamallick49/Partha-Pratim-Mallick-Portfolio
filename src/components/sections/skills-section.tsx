import React, { type ReactNode } from 'react';
import { SKILLS_DATA } from '@/lib/data.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SkillCategory = {
  title: string;
  skills: {
    name: string;
    icon: ReactNode;
  }[];
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12">My Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(SKILLS_DATA as SkillCategory[]).map((category, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex flex-col items-center justify-center text-center p-2 rounded-lg transition-colors hover:bg-accent/10">
                      <div className="h-10 w-10 text-foreground/80 mb-2 flex items-center justify-center">{skill.icon}</div>
                      <p className="text-xs font-medium">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
