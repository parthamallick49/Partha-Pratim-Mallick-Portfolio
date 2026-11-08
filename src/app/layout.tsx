import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Partha Pratim Mallick — Software Engineer & Mobile Developer',
  description: 'Results-oriented Software Engineer building scalable, user-friendly mobile experiences and backend services. Fluent in Flutter, Java, .NET Core, and modern web architectures.',
  keywords: ['Partha Pratim Mallick', 'Software Engineer', 'Mobile Developer', 'Flutter', 'Java', '.NET Core', 'React', 'Portfolio'],
  authors: [{ name: 'Partha Pratim Mallick' }],
  openGraph: {
    title: 'Partha Pratim Mallick — Software Engineer Portfolio',
    description: 'Explore projects, architecture case studies, and skills across mobile and backend engineering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧑🏻‍💻</text></svg>" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
