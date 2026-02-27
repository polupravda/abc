"use client";

import { GamePageLayout } from "@/app/components/GamePageLayout";
import GameBoardNumberBonds from "@/app/components/gameBoards/GameBoardNumberBonds";

export default function NumberBondsPage() {
  return (
    <GamePageLayout>
      <GameBoardNumberBonds />
    </GamePageLayout>
  );
}

