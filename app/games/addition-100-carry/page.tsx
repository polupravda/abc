"use client";

import React from "react";
import GameBoardMathAddition100 from "@/app/components/gameBoards/GameBoardMathAddition100";
import { GamePageLayout } from "@/app/components/GamePageLayout";

const Addition100CarryPage: React.FC = () => {
  return (
    <GamePageLayout>
      <GameBoardMathAddition100
        variant="withCarrying"
        headlineText="Addition up to 100 (with carrying)"
      />
    </GamePageLayout>
  );
};

export default Addition100CarryPage;
