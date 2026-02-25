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

// interface GameBoardMathAdditionProps {
//   // Props can be added here if needed in the future
// }
type GameBoardMathAdditionProps = Record<string, never>;

const GameBoardMathAddition: React.FC<GameBoardMathAdditionProps> = () => {
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
    const newNum1 = Math.floor(Math.random() * 11);
    const newNum2 = Math.floor(Math.random() * (11 - newNum1));
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer("");
    setFeedback("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [clearAllTimeouts]);

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
    if (value.length > 2) {
      value = value.slice(0, 2);
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

    if (answer === num1 + num2) {
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
          headlineText="What is the sum?"
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

export default GameBoardMathAddition;
