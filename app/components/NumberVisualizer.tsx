"use client";

import React from "react";

interface NumberVisualizerProps {
  count: number;
  circleColor?: string;
}

const NumberVisualizer: React.FC<NumberVisualizerProps> = ({
  count,
  circleColor = "bg-yellow-400",
}) => {
  if (count < 0 || count > 10) {
    // Max 10 circles for now, can be adjusted
    return null;
  }

  const circles = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${circleColor} shadow-sm`}
    />
  ));

  return (
    <div className="grid grid-cols-5 gap-1 md:gap-2 mt-2 h-16 md:h-20 w-max">
      {circles}
    </div>
  );
};

export default NumberVisualizer;
