import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CopyButton } from '@/components/copy-button';

const steps = [
  {
    title: 'Step 1: Update OAuth Credentials',
    command: 'Update your OAuth credentials in the project settings.',
  },
  {
    title: 'Step 2: Install Package',
    command: 'npm install flashauthbyjagwar',
  },
  {
    title: 'Step 3: Use in your Code',
    command: `import FlashAuthClient from 'flashauthbyjagwar';

const [client, setClient] = useState(null);

useEffect(() => {
  const flashauthClient = new FlashAuthClient("flashauth_client_id");
  setClient(flashauthClient);    
}, []);`,
  },
];

const CodeBlock = ({ command }: { command: string }) => (
  <div className="relative group">
    <pre className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap">
      <code className="font-code">{command}</code>
    </pre>
    <CopyButton textToCopy={command} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

export default function InstallationGuide() {
  return (
    <section id="installation" className="text-center">
      <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
        Ready in 3 Simple Steps
      </h2>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
        Go from zero to fully authenticated in minutes. It's that easy.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-3 text-left">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">{index + 1}</span>
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock command={step.command} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
