"use client";

import React, { useState, useEffect, useRef } from "react";
import NumberVisualizer from "./NumberVisualizer";
import FeedbackSuccess from "./FeedbackSuccess";
import FeedbackFailure from "./FeedbackFailure";

// Loudspeaker Icon SVG Component (can be moved to a separate file if used in many places)
const LoudspeakerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.903A9.7 9.7 0 0 0 1.5 12c0 .898.121 1.768.35 2.597.343 1.24 1.518 1.903 2.66 1.903h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.555-2.25-4.685a.75.75 0 0 0-.916 1.192A2.99 2.99 0 0 1 16.084 12a2.99 2.99 0 0 1-1.666 2.493.75.75 0 0 0 .916 1.192C17.714 15.555 18.584 13.857 18.584 12Z" />
    <path d="M19.816 7.192a.75.75 0 0 0-1.06 1.06A5.502 5.502 0 0 1 21.084 12a5.502 5.502 0 0 1-2.328 3.748.75.75 0 1 0 1.06 1.06A6.993 6.993 0 0 0 22.584 12a6.993 6.993 0 0 0-2.768-4.808Z" />
  </svg>
);

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
  const [isMuted, setIsMuted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );
  const failureSoundFiles = Array.from(
    { length: 9 },
    (_, i) => `/sounds/failure/failure-${i + 1}.aac`
  );

  const playInstructions = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Cancel any previous speech (instructions or other game speech)

      const utterance = new SpeechSynthesisUtterance(
        "Add the numbers together!"
      );
      instructionUtteranceRef.current = utterance;
      const voices = window.speechSynthesis.getVoices();
      let preferredVoice = voices.find(
        (v) => v.lang === "en-US" && v.name.toLowerCase().includes("female")
      );
      if (!preferredVoice)
        preferredVoice = voices.find((v) => v.lang === "en-US");
      if (!preferredVoice)
        preferredVoice = voices.find((v) => v.lang.startsWith("en"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.onend = () => {
        instructionUtteranceRef.current = null;
      };
      utterance.onerror = () => {
        instructionUtteranceRef.current = null;
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const playRandomSound = (soundFiles: string[]) => {
    if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop instructions if they are speaking
    }
    if (isMuted) return;
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="p-8 bg-neutral-800 rounded-xl shadow-2xl text-center max-w-3xl mx-auto border-2 border-teal-500 relative">
      <div className="absolute top-4 flex space-x-2">
        <button
          onClick={playInstructions}
          title="Play Instructions"
          className="p-2 text-sky-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-sky-500 transition-colors"
        >
          <LoudspeakerIcon className="w-5 h-5" />
        </button>
        <button
          onClick={toggleMute}
          className="px-3 py-1.5 text-sm font-medium text-sky-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-sky-500 transition-colors"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>

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

      <div
        className={`mb-8 ${
          isFeedbackShowing ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <div className="flex justify-between items-center font-mono font-bold">
          <div className="flex-1 text-center text-sky-400 text-9xl">
            {" "}
            {/* Num1 */}
            <span>{num1}</span>
          </div>
          <div className="flex-none px-3 md:px-4 text-neutral-400 text-6xl">
            {" "}
            {/* + operator */}
            <span>+</span>
          </div>
          <div className="flex-1 text-center text-sky-400 text-9xl">
            {" "}
            {/* Num2 */}
            <span>{num2}</span>
          </div>
          <div className="flex-none px-3 md:px-4 text-neutral-400 text-6xl">
            {" "}
            {/* = operator */}
            <span>=</span>
          </div>
          <div className="flex-1 flex justify-center">
            {" "}
            {/* Input field area */}
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isFeedbackShowing}
              className="w-full max-w-[200px] text-9xl font-mono font-bold text-sky-400 bg-transparent border-b-4 border-sky-500 focus:border-sky-300 outline-none text-center appearance-none m-0 p-0"
              aria-label="Enter sum"
            />
          </div>
        </div>

        {/* Row 2: Visualizers (aligned with row above) */}
        <div className="mt-3 flex justify-between items-start min-h-[80px] md:min-h-[100px]">
          {" "}
          {/* Adjusted min-height and mt */}
          <div className="flex-1 flex justify-center">
            {" "}
            {/* Num1 Visualizer */}
            <NumberVisualizer count={num1} circleColor="bg-pink-500" />
          </div>
          <div className="flex-none px-3 md:px-4"> {/* Spacer for + */} </div>
          <div className="flex-1 flex justify-center">
            {" "}
            {/* Num2 Visualizer */}
            <NumberVisualizer count={num2} circleColor="bg-indigo-600" />
          </div>
          <div className="flex-none px-3 md:px-4"> {/* Spacer for = */} </div>
          <div className="flex-1"> {/* Spacer for Input */} </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoardMathAddition;
