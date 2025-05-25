"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">
        {error.message || "An unexpected error occurred while loading journal prompts."}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
