"use client";

import React from "react";
import NumberVisualizer from "../components/NumberVisualizer";
import { NumberPictureGrid } from "../components/NumberPictureGrid";
import { NumberInput } from "./NumberInput";
import { toDisplayNumber } from "../lib/utils";

interface MathProblemProps {
  num1: number;
  num2: number;
  operator: string;
  userAnswer: string;
  onUserAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isFeedbackShowing: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  num1VisualizerColor?: string;
  num2VisualizerColor?: string;
  inputAriaLabel: string;
  /** "dots" = NumberVisualizer (default), "squares" = NumberPictureGrid (pink/amber) */
  visualizer?: "dots" | "squares";
  /** Max length for the answer input (default 2 for sums up to 10) */
  inputMaxLength?: number;
}

export const MathProblem: React.FC<MathProblemProps> = ({
  num1,
  num2,
  operator,
  userAnswer,
  onUserAnswerChange,
  onKeyDown,
  isFeedbackShowing,
  inputRef,
  num1VisualizerColor = "bg-pink-500",
  num2VisualizerColor = "bg-indigo-600",
  inputAriaLabel,
  visualizer = "dots",
  inputMaxLength = 2,
}) => {
  const inputWidthClass =
    inputMaxLength <= 2 ? "w-[2.4ch]" : "w-[3.6ch]";
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-3 items-center font-mono font-bold tracking-tighter">
      {/* Row 1: Numbers, Operator, Input */}
      <div className="text-center text-sky-950 text-9xl lg:text-[12rem]">
        <span>{toDisplayNumber(num1)}</span>
      </div>
      <div className="text-sky-900 text-7xl text-center">
        {" "}
        <span>{operator}</span>
      </div>
      <div className="text-center text-sky-950 text-9xl lg:text-[12rem]">
        <span>{toDisplayNumber(num2)}</span>
      </div>
      <div className="text-sky-900 text-7xl text-center">
        {" "}
        <span>=</span>
      </div>
      <div className="flex justify-center">
        <NumberInput
          ref={inputRef}
          size="L"
          value={userAnswer}
          onChange={onUserAnswerChange}
          onKeyDown={onKeyDown}
          onEnterPress={onKeyDown ? () => onKeyDown({ key: "Enter" } as any) : undefined}
          disabled={isFeedbackShowing}
          min={0}
          maxLength={inputMaxLength}
          aria-label={inputAriaLabel}
          className="inline-flex items-stretch bg-transparent border-0 shadow-none focus-within:ring-0 focus-within:border-0 rounded-none"
          inputClassName={`${inputWidthClass} text-sky-950 text-9xl lg:text-[12rem] font-mono font-bold bg-transparent border-b-4 border-indigo-500 focus:border-indigo-300 outline-none text-center m-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </div>

      {/* Row 2: Visualizers (dots or squares) */}
      <div className="flex justify-center min-h-[80px] md:min-h-[100px]">
        {visualizer === "squares" ? (
          <NumberPictureGrid number={toDisplayNumber(num1)} cellSize={26} gapPx={6} />
        ) : (
          <NumberVisualizer count={toDisplayNumber(num1)} circleColor={num1VisualizerColor} />
        )}
      </div>
      <div className="min-h-[80px] md:min-h-[100px]"> </div>
      <div className="flex justify-center min-h-[80px] md:min-h-[100px]">
        {visualizer === "squares" ? (
          <NumberPictureGrid number={toDisplayNumber(num2)} cellSize={26} gapPx={6} />
        ) : (
          <NumberVisualizer count={toDisplayNumber(num2)} circleColor={num2VisualizerColor} />
        )}
      </div>
      <div className="min-h-[80px] md:min-h-[100px]"> </div>
      <div className="min-h-[80px] md:min-h-[100px]"> </div>
    </div>
  );
};
