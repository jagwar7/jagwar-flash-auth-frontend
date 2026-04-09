'use client';
export const dynamic = 'force-dynamic'; 
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
import { Storage } from '@/Storage/Storage';
import { SignInWithGoogleController } from '@/firebase/Authentication/AuthController';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { RequestPasswordReset } from '@/APIs/PasswordResetAPI';

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
  const {showAlert} = useAlert();
  const {login} = useAuth();
  const router = useRouter();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');


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


  // ON SIGN IN WITH LOCAL ----------------------------------------------------------------------------------------------------
  const OnSignInFormSubmit = async( email:string, password:string)=>{
    if(!email || !password){
      showAlert("All the fields are required", false);
      return;
    }
    try {
      const res = await SignInWithJWT(email, password);
      if(res.success == false){
        showAlert(res.message, false);
        return;
      }
      
      showAlert(res.message, true);
      Storage.SaveToken(res.data);
      login();
      router.push('/') // BACK TO HOME
      return;
    } catch (error) {
      console.log(error);
      showAlert(`Unknown Error: ${error}`, false);
      return;
    }

  }
  //---------------------------------------------------------------------------------------------------------------------------




    //ATTEMPT GOOGLE SIGN IN----------------------------------------------------------------------------------------
    const AttemptSignInWithGoogle =async()=>{
      try {
        const res = await SignInWithGoogleController();
        if(res.success == false){
          showAlert(res.message, false);
          return;
        }
  
        Storage.SaveToken(res.data);
        showAlert(res.message, true);
        login();
        router.push('/update-credentials');
        return;
      } catch (error) {
        showAlert("Unknow Error", false);
        return;
      }
    }
    //--------------------------------------------------------------------------------------------------------------
  



    //--------------------------------------------------------------------------------------------------------------
    const PasswordResetRequest=async(email:string)=>{
      if(formData.email.length <=8){
        showAlert("Please enter your valid email", false);
      }
      const res = await RequestPasswordReset(email);
      console.log(res);

    }

  


  
  
  const isGoogleDisabled = formData.email.length > 0 || formData.password.length > 0;

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
              <button className='text-sm text-blue-500 font-semibold pl-1 underline'
                onClick={()=>PasswordResetRequest(formData.email)}
              >forgot password?</button>
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
          <Button variant="outline" onClick={()=>AttemptSignInWithGoogle()} className="w-full" disabled={isGoogleDisabled}>
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
