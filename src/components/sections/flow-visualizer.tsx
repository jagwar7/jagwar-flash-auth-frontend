'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User, Code2, Server, Database, ShieldCheck, ArrowRight } from 'lucide-react';

const flowSteps = [
  {
    icon: User,
    title: 'User Action',
    description: 'User clicks login button in your React app.',
  },
  {
    icon: Code2,
    title: 'FlashAuth SDK',
    description: 'The SDK securely captures credentials and initiates the request.',
  },
  {
    icon: Server,
    title: 'FlashAuth Backend',
    description: 'Our robust backend handles all verification and logic.',
  },
  {
    icon: Database,
    title: 'User in Database',
    description: 'User is created or updated in your database.',
  },
  {
    icon: ShieldCheck,
    title: 'Authenticated State',
    description: 'Your app is notified and the user is now logged in.',
  },
];

const FlowStep = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="text-center p-6 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
    <CardContent className="flex flex-col items-center gap-4">
      <div className="bg-accent/20 p-4 rounded-full">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold font-headline">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function FlowVisualizer() {
  return (
    <section id="flow" className="text-center">
        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            FlashAuth simplifies the entire authentication flow, so you can focus on your product.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-stretch gap-8">
            {flowSteps.map((step, index) => (
                <div key={index} className="flex items-center relative">
                    <FlowStep {...step} />
                    {index < flowSteps.length - 1 && (
                        <ArrowRight className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 text-muted-foreground/30 mx-4" />
                    )}
                </div>
            ))}
        </div>
    </section>
  );
}
