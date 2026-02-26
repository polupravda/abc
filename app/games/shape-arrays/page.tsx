"use client";

import { GamePageLayout } from "@/app/components/GamePageLayout";
import GameBoardCountByClusters from "@/app/components/gameBoards/GameBoardCountByClusters";

export default function ShapeArraysPage() {
  return (
    <GamePageLayout>
      <GameBoardCountByClusters />
    </GamePageLayout>
  );
}

