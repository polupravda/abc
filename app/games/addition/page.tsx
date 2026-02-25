"use client";

import React from "react";
import GameBoardMathAddition from "@/app/components/gameBoards/GameBoardMathAddition";
import { GamePageLayout } from "@/app/components/GamePageLayout";

const MathAdditionPage: React.FC = () => {
  return (
    <GamePageLayout>
      <GameBoardMathAddition />
    </GamePageLayout>
  );
};

export default MathAdditionPage;
