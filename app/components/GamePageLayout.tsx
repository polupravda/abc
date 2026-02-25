"use client";

import React from "react";

interface GamePageLayoutProps {
  children: React.ReactNode;
}

export const GamePageLayout: React.FC<GamePageLayoutProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white relative h-full">
      {children}
    </main>
  );
};
