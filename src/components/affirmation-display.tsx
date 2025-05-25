"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Affirmation, Principle } from '@/types';

interface AffirmationDisplayProps {
  title: string;
  items: (Affirmation | Principle)[];
  icon?: React.ReactNode;
  autoplayDuration?: number; // in milliseconds
}

export function AffirmationDisplay({ title, items, icon, autoplayDuration }: AffirmationDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (autoplayDuration && items.length > 1) {
      const timer = setInterval(() => {
        handleNext();
      }, autoplayDuration);
      return () => clearInterval(timer);
    }
  }, [autoplayDuration, items.length]);
  
  if (!items || items.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No items to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-primary-foreground bg-primary p-4 rounded-t-md">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center text-center p-6">
        <p className="text-2xl lg:text-3xl font-medium leading-relaxed">
          {items[currentIndex].text}
        </p>
      </CardContent>
      {items.length > 1 && (
        <CardFooter className="flex justify-center gap-4 p-4 border-t">
          <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous Affirmation">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next Affirmation">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
