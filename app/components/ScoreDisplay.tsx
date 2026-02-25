"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useScore } from "@/app/contexts/ScoreContext";
import { toDisplayNumber } from "@/app/lib/utils";

export function ScoreDisplay() {
  const { score, resetScore } = useScore();

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg/20 px-4 py-2 select-none"
      aria-live="polite"
      aria-label={`Score: ${toDisplayNumber(score)} points`}
    >
      <span className="font-semibold text-xl md:text-2xl">Score:</span>
      <span className="px-2 py-0.5 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 text-[#042f2e] font-extrabold text-2xl md:text-3xl min-w-[2.5rem] text-center">
        {toDisplayNumber(score)}
      </span>
      <button
        type="button"
        onClick={resetScore}
        className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-teal-600"
        aria-label="Reset score"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4" />
      </button>
    </div>
  );
}
