"use client";

import GameBoardPlottingPoints from "@/app/components/gameBoards/GameBoardPlottingPoints";
import { GamePageLayout } from "@/app/components/GamePageLayout";

export default function PlottingPointsPage() {
  return (
    <GamePageLayout>
      <GameBoardPlottingPoints />
    </GamePageLayout>
  );
}
