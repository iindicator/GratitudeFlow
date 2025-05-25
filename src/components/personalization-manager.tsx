"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { Affirmation, Principle, AffirmationType } from '@/types';
import { morningAffirmationsData, eveningAffirmationsData, dailyPrinciplesData } from '@/lib/data';
import { PlusCircle, Trash2 } from 'lucide-react';

type ItemType = 'morningAffirmations' | 'eveningAffirmations' | 'dailyPrinciples';

export function PersonalizationManager() {
  const { toast } = useToast();
  const [morningAffirmations, setMorningAffirmations] = useState<Affirmation[]>(morningAffirmationsData);
  const [eveningAffirmations, setEveningAffirmations] = useState<Affirmation[]>(eveningAffirmationsData);
  const [dailyPrinciples, setDailyPrinciples] = useState<Principle[]>(dailyPrinciplesData);

  const [newMorningText, setNewMorningText] = useState('');
  const [newEveningText, setNewEveningText] = useState('');
  const [newPrincipleText, setNewPrincipleText] = useState('');

  const addItem = (type: ItemType) => {
    const text = type === 'morningAffirmations' ? newMorningText : type === 'eveningAffirmations' ? newEveningText : newPrincipleText;
    if (!text.trim()) {
      toast({ title: "Error", description: "Text cannot be empty.", variant: "destructive" });
      return;
    }

    const newItem = { id: `user-${Date.now()}`, text };

    if (type === 'morningAffirmations') {
      setMorningAffirmations(prev => [...prev, newItem]);
      setNewMorningText('');
    } else if (type === 'eveningAffirmations') {
      setEveningAffirmations(prev => [...prev, newItem]);
      setNewEveningText('');
    } else {
      setDailyPrinciples(prev => [...prev, newItem]);
      setNewPrincipleText('');
    }
    toast({ title: "Success", description: `${type.replace(/([A-Z])/g, ' $1').trim()} added.` });
  };
  
  const deleteItem = (type: ItemType, id: string) => {
    if (type === 'morningAffirmations') {
      setMorningAffirmations(prev => prev.filter(item => item.id !== id));
    } else if (type === 'eveningAffirmations') {
      setEveningAffirmations(prev => prev.filter(item => item.id !== id));
    } else {
      setDailyPrinciples(prev => prev.filter(item => item.id !== id));
    }
    toast({ title: "Deleted", description: "Item removed."});
  }

  const renderList = (items: (Affirmation | Principle)[], type: ItemType) => (
    <ScrollArea className="h-72 w-full rounded-md border p-4 bg-background">
      {items.length === 0 && <p className="text-muted-foreground text-center py-4">No items yet. Add some!</p>}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 group">
            <span className="text-sm">{item.text}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="opacity-50 group-hover:opacity-100" 
              onClick={() => deleteItem(type, item.id)}
              aria-label="Delete item"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );

  const renderAddForm = (type: ItemType) => {
    const [text, setText] = type === 'morningAffirmations' ? [newMorningText, setNewMorningText] :
                            type === 'eveningAffirmations' ? [newEveningText, setNewEveningText] :
                            [newPrincipleText, setNewPrincipleText];
    const placeholder = type === 'morningAffirmations' ? "New morning affirmation..." :
                        type === 'eveningAffirmations' ? "New evening affirmation..." :
                        "New daily principle...";
    return (
      <form onSubmit={(e) => { e.preventDefault(); addItem(type); }} className="flex gap-2 mt-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="flex-grow"
        />
        <Button type="submit" size="icon" aria-label={`Add new ${type.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`}>
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Personalize Your Content</CardTitle>
        <CardDescription>
          View, add, or remove your affirmations and daily principles. Changes are session-based.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="morning" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="morning">Morning Affirmations</TabsTrigger>
            <TabsTrigger value="evening">Evening Affirmations</TabsTrigger>
            <TabsTrigger value="principles">Daily Principles</TabsTrigger>
          </TabsList>
          <TabsContent value="morning" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Your Morning Affirmations</CardTitle></CardHeader>
              <CardContent>
                {renderList(morningAffirmations, 'morningAffirmations')}
                {renderAddForm('morningAffirmations')}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="evening" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Your Evening Affirmations</CardTitle></CardHeader>
              <CardContent>
                {renderList(eveningAffirmations, 'eveningAffirmations')}
                {renderAddForm('eveningAffirmations')}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="principles" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Your Daily Principles</CardTitle></CardHeader>
              <CardContent>
                {renderList(dailyPrinciples, 'dailyPrinciples')}
                {renderAddForm('dailyPrinciples')}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
