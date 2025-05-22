"use client";

import React, { useState, useEffect, useRef } from "react";
import NumberVisualizer from "./NumberVisualizer";
import FeedbackSuccess from "./FeedbackSuccess";
import FeedbackFailure from "./FeedbackFailure";
import { InstructionButton } from "../elements/InstructionButton";
import { HeadlineInstruction } from "../elements/HeadlineInstruction";
import { CardLight } from "../elements/Card";
import { MathProblem } from "../elements/MathProblem";
type GameBoardMathSubtractionProps = Record<string, never>;

const GameBoardMathSubtraction: React.FC<
  GameBoardMathSubtractionProps
> = () => {
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

  const playRandomSound = (soundFiles: string[]) => {
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
    // Ensure num1 is always greater than or equal to num2 for non-negative results up to 10.
    const newNum1 = Math.floor(Math.random() * 11); // num1 can be 0-10
    const newNum2 = Math.floor(Math.random() * (newNum1 + 1)); // num2 is 0 to num1
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
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (showAstronaut) {
      playRandomSound(successSoundFiles);
    }
  }, [showAstronaut, playRandomSound, successSoundFiles]); // playRandomSound and successSoundFiles are dependencies

  useEffect(() => {
    // Sound for incorrect answer is removed, so this effect does less
    // if (showFailureMonster) {
    //   // playRandomSound(failureSoundFiles);
    // }
  }, [showFailureMonster]); // Removed playRandomSound, failureSoundFiles from deps as they are not used here

  useEffect(() => {
    if (inputRef.current && !showAstronaut && !showFailureMonster) {
      inputRef.current.focus();
    }
  }, [num1, num2, showAstronaut, showFailureMonster]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.length > 2) {
      // Max 2 digits for answer (0-10)
      value = value.slice(0, 2);
    }
    // Allow negative sign only at the beginning and if result can be negative (though current logic avoids it)
    // if (value !== '-' && isNaN(parseInt(value))) {
    //   if(value.startsWith('-') && !isNaN(parseInt(value.substring(1)))){
    //      //allow
    //   } else {
    //       return; // Or handle as invalid input, for now, basic number check is fine
    //   }
    // }
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

    if (answer === num1 - num2) {
      // Changed to subtraction
      setFeedback("Correct!");
      setShowAstronaut(true);
      successTimeoutRef.current = setTimeout(() => {
        generateProblem();
      }, 3000);
    } else {
      setFeedback(`Try again! ${num1} - ${num2} is not ${answer}.`); // Changed to subtraction
      setShowFailureMonster(true);
      failureTimeoutRef.current = setTimeout(() => {
        setShowFailureMonster(false);
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 2500);
    }
    if (inputRef.current && !(answer === num1 - num2)) {
      // Changed to subtraction
      inputRef.current.focus();
      inputRef.current.select();
    } else if (inputRef.current && answer === num1 - num2) {
      // Changed to subtraction
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
        headlineText="Subtract the numbers!"
        instructionText="Subtract the numbers!"
        className={`mb-8 transition-opacity duration-300 ${
          isFeedbackShowing ? "opacity-0" : "opacity-100"
        }`}
      />
      <MathProblem
        num1={num1}
        num2={num2}
        operator="-"
        userAnswer={userAnswer}
        onUserAnswerChange={handleInputChange}
        onKeyDown={handleKeyDown}
        isFeedbackShowing={isFeedbackShowing}
        inputRef={inputRef}
        inputAriaLabel="Enter difference"
      />
    </CardLight>
  );
};

export default GameBoardMathSubtraction;
