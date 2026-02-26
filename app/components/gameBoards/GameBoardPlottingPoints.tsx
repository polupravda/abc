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
const SLIDER_THICKNESS_PX = 14;

const pickTarget = (): { x: number; y: number } => ({
  x: Math.floor(Math.random() * (GRID_MAX + 1)),
  y: Math.floor(Math.random() * (GRID_MAX + 1)),
});

type AxisSliderProps = {
  orientation: "horizontal" | "vertical";
  value: number;
  min: number;
  max: number;
  lengthPx: number;
  onChange: (n: number) => void;
  disabled?: boolean;
  /** Tailwind classes for thumb color (e.g., bg/gradient) */
  thumbClassName?: string;
  /** Additional classes for the track */
  trackClassName?: string;
  ariaLabel: string;
};

function AxisSlider({
  orientation,
  value,
  min,
  max,
  lengthPx,
  onChange,
  disabled = false,
  thumbClassName = "",
  trackClassName = "",
  ariaLabel,
}: AxisSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isVertical = orientation === "vertical";
  const clamp = useCallback(
    (n: number) => Math.max(min, Math.min(max, n)),
    [min, max],
  );
  const pct = (value - min) / (max - min || 1);

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      let ratio = 0;
      if (isVertical) {
        const relY = clientY - rect.top; // 0 at top
        const yDownRatio = relY / Math.max(1, rect.height);
        // For vertical slider, 0 at bottom, max at top
        ratio = 1 - yDownRatio;
      } else {
        const relX = clientX - rect.left; // 0 at left
        ratio = relX / Math.max(1, rect.width);
      }
      const newVal = clamp(Math.round(min + ratio * (max - min)));
      onChange(newVal);
    },
    [clamp, isVertical, min, max, onChange],
  );

  const draggingRef = useRef(false);
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    draggingRef.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    handlePointer(e.clientX, e.clientY);
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (disabled || !draggingRef.current) return;
    handlePointer(e.clientX, e.clientY);
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    if (isVertical) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        onChange(clamp(value + 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onChange(clamp(value - 1));
      }
    } else {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onChange(clamp(value + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onChange(clamp(value - 1));
      }
    }
  };

  const commonTrack = `relative rounded-full bg-slate-300 ${trackClassName}`;
  const trackStyle: React.CSSProperties = isVertical
    ? { width: SLIDER_THICKNESS_PX, height: lengthPx }
    : { height: SLIDER_THICKNESS_PX, width: lengthPx };

  // Progress (passed distance)
  const progressStyle: React.CSSProperties = isVertical
    ? { height: `${pct * 100}%`, width: "100%", bottom: 0, left: 0 }
    : { width: `${pct * 100}%`, height: "100%", top: 0, left: 0 };
  const progressClasses = isVertical ? "bg-emerald-400" : "bg-indigo-400";

  const thumbStyle: React.CSSProperties = isVertical
    ? { bottom: `${pct * 100}%`, transform: "translate(-50%, 50%)", left: "50%" }
    : { left: `${pct * 100}%`, transform: "translate(-50%, -50%)", top: "50%" };

  const thumbClasses =
    thumbClassName ||
    (isVertical
      ? "from-emerald-400 to-emerald-700"
      : "from-indigo-400 to-indigo-700");

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={disabled ? -1 : 0}
      className={`${commonTrack} ${disabled ? "opacity-60" : "cursor-pointer"}`}
      style={trackStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
    >
      {/* Passed distance */}
      <div
        className={`absolute rounded-full ${progressClasses} transition-[width,height] duration-150 ease-out`}
        style={progressStyle}
      />
      {/* Thumb */}
      <div
        className={`absolute w-5 h-5 rounded-full bg-gradient-to-br ${thumbClasses} shadow-md`}
        style={thumbStyle}
      />
    </div>
  );
}

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
                className="flex items-center justify-center shrink-0"
                style={{
                  width: SLIDER_THICKNESS_PX,
                  height: gridWrapperSize,
                  minHeight: 200,
                }}
              >
                <div className="flex items-center" style={{ height: gridPx }}>
                  <AxisSlider
                    orientation="vertical"
                    value={pinY}
                    min={0}
                    max={GRID_MAX}
                    lengthPx={gridPx}
                    onChange={setPinY}
                    disabled={isBusy}
                    ariaLabel="Y coordinate"
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
                          className="border border-gray-400 border-dashed"
                          style={cellStyle}
                        />
                      );
                    })}
                  </div>
                  {/* Axes and labels */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Emphasize distance from origin to pin along axes */}
                    <div
                      className="absolute bg-emerald-400/80 rounded-full"
                      style={{
                        left: pinX * cellSize - 3,
                        top: GRID_MAX * cellSize - pinY * cellSize,
                        width: 6,
                        height: pinY * cellSize,
                      }}
                    />
                    <div
                      className="absolute bg-indigo-400/80 rounded-full"
                      style={{
                        left: 0,
                        top: (GRID_MAX - pinY) * cellSize - 3,
                        height: 6,
                        width: pinX * cellSize,
                      }}
                    />
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
                  style={{ width: gridPx, marginTop: 16 }}
                >
                  <AxisSlider
                    orientation="horizontal"
                    value={pinX}
                    min={0}
                    max={GRID_MAX}
                    lengthPx={gridPx}
                    onChange={setPinX}
                    disabled={isBusy}
                    ariaLabel="X coordinate"
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
