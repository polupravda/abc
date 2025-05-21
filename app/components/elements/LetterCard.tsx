"use client";

import React from "react";

export type LetterCardSize = "S" | "M" | "L";

interface LetterCardProps {
  letter: string;
  size?: LetterCardSize;
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  className?: string;
  // Theme override props
  baseBgFromClass?: string;
  baseBgToClass?: string;
  hoverEffectClass?: string; // e.g., hover:brightness-110
  textColorClass?: string;
  focusRingClass?: string;
  selectedBgFromClass?: string;
  selectedBgToClass?: string;
  selectedRingClass?: string;
  selectedAnimateClass?: string;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  letter,
  size = "M",
  onClick,
  disabled,
  isSelected,
  className = "",
  // Theme override props
  baseBgFromClass: baseBgFromClassProp,
  baseBgToClass: baseBgToClassProp,
  hoverEffectClass: hoverEffectClassProp,
  textColorClass: textColorClassProp,
  focusRingClass: focusRingClassProp,
  selectedBgFromClass: selectedBgFromClassProp,
  selectedBgToClass: selectedBgToClassProp,
  selectedRingClass: selectedRingClassProp,
  selectedAnimateClass: selectedAnimateClassProp,
}) => {
  let sizeClasses = "";
  let textSizeClasses = "";
  let lowercaseTextSizeClasses = "";

  const commonFlexStyles = "flex flex-row items-baseline justify-center";

  switch (size) {
    case "S":
      sizeClasses = `p-2 md:p-3 aspect-square rounded-lg ${commonFlexStyles}`;
      textSizeClasses = "text-4xl md:text-5xl";
      lowercaseTextSizeClasses = "text-3xl md:text-4xl";
      break;
    case "L":
      sizeClasses = `w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl shadow-lg ${commonFlexStyles}`;
      textSizeClasses = "text-7xl md:text-8xl";
      lowercaseTextSizeClasses = "text-6xl md:text-7xl";
      break;
    case "M":
    default:
      sizeClasses = `p-2 md:p-3 aspect-square rounded-lg ${commonFlexStyles}`;
      textSizeClasses = "text-6xl md:text-6xl";
      lowercaseTextSizeClasses = "text-5xl md:text-5xl";
      break;
  }

  const baseButtonStyles =
    "font-bold transition-all duration-150 ease-in-out focus:outline-none focus:ring-4 shadow-lg/30 flex items-center justify-center";
  const gradientDirection = "bg-gradient-to-br"; // Default gradient direction

  // Default theme values (Lighter)
  const default_baseBgFromClass = "from-rose-300";
  const default_baseBgToClass = "to-rose-400";
  const default_hoverEffectClass = "hover:brightness-110";
  const default_textColorClass = "text-sky-950"; // Lighter sky text
  const default_focusRingClass = "focus:ring-rose-400";
  const default_selectedBgFromClass = "from-violet-400";
  const default_selectedBgToClass = "to-violet-500";
  const default_selectedRingClass = "ring-violet-500";
  const default_selectedAnimateClass = "animate-pulse";

  // Determine applied theme styles
  const baseBgFrom =
    baseBgFromClassProp !== undefined
      ? baseBgFromClassProp
      : default_baseBgFromClass;
  const baseBgTo =
    baseBgToClassProp !== undefined ? baseBgToClassProp : default_baseBgToClass;
  const hoverEffect =
    hoverEffectClassProp !== undefined
      ? hoverEffectClassProp
      : default_hoverEffectClass;
  const textColor =
    textColorClassProp !== undefined
      ? textColorClassProp
      : default_textColorClass;
  const focusRing =
    focusRingClassProp !== undefined
      ? focusRingClassProp
      : default_focusRingClass;

  const selectedBgFrom =
    selectedBgFromClassProp !== undefined
      ? selectedBgFromClassProp
      : default_selectedBgFromClass;
  const selectedBgTo =
    selectedBgToClassProp !== undefined
      ? selectedBgToClassProp
      : default_selectedBgToClass;
  const selectedRing =
    selectedRingClassProp !== undefined
      ? selectedRingClassProp
      : default_selectedRingClass;
  const selectedAnimate =
    selectedAnimateClassProp !== undefined
      ? selectedAnimateClassProp
      : default_selectedAnimateClass;

  let themeClasses = "";
  if (isSelected) {
    themeClasses = `${gradientDirection} ${selectedBgFrom} ${selectedBgTo} ${textColor} ${selectedRing} ${selectedAnimate} ${hoverEffect}`;
  } else {
    themeClasses = `${gradientDirection} ${baseBgFrom} ${baseBgTo} ${textColor} ${focusRing} ${hoverEffect}`;
  }

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseButtonStyles}
        ${sizeClasses}
        ${themeClasses}
        ${disabledStyles}
        ${className}
      `}
    >
      <div className="flex flex-row items-baseline justify-center">
        <span className={`${textSizeClasses}`}>{letter}</span>
        <span className={`${lowercaseTextSizeClasses} ml-1`}>
          {letter.toLowerCase()}
        </span>
      </div>
    </button>
  );
};
