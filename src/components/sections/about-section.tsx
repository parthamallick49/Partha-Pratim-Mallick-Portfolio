import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImage = PlaceHolderImages.find(p => p.id === 'about');

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-muted/50 dark:bg-muted/20">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12">About Me</h2>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 h-full w-full">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div className="md:col-span-3 p-8 md:p-12 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline text-primary">What I bring</h3>
                <p className="text-muted-foreground text-justify">
                  I bring an end-to-end product focus, translating UX designs into performant mobile features and connecting them to robust backend services. I excel in full-stack teamwork, collaborating with product designers, QA, and backend engineers to ship releases and improve app stability. With a continuous improvement mindset, I focus on writing maintainable code, adding tests, and optimizing user flows.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-headline text-primary">My Mission</h3>
                <p className="text-muted-foreground text-justify">
                  I'm a results-oriented Software Engineer with hands-on experience across mobile and backend development. Currently a Junior Software Engineer at Grameen Communications, I work on building scalable, user-friendly mobile experiences and backend services. I'm fluent in Flutter/Dart, Java, and .NET Core, and I design and integrate REST APIs with MongoDB, SQL Server, and Firebase.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
