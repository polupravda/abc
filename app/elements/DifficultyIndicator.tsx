"use client";

import React from "react";

const GREY = "#d1d5db";

/** Easy = 1, Medium = 2, Hard = 3. Gauge: gradient green → yellow → red (left to right), fanned from bottom center. */
export type DifficultyLevel = 1 | 2 | 3;

interface DifficultyIndicatorProps {
  level: DifficultyLevel;
  /** Optional class for the container */
  className?: string;
}

function lerpColor(t: number): string {
  if (t <= 0.5) {
    const s = t * 2;
    const r = Math.round(0x22 + (0xea - 0x22) * s);
    const g = Math.round(0xc5 + (0xab - 0xc5) * s);
    const b = Math.round(0x5e + (0x08 - 0x5e) * s);
    return `rgb(${r},${g},${b})`;
  }
  const s = (t - 0.5) * 2;
  const r = Math.round(0xea + (0xef - 0xea) * s);
  const g = Math.round(0xab + (0x44 - 0xab) * s);
  const b = Math.round(0x08 + (0x44 - 0x08) * s);
  return `rgb(${r},${g},${b})`;
}

/**
 * Semicircle gauge. Gradient left→right (green→yellow→red) but "fanned" from bottom center:
 * stretched along the top arc, singular at the bottom center point.
 */
const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  level,
  className = "",
}) => {
  const cx = 0;
  const cy = 1;
  const r = 1;
  const round = (v: number) => Math.round(v * 1e10) / 1e10;
  const toCoord = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: round(cx + r * Math.cos(rad)), y: round(cy - r * Math.sin(rad)) };
  };
  const p0 = toCoord(0);
  const p60 = toCoord(60);
  const p120 = toCoord(120);
  const p180 = toCoord(180);

  const sectorPaths = [
    `M ${cx} ${cy} L ${p180.x} ${p180.y} A ${r} ${r} 0 0 1 ${p120.x} ${p120.y} Z`,
    `M ${cx} ${cy} L ${p120.x} ${p120.y} A ${r} ${r} 0 0 1 ${p60.x} ${p60.y} Z`,
    `M ${cx} ${cy} L ${p60.x} ${p60.y} A ${r} ${r} 0 0 1 ${p0.x} ${p0.y} Z`,
  ];

  const wedgeCount = 72;
  const wedges: { path: string; color: string; sectorIndex: number }[] = [];
  for (let i = 0; i < wedgeCount; i++) {
    const a1 = 180 - (i * 180) / wedgeCount;
    const a2 = 180 - ((i + 1) * 180) / wedgeCount;
    const c1 = toCoord(a1);
    const c2 = toCoord(a2);
    const path = `M ${cx} ${cy} L ${c1.x} ${c1.y} A ${r} ${r} 0 0 1 ${c2.x} ${c2.y} Z`;
    const t = i / (wedgeCount - 1);
    const sectorIndex = a1 >= 120 ? 0 : a1 >= 60 ? 1 : 2;
    wedges.push({ path, color: lerpColor(t), sectorIndex });
  }

  return (
    <div
      className={`shrink-0 w-8 h-5 flex items-center justify-center ${className}`}
      role="img"
      aria-label={`Difficulty: ${level} of 3`}
    >
      <svg
        viewBox="-1.2 -0.2 2.4 1.4"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {sectorPaths.map((path, i) => (
          <path key={`grey-${i}`} d={path} fill={i < level ? "none" : GREY} />
        ))}
        {wedges.map(
          (w, i) =>
            w.sectorIndex < level && (
              <path key={i} d={w.path} fill={w.color} />
            )
        )}
      </svg>
    </div>
  );
};

export default DifficultyIndicator;
