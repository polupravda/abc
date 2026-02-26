"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "@/app/hooks/useGameFeedback";
import { useScore } from "@/app/contexts/ScoreContext";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { NumberInput } from "@/app/elements/NumberInput";
import { ReadyButton } from "@/app/elements/ReadyButton";

export interface GameBoardMathAddition3Props {
  maxTotal: number; // 10 or 100
  headline?: string;
}

const GameBoardMathAddition3: React.FC<GameBoardMathAddition3Props> = ({
  maxTotal,
  headline = "Add the numbers",
}) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { clearAllTimeouts, playSuccessSound, scheduleSuccessSequence, scheduleFailureDismiss } =
    useGameFeedback();
  const { addPoints } = useScore();

  const total = useMemo(() => a + b + c, [a, b, c]);

  const regenerate = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    // Ensure sum <= maxTotal
    const n1 = Math.floor(Math.random() * (maxTotal + 1));
    const n2 = Math.floor(Math.random() * Math.max(1, maxTotal + 1 - n1));
    const n3 = Math.floor(Math.random() * Math.max(1, maxTotal + 1 - n1 - n2));
    setA(n1);
    setB(n2);
    setC(n3);
    setUserAnswer("");
    if (inputRef.current) inputRef.current.focus();
  }, [clearAllTimeouts, maxTotal]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  useEffect(() => {
    if (inputRef.current && !showSuccessContainer && !showFailure) {
      inputRef.current.focus();
    }
  }, [a, b, c, showSuccessContainer, showFailure]);

  const verify = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    const ans = parseInt(userAnswer, 10);
    if (!Number.isFinite(ans)) return;
    if (ans === total) {
      addPoints(1);
      setShowSuccessContainer(true);
      setStartSuccessAnimation(false);
      scheduleSuccessSequence({
        onStartAnimation: () => setStartSuccessAnimation(true),
        onEndAnimation: () => setStartSuccessAnimation(false),
        onComplete: regenerate,
      });
    } else {
      addPoints(-1);
      setShowFailure(true);
      scheduleFailureDismiss(2200, () => setShowFailure(false));
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [userAnswer, total, addPoints, clearAllTimeouts, scheduleSuccessSequence, regenerate, scheduleFailureDismiss]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailure && <FailureOverlay />}

      <div className="h-auto max-h-[85vh] mb-10 w-full px-2">
        <div className="w-full mx-auto max-w-[min(72rem,95vw)]">
          <HeadlineInstruction
            headlineText={headline}
            instructionText={headline}
            className="text-left mb-2"
          />
          <CardLight className="w-full p-6">
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <div className="flex items-center justify-center gap-4 md:gap-6 text-sky-950">
                <span className="text-6xl md:text-8xl font-bold">{a}</span>
                <span className="text-5xl md:text-6xl font-bold text-sky-800">+</span>
                <span className="text-6xl md:text-8xl font-bold">{b}</span>
                <span className="text-5xl md:text-6xl font-bold text-sky-800">+</span>
                <span className="text-6xl md:text-8xl font-bold">{c}</span>
                <span className="text-5xl md:text-6xl font-bold text-sky-800">=</span>
                <NumberInput
                  ref={inputRef}
                  size="L"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onEnterPress={verify}
                  min={0}
                  max={999}
                  aria-label="Enter sum"
                  className="inline-flex items-stretch bg-transparent border-0 shadow-none focus-within:ring-0 focus-within:border-0 rounded-none"
                  inputClassName="text-6xl md:text-8xl w-[4.2ch] text-center font-bold bg-transparent border-b-4 border-indigo-500 focus:border-indigo-300 outline-none m-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <ReadyButton onClick={verify} />
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardMathAddition3;

