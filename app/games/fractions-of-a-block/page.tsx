"use client";

import React from "react";
import GameBoardFractionsOfABlock from "@/app/components/gameBoards/GameBoardFractionsOfABlock";
import { GamePageLayout } from "@/app/components/GamePageLayout";

export default function FractionsOfABlockPage() {
  return (
    <GamePageLayout>
      <GameBoardFractionsOfABlock />
    </GamePageLayout>
  );
}
