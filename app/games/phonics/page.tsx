"use client";

import GameBoardPhonics from "@/app/components/gameBoards/GameBoardPhonics";

export default function PhonicsGamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white relative h-full">
      <GameBoardPhonics />
    </main>
  );
}
