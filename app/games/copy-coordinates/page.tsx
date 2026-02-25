"use client";

import { GamePageLayout } from "@/app/components/GamePageLayout";
import GameBoardCopyCoordinates from "@/app/components/gameBoards/GameBoardCopyCoordinates";

export default function CopyCoordinatesPage() {
  return (
    <GamePageLayout>
      <GameBoardCopyCoordinates />
    </GamePageLayout>
  );
}
