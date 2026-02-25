import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/auth-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import SupportChat from '@/components/support-chat';
import StarsBackground from '@/components/stars-background';
import { AlertProvider } from '@/contexts/alert-state-context';

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
  openGraph: {
    title: 'Flash Auth | Secure Authentication',
    description: 'Modern authentication service for web apps.',
    url: 'https://flashauth.connectjagwar.online',
    siteName: 'Flash Auth',
    type: 'website',
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
  // Structured Data to fix the "Flash Auth" brand identity
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flash Auth",
    "alternateName": "Flash Auth by Jagwar",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web",
    "url": "https://flashauth.connectjagwar.online/",
    "author": {
      "@type": "Person",
      "name": "Jagwar"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
