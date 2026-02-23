import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Modern font loading
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/auth-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import SupportChat from '@/components/support-chat';
import StarsBackground from '@/components/stars-background';
import { AlertProvider } from '@/contexts/alert-state-context';

// This is where your SEO "Flash Auth" ranking happens
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Flash Auth | Secure Authentication by Jagwar',
  description: 'The fastest authentication service for modern web apps. Sites beyond imagination, one prompt away.',
  metadataBase: new URL('https://flashauth.connectjagwar.online'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "a7zl-r20OBdg6NWaoXx7pszJ5Pa1Kh4vnHh5_JT7ay0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* NOTE: We removed the manual <head> section. 
          Next.js automatically handles fonts and metadata now.
      */}
      <body className={cn(
        inter.variable, 
        'font-body antialiased min-h-screen flex flex-col relative'
      )}>
        <div className="sky-container">
          <div className="relative w-full h-1/2">
            <StarsBackground count={100} />
          </div>
          <div className="relative w-full h-1/2">
            <StarsBackground count={100} />
          </div>
        </div>

        {/* Shooting Stars */}
        <div className="shooting-star" style={{ opacity: 1, animationDelay: '5s', top: '0%', right: '0%' }}></div>
        <div className="shooting-star" style={{ opacity: 1, animationDelay: '8s', top: '0%', right: '50%' }}></div>
        <div className="shooting-star" style={{ opacity: 1, animationDelay: '16s', top: '0%', right: '30%' }}></div>

        <AuthProvider>
          <AlertProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <SupportChat />
            <Toaster />
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
