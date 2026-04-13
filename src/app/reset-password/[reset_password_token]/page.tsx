'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import React, { use, useState } from "react";
import { UpdatePassword } from "@/APIs/PasswordResetAPI";
import { useAlert } from "@/contexts/alert-state-context";


export default function ResetPasswordPage({params}:{params: Promise<{reset_password_token: string}>}){
    const {reset_password_token} = use(params);
    const {showAlert} = useAlert();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {id, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [id]: value
        }));
    }


    const onFormSubmit = async(formData:any)=>{
        if(formData.password != formData.confirmPassword){
          showAlert("PASSWORD DIDNT MATCH", false);
          return;
        }
        if(!reset_password_token){
          showAlert("NO TOKEN FOUND", false);
          return;
        }

        const responseData:any = await UpdatePassword(formData, reset_password_token);
        showAlert(responseData.message, responseData.success);
    }


    return(
        <div className="h-[80vh] flex justify-center items-center py-10">
            <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Reset Password</CardTitle>
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
            <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <Button type="button" className="w-full font-semibold" onClick={()=>onFormSubmit(formData)}>
              RESET PASSWORD
            </Button>
          </form>


          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            </div>
          </div>
          
        </CardContent>
      </Card>

                       

        </div>
    )
}