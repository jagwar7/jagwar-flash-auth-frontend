'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from '@/components/copy-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative group">
    <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
      <code className="font-mono">{code}</code>
    </pre>
    <CopyButton
      textToCopy={code}
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </div>
);

const redirectUrl = "https://jagwar-flash-auth-v2.onrender.com/api/flashauth/google/callback";
const originUrl = "https://jagwar-flash-auth.onrender.com";
const firebasePath = "Firebase Console > Authentication > Sign-in method > Google > Enable"
const googleCloudPath= "Google Cloud Console > Choose Same Firebase Project > API & Services > Credentials > OAuth 2.0 Client IDs"


const steps = [
  {
    title: 'Step 1: Initialize FlashAuth SDK',
    description: 'Initialize the FlashAuth SDK in your frontend by passing your FlashAuth Client ID.',
    code: `import FlashAuthClient from 'flashauthbyjagwar';
import { useState, useEffect } from 'react';

const [client, setClient] = useState(null);

useEffect(() => {
  const flashauthClient = new FlashAuthClient("flashauth_client_id");
  setClient(flashauthClient);    
}, []);`,
  },
  {
    title: 'Step 2: SDK Calls Authentication API',
    description: 'The FlashAuth SDK automatically calls the authentication API on the FlashAuth Backend to begin the login process.',
    code: `const HandleGoogleSignIn = async () => {
  if (!client) return;
  try {
    let userData = await client.SignInWithGoogle();
    userData = jwtDecode(userData);
    setUser(userData);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};`
  },
  {
    title: 'Step 3: FlashAuth SDK opens OAuth Popup',
    description: 'The FlashAuth SDK will open an OAuth Account selection popup for the user.',
  },
  {
    title: 'Step 4: Backend Generates Auth URL',
    description: 'The FlashAuth backend fetches your credentials from the FlashAuth database, generates a Google Auth URL, and returns it to the SDK to open a popup.',
    code: `// FIND USER CREDENTIALS 
const userCredentialCollection = req.db.model('UserCredentials', UserCredentials);
const siteData = await userCredentialCollection.findOne({clientPublicKey: clientPublicKey});

if(!siteData){
    return res.status(400).json({success: false, message: "INTERNAL SERVER ERROR: Site data not found, Contact Admin"});
}

let {googleClientId, googleClientSecret} = siteData;  

googleClientId = Decrypt(googleClientId);
googleClientSecret = Decrypt(googleClientSecret);

const oAuthClientInstance = new OAuth2Client(
    googleClientId,
    googleClientSecret,
    "https://jagwar-flash-auth.onrender.com/api/flashauth/google/callback"
);
const authURL = oAuthClientInstance.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "select_account",
    state: clientPublicKey
});`,
  },
  {
    title: 'Step 5: User Authenticates with Google',
    description: 'The user chooses their Google account in the popup, and upon success, Google calls the /api/flashauth/google/callback endpoint on the FlashAuth server.',
  },
  {
    title: 'Step 6: Backend Creates User',
    description: "The FlashAuth backend creates a new user record in your own application's database.",
    code: `// TRY CREATE / UPDATE USER IN CLIENT's MONGODB
const createOrUpdateInDb = await findOrCreate(clientMongoDbUri, userProfile);`,
  },
  {
    title: 'Step 7: Token Returned to Frontend',
    description: 'A secure JWT authentication token is generated and returned to your frontend application. The user is now successfully logged in!',
  },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">Authentication Deep Dive</h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl/relaxed">
          Follow the step-by-step flow of how FlashAuth securely authenticates a user from start to finish.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <div>
            <h2 className="text-2xl font-bold font-headline tracking-tight mb-4 text-center">Prerequisites</h2>
            <Alert className='my-8'>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Create <span className='text-lg font-bold'> Firebase Project</span></AlertTitle>
              <AlertDescription>
                <p className="mb-2">You must have a Firebase Project for Google OAuth</p>
                
                <div className="space-y-4 mt-4">
                    <div>
                        <p className="font-medium text-foreground mb-1">Create Firebase Project, Click on the link below.</p>
                         <div className="relative group bg-muted/50 p-2 rounded-lg text-sm flex items-center justify-between">
                            <a href='https://firebase.google.com/docs/web/setup' className="font-mono text-blue-600 underline">https://firebase.google.com/docs/web/setup</a>
                        </div>
                        
                    </div>

                    <div>
                        <p className="font-medium text-foreground mb-1">Enable Google Sign In</p>
                         <div className="relative group bg-muted/50 p-2 rounded-lg text-sm flex items-center justify-between">
                            <code className="font-mono text-blue-600">{firebasePath}</code>
                        </div>
                        
                    </div>
                </div>

              </AlertDescription>
            </Alert>





            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Google Cloud Console Configuration</AlertTitle>
              <AlertDescription>
                <p className="mb-2">For Google Sign-In to work, you must add the following URLs to your Google Cloud Console configuration.</p>
                
                <div className="space-y-4 mt-4">
                    <div>
                        <p className="font-medium text-foreground mb-1">Sign in into Google Cloud Console</p>
                         <div className="relative group bg-muted/50 p-2 rounded-lg text-sm flex items-center justify-between">
                            <code className="font-mono">{googleCloudPath}</code>
                            
                        </div>
                       
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">Authorized redirect URI</p>
                         <div className="relative group bg-muted/50 p-2 rounded-lg text-sm flex items-center justify-between">
                            <code className="font-mono">{redirectUrl}</code>
                            <CopyButton textToCopy={redirectUrl} />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Add this to: APIs &amp; Services &gt; Credentials &gt; Your OAuth 2.0 Client ID &gt; Authorized redirect URIs
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-foreground mb-1">Authorized JavaScript origin</p>
                         <div className="relative group bg-muted/50 p-2 rounded-lg text-sm flex items-center justify-between">
                            <code className="font-mono">{originUrl}</code>
                            <CopyButton textToCopy={originUrl} />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Add this to: APIs &amp; Services &gt; Credentials &gt; Your OAuth 2.0 Client ID &gt; Authorized JavaScript origins
                        </p>
                    </div>
                </div>

              </AlertDescription>
            </Alert>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={index} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span>{step.title}</span>
                    <p className="text-sm font-normal text-muted-foreground mt-2">{step.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              {step.code && (
                <CardContent>
                  <CodeBlock code={step.code} />
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
