"use client";

import React from "react";
import GameBoardMathAddition from "@/app/components/GameBoardMathAddition"; // Using alias

const MathAdditionPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 md:p-8">
      <GameBoardMathAddition />
    </main>
  );
};

export default MathAdditionPage;
