'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const texts = [
    {
        parts: [
            { text: 'A permanent Authentication solution for your next ', isHighlight: false },
            { text: 'React site.', isHighlight: true },
        ],
    },
    {
        parts: [
            { text: 'No need to write a single line of code for ', isHighlight: false },
            { text: 'Authentication.', isHighlight: true },
        ],
    },
    {
        parts: [
            { text: 'No need to fix bugs of ', isHighlight: false },
            { text: 'AI tools', isHighlight: true },
            { text: ' given code.', isHighlight: false },
        ],
    },
    {
        parts: [
            { text: 'No ', isHighlight: false },
            { text: 'time', isHighlight: true },
            { text: ' No ', isHighlight: false },
            { text: 'effort', isHighlight: true },
            { text: ' No ', isHighlight: false },
            { text: 'headache', isHighlight: true },
        ],
    },
];

export default function Hero() {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState(
        texts[0].parts.map(p => p.text).join('')
    );
    const [isDeleting, setIsDeleting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fullText = useMemo(() => {
        return texts[textIndex].parts.map(p => p.text).join('');
    }, [textIndex]);

    useEffect(() => {
        if (!isMounted) return;

        const handleTyping = () => {
            const currentText = isDeleting
                ? fullText.substring(0, displayedText.length - 1)
                : fullText.substring(0, displayedText.length + 1);

            setDisplayedText(currentText);

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 3000);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const typingSpeed = isDeleting ? 50 : 100;
        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, textIndex, isMounted, fullText]);

    const renderedParts = useMemo(() => {
        const parts = [];
        let remainingText = displayedText;
        const currentConfig = texts[textIndex];

        for (const part of currentConfig.parts) {
            if (remainingText.length === 0) break;

            const textToRender = remainingText.startsWith(part.text)
                ? part.text
                : remainingText;
            
            parts.push(
                <span key={parts.length} className={part.isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-600" : ""}>
                    {textToRender.substring(0, remainingText.length)}
                </span>
            );

            if (remainingText.length <= part.text.length) {
                break;
            }
            remainingText = remainingText.substring(part.text.length);
        }
        
        return parts;
    }, [displayedText, textIndex]);


    return (
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="flex flex-col justify-center space-y-8 text-center items-center">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-600 rounded-full filter blur-2xl opacity-70 w-24 h-24 mx-auto"></div>
                        <div className="relative rounded-full p-4 inline-block">
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 1024 1024"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="brandGradientHero" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#ff4500" />
                                        <stop offset="100%" stopColor="#ff7a4d" />
                                    </linearGradient>
                                </defs>
                                <path d="M704 469.333333h-200.533333L640 106.666667H405.333333l-128 448h183.466667L362.666667 960z" fill="url(#brandGradientHero)" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Flash⚡Auth</h2>
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-300 bg-blue-900/50 rounded-full border border-blue-500/50">Beta</span>
                    </div>

                    <h1 className="text-3xl font-bold font-headline tracking-[3px] sm:text-4xl md:text-5xl lg:text-6xl/none text-white h-24">
                        {renderedParts}
                        {isMounted && <span className="cursor">|</span>}
                    </h1>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary/90 text-primary-foreground hover:bg-primary rounded-full text-lg px-8 py-6"
                        >
                          <Link href="/signup">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
