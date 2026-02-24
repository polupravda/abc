"use client";

import GameBoardPlusMinusNumber from "@/app/components/gameBoards/GameBoardPlusMinusNumber";

export default function PlusMinusNumberPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white relative h-full">
      <GameBoardPlusMinusNumber />
    </main>
  );
}
