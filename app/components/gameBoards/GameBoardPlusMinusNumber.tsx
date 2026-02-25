"use client";

import React, { useState, useEffect, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import { SHAPE_TYPES, type ShapeType } from "../ShapeIcon";
import { ShapeArrayRow } from "../ShapeArrayRow";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import { NumberPill } from "../../elements/NumberPill";
import { shuffle } from "../../lib/utils";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";

const MAX_SUM = 10;

const GameBoardPlusMinusNumber: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>("circle");
  const [initialCount, setInitialCount] = useState(0);
  const [operation, setOperation] = useState<"+" | "-">("+");
  const [delta, setDelta] = useState(0);
  const [optionCounts, setOptionCounts] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);

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

    const op: "+" | "-" = Math.random() < 0.5 ? "+" : "-";
    let initial: number;
    let d: number;
    let result: number;

    if (op === "+") {
      initial = 1 + Math.floor(Math.random() * 9); // 1..9 so result can be at most 10
      const maxDelta = MAX_SUM - initial;
      d = 1 + Math.floor(Math.random() * maxDelta); // 1..maxDelta
      result = initial + d;
    } else {
      initial = 1 + Math.floor(Math.random() * 10); // 1..10
      d = 1 + Math.floor(Math.random() * initial); // 1..initial
      result = initial - d;
    }

    const wrongPool = Array.from({ length: MAX_SUM + 1 }, (_, i) => i).filter(
      (n) => n !== result
    );
    const wi1 = Math.floor(Math.random() * wrongPool.length);
    const wrong1 = wrongPool[wi1]!;
    const rest = wrongPool.filter((_, i) => i !== wi1);
    const wrong2 = rest[Math.floor(Math.random() * rest.length)] ?? wrong1;

    const options = shuffle([result, wrong1, wrong2]);
    const correctIdx = options.indexOf(result);

    setShape(SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]!);
    setInitialCount(initial);
    setOperation(op);
    setDelta(d);
    setOptionCounts(options);
    setCorrectIndex(correctIdx);
  }, [clearAllTimeouts]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const handleAnswer = useCallback(
    (chosenIndex: number) => {
      if (!isGameActive || optionCounts.length !== 3) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
      setShowFailure(false);
      setIsGameActive(false);

      if (chosenIndex === correctIndex) {
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
      correctIndex,
      generateProblem,
      clearAllTimeouts,
      scheduleSuccessSequence,
      scheduleFailureDismiss,
      addPoints,
      optionCounts.length,
    ]
  );

  const isFeedbackShowing = showSuccessContainer || showFailure;

  if (optionCounts.length !== 3) {
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

      <div className="h-auto max-h-[80vh] mb-10 w-full max-w-2xl">
        <HeadlineInstruction
          headlineText="Which array shows the result?"
          instructionText="Which array shows the result?"
          className={`transition-opacity duration-300 ${
            isFeedbackShowing ? "opacity-0" : "opacity-100"
          }`}
        />
        <CardLight>
          <div className="flex flex-col gap-6">
            {/* Top: initial array + number container (pl matches answer button: p-3 + border-2 = 14px) */}
            <div className="flex flex-wrap items-center gap-4 justify-start pl-[14px]">
              <ShapeArrayRow shape={shape} count={initialCount} />
              <NumberPill
                label={operation === "+" ? "+ " : "− "}
                value={delta}
                ariaLabel={`${operation}${delta}`}
              />
            </div>

            {/* 3 answer options: left-aligned shape arrays */}
            <div className="flex flex-col gap-3">
              {optionCounts.map((count, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  disabled={!isGameActive || isFeedbackShowing}
                  className="w-full flex justify-start items-center p-3 rounded-xl bg-white border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 disabled:pointer-events-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 text-left"
                  aria-label={`Option ${index + 1}: ${count} shapes`}
                >
                  <ShapeArrayRow shape={shape} count={count} />
                </button>
              ))}
            </div>
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardPlusMinusNumber;
