"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CardLight } from "@/app/elements/Card";
import { HeadlineInstruction } from "@/app/elements/HeadlineInstruction";
import { ReadyButton } from "@/app/elements/ReadyButton";
import { NumberInput } from "@/app/elements/NumberInput";
import { useGameFeedback } from "@/app/hooks/useGameFeedback";
import { useScore } from "@/app/contexts/ScoreContext";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TARGET_MIN = 5;
const TARGET_MAX = 10; // classic number bonds range

const circleBase =
  "absolute flex items-center justify-center rounded-full bg-white text-sky-950 font-extrabold shadow-sm select-none";

const addendStyle = "border-4 border-sky-200";
const addendGivenMuted = "bg-white text-sky-600 opacity-90";
const addendMissingHighlight = "border-indigo-400 ring-4 ring-indigo-200/60";
const targetStyle = "border-4 border-emerald-400";

const sizeClampTarget = { width: "clamp(84px, 12vw, 140px)", height: "clamp(84px, 12vw, 140px)" };
const sizeClampAddend = { width: "clamp(72px, 10vw, 120px)", height: "clamp(72px, 10vw, 120px)" };

const centerTransform = "translate(-50%, -50%)";

const TOP_POS = { left: "50%", top: "22%" };
const LEFT_POS = { left: "25%", top: "75%" };
const RIGHT_POS = { left: "75%", top: "75%" };

const BoardLines: React.FC = () => {
  // SVG lines between centers in percentage coordinates
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
      <line x1="50" y1="22" x2="25" y2="75" stroke="#93c5fd" strokeWidth="3" />
      <line x1="50" y1="22" x2="75" y2="75" stroke="#93c5fd" strokeWidth="3" />
      <line x1="25" y1="75" x2="75" y2="75" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 6" />
    </svg>
  );
};

const GameBoardNumberBonds: React.FC = () => {
  const [target, setTarget] = useState<number>(TARGET_MIN);
  const [given, setGiven] = useState<number>(0);
  const [prefillLeft, setPrefillLeft] = useState<boolean>(true);
  const [answer, setAnswer] = useState<string>("");
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const answerInputRef = useRef<HTMLInputElement>(null);

  const { clearAllTimeouts, scheduleSuccessSequence, scheduleFailureDismiss, playSuccessSound } =
    useGameFeedback();
  const { addPoints } = useScore();

  const missing = useMemo(() => Math.max(0, target - given), [target, given]);

  const regenerate = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    const t = randomInt(TARGET_MIN, TARGET_MAX);
    const g = randomInt(0, t);
    const left = Math.random() < 0.5;
    setTarget(t);
    setGiven(g);
    setPrefillLeft(left);
    setAnswer("");
    // focus after render
    setTimeout(() => {
      answerInputRef.current?.focus();
    }, 0);
  }, [clearAllTimeouts]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  const verify = useCallback(() => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailure(false);
    const val = parseInt(answer, 10);
    if (!Number.isFinite(val)) return;
    const ok = val === missing;
    if (ok) {
      addPoints(1);
      setShowSuccessContainer(true);
      scheduleSuccessSequence({
        onStartAnimation: () => setStartSuccessAnimation(true),
        onEndAnimation: () => setStartSuccessAnimation(false),
        onComplete: regenerate,
      });
    } else {
      addPoints(-1);
      setShowFailure(true);
      scheduleFailureDismiss(2000, () => setShowFailure(false));
      answerInputRef.current?.focus();
      answerInputRef.current?.select();
    }
  }, [answer, missing, addPoints, clearAllTimeouts, scheduleSuccessSequence, regenerate, scheduleFailureDismiss]);

  const disabled = showSuccessContainer || showFailure;

  const keypadNumbers = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i <= 10; i++) arr.push(i);
    return arr;
  }, []);

  const handleKeypadClick = (n: number) => {
    if (disabled) return;
    setAnswer(String(n));
  };

  const leftValue = prefillLeft ? given : answer === "" ? "?" : answer;
  const rightValue = !prefillLeft ? given : answer === "" ? "?" : answer;
  const leftIsMissing = !prefillLeft;
  const rightIsMissing = prefillLeft;

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
            headlineText="Number Bonds"
            instructionText="Fill the missing number so the total matches the target."
            className="text-left mb-2"
          />
          <CardLight className="w-full p-6">
            <div className="w-full flex flex-col items-center justify-center gap-6">
              {/* Triangle board */}
              <div className="relative w-full max-w-[700px] aspect-[4/3]">
                <BoardLines />
                {/* Plus sign instead of dashed base line */}
                <div
                  className="absolute text-4xl md:text-5xl font-extrabold text-sky-700 select-none"
                  style={{ left: "50%", top: "75%", transform: centerTransform }}
                  aria-hidden="true"
                >
                  +
                </div>
                {/* Target node */}
                <div
                  className={`${circleBase} ${targetStyle}`}
                  style={{ ...sizeClampTarget, left: TOP_POS.left, top: TOP_POS.top, transform: centerTransform }}
                  aria-label={`Target ${target}`}
                >
                  <span className="text-4xl md:text-5xl">{target}</span>
                </div>
                {/* Left addend */}
                <div
                  className={`${circleBase} ${addendStyle} ${leftIsMissing ? addendMissingHighlight : addendGivenMuted}`}
                  style={{ ...sizeClampAddend, left: LEFT_POS.left, top: LEFT_POS.top, transform: centerTransform }}
                  aria-label={leftIsMissing ? "Missing number" : `Given number ${given}`}
                >
                  {leftIsMissing ? (
                    <NumberInput
                      ref={answerInputRef}
                      size="S"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onEnterPress={verify}
                      min={0}
                      max={TARGET_MAX}
                      showStepper={false}
                      aria-label="Enter missing number"
                      className="bg-transparent border-0 shadow-none focus-within:ring-0 focus-within:border-0"
                      inputClassName="text-3xl md:text-4xl w-[3ch] text-center font-extrabold bg-transparent border-0 outline-none m-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl">{leftValue}</span>
                  )}
                </div>
                {/* Right addend */}
                <div
                  className={`${circleBase} ${addendStyle} ${rightIsMissing ? addendMissingHighlight : addendGivenMuted}`}
                  style={{ ...sizeClampAddend, left: RIGHT_POS.left, top: RIGHT_POS.top, transform: centerTransform }}
                  aria-label={rightIsMissing ? "Missing number" : `Given number ${given}`}
                >
                  {rightIsMissing ? (
                    <NumberInput
                      ref={answerInputRef}
                      size="S"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onEnterPress={verify}
                      min={0}
                      max={TARGET_MAX}
                      showStepper={false}
                      aria-label="Enter missing number"
                      className="bg-transparent border-0 shadow-none focus-within:ring-0 focus-within:border-0"
                      inputClassName="text-3xl md:text-4xl w-[3ch] text-center font-extrabold bg-transparent border-0 outline-none m-0 p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl">{rightValue}</span>
                  )}
                </div>
              </div>

              {/* Removed external input and keypad per spec */}

              <ReadyButton onClick={verify} />
            </div>
          </CardLight>
        </div>
      </div>
    </div>
  );
};

export default GameBoardNumberBonds;

