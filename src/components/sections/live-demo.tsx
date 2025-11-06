'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { generateAuthCases } from '@/ai/flows/generate-auth-cases';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, CheckCircle, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LiveDemo() {
  const [isPending, startTransition] = useTransition();
  const [testCases, setTestCases] = useState<string[]>([]);
  const { isLoggedIn, logout, user } = useAuth();
  const { toast } = useToast();

  const handleGenerateCases = () => {
    startTransition(async () => {
      const result = await generateAuthCases({});
      if (result && result.testCases) {
        setTestCases(result.testCases);
        toast({
          title: "Success!",
          description: "Generated new authentication test cases.",
        });
      } else {
         toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate test cases.",
        });
      }
    });
  };

  return (
    <section id="live-demo" className="text-center">
       <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
        See It in Action
      </h2>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
        Interact with a live demo and use AI to generate test cases to see how FlashAuth handles them.
      </p>
      <Card className="mt-8 text-left w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>FlashAuth Live Demo</CardTitle>
              <CardDescription>
                Your current authentication status is shown below.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isLoggedIn ? 'default' : 'secondary'} className="bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/30">
                {isLoggedIn ? `Logged In as ${user?.name}` : 'Logged Out'}
              </Badge>
              {isLoggedIn ? (
                <Button onClick={logout} variant="destructive">Logout</Button>
              ) : (
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-background">
            <h3 className="font-semibold mb-2">Generated Auth Test Cases</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button to use AI to generate a variety of authentication test cases that FlashAuth can handle out-of-the-box.
            </p>
            <Button onClick={handleGenerateCases} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate with AI
            </Button>
            {testCases.length > 0 && (
              <ul className="mt-6 space-y-3">
                {testCases.map((testCase, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{testCase}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
