"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { ReadyButton } from "@/app/elements/ReadyButton";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "@/app/hooks/useGameFeedback";
import { useScore } from "@/app/contexts/ScoreContext";

type Point = { id: string; x: number; y: number; color: string };

const GRID_MAX = 10;
const POINT_DIAMETER = 22;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function generatePattern(count: number, color: string): Point[] {
  const coords = new Set<string>();
  const points: Point[] = [];
  while (points.length < count) {
    const x = Math.floor(Math.random() * (GRID_MAX + 1));
    const y = Math.floor(Math.random() * (GRID_MAX + 1));
    const key = `${x},${y}`;
    if (!coords.has(key)) {
      coords.add(key);
      points.push({
        id: `${points.length}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        x,
        y,
        color,
      });
    }
  }
  return points;
}

const AxisLabels: React.FC<{ cellSize: number }> = ({ cellSize }) => {
  return (
    <>
      {/* X-axis */}
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
      {/* Y-axis */}
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
      {/* Axis letters */}
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
        style={{
          left: -18,
          top: -28,
        }}
      >
        Y
      </span>
      {/* Ticks and numbers */}
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
    </>
  );
};

const Grid: React.FC<{
  points: Point[];
  onAddPoint?: (x: number, y: number) => void;
  onRemovePoint?: (id: string) => void;
  readonly?: boolean;
}> = ({ points, onAddPoint, onRemovePoint, readonly = false }) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(32);

  const recomputeLayout = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const parentRect =
      el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
    const availableW = parentRect.width;
    const availableH = parentRect.height;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 800;
    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1280;
    const isSmall = viewportW < 768; // matches md breakpoint
    const vhFrac = isSmall ? 0.3 : 0.42;
    const vhCap = Math.floor((viewportH * vhFrac) / GRID_MAX);
    const size = Math.floor(
      Math.min(availableW / GRID_MAX, availableH / GRID_MAX, vhCap),
    );
    setCellSize(Math.max(16, Math.min(52, size)));
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

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${GRID_MAX}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${GRID_MAX}, ${cellSize}px)`,
    }),
    [cellSize],
  );

  const gridToPx = useCallback(
    (x: number, y: number) => ({
      left: x * cellSize - POINT_DIAMETER / 2,
      top: (GRID_MAX - y) * cellSize - POINT_DIAMETER / 2,
    }),
    [cellSize],
  );

  const pxToGrid = useCallback(
    (clientX: number, clientY: number) => {
      const rect = gridRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      const gx = Math.round(relX / cellSize);
      const gy = GRID_MAX - Math.round(relY / cellSize);
      return { x: clamp(gx, 0, GRID_MAX), y: clamp(gy, 0, GRID_MAX) };
    },
    [cellSize],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readonly || !onAddPoint) return;
    const { x, y } = pxToGrid(e.clientX, e.clientY);
    const exists = points.some((p) => p.x === x && p.y === y);
    if (!exists) onAddPoint(x, y);
  };

  const gridPx = GRID_MAX * cellSize;

  return (
    <div
      ref={gridRef}
      onClick={handleClick}
      className="relative rounded-lg"
      style={{ width: `${gridPx}px`, height: `${gridPx}px` }}
    >
      <div className="absolute inset-0 grid" style={gridStyle}>
        {Array.from({ length: GRID_MAX * GRID_MAX }).map((_, i) => {
          const cols = GRID_MAX;
          const row = Math.floor(i / cols);
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
      <div className="absolute inset-0 pointer-events-none">
        <AxisLabels cellSize={cellSize} />
      </div>
      {points.map((p) => {
        const pos = gridToPx(p.x, p.y);
        const common = {
          className: "absolute rounded-full border border-white shadow",
          style: {
            width: POINT_DIAMETER,
            height: POINT_DIAMETER,
            left: pos.left,
            top: pos.top,
            backgroundColor: p.color,
          } as React.CSSProperties,
        };
        if (readonly) {
          return (
            <div key={p.id} {...common} aria-label={`Point (${p.x}, ${p.y})`} />
          );
        }
        return (
          <button
            key={p.id}
            {...common}
            onClick={(ev) => {
              ev.stopPropagation();
              onRemovePoint?.(p.id);
            }}
            aria-label={`Your point (${p.x}, ${p.y}) - click to remove`}
          />
        );
      })}
    </div>
  );
};

const GameBoardCopyCoordinates: React.FC = () => {
  const [targetPoints, setTargetPoints] = useState<Point[]>([]);
  const [userPoints, setUserPoints] = useState<Point[]>([]);
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

  const resetRound = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsBusy(false);
    const count = 3 + Math.floor(Math.random() * 3); // 3..5 points
    setTargetPoints(generatePattern(count, "#ef4444"));
    setUserPoints([]);
  }, [clearAllTimeouts]);

  useEffect(() => {
    resetRound();
  }, [resetRound]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const handleAddUserPoint = (x: number, y: number) => {
    if (isBusy) return;
    const exists = userPoints.some((p) => p.x === x && p.y === y);
    if (exists) return;
    setUserPoints((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        x,
        y,
        color: "#ef4444",
      },
    ]);
  };

  const handleRemoveUserPoint = (id: string) => {
    if (isBusy) return;
    setUserPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const verify = () => {
    if (isBusy) return;
    setIsBusy(true);
    const toKey = (p: Point) => `${p.x},${p.y}`;
    const targetSet = new Set(targetPoints.map(toKey));
    const userSet = new Set(userPoints.map(toKey));
    const equal =
      targetSet.size === userSet.size &&
      [...targetSet].every((k) => userSet.has(k));
    if (equal) {
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
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

      <div className="h-auto max-h-screen mb-4 w-full px-2 py-2">
        <div className="w-full mx-auto max-w-[min(72rem,95vw)]">
          <HeadlineInstruction
            headlineText="Copy the coordinates pattern"
            instructionText="Copy the coordinates pattern from the left grid to the right grid, then press I am ready."
            className="text-left mb-2"
          />
          <CardLight className="w-full p-4">
            <div className="w-full flex flex-col gap-10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 min-w-0">
                  <Grid points={targetPoints} readonly />
                </div>
                <div className="flex-1 min-w-0">
                  <Grid
                    points={userPoints}
                    onAddPoint={handleAddUserPoint}
                    onRemovePoint={handleRemoveUserPoint}
                  />
                </div>
              </div>

              <div className="mt-3">
                <ReadyButton
                  onClick={verify}
                  disabled={isBusy}
                  className="transform scale-110 md:scale-125"
                />
              </div>
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardCopyCoordinates;
