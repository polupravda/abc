"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FeedbackFailure from "../FeedbackFailure";
import ShapeIcon, { SHAPE_TYPES, type ShapeType } from "../ShapeIcon";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";

const MAX_SUM = 10;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function ShapeArrayRow({
  shape,
  count,
  className = "",
}: {
  shape: ShapeType;
  count: number;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap gap-1 justify-start items-center ${className}`}
      role="img"
      aria-label={`${count} ${shape}${count !== 1 ? "s" : ""}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <ShapeIcon
          key={i}
          shape={shape}
          size={32}
          className="w-8 h-8 md:w-9 md:h-9 text-indigo-500 shrink-0"
        />
      ))}
    </div>
  );
}

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

  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playSound = useCallback((soundSrc: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (currentFeedbackAudioRef.current) {
      currentFeedbackAudioRef.current.pause();
      currentFeedbackAudioRef.current.onended = null;
    }
    const audio = new Audio(soundSrc);
    currentFeedbackAudioRef.current = audio;
    audio.onended = () => {
      if (currentFeedbackAudioRef.current === audio)
        currentFeedbackAudioRef.current = null;
    };
    audio.play().catch(() => {
      if (currentFeedbackAudioRef.current === audio)
        currentFeedbackAudioRef.current = null;
    });
  }, []);

  const clearAllTimeouts = useCallback(() => {
    if (successAppearTimeoutRef.current)
      clearTimeout(successAppearTimeoutRef.current);
    if (successDurationTimeoutRef.current)
      clearTimeout(successDurationTimeoutRef.current);
    if (successHideTimeoutRef.current)
      clearTimeout(successHideTimeoutRef.current);
    if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
  }, []);

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
    return () => {
      clearAllTimeouts();
      if (currentFeedbackAudioRef.current)
        currentFeedbackAudioRef.current.pause();
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [generateProblem, clearAllTimeouts]);

  useEffect(() => {
    if (startSuccessAnimation) {
      const randomSuccessSound =
        successSoundFiles[Math.floor(Math.random() * successSoundFiles.length)];
      playSound(randomSuccessSound);
    }
  }, [startSuccessAnimation, successSoundFiles, playSound]);

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
        setShowSuccessContainer(true);
        setStartSuccessAnimation(false);

        successAppearTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(true);
        }, 50);

        successDurationTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(false);
        }, 3050);

        successHideTimeoutRef.current = setTimeout(() => {
          generateProblem();
        }, 3050 + 300);
      } else {
        setShowFailure(true);
        failureTimeoutRef.current = setTimeout(() => {
          setShowFailure(false);
          setIsGameActive(true);
        }, 3000);
      }
    },
    [isGameActive, correctIndex, generateProblem, clearAllTimeouts, optionCounts.length]
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
      {showFailure && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackFailure className="w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-red-400 mt-4">Try again!</p>
        </div>
      )}

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
              <div
                className="px-3 py-2 rounded-full bg-indigo-600 text-white shadow-lg/20 flex items-center gap-2 select-none"
                aria-label={`${operation}${delta}`}
              >
                <span className="font-semibold text-xl md:text-2xl">
                  {operation === "+" ? "+ " : "− "}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-300 text-indigo-900 font-extrabold text-2xl md:text-3xl">
                  {delta}
                </span>
              </div>
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
