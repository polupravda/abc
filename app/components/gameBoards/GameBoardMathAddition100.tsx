"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FailureOverlay from "../FailureOverlay";
import { useGameFeedback } from "../../hooks/useGameFeedback";
import { useScore } from "../../contexts/ScoreContext";
import { CardLight } from "../../elements/Card";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { MathProblem } from "../../elements/MathProblem";
import { ReadyButton } from "../../elements/ReadyButton";

const MIN_SUM = 1;
const MAX_SUM = 100;

export type Addition100Variant = "noCarrying" | "withCarrying";

export interface GameBoardMathAddition100Props {
  variant: Addition100Variant;
  headlineText: string;
}

const GameBoardMathAddition100: React.FC<GameBoardMathAddition100Props> = ({
  variant,
  headlineText,
}) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showSuccessContainer, setShowSuccessContainer] = useState(false);
  const [startSuccessAnimation, setStartSuccessAnimation] = useState(false);
  const [showFailureMonster, setShowFailureMonster] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setShowFailureMonster(false);
    // noCarrying: ones digits sum ≤ 9 (no carry). withCarrying: ones digits sum = 10 (carry to tens).
    let sum =
      MIN_SUM + Math.floor(Math.random() * (MAX_SUM - MIN_SUM + 1));
    const validN1: number[] = [];
    for (let n1 = 0; n1 <= sum; n1++) {
      const n2 = sum - n1;
      const onesSum = (n1 % 10) + (n2 % 10);
      if (variant === "noCarrying" && onesSum <= 9) validN1.push(n1);
      if (variant === "withCarrying" && onesSum === 10) validN1.push(n1);
    }
    if (variant === "withCarrying" && validN1.length === 0) {
      // Find a sum that has at least one decomposition with ones sum === 10
      for (let attempt = 0; attempt < 50; attempt++) {
        sum =
          MIN_SUM + Math.floor(Math.random() * (MAX_SUM - MIN_SUM + 1));
        validN1.length = 0;
        for (let n1 = 0; n1 <= sum; n1++) {
          const n2 = sum - n1;
          if ((n1 % 10) + (n2 % 10) === 10) validN1.push(n1);
        }
        if (validN1.length > 0) break;
      }
      if (validN1.length === 0) {
        sum = 10; // 1+9, 2+8, ... all have ones sum 10
        for (let n1 = 0; n1 <= sum; n1++) {
          const n2 = sum - n1;
          if ((n1 % 10) + (n2 % 10) === 10) validN1.push(n1);
        }
      }
    }
    const n1 =
      validN1.length > 0
        ? validN1[Math.floor(Math.random() * validN1.length)]!
        : 0;
    const n2 = sum - n1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer("");
    setFeedback("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [clearAllTimeouts, variant]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (startSuccessAnimation) playSuccessSound();
  }, [startSuccessAnimation, playSuccessSound]);

  useEffect(() => {
    if (inputRef.current && !showSuccessContainer && !showFailureMonster) {
      inputRef.current.focus();
    }
  }, [num1, num2, showSuccessContainer, showFailureMonster]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    setUserAnswer(value);
    if (feedback) setFeedback("");
    if (showSuccessContainer) {
      clearAllTimeouts();
      setShowSuccessContainer(false);
      setStartSuccessAnimation(false);
    }
    if (showFailureMonster) {
      clearAllTimeouts();
      setShowFailureMonster(false);
    }
  };

  const handleCheckAnswer = () => {
    clearAllTimeouts();
    setShowSuccessContainer(false);
    setStartSuccessAnimation(false);
    setShowFailureMonster(false);

    const answer = parseInt(userAnswer, 10);
    if (isNaN(answer)) {
      setFeedback("Please enter a number.");
      return;
    }

    const correctSum = num1 + num2;
    if (answer === correctSum) {
      addPoints(1);
      setFeedback("Correct!");
      setShowSuccessContainer(true);
      setStartSuccessAnimation(false);
      scheduleSuccessSequence({
        onStartAnimation: () => setStartSuccessAnimation(true),
        onEndAnimation: () => setStartSuccessAnimation(false),
        onComplete: generateProblem,
      });
    } else {
      addPoints(-1);
      setFeedback(`Try again! ${num1} + ${num2} is not ${answer}.`);
      setShowFailureMonster(true);
      scheduleFailureDismiss(2500, () => {
        setShowFailureMonster(false);
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      });
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  const isFeedbackShowing =
    (showSuccessContainer && startSuccessAnimation) || showFailureMonster;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-auto">
      {showSuccessContainer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <FeedbackSuccessAnimation show={startSuccessAnimation} />
        </div>
      )}
      {showFailureMonster && <FailureOverlay />}

      <div className="h-auto max-h-[80vh] mb-10">
        <HeadlineInstruction
          headlineText={headlineText}
          instructionText="What is the sum?"
          className={`transition-opacity duration-300 ${
            isFeedbackShowing ? "opacity-0" : "opacity-100"
          }`}
        />
        <CardLight>
          <MathProblem
            num1={num1}
            num2={num2}
            operator="+"
            userAnswer={userAnswer}
            onUserAnswerChange={handleInputChange}
            onKeyDown={handleKeyDown}
            isFeedbackShowing={isFeedbackShowing}
            inputRef={inputRef}
            inputAriaLabel="Enter sum"
            visualizer="squares"
            inputMaxLength={3}
          />
          <div className="mt-6 flex justify-center">
            <ReadyButton
              onClick={handleCheckAnswer}
              disabled={isFeedbackShowing}
            />
          </div>
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardMathAddition100;
