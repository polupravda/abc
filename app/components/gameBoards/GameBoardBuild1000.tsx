"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { toDisplayNumber } from "@/app/lib/utils";

const MAX_TOTAL = 1000;

type BlockType = "one" | "ten" | "hundred";

function regroup(
  ones: number,
  tens: number,
  hundreds: number
): { ones: number; tens: number; hundreds: number } {
  let o = ones;
  let t = tens;
  let h = Math.min(hundreds, 10);
  while (o >= 10) {
    o -= 10;
    t += 1;
  }
  while (t >= 10) {
    t -= 10;
    h += 1;
  }
  h = Math.min(h, 10);
  return { ones: o, tens: t, hundreds: h };
}

/** Single unit size in px; no gap so blocks fit together seamlessly */
const UNIT = 18;
const BORDER_COLOR = "#b91c1c"; /* red-600 */

const cellStyle = (
  bg: string
): React.CSSProperties => ({
  width: UNIT,
  height: UNIT,
  boxSizing: "border-box",
  boxShadow: `inset 0 0 0 1px ${BORDER_COLOR}`,
  backgroundColor: bg,
});

/** Single unit: red bg, red border (for ones) */
const BlockOne: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`shrink-0 ${className}`}
    style={cellStyle("#ef4444")}
    aria-hidden
  />
);

/** Single unit in a ten rod: white bg, red border */
const BlockTenUnit: React.FC = () => (
  <div className="shrink-0" style={cellStyle("#ffffff")} aria-hidden />
);

/** Vertical ten rod: 10 units stacked, no gap — aligns with hundred */
const BlockTen: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`flex flex-col shrink-0 ${className}`}
    style={{ width: UNIT, height: 10 * UNIT }}
    aria-hidden
  >
    {Array.from({ length: 10 }).map((_, i) => (
      <BlockTenUnit key={i} />
    ))}
  </div>
);

/** Hundred flat: 10×10 grid, no gap/padding — aligns with rod and ones */
const BlockHundred: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`inline-grid shrink-0 ${className}`}
    style={{
      gridTemplateColumns: `repeat(10, ${UNIT}px)`,
      gridTemplateRows: `repeat(10, ${UNIT}px)`,
      width: 10 * UNIT,
      height: 10 * UNIT,
    }}
    aria-hidden
  >
    {Array.from({ length: 100 }).map((_, i) => (
      <div
        key={i}
        className="shrink-0"
        style={cellStyle(i % 2 === 0 ? "#fecdd3" : "#fb7185")}
      />
    ))}
  </div>
);

/** Bracket indicator: 0.5 block shorter on left and right (total width 9*UNIT), both uprights, base at bottom */
const HundredIndicator: React.FC = () => {
  const inset = 0.5 * UNIT; /* shorter by half a block on each side */
  const w = 10 * UNIT - 2 * inset; /* 9*UNIT */
  const h = 10;
  const r = 2;
  return (
    <div
      className="flex flex-col items-center shrink-0"
      style={{ width: 10 * UNIT }}
      aria-hidden
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="text-sky-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d={`M 0 2 L 0 ${h - r} Q 0 ${h} ${r} ${h} L ${w - r} ${h} Q ${w} ${h} ${w} ${h - r} L ${w} 2`}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xs font-semibold text-sky-700 mt-0.5">100</span>
    </div>
  );
};

/** Reserved width for left column (100 label + vertical bracket) so row 1 and row 2 align */
const RESERVED_LEFT_PX = 44;

