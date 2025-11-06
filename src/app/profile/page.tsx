'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Mail, User } from 'lucide-react';

export default function ProfilePage() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const profileImage = PlaceHolderImages[0];

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
             <Image
                src={profileImage.imageUrl}
                alt="User Avatar"
                width={100}
                height={100}
                data-ai-hint={profileImage.imageHint}
                className="rounded-full object-cover border-4 border-primary"
              />
          </div>
          <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
          <CardDescription>
            <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>{user.role}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm text-foreground">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Username:</span>
              <span>{user.name.toLowerCase().replace(' ', '')}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Status:</span>
              <span className="text-green-500 font-semibold">Verified</span>
            </div>
          </div>
          <Button
            onClick={() => {
              logout();
              router.push('/');
            }}
            variant="destructive"
            className="w-full"
          >
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
