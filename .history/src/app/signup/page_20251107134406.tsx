// src/app/signup/page.tsx
'use client';
import * as React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Lock, User } from 'lucide-react';
import { SignUpWithJWT } from '@/APIs/LocalAuthAPI';
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

export default function SignupPage() {
  const {showAlert} = useAlert();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const OnSignUpFormSubmit = async(name:string, email:string, password:string, confirmPassword:string)=>{
    if(!email || !name || !password || !confirmPassword){
      showAlert("All fields are required", false);
      return;
    }
    if(password != confirmPassword) {
      showAlert("Password and confirm password doesnt match", false);
      return;
    }
    const res = await SignUpWithJWT(name, email, password);
    console.log(res);
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            Create an Account
          </CardTitle>
          <CardDescription>
            Join FlashAuth and simplify your life
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form  className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="pl-10"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button type="button" className="w-full" onClick={()=>{OnSignUpFormSubmit(formData.name, formData.email, formData.password, formData.confirmPassword).catch(err=>console.log(err))}}  >
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google button */}
          <Button variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>

          {/* Sign-in link */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}