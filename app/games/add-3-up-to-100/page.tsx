"use client";

import { GamePageLayout } from "@/app/components/GamePageLayout";
import GameBoardMathAddition3 from "@/app/components/gameBoards/GameBoardMathAddition3";

export default function Add3UpTo100Page() {
  return (
    <GamePageLayout>
      <GameBoardMathAddition3 maxTotal={100} headline="Add 3 numbers (to 100)" />
    </GamePageLayout>
  );
}

