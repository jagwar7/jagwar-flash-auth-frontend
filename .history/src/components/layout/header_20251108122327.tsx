'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import AuthButton from '../auth-button';

const FlashAuthLogo = () => (
   <svg
    width="220"
    height="40"
    viewBox="0 0 220 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-auto"
  >
    <defs>
        <linearGradient id="brandGradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff4500" />
            <stop offset="100%" stopColor="#ff7a4d" />
        </linearGradient>
    </defs>
    <text
      x="0"
      y="22"
      fontFamily="Inter, sans-serif"
      fontSize="24"
      fontWeight="900"
      fontStyle="italic"
      fill="url(#brandGradient)"
    >
      FLASH
    </text>
    <g transform="translate(90, 2) scale(0.035)">
      <path
        d="M704 469.333333h-200.533333L640 106.666667H405.333333l-128 448h183.466667L362.666667 960z"
        fill="url(#brandGradient)"
      />
    </g>
    <text
      x="125"
      y="22"
      fontFamily="Inter, sans-serif"
      fontSize="24"
      fontWeight="900"
      fontStyle="italic"
      fill="url(#brandGradient)"
    >
      AUTH
    </text>
    <text
      x="143"
      y="37"
      fontFamily="Inter, sans-serif"
      fontSize="10"
      fontWeight="900"
      fill="url(#brandGradient)"
    >
      by JAGWAR
    </text>
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    Check
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 max-w-screen-xl items-center justify-between mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <FlashAuthLogo />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          <Link href="/update-credentials" className="text-white/80 hover:text-white transition-colors">Credentials</Link>
          <Link href="/docs" className="text-white/80 hover:text-white transition-colors">Docs</Link>
          <Link href="#" className="text-white/80 hover:text-white transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
           {isMounted && <AuthButton />}
        </div>
      </div>
    </header>
  );
}
