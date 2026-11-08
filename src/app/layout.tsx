import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://partha-portfolio.vercel.app'),
  title: {
    default: 'Partha Pratim Mallick | Software Engineer & Mobile App Developer',
    template: '%s | Partha Pratim Mallick',
  },
  description:
    'Personal portfolio of Partha Pratim Mallick. Software Engineer specializing in Flutter, Android, Java, .NET Core, and scalable backend API development.',
  keywords: [
    'Partha Pratim Mallick',
    'Software Engineer',
    'Mobile App Developer',
    'Flutter Developer',
    'Android Developer',
    'Java Developer',
    '.NET Core Developer',
    'Full Stack Engineer',
    'Grameen Communications',
    'Dhaka Bangladesh',
  ],
  authors: [{ name: 'Partha Pratim Mallick', url: 'https://github.com/parthamallick49' }],
  creator: 'Partha Pratim Mallick',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Partha Pratim Mallick | Software Engineer & Mobile App Developer',
    description:
      'Explore projects, engineering experience, and technical skill set in Flutter, Android, Java, and .NET Core.',
    siteName: 'Partha Pratim Mallick Portfolio',
    images: [
      {
        url: '/assets/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Partha Pratim Mallick',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partha Pratim Mallick | Software Engineer',
    description:
      'Software Engineer building performant mobile apps and backend systems with Flutter, Java, and .NET Core.',
    images: ['/assets/profile.jpg'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧑🏻‍💻</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
