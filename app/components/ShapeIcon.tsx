"use client";

import React from "react";

export type ShapeType =
  | "square"
  | "circle"
  | "triangle"
  | "pentagon"
  | "hexagon"
  | "star";

interface ShapeIconProps {
  shape: ShapeType;
  className?: string;
  size?: number;
}

const SHAPE_VIEWBOX = 24;

const ShapeIcon: React.FC<ShapeIconProps> = ({
  shape,
  className = "",
  size = 24,
}) => {
  const fill = "currentColor";
  const stroke = "currentColor";
  const strokeWidth = 0.5;

  const renderPath = () => {
    switch (shape) {
      case "square":
        return (
          <rect
            x={2}
            y={2}
            width={20}
            height={20}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "circle":
        return (
          <circle
            cx={12}
            cy={12}
            r={10}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "triangle":
        return (
          <polygon
            points="12,2 22,22 2,22"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "pentagon":
        return (
          <polygon
            points="12,2 22,9 18,22 6,22 2,9"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "hexagon":
        return (
          <polygon
            points="12,2 20,7 20,17 12,22 4,17 4,7"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "star":
        return (
          <polygon
            points="12,2 14.5,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9.5,9"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${SHAPE_VIEWBOX} ${SHAPE_VIEWBOX}`}
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      {renderPath()}
    </svg>
  );
};

export default ShapeIcon;
export const SHAPE_TYPES: ShapeType[] = [
  "square",
  "circle",
  "triangle",
  "pentagon",
  "hexagon",
  "star",
];
