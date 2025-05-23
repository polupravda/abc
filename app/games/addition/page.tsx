"use client";

import React from "react";
import GameBoardMathAddition from "@/app/components/GameBoardMathAddition"; // Using alias

const MathAdditionPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white relative h-full">
      <GameBoardMathAddition />
    </main>
  );
};

export default MathAdditionPage;
