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

type Point = {
  id: string;
  x: number; // 0..10
  y: number; // 0..10
  color: string;
};

const COLORS = [
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#22c55e", // green-500
  "#eab308", // yellow-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#3b82f6", // blue-500
  "#14b8a6", // teal-500
  "#a855f7", // purple-500
  "#f43f5e", // rose-500
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const GRID_MAX = 10;
const POINT_DIAMETER = 25; // px
const LEGEND_FONT_PX = Math.max(12, Math.round(POINT_DIAMETER * 0.8));

const GameBoardCoordinates: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [colorIdx, setColorIdx] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(32);
  const [dragId, setDragId] = useState<string | null>(null);

  const nextColor = useCallback(() => {
    const c = COLORS[colorIdx % COLORS.length];
    setColorIdx((i) => (i + 1) % COLORS.length);
    return c;
  }, [colorIdx]);

  const recomputeLayout = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const availableW = rect.width;
    const availableH = rect.height;
    const size = Math.floor(
      Math.min(availableW / (GRID_MAX + 1), availableH / (GRID_MAX + 1))
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
      left: x * cellSize - POINT_DIAMETER / 2,
      top: (GRID_MAX - y) * cellSize - POINT_DIAMETER / 2,
    }),
    [cellSize]
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
    [cellSize]
  );

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragId) return;
    const { x, y } = pxToGrid(e.clientX, e.clientY);
    const exists = points.some((p) => p.x === x && p.y === y);
    if (exists) return;
    const newPoint: Point = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      x,
      y,
      color: nextColor(),
    };
    setPoints((prev) => [...prev, newPoint]);
  };

  const startDrag = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragId(id);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragId) return;
    const { x, y } = pxToGrid(e.clientX, e.clientY);
    setPoints((prev) =>
      prev.map((p) => (p.id === dragId ? { ...p, x, y } : p))
    );
  };

  const onMouseUp = () => {
    setDragId(null);
  };

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${GRID_MAX}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${GRID_MAX}, ${cellSize}px)`,
    }),
    [cellSize]
  );

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      <div className="h-auto max-h-[90vh] mb-10 w-full px-2">
        <div className="w-full mx-auto max-w-[min(72rem,95vw)]">
          <HeadlineInstruction
            headlineText="Place points on the coordinate grid"
            instructionText="Place points on the coordinate grid. Click to add; drag to move."
            className="text-left mb-2"
          />
          <CardLight className="w-full">
            <div className="w-full flex gap-8">
              {/* Grid area */}
              <div
                ref={gridRef}
                onClick={handleGridClick}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                className="relative flex-1 mx-auto rounded-lg"
                style={{ height: "60vh" }}
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
                {/* Axes and labels */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* X-axis (horizontal) */}
                  <div
                    className="absolute bg-gray-700"
                    style={{
                      left: 0,
                      top: GRID_MAX * cellSize,
                      height: 2,
                      width: GRID_MAX * cellSize,
                    }}
                  >
                    {/* Arrow to the right */}
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

                  {/* Y-axis (vertical) */}
                  <div
                    className="absolute bg-gray-700"
                    style={{
                      left: 0,
                      top: 0,
                      width: 2,
                      height: GRID_MAX * cellSize,
                    }}
                  >
                    {/* Arrow upwards */}
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

                  {/* Axis labels (X and Y) */}
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

                  {/* X labels */}
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

                  {/* Y labels */}
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
                {points.map((p) => {
                  const pos = gridToPx(p.x, p.y);
                  return (
                    <button
                      key={p.id}
                      onMouseDown={startDrag(p.id)}
                      onClick={(ev) => ev.stopPropagation()}
                      className="absolute rounded-full border border-white shadow"
                      style={{
                        width: POINT_DIAMETER,
                        height: POINT_DIAMETER,
                        left: pos.left,
                        top: pos.top,
                        backgroundColor: p.color,
                        cursor: dragId === p.id ? "grabbing" : "grab",
                      }}
                      aria-label={`Point (${p.x}, ${p.y})`}
                    />
                  );
                })}
              </div>
              {/* Points log side panel */}
              <div className="w-56 max-w-[40%] h-[60vh] overflow-auto rounded-lg bg-white/90 backdrop-blur px-3 py-2 shadow border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  Points
                </div>
                <ul
                  className="space-y-1"
                  style={{ fontSize: `${LEGEND_FONT_PX}px` }}
                >
                  {points.map((p) => (
                    <li
                      key={`legend-${p.id}`}
                      className="flex items-center gap-2 text-gray-800"
                    >
                      <span
                        className="inline-block rounded-full"
                        style={{
                          width: POINT_DIAMETER,
                          height: POINT_DIAMETER,
                          backgroundColor: p.color,
                        }}
                        aria-hidden
                      />
                      <span>
                        ({p.x}, {p.y})
                      </span>
                    </li>
                  ))}
                  {points.length === 0 && (
                    <li className="text-gray-700 text-sm">
                      Click grid to add points
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardCoordinates;
