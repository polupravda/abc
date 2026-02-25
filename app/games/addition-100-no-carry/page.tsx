"use client";

import React from "react";
import GameBoardMathAddition100 from "@/app/components/gameBoards/GameBoardMathAddition100";
import { GamePageLayout } from "@/app/components/GamePageLayout";

const Addition100NoCarryPage: React.FC = () => {
  return (
    <GamePageLayout>
      <GameBoardMathAddition100
        variant="noCarrying"
        headlineText="Addition up to 100 (no carrying)"
      />
    </GamePageLayout>
  );
};

export default Addition100NoCarryPage;
