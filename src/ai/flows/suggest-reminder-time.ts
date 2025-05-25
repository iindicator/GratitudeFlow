'use server';

/**
 * @fileOverview A flow to suggest the optimal time to send affirmation reminders based on user preferences.
 *
 * - suggestReminderTime - A function that suggests the optimal reminder time.
 * - SuggestReminderTimeInput - The input type for the suggestReminderTime function.
 * - SuggestReminderTimeOutput - The return type for the suggestReminderTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestReminderTimeInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user preferences, including their daily schedule, preferred times for affirmations, and any other relevant information.'
    ),
});
export type SuggestReminderTimeInput = z.infer<typeof SuggestReminderTimeInputSchema>;

const SuggestReminderTimeOutputSchema = z.object({
  suggestedTime: z
    .string()
    .describe(
      'The suggested time to send the affirmation reminder, in HH:MM format (e.g., 08:00 for 8:00 AM).'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested time, explaining why it is optimal based on the user preferences.'
    ),
});
export type SuggestReminderTimeOutput = z.infer<typeof SuggestReminderTimeOutputSchema>;

export async function suggestReminderTime(input: SuggestReminderTimeInput): Promise<SuggestReminderTimeOutput> {
  return suggestReminderTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestReminderTimePrompt',
  input: {schema: SuggestReminderTimeInputSchema},
  output: {schema: SuggestReminderTimeOutputSchema},
  prompt: `You are an AI assistant that suggests the optimal time to send affirmation reminders to users.

  Based on the user preferences provided, determine the best time to send the reminder, and explain your reasoning.

  User Preferences: {{{userPreferences}}}
  `,
});

const suggestReminderTimeFlow = ai.defineFlow(
  {
    name: 'suggestReminderTimeFlow',
    inputSchema: SuggestReminderTimeInputSchema,
    outputSchema: SuggestReminderTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
