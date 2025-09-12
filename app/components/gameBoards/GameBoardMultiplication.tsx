"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CardLight } from "@/app/elements/Card";
// import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const MAX_DIMENSION = 100;
const MIN_DIMENSION = 1;
const GRID_GAP_PX = 6; // keep in sync with style gap: "6px"
const WRAPPER_PADDING_PX = 12; // p-3 => 12px padding on each side

const GameBoardMultiplication: React.FC = () => {
  const [x, setX] = useState<number>(3);
  const [y, setY] = useState<number>(4);
  const [xDraft, setXDraft] = useState<string>("3");
  const [yDraft, setYDraft] = useState<string>("4");
  const [cellSize, setCellSize] = useState<number>(24);
  const [gridHeightPx, setGridHeightPx] = useState<number>(360);
  const gridWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const numericOnly = raw.replace(/\D/g, "");
    if (numericOnly.length === 0) {
      setXDraft("");
      return;
    }
    const parsed = parseInt(numericOnly, 10);
    const committed = clamp(
      isNaN(parsed) ? x : parsed,
      MIN_DIMENSION,
      MAX_DIMENSION
    );
    setX(committed);
    setXDraft(String(committed));
  };
  const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    const numericOnly = raw.replace(/\D/g, "");
    if (numericOnly.length === 0) {
      setYDraft("");
      return;
    }
    const parsed = parseInt(numericOnly, 10);
    const committed = clamp(
      isNaN(parsed) ? y : parsed,
      MIN_DIMENSION,
      MAX_DIMENSION
    );
    setY(committed);
    setYDraft(String(committed));
  };

  const handleXBlur = () => {
    if (xDraft === "") {
      setXDraft(String(x));
      return;
    }
    const parsed = parseInt(xDraft, 10);
    const committed = clamp(
      isNaN(parsed) ? x : parsed,
      MIN_DIMENSION,
      MAX_DIMENSION
    );
    setX(committed);
    setXDraft(String(committed));
  };

  const handleYBlur = () => {
    if (yDraft === "") {
      setYDraft(String(y));
      return;
    }
    const parsed = parseInt(yDraft, 10);
    const committed = clamp(
      isNaN(parsed) ? y : parsed,
      MIN_DIMENSION,
      MAX_DIMENSION
    );
    setY(committed);
    setYDraft(String(committed));
  };

  const recomputeCellSize = useCallback(() => {
    const wrapper = gridWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const availableWidth = rect.width;
    const availableHeight = rect.height;
    if (!availableWidth || !availableHeight) return;

    // Subtract wrapper padding and grid gaps to keep content within bounds
    const usableWidth = Math.max(0, availableWidth - 2 * WRAPPER_PADDING_PX);
    const usableHeight = Math.max(0, availableHeight - 2 * WRAPPER_PADDING_PX);
    const totalHorizontalGaps = Math.max(0, x - 1) * GRID_GAP_PX;
    const totalVerticalGaps = Math.max(0, y - 1) * GRID_GAP_PX;

    const perCellWidth = (usableWidth - totalHorizontalGaps) / x;
    const perCellHeight = (usableHeight - totalVerticalGaps) / y;
    const size = Math.floor(Math.min(perCellWidth, perCellHeight));

    setCellSize(clamp(size, 4, 64));
  }, [x, y]);

  const recomputeGridHeight = useCallback(() => {
    const wrapper = gridWrapperRef.current;
    if (!wrapper) return;
    const viewport = (window.visualViewport?.height ?? window.innerHeight) || 0;
    const top = wrapper.getBoundingClientRect().top;
    const desired = Math.max(160, Math.floor(viewport - top - 24));
    setGridHeightPx(desired);
  }, []);

  useEffect(() => {
    recomputeCellSize();
  }, [x, y, recomputeCellSize]);

  useEffect(() => {
    if (!gridWrapperRef.current) return;
    const ro = new ResizeObserver(() => {
      recomputeGridHeight();
      recomputeCellSize();
    });
    ro.observe(gridWrapperRef.current);
    const onResize = () => {
      recomputeGridHeight();
      recomputeCellSize();
    };
    window.addEventListener("resize", onResize);
    // Kick once after paint
    setTimeout(() => {
      recomputeGridHeight();
      recomputeCellSize();
    }, 0);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [recomputeCellSize, recomputeGridHeight]);

  const cells = useMemo(() => x * y, [x, y]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      <div className="h-auto max-h-[80vh] mb-10">
        <div className="w-full mx-auto max-w-[90vw]">
          {/* <HeadlineInstruction
            headlineText="Build the array"
            instructionText="Enter X and Y to see an X×Y array of squares."
            className="mb-8"
          /> */}
          <div className="w-full">
            <div className="relative mb-4 min-h-[3.25rem]">
              <div className="flex justify-center">
                <input
                  type="number"
                  min={MIN_DIMENSION}
                  max={MAX_DIMENSION}
                  value={xDraft}
                  onChange={handleXChange}
                  onBlur={handleXBlur}
                  className="w-24 rounded-md border border-sky-200 bg-white px-3 py-2 text-2xl font-bold text-sky-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  aria-label="X dimension"
                />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-indigo-600 text-white shadow-lg/20 flex items-center gap-2 select-none">
                <span className="font-semibold text-xl md:text-2xl">
                  {y} × {x} =
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-300 text-indigo-900 font-extrabold text-2xl md:text-3xl">
                  {x * y}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <input
                  type="number"
                  min={MIN_DIMENSION}
                  max={MAX_DIMENSION}
                  value={yDraft}
                  onChange={handleYChange}
                  onBlur={handleYBlur}
                  className="w-24 rounded-md border border-sky-200 bg-white px-3 py-2 text-2xl font-bold text-sky-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  aria-label="Y dimension"
                />
              </div>
              <CardLight className="w-full">
                <div
                  ref={gridWrapperRef}
                  className="w-full mx-auto rounded-lg p-3 overflow-y-auto overflow-x-hidden"
                  style={{ height: `${gridHeightPx}px`, maxHeight: "70vh" }}
                >
                  <div
                    className="grid place-content-center"
                    style={{
                      gridTemplateColumns: `repeat(${x}, ${cellSize}px)`,
                      gridAutoRows: `${cellSize}px`,
                      gap: "6px",
                    }}
                    aria-label={`Grid ${x} by ${y}`}
                    role="grid"
                  >
                    {Array.from({ length: cells }).map((_, idx) => (
                      <div
                        key={`cell-${idx}`}
                        role="gridcell"
                        className="bg-blue-900 border border-blue-950 rounded-sm shadow-sm box-border"
                      />
                    ))}
                  </div>
                </div>
              </CardLight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoardMultiplication;
