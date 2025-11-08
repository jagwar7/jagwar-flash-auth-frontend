'use client';
import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock } from 'lucide-react';
import { SignInWithJWT } from '@/APIs/LocalAuthAPI';
import { useAlert } from '@/contexts/alert-state-context';


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15.545 6.545a9.002 9.002 0 0 1 0 10.91m-1.414-1.414a7 7 0 0 0 0-8.082" />
    <path d="M12 12a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />
    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {user}

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const OnSignInFormSubmit = async( email:string, password:string)=>{
    if(!email || !password) throw new Error("All the fields are required");

    const res = await SignInWithJWT(email, password);
    if(res.success == false){
      
    }
    
  }
  const isGoogleDisabled = email.length > 0 || password.length > 0;

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in to your FlashAuth account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <Button type="button" className="w-full" onClick={()=>OnSignInFormSubmit(formData.email, formData.password)}>
              Sign In
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" disabled={isGoogleDisabled}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            New user?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
