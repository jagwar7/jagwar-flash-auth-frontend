import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function DocsExplorer() {
  return (
    <section id="docs" className="text-center">
      <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">
        Explore the Docs
      </h2>
      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
        Find everything you need to know about the FlashAuth SDK in our comprehensive documentation.
      </p>
      <div className="mt-8 max-w-xl mx-auto flex w-full items-center space-x-2">
        <Input
          type="search"
          placeholder="Search documentation... (Coming Soon)"
          className="bg-card"
          disabled
        />
        <Button type="submit" disabled>
          <BookOpen className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </section>
  );
}
