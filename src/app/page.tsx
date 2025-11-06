import CodeSnippets from '@/components/sections/code-snippets';
import DocsExplorer from '@/components/sections/docs-explorer';
import FlowVisualizer from '@/components/sections/flow-visualizer';
import Hero from '@/components/sections/hero';
import InstallationGuide from '@/components/sections/installation-guide';
import LiveDemo from '@/components/sections/live-demo';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <div className="container mx-auto px-4 md:px-6 space-y-24 md:space-y-32 my-24 md:my-32">
        <FlowVisualizer />
        <CodeSnippets />
        <InstallationGuide />
        <LiveDemo />
        <DocsExplorer />
      </div>
    </main>
  );
}
