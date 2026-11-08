"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Send, Github, Linkedin, Mail, Copy, Check, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const myEmail = 'parthamallick.cs@gmail.com';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myEmail);
      setCopied(true);
      toast({
        title: "Email copied!",
        description: `${myEmail} copied to your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({
        title: "Copy failed",
        description: `Please copy manually: ${myEmail}`,
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`${data.subject} - from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    toast({
      title: "Opening email client...",
      description: "Your default email app will compose this message.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3">Get In Touch</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Have an opportunity, project, or question? Send me a message or connect directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-border/70">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-headline mb-1">Contact Information</h3>
                  <p className="text-xs text-muted-foreground">
                    Feel free to reach out via email or professional networks.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Direct Email</p>
                      <p className="text-sm font-medium truncate">{myEmail}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="shrink-0 h-8 px-2 text-xs"
                      aria-label="Copy email"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Professional Networks
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="gap-2 text-xs flex-1">
                      <Link
                        href="https://github.com/parthamallick49"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="gap-2 text-xs flex-1">
                      <Link
                        href="https://www.linkedin.com/in/parthamalllick/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Interactive Form */}
          <Card className="lg:col-span-7 border-border/70">
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-xl font-bold font-headline">Send a Direct Message</CardTitle>
              <CardDescription className="text-xs">
                Fill out the form below and click send to initiate an email.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium">Your Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Opportunity / Project Collaboration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Hi Partha, I would like to discuss..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full sm:w-auto shadow-sm">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
