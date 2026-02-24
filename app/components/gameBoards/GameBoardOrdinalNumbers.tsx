"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FeedbackFailure from "../FeedbackFailure";
import ShapeIcon, { SHAPE_TYPES, type ShapeType } from "../ShapeIcon";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { CardLight } from "../../elements/Card";

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

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

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

  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playSound = useCallback(
    (soundSrc: string) => {
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
    },
    []
  );

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
        setShowSuccessContainer(true); // 1. Mount container (elements hidden until startSuccessAnimation=true)
        setStartSuccessAnimation(false);

        successAppearTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(true); // 2. Trigger appear animation
        }, 50);

        successDurationTimeoutRef.current = setTimeout(() => {
          setStartSuccessAnimation(false); // 3. Trigger fade-out animation
        }, 3050);

        successHideTimeoutRef.current = setTimeout(() => {
          generateProblem(); // 4. Generate next task only after feedback animation is over
        }, 3050 + 300);
      } else {
        setShowFailure(true);
        failureTimeoutRef.current = setTimeout(() => {
          setShowFailure(false);
          setIsGameActive(true);
        }, 3000);
      }
    },
    [isGameActive, correctShape, generateProblem, clearAllTimeouts]
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
      {showFailure && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackFailure className="w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-red-400 mt-4">Try again!</p>
        </div>
      )}

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
