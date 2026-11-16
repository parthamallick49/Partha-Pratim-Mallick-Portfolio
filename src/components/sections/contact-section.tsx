"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  MapPin,
  Clock,
  MessageSquare,
  ArrowUpRight,
  Zap,
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

// Variants outside component
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

// Magnetic social link hook
function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function ContactSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_DATA.email);
    setCopied(true);
    toast({
      title: 'Email copied!',
      description: `${PERSONAL_DATA.email} is ready to paste.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = (data: ContactFormValues) => {
    const name = encodeURIComponent(data.name);
    const subject = encodeURIComponent(`[Portfolio] ${data.subject} — from ${name}`);
    const body = encodeURIComponent(
      `Hello Partha,\n\n${data.message}\n\n---\nSender: ${data.name} (${data.email})`
    );
    window.location.href = `mailto:${PERSONAL_DATA.email}?subject=${subject}&body=${body}`;
    toast({
      title: 'Opening email client...',
      description: 'Draft generated. Thank you for reaching out!',
    });
    form.reset();
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-0 inset-x-0 h-px section-divider" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-primary/6 blur-3xl rounded-full pointer-events-none" />

      <div className="container-editorial relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="flex flex-col items-center text-center space-y-3 mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/25 text-xs font-mono text-primary">
            <MessageSquare className="w-3.5 h-3.5" />
            05 // Communication
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Initiate Contact &amp;{' '}
            <span className="text-gradient-aurora">Collaboration</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl">
            Whether you have a full-time engineering opportunity, mobile app idea, or architectural inquiry — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left: Info Cards */}
          <motion.div variants={cardVariants} className="lg:col-span-5 space-y-5">
            {/* Email card */}
            <div className="p-7 rounded-3xl glass border border-white/8 glow-soft space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/8 rounded-full blur-2xl pointer-events-none" />
              <div className="relative space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Direct Inbox
                </span>
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground break-all">
                  {PERSONAL_DATA.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  One click to copy or trigger your default email client.
                </p>
              </div>

              <div className="relative flex flex-wrap gap-2 pt-1">
                <motion.button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono font-semibold hover:bg-secondary/20 transition-all duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </motion.button>

                <motion.a
                  href={`mailto:${PERSONAL_DATA.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-white/15 transition-all duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  Open Client <ArrowUpRight className="w-3 h-3" />
                </motion.a>
              </div>
            </div>

            {/* Status & Location card */}
            <div className="p-6 rounded-3xl glass border border-white/8 glow-soft space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/6 rounded-full blur-2xl pointer-events-none" />

              <div className="relative flex items-center justify-between pb-3 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                  </span>
                  <span className="font-display font-bold text-sm text-foreground">Live Status</span>
                </div>
                <span className="text-xs font-mono text-secondary font-semibold">Open to Opportunities</span>
              </div>

              <div className="relative space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>Based in {PERSONAL_DATA.location} (Remote & On-Site)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span>{PERSONAL_DATA.timezone} · Responsive within 24 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{PERSONAL_DATA.availability}</span>
                </div>
              </div>

              {/* Social links with magnetic physics */}
              <div className="relative pt-4 border-t border-white/6 flex items-center gap-3">
                <MagneticLink
                  href={PERSONAL_DATA.github}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/25 transition-all duration-200"
                >
                  <Github className="w-4 h-4" /> GitHub
                </MagneticLink>
                <MagneticLink
                  href={PERSONAL_DATA.linkedin}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-cyan-400/25 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
                </MagneticLink>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div variants={cardVariants} className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl glass border border-white/8 glow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative pb-5 mb-6 border-b border-white/6">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill in the details below — it&apos;ll format a draft email directly to Partha.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono text-muted-foreground">Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. John Doe"
                              className="rounded-xl bg-white/4 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary/40 text-foreground placeholder:text-muted-foreground/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] font-mono text-destructive" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono text-muted-foreground">Your Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@company.com"
                              className="rounded-xl bg-white/4 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary/40 text-foreground placeholder:text-muted-foreground/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] font-mono text-destructive" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-muted-foreground">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Mobile Engineering Role / Flutter Consulting"
                            className="rounded-xl bg-white/4 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary/40 text-foreground placeholder:text-muted-foreground/40"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] font-mono text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-muted-foreground">Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Hi Partha, I came across your portfolio and wanted to discuss..."
                            rows={5}
                            className="rounded-xl bg-white/4 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary/40 text-foreground placeholder:text-muted-foreground/40 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] font-mono text-destructive" />
                      </FormItem>
                    )}
                  />

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] font-mono text-muted-foreground">
                      Direct mailto dispatch · No server required
                    </p>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-indigo text-white text-sm font-semibold shadow-glow-sm-indigo hover:shadow-glow-indigo transition-shadow duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
