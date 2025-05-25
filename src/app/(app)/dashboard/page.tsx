import { AffirmationDisplay } from '@/components/affirmation-display';
import { morningAffirmationsData, eveningAffirmationsData, dailyPrinciplesData } from '@/lib/data';
import { Sunrise, Sunset, Star } from 'lucide-react';

export default function DashboardPage() {
  // For principles, we can show one random principle or cycle through them
  // For simplicity, let's pick one for now.
  const dailyPrinciple = dailyPrinciplesData[Math.floor(Math.random() * dailyPrinciplesData.length)];

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
          items={[dailyPrinciple]} // Display a single principle, or allow rotation
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
