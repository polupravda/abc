"use client";

import React, { useState, useEffect, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import { NumberPictureGrid } from "../NumberPictureGrid";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";
import { shuffle } from "../../lib/utils";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const GameBoardWhichPictureNumber: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [optionNumbers, setOptionNumbers] = useState<number[]>([]);
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

    const target =
      MIN_NUMBER +
      Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1));

    const wrongPool = Array.from(
      { length: MAX_NUMBER - MIN_NUMBER + 1 },
      (_, i) => i + MIN_NUMBER
    ).filter((n) => n !== target);

    const wi1 = Math.floor(Math.random() * wrongPool.length);
    const wrong1 = wrongPool[wi1]!;
    const rest = wrongPool.filter((_, i) => i !== wi1);
    const wrong2 = rest[Math.floor(Math.random() * rest.length)] ?? wrong1;

    const options = shuffle([target, wrong1, wrong2]);
    const correctIdx = options.indexOf(target);

    setTargetNumber(target);
    setOptionNumbers(options);
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
      if (!isGameActive || optionNumbers.length !== 3) return;
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
      optionNumbers.length,
    ]
  );

  const isFeedbackShowing = showSuccessContainer || showFailure;

  if (optionNumbers.length !== 3) {
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

      <div className="h-auto max-h-[90vh] mb-10 w-full max-w-[min(96rem,95vw)] px-2">
        <HeadlineInstruction
          headlineText="Which picture shows this number?"
          instructionText="Which picture shows this number?"
          className={`transition-opacity duration-300 ${
            isFeedbackShowing ? "opacity-0" : "opacity-100"
          }`}
        />
        <CardLight className="min-w-[90%] w-full max-w-[min(96rem,95vw)] p-8 md:p-10">
          <div className="flex flex-col gap-10">
            <div
              className="px-4 py-3 rounded-full bg-indigo-600 text-white shadow-lg/20 flex items-center gap-2 select-none w-fit"
              aria-label={`Number: ${targetNumber}`}
            >
              <span className="font-semibold text-xl md:text-2xl">
                Number:
              </span>
              <span className="px-3 py-1 rounded-md bg-amber-300 text-indigo-900 font-extrabold text-2xl md:text-3xl">
                {targetNumber}
              </span>
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-8 items-start">
              {optionNumbers.map((value, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  disabled={!isGameActive || isFeedbackShowing}
                  className="flex-1 min-w-[280px] max-w-[420px] flex flex-col justify-start items-center p-6 rounded-xl bg-white border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 disabled:pointer-events-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label={`Option ${index + 1}: picture for ${value}`}
                >
                  <NumberPictureGrid
                    number={value}
                    cellSize={26}
                    gapPx={6}
                  />
                </button>
              ))}
            </div>
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardWhichPictureNumber;
