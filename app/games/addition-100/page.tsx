"use client";

import React from "react";
import GameBoardMathAddition100 from "@/app/components/gameBoards/GameBoardMathAddition100";
import { GamePageLayout } from "@/app/components/GamePageLayout";

/** Legacy route: same as addition-100-no-carry. Kept so old links still work. */
const Addition100Page: React.FC = () => {
  return (
    <GamePageLayout>
      <GameBoardMathAddition100
        variant="noCarrying"
        headlineText="Addition up to 100 (no carrying)"
      />
    </GamePageLayout>
  );
};

export default Addition100Page;
