"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Send, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    const name = encodeURIComponent(data.name);
    const body = encodeURIComponent(data.message);
    const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
    const mailtoLink = `mailto:parthamallick.cs@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Ready to send!",
      description: "Your email client has been opened.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="section-padding bg-muted/50 dark:bg-muted/20">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12">Get In Touch</h2>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="parthamallick.cs@gmail.com" disabled />
                    </FormControl>
                  </FormItem>
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Hi Partha, I'd like to connect with you about..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button asChild variant="ghost" size="icon">
                      <Link href="https://github.com/parthamallick49" target="_blank">
                        <Github />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                      <Link href="https://www.linkedin.com/in/parthamalllick/" target="_blank">
                        <Linkedin />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                  </div>
                  <Button type="submit">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
