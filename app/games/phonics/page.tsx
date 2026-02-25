"use client";

import GameBoardPhonics from "@/app/components/gameBoards/GameBoardPhonics";
import { GamePageLayout } from "@/app/components/GamePageLayout";

export default function PhonicsGamePage() {
  return (
    <GamePageLayout>
      <GameBoardPhonics />
    </GamePageLayout>
  );
}
