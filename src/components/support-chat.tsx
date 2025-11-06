'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare, Send } from 'lucide-react';

export default function SupportChat() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="primary"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-7 w-7 text-primary-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Support Chat</h4>
            <p className="text-sm text-muted-foreground">
              How can we help you today?
            </p>
          </div>
          <div className="space-y-4 h-48 overflow-y-auto p-2 border rounded-md bg-muted/50 text-sm">
            <div className="flex gap-2">
              <span className="font-bold">AI Bot:</span>
              <span>Welcome to FlashAuth support!</span>
            </div>
             <div className="flex gap-2">
              <span className="font-bold">AI Bot:</span>
              <span>Ask me anything about our SDK.</span>
            </div>
          </div>
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-10" />
            <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
                <Send className="h-4 w-4"/>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
