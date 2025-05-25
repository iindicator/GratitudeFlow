'use server';

/**
 * @fileOverview This file contains a Genkit flow that generates AI-powered journal prompts based on daily principles.
 *
 * - generateJournalPrompt - A function that generates a journal prompt based on the provided daily principle.
 * - GenerateJournalPromptInput - The input type for the generateJournalPrompt function.
 * - GenerateJournalPromptOutput - The output type for the generateJournalPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJournalPromptInputSchema = z.object({
  dailyPrinciple: z
    .string()
    .describe('A daily principle to base the journal prompt on.'),
});
export type GenerateJournalPromptInput = z.infer<typeof GenerateJournalPromptInputSchema>;

const GenerateJournalPromptOutputSchema = z.object({
  prompt: z.string().describe('The generated journal prompt.'),
});
export type GenerateJournalPromptOutput = z.infer<typeof GenerateJournalPromptOutputSchema>;

export async function generateJournalPrompt(
  input: GenerateJournalPromptInput
): Promise<GenerateJournalPromptOutput> {
  return generateJournalPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJournalPromptPrompt',
  input: {schema: GenerateJournalPromptInputSchema},
  output: {schema: GenerateJournalPromptOutputSchema},
  prompt: `You are an AI journal prompt generator. Your task is to create a thought-provoking and introspective journal prompt based on the given daily principle.

Daily Principle: {{{dailyPrinciple}}}

Journal Prompt:`,
});

const generateJournalPromptFlow = ai.defineFlow(
  {
    name: 'generateJournalPromptFlow',
    inputSchema: GenerateJournalPromptInputSchema,
    outputSchema: GenerateJournalPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
