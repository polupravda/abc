"use client";

import React from "react";

const COLS = 10;
const DEFAULT_CELL_SIZE_PX = 12;
const DEFAULT_GAP_PX = 2;

/** Grid representation of a number up to 100: 10s as pink squares (rows of 10), 1s as yellow squares. */
export const NumberPictureGrid: React.FC<{
  number: number;
  cellSize?: number;
  gapPx?: number;
  className?: string;
}> = ({
  number: n,
  cellSize = DEFAULT_CELL_SIZE_PX,
  gapPx = DEFAULT_GAP_PX,
  className = "",
}) => {
  const tens = Math.floor(n / 10);
  const ones = n % 10;

  const cells: { color: "pink" | "yellow" }[] = [];
  for (let i = 0; i < tens; i++) {
    for (let c = 0; c < COLS; c++) cells.push({ color: "pink" });
  }
  for (let c = 0; c < ones; c++) cells.push({ color: "yellow" });

  return (
    <div
      className={`inline-grid justify-start items-start ${className}`}
      style={{
        gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
        gap: `${gapPx}px`,
      }}
      role="img"
      aria-label={`${n}: ${tens} tens and ${ones} ones`}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className={`rounded-sm shrink-0 ${
            cell.color === "pink"
              ? "bg-pink-400 border border-pink-500"
              : "bg-amber-300 border border-amber-400"
          }`}
          style={{ width: cellSize, height: cellSize }}
        />
      ))}
    </div>
  );
};
