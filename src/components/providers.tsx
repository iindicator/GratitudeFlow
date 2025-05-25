"use client";

import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  return <>{children}</>; // Placeholder if no specific client-side providers are needed yet
}
