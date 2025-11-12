'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/components/copy-button';

const snippets = {
  login: `import FlashAuthClient from 'flashauthbyjagwar'
  
  const HandleGoogleSignIn = async () => {
  if (!client) return;
  try {
    let userData = await client.SignInWithGoogle();
    userData = jwtDecode(userData);
    setUser(userData);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};`,
  logout: `import FlashAuthClient from 'flashauthbyjagwar'';

const Logout = async()=>{
  try{
    const signoutRes = await client.SignOut();
    return signoutRes;
  }catch(err){
    console.log("There is an error while logout");
  }
}
`,
  profile: `import FlashAuthClient from 'flashauthbyjagwar';

const FetchUserData =async()=>{
  try {
    const data = await client.FetchUserProfile();
    return data;
  } catch (error) {
    console.log("There is an error to fetch user data");
  }
}`,
};



const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative group">
    <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
      <code className="font-code">{code}</code>
    </pre>
    <CopyButton textToCopy={code} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

export default function CodeSnippets() {
  return (
    <section id="snippets" className="text-center">
      <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
        Plug & Play Code
      </h2>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
        Implementing secure authentication has never been easier. Copy, paste, and you're done.
      </p>
      <div className="mt-8">
        <Tabs defaultValue="login" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="logout">Logout</TabsTrigger>
            <TabsTrigger value="profile">Get Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="text-left">
              <CardHeader>
                <CardTitle>User Login</CardTitle>
                <CardDescription>
                  Easily add login functionality for various providers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={snippets.login} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logout">
            <Card className="text-left">
              <CardHeader>
                <CardTitle>User Logout</CardTitle>
                <CardDescription>
                  A simple function call to securely log out the user.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={snippets.logout} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="profile">
            <Card className="text-left">
              <CardHeader>
                <CardTitle>Fetch User Profile</CardTitle>
                <CardDescription>
                  Access authenticated user data anywhere in your app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={snippets.profile} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
