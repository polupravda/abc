"use client";

import React from "react";
import ShapeIcon, { type ShapeType } from "./ShapeIcon";

interface ShapeArrayRowProps {
  shape: ShapeType;
  count: number;
  className?: string;
}

export function ShapeArrayRow({
  shape,
  count,
  className = "",
}: ShapeArrayRowProps) {
  return (
    <div
      className={`flex flex-wrap gap-1 justify-start items-center ${className}`}
      role="img"
      aria-label={`${count} ${shape}${count !== 1 ? "s" : ""}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <ShapeIcon
          key={i}
          shape={shape}
          size={32}
          className="w-8 h-8 md:w-9 md:h-9 text-indigo-500 shrink-0"
        />
      ))}
    </div>
  );
}
