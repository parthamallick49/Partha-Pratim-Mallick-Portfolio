import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Source Serif 4', 'Georgia', 'serif'],
        headline: ['Newsreader', 'Source Serif 4', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        code: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        claude: {
          vanilla: {
            light: '#FAF6EC',
            DEFAULT: '#F3E9D2',
            card: '#E6DBC2',
            border: '#DCD0B6',
            deep: '#CBBFA4',
          },
          teal: {
            darkest: '#122A29',
            dark: '#1A403F',
            DEFAULT: '#2F6F6D',
            light: '#3D8C8A',
            tint: '#E5EEED',
          },
          terracotta: {
            DEFAULT: '#C84630',
            light: '#D85D48',
            dark: '#A63522',
            glow: '#F9E7E4',
          },
          charcoal: {
            DEFAULT: '#1C1B18',
            muted: '#52504A',
            subtle: '#78766E',
          },
        },
      },
      boxShadow: {
        'claude-card': '0 2px 10px -2px rgba(44, 38, 28, 0.05), 0 1px 3px 0 rgba(44, 38, 28, 0.04)',
        'claude-hover': '0 12px 30px -6px rgba(44, 38, 28, 0.12), 0 4px 12px -2px rgba(44, 38, 28, 0.08)',
        'claude-glow': '0 0 25px -4px rgba(200, 70, 48, 0.35)',
        'claude-teal-glow': '0 0 25px -4px rgba(47, 111, 109, 0.35)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        pill: '9999px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.15)' },
        },
        'glow-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
