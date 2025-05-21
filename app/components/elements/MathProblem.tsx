"use client";

import React from "react";
import NumberVisualizer from "../NumberVisualizer"; // Adjusted path

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
    <>
      {/* Row 1: Numbers, Operator, Input */}
      <div className="flex justify-between items-center font-mono font-bold">
        <div className="flex-1 text-center text-sky-950 text-9xl lg:text-[12rem]">
          <span>{num1}</span>
        </div>
        <div className="flex-none px-6 md:px-8 text-sky-900 text-7xl">
          <span>{operator}</span>
        </div>
        <div className="flex-1 text-center text-sky-950 text-9xl lg:text-[12rem]">
          <span>{num2}</span>
        </div>
        <div className="flex-none px-6 md:px-8 text-sky-900 text-7xl">
          <span>=</span>
        </div>
        <div className="flex-1 flex justify-center">
          <input
            ref={inputRef}
            type="number"
            value={userAnswer}
            onChange={onUserAnswerChange}
            onKeyDown={onKeyDown}
            disabled={isFeedbackShowing}
            className="w-full max-w-[200px] text-sky-950 text-9xl lg:text-[12rem] font-mono font-bold bg-transparent border-b-4 border-indigo-500 focus:border-indigo-300 outline-none text-center appearance-none m-0 p-0"
            aria-label={inputAriaLabel}
          />
        </div>
      </div>

      {/* Row 2: Visualizers (aligned with row above) */}
      <div className="mt-3 flex justify-between items-start min-h-[80px] md:min-h-[100px]">
        <div className="flex-1 flex justify-center">
          <NumberVisualizer count={num1} circleColor={num1VisualizerColor} />
        </div>
        <div className="flex-none px-3 md:px-4">
          {" "}
          {/* Spacer for operator */}{" "}
        </div>
        <div className="flex-1 flex justify-center">
          <NumberVisualizer count={num2} circleColor={num2VisualizerColor} />
        </div>
        <div className="flex-none px-3 md:px-4"> {/* Spacer for = */} </div>
        <div className="flex-1"> {/* Spacer for Input */} </div>
      </div>
    </>
  );
};
