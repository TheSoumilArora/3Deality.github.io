// src/pages/_app.tsx
"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";      // ← import your Navbar
import type { AppProps } from "next/app";
import "../styles/global.css";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Site-wide Navbar */}
        <Navbar />

        {/* Global toasters */}
        <Toaster />
        <Sonner />
        {/* single wrapper that pushes everything down by 6rem (96px) */}
        <div className="pt-24">
          <Component {...pageProps} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}