/** Vertical bracket + "100" label for the left of row 2+ (same height as one hundred block) */
const VerticalBracketIndicator: React.FC = () => {
  const blockH = 10 * UNIT;
  const bracketW = 10;
  const r = 2;
  return (
    <div
      className="flex items-center shrink-0 gap-1"
      style={{ height: blockH, width: RESERVED_LEFT_PX, minWidth: RESERVED_LEFT_PX }}
      aria-hidden
    >
      <span className="text-xs font-semibold text-sky-700 shrink-0">100</span>
      <svg
        width={bracketW}
        height={blockH}
        viewBox={`0 0 ${bracketW} ${blockH}`}
        className="text-sky-700 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d={`M ${r} 0 Q 0 0 0 ${r} L 0 ${blockH - r} Q 0 ${blockH} ${r} ${blockH}`}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

type Counts = { ones: number; tens: number; hundreds: number };

const addBlockAndRegroup = (
  counts: Counts,
  type: BlockType
): Counts => {
  let { ones, tens, hundreds } = counts;
  if (type === "one") ones += 1;
  else if (type === "ten") tens += 1;
  else if (type === "hundred") hundreds += 1;
  const next = regroup(ones, tens, hundreds);
  const nextTotal =
    next.ones + next.tens * 10 + next.hundreds * 100;
  if (nextTotal > MAX_TOTAL) return counts;
  return next;
};

const GameBoardBuild1000: React.FC = () => {
  const [counts, setCounts] = useState<Counts>({
    ones: 0,
    tens: 0,
    hundreds: 0,
  });
  const matRef = useRef<HTMLDivElement | null>(null);
  const [matWidth, setMatWidth] = useState(0);

  const { ones, tens, hundreds } = counts;
  const total =
    toDisplayNumber(ones) +
    toDisplayNumber(tens) * 10 +
    toDisplayNumber(hundreds) * 100;

  const handleDragStartFromPalette = useCallback(
    (e: React.DragEvent, type: BlockType) => {
      e.dataTransfer.setData("blockType", type);
      e.dataTransfer.setData("fromMat", "false");
      e.dataTransfer.effectAllowed = "copy";
    },
    []
  );

  const handleDragStartFromMat = useCallback(
    (e: React.DragEvent, type: BlockType) => {
      e.dataTransfer.setData("blockType", type);
      e.dataTransfer.setData("fromMat", "true");
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect =
      e.dataTransfer.getData("fromMat") === "true" ? "move" : "copy";
  }, []);

  const handleDropOnMat = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.getData("fromMat") === "true") return;
    const type = e.dataTransfer.getData("blockType") as BlockType | "";
    if (type === "one" || type === "ten" || type === "hundred") {
      setCounts((prev) => addBlockAndRegroup(prev, type));
    }
  }, []);

  const removeBlock = useCallback((type: BlockType) => {
    setCounts((prev) => ({
      ...prev,
      ones: Math.max(0, prev.ones - (type === "one" ? 1 : 0)),
      tens: Math.max(0, prev.tens - (type === "ten" ? 1 : 0)),
      hundreds: Math.max(0, prev.hundreds - (type === "hundred" ? 1 : 0)),
    }));
  }, []);

  const handleDropOnRemove = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.getData("fromMat") !== "true") return;
    const type = e.dataTransfer.getData("blockType") as BlockType | "";
    if (type === "one" || type === "ten" || type === "hundred") {
      removeBlock(type);
    }
  }, [removeBlock]);

  const clearMat = useCallback(() => {
    setCounts({ ones: 0, tens: 0, hundreds: 0 });
  }, []);

  useEffect(() => {
    const el = matRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setMatWidth(el.getBoundingClientRect().width);
    });
    ro.observe(el);
    setMatWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const matPaddingPx = 32; /* p-4 = 16 each side */
  const contentWidth = Math.max(0, matWidth - matPaddingPx);
  const fitWithoutReserved = Math.max(
    0,
    Math.floor((contentWidth - (tens + ones) * UNIT) / (10 * UNIT))
  );
  const needsRow2 = contentWidth > 0 && hundreds > fitWithoutReserved;
  const row1Hundreds =
    contentWidth > 0
      ? needsRow2
        ? Math.min(
            hundreds,
            Math.max(
              0,
              Math.floor(
                (contentWidth -
                  RESERVED_LEFT_PX -
                  (tens + ones) * UNIT) /
                  (10 * UNIT)
              )
            )
          )
        : Math.min(hundreds, fitWithoutReserved)
      : hundreds;
  const row2Hundreds = hundreds - row1Hundreds;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      <div className="h-auto max-h-[90vh] mb-10 w-full px-2">
        <div className="w-full mx-auto max-w-[min(72rem,95vw)]">
          <HeadlineInstruction
            headlineText="Build with base-10 blocks. Drag ones, tens, and hundreds onto the mat."
            instructionText="Build with base-10 blocks. Drag ones, tens, and hundreds onto the mat. Watch how 10 ones become 1 ten, and 10 tens become 1 hundred."
            className="text-left mb-2"
          />
          <CardLight className="w-full p-4">
            <div className="flex flex-col gap-6">
              {/* Row 1: Draggable elements + result number + Clear */}
              <div className="flex flex-wrap items-center gap-4 p-2">
                <div
                  className="flex flex-wrap items-center gap-4"
                  aria-label="Block palette"
                >
                  <div
                    draggable
                    onDragStart={(e) => handleDragStartFromPalette(e, "one")}
                    className="cursor-grab active:cursor-grabbing flex items-center gap-2 p-2 rounded-md hover:bg-slate-100/70 transition-colors"
                    aria-label="Add one"
                  >
                    <BlockOne />
                    <span className="text-sm font-medium text-sky-900">1</span>
                  </div>
                  <div
                    draggable
                    onDragStart={(e) => handleDragStartFromPalette(e, "ten")}
                    className="cursor-grab active:cursor-grabbing flex items-center gap-2 p-2 rounded-md hover:bg-slate-100/70 transition-colors"
                    aria-label="Add ten"
                  >
                    <BlockTen />
                    <span className="text-sm font-medium text-sky-900">10</span>
                  </div>
                  <div
                    draggable
                    onDragStart={(e) => handleDragStartFromPalette(e, "hundred")}
                    className="cursor-grab active:cursor-grabbing flex items-center gap-2 p-2 rounded-md hover:bg-slate-100/70 transition-colors"
                    aria-label="Add hundred"
                  >
                    <BlockHundred />
                    <span className="text-sm font-medium text-sky-900">100</span>
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-sky-950 tabular-nums">
                  {toDisplayNumber(total)}
                </div>
                {total > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={clearMat}
                      className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-sky-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
                      aria-label="Clear mat"
                    >
                      <FontAwesomeIcon icon={faRotateLeft} className="w-5 h-5" />
                    </button>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDropOnRemove}
                      className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-dashed border-slate-400 bg-slate-100 text-slate-500 transition-colors hover:border-slate-500 hover:bg-slate-200"
                      aria-label="Remove block from mat (drag block here)"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                    </div>
                  </>
                )}
              </div>

              {/* Row 2: Mat (full width) */}
              <div className="min-h-[200px]">
                <div
                  ref={matRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDropOnMat}
                  className="flex-1 min-w-0 min-h-[200px] rounded-xl border-2 border-dashed border-sky-400 bg-gradient-to-br from-sky-50 to-indigo-100 p-4 transition-colors focus-within:ring-2 focus-within:ring-sky-400 overflow-hidden flex flex-col gap-0"
                  aria-label="Drop zone for base-10 blocks"
                >
                  {/* Row 2 (top): 100 label + vertical bracket, then remaining hundreds */}
                  {row2Hundreds > 0 && (
                    <div
                      className="flex flex-nowrap items-end shrink-0"
                      style={{ minHeight: 10 * UNIT }}
                    >
                      <VerticalBracketIndicator />
                      {Array.from({ length: row2Hundreds }).map((_, i) => (
                        <div
                          key={`h2-${i}`}
                          draggable
                          onDragStart={(e) =>
                            handleDragStartFromMat(e, "hundred")
                          }
                          className="cursor-grab active:cursor-grabbing shrink-0"
                        >
                          <BlockHundred />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Row 1 (below): vertical bracket on left when row 2 exists, then hundreds, tens, ones; brackets below */}
                  <div className="flex flex-col gap-0 shrink-0">
                    <div className="flex flex-nowrap items-end min-h-[120px] overflow-hidden">
                      {row2Hundreds > 0 && <VerticalBracketIndicator />}
                      {Array.from({ length: row1Hundreds }).map((_, i) => (
                        <div
                          key={`h1-${i}`}
                          draggable
                          onDragStart={(e) =>
                            handleDragStartFromMat(e, "hundred")
                          }
                          className="cursor-grab active:cursor-grabbing shrink-0"
                        >
                          <BlockHundred />
                        </div>
                      ))}
                      {Array.from({ length: tens }).map((_, i) => (
                        <div
                          key={`t-${i}`}
                          draggable
                          onDragStart={(e) =>
                            handleDragStartFromMat(e, "ten")
                          }
                          className="cursor-grab active:cursor-grabbing shrink-0"
                        >
                          <BlockTen />
                        </div>
                      ))}
                      <div className="flex flex-col shrink-0">
                        {Array.from({ length: ones }).map((_, i) => (
                          <div
                            key={`o-${i}`}
                            draggable
                            onDragStart={(e) =>
                              handleDragStartFromMat(e, "one")
                            }
                            className="cursor-grab active:cursor-grabbing shrink-0 self-start"
                          >
                            <BlockOne />
                          </div>
                        ))}
                      </div>
                      {total === 0 && (
                        <span className="text-slate-500 text-sm self-center">
                          Drop blocks here
                        </span>
                      )}
                    </div>
                    {row1Hundreds > 0 && (
                      <div className="flex flex-nowrap items-start">
                        {row2Hundreds > 0 && (
                          <div
                            className="shrink-0"
                            style={{ width: RESERVED_LEFT_PX }}
                            aria-hidden
                          />
                        )}
                        {Array.from({ length: row1Hundreds }).map((_, i) => (
                          <HundredIndicator key={`ind1-${i}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardBuild1000;
