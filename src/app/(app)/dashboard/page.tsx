// Ensure this component is a client component
"use client"; 

import React, { useState, useEffect } from 'react';
import { AffirmationDisplay } from '@/components/affirmation-display';
import { morningAffirmationsData, eveningAffirmationsData, dailyPrinciplesData } from '@/lib/data';
import type { Principle } from '@/types';
import { Sunrise, Sunset, Star } from 'lucide-react';

export default function DashboardPage() {
  const [dailyPrinciple, setDailyPrinciple] = useState<Principle | null>(null);

  useEffect(() => {
    // Select a random principle on the client side after hydration
    if (dailyPrinciplesData.length > 0) {
      setDailyPrinciple(dailyPrinciplesData[Math.floor(Math.random() * dailyPrinciplesData.length)]);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Daily GratitudeFlow</h1>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <AffirmationDisplay 
          title="Morning Affirmations" 
          items={morningAffirmationsData} 
          icon={<Sunrise className="h-6 w-6" />}
          autoplayDuration={10000} // Rotate every 10 seconds
        />
        <AffirmationDisplay 
          title="Daily Principle" 
          items={dailyPrinciple ? [dailyPrinciple] : []} // Display a single principle, or allow rotation
          icon={<Star className="h-6 w-6" />}
        />
        <AffirmationDisplay 
          title="Evening Affirmations" 
          items={eveningAffirmationsData} 
          icon={<Sunset className="h-6 w-6" />}
          autoplayDuration={12000} // Rotate every 12 seconds
        />
      </div>
    </div>
  );
}
