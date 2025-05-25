"use client";

import React, { useState, useTransition } from 'react';
import { dailyPrinciplesData } from '@/lib/data';
import type { Principle } from '@/types';
import { generateJournalPrompt, GenerateJournalPromptOutput } from '@/ai/flows/generate-journal-prompt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

export function JournalPromptGenerator() {
  const [selectedPrincipleId, setSelectedPrincipleId] = useState<string>(dailyPrinciplesData[0]?.id || '');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGeneratePrompt = async () => {
    if (!selectedPrincipleId) {
      toast({
        title: "Select a Principle",
        description: "Please choose a daily principle to generate a prompt.",
        variant: "destructive",
      });
      return;
    }

    const principle = dailyPrinciplesData.find(p => p.id === selectedPrincipleId);
    if (!principle) return;

    startTransition(async () => {
      try {
        const result: GenerateJournalPromptOutput = await generateJournalPrompt({ dailyPrinciple: principle.text });
        setGeneratedPrompt(result.prompt);
        toast({
          title: "Prompt Generated!",
          description: "Your journal prompt is ready.",
        });
      } catch (error) {
        console.error("Error generating journal prompt:", error);
        toast({
          title: "Error",
          description: "Failed to generate journal prompt. Please try again.",
          variant: "destructive",
        });
        setGeneratedPrompt('');
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Wand2 className="text-primary h-7 w-7" />
          AI Journal Prompt Generator
        </CardTitle>
        <CardDescription>
          Select a daily principle and let AI craft a thoughtful journal prompt for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="principle-select" className="block text-sm font-medium text-foreground mb-1">
            Choose a Daily Principle
          </label>
          <Select value={selectedPrincipleId} onValueChange={setSelectedPrincipleId}>
            <SelectTrigger id="principle-select" className="w-full">
              <SelectValue placeholder="Select a principle" />
            </SelectTrigger>
            <SelectContent>
              {dailyPrinciplesData.map((principle: Principle) => (
                <SelectItem key={principle.id} value={principle.id}>
                  {principle.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleGeneratePrompt} disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Generate Prompt
        </Button>

        {generatedPrompt && (
          <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold text-foreground">Your Journal Prompt:</h3>
            <Textarea
              value={generatedPrompt}
              readOnly
              rows={5}
              className="bg-muted/50 border-primary focus:ring-primary"
              aria-label="Generated journal prompt"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Reflect on the prompt to deepen your understanding and personal growth.
        </p>
      </CardFooter>
    </Card>
  );
}
