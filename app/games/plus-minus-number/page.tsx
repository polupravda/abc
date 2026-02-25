"use client";

import GameBoardPlusMinusNumber from "@/app/components/gameBoards/GameBoardPlusMinusNumber";
import { GamePageLayout } from "@/app/components/GamePageLayout";

export default function PlusMinusNumberPage() {
  return (
    <GamePageLayout>
      <GameBoardPlusMinusNumber />
    </GamePageLayout>
  );
}
