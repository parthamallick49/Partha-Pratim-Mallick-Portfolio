"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PERSONAL_DATA } from '@/lib/data';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    toast({
      title: "Email address copied to clipboard!",
      description: "parthamallick.cs@gmail.com is ready to paste into your mail app.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = (data: ContactFormValues) => {
    const name = encodeURIComponent(data.name);
    const senderEmail = encodeURIComponent(data.email);
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject} — from ${name}`);
    const body = encodeURIComponent(
      `Hello Partha,\n\n${data.message}\n\n---\nSender: ${data.name} (${data.email})`
    );

    const mailtoUrl = `mailto:${PERSONAL_DATA.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    toast({
      title: "Opening your email client...",
      description: "Draft generated with your message. Thank you for reaching out!",
    });

    form.reset();
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6DBC2] dark:bg-[#204E4D] border border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono text-[#2F6F6D] dark:text-[#E6DBC2]">
            <MessageSquare className="w-3.5 h-3.5 text-[#C84630]" />
            <span>05 // Communication</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B18] dark:text-[#FAF6EC] tracking-tight">
            Initiate Contact &amp; Collaboration
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#52504A] dark:text-[#B5C7C6] max-w-2xl">
            Whether you have a full-time engineering opportunity, mobile app idea, or architectural inquiry, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Quick Copy (Col 5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C84630] font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Direct Inbox
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#1C1B18] dark:text-[#FAF6EC] break-all">
                  {PERSONAL_DATA.email}
                </p>
                <p className="text-xs font-sans text-[#52504A] dark:text-[#B5C7C6]">
                  One click to copy or trigger your default email client.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  onClick={handleCopyEmail}
                  className="rounded-full bg-[#2F6F6D] hover:bg-[#235654] text-[#FAF6EC] text-xs font-mono flex items-center gap-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#FAF6EC]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[#DCD0B6] dark:border-[#2E6B69] text-xs font-mono"
                >
                  <a href={`mailto:${PERSONAL_DATA.email}`}>
                    Open Client <ArrowUpRight className="ml-1 w-3 h-3" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Availability & Location Card */}
            <div className="p-6 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C84630] animate-pulse" />
                  <span className="font-serif font-bold text-sm text-[#1C1B18] dark:text-[#FAF6EC]">
                    Live Status
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#2F6F6D] dark:text-[#E6DBC2] font-semibold">
                  Open to Opportunities
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans text-[#52504A] dark:text-[#DCD0B6]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C84630] shrink-0" />
                  <span>Based in {PERSONAL_DATA.location} (Remote &amp; On-Site)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2F6F6D] shrink-0" />
                  <span>Timezone: {PERSONAL_DATA.timezone} · Responsive within 24 hrs</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#DCD0B6]/60 dark:border-[#2E6B69]/60 flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-[#E6DBC2] dark:hover:bg-[#1A403F] text-xs font-mono"
                >
                  <Link href={PERSONAL_DATA.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-1.5" />
                    GitHub
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-[#E6DBC2] dark:hover:bg-[#1A403F] text-xs font-mono"
                >
                  <Link href={PERSONAL_DATA.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-1.5 text-[#0077b5]" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Editorial Contact Form (Col 7) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EC] dark:bg-[#204E4D] border-2 border-[#DCD0B6] dark:border-[#2E6B69] shadow-claude-card">
              <div className="pb-4 mb-6 border-b border-[#DCD0B6]/60 dark:border-[#2E6B69]/60">
                <h3 className="font-serif text-2xl font-bold text-[#1C1B18] dark:text-[#FAF6EC]">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-sans text-[#52504A] dark:text-[#B5C7C6] mt-1">
                  Fill in the details below and hit send. It will format an email directly to Partha.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono text-[#1C1B18] dark:text-[#FAF6EC]">
                            Your Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
                              className="rounded-xl bg-[#E6DBC2]/40 dark:bg-[#1A403F]/60 border-[#DCD0B6] dark:border-[#2E6B69] focus-visible:ring-[#C84630]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] font-mono text-[#C84630]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono text-[#1C1B18] dark:text-[#FAF6EC]">
                            Your Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@company.com"
                              className="rounded-xl bg-[#E6DBC2]/40 dark:bg-[#1A403F]/60 border-[#DCD0B6] dark:border-[#2E6B69] focus-visible:ring-[#C84630]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] font-mono text-[#C84630]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-[#1C1B18] dark:text-[#FAF6EC]">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Mobile Engineering Role / Flutter Consulting"
                            className="rounded-xl bg-[#E6DBC2]/40 dark:bg-[#1A403F]/60 border-[#DCD0B6] dark:border-[#2E6B69] focus-visible:ring-[#C84630]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] font-mono text-[#C84630]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-[#1C1B18] dark:text-[#FAF6EC]">
                          Your Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Hi Partha, I came across your portfolio and wanted to discuss..."
                            rows={5}
                            className="rounded-xl bg-[#E6DBC2]/40 dark:bg-[#1A403F]/60 border-[#DCD0B6] dark:border-[#2E6B69] focus-visible:ring-[#C84630] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] font-mono text-[#C84630]" />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] font-mono text-[#52504A] dark:text-[#B5C7C6]">
                      Direct mailto dispatch
                    </p>

                    <Button
                      type="submit"
                      className="rounded-full bg-[#C84630] hover:bg-[#B83E29] text-[#FAF6EC] px-6 text-xs font-mono font-medium shadow-sm hover:shadow transition-all"
                    >
                      <span>Send Dispatch</span>
                      <Send className="ml-2 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
