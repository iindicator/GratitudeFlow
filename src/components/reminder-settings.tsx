"use client";

import React, { useState, useTransition } from 'react';
import { suggestReminderTime, SuggestReminderTimeOutput } from '@/ai/flows/suggest-reminder-time';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, Clock } from 'lucide-react';

export function ReminderSettings() {
  const [userPreferences, setUserPreferences] = useState<string>('');
  const [suggestedTime, setSuggestedTime] = useState<SuggestReminderTimeOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [morningReminder, setMorningReminder] = useState<string>('08:00');
  const [middayReminder, setMiddayReminder] = useState<string>('13:00');
  const [eveningReminder, setEveningReminder] = useState<string>('21:00');


  const handleSuggestTime = async () => {
    if (!userPreferences.trim()) {
      toast({
        title: "Enter Preferences",
        description: "Please describe your daily schedule and preferences for reminders.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await suggestReminderTime({ userPreferences });
        setSuggestedTime(result);
        toast({
          title: "Suggestion Ready!",
          description: "AI has suggested an optimal reminder time.",
        });
      } catch (error) {
        console.error("Error suggesting reminder time:", error);
        toast({
          title: "Error",
          description: "Failed to suggest reminder time. Please try again.",
          variant: "destructive",
        });
        setSuggestedTime(null);
      }
    });
  };

  const handleSaveReminders = () => {
    // In a real app, this would save to a backend or local storage
    // And potentially schedule actual notifications
    console.log("Reminders to save:", { morningReminder, middayReminder, eveningReminder });
    toast({
      title: "Reminders Updated",
      description: "Your reminder times have been noted. (Actual notifications not implemented in this demo).",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="w-full shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lightbulb className="text-primary h-7 w-7" />
            AI Reminder Time Suggester
          </CardTitle>
          <CardDescription>
            Let AI help you find the best times for your affirmations based on your day.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="user-preferences" className="block text-sm font-medium text-foreground mb-1">
              Your Daily Schedule & Preferences
            </Label>
            <Textarea
              id="user-preferences"
              value={userPreferences}
              onChange={(e) => setUserPreferences(e.target.value)}
              placeholder="e.g., I wake up at 7 AM, work from 9 AM to 5 PM, prefer a moment of calm mid-morning and before bed..."
              rows={5}
              className="focus:ring-primary"
            />
          </div>
          
          <Button onClick={handleSuggestTime} disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Suggest Optimal Time
          </Button>

          {suggestedTime && (
            <div className="space-y-3 pt-4 p-4 bg-muted/50 rounded-md border border-primary">
              <h3 className="text-lg font-semibold text-foreground">AI Suggestion:</h3>
              <p>
                <strong>Suggested Time:</strong> <span className="text-primary font-bold">{suggestedTime.suggestedTime}</span>
              </p>
              <p>
                <strong>Reasoning:</strong> {suggestedTime.reasoning}
              </p>
              <Button variant="outline" size="sm" onClick={() => {
                if(suggestedTime.suggestedTime.match(/^\d{2}:\d{2}$/)) {
                  setMiddayReminder(suggestedTime.suggestedTime); // Example: set midday reminder
                  toast({ title: "Time Applied", description: `Midday reminder set to ${suggestedTime.suggestedTime}`});
                }
              }}>
                Apply to Midday Reminder
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            AI suggestions are based on the information you provide.
          </p>
        </CardFooter>
      </Card>

      <Card className="w-full shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Clock className="text-accent h-7 w-7" />
            Set Your Reminder Times
          </CardTitle>
          <CardDescription>
            Choose when you'd like to receive your affirmation reminders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <Label htmlFor="morning-reminder">Morning Reminder</Label>
                <Input id="morning-reminder" type="time" value={morningReminder} onChange={e => setMorningReminder(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="midday-reminder">Midday Reminder</Label>
                <Input id="midday-reminder" type="time" value={middayReminder} onChange={e => setMiddayReminder(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="evening-reminder">Evening Reminder</Label>
                <Input id="evening-reminder" type="time" value={eveningReminder} onChange={e => setEveningReminder(e.target.value)} />
            </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch space-y-2">
           <Button onClick={handleSaveReminders} className="w-full">Save Reminders</Button>
           <p className="text-xs text-muted-foreground text-center pt-2">
            Actual in-app notifications require further setup. These settings are for demonstration.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
