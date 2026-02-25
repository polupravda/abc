"use client";

import React, { useState, useEffect, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import ShapeIcon, { SHAPE_TYPES, type ShapeType } from "../ShapeIcon";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import { shuffle } from "../../lib/utils";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";

const SHAPE_SIZE = 40;
const SHAPE_SIZE_MD = 48;

const COLORS = [
  "text-indigo-500",
  "text-amber-500",
  "text-emerald-500",
  "text-rose-500",
  "text-sky-500",
  "text-violet-500",
] as const;

const COLOR_DISPLAY_NAMES: Record<string, string> = {
  "text-indigo-500": "Indigo",
  "text-amber-500": "Amber",
  "text-emerald-500": "Emerald",
  "text-rose-500": "Rose",
  "text-sky-500": "Sky",
  "text-violet-500": "Violet",
};

type PatternItem = { shape: ShapeType; colorClass: string };
type PatternMode = "sameShape" | "sameColor";

function itemKey(item: PatternItem): string {
  return `${item.shape}-${item.colorClass}`;
}

function generateProblem(): {
  displayArray: (PatternItem | null)[];
  correctAnswer: PatternItem;
  options: PatternItem[];
  mode: PatternMode;
} {
  const patternLength = 2 + Math.floor(Math.random() * 4); // 2..5
  const repeatCount = 2 + Math.floor(Math.random() * 2);   // 2 or 3
  const totalLength = patternLength * repeatCount;
  const mode: PatternMode = Math.random() < 0.5 ? "sameShape" : "sameColor";

  // Build pattern allowing repetitions within a step (same item can appear consecutively)
  const pattern: PatternItem[] = [];
  if (mode === "sameShape") {
    const shape = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]!;
    for (let i = 0; i < patternLength; i++) {
      const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)]!;
      pattern.push({ shape, colorClass });
    }
  } else {
    const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)]!;
    for (let i = 0; i < patternLength; i++) {
      const shape = SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]!;
      pattern.push({ shape, colorClass });
    }
  }

  const fullArray: PatternItem[] = [];
  for (let r = 0; r < repeatCount; r++) {
    for (let i = 0; i < patternLength; i++) {
      fullArray.push(pattern[i]!);
    }
  }

  const questionIndex = Math.floor(Math.random() * totalLength);
  const correctAnswer = fullArray[questionIndex]!;

  const displayArray: (PatternItem | null)[] = fullArray.map((item, i) =>
    i === questionIndex ? null : item
  );

  const uniqueKeys = new Set<string>();
  const options: PatternItem[] = [];
  for (const item of fullArray) {
    const key = itemKey(item);
    if (!uniqueKeys.has(key)) {
      uniqueKeys.add(key);
      options.push(item);
    }
  }

  return {
    displayArray,
    correctAnswer,
    options: shuffle(options),
    mode,
  };
}

const GameBoardContinuePattern: React.FC = () => {
  const [displayArray, setDisplayArray] = useState<(PatternItem | null)[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<PatternItem | null>(null);
  const [options, setOptions] = useState<PatternItem[]>([]);
  const [patternMode, setPatternMode] = useState<PatternMode>("sameColor");
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);

  const {
    clearAllTimeouts,
    playSuccessSound,
    scheduleSuccessSequence,
    scheduleFailureDismiss,
  } = useGameFeedback();
  const { addPoints } = useScore();

  const nextProblem = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsGameActive(true);
    const { displayArray: da, correctAnswer: ca, options: op, mode } = generateProblem();
    setDisplayArray(da);
    setCorrectAnswer(ca);
    setOptions(op);
    setPatternMode(mode);
  }, [clearAllTimeouts]);

  useEffect(() => {
    nextProblem();
  }, [nextProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const hintText =
    correctAnswer != null
      ? patternMode === "sameShape"
        ? "Continue the pattern. Which color is missing?"
        : "Continue the pattern. Which shape is missing?"
      : "";

  const handleAnswer = useCallback(
    (chosen: PatternItem) => {
      if (!isGameActive || correctAnswer == null) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
      setShowFailure(false);
      setIsGameActive(false);

      const isCorrect =
        chosen.shape === correctAnswer.shape &&
        chosen.colorClass === correctAnswer.colorClass;

      if (isCorrect) {
        addPoints(1);
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);
        scheduleSuccessSequence({
          onStartAnimation: () => setStartSuccessAnimation(true),
          onEndAnimation: () => setStartSuccessAnimation(false),
          onComplete: nextProblem,
        });
      } else {
        addPoints(-1);
        setShowFailure(true);
        scheduleFailureDismiss(3000, () => {
          setShowFailure(false);
          setIsGameActive(true);
        });
      }
    },
    [
      isGameActive,
      correctAnswer,
      nextProblem,
      clearAllTimeouts,
      scheduleSuccessSequence,
      scheduleFailureDismiss,
      addPoints,
    ]
  );

  const isFeedbackShowing = showSuccessContainer || showFailure;

  if (displayArray.length === 0) {
    return <div className="p-8">Loading game...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

      <div className="h-auto max-h-[80vh] mb-10">
        <HeadlineInstruction
          headlineText={hintText}
          instructionText={hintText}
          className={`transition-opacity duration-300 ${
            isFeedbackShowing ? "opacity-0" : "opacity-100"
          }`}
        />
        <CardLight>
          <div className="flex flex-col items-center justify-center gap-6">
            <div
              className="flex flex-wrap justify-center gap-2 md:gap-3 items-center"
              role="img"
              aria-label="Pattern with one missing shape"
            >
              {displayArray.map((item, index) => (
                <div
                  key={`${index}-${item ? itemKey(item) : "?"}`}
                  className="flex flex-col items-center justify-center text-sky-800 w-10 h-10 md:w-12 md:h-12"
                >
                  {item ? (
                    <ShapeIcon
                      shape={item.shape}
                      size={SHAPE_SIZE}
                      className={`w-10 h-10 md:w-12 md:h-12 ${item.colorClass}`}
                    />
                  ) : (
                    <span
                      className="text-red-500 font-bold text-3xl md:text-4xl leading-none flex items-center justify-center w-10 h-10 md:w-12 md:h-12"
                      aria-hidden
                    >
                      ?
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-lg font-medium text-sky-800">
              {patternMode === "sameShape"
                ? "Which color is missing?"
                : "Which shape is missing?"}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {options.map((item) => {
                const optionLabel =
                  patternMode === "sameShape"
                    ? COLOR_DISPLAY_NAMES[item.colorClass] ?? item.colorClass
                    : item.shape;
                return (
                  <button
                    key={itemKey(item)}
                    type="button"
                    onClick={() => handleAnswer(item)}
                    disabled={!isGameActive || isFeedbackShowing}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 disabled:pointer-events-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label={`Answer: ${optionLabel}`}
                  >
                    <ShapeIcon
                      shape={item.shape}
                      size={SHAPE_SIZE_MD}
                      className={`w-12 h-12 ${item.colorClass}`}
                    />
                    <span className="text-sm font-semibold text-sky-900 capitalize">
                      {optionLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardContinuePattern;
