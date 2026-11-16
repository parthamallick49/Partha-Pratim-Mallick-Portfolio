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
        // Editorial & display
        editorial: ['Newsreader', 'Georgia', 'serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        display: ['Newsreader', 'Syne', 'serif'],
        headline: ['Newsreader', 'Syne', 'serif'],
        // Body — Plus Jakarta Sans (clean, humanist)
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        // Code / mono
        mono: ['JetBrains Mono', 'monospace'],
        code: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Scenic Train Journey Signature Palette
        rail: {
          teal: '#2F6F6D',
          'teal-dark': '#1C4947',
          'teal-light': '#449694',
          vanilla: '#F3E9D2',
          'vanilla-muted': '#D8CEB7',
          orange: '#C84630',
          'orange-glow': '#E45B44',
          midnight: '#0F2322',
          'midnight-deep': '#091515',
          'midnight-light': '#183635',
          gold: '#E3B23C',
          rust: '#8F3B25',
          smoke: '#EAE5D9',
        },
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

        // Portfolio brand palette
        indigo: {
          DEFAULT: '#7c3aed',
          light: '#a855f7',
          pale: '#c4b5fd',
          dim: '#5b21b6',
          glow: 'rgba(124,58,237,0.4)',
        },
        emerald: {
          DEFAULT: '#10b981',
          light: '#34d399',
          pale: '#6ee7b7',
          dim: '#059669',
          glow: 'rgba(16,185,129,0.35)',
        },
        amber: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          pale: '#fcd34d',
          dim: '#b45309',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          pale: '#67e8f9',
        },
        obsidian: {
          950: '#06060a',
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#232330',
          500: '#2e2e3e',
          400: '#4a4a5e',
        },
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04) inset',
        'card-hover': '0 20px 60px -8px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.25)',
        'glow-indigo': '0 0 32px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)',
        'glow-emerald': '0 0 24px rgba(16,185,129,0.4), 0 0 60px rgba(16,185,129,0.15)',
        'glow-sm-indigo': '0 0 12px rgba(124,58,237,0.4)',
        'orbital': '0 0 20px rgba(124,58,237,0.3)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
        pill: '9999px',
      },
      backgroundImage: {
        'gradient-indigo': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #10b981 100%)',
        'gradient-dark-card': 'linear-gradient(145deg, hsl(240 8% 9%), hsl(240 8% 6%))',
        'gradient-mesh-dark': `
          radial-gradient(ellipse 80% 50% at 10% -10%, rgba(124,58,237,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 90% 110%, rgba(16,185,129,0.16) 0%, transparent 55%)
        `,
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
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', filter: 'blur(20px)' },
          '50%': { opacity: '1', filter: 'blur(28px)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-ring': 'pulse-ring 1.6s cubic-bezier(0,0,0.2,1) infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.4s ease',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
