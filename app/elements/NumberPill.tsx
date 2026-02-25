"use client";

import React from "react";
import { toDisplayValue } from "../lib/utils";

interface NumberPillProps {
  label?: string;
  value: string | number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Shared pill UI: indigo outer pill with optional label, amber inner badge for the number.
 */
export const NumberPill: React.FC<NumberPillProps> = ({
  label,
  value,
  className = "",
  ariaLabel,
}) => {
  return (
    <div
      className={`px-3 py-2 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg/20 flex items-center gap-2 select-none ${className}`}
      aria-label={ariaLabel}
    >
      {label != null && (
        <span className="font-semibold text-xl md:text-2xl">{label}</span>
      )}
      <span className="px-2 py-0.5 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 text-indigo-900 font-extrabold text-2xl md:text-3xl">
        {toDisplayValue(value)}
      </span>
    </div>
  );
};
