"use client";

import GameBoardMultiplication from "@/app/components/gameBoards/GameBoardMultiplication";
import { GamePageLayout } from "@/app/components/GamePageLayout";

export default function MultiplicationPage() {
  return (
    <GamePageLayout>
      <GameBoardMultiplication />
    </GamePageLayout>
  );
}
