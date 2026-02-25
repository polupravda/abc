"use client";

import React from "react";

export type TagVariant = "learn" | "default";

interface TagProps {
  children: React.ReactNode;
  /** "learn" = teal (for Learn activities), "default" = neutral */
  variant?: TagVariant;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  learn:
    "bg-teal-200 text-teal-900",
  default:
    "bg-slate-100 text-slate-700",
};

/** Small label pill. Sizes: min-height 1.25rem, padding 1px .375rem, font-size .75rem. Does not stretch in flex (w-fit). */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center w-fit rounded-full min-h-5 py-px px-1.5 text-xs font-bold leading-normal shrink-0 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
