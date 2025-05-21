"use client";

import React, { useState, useEffect, useRef } from "react";
import NumberVisualizer from "./NumberVisualizer";
import FeedbackSuccess from "./FeedbackSuccess";
import FeedbackFailure from "./FeedbackFailure";
import LoudspeakerIcon from "./icons/LoudspeakerIcon";
import { CardLight } from "./elements/Card";
import { InstructionButton } from "./elements/InstructionButton";
import { HeadlineInstruction } from "./elements/HeadlineInstruction";
import { MathProblem } from "./elements/MathProblem";

// interface GameBoardMathAdditionProps {
//   // Props can be added here if needed in the future
// }
type GameBoardMathAdditionProps = Record<string, never>;

const GameBoardMathAddition: React.FC<GameBoardMathAdditionProps> = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showAstronaut, setShowAstronaut] = useState(false);
  const [showFailureMonster, setShowFailureMonster] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );
  const failureSoundFiles = Array.from(
    { length: 9 },
    (_, i) => `/sounds/failure/failure-${i + 1}.aac`
  );

  const playRandomSound = (soundFiles: string[]) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop instructions if they are speaking
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
  };

  const clearAllTimeouts = () => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
    if (failureTimeoutRef.current) {
      clearTimeout(failureTimeoutRef.current);
      failureTimeoutRef.current = null;
    }
  };

  const generateProblem = () => {
    setShowAstronaut(false);
    setShowFailureMonster(false);
    clearAllTimeouts();
    const newNum1 = Math.floor(Math.random() * 11); // num1 can be 0-10
    const newNum2 = Math.floor(Math.random() * (11 - newNum1)); // num2 is 0 to (10 - newNum1)
    setNum1(newNum1);
    setNum2(newNum2);
    setUserAnswer("");
    setFeedback("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    generateProblem();
    return () => {
      clearAllTimeouts();
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Cancel instructions if unmounting while speaking
      }
    };
  }, []);

  useEffect(() => {
    if (showAstronaut) {
      playRandomSound(successSoundFiles);
    }
  }, [showAstronaut, playRandomSound, successSoundFiles]);

  useEffect(() => {
    if (showFailureMonster) {
      // playRandomSound(failureSoundFiles); // Sound for incorrect answer removed
    }
  }, [showFailureMonster, playRandomSound, failureSoundFiles]);

  useEffect(() => {
    if (inputRef.current && !showAstronaut && !showFailureMonster) {
      inputRef.current.focus();
    }
  }, [num1, num2, showAstronaut, showFailureMonster]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    // Allow only up to 2 digits for the answer
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setUserAnswer(value);
    if (feedback) setFeedback("");
    if (showAstronaut) setShowAstronaut(false);
    if (showFailureMonster) setShowFailureMonster(false);
    clearAllTimeouts();
  };

  const handleCheckAnswer = () => {
    clearAllTimeouts();
    setShowAstronaut(false);
    setShowFailureMonster(false);

    const answer = parseInt(userAnswer, 10);
    if (isNaN(answer)) {
      setFeedback("Please enter a number.");
      return;
    }

    if (answer === num1 + num2) {
      setFeedback("Correct!");
      setShowAstronaut(true);
      successTimeoutRef.current = setTimeout(() => {
        generateProblem();
      }, 3000);
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
    }
    if (inputRef.current && !(answer === num1 + num2)) {
      inputRef.current.focus();
      inputRef.current.select();
    } else if (inputRef.current && answer === num1 + num2) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheckAnswer();
    }
  };

  const isFeedbackShowing = showAstronaut || showFailureMonster;

  return (
    <CardLight>
      {showAstronaut && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-10 rounded-xl">
          <FeedbackSuccess className="animate-bounce-gentle" />
          <p className="text-4xl font-bold text-green-500 mt-4">Correct!</p>
        </div>
      )}
      {showFailureMonster && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-10 rounded-xl">
          <FeedbackFailure className="" />
          <p className="text-4xl font-bold text-red-500 mt-4">Try again!</p>
        </div>
      )}

      <HeadlineInstruction
        headlineText="What is the sum?"
        instructionText="What is the sum? Add numbers together!"
      />

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
  );
};

export default GameBoardMathAddition;
