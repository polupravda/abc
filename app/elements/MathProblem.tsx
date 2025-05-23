"use client";

import React from "react";
import NumberVisualizer from "../components/NumberVisualizer"; // Adjusted path

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
  num1VisualizerColor = "bg-pink-500", // Default color
  num2VisualizerColor = "bg-indigo-600", // Default color
  inputAriaLabel,
}) => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-3 items-center font-mono font-bold tracking-tighter">
      {/* Row 1: Numbers, Operator, Input */}
      <div className="text-center text-sky-950 text-9xl lg:text-[12rem]">
        <span>{num1}</span>
      </div>
      <div className="text-sky-900 text-7xl text-center">
        {" "}
        {/* Operator */}
        <span>{operator}</span>
      </div>
      <div className="text-center text-sky-950 text-9xl lg:text-[12rem]">
        <span>{num2}</span>
      </div>
      <div className="text-sky-900 text-7xl text-center">
        {" "}
        {/* Equals */}
        <span>=</span>
      </div>
      <div className="flex justify-center">
        {" "}
        {/* Input field container */}
        <input
          ref={inputRef}
          type="number"
          value={userAnswer}
          onChange={onUserAnswerChange}
          onKeyDown={onKeyDown}
          disabled={isFeedbackShowing}
          maxLength={2}
          className="w-[2.4ch] text-sky-950 text-9xl lg:text-[12rem] font-mono font-bold bg-transparent border-b-4 border-indigo-500 focus:border-indigo-300 outline-none text-center appearance-none m-0 p-0"
          aria-label={inputAriaLabel}
        />
      </div>

      {/* Row 2: Visualizers (aligned with row above) */}
      <div className="flex justify-center min-h-[80px] md:min-h-[100px]">
        <NumberVisualizer count={num1} circleColor={num1VisualizerColor} />
      </div>
      <div className="min-h-[80px] md:min-h-[100px]">
        {" "}
        {/* Spacer for operator */}{" "}
      </div>
      <div className="flex justify-center min-h-[80px] md:min-h-[100px]">
        <NumberVisualizer count={num2} circleColor={num2VisualizerColor} />
      </div>
      <div className="min-h-[80px] md:min-h-[100px]">
        {" "}
        {/* Spacer for equals */}{" "}
      </div>
      <div className="min-h-[80px] md:min-h-[100px]">
        {" "}
        {/* Spacer for Input */}{" "}
      </div>
    </div>
  );
};
