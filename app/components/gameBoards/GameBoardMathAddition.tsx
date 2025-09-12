"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccessAnimation from "../FeedbackSuccessAnimation";
import FeedbackFailure from "../FeedbackFailure";
import { CardLight } from "../../elements/Card";
import { HeadlineInstruction } from "../../elements/HeadlineInstruction";
import { MathProblem } from "../../elements/MathProblem";

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
  const successAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playRandomSound = useCallback((soundFiles: string[]) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const soundToPlay = soundFiles[randomIndex];
    const audio = new Audio(soundToPlay);
    currentAudioRef.current = audio;
    audio
      .play()
      .catch((error) =>
        console.error(`Error playing sound ${soundToPlay}:`, error)
      );
  }, []);

  const clearAllTimeouts = useCallback(() => {
    if (successAppearTimeoutRef.current)
      clearTimeout(successAppearTimeoutRef.current);
    if (successDurationTimeoutRef.current)
      clearTimeout(successDurationTimeoutRef.current);
    if (successHideTimeoutRef.current)
      clearTimeout(successHideTimeoutRef.current);
    if (failureTimeoutRef.current) {
      clearTimeout(failureTimeoutRef.current);
      failureTimeoutRef.current = null;
    }
  }, []);

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
    return () => {
      clearAllTimeouts();
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [generateProblem, clearAllTimeouts]);

  useEffect(() => {
    if (startSuccessAnimation) {
      playRandomSound(successSoundFiles);
    }
  }, [startSuccessAnimation, playRandomSound, successSoundFiles]);

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
      setFeedback("Correct!");
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
      setFeedback(`Try again! ${num1} + ${num2} is not ${answer}.`);
      setShowFailureMonster(true);
      failureTimeoutRef.current = setTimeout(() => {
        setShowFailureMonster(false);
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 2500);
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
      {showFailureMonster && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-300 bg-opacity-95 z-10 rounded-xl">
          <FeedbackFailure className="" />
          <p className="text-4xl font-bold text-red-500 mt-4">Try again!</p>
        </div>
      )}

      <div className="h-auto max-h-[80vh] mb-10">
        <HeadlineInstruction
          headlineText="What is the sum?"
          instructionText="What is the sum? Add numbers together!"
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
        </CardLight>
      </div>
    </div>
  );
};

export default GameBoardMathAddition;
