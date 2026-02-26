"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { ReadyButton } from "@/app/elements/ReadyButton";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "@/app/hooks/useGameFeedback";
import { useScore } from "@/app/contexts/ScoreContext";
import { toDisplayNumber } from "@/app/lib/utils";

const GRID_MAX = 10;
const PIN_SIZE_PX = 32;

const pickTarget = (): { x: number; y: number } => ({
  x: Math.floor(Math.random() * (GRID_MAX + 1)),
  y: Math.floor(Math.random() * (GRID_MAX + 1)),
});

const GameBoardPlottingPoints: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(32);
  const [pinX, setPinX] = useState(0);
  const [pinY, setPinY] = useState(0);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

  const recomputeLayout = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const availableW = rect.width;
    const availableH = rect.height;
    if (availableW <= 0 || availableH <= 0) return;
    const size = Math.floor(
      Math.min(availableW / (GRID_MAX + 1), availableH / (GRID_MAX + 1)),
    );
    setCellSize(Math.max(16, Math.min(64, size)));
  }, []);

  useEffect(() => {
    recomputeLayout();
    const ro = new ResizeObserver(() => recomputeLayout());
    if (gridRef.current) ro.observe(gridRef.current);
    const onResize = () => recomputeLayout();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [recomputeLayout]);

  const gridToPx = useCallback(
    (x: number, y: number) => ({
      left: x * cellSize - PIN_SIZE_PX / 2,
      top: (GRID_MAX - y) * cellSize - PIN_SIZE_PX / 2,
    }),
    [cellSize],
  );

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${GRID_MAX}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${GRID_MAX}, ${cellSize}px)`,
    }),
    [cellSize],
  );

  const resetRound = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsBusy(false);
    setTarget(pickTarget());
    setPinX(0);
    setPinY(0);
  }, [clearAllTimeouts]);

  useEffect(() => {
    resetRound();
  }, [resetRound]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const verify = useCallback(() => {
    if (isBusy) return;
    setIsBusy(true);
    const correct = pinX === target.x && pinY === target.y;
    if (correct) {
      addPoints(1);
      setShowSuccessContainer(true);
      setStartSuccessAnimation(false);
      scheduleSuccessSequence({
        onStartAnimation: () => setStartSuccessAnimation(true),
        onEndAnimation: () => setStartSuccessAnimation(false),
        onComplete: resetRound,
      });
    } else {
      addPoints(-1);
      setShowFailure(true);
      scheduleFailureDismiss(2500, () => {
        setShowFailure(false);
        setIsBusy(false);
      });
    }
  }, [
    isBusy,
    pinX,
    pinY,
    target,
    addPoints,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
    resetRound,
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verify();
      }
    },
    [verify],
  );

  const gridPx = GRID_MAX * cellSize;
  const sliderTrackHeight = 28;
  const gridWrapperSize = "min(60vmin, 90vw - 80px)";

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center relative overflow-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Plotting points game"
    >
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

      <div className="h-auto max-h-[90vh] mb-10 w-full px-2">
        <div className="w-full mx-auto max-w-[min(72rem,95vw)]">
          <HeadlineInstruction
            headlineText="Move the pin to the coordinates shown"
            instructionText="Move the pin to the coordinates shown. Use the sliders, then press I am ready."
            className="text-left mb-2"
          />
          <CardLight className="w-full p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Vertical slider (Y) - left of grid, green */}
              <div
                className="flex flex-col items-center shrink-0"
                style={{
                  width: sliderTrackHeight + 16,
                  height: gridWrapperSize,
                  minHeight: 200,
                }}
              >
                <div
                  className="relative flex-1 flex items-center justify-center"
                  style={{ width: sliderTrackHeight, height: gridPx }}
                >
                  <input
                    type="range"
                    min={0}
                    max={GRID_MAX}
                    step={1}
                    value={pinY}
                    onChange={(e) => setPinY(Number(e.target.value))}
                    disabled={isBusy}
                    className="absolute accent-emerald-600 cursor-pointer border-0 appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-emerald-400 [&::-webkit-slider-thumb]:to-emerald-700 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-emerald-400 [&::-moz-range-thumb]:to-emerald-700 [&::-moz-range-thumb]:shadow-md"
                    style={{
                      width: gridPx,
                      height: sliderTrackHeight,
                      left: "50%",
                      top: "50%",
                      marginLeft: -gridPx / 2,
                      marginTop: -sliderTrackHeight / 2,
                      transform: "rotate(-90deg)",
                    }}
                    aria-label="Y coordinate"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                {/* Grid + pin - wrapper has flexible size so cellSize can be computed */}
                <div
                  ref={gridRef}
                  className="relative rounded-lg flex items-center justify-center"
                  style={{
                    width: gridWrapperSize,
                    height: gridWrapperSize,
                    minWidth: 200,
                    minHeight: 200,
                  }}
                >
                  <div
                    className="relative shrink-0"
                    style={{ width: gridPx, height: gridPx }}
                  >
                  <div className="absolute inset-0 grid" style={gridStyle}>
                    {Array.from({ length: GRID_MAX * GRID_MAX }).map((_, i) => {
                      const row = Math.floor(i / GRID_MAX);
                      const cellStyle: React.CSSProperties =
                        row === GRID_MAX - 1 ? { borderTop: "none" } : {};
                      return (
                        <div
                          key={`cell-${i}`}
                          className="border border-gray-400"
                          style={cellStyle}
                        />
                      );
                    })}
                  </div>
                  {/* Axes and labels */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute bg-gray-700"
                      style={{
                        left: 0,
                        top: GRID_MAX * cellSize,
                        height: 2,
                        width: GRID_MAX * cellSize,
                      }}
                    >
                      <div
                        className="absolute"
                        style={{
                          right: -8,
                          top: -5,
                          width: 0,
                          height: 0,
                          borderTop: "6px solid transparent",
                          borderBottom: "6px solid transparent",
                          borderLeft: "8px solid #374151",
                        }}
                      />
                    </div>
                    <div
                      className="absolute bg-gray-700"
                      style={{
                        left: 0,
                        top: 0,
                        width: 2,
                        height: GRID_MAX * cellSize,
                      }}
                    >
                      <div
                        className="absolute"
                        style={{
                          left: -5,
                          top: -8,
                          width: 0,
                          height: 0,
                          borderLeft: "6px solid transparent",
                          borderRight: "6px solid transparent",
                          borderBottom: "8px solid #374151",
                        }}
                      />
                    </div>
                    <span
                      className="absolute text-gray-700 font-semibold select-none"
                      style={{
                        left: GRID_MAX * cellSize + 10,
                        top: GRID_MAX * cellSize - 8,
                      }}
                    >
                      X
                    </span>
                    <span
                      className="absolute text-gray-700 font-semibold select-none"
                      style={{ left: -18, top: -28 }}
                    >
                      Y
                    </span>
                    {Array.from({ length: GRID_MAX + 1 }).map((_, i) => (
                      <span
                        key={`xlab-${i}`}
                        className="absolute text-gray-600 text-sm"
                        style={{
                          left: i * cellSize,
                          top: GRID_MAX * cellSize + 14,
                          transform: "translateX(-50%)",
                        }}
                      >
                        {i}
                      </span>
                    ))}
                    {Array.from({ length: GRID_MAX + 1 }).map((_, i) => (
                      <span
                        key={`ylab-${i}`}
                        className="absolute text-gray-700 text-sm text-right"
                        style={{
                          left: -24,
                          top: (GRID_MAX - i) * cellSize,
                          transform: "translateY(-50%)",
                        }}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                  {/* Game pin (dove) */}
                  <div
                    className="absolute pointer-events-none text-yellow-500"
                    style={{
                      ...gridToPx(pinX, pinY),
                      width: PIN_SIZE_PX,
                      height: PIN_SIZE_PX,
                      filter:
                        "drop-shadow(0 3px 2px rgba(0,0,0,0.4)) drop-shadow(0 6px 4px rgba(0,0,0,0.3)) drop-shadow(0 10px 8px rgba(0,0,0,0.2))",
                    }}
                    aria-hidden
                  >
                    <FontAwesomeIcon
                      icon={faDove}
                      className="w-full h-full"
                      style={{ fontSize: PIN_SIZE_PX }}
                    />
                  </div>
                  </div>
                </div>

                {/* Horizontal slider (X) - below grid */}
                <div
                  className="flex items-center w-full"
                  style={{ width: gridPx }}
                >
                  <input
                    type="range"
                    min={0}
                    max={GRID_MAX}
                    step={1}
                    value={pinX}
                    onChange={(e) => setPinX(Number(e.target.value))}
                    disabled={isBusy}
                    className="flex-1 h-7 accent-indigo-600 border-0 appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-indigo-400 [&::-webkit-slider-thumb]:to-indigo-700 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-indigo-400 [&::-moz-range-thumb]:to-indigo-700 [&::-moz-range-thumb]:shadow-md"
                    aria-label="X coordinate"
                  />
                </div>
              </div>

              {/* Task: target coordinates - right of grid, aligned with grid */}
              <div
                className="flex items-center shrink-0"
                style={{ height: gridWrapperSize, minHeight: 200 }}
              >
                <div className="text-sky-950 font-bold text-4xl md:text-5xl">
                  X: {toDisplayNumber(target.x)}  Y: {toDisplayNumber(target.y)}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ReadyButton onClick={verify} disabled={isBusy} />
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardPlottingPoints;
