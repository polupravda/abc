"use client";

import React from "react";
import { ScoreProvider } from "@/app/contexts/ScoreContext";
import { ScoreDisplay } from "@/app/components/ScoreDisplay";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ScoreProvider>
      <ScoreDisplay />
      {children}
    </ScoreProvider>
  );
}
