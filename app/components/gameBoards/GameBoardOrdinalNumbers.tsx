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

const ORDINAL_NAMES = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
] as const;

const ARRAY_LENGTH = 10;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const GameBoardOrdinalNumbers: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [targetOrdinal, setTargetOrdinal] = useState<number>(1);
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

  const generateProblem = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    setIsGameActive(true);

    const newShapes: ShapeType[] = Array.from(
      { length: ARRAY_LENGTH },
      () => SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]
    );
    const newTargetOrdinal = 1 + Math.floor(Math.random() * ARRAY_LENGTH);

    setShapes(newShapes);
    setTargetOrdinal(newTargetOrdinal);
  }, [clearAllTimeouts]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const hintText =
    shapes.length === ARRAY_LENGTH
      ? `First shape is ${capitalize(shapes[0])}. Which shape is ${ORDINAL_NAMES[targetOrdinal - 1]}?`
      : "";

  const correctShape =
    shapes.length === ARRAY_LENGTH ? shapes[targetOrdinal - 1]! : null;
  const uniqueShapes =
    shapes.length === ARRAY_LENGTH
      ? shuffle([...new Set(shapes)])
      : [];

  const handleAnswer = useCallback(
    (chosenShape: ShapeType) => {
      if (!isGameActive || !correctShape) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
      setShowFailure(false);
      setIsGameActive(false);

      if (chosenShape === correctShape) {
        addPoints(1);
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);
        scheduleSuccessSequence({
          onStartAnimation: () => setStartSuccessAnimation(true),
          onEndAnimation: () => setStartSuccessAnimation(false),
          onComplete: generateProblem,
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
      correctShape,
      generateProblem,
      clearAllTimeouts,
      scheduleSuccessSequence,
      scheduleFailureDismiss,
      addPoints,
    ]
  );

  // Hide task content for the whole success overlay so next task appears only after animation is over (like Subtraction)
  const isFeedbackShowing = showSuccessContainer || showFailure;

  if (shapes.length !== ARRAY_LENGTH) {
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
              aria-label={`Row of 10 shapes: ${shapes.map((s, i) => `${ORDINAL_NAMES[i]} ${s}`).join(", ")}`}
            >
              {shapes.map((shape, index) => (
                <div
                  key={`${index}-${shape}`}
                  className="flex flex-col items-center text-sky-800"
                >
                  <ShapeIcon
                    shape={shape}
                    size={40}
                    className="w-10 h-10 md:w-12 md:h-12 text-indigo-500"
                  />
                </div>
              ))}
            </div>

            <p className="text-lg font-medium text-sky-800">
              Which shape is {ORDINAL_NAMES[targetOrdinal - 1]}?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {uniqueShapes.map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => handleAnswer(shape)}
                  disabled={!isGameActive || isFeedbackShowing}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 disabled:pointer-events-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label={`Answer: ${shape}`}
                >
                  <ShapeIcon
                    shape={shape}
                    size={48}
                    className="w-12 h-12 text-indigo-600"
                  />
                  <span className="text-sm font-semibold text-sky-900 capitalize">
                    {shape}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardOrdinalNumbers;
