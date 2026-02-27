"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GamePageLayout } from "@/app/components/GamePageLayout";
import { useScore } from "@/app/contexts/ScoreContext";
import GameBoardPlottingPoints from "@/app/components/gameBoards/GameBoardPlottingPoints";
import GameBoardDivideChocolateBar from "@/app/components/gameBoards/GameBoardDivideChocolateBar";
import GameBoardGreaterOrLess from "@/app/components/gameBoards/GameBoardGreaterOrLess";
import GameBoardCountByClusters from "@/app/components/gameBoards/GameBoardCountByClusters";
import GameBoardFewerMoreSame from "@/app/components/gameBoards/GameBoardFewerMoreSame";
import GameBoardWhichPictureNumber from "@/app/components/gameBoards/GameBoardWhichPictureNumber";
import GameBoardPlusMinusNumber from "@/app/components/gameBoards/GameBoardPlusMinusNumber";
import GameBoardOrdinalNumbers from "@/app/components/gameBoards/GameBoardOrdinalNumbers";
import GameBoardMathAddition from "@/app/components/gameBoards/GameBoardMathAddition";
import GameBoardMathAddition100 from "@/app/components/gameBoards/GameBoardMathAddition100";
import GameBoardMathSubtraction from "@/app/components/gameBoards/GameBoardMathSubtraction";
import GameBoardContinuePattern from "@/app/components/gameBoards/GameBoardContinuePattern";
import GameBoardCopyCoordinates from "@/app/components/gameBoards/GameBoardCopyCoordinates";
import GameBoardMathAddition3 from "@/app/components/gameBoards/GameBoardMathAddition3";
import GameBoardNumberBonds from "@/app/components/gameBoards/GameBoardNumberBonds";
import Link from "next/link";
import FeedbackSuccessAnimation from "@/app/components/FeedbackSuccessAnimation";

const TOTAL_ROUNDS = 20;

type JumboEntry = { id: string; render: () => React.ReactNode };

export default function JumboModePage() {
  const { score, resetScore } = useScore();
  const [roundIdx, setRoundIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  // Build pool of playable games (exclude Learn)
  const pool: JumboEntry[] = useMemo(
    () => [
      { id: "plotting-points", render: () => <GameBoardPlottingPoints /> },
      { id: "divide-chocolate-bar", render: () => <GameBoardDivideChocolateBar /> },
      { id: "greater-or-less", render: () => <GameBoardGreaterOrLess /> },
      { id: "count-by-clusters", render: () => <GameBoardCountByClusters /> },
      { id: "fewer-more-same", render: () => <GameBoardFewerMoreSame /> },
      { id: "which-picture-number", render: () => <GameBoardWhichPictureNumber /> },
      { id: "plus-minus-number", render: () => <GameBoardPlusMinusNumber /> },
      { id: "ordinal-numbers", render: () => <GameBoardOrdinalNumbers /> },
      { id: "addition-10", render: () => <GameBoardMathAddition /> },
      { id: "addition-100", render: () => <GameBoardMathAddition100 /> },
      { id: "subtraction-10", render: () => <GameBoardMathSubtraction /> },
      { id: "continue-pattern", render: () => <GameBoardContinuePattern /> },
      { id: "copy-coordinates", render: () => <GameBoardCopyCoordinates /> },
      { id: "add-3-to-10", render: () => <GameBoardMathAddition3 maxTotal={10} headline="Add 3 numbers (to 10)" /> },
      { id: "number-bonds", render: () => <GameBoardNumberBonds /> },
    ],
    []
  );

  // Client-only sequence (avoid SSR Math.random -> hydration mismatch)
  const [sequence, setSequence] = useState<JumboEntry[] | null>(null);
  useEffect(() => {
    const result: JumboEntry[] = [];
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      result.push(pick);
    }
    setSequence(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset score on first mount of Jumbo mode
  useEffect(() => {
    resetScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen to global "game success complete" to advance round
  useEffect(() => {
    const onComplete = () => {
      setRoundIdx((idx) => {
        const next = idx + 1;
        if (next >= TOTAL_ROUNDS) {
          setFinished(true);
          return idx; // keep last index
        }
        return next;
      });
    };
    window.addEventListener("abc-game-success-complete", onComplete as EventListener);
    return () => {
      window.removeEventListener("abc-game-success-complete", onComplete as EventListener);
    };
  }, []);

  const current = sequence ? sequence[roundIdx] : null;

  return (
    <GamePageLayout>
      <div className="relative w-full h-full">
        {/* Absolute progress bar */}
        {!finished && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[min(92vw,900px)] z-20">
            <div className="h-3 bg-slate-200/80 rounded-full shadow-inner overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-[width] duration-500"
                style={{ width: `${(roundIdx / TOTAL_ROUNDS) * 100}%` }}
                aria-label={`Progress ${roundIdx} of ${TOTAL_ROUNDS}`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={TOTAL_ROUNDS}
                aria-valuenow={roundIdx}
              />
            </div>
          </div>
        )}
        {!finished ? (
          <div className="w-full h-full">
            {/* Render selected game board */}
            {sequence && current ? (
              <div key={`${current.id}-${roundIdx}`} className="w-full h-full">
                {current.render()}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sky-700">
                Loading…
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-2xl text-center p-8">
            <div className="absolute inset-0 pointer-events-none">
              <FeedbackSuccessAnimation show={true} />
            </div>
            <div className="text-5xl md:text-6xl font-extrabold text-emerald-600 mb-6">
              Congratulations!
            </div>
            <div className="text-3xl md:text-4xl font-bold text-sky-900 mb-10">
              Score: {score}
            </div>
            <Link
              href="/"
              className="px-8 py-4 rounded-2xl text-2xl font-bold text-white shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </GamePageLayout>
  );
}

