"use client";

import GameBoardPhonics from "@/app/components/GameBoardPhonics";

export default function PhonicsGamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-800 p-4">
      <GameBoardPhonics />
    </main>
  );
}
