"use client";

import GameBoardCoordinates from "@/app/components/gameBoards/GameBoardCoordinates";
import { GamePageLayout } from "@/app/components/GamePageLayout";

export default function CoordinatesPage() {
  return (
    <GamePageLayout>
      <GameBoardCoordinates />
    </GamePageLayout>
  );
}
