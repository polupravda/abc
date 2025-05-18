"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedbackSuccess from "./FeedbackSuccess";
import FeedbackFailure from "./FeedbackFailure";

// Loudspeaker Icon SVG Component
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

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const GameBoardLetterSoundMatch: React.FC = () => {
  const [letter1, setLetter1] = useState<string | null>(null);
  const [letter2, setLetter2] = useState<string | null>(null);
  const [correctLetter, setCorrectLetter] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);

  const currentPhonicAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentFeedbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const instructionUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const successSoundFiles = Array.from(
    { length: 12 },
    (_, i) => `/sounds/success/success-${i + 1}.aac`
  );

  const playInstructions = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Which letter makes the sound? Click on the letter or find it on the keyboard!"
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
      if (preferredVoice) utterance.voice = preferredVoice;
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

  const playSound = useCallback(
    (soundSrc: string, isPhonicSound: boolean = false) => {
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const audioRef = isPhonicSound
        ? currentPhonicAudioRef
        : currentFeedbackAudioRef;
      if (!isPhonicSound && isMuted) return;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current = null;
      }
      const audio = new Audio(soundSrc);
      audioRef.current = audio;
      audio
        .play()
        .then(() => {})
        .catch((error) => {
          if (error.name === "AbortError") {
            // console.log(`Playback aborted: ${soundSrc}`);
          } else {
            console.error(`Error playing sound ${soundSrc}:`, error);
            if (isPhonicSound)
              setFeedbackText("Error playing sound. Please try refreshing.");
          }
          if (audioRef.current === audio) audioRef.current = null;
        });
      audio.onended = () => {
        if (audioRef.current === audio) audioRef.current = null;
      };
      audio.onerror = (event) => {
        console.error(`Audio element error for ${soundSrc}:`, event);
        if (audioRef.current === audio) audioRef.current = null;
      };
    },
    [isMuted]
  );

  const playCorrectLetterSound = useCallback(() => {
    if (correctLetter) {
      playSound(`/sounds/phonics/${correctLetter.toLowerCase()}.m4a`, true);
    }
  }, [correctLetter, playSound]);

  const generateProblem = useCallback(() => {
    setShowSuccess(false);
    setShowFailure(false);
    setIsGameActive(true);
    setFeedbackText("");
    clearAllTimeouts();

    const l1Index = Math.floor(Math.random() * ALPHABET.length);
    let l2Index = Math.floor(Math.random() * ALPHABET.length);
    while (l2Index === l1Index) {
      l2Index = Math.floor(Math.random() * ALPHABET.length);
    }

    const newLetter1 = ALPHABET[l1Index];
    const newLetter2 = ALPHABET[l2Index];
    const newCorrectLetter = Math.random() < 0.5 ? newLetter1 : newLetter2;

    setLetter1(newLetter1);
    setLetter2(newLetter2);
    setCorrectLetter(newCorrectLetter);

    setTimeout(() => {
      if (newCorrectLetter) {
        playSound(
          `/sounds/phonics/${newCorrectLetter.toLowerCase()}.m4a`,
          true
        );
      }
    }, 100);
  }, [playSound]);

  useEffect(() => {
    generateProblem();
    return () => {
      clearAllTimeouts();
      if (currentPhonicAudioRef.current) currentPhonicAudioRef.current.pause();
      if (currentFeedbackAudioRef.current)
        currentFeedbackAudioRef.current.pause();
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [generateProblem]);

  const handleAnswer = useCallback(
    (chosenLetter: string) => {
      if (!isGameActive || !correctLetter) return;
      if (typeof window !== "undefined" && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsGameActive(false);
      if (chosenLetter.toUpperCase() === correctLetter.toUpperCase()) {
        setFeedbackText("Correct!");
        setShowSuccess(true);
        const randomSuccessSound =
          successSoundFiles[
            Math.floor(Math.random() * successSoundFiles.length)
          ];
        playSound(randomSuccessSound);
        successTimeoutRef.current = setTimeout(() => {
          generateProblem();
        }, 3500);
      } else {
        setFeedbackText("Try again!");
        setShowFailure(true);
        failureTimeoutRef.current = setTimeout(() => {
          setShowFailure(false);
          setIsGameActive(true);
          setFeedbackText("");
        }, 3000);
      }
    },
    [isGameActive, correctLetter, successSoundFiles, playSound, generateProblem]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isGameActive || showSuccess || showFailure) return;
      const keyPressed = event.key.toUpperCase();
      if (letter1 && keyPressed === letter1.toUpperCase()) {
        handleAnswer(letter1);
      } else if (letter2 && keyPressed === letter2.toUpperCase()) {
        handleAnswer(letter2);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [letter1, letter2, isGameActive, showSuccess, showFailure, handleAnswer]);

  const clearAllTimeouts = () => {
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    if (failureTimeoutRef.current) clearTimeout(failureTimeoutRef.current);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  if (!letter1 || !letter2 || !correctLetter) {
    return <div>Loading game...</div>;
  }

  const displayLetters = [letter1, letter2].sort();

  return (
    <div className="p-6 md:p-10 bg-neutral-800 rounded-xl shadow-2xl text-center max-w-3xl mx-auto border-2 border-purple-500 relative flex flex-col items-center min-h-[500px]">
      <div className="absolute top-4 flex space-x-2">
        <button
          onClick={playInstructions}
          title="Play Instructions"
          className="p-2 text-purple-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-purple-500 transition-colors"
        >
          <LoudspeakerIcon className="w-5 h-5" />
        </button>
        <button
          onClick={toggleMute}
          className="px-3 py-1.5 text-sm font-medium text-purple-300 bg-zinc-700 hover:bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-purple-500 transition-colors"
        >
          {isMuted ? "Unmute Feedback" : "Mute Feedback"}
        </button>
      </div>

      {showSuccess && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackSuccess className="animate-bounce-gentle w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-green-400 mt-4">Correct!</p>
        </div>
      )}
      {showFailure && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 bg-opacity-95 z-20 rounded-xl">
          <FeedbackFailure className="w-48 h-48 md:w-64 md:h-64" />
          <p className="text-4xl font-bold text-red-400 mt-4">Try again!</p>
        </div>
      )}

      <div
        className={`w-full flex flex-col items-center transition-opacity duration-300 ${
          showSuccess || showFailure ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-6 md:mb-8">
          Which letter makes this sound?
        </h1>

        <button
          onClick={playCorrectLetterSound}
          disabled={showSuccess || showFailure}
          className="mb-6 md:mb-10 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          aria-label="Play sound again"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.903A9.7 9.7 0 0 0 1.5 12c0 .898.121 1.768.35 2.597.343 1.24 1.518 1.903 2.66 1.903h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.555-2.25-4.685a.75.75 0 0 0-.916 1.192A2.99 2.99 0 0 1 16.084 12a2.99 2.99 0 0 1-1.666 2.493.75.75 0 0 0 .916 1.192C17.714 15.555 18.584 13.857 18.584 12Z" />
            <path d="M19.816 7.192a.75.75 0 0 0-1.06 1.06A5.502 5.502 0 0 1 21.084 12a5.502 5.502 0 0 1-2.328 3.748.75.75 0 1 0 1.06 1.06A6.993 6.993 0 0 0 22.584 12a6.993 6.993 0 0 0-2.768-4.808Z" />
          </svg>
          Play Sound Again
        </button>

        <div className="flex justify-around w-full max-w-md">
          {displayLetters.map((letterChoice) => (
            <button
              key={letterChoice}
              onClick={() => handleAnswer(letterChoice)}
              disabled={!isGameActive || showSuccess || showFailure}
              className={`
                w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48
                flex flex-row items-center justify-center
                bg-teal-600 hover:bg-teal-500 text-neutral-100 
                font-bold text-5xl md:text-6xl rounded-xl shadow-lg
                transition-all duration-150 ease-in-out
                focus:outline-none focus:ring-4 focus:ring-teal-400
                disabled:opacity-60 disabled:cursor-not-allowed
                hover:disabled:bg-teal-600 
              `}
            >
              {letterChoice}
              <span className="ml-2 text-4xl md:text-5xl">
                {letterChoice.toLowerCase()}
              </span>
            </button>
          ))}
        </div>
        {feedbackText && !showSuccess && !showFailure && (
          <p className="mt-6 text-2xl font-semibold text-yellow-400">
            {feedbackText}
          </p>
        )}
      </div>
    </div>
  );
};

export default GameBoardLetterSoundMatch;
