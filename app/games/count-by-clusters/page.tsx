"use client";

import { GamePageLayout } from "@/app/components/GamePageLayout";
import GameBoardCountByClusters from "@/app/components/gameBoards/GameBoardCountByClusters";

export default function CountByClustersPage() {
  return (
    <GamePageLayout>
      <GameBoardCountByClusters />
    </GamePageLayout>
  );
}

