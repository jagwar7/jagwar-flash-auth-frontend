'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Link as LinkIcon, Lock, Globe, Database, Clock, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GetCredentials } from '@/APIs/CredentialsAPI';
import { Storage } from '@/Storage/Storage';
import { useAlert } from '@/contexts/alert-state-context';

export default function UpdateCredentialsPage() {
  const {showAlert} = useAlert();
  const [frontendUrl, setFrontendUrl] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [isPublicKeyVisible, setIsPublicKeyVisible] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [isSecretKeyVisible, setIsSecretKeyVisible] = useState(false);
  const [mongodbUri, setMongodbUri] = useState('');
  const [googleClientId, setGoogleClientId] = useState('');
  const [isGoogleClientIdVisible, setIsGoogleClientIdVisible] = useState(false);
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState('');

  const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  //FETCH EXISTING CREDENTIALS--------------------
  const fetchAndPopulate=async()=>{
    const token = Storage.GetToken();
    if(!token){
      return;
    }
    const res = await GetCredentials();
    console.log(res);
  }
  //----------------------------------------------


  //UPDATE CREDENTIALS----------------------------
  const UpdateCredentials=asnyc()=>{
    const token = Storage.GetToken();
    if(!token){
      showAlert("Please sign in first", false);
    }
    const res = await Cre
  }
  
  useEffect(() => {
    setPublicKey(`pk_live_${generateRandomString(16)}`);
    setSecretKey(`sk_live_${generateRandomString(16)}`);

    fetchAndPopulate();

  }, []);

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Update Your Credentials</CardTitle>
          <CardDescription>
            Manage the settings and secrets for your FlashAuth integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="frontend-url">Your Front End URL</Label>
              <div className="relative flex items-center">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="frontend-url" 
                  placeholder="https://yourapp.com" 
                  className="pl-10"
                  value={frontendUrl}
                  onChange={(e) => setFrontendUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="client-public-key">FlashAuth Client Public Key</Label>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="relative flex items-center">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                id="client-public-key"
                                type={isPublicKeyVisible ? 'text' : 'password'}
                                placeholder="pk_live_..."
                                className="pl-10 pr-[150px]"
                                value={publicKey}
                                readOnly
                                />
                                <Button variant="ghost" size="icon" className="absolute right-[110px] h-8 w-8" onClick={() => setIsPublicKeyVisible(prev => !prev)}>
                                {isPublicKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="sm" className="absolute right-1" onClick={() => setPublicKey(`pk_live_${generateRandomString(16)}`)}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Generate
                                </Button>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy and Save this key</p>
                        </TooltipContent>
                    </Tooltip>
                 </TooltipProvider>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-secret-key">FlashAuth Client Secret Key</Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="client-secret-key" 
                  type={isSecretKeyVisible ? 'text' : 'password'} 
                  placeholder="sk_live_..." 
                  className="pl-10 pr-[150px]"
                  value={secretKey}
                  readOnly
                />
                <Button variant="ghost" size="icon" className="absolute right-[110px] h-8 w-8" onClick={() => setIsSecretKeyVisible(prev => !prev)}>
                  {isSecretKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" className="absolute right-1" onClick={() => setSecretKey(`sk_live_${generateRandomString(16)}`)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mongodb-uri">Your MongoDB URI</Label>
              <div className="relative flex items-center">
                <Database className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="mongodb-uri" 
                  type="password" 
                  placeholder="mongodb+srv://..." 
                  className="pl-10"
                  value={mongodbUri}
                  onChange={(e) => setMongodbUri(e.target.value)}
                />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="google-client-id">Your Google Client Id</Label>
                    <div className="relative flex items-center">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="google-client-id" 
                          type={isGoogleClientIdVisible ? 'text' : 'password'}
                          placeholder="....apps.googleusercontent.com" 
                          className="pl-10 pr-10"
                          value={googleClientId}
                          onChange={(e) => setGoogleClientId(e.target.value)}
                        />
                        <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8" onClick={() => setIsGoogleClientIdVisible(prev => !prev)}>
                          {isGoogleClientIdVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="google-client-secret">Your Google Client Secret</Label>
                    <div className="relative flex items-center">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="google-client-secret" 
                          type="password" 
                          placeholder="GOCSPX-..." 
                          className="pl-10"
                          value={googleClientSecret}
                          onChange={(e) => setGoogleClientSecret(e.target.value)}
                        />
                    </div>
                </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="token-expiry">Token Expiry Duration</Label>
                <div className="relative flex items-center">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Select onValueChange={setTokenExpiry} value={tokenExpiry}>
                        <SelectTrigger className="pl-10" id="token-expiry">
                            <SelectValue placeholder="Select a duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="3h">3 hours</SelectItem>
                            <SelectItem value="6h">6 hours</SelectItem>
                            <SelectItem value="12h">12 hours</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                            <SelectItem value="7d">7 days</SelectItem>
                            <SelectItem value="15d">15 days</SelectItem>
                            <SelectItem value="30d">30 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Credentials
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
