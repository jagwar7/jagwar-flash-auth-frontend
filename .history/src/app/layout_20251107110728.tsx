import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/auth-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import SupportChat from '@/components/support-chat';
import StarsBackground from '@/components/stars-background';
import { AlertProvider } from '@/contexts/alert-state-context';

export const metadata: Metadata = {
  title: 'Flash⚡Auth by jagwar',
  description: 'Sites beyond imagination, one prompt away.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col relative')}>
        <div className="sky-container">
          <div className="relative w-full h-1/2">
            <StarsBackground count={100} />
          </div>
          <div className="relative w-full h-1/2">
            <StarsBackground count={100} />
          </div>
        </div>
        {/* top: '20%', */}
        <div className="shooting-star" style={{ opacity: 1, animationDelay: '5s', top: '0%', right: '0%' }}></div>
        <div className="shooting-star" style={{  opacity: 1, animationDelay: '8s', top: '0%', right: '50%' }}></div>
        <AlertProvider></AlertProvider>
        <AuthProvider>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
          <SupportChat />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